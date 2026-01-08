import type { StateRules } from './types';

/**
 * California Security Deposit Rules
 * Based on California Civil Code 1950.5
 *
 * Key deadlines:
 * - 21 days: Return deposit OR provide itemized statement
 *
 * If landlord fails to comply:
 * - Forfeits right to retain any portion of deposit
 * - Bad faith: tenant may recover up to 2x the deposit
 *
 * 2025 Updates (AB 2801):
 * - Landlords must take photographs before repairs/cleaning
 */
export const CALIFORNIA: StateRules = {
  code: 'CA',
  name: 'California',
  slug: 'california',

  // Deadlines
  returnDeadline: 21,
  claimDeadline: 21,

  // Legal reference
  statute: '1950.5',
  statuteTitle: 'California Civil Code 1950.5',
  statuteUrl: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1950.5.&lawCode=CIV',

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court
  maxSmallClaims: 10000,
  filingFee: { min: 30, max: 75 },

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'double damages',

  // Marketing
  headline: 'Get Your Security Deposit Back in California',
  description: 'Generate a professional dispute packet under California Civil Code 1950.5. California landlords must return your deposit or provide itemized deductions within 21 days.',
};
