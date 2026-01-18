import type { StateRules } from './types';

/**
 * North Carolina Security Deposit Rules
 * Based on N.C.G.S. Chapter 42, Article 6 (§ 42-50 through 42-56)
 *
 * Key deadlines:
 * - 30 days: Return deposit with itemized damages
 * - 60 days: If extent of claim cannot be determined (interim accounting required at 30 days)
 *
 * If landlord fails to comply:
 * - Willful failure voids landlord's right to retain any portion
 * - Court may award attorney fees
 *
 * Note: Deposit limits vary by lease term (2 weeks/1.5 months/2 months)
 */
export const NORTH_CAROLINA: StateRules = {
  code: 'NC',
  name: 'North Carolina',
  slug: 'north-carolina',

  // Deadlines
  returnDeadline: 30,
  claimDeadline: 30,
  claimDeadlineNote: '30 days; 60 days if extent of claim cannot be determined',

  // Legal reference
  statute: '42-52',
  statuteTitle: 'N.C.G.S. § 42-52',
  statuteUrl: 'https://www.ncleg.net/enactedlegislation/statutes/html/bysection/chapter_42/gs_42-52.html',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'N.C.G.S. § 42-52(a)',
    claimDeadline: 'N.C.G.S. § 42-52(a)',
    itemizationRequirement: 'N.C.G.S. § 42-52(a)',
    forfeitureProvision: 'N.C.G.S. § 42-52(d)',
    damagesProvision: 'N.C.G.S. § 42-52(d)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'The landlord in writing shall itemize any damage and mail or deliver same to the tenant, together with the balance of the security deposit, no later than 30 days after termination of the tenancy and delivery of possession of the premises to the landlord.',
    forfeitureClause: 'The willful failure of a landlord to comply with the deposit, bond, or notice requirements of this Article shall void the landlord\'s right to retain any portion of the tenant\'s security deposit.',
    damagesClause: 'Upon a finding by the court that the party against whom judgment is rendered was in willful noncompliance with this Article, such willful noncompliance is against the public policy of this State and the court may award attorney\'s fees to be taxed as part of the costs of court.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court
  maxSmallClaims: 10000,
  filingFee: { min: 96, max: 96 },
  courtName: 'Small Claims Court (Magistrate\'s Court)',

  // Damages
  damagesMultiplier: 1,
  damagesDescription: 'actual damages plus attorney fees',
  additionalDamages: 'Willful failure voids right to retain any portion; attorney fees may be awarded',

  // Marketing
  headline: 'Get Your Security Deposit Back in North Carolina',
  description: 'Generate a professional dispute packet under N.C.G.S. § 42-52. North Carolina landlords must return your deposit within 30 days with an itemized list of any damages.',

  // Demand letter insert
  demandLetterInsert: 'Under North Carolina law (N.C.G.S. § 42-52(a)), the landlord shall itemize any damage in writing and mail or deliver same to the tenant, together with the balance of the security deposit, no later than 30 days after termination of the tenancy and delivery of possession. Pursuant to N.C.G.S. § 42-52(d), the willful failure to comply with deposit requirements shall void the landlord\'s right to retain any portion of the security deposit, and the court may award attorney\'s fees. I reserve the right to pursue all remedies available under law.',
};
