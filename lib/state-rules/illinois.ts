import type { StateRules } from './types';

/**
 * Illinois Security Deposit Rules
 * Based on 765 ILCS 710 (Security Deposit Return Act)
 *
 * Key deadlines:
 * - 30 days: Provide itemized statement of deductions
 * - 45 days: Return remaining deposit (if no deductions, return within 45 days)
 *
 * If landlord fails to comply:
 * - Tenant may recover 2x deposit amount + attorney fees
 *
 * Notes:
 * - 25+ unit buildings must pay interest on deposits held 6+ months
 * - Chicago has stricter rules under CRLTO (21-day return)
 */
export const ILLINOIS: StateRules = {
  code: 'IL',
  name: 'Illinois',
  slug: 'illinois',

  // Deadlines
  returnDeadline: 45,
  claimDeadline: 30,
  claimDeadlineNote: 'Itemized statement due in 30 days; deposit return in 45 days',

  // Legal reference
  statute: '765 ILCS 710',
  statuteTitle: '765 ILCS 710 Security Deposit Return Act',
  statuteUrl: 'https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=2202&ChapterID=62',

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court
  maxSmallClaims: 10000,
  filingFee: { min: 35, max: 75 },

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'double damages',

  // Marketing
  headline: 'Get Your Security Deposit Back in Illinois',
  description: 'Generate a professional dispute packet under 765 ILCS 710. Illinois landlords must provide an itemized statement within 30 days and return your deposit within 45 days.',
};
