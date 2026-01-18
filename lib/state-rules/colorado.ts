import type { StateRules } from './types';

/**
 * Colorado Security Deposit Rules
 * Based on C.R.S. § 38-12-103
 *
 * Key deadlines:
 * - 30 days default (if lease is silent)
 * - Up to 60 days if lease specifies extended period
 *
 * If landlord fails to comply:
 * - Failure to provide statement: forfeits right to withhold any portion
 * - Willful retention: treble (3x) damages + attorney fees + court costs
 * - Tenant must give 7 days notice before filing legal action
 *
 * Note: Major changes effective January 1, 2026 under HB 25-1249
 */
export const COLORADO: StateRules = {
  code: 'CO',
  name: 'Colorado',
  slug: 'colorado',

  // Deadlines
  returnDeadline: 30,
  claimDeadline: 60,
  claimDeadlineNote: '30 days default; up to 60 days if lease specifies',

  // Legal reference
  statute: '38-12-103',
  statuteTitle: 'C.R.S. § 38-12-103',
  statuteUrl: 'https://law.justia.com/codes/colorado/title-38/tenants-and-landlords/article-12/part-1/section-38-12-103/',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'C.R.S. § 38-12-103(1)',
    claimDeadline: 'C.R.S. § 38-12-103(1)',
    itemizationRequirement: 'C.R.S. § 38-12-103(1)',
    forfeitureProvision: 'C.R.S. § 38-12-103(2)',
    damagesProvision: 'C.R.S. § 38-12-103(3)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'A landlord shall, within one month after the termination of a lease or surrender and acceptance of the premises, whichever occurs last, return to the tenant the full security deposit deposited with the landlord by the tenant, unless the lease agreement specifies a longer period of time, but not to exceed sixty days.',
    forfeitureClause: 'The failure of a landlord to provide a written statement within the required time specified in subsection (1) of this section shall work a forfeiture of all his rights to withhold any portion of the security deposit under this section.',
    damagesClause: 'The willful retention of a security deposit in violation of this section shall render a landlord liable for treble the amount of that portion of the security deposit wrongfully withheld from the tenant, together with reasonable attorney fees and court costs.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court (County Court)
  maxSmallClaims: 7500,
  filingFee: { min: 35, max: 97 },
  courtName: 'County Court, Small Claims Division',

  // Damages
  damagesMultiplier: 3,
  damagesDescription: 'treble (triple) damages',
  additionalDamages: 'Plus attorney fees and court costs; must give 7 days notice before filing',

  // Marketing
  headline: 'Get Your Security Deposit Back in Colorado',
  description: 'Generate a professional dispute packet under C.R.S. § 38-12-103. Colorado landlords must return your deposit within 30 days (or 60 if specified in lease) with an itemized statement.',

  // Demand letter insert
  demandLetterInsert: 'Under Colorado law (C.R.S. § 38-12-103(1)), the landlord must return the full security deposit within one month after termination of the lease or surrender of the premises, unless the lease specifies a longer period not to exceed sixty days. Pursuant to C.R.S. § 38-12-103(2), failure to provide a written statement within the required time works a forfeiture of all rights to withhold any portion of the deposit. Under C.R.S. § 38-12-103(3), willful retention shall render the landlord liable for treble the amount wrongfully withheld, plus reasonable attorney fees and court costs. This letter serves as the required seven days\' notice of intent to file legal proceedings. I reserve the right to pursue all remedies available under law.',
};
