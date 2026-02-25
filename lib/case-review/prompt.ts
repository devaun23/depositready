import { getStateRulesByCode } from "@/lib/state-rules";
import type { StateCode, StateRules } from "@/lib/state-rules/types";

interface CaseReviewInput {
  name: string;
  email: string;
  stateCode: string;
  depositAmount: number;
  moveOutDate: string | null;
  landlordName: string | null;
  propertyAddress: string | null;
  situationSummary: string;
  landlordResponse: string | null;
  communicationsHistory: string | null;
  deductionsDescribed: string | null;
  primaryConcern: string | null;
  desiredOutcome: string | null;
}

export interface MemoSections {
  yourSituation: string;
  whatTheLawSays: string;
  caseAssessment: string;
  actionPlan: string;
  keyDeadlines: string;
  whenToEscalate: string;
}

function formatStateRulesContext(rules: StateRules): string {
  return `
STATE: ${rules.name} (${rules.code})
STATUTE: ${rules.statuteTitle} (${rules.statute})
STATUTE URL: ${rules.statuteUrl}

DEADLINES:
- Return deadline: ${rules.returnDeadline} days from move-out${rules.claimDeadlineNote ? ` (${rules.claimDeadlineNote})` : ""}
- Claim/itemization deadline: ${rules.claimDeadline} days from move-out
- Return deadline citation: ${rules.statuteSections.returnDeadline}
- Claim deadline citation: ${rules.statuteSections.claimDeadline}

REQUIREMENTS:
- Certified mail required: ${rules.certifiedMailRequired ? "Yes" : "No"}
- Itemized deductions required: ${rules.itemizedDeductionsRequired ? "Yes" : "No"}
- Itemization citation: ${rules.statuteSections.itemizationRequirement}

DAMAGES / PENALTIES:
- Multiplier: ${rules.damagesMultiplier}x (${rules.damagesDescription})
- Forfeiture provision: ${rules.statuteSections.forfeitureProvision}
- Damages provision: ${rules.statuteSections.damagesProvision}
${rules.additionalDamages ? `- Additional damages: ${rules.additionalDamages}` : ""}

STATUTORY LANGUAGE (exact quotes):
- Forfeiture: "${rules.statutoryLanguage.forfeitureClause}"
- Damages: "${rules.statutoryLanguage.damagesClause}"
- Deadline: "${rules.statutoryLanguage.deadlineClause}"

SMALL CLAIMS COURT:
- Max amount: $${rules.maxSmallClaims.toLocaleString()}${rules.smallClaimsNote ? ` (${rules.smallClaimsNote})` : ""}
- Filing fee: $${rules.filingFee.min}–$${rules.filingFee.max}
- Court name: ${rules.courtName}

DEMAND LETTER INSERT:
${rules.demandLetterInsert}
`.trim();
}

export function buildCaseReviewPrompt(input: CaseReviewInput): {
  system: string;
  user: string;
} {
  let stateRules: StateRules | null = null;
  try {
    stateRules = getStateRulesByCode(input.stateCode as StateCode);
  } catch {
    // State not supported — prompt will use general guidance
  }

  const system = `You are an expert security deposit recovery analyst. You are NOT a lawyer and do not provide legal advice. You provide detailed, factual case assessments based on state security deposit statutes.

Your role: Analyze the tenant's situation against their state's specific security deposit laws and produce a clear, actionable case review memo.

IMPORTANT GUIDELINES:
- Be specific and cite exact statute sections
- Use plain language — the reader is not a lawyer
- Be honest about case strengths AND weaknesses
- Give concrete next steps, not vague suggestions
- Include specific deadlines and dates when calculable
- Do NOT sugarcoat or exaggerate — build trust through honesty
- When uncertain about a fact, say so clearly
- This is an informational assessment, not legal advice

OUTPUT FORMAT: Respond with valid JSON containing exactly these 6 sections. Each section value should be a string with markdown formatting (use ## for sub-headers, **bold** for emphasis, bullet points for lists).

{
  "yourSituation": "Restate their case clearly so they feel heard...",
  "whatTheLawSays": "State-specific rules applied to their facts...",
  "caseAssessment": "Strengths, weaknesses, where they stand...",
  "actionPlan": "Step-by-step what to do next...",
  "keyDeadlines": "Critical dates for their case...",
  "whenToEscalate": "When to consider a lawyer or small claims..."
}`;

  const moveOutInfo = input.moveOutDate
    ? `Move-out date: ${input.moveOutDate}`
    : "Move-out date: Not provided";

  const today = new Date().toISOString().split("T")[0];

  const user = `Please analyze this security deposit case and produce a personalized case review memo.

## TENANT INFORMATION
- Name: ${input.name}
- State: ${input.stateCode}
- Deposit amount: $${input.depositAmount.toLocaleString()}
- ${moveOutInfo}
- Today's date: ${today}
${input.landlordName ? `- Landlord/PM: ${input.landlordName}` : ""}
${input.propertyAddress ? `- Property: ${input.propertyAddress}` : ""}

## WHAT HAPPENED
${input.situationSummary}

${input.landlordResponse ? `## LANDLORD'S REASON FOR WITHHOLDING\n${input.landlordResponse}` : ""}

${input.deductionsDescribed ? `## DEDUCTIONS CLAIMED\n${input.deductionsDescribed}` : ""}

${input.communicationsHistory ? `## COMMUNICATION HISTORY\n${input.communicationsHistory}` : ""}

## TENANT'S PRIMARY CONCERN
${input.primaryConcern ? input.primaryConcern.replace(/_/g, " ") : "Not specified"}

${input.desiredOutcome ? `## ADDITIONAL NOTES FROM TENANT\n${input.desiredOutcome}` : ""}

## STATE LAW REFERENCE
${stateRules ? formatStateRulesContext(stateRules) : `State: ${input.stateCode} (rules not available — provide general guidance based on common security deposit law principles)`}

---

Now produce the 6-section case review memo as JSON. Be thorough but readable. Each section should be 2-4 paragraphs. Calculate specific dates where possible using the move-out date and today's date.`;

  return { system, user };
}
