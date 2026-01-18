import type { StateRules } from './types';

/**
 * Michigan Security Deposit Rules
 * Based on MCL 554.601-554.616
 *
 * Key deadlines:
 * - 30 days: Return deposit with itemized list of damages
 * - 7 days: Tenant must respond to itemized list
 * - 45 days: Landlord must initiate court action if tenant disputes
 *
 * If landlord fails to comply:
 * - Failure to notify within 30 days = agreement that no damages are due
 * - Tenant may sue for double the original deposit
 *
 * Note: Max deposit is 1.5x monthly rent
 */
export const MICHIGAN: StateRules = {
  code: 'MI',
  name: 'Michigan',
  slug: 'michigan',

  // Deadlines
  returnDeadline: 30,
  claimDeadline: 30,
  claimDeadlineNote: '30 days; if disputed, landlord has 45 days to file suit',

  // Legal reference
  statute: '554.609',
  statuteTitle: 'MCL 554.609',
  statuteUrl: 'https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-554-609',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'MCL 554.609(1)',
    claimDeadline: 'MCL 554.609(1)',
    itemizationRequirement: 'MCL 554.609(1)',
    forfeitureProvision: 'MCL 554.609(3)',
    damagesProvision: 'MCL 554.613',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'In case of damage to the rental unit or other obligation against the security deposit, the landlord shall mail to the tenant, within 30 days after the termination of occupancy, an itemized list of damages claimed for which the security deposit may be used, including the estimated cost of repair of each property damaged item.',
    forfeitureClause: 'A landlord\'s failure to notify a tenant within 30 days after the tenant has vacated the rental unit of any damages as required by this section, constitutes agreement by the landlord that no damages are due and he shall remit to the tenant immediately the full security deposit.',
    damagesClause: 'If a landlord fails to return the security deposit or provide the required notice of damages within 30 days, and does not initiate a court case within 45 days of the tenant moving out, the tenant may sue for double the amount of the original security deposit.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court (District Court, Small Claims Division)
  maxSmallClaims: 7000,
  filingFee: { min: 30, max: 70 },
  courtName: 'District Court, Small Claims Division',

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'double the original deposit',
  additionalDamages: 'If landlord fails to act within 45 days',

  // Marketing
  headline: 'Get Your Security Deposit Back in Michigan',
  description: 'Generate a professional dispute packet under MCL 554.609. Michigan landlords must return your deposit within 30 days with an itemized list of damages and repair costs.',

  // Demand letter insert
  demandLetterInsert: 'Under Michigan law (MCL 554.609(1)), the landlord shall mail to the tenant, within 30 days after termination of occupancy, an itemized list of damages claimed including the estimated cost of repair. Pursuant to MCL 554.609(3), failure to notify within 30 days constitutes agreement that no damages are due and the landlord shall remit the full security deposit immediately. Under MCL 554.613, if the landlord fails to return the deposit and does not initiate a court case within 45 days, the tenant may sue for double the original deposit amount. I reserve the right to pursue all remedies available under law.',
};
