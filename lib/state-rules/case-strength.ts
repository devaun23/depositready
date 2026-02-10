import type { DeadlineAnalysis, CaseStrength } from './types';

type DepositStatus = 'yes' | 'no' | 'not_sure';

/**
 * Calculate case strength based on quiz data.
 *
 * Strong  → deadline passed + deposit NOT returned + amount > $500
 * Moderate → deadline passed + "not sure" about return, OR deadline within 7 days
 * Weak    → deadline hasn't passed yet
 */
export function calculateCaseStrength(
  analysis: DeadlineAnalysis,
  depositStatus: DepositStatus,
  depositAmount: number
): CaseStrength {
  if (
    analysis.claimDeadlinePassed &&
    depositStatus === 'no' &&
    depositAmount > 500
  ) {
    return 'STRONG';
  }

  if (
    analysis.claimDeadlinePassed &&
    (depositStatus === 'not_sure' || depositAmount <= 500)
  ) {
    return 'MODERATE';
  }

  if (!analysis.claimDeadlinePassed && analysis.daysUntilClaimDeadline <= 7) {
    return 'MODERATE';
  }

  return 'WEAK';
}
