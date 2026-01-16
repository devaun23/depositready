/**
 * Landlord Risk Calculator
 *
 * Calculates a landlord's risk exposure when responding to a tenant demand letter.
 * Uses state-specific rules to determine deadlines and potential damages.
 */

import { getStateRulesByCode, formatLegalDate } from '@/lib/state-rules';
import type { StateRules } from '@/lib/state-rules';
import type { RiskLevel, RiskCalculatorInput, RiskAssessment } from './types';

const DEFAULT_DEPOSIT_AMOUNT = 2000;

/**
 * Calculate landlord's risk exposure from a tenant demand letter
 */
export function calculateLandlordRisk(input: RiskCalculatorInput): RiskAssessment {
  const rules = getStateRulesByCode(input.stateCode);
  const depositAmount = input.depositAmount || DEFAULT_DEPOSIT_AMOUNT;

  // Calculate response deadline from demand letter date
  // Use claimDeadline as the statutory response window
  const responseDeadline = new Date(input.demandLetterDate);
  responseDeadline.setDate(responseDeadline.getDate() + rules.claimDeadline);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysRemaining = Math.floor(
    (responseDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isOverdue = daysRemaining < 0;

  // Detect violations
  const violations = detectViolations(input, rules);

  // Calculate risk level
  const riskLevel = calculateRiskLevel(daysRemaining, violations.length);

  // Calculate exposure
  const hasViolations = violations.length > 0;
  const exposureMultiplier = hasViolations ? rules.damagesMultiplier : 1;
  const exposureAmount = depositAmount * exposureMultiplier;

  return {
    responseDeadline,
    daysRemaining: Math.max(0, daysRemaining),
    isOverdue,
    riskLevel,
    riskLabel: getRiskLabel(riskLevel),
    depositAmount,
    exposureMultiplier,
    exposureAmount,
    exposureDescription: formatExposureDescription(
      depositAmount,
      exposureMultiplier,
      rules.damagesDescription
    ),
    violations,
    violationCount: violations.length,
    recommendations: generateRecommendations(riskLevel, violations, rules),
  };
}

/**
 * Detect compliance violations based on landlord's answers
 */
function detectViolations(
  input: RiskCalculatorInput,
  rules: StateRules
): string[] {
  const violations: string[] = [];

  // Check if deposit was returned
  if (!input.depositReturned) {
    violations.push(
      `Deposit not returned within ${rules.returnDeadline}-day statutory period`
    );
  }

  // Check if itemized statement was sent (if required by state)
  if (rules.itemizedDeductionsRequired && !input.itemizedListSent) {
    violations.push(
      `No itemized statement sent (required by ${rules.statuteTitle})`
    );
  }

  return violations;
}

/**
 * Calculate risk level based on days remaining and violation count
 *
 * Green: >7 days remaining AND no violations
 * Yellow: 1-7 days remaining OR 1 violation
 * Red: 0 days (overdue) OR 2+ violations
 */
function calculateRiskLevel(
  daysRemaining: number,
  violationCount: number
): RiskLevel {
  // Red: Overdue or multiple violations
  if (daysRemaining <= 0 || violationCount >= 2) {
    return 'red';
  }

  // Yellow: Running out of time or has one violation
  if (daysRemaining <= 7 || violationCount === 1) {
    return 'yellow';
  }

  // Green: Plenty of time and no violations
  return 'green';
}

/**
 * Get human-readable label for risk level
 */
function getRiskLabel(level: RiskLevel): string {
  const labels: Record<RiskLevel, string> = {
    green: 'Low Risk',
    yellow: 'Moderate Risk',
    red: 'High Risk',
  };
  return labels[level];
}

/**
 * Format exposure description for display
 */
function formatExposureDescription(
  deposit: number,
  multiplier: number,
  damagesDescription: string
): string {
  if (multiplier === 1) {
    return `$${deposit.toLocaleString()} deposit amount`;
  }
  return `$${deposit.toLocaleString()} x ${multiplier} (${damagesDescription})`;
}

/**
 * Generate actionable recommendations based on risk assessment
 */
function generateRecommendations(
  riskLevel: RiskLevel,
  violations: string[],
  rules: StateRules
): string[] {
  const recommendations: string[] = [];

  if (riskLevel === 'red') {
    recommendations.push('Respond immediately to limit further exposure');
    recommendations.push('Consider settling to avoid court costs and time');
    recommendations.push('Document all deductions with photos and receipts now');
  } else if (riskLevel === 'yellow') {
    recommendations.push('Act quickly to meet your deadline');
    recommendations.push('Gather all documentation for your deductions');
    if (violations.length > 0) {
      recommendations.push('Address compliance gaps before responding');
    }
  } else {
    recommendations.push('You have time to prepare a thorough response');
    recommendations.push('Organize all move-out documentation and photos');
    recommendations.push('Review your deductions for accuracy');
  }

  return recommendations;
}

/**
 * Get the deadline range across all supported states (for pre-calculation display)
 */
export function getDeadlineRange(): { min: number; max: number } {
  // Based on supported states:
  // FL: 30 days, CA: 21 days, TX: 30 days, NY: 14 days, GA: 30 days, IL: 30-45 days
  return { min: 14, max: 45 };
}
