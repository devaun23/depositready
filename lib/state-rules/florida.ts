import type { StateRules } from './types';

/**
 * Florida Security Deposit Rules
 * Based on Florida Statute 83.49
 *
 * Key deadlines:
 * - 15 days: Return full deposit if no deductions
 * - 30 days: Send written notice of intent to claim deductions (by certified mail)
 *
 * If landlord fails to comply:
 * - Forfeits right to impose claim on deposit
 * - Tenant may recover deposit + court costs + attorney fees
 * - Bad faith claims: tenant entitled to triple damages
 */
export const FLORIDA: StateRules = {
  code: 'FL',
  name: 'Florida',
  slug: 'florida',

  // Deadlines
  returnDeadline: 15,
  claimDeadline: 30,

  // Legal reference
  statute: '83.49',
  statuteTitle: 'Florida Statute 83.49',
  statuteUrl: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0000-0099/0083/Sections/0083.49.html',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'F.S. 83.49(3)(a)',
    claimDeadline: 'F.S. 83.49(3)(a)',
    itemizationRequirement: 'F.S. 83.49(3)(a)',
    forfeitureProvision: 'F.S. 83.49(3)(c)',
    damagesProvision: 'F.S. 83.49(3)(c)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'Upon the vacating of the premises for termination of the lease, if the landlord does not intend to impose a claim on the security deposit, the landlord shall have 15 days to return the security deposit together with interest if otherwise required, or the landlord shall have 30 days to give the tenant written notice by certified mail to the tenant\'s last known mailing address of his or her intention to impose a claim on the deposit.',
    forfeitureClause: 'If the landlord fails to give the required notice within the 30-day period, he or she forfeits the right to impose a claim upon the security deposit.',
    damagesClause: 'The court shall award court costs and reasonable attorney\'s fees to the prevailing party. The landlord shall be liable for the amount of the deposit wrongfully withheld plus attorney\'s fees and costs and, in the case of the landlord\'s bad faith, the court may award damages up to triple the amount of the deposit.',
  },

  // Requirements
  certifiedMailRequired: true,
  itemizedDeductionsRequired: true,

  // Small claims court
  maxSmallClaims: 8000,
  filingFee: { min: 55, max: 300 },
  courtName: 'County Court, Small Claims Division',

  // Damages
  damagesMultiplier: 3,
  damagesDescription: 'triple damages',

  // Marketing
  headline: 'Get Your Security Deposit Back in Florida',
  description: 'Generate a professional dispute packet under Florida Statute 83.49. Florida landlords must return your deposit within 15 days or provide itemized deductions within 30 days.',

  // Demand letter insert
  demandLetterInsert: 'Under Florida law (F.S. 83.49(3)(a)), if a landlord does not intend to impose a claim on the security deposit, the landlord shall have 15 days to return the deposit. If the landlord intends to impose a claim, written notice must be sent by certified mail within 30 days, specifying the reason for the claim. Pursuant to F.S. 83.49(3)(c), failure to comply results in forfeiture of the right to impose any claim on the deposit. If I am required to pursue this matter in court, I may be entitled to recover the deposit, court costs, reasonable attorney\'s fees, and up to triple damages for bad faith retention.',
};
