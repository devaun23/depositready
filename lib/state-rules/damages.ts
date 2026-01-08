import type { StateRules, DamagesCalculation } from './types';

/**
 * Calculate potential damages and recovery amounts
 * Uses state-specific rules for damages multiplier and small claims limit
 */
export function calculateDamages(
  depositAmount: number,
  claimedDeductions: number,
  badFaith: boolean,
  rules: StateRules
): DamagesCalculation {
  const amountOwed = depositAmount - claimedDeductions;

  // Multiplier damages available for bad faith claims
  const multiplierDamagesEligible = badFaith && rules.damagesMultiplier > 1;
  const multiplierDamagesAmount = multiplierDamagesEligible
    ? depositAmount * rules.damagesMultiplier
    : 0;

  // Max recoverable is the greater of actual damages or multiplier damages
  const maxRecoverable = multiplierDamagesEligible
    ? Math.max(amountOwed, multiplierDamagesAmount)
    : amountOwed;

  // Small claims eligibility
  const smallClaimsEligible = maxRecoverable <= rules.maxSmallClaims;

  return {
    depositAmount,
    claimedDeductions,
    amountOwed,
    multiplierDamagesEligible,
    multiplierDamagesAmount,
    smallClaimsEligible,
    maxRecoverable,
    damagesDescription: rules.damagesDescription,
  };
}
