import type { StateRules } from './types';

/**
 * Pennsylvania Security Deposit Rules
 * Based on 68 Pa. Stat. § 250.512
 *
 * Key deadlines:
 * - 30 days: Return deposit with itemized deductions
 * - Clock starts when tenant vacates AND provides forwarding address
 *
 * If landlord fails to comply:
 * - Forfeits ALL rights to withhold any portion
 * - Forfeits right to sue for property damage
 * - Tenant may recover up to 2x deposit amount
 *
 * Note: Applies statewide including Philadelphia and Pittsburgh
 */
export const PENNSYLVANIA: StateRules = {
  code: 'PA',
  name: 'Pennsylvania',
  slug: 'pennsylvania',

  // Deadlines
  returnDeadline: 30,
  claimDeadline: 30,

  // Legal reference
  statute: '250.512',
  statuteTitle: '68 Pa. Stat. § 250.512',
  statuteUrl: 'https://www.legis.state.pa.us/cfdocs/legis/LI/uconsCheck.cfm?txtType=HTM&yr=1951&sessInd=0&smthLwInd=0&act=20&chpt=5&sctn=12&subsctn=0',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: '68 Pa. Stat. § 250.512(a)',
    claimDeadline: '68 Pa. Stat. § 250.512(a)',
    itemizationRequirement: '68 Pa. Stat. § 250.512(a)',
    forfeitureProvision: '68 Pa. Stat. § 250.512(c)',
    damagesProvision: '68 Pa. Stat. § 250.512(d)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'Within thirty days of termination of a lease or upon surrender and acceptance of the leasehold premises, whichever first occurs, the lessor shall provide a tenant with a written list of any damages to the leasehold premises for which the lessor claims the tenant is liable.',
    forfeitureClause: 'Any landlord who fails to provide a written list within thirty days as required by this section shall forfeit all rights to withhold any portion of the security deposit for any reason or to bring suit against the tenant for damages to the leasehold premises.',
    damagesClause: 'If the landlord fails to comply with the provisions of this section, the tenant shall recover double the amount of the deposit.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court (Magisterial District Court)
  maxSmallClaims: 12000,
  filingFee: { min: 50, max: 125 },
  courtName: 'Magisterial District Court',

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'double the deposit amount',
  additionalDamages: 'Landlord forfeits ALL rights to withhold any portion',

  // Marketing
  headline: 'Get Your Security Deposit Back in Pennsylvania',
  description: 'Generate a professional dispute packet under 68 Pa. Stat. § 250.512. Pennsylvania landlords must return your deposit within 30 days with an itemized list of any damages.',

  // Demand letter insert
  demandLetterInsert: 'Under Pennsylvania law (68 Pa. Stat. § 250.512(a)), the landlord must provide a written list of any damages for which the tenant is liable within thirty days of termination of the lease or surrender of the premises. Pursuant to 68 Pa. Stat. § 250.512(c), failure to provide this list within thirty days forfeits all rights to withhold any portion of the security deposit or to bring suit for damages. Under 68 Pa. Stat. § 250.512(d), the tenant shall recover double the amount of the deposit if the landlord fails to comply. I reserve the right to pursue all remedies available under law.',
};
