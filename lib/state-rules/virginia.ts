import type { StateRules } from './types';

/**
 * Virginia Security Deposit Rules
 * Based on Va. Code § 55.1-1226
 *
 * Key deadlines:
 * - 45 days: Return deposit with itemized statement
 * - Inspection within 72 hours if tenant requests to attend
 *
 * If landlord fails to comply:
 * - Missing deadline may forfeit right to make any deductions
 * - Willful violation or wrongful retention: up to double damages
 * - Plus court costs and attorney fees
 *
 * Note: Deductions over $125 require actual receipts/invoices
 */
export const VIRGINIA: StateRules = {
  code: 'VA',
  name: 'Virginia',
  slug: 'virginia',

  // Deadlines
  returnDeadline: 45,
  claimDeadline: 45,

  // Legal reference
  statute: '55.1-1226',
  statuteTitle: 'Va. Code § 55.1-1226',
  statuteUrl: 'https://law.lis.virginia.gov/vacode/title55.1/chapter12/section55.1-1226/',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'Va. Code § 55.1-1226(A)',
    claimDeadline: 'Va. Code § 55.1-1226(A)',
    itemizationRequirement: 'Va. Code § 55.1-1226(A)',
    forfeitureProvision: 'Va. Code § 55.1-1226(A)',
    damagesProvision: 'Va. Code § 55.1-1226(A)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'The security deposit and any deductions, damages, and charges shall be itemized by the landlord in a written notice given to the tenant, together with any amount due to the tenant, within 45 days after the termination date of the tenancy or the date the tenant vacates the dwelling unit, whichever occurs last.',
    forfeitureClause: 'The landlord shall forfeit any right to withhold any portion of the security deposit for any reason or to pursue any claim against the tenant for damages to the premises if the landlord fails to comply with the provisions of this section.',
    damagesClause: 'If the landlord fails to comply with the provisions of this section, the tenant may recover as damages the security deposit wrongfully withheld plus actual damages, court costs, and reasonable attorney fees.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court (General District Court)
  maxSmallClaims: 5000,
  smallClaimsNote: 'General District Court handles claims up to $25,000; small claims division up to $5,000',
  filingFee: { min: 50, max: 75 },
  courtName: 'General District Court',

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'up to double damages',
  additionalDamages: 'Plus court costs and attorney fees',

  // Marketing
  headline: 'Get Your Security Deposit Back in Virginia',
  description: 'Generate a professional dispute packet under Va. Code § 55.1-1226. Virginia landlords must return your deposit within 45 days with an itemized written notice of any deductions.',

  // Demand letter insert
  demandLetterInsert: 'Under Virginia law (Va. Code § 55.1-1226(A)), the landlord must provide the security deposit and any deductions in an itemized written notice, together with any amount due to the tenant, within 45 days after the termination date of the tenancy or the date the tenant vacates, whichever occurs last. Failure to comply with this section forfeits the landlord\'s right to withhold any portion of the deposit. The tenant may recover damages including the amount wrongfully withheld plus actual damages, court costs, and reasonable attorney fees. I reserve the right to pursue all remedies available under law.',
};
