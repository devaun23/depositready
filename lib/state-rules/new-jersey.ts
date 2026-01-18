import type { StateRules } from './types';

/**
 * New Jersey Security Deposit Rules
 * Based on N.J.S.A. 46:8-19 through 46:8-26
 *
 * Key deadlines:
 * - 30 days: Return deposit with itemized deductions (by certified/registered mail)
 * - 5 days: For emergency situations
 *
 * If landlord fails to comply:
 * - Tenant may recover double the amount withheld
 * - Plus court costs and attorney fees
 * - Plus interest
 *
 * Note: Properties with 3+ units always covered. 1-2 unit properties covered if landlord doesn't live there.
 */
export const NEW_JERSEY: StateRules = {
  code: 'NJ',
  name: 'New Jersey',
  slug: 'new-jersey',

  // Deadlines
  returnDeadline: 30,
  claimDeadline: 30,

  // Legal reference
  statute: '46:8-21.1',
  statuteTitle: 'N.J.S.A. 46:8-21.1',
  statuteUrl: 'https://law.justia.com/codes/new-jersey/title-46/section-46-8-21.1/',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'N.J.S.A. § 46:8-21.1',
    claimDeadline: 'N.J.S.A. § 46:8-21.1',
    itemizationRequirement: 'N.J.S.A. § 46:8-21.1',
    forfeitureProvision: 'N.J.S.A. § 46:8-21.1',
    damagesProvision: 'N.J.S.A. § 46:8-21.1',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'Within 30 days after the termination of the tenant\'s lease, the owner shall return by personal delivery, registered or certified mail the sum deposited plus the tenant\'s portion of the interest or earnings accumulated thereon, less any charges expended in accordance with the terms of a contract or agreement or any charges authorized pursuant to this act.',
    forfeitureClause: 'If the owner or lessee fails to comply with the provisions of this section, the tenant may recover double the amount of the deposit plus any reasonable court costs and attorney\'s fees.',
    damagesClause: 'The tenant shall recover double the amount of said moneys, together with full costs of any action and, in the court\'s discretion, reasonable attorney\'s fees.',
  },

  // Requirements
  certifiedMailRequired: true,
  itemizedDeductionsRequired: true,

  // Small claims court
  maxSmallClaims: 5000,
  smallClaimsNote: 'Small Claims up to $5,000; Special Civil Part up to $15,000',
  filingFee: { min: 30, max: 50 },
  courtName: 'Superior Court, Special Civil Part',

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'double damages',
  additionalDamages: 'Plus court costs and attorney fees',

  // Marketing
  headline: 'Get Your Security Deposit Back in New Jersey',
  description: 'Generate a professional dispute packet under N.J.S.A. 46:8-21.1. New Jersey landlords must return your deposit within 30 days by certified mail with an itemized list of deductions.',

  // Demand letter insert
  demandLetterInsert: 'Under New Jersey law (N.J.S.A. § 46:8-21.1), the landlord must return the security deposit by personal delivery or certified/registered mail within 30 days after termination of the lease, plus the tenant\'s portion of interest, less any lawful deductions with an itemized list. Pursuant to N.J.S.A. § 46:8-21.1, if the landlord fails to comply, the tenant may recover double the amount of the deposit plus reasonable court costs and attorney\'s fees. I reserve the right to pursue all remedies available under law.',
};
