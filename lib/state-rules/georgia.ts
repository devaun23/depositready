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

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'O.C.G.A. § 44-7-34(a)',
    claimDeadline: 'O.C.G.A. § 44-7-34(a)',
    itemizationRequirement: 'O.C.G.A. § 44-7-34(a)',
    forfeitureProvision: 'O.C.G.A. § 44-7-35(a)',
    damagesProvision: 'O.C.G.A. § 44-7-35(c)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'Within one month after the termination of the residential lease or the surrender and acceptance of the premises, whichever occurs last, the landlord shall return the security deposit to the tenant or shall furnish to the tenant a written statement listing the exact reasons for the retention of any portion of the security deposit.',
    forfeitureClause: 'If the landlord fails to return any part of the security deposit required to be returned to a tenant under this article, the landlord shall be liable to the tenant in the amount of three times the sum improperly withheld plus reasonable attorney\'s fees.',
    damagesClause: 'A tenant may recover damages and obtain injunctive relief for any noncompliance by the landlord with this part. If a landlord acted in bad faith, a tenant may recover three times the portion wrongfully withheld plus reasonable attorney\'s fees.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court (Magistrate Court)
  maxSmallClaims: 15000,
  filingFee: { min: 45, max: 75 },
  courtName: 'Magistrate Court',

  // Damages
  damagesMultiplier: 3,
  damagesDescription: 'triple damages',

  // Marketing
  headline: 'Get Your Security Deposit Back in Georgia',
  description: 'Generate a professional dispute packet under Georgia Code 44-7-34. Georgia landlords must return your deposit within 30 days with an itemized list of deductions.',

  // Demand letter insert
  demandLetterInsert: 'Under Georgia law (O.C.G.A. § 44-7-34(a)), the landlord must return the security deposit or furnish a written statement listing the exact reasons for retention of any portion within one month after termination or surrender of the premises. Pursuant to O.C.G.A. § 44-7-35(c), if a landlord acts in bad faith in retaining any portion of the deposit, the tenant may recover three times the amount wrongfully withheld plus reasonable attorney\'s fees. I reserve the right to pursue all remedies available under law.',
};
