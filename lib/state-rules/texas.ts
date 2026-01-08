import type { StateRules } from './types';

/**
 * Texas Security Deposit Rules
 * Based on Texas Property Code 92.103-92.109
 *
 * Key deadlines:
 * - 30 days: Return deposit with itemized deductions (if applicable)
 *
 * If landlord fails to comply:
 * - Courts may presume bad faith
 * - Tenant may recover $100 + 3x amount wrongfully withheld + attorney fees
 *
 * Note: Landlord not obligated until tenant provides forwarding address
 */
export const TEXAS: StateRules = {
  code: 'TX',
  name: 'Texas',
  slug: 'texas',

  // Deadlines
  returnDeadline: 30,
  claimDeadline: 30,

  // Legal reference
  statute: '92.103',
  statuteTitle: 'Texas Property Code 92.103',
  statuteUrl: 'https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm#92.103',

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court (Justice Court)
  maxSmallClaims: 20000,
  filingFee: { min: 46, max: 96 },

  // Damages
  damagesMultiplier: 3,
  damagesDescription: 'triple damages',
  additionalDamages: '$100 statutory penalty + 3x amount wrongfully withheld + attorney fees',

  // Marketing
  headline: 'Get Your Security Deposit Back in Texas',
  description: 'Generate a professional dispute packet under Texas Property Code 92.103. Texas landlords must return your deposit within 30 days of receiving your forwarding address.',
};
