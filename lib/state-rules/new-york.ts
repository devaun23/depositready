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

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'N.Y. Gen. Oblig. Law § 7-108(1-a)(e)',
    claimDeadline: 'N.Y. Gen. Oblig. Law § 7-108(1-a)(e)',
    itemizationRequirement: 'N.Y. Gen. Oblig. Law § 7-108(1-a)(e)',
    forfeitureProvision: 'N.Y. Gen. Oblig. Law § 7-108(1-a)(e)',
    damagesProvision: 'N.Y. Gen. Oblig. Law § 7-108(1-a)(a)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'The entire amount of the deposit or advance shall be refunded to the tenant within fourteen days after the tenant has vacated the premises, except that the landlord may retain an amount to cover actual damages.',
    forfeitureClause: 'Any landlord who fails to provide the tenant with the itemized statement within fourteen days shall forfeit any right to retain any portion of the deposit.',
    damagesClause: 'Any person who intentionally violates the provisions of this subdivision shall be liable to the tenant for punitive damages of up to twice the amount of the security deposit.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court
  maxSmallClaims: 10000,
  smallClaimsNote: 'NYC: $10,000 limit. Outside NYC: $5,000 limit.',
  filingFee: { min: 15, max: 20 },
  courtName: 'Small Claims Court',

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'double damages',

  // Marketing
  headline: 'Get Your Security Deposit Back in New York',
  description: 'Generate a professional dispute packet under NY General Obligations Law 7-108. New York landlords must return your deposit within 14 days with an itemized statement.',

  // Demand letter insert
  demandLetterInsert: 'Under New York law (General Obligations Law § 7-108(1-a)(e)), the landlord must provide an itemized statement of any deductions and refund the entire remaining amount of the deposit within fourteen days after the tenant vacates. Failure to provide the itemized statement within fourteen days results in forfeiture of any right to retain any portion of the deposit. Pursuant to GOL § 7-108(1-a)(a), any person who intentionally violates these provisions may be liable for punitive damages of up to twice the amount of the security deposit.',
};
