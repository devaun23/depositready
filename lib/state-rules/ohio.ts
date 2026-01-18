import type { StateRules } from './types';

/**
 * Ohio Security Deposit Rules
 * Based on ORC § 5321.16
 *
 * Key deadlines:
 * - 30 days: Return deposit with itemized deductions
 * - Tenant must provide forwarding address in writing
 *
 * If landlord fails to comply:
 * - Tenant may recover amount wrongfully withheld
 * - Plus damages equal to amount wrongfully withheld
 * - Plus reasonable attorney fees
 *
 * Note: Interest required if tenancy > 6 months and deposit > $50 or 1 month's rent (5% annual)
 */
export const OHIO: StateRules = {
  code: 'OH',
  name: 'Ohio',
  slug: 'ohio',

  // Deadlines
  returnDeadline: 30,
  claimDeadline: 30,

  // Legal reference
  statute: '5321.16',
  statuteTitle: 'ORC § 5321.16',
  statuteUrl: 'https://codes.ohio.gov/ohio-revised-code/section-5321.16',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'ORC § 5321.16(B)',
    claimDeadline: 'ORC § 5321.16(B)',
    itemizationRequirement: 'ORC § 5321.16(B)',
    forfeitureProvision: 'ORC § 5321.16(C)',
    damagesProvision: 'ORC § 5321.16(C)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'Any deduction from the security deposit shall be itemized and identified by the landlord in a written notice delivered to the tenant together with the amount due, within thirty days after termination of the rental agreement and delivery of possession.',
    forfeitureClause: 'If the landlord fails to comply with division (B) of this section, the tenant may recover the property and money due him, together with damages in an amount equal to the amount wrongfully withheld, and reasonable attorneys\' fees.',
    damagesClause: 'If the landlord fails to comply with division (B) of this section, the tenant may recover the property and money due him, together with damages in an amount equal to the amount wrongfully withheld, and reasonable attorneys\' fees.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court
  maxSmallClaims: 6000,
  smallClaimsNote: 'Small Claims up to $6,000; Municipal Court for larger amounts',
  filingFee: { min: 40, max: 75 },
  courtName: 'Small Claims Court',

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'double the amount wrongfully withheld',
  additionalDamages: 'Plus reasonable attorney fees',

  // Marketing
  headline: 'Get Your Security Deposit Back in Ohio',
  description: 'Generate a professional dispute packet under ORC § 5321.16. Ohio landlords must return your deposit within 30 days with an itemized list of any deductions.',

  // Demand letter insert
  demandLetterInsert: 'Under Ohio law (ORC § 5321.16(B)), any deduction from the security deposit shall be itemized and identified by the landlord in a written notice delivered to the tenant together with the amount due, within thirty days after termination of the rental agreement and delivery of possession. Pursuant to ORC § 5321.16(C), if the landlord fails to comply, the tenant may recover the property and money due, together with damages in an amount equal to the amount wrongfully withheld, and reasonable attorneys\' fees. I reserve the right to pursue all remedies available under law.',
};
