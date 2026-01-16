/**
 * Landlord Risk Calculator Types
 *
 * Types for the landlord-facing risk assessment tool.
 * Calculates exposure based on demand letter date and compliance status.
 */

import type { StateCode } from '@/lib/state-rules';

export type RiskLevel = 'green' | 'yellow' | 'red';

export interface RiskCalculatorInput {
  stateCode: StateCode;
  demandLetterDate: Date;
  depositReturned: boolean;
  itemizedListSent: boolean;
  depositAmount?: number;
}

export interface RiskAssessment {
  // Deadline info
  responseDeadline: Date;
  daysRemaining: number;
  isOverdue: boolean;

  // Risk classification
  riskLevel: RiskLevel;
  riskLabel: string; // "Low Risk", "Moderate Risk", "High Risk"

  // Exposure calculation
  depositAmount: number;
  exposureMultiplier: number;
  exposureAmount: number;
  exposureDescription: string;

  // Violations detected
  violations: string[];
  violationCount: number;

  // Recommendations
  recommendations: string[];
}
