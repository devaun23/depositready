import type { StateRules } from './types';

/**
 * New York Security Deposit Rules
 * Based on New York General Obligations Law 7-108
 *
 * Key deadlines:
 * - 14 days: Return deposit with itemized statement
 *
 * If landlord fails to comply:
 * - Forfeits right to retain any portion of deposit
 * - Intentional violations: tenant may recover up to 2x deposit
 *
 * Note: Deposit limited to 1 month's rent (HSTPA 2019)
 */
export const NEW_YORK: StateRules = {
  code: 'NY',
  name: 'New York',
  slug: 'new-york',

  // Deadlines
  returnDeadline: 14,
  claimDeadline: 14,

  // Legal reference
  statute: '7-108',
  statuteTitle: 'NY General Obligations Law 7-108',
  statuteUrl: 'https://www.nysenate.gov/legislation/laws/GOB/7-108',

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court
  maxSmallClaims: 10000,
  smallClaimsNote: 'NYC: $10,000 limit. Outside NYC: $5,000 limit.',
  filingFee: { min: 15, max: 20 },

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'double damages',

  // Marketing
  headline: 'Get Your Security Deposit Back in New York',
  description: 'Generate a professional dispute packet under NY General Obligations Law 7-108. New York landlords must return your deposit within 14 days with an itemized statement.',
};
