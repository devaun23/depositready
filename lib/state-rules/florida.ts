import type { StateRules } from './types';

/**
 * Florida Security Deposit Rules
 * Based on Florida Statute 83.49
 *
 * Key deadlines:
 * - 15 days: Return full deposit if no deductions
 * - 30 days: Send written notice of intent to claim deductions
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

  // Requirements
  certifiedMailRequired: true,
  itemizedDeductionsRequired: true,

  // Small claims court
  maxSmallClaims: 8000,
  filingFee: { min: 55, max: 300 },

  // Damages
  damagesMultiplier: 3,
  damagesDescription: 'triple damages',

  // Marketing
  headline: 'Get Your Security Deposit Back in Florida',
  description: 'Generate a professional dispute packet under Florida Statute 83.49. Florida landlords must return your deposit within 15 days or provide itemized deductions within 30 days.',

  // Demand letter insert
  demandLetterInsert: 'Under Florida law (F.S. 83.49), if a landlord does not intend to impose a claim, the deposit is due within 15 days. If imposing a claim, the landlord must send notice by certified mail within 30 days, and the tenant has 15 days to object after receiving that notice.',
};
