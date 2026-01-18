import type { StateRules } from './types';

/**
 * Massachusetts Security Deposit Rules
 * Based on M.G.L. c. 186 § 15B
 *
 * Key deadlines:
 * - 30 days: Return deposit with interest OR itemized list of damages
 * - 10 days: Provide statement of conditions at move-in
 * - 30 days: Deposit funds into separate interest-bearing account
 *
 * If landlord fails to comply:
 * - Triple damages for certain violations
 * - 5% interest on deposit
 * - Court costs and attorney fees
 *
 * Note: Very strict compliance requirements - amended August 2025
 */
export const MASSACHUSETTS: StateRules = {
  code: 'MA',
  name: 'Massachusetts',
  slug: 'massachusetts',

  // Deadlines
  returnDeadline: 30,
  claimDeadline: 30,

  // Legal reference
  statute: '15B',
  statuteTitle: 'M.G.L. c. 186 § 15B',
  statuteUrl: 'https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section15b',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'M.G.L. c. 186 § 15B(4)',
    claimDeadline: 'M.G.L. c. 186 § 15B(4)',
    itemizationRequirement: 'M.G.L. c. 186 § 15B(4)',
    forfeitureProvision: 'M.G.L. c. 186 § 15B(7)',
    damagesProvision: 'M.G.L. c. 186 § 15B(7)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'The lessor shall, within thirty days after the termination of occupancy, return to the tenant the security deposit or any balance thereof; provided, however, that the lessor may deduct from such security deposit any amount necessary to remedy a defect or damage caused by the tenant or any person under his control.',
    forfeitureClause: 'The lessor shall forfeit his right to retain any portion of the security deposit for any reason, and shall return the entire security deposit, if the lessor fails to comply with the requirements of this section.',
    damagesClause: 'The tenant shall be awarded damages in an amount equal to three times the amount of such security deposit or balance thereof to which the tenant is entitled plus interest at the rate of five per cent from the date when such payment became due, together with court costs and reasonable attorney\'s fees.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court (Boston Municipal Court or District Court)
  maxSmallClaims: 7000,
  filingFee: { min: 40, max: 75 },
  courtName: 'Small Claims Session, District Court',

  // Damages
  damagesMultiplier: 3,
  damagesDescription: 'triple damages',
  additionalDamages: 'Plus 5% interest, court costs, and attorney fees',

  // Marketing
  headline: 'Get Your Security Deposit Back in Massachusetts',
  description: 'Generate a professional dispute packet under M.G.L. c. 186 § 15B. Massachusetts has strict security deposit laws with potential triple damages for landlord violations.',

  // Demand letter insert
  demandLetterInsert: 'Under Massachusetts law (M.G.L. c. 186 § 15B(4)), the landlord must return the security deposit or provide an itemized list of damages signed under penalties of perjury within thirty days after termination of occupancy. Pursuant to M.G.L. c. 186 § 15B(7), failure to comply forfeits all right to retain any portion of the deposit. The tenant may be awarded three times the amount of the deposit plus 5% interest, court costs, and reasonable attorney\'s fees. I reserve the right to pursue all remedies available under law.',
};
