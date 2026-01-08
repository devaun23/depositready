import type { StateRules, DeadlineAnalysis } from './types';

/**
 * Calculate deadlines and whether landlord is in violation
 * Uses state-specific rules to determine deadlines
 */
export function analyzeDeadlines(
  moveOutDate: Date,
  rules: StateRules
): DeadlineAnalysis {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const moveOut = new Date(moveOutDate);
  moveOut.setHours(0, 0, 0, 0);

  const returnDeadline = new Date(moveOut);
  returnDeadline.setDate(returnDeadline.getDate() + rules.returnDeadline);

  const claimDeadline = new Date(moveOut);
  claimDeadline.setDate(claimDeadline.getDate() + rules.claimDeadline);

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

  let violationType: DeadlineAnalysis['violationType'] = 'none';
  if (returnDeadlinePassed && claimDeadlinePassed) {
    violationType = 'both';
  } else if (claimDeadlinePassed) {
    violationType = 'claim';
  } else if (returnDeadlinePassed) {
    violationType = 'return';
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
