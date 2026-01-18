import type { StateRules } from './types';

/**
 * Arizona Security Deposit Rules
 * Based on A.R.S. § 33-1321
 *
 * Key deadlines:
 * - 14 business days: Return deposit with itemized deductions (excludes weekends/holidays)
 * - Tenant has 60 days to dispute after receiving itemized list
 *
 * If landlord fails to comply:
 * - Bad faith retention: double the amount wrongfully withheld
 * - Tenant may recover property and money due
 *
 * Note: Move-in/move-out inspection forms required. Tenant has right to be present at move-out inspection.
 */
export const ARIZONA: StateRules = {
  code: 'AZ',
  name: 'Arizona',
  slug: 'arizona',

  // Deadlines
  returnDeadline: 14,
  claimDeadline: 14,
  claimDeadlineNote: '14 business days (excludes weekends and holidays)',

  // Legal reference
  statute: '33-1321',
  statuteTitle: 'A.R.S. § 33-1321',
  statuteUrl: 'https://www.azleg.gov/ars/33/01321.htm',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'A.R.S. § 33-1321(D)',
    claimDeadline: 'A.R.S. § 33-1321(D)',
    itemizationRequirement: 'A.R.S. § 33-1321(D)',
    forfeitureProvision: 'A.R.S. § 33-1321(D)',
    damagesProvision: 'A.R.S. § 33-1321(D)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'Within fourteen days, excluding Saturdays, Sundays or other legal holidays, after termination of the tenancy and delivery of possession and demand by the tenant, the landlord shall provide the tenant an itemized list of all deductions together with the amount due and payable to the tenant, if any.',
    forfeitureClause: 'If the landlord fails to comply with subsection D of this section the tenant may recover the property and money due the tenant together with damages in an amount equal to twice the amount wrongfully withheld.',
    damagesClause: 'If the landlord fails to comply with this section and acts in bad faith, the landlord may be liable for an amount equal to twice the amount of the security deposit.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court (Justice Court)
  maxSmallClaims: 3500,
  smallClaimsNote: 'Justice Court handles claims up to $3,500',
  filingFee: { min: 25, max: 75 },
  courtName: 'Justice Court, Small Claims Division',

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'double damages',
  additionalDamages: 'For bad faith retention',

  // Marketing
  headline: 'Get Your Security Deposit Back in Arizona',
  description: 'Generate a professional dispute packet under A.R.S. § 33-1321. Arizona landlords must return your deposit within 14 business days with an itemized list of deductions.',

  // Demand letter insert
  demandLetterInsert: 'Under Arizona law (A.R.S. § 33-1321(D)), the landlord must provide an itemized list of all deductions together with the amount due and payable within fourteen days, excluding Saturdays, Sundays or other legal holidays, after termination of the tenancy and delivery of possession. Pursuant to A.R.S. § 33-1321(D), if the landlord fails to comply or acts in bad faith, the tenant may recover damages in an amount equal to twice the amount wrongfully withheld. I reserve the right to pursue all remedies available under law.',
};
