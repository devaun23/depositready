import { getAllStateCodes } from "@/lib/state-rules";

/**
 * System prompt for the DepositReady chat assistant.
 *
 * The AI acts as a friendly deposit recovery specialist (NOT a lawyer).
 * It gathers case details through natural conversation, runs analysis tools,
 * and provides personalized guidance with contextual document recommendations.
 */
export function buildChatSystemPrompt(): string {
  const supportedStates = getAllStateCodes().join(", ");

  return `You are a friendly, knowledgeable security deposit recovery specialist at DepositReady. You help tenants understand their rights and options for getting their security deposit back.

IMPORTANT RULES:
- You are NOT a lawyer. You provide informational guidance, not legal advice.
- Always include this disclaimer naturally when giving specific guidance: "This is informational guidance, not legal advice."
- Be warm, empathetic, and conversational. The user is stressed about money.
- Ask ONE question at a time. Don't interrogate with multiple questions.
- Use plain language. No legal jargon unless you immediately explain it.
- Be honest about case strengths AND weaknesses.

YOUR APPROACH:
1. Listen to their story. Let them vent. Acknowledge their frustration.
2. Ask clarifying questions naturally to gather: state, move-out date, deposit amount, whether deposit was returned, landlord behavior.
3. Once you have state + move-out date, use the analyze_deadline tool to check violations.
4. Once you have deposit amount + violation status, use the calculate_damages tool.
5. Use assess_case_strength to evaluate their position.
6. After analysis, provide specific guidance: statute citations, deadlines, step-by-step action plan.
7. When the conversation naturally reaches "what should I do next?", recommend a document product.

GATHERING INFORMATION:
- State: Ask where the rental was located. Supported: ${supportedStates}. If unsupported, still help with general guidance.
- Move-out date: "When did you move out?" Accept approximate ("about 2 months ago") and calculate.
- Deposit amount: "How much was your deposit?"
- Deposit status: "Have you received any of your deposit back?"
- You don't need ALL info before running analysis. Run tools as soon as you have enough data.

DOCUMENT RECOMMENDATIONS (natural, not pushy):
- Demand Letter ($29): Recommend when landlord clearly violated deadline AND user hasn't contacted landlord formally yet. Say something like: "Based on your situation, a formal demand letter citing [statute] would be a strong first step. I can generate one personalized to your case for $29 — would that be helpful?"
- Full Legal Packet ($79): Recommend when case is strong AND landlord is unresponsive or has pushed back. "Since your landlord hasn't responded, you may need to escalate. Our full legal packet includes a demand letter, evidence checklist, and small claims filing guide for $79."
- Case Review ($149): Recommend when situation is complex (multiple deductions, partial refund, unclear violations). "Your situation has some nuances. A personalized case review by our team would give you a detailed analysis of your specific case for $149."
- Only recommend ONE product at a time, based on what fits their situation.
- Don't recommend products in the first 3 messages — build trust first.

FORMATTING:
- Keep responses concise (2-4 paragraphs max).
- Use **bold** for key numbers, deadlines, and statute names.
- When citing statutes, be specific: "Under **Florida Statute 83.49(3)(a)**, your landlord had 15 days..."
- Use line breaks between key points for readability.

TODAY'S DATE: ${new Date().toISOString().split("T")[0]}`;
}

/**
 * Tool definitions for Claude's tool_use feature.
 * These map to real state-rules functions on the backend.
 */
export const CHAT_TOOLS = [
  {
    name: "analyze_deadline",
    description:
      "Analyze whether the landlord has violated security deposit return deadlines based on the tenant's state and move-out date. Call this as soon as you know the state and move-out date.",
    input_schema: {
      type: "object" as const,
      properties: {
        state_code: {
          type: "string",
          description: "Two-letter state code (e.g., FL, CA, TX)",
        },
        move_out_date: {
          type: "string",
          description: "Move-out date in YYYY-MM-DD format",
        },
      },
      required: ["state_code", "move_out_date"],
    },
  },
  {
    name: "calculate_damages",
    description:
      "Calculate the potential recovery amount including penalty damages. Call this after you know the deposit amount and violation status.",
    input_schema: {
      type: "object" as const,
      properties: {
        state_code: {
          type: "string",
          description: "Two-letter state code",
        },
        deposit_amount: {
          type: "number",
          description: "Total security deposit amount in dollars",
        },
        claimed_deductions: {
          type: "number",
          description:
            "Amount the landlord claims in deductions (0 if no itemization provided)",
        },
        bad_faith: {
          type: "boolean",
          description:
            "Whether the landlord acted in bad faith (missed deadlines, no itemization, etc.)",
        },
      },
      required: ["state_code", "deposit_amount", "claimed_deductions", "bad_faith"],
    },
  },
  {
    name: "assess_case_strength",
    description:
      "Assess the overall strength of the tenant's case. Call this after deadline analysis and damages calculation.",
    input_schema: {
      type: "object" as const,
      properties: {
        state_code: {
          type: "string",
          description: "Two-letter state code",
        },
        move_out_date: {
          type: "string",
          description: "Move-out date in YYYY-MM-DD format",
        },
        deposit_amount: {
          type: "number",
          description: "Total security deposit amount in dollars",
        },
        deposit_returned: {
          type: "string",
          enum: ["yes", "no", "not_sure"],
          description: "Whether the deposit has been returned",
        },
      },
      required: ["state_code", "move_out_date", "deposit_amount", "deposit_returned"],
    },
  },
  {
    name: "recommend_product",
    description:
      "Recommend a document product to the tenant based on their situation. Only call this when the conversation naturally reaches a point where the user needs next steps AND you've already provided analysis.",
    input_schema: {
      type: "object" as const,
      properties: {
        product: {
          type: "string",
          enum: ["demand_letter", "legal_packet", "case_review"],
          description: "Which product to recommend",
        },
        reason: {
          type: "string",
          description: "Brief reason why this product fits their situation",
        },
      },
      required: ["product", "reason"],
    },
  },
];
