import type { StateRules } from './types';

/**
 * Georgia Security Deposit Rules
 * Based on O.C.G.A. 44-7-30 through 44-7-37
 *
 * Key deadlines:
 * - 30 days: Return deposit with itemized deductions
 * - Inspection required within 3 business days of move-out
 * - Tenant can inspect damage list within 5 business days
 *
 * If landlord fails to comply:
 * - Forfeits right to withhold any portion of deposit
 * - Bad faith: tenant may recover 3x amount wrongfully withheld + attorney fees
 *
 * Note: Rules don't apply to landlords with 10 or fewer units (except return rules)
 */
export const GEORGIA: StateRules = {
  code: 'GA',
  name: 'Georgia',
  slug: 'georgia',

  // Deadlines
  returnDeadline: 30,
  claimDeadline: 30,

  // Legal reference
  statute: '44-7-34',
  statuteTitle: 'O.C.G.A. 44-7-34',
  statuteUrl: 'https://law.justia.com/codes/georgia/2022/title-44/chapter-7/article-2/section-44-7-34/',

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court (Magistrate Court)
  maxSmallClaims: 15000,
  filingFee: { min: 45, max: 75 },

  // Damages
  damagesMultiplier: 3,
  damagesDescription: 'triple damages',

  // Marketing
  headline: 'Get Your Security Deposit Back in Georgia',
  description: 'Generate a professional dispute packet under Georgia Code 44-7-34. Georgia landlords must return your deposit within 30 days with an itemized list of deductions.',

  // Demand letter insert
  demandLetterInsert: 'Georgia law (O.C.G.A. 44-7-34) requires return of the deposit or delivery of a written itemized list of deductions within 30 days after termination and delivery of possession.',
};
