/**
 * State Rules Type Definitions
 *
 * This module defines the interfaces for state-specific security deposit laws.
 * Each state has different deadlines, statutes, small claims limits, and damages.
 */

export type StateCode = 'FL' | 'CA' | 'TX' | 'NY' | 'GA' | 'IL';

export interface StateRules {
  // Identity
  code: StateCode;
  name: string;
  slug: string; // URL-friendly: "florida", "california", etc.

  // Deadlines (in days from move-out)
  returnDeadline: number;      // Days to return deposit if no deductions
  claimDeadline: number;       // Days to send itemized claim
  claimDeadlineNote?: string;  // For states with variable deadlines (e.g., IL: "30-45 days")

  // Legal reference
  statute: string;             // "83.49", "1950.5", etc.
  statuteTitle: string;        // "Florida Statute 83.49"
  statuteUrl: string;

  // Detailed statute section citations (for attorney-quality documents)
  statuteSections: {
    returnDeadline: string;      // "F.S. 83.49(3)(a)"
    claimDeadline: string;       // "F.S. 83.49(3)(b)"
    itemizationRequirement: string;
    forfeitureProvision: string;
    damagesProvision: string;
  };

  // Exact statutory language quotes
  statutoryLanguage: {
    forfeitureClause: string;    // Exact quote from statute about forfeiture
    damagesClause: string;       // Exact quote about damages/penalties
    deadlineClause: string;      // Exact quote about return deadline
  };

  // Requirements
  certifiedMailRequired: boolean;
  itemizedDeductionsRequired: boolean;

  // Small claims court
  maxSmallClaims: number;
  smallClaimsNote?: string;    // For NY: "NYC: $10,000, rest of state: $5,000"
  filingFee: { min: number; max: number };
  courtName: string;           // "County Court, Small Claims Division"

  // Damages
  damagesMultiplier: number;   // 2 for 2x, 3 for 3x
  damagesDescription: string;  // "double damages", "triple damages"
  additionalDamages?: string;  // For TX: "$100 + 3x + attorney fees"

  // Marketing/SEO
  headline: string;
  description: string;

  // Demand letter state-specific insert
  demandLetterInsert: string;
}

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
  violationType: 'none' | 'return' | 'claim' | 'both';
}

export interface DamagesCalculation {
  depositAmount: number;
  claimedDeductions: number;
  amountOwed: number;
  multiplierDamagesEligible: boolean;
  multiplierDamagesAmount: number;
  smallClaimsEligible: boolean;
  maxRecoverable: number;
  damagesDescription: string;
}
