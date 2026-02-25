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

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const result = streamText({
        model: anthropic("claude-sonnet-4-20250514"),
        system: buildChatSystemPrompt(),
        messages: await convertToModelMessages(messages),
        maxOutputTokens: 1024,
        stopWhen: stepCountIs(5),
        tools: {
          analyze_deadline: tool({
            description:
              "Analyze whether the landlord has violated security deposit return deadlines based on the tenant's state and move-out date. Call this as soon as you know the state and move-out date.",
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
              return result;
            },
          }),
          calculate_damages: tool({
            description:
              "Calculate the potential recovery amount including penalty damages. Call this after you know the deposit amount and violation status.",
            inputSchema: z.object({
              state_code: z.string().describe("Two-letter state code"),
              deposit_amount: z.number().describe("Total security deposit amount in dollars"),
              claimed_deductions: z.number().describe("Amount the landlord claims in deductions (0 if no itemization)"),
              bad_faith: z.boolean().describe("Whether the landlord acted in bad faith"),
            }),
            execute: async (input) => {
              const { result, clientData } = executeTool("calculate_damages", input);
              writer.write({
                type: "data-tool-result",
                data: { tool: "calculate_damages", result: clientData },
                transient: true,
              });
              return result;
            },
          }),
          assess_case_strength: tool({
            description:
              "Assess the overall strength of the tenant's case. Call this after deadline analysis and damages calculation.",
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
              return result;
            },
          }),
          recommend_product: tool({
            description:
              "Recommend a document product to the tenant based on their situation. Only call this when the conversation naturally reaches next steps AND you've already provided analysis.",
            inputSchema: z.object({
              product: z.enum(["demand_letter", "legal_packet", "case_review"]).describe("Which product to recommend"),
              reason: z.string().describe("Brief reason why this product fits their situation"),
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
          saveSession(sessionToken, messages, text).catch((err) =>
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
 */
async function saveSession(
  sessionToken: string,
  messages: UIMessage[],
  lastResponse: string
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

  const { error } = await supabaseAdmin
    .from("chat_sessions")
    .upsert(
      {
        session_token: sessionToken,
        messages: allMessages,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "session_token" }
    );

  if (error) {
    console.error("Failed to save chat session:", error);
  }
}
