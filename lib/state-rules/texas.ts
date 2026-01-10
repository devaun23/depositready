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

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'Tex. Prop. Code § 92.103(a)',
    claimDeadline: 'Tex. Prop. Code § 92.104(a)',
    itemizationRequirement: 'Tex. Prop. Code § 92.104(c)',
    forfeitureProvision: 'Tex. Prop. Code § 92.109(a)',
    damagesProvision: 'Tex. Prop. Code § 92.109(a)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'The landlord shall refund a security deposit to the tenant on or before the 30th day after the date the tenant surrenders the premises.',
    forfeitureClause: 'A landlord who in bad faith retains a security deposit in violation of this subchapter is liable for an amount equal to the sum of $100, three times the portion of the deposit wrongfully withheld, and the tenant\'s reasonable attorney\'s fees in a suit to recover the deposit.',
    damagesClause: 'A landlord who fails to return a security deposit or provide a written description and itemized list of deductions on or before the 30th day is presumed to have acted in bad faith.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court (Justice Court)
  maxSmallClaims: 20000,
  filingFee: { min: 46, max: 96 },
  courtName: 'Justice Court',

  // Damages
  damagesMultiplier: 3,
  damagesDescription: 'triple damages',
  additionalDamages: '$100 statutory penalty + 3x amount wrongfully withheld + attorney fees',

  // Marketing
  headline: 'Get Your Security Deposit Back in Texas',
  description: 'Generate a professional dispute packet under Texas Property Code 92.103. Texas landlords must return your deposit within 30 days of receiving your forwarding address.',

  // Demand letter insert
  demandLetterInsert: 'Under Texas law (Property Code § 92.103(a)), a landlord must refund the security deposit on or before the 30th day after the tenant surrenders the premises. Pursuant to Property Code § 92.104(c), if any portion is retained, the landlord must provide a written description and itemized list of all deductions. Under Property Code § 92.109(a), a landlord who in bad faith retains a security deposit is liable for $100, three times the portion wrongfully withheld, and the tenant\'s reasonable attorney\'s fees. Failure to return the deposit or provide itemization within 30 days creates a presumption of bad faith.',
};
