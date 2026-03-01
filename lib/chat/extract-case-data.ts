import {
  getStateRulesByCode,
  isValidStateCode,
  analyzeDeadlines,
  calculateDamages,
  assessCaseStrength,
} from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules/types";

/**
 * Execute a tool call from the chat AI and return structured results.
 * These results are both sent back to Claude (so it can use them in its response)
 * and streamed to the client (so the CaseSummaryCard can update).
 */
export function executeTool(
  toolName: string,
  input: Record<string, unknown>
): { result: Record<string, unknown>; clientData: Record<string, unknown> } {
  switch (toolName) {
    case "analyze_deadline":
      return handleAnalyzeDeadline(input);
    case "calculate_damages":
      return handleCalculateDamages(input);
    case "assess_case_strength":
      return handleAssessCaseStrength(input);
    case "recommend_product":
      return handleRecommendProduct(input);
    default:
      return {
        result: { error: `Unknown tool: ${toolName}` },
        clientData: {},
      };
  }
}

function handleAnalyzeDeadline(input: Record<string, unknown>) {
  const stateCode = (input.state_code as string)?.toUpperCase();
  const moveOutDate = input.move_out_date as string;

  if (!isValidStateCode(stateCode)) {
    return {
      result: {
        error: `State "${stateCode}" is not currently supported. Supported states: FL, CA, TX, NY, GA, IL, NJ, AZ, CO, WA, NC, VA, OH, PA, MI, MA.`,
      },
      clientData: {},
    };
  }

  const rules = getStateRulesByCode(stateCode as StateCode);
  const analysis = analyzeDeadlines(new Date(moveOutDate), rules);

  const result = {
    stateCode: rules.code,
    stateName: rules.name,
    statute: rules.statuteTitle,
    statuteUrl: rules.statuteUrl,
    returnDeadlineDays: rules.returnDeadline,
    claimDeadlineDays: rules.claimDeadline,
    returnDeadline: analysis.returnDeadline.toISOString().split("T")[0],
    claimDeadline: analysis.claimDeadline.toISOString().split("T")[0],
    daysSinceMoveOut: analysis.daysSinceMoveOut,
    returnDeadlinePassed: analysis.returnDeadlinePassed,
    claimDeadlinePassed: analysis.claimDeadlinePassed,
    landlordInViolation: analysis.landlordInViolation,
    violationType: analysis.violationType,
    daysLate: analysis.landlordInViolation
      ? Math.abs(analysis.daysUntilClaimDeadline)
      : null,
    certifiedMailRequired: rules.certifiedMailRequired,
    itemizedDeductionsRequired: rules.itemizedDeductionsRequired,
    damagesMultiplier: rules.damagesMultiplier,
    damagesDescription: rules.damagesDescription,
    maxSmallClaims: rules.maxSmallClaims,
    filingFee: rules.filingFee,
    courtName: rules.courtName,
    // Exact statute citations — Claude MUST use these instead of citing from memory
    statuteSections: rules.statuteSections,
    // Verbatim statutory language — Claude should quote from these
    statutoryLanguage: rules.statutoryLanguage,
  };

  // Richer client-facing data for CaseSummaryCard
  const clientData = {
    stateCode: result.stateCode,
    stateName: result.stateName,
    statute: result.statute,
    landlordInViolation: result.landlordInViolation,
    violationType: result.violationType,
    claimDeadline: result.claimDeadline,
    daysLate: result.daysLate,
    returnDeadlineDays: result.returnDeadlineDays,
    claimDeadlineDays: result.claimDeadlineDays,
    certifiedMailRequired: result.certifiedMailRequired,
    maxSmallClaims: result.maxSmallClaims,
    filingFee: result.filingFee,
    courtName: result.courtName,
    damagesMultiplier: result.damagesMultiplier,
    damagesDescription: result.damagesDescription,
  };

  return { result, clientData };
}

function handleCalculateDamages(input: Record<string, unknown>) {
  const stateCode = (input.state_code as string)?.toUpperCase();
  const depositAmount = input.deposit_amount as number;
  const claimedDeductions = (input.claimed_deductions as number) || 0;
  const badFaith = (input.bad_faith as boolean) ?? false;

  if (!isValidStateCode(stateCode)) {
    return {
      result: { error: `State "${stateCode}" is not currently supported.` },
      clientData: {},
    };
  }

  const rules = getStateRulesByCode(stateCode as StateCode);
  const damages = calculateDamages(depositAmount, claimedDeductions, badFaith, rules);

  const result = {
    depositAmount: damages.depositAmount,
    claimedDeductions: damages.claimedDeductions,
    amountOwed: damages.amountOwed,
    multiplierDamagesEligible: damages.multiplierDamagesEligible,
    multiplierDamagesAmount: damages.multiplierDamagesAmount,
    maxRecoverable: damages.maxRecoverable,
    smallClaimsEligible: damages.smallClaimsEligible,
    damagesDescription: damages.damagesDescription,
    damagesMultiplier: rules.damagesMultiplier,
    // Exact statute citations for damages — Claude MUST use these
    damagesProvision: rules.statuteSections.damagesProvision,
    forfeitureProvision: rules.statuteSections.forfeitureProvision,
    // Verbatim statutory language for damages
    damagesClause: rules.statutoryLanguage.damagesClause,
    forfeitureClause: rules.statutoryLanguage.forfeitureClause,
  };

  // Richer client data
  const clientData = {
    depositAmount: result.depositAmount,
    maxRecoverable: result.maxRecoverable,
    damagesMultiplier: rules.damagesMultiplier,
    amountOwed: result.amountOwed,
    multiplierDamagesEligible: result.multiplierDamagesEligible,
    multiplierDamagesAmount: result.multiplierDamagesAmount,
    smallClaimsEligible: result.smallClaimsEligible,
  };

  return { result, clientData };
}

function handleAssessCaseStrength(input: Record<string, unknown>) {
  const stateCode = (input.state_code as string)?.toUpperCase();
  const moveOutDate = input.move_out_date as string;
  const depositAmount = input.deposit_amount as number;
  const depositReturned = input.deposit_returned as "yes" | "no" | "not_sure";

  if (!isValidStateCode(stateCode)) {
    return {
      result: { error: `State "${stateCode}" is not currently supported.` },
      clientData: {},
    };
  }

  const rules = getStateRulesByCode(stateCode as StateCode);
  const analysis = analyzeDeadlines(new Date(moveOutDate), rules);
  const assessment = assessCaseStrength(analysis, depositReturned, depositAmount, rules);

  const result = {
    caseStrength: assessment.label,
    caseScore: assessment.score,
    caseFactors: assessment.factors,
  };

  const clientData = {
    caseStrength: assessment.label,
    caseScore: assessment.score,
    caseFactors: assessment.factors,
  };

  return { result, clientData };
}

function handleRecommendProduct(input: Record<string, unknown>) {
  const product = input.product as string;
  const reason = input.reason as string;
  const stateCode = (input.state_code as string)?.toUpperCase() || null;
  const recoveryAmount = (input.recovery_amount as number) || null;

  // Look up state name and statute if state_code provided
  let stateName: string | null = null;
  let statute: string | null = null;
  if (stateCode && isValidStateCode(stateCode)) {
    const rules = getStateRulesByCode(stateCode as StateCode);
    stateName = rules.name;
    statute = rules.statuteTitle;
  }

  const products: Record<string, {
    headline: string;
    description: string;
    price: number;
    features: string[];
  }> = {
    demand_letter: {
      headline: "Personalized Demand Letter",
      description: "A formal legal demand letter citing your state's specific statutes, personalized with your case details. Demand letters recover deposits 60-70% of the time without court.",
      price: 2900,
      features: [
        "Personalized demand letter citing statute",
        "State-specific deadlines & penalties",
        "Evidence documentation checklist",
        "Small claims court reference",
      ],
    },
    legal_packet: {
      headline: "Complete Legal Packet",
      description: "Demand letter + evidence checklist + small claims filing guide + landlord response templates. Everything you need if your landlord doesn't cooperate.",
      price: 7900,
      features: [
        "Everything in the Demand Letter, plus:",
        "Small claims court filing guide",
        "Evidence organization template",
        "Landlord response letter templates",
        "Court hearing preparation checklist",
      ],
    },
    case_review: {
      headline: "Personalized Case Review",
      description: "Our team analyzes your specific situation and produces a detailed memo with customized strategy, specific deadlines, and step-by-step action plan.",
      price: 14900,
      features: [
        "Detailed case analysis memo",
        "Customized legal strategy",
        "Specific deadline calendar",
        "Step-by-step action plan",
        "Priority email support",
      ],
    },
  };

  const productInfo = products[product];
  if (!productInfo) {
    return { result: { error: `Unknown product: ${product}` }, clientData: {} };
  }

  return {
    result: {
      product,
      reason,
      headline: productInfo.headline,
      description: productInfo.description,
      price: productInfo.price,
    },
    clientData: {
      purchaseOffer: {
        product,
        headline: productInfo.headline,
        description: productInfo.description,
        price: productInfo.price,
        features: productInfo.features,
        stateName,
        statute,
        recoveryAmount,
      },
    },
  };
}
