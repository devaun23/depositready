import type { DeadlineAnalysis, CaseStrength, CaseStrengthAssessment, CaseStrengthFactor, StateRules } from './types';

type DepositStatus = 'yes' | 'no' | 'not_sure';

/**
 * Calculate case strength based on quiz data.
 * Returns the simple label for backward compatibility (wizard, orders, diagnose flows).
 */
export function calculateCaseStrength(
  analysis: DeadlineAnalysis,
  depositStatus: DepositStatus,
  depositAmount: number
): CaseStrength {
  return assessCaseStrength(analysis, depositStatus, depositAmount).label;
}

/**
 * Full case strength assessment with 0-100 score and contributing factors.
 * Used by the chat AI for richer analysis.
 *
 * Scoring: baseline 50, clamped 0-100
 *  - Deadline violation: +0 to +30 (scaled by days late)
 *  - Deposit not returned: +15 / uncertain: 0 / returned: -20
 *  - Amount > $2000: +10 / > $500: +5 / <= $500: -5
 *  - State multiplier >= 3x: +10 / 2x: +5
 */
export function assessCaseStrength(
  analysis: DeadlineAnalysis,
  depositStatus: DepositStatus,
  depositAmount: number,
  stateRules?: StateRules
): CaseStrengthAssessment {
  let score = 50;
  const factors: CaseStrengthFactor[] = [];

  // ── Deadline violation ────────────────────────────────────────
  if (analysis.claimDeadlinePassed) {
    const daysLate = Math.abs(analysis.daysUntilClaimDeadline);
    // Scale: 1 day late = +10, 15+ days = +20, 30+ days = +30
    const deadlineBonus = Math.min(30, 10 + Math.floor(daysLate / 15) * 10);
    score += deadlineBonus;
    factors.push({
      name: 'Deadline violation',
      impact: 'positive',
      detail: `Landlord is ${daysLate} day${daysLate === 1 ? '' : 's'} past the return deadline`,
    });
  } else if (analysis.daysUntilClaimDeadline <= 7) {
    score += 5;
    factors.push({
      name: 'Deadline approaching',
      impact: 'neutral',
      detail: `Return deadline is in ${analysis.daysUntilClaimDeadline} day${analysis.daysUntilClaimDeadline === 1 ? '' : 's'}`,
    });
  } else {
    score -= 15;
    factors.push({
      name: 'Deadline not passed',
      impact: 'negative',
      detail: `Landlord still has ${analysis.daysUntilClaimDeadline} days to return the deposit`,
    });
  }

  // ── Deposit return status ─────────────────────────────────────
  if (depositStatus === 'no') {
    score += 15;
    factors.push({
      name: 'Deposit not returned',
      impact: 'positive',
      detail: 'No deposit or itemization received',
    });
  } else if (depositStatus === 'not_sure') {
    factors.push({
      name: 'Return status unclear',
      impact: 'neutral',
      detail: 'Uncertain whether deposit was fully returned',
    });
  } else {
    score -= 20;
    factors.push({
      name: 'Deposit returned',
      impact: 'negative',
      detail: 'Deposit was returned (dispute may be about deductions)',
    });
  }

  // ── Deposit amount ────────────────────────────────────────────
  if (depositAmount > 2000) {
    score += 10;
    factors.push({
      name: 'Significant amount',
      impact: 'positive',
      detail: `$${depositAmount.toLocaleString()} deposit increases recovery value`,
    });
  } else if (depositAmount > 500) {
    score += 5;
    factors.push({
      name: 'Moderate amount',
      impact: 'positive',
      detail: `$${depositAmount.toLocaleString()} deposit at stake`,
    });
  } else {
    score -= 5;
    factors.push({
      name: 'Small amount',
      impact: 'negative',
      detail: `$${depositAmount.toLocaleString()} deposit — court costs may reduce net recovery`,
    });
  }

  // ── State multiplier (if state rules provided) ────────────────
  if (stateRules) {
    if (stateRules.damagesMultiplier >= 3) {
      score += 10;
      factors.push({
        name: 'Strong penalty law',
        impact: 'positive',
        detail: `${stateRules.name} allows ${stateRules.damagesMultiplier}x penalty damages`,
      });
    } else if (stateRules.damagesMultiplier >= 2) {
      score += 5;
      factors.push({
        name: 'Penalty damages available',
        impact: 'positive',
        detail: `${stateRules.name} allows ${stateRules.damagesMultiplier}x penalty damages`,
      });
    }
  }

  // Clamp to 0-100
  score = Math.max(0, Math.min(100, score));

  // Derive label
  let label: CaseStrength;
  if (score >= 70) label = 'STRONG';
  else if (score >= 40) label = 'MODERATE';
  else label = 'WEAK';

  return { score, label, factors };
}
