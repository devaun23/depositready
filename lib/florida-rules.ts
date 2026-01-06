/**
 * Florida Security Deposit Rules
 * Based on Florida Statute 83.49
 *
 * Key deadlines:
 * - 15 days: Return full deposit if no deductions
 * - 30 days: Send written notice of intent to claim deductions
 *
 * If landlord fails to comply:
 * - Forfeits right to impose claim on deposit
 * - Tenant may recover deposit + court costs + attorney fees
 * - Bad faith claims: tenant entitled to triple damages
 */

export const FLORIDA_RULES = {
  // Deadlines in days from move-out
  returnDeadline: 15, // Days to return if no deductions
  claimDeadline: 30, // Days to send itemized claim

  // Requirements
  certifiedMailRequired: true,
  itemizedDeductionsRequired: true,

  // Small claims court
  maxSmallClaims: 8000, // Maximum for small claims court
  filingFee: { min: 55, max: 300 }, // Varies by amount claimed

  // Damages
  tripleDamagesAvailable: true, // For bad faith claims

  // Statute reference
  statute: "83.49",
  statuteUrl:
    "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0000-0099/0083/Sections/0083.49.html",
} as const;

export interface DeadlineAnalysis {
  moveOutDate: Date;
  returnDeadline: Date;
  claimDeadline: Date;
  today: Date;
  returnDeadlinePassed: boolean;
  claimDeadlinePassed: boolean;
  daysSinceMoveOut: number;
  daysUntilReturnDeadline: number;
  daysUntilClaimDeadline: number;
  landlordInViolation: boolean;
  violationType: "none" | "return" | "claim" | "both";
}

export interface DamagesCalculation {
  depositAmount: number;
  claimedDeductions: number;
  amountOwed: number;
  tripleDamagesEligible: boolean;
  tripleDamagesAmount: number;
  smallClaimsEligible: boolean;
  maxRecoverable: number;
}

/**
 * Calculate deadlines and whether landlord is in violation
 */
export function analyzeDeadlines(moveOutDate: Date): DeadlineAnalysis {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const moveOut = new Date(moveOutDate);
  moveOut.setHours(0, 0, 0, 0);

  const returnDeadline = new Date(moveOut);
  returnDeadline.setDate(returnDeadline.getDate() + FLORIDA_RULES.returnDeadline);

  const claimDeadline = new Date(moveOut);
  claimDeadline.setDate(claimDeadline.getDate() + FLORIDA_RULES.claimDeadline);

  const daysSinceMoveOut = Math.floor(
    (today.getTime() - moveOut.getTime()) / (1000 * 60 * 60 * 24)
  );

  const daysUntilReturnDeadline = Math.floor(
    (returnDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const daysUntilClaimDeadline = Math.floor(
    (claimDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const returnDeadlinePassed = today > returnDeadline;
  const claimDeadlinePassed = today > claimDeadline;

  let violationType: DeadlineAnalysis["violationType"] = "none";
  if (returnDeadlinePassed && claimDeadlinePassed) {
    violationType = "both";
  } else if (claimDeadlinePassed) {
    violationType = "claim";
  } else if (returnDeadlinePassed) {
    violationType = "return";
  }

  return {
    moveOutDate: moveOut,
    returnDeadline,
    claimDeadline,
    today,
    returnDeadlinePassed,
    claimDeadlinePassed,
    daysSinceMoveOut,
    daysUntilReturnDeadline,
    daysUntilClaimDeadline,
    landlordInViolation: returnDeadlinePassed || claimDeadlinePassed,
    violationType,
  };
}

/**
 * Calculate potential damages and recovery amounts
 */
export function calculateDamages(
  depositAmount: number,
  claimedDeductions: number,
  badFaith: boolean
): DamagesCalculation {
  const amountOwed = depositAmount - claimedDeductions;

  // Triple damages available for bad faith claims under FL 83.49(3)(c)
  const tripleDamagesEligible = badFaith && FLORIDA_RULES.tripleDamagesAvailable;
  const tripleDamagesAmount = tripleDamagesEligible ? depositAmount * 3 : 0;

  // Max recoverable is the greater of actual damages or triple damages
  const maxRecoverable = tripleDamagesEligible
    ? Math.max(amountOwed, tripleDamagesAmount)
    : amountOwed;

  // Small claims eligibility
  const smallClaimsEligible = maxRecoverable <= FLORIDA_RULES.maxSmallClaims;

  return {
    depositAmount,
    claimedDeductions,
    amountOwed,
    tripleDamagesEligible,
    tripleDamagesAmount,
    smallClaimsEligible,
    maxRecoverable,
  };
}

/**
 * Format a date for legal documents (Month Day, Year)
 */
export function formatLegalDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generate statute citation
 */
export function getStatuteCitation(): string {
  return `Florida Statute ${FLORIDA_RULES.statute}`;
}
