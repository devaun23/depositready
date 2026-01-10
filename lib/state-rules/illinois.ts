import type { StateRules } from './types';

/**
 * Illinois Security Deposit Rules
 * Based on 765 ILCS 710 (Security Deposit Return Act)
 *
 * Key deadlines:
 * - 30 days: Provide itemized statement of deductions
 * - 45 days: Return remaining deposit (if no deductions, return within 45 days)
 *
 * If landlord fails to comply:
 * - Tenant may recover 2x deposit amount + attorney fees
 *
 * Notes:
 * - 25+ unit buildings must pay interest on deposits held 6+ months
 * - Chicago has stricter rules under CRLTO (21-day return)
 */
export const ILLINOIS: StateRules = {
  code: 'IL',
  name: 'Illinois',
  slug: 'illinois',

  // Deadlines
  returnDeadline: 45,
  claimDeadline: 30,
  claimDeadlineNote: 'Itemized statement due in 30 days; deposit return in 45 days',

  // Legal reference
  statute: '765 ILCS 710',
  statuteTitle: '765 ILCS 710 Security Deposit Return Act',
  statuteUrl: 'https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=2202&ChapterID=62',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: '765 ILCS 710/1',
    claimDeadline: '765 ILCS 710/1',
    itemizationRequirement: '765 ILCS 710/1',
    forfeitureProvision: '765 ILCS 710/1',
    damagesProvision: '765 ILCS 710/1',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'A lessor of residential real property...shall within 30 days of the date that the lessee vacates the premises, furnish to the lessee, delivered in person, by mail directed to his last known address or by electronic mail, an itemized statement of the damage allegedly caused to the premises and the estimated or actual cost for repairing or replacing each item on that statement, attaching the paid receipts, or copies thereof, for the repair or replacement.',
    forfeitureClause: 'If the lessor fails to comply with the requirements of this Section, the lessor shall, upon a showing thereof to the circuit court, return the security deposit in full, less unpaid rent.',
    damagesClause: 'Upon a finding by a circuit court that a lessor has refused to supply the itemized statement required by this Section, or has supplied such statement in bad faith, and has failed or refused to return the amount of the security deposit due within the time limits provided, the lessor shall be liable for an amount equal to two times the security deposit due, together with court costs and reasonable attorney\'s fees.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court
  maxSmallClaims: 10000,
  filingFee: { min: 35, max: 75 },
  courtName: 'Circuit Court, Small Claims Division',

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'double damages',

  // Marketing
  headline: 'Get Your Security Deposit Back in Illinois',
  description: 'Generate a professional dispute packet under 765 ILCS 710. Illinois landlords must provide an itemized statement within 30 days and return your deposit within 45 days.',

  // Demand letter insert
  demandLetterInsert: 'Under Illinois law (765 ILCS 710/1), the landlord must furnish an itemized statement of damages with paid receipts within 30 days, and return the remaining deposit within 45 days after the tenant vacates. Pursuant to the Security Deposit Return Act, failure to comply or acting in bad faith entitles the tenant to recover two times the security deposit due, plus court costs and reasonable attorney\'s fees. I reserve the right to pursue all remedies available under law, including any stricter requirements under applicable local ordinances.',
};
