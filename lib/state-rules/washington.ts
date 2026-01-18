import type { StateRules } from './types';

/**
 * Washington Security Deposit Rules
 * Based on RCW 59.18.280
 *
 * Key deadlines:
 * - 30 days: Return deposit with full statement and documentation
 *   (Previously 21 days, extended by recent legislation)
 *
 * If landlord fails to comply:
 * - Court may award up to 2x the deposit for intentional refusal
 * - Prevailing party entitled to attorney fees
 * - Must include documentation (invoices, receipts, estimates)
 *
 * Note: No portion may be withheld for carpet cleaning without documentation
 */
export const WASHINGTON: StateRules = {
  code: 'WA',
  name: 'Washington',
  slug: 'washington',

  // Deadlines
  returnDeadline: 30,
  claimDeadline: 30,

  // Legal reference
  statute: '59.18.280',
  statuteTitle: 'RCW 59.18.280',
  statuteUrl: 'https://app.leg.wa.gov/rcw/default.aspx?cite=59.18.280',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'RCW 59.18.280(1)',
    claimDeadline: 'RCW 59.18.280(1)',
    itemizationRequirement: 'RCW 59.18.280(1)',
    forfeitureProvision: 'RCW 59.18.280(2)',
    damagesProvision: 'RCW 59.18.280(2)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'Within thirty days after the termination of the rental agreement and vacation of the premises or, if the tenant abandons the premises, within thirty days after the landlord learns of the abandonment, the landlord shall give a full and specific statement of the basis for retaining any of the deposit together with the payment of any refund due the tenant under the terms and conditions of the rental agreement.',
    forfeitureClause: 'The court may in its discretion award up to two times the amount of the deposit for the intentional refusal of the landlord to give the statement or refund due.',
    damagesClause: 'In any action brought by the tenant to recover the deposit, the prevailing party shall additionally be entitled to the cost of suit or arbitration including reasonable attorneys\' fees.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court (District Court)
  maxSmallClaims: 10000,
  filingFee: { min: 35, max: 75 },
  courtName: 'District Court, Small Claims Department',

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'up to double damages',
  additionalDamages: 'Plus attorney fees to prevailing party',

  // Marketing
  headline: 'Get Your Security Deposit Back in Washington',
  description: 'Generate a professional dispute packet under RCW 59.18.280. Washington landlords must return your deposit within 30 days with a full statement and documentation of any deductions.',

  // Demand letter insert
  demandLetterInsert: 'Under Washington law (RCW 59.18.280(1)), the landlord must give a full and specific statement of the basis for retaining any of the deposit together with the payment of any refund due within thirty days after termination of the rental agreement and vacation of the premises. Pursuant to RCW 59.18.280(2), the court may award up to two times the amount of the deposit for intentional refusal to give the statement or refund due. The prevailing party is additionally entitled to reasonable attorneys\' fees. I reserve the right to pursue all remedies available under law.',
};
