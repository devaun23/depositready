import type { StateCode } from '@/lib/state-rules/types';
import { getStateRulesByCode } from '@/lib/state-rules';
import type { ComplianceViolation, LiabilityExposure } from './types';

/**
 * Calculate a landlord's worst-case liability exposure based on
 * deposit amount, state law, and compliance violations.
 */
export function calculateLiabilityExposure(
  stateCode: StateCode,
  depositAmount: number,
  violations: ComplianceViolation[]
): LiabilityExposure {
  const rules = getStateRulesByCode(stateCode);

  const hasCriticalViolation = violations.some((v) => v.severity === 'critical');
  const violationCount = violations.length;

  // Penalty multiplier applies when there are critical violations (deadline/notice failures)
  const penaltyMultiplier = hasCriticalViolation ? rules.damagesMultiplier : 1;

  // Worst-case breakdown
  const depositReturn = depositAmount;
  const penaltyDamages = hasCriticalViolation ? depositAmount * (penaltyMultiplier - 1) : 0;
  const estimatedCourtCosts = rules.filingFee.max + 150; // filing fee + service costs
  const estimatedAttorneyFees = hasCriticalViolation ? 2500 : 0; // prevailing party attorney fees

  const worstCaseTotal = depositReturn + penaltyDamages + estimatedCourtCosts + estimatedAttorneyFees;

  // Break-even settlement: what the landlord could offer to avoid court
  // Typically deposit + small premium (20-40% depending on violation severity)
  const settlementPremium = hasCriticalViolation ? 0.4 : violationCount > 0 ? 0.2 : 0;
  const breakEvenSettlement = Math.round(depositAmount * (1 + settlementPremium));

  // Recommendation logic
  let recommendation: LiabilityExposure['recommendation'];
  let riskLevel: LiabilityExposure['riskLevel'];

  if (hasCriticalViolation && violationCount >= 2) {
    recommendation = 'settle';
    riskLevel = 'high';
  } else if (hasCriticalViolation || violationCount >= 3) {
    recommendation = 'negotiate';
    riskLevel = 'medium';
  } else {
    recommendation = 'defend';
    riskLevel = 'low';
  }

  return {
    depositAmount,
    penaltyMultiplier,
    worstCaseTotal,
    breakEvenSettlement,
    filingFeeRange: rules.filingFee,
    recommendation,
    riskLevel,
    breakdown: {
      depositReturn,
      penaltyDamages,
      estimatedCourtCosts,
      estimatedAttorneyFees,
    },
  };
}
