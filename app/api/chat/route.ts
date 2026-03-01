import { NextRequest } from "next/server";
import {
  streamText,
  tool,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
} from "ai";
import type { UIMessage } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { buildChatSystemPrompt } from "@/lib/chat/system-prompt";
import { executeTool } from "@/lib/chat/extract-case-data";
import { checkInput } from "@/lib/chat/guardrails";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const { messages, sessionToken } = await request.json();

  if (!messages?.length || !sessionToken) {
    return new Response(
      JSON.stringify({ error: "Missing messages or session token" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY?.trim()) {
    return new Response(
      JSON.stringify({ error: "AI service not configured" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // Input guardrail: check last user message for prompt injection
  const lastUser = [...messages].reverse().find((m: UIMessage) => m.role === "user");
  if (lastUser) {
    const text =
      lastUser.parts?.find((p: { type: string }) => p.type === "text")?.text ??
      (lastUser as { content?: string }).content ??
      "";
    const redirect = checkInput(text as string);
    if (redirect) {
      const id = crypto.randomUUID();
      const stream = createUIMessageStream({
        execute: ({ writer }) => {
          writer.write({ type: "text-start", id });
          writer.write({ type: "text-delta", id, delta: redirect });
          writer.write({ type: "text-end", id });
        },
      });
      return createUIMessageStreamResponse({ stream });
    }
  }

  // Load existing session to provide context for returning users
  let sessionSummary: string | undefined;
  try {
    const { data: existingSession } = await supabaseAdmin
      .from("chat_sessions")
      .select("state_code, deposit_amount, move_out_date, case_strength, violation_detected, recovery_amount")
      .eq("session_token", sessionToken)
      .single();

    if (existingSession?.state_code) {
      const parts: string[] = [];
      if (existingSession.state_code) parts.push(`State: ${existingSession.state_code}`);
      if (existingSession.deposit_amount) parts.push(`Deposit: $${existingSession.deposit_amount}`);
      if (existingSession.move_out_date) parts.push(`Move-out date: ${existingSession.move_out_date}`);
      if (existingSession.case_strength) parts.push(`Case strength: ${existingSession.case_strength}`);
      if (existingSession.violation_detected !== null) parts.push(`Violation detected: ${existingSession.violation_detected ? 'yes' : 'no'}`);
      if (existingSession.recovery_amount) parts.push(`Estimated recovery: $${existingSession.recovery_amount}`);
      if (parts.length > 0) sessionSummary = parts.join("\n");
    }
  } catch {
    // No existing session — fine, new user
  }

  // Track case data extracted during tool calls for persistence
  const extractedCaseData: Record<string, unknown> = {};

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const result = streamText({
        model: anthropic("claude-sonnet-4-20250514"),
        system: buildChatSystemPrompt(sessionSummary),
        messages: await convertToModelMessages(messages),
        maxOutputTokens: 2048,
        stopWhen: stepCountIs(8),
        tools: {
          analyze_deadline: tool({
            description:
              "Analyze whether the landlord has violated security deposit return deadlines. Requires state code and move-out date.",
            inputSchema: z.object({
              state_code: z.string().describe("Two-letter state code (e.g., FL, CA, TX)"),
              move_out_date: z.string().describe("Move-out date in YYYY-MM-DD format"),
            }),
            execute: async (input) => {
              const { result, clientData } = executeTool("analyze_deadline", input);
              writer.write({
                type: "data-tool-result",
                data: { tool: "analyze_deadline", result: clientData },
                transient: true,
              });
              // Track for session persistence
              extractedCaseData.state_code = input.state_code.toUpperCase();
              extractedCaseData.move_out_date = input.move_out_date;
              if (result.landlordInViolation !== undefined) extractedCaseData.violation_detected = result.landlordInViolation;
              return result;
            },
          }),
          calculate_damages: tool({
            description:
              "Calculate potential recovery amount including penalty damages. Requires state code, deposit amount, claimed deductions, and bad_faith flag.",
            inputSchema: z.object({
              state_code: z.string().describe("Two-letter state code"),
              deposit_amount: z.number().describe("Total security deposit amount in dollars"),
              claimed_deductions: z.number().describe("Amount the landlord claims in deductions (0 if no itemization)"),
              bad_faith: z.boolean().describe("Set true only when tenant describes willful refusal, fabricated deductions, retaliation, or ignored written requests. Missing a deadline alone is not necessarily bad faith. Default false."),
            }),
            execute: async (input) => {
              const { result, clientData } = executeTool("calculate_damages", input);
              writer.write({
                type: "data-tool-result",
                data: { tool: "calculate_damages", result: clientData },
                transient: true,
              });
              // Track for session persistence
              extractedCaseData.deposit_amount = input.deposit_amount;
              if (result.maxRecoverable !== undefined) extractedCaseData.recovery_amount = result.maxRecoverable;
              return result;
            },
          }),
          assess_case_strength: tool({
            description:
              "Assess overall case strength with a 0-100 score and contributing factors. Requires state code, move-out date, deposit amount, and deposit return status.",
            inputSchema: z.object({
              state_code: z.string().describe("Two-letter state code"),
              move_out_date: z.string().describe("Move-out date in YYYY-MM-DD format"),
              deposit_amount: z.number().describe("Total security deposit amount"),
              deposit_returned: z.enum(["yes", "no", "not_sure"]).describe("Whether the deposit has been returned"),
            }),
            execute: async (input) => {
              const { result, clientData } = executeTool("assess_case_strength", input);
              writer.write({
                type: "data-tool-result",
                data: { tool: "assess_case_strength", result: clientData },
                transient: true,
              });
              // Track for session persistence
              if (result.caseStrength) extractedCaseData.case_strength = result.caseStrength;
              return result;
            },
          }),
          recommend_product: tool({
            description:
              "Recommend a document product when the user's situation is analyzed and they're ready for next steps.",
            inputSchema: z.object({
              product: z.enum(["demand_letter", "legal_packet", "case_review"]).describe("Which product to recommend"),
              reason: z.string().describe("Brief reason why this product fits their situation"),
              state_code: z.string().optional().describe("Two-letter state code if known from prior analysis"),
              recovery_amount: z.number().optional().describe("Estimated recovery amount in dollars if calculated"),
            }),
            execute: async (input) => {
              const { result, clientData } = executeTool("recommend_product", input);
              writer.write({
                type: "data-tool-result",
                data: { tool: "recommend_product", result: clientData },
                transient: true,
              });
              if (clientData.purchaseOffer) {
                writer.write({
                  type: "data-purchase-offer",
                  data: clientData.purchaseOffer,
                });
              }
              return result;
            },
          }),
        },
        onFinish: ({ text }) => {
          saveSession(sessionToken, messages, text, extractedCaseData).catch((err) =>
            console.error("Failed to save chat session:", err)
          );
        },
      });

      writer.merge(result.toUIMessageStream());
    },
  });

  return createUIMessageStreamResponse({ stream });
}

/**
 * Save/update chat session in database (fire-and-forget).
 * Persists both messages and extracted case data for session restoration.
 */
async function saveSession(
  sessionToken: string,
  messages: UIMessage[],
  lastResponse: string,
  caseData?: Record<string, unknown>
) {
  // Flatten UIMessage parts to simple { role, content } for storage
  const simplified = messages.map((m: UIMessage) => ({
    role: m.role,
    content:
      m.parts
        ?.filter((p: { type: string }) => p.type === "text")
        .map((p: { type: string; text?: string }) => p.text ?? "")
        .join("") || "",
  }));

  const allMessages = [
    ...simplified,
    ...(lastResponse ? [{ role: "assistant", content: lastResponse }] : []),
  ];

  const upsertData: Record<string, unknown> = {
    session_token: sessionToken,
    messages: allMessages,
    updated_at: new Date().toISOString(),
  };

  // Persist extracted case fields
  if (caseData) {
    if (caseData.state_code) upsertData.state_code = caseData.state_code;
    if (caseData.deposit_amount) upsertData.deposit_amount = caseData.deposit_amount;
    if (caseData.move_out_date) upsertData.move_out_date = caseData.move_out_date;
    if (caseData.case_strength) upsertData.case_strength = caseData.case_strength;
    if (caseData.violation_detected !== undefined) upsertData.violation_detected = caseData.violation_detected;
    if (caseData.recovery_amount) upsertData.recovery_amount = caseData.recovery_amount;
  }

  const { error } = await supabaseAdmin
    .from("chat_sessions")
    .upsert(upsertData, { onConflict: "session_token" });

  if (error) {
    console.error("Failed to save chat session:", error);
  }
}
