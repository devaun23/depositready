import type { StateRules } from './types';

/**
 * California Security Deposit Rules
 * Based on California Civil Code 1950.5
 *
 * Key deadlines:
 * - 21 days: Return deposit OR provide itemized statement
 *
 * If landlord fails to comply:
 * - Forfeits right to retain any portion of deposit
 * - Bad faith: tenant may recover up to 2x the deposit
 *
 * 2025 Updates (AB 2801):
 * - Landlords must take photographs before repairs/cleaning
 */
export const CALIFORNIA: StateRules = {
  code: 'CA',
  name: 'California',
  slug: 'california',

  // Deadlines
  returnDeadline: 21,
  claimDeadline: 21,

  // Legal reference
  statute: '1950.5',
  statuteTitle: 'California Civil Code 1950.5',
  statuteUrl: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1950.5.&lawCode=CIV',

  // Detailed statute section citations
  statuteSections: {
    returnDeadline: 'Cal. Civ. Code § 1950.5(g)(1)',
    claimDeadline: 'Cal. Civ. Code § 1950.5(g)(1)',
    itemizationRequirement: 'Cal. Civ. Code § 1950.5(g)(2)',
    forfeitureProvision: 'Cal. Civ. Code § 1950.5(l)',
    damagesProvision: 'Cal. Civ. Code § 1950.5(l)',
  },

  // Exact statutory language quotes
  statutoryLanguage: {
    deadlineClause: 'Within 21 calendar days after the tenant has vacated the premises, the landlord shall furnish the tenant, by personal delivery or by first-class mail, postage prepaid, a copy of an itemized statement indicating the basis for, and the amount of, any security received and the disposition of the security, and shall return any remaining portion of the security to the tenant.',
    forfeitureClause: 'The bad faith claim or retention by a landlord of the security or any portion thereof in violation of this section may subject the landlord to statutory damages of up to twice the amount of the security, in addition to actual damages.',
    damagesClause: 'The claim of a tenant to the security shall be prior to the claim of any creditor of the landlord. The bad faith claim or retention by a landlord may subject the landlord to statutory damages of up to twice the amount of the security.',
  },

  // Requirements
  certifiedMailRequired: false,
  itemizedDeductionsRequired: true,

  // Small claims court
  maxSmallClaims: 12500,
  filingFee: { min: 30, max: 75 },
  courtName: 'Superior Court, Small Claims Division',

  // Damages
  damagesMultiplier: 2,
  damagesDescription: 'double damages',

  // Marketing
  headline: 'Get Your Security Deposit Back in California',
  description: 'Generate a professional dispute packet under California Civil Code 1950.5. California landlords must return your deposit or provide itemized deductions within 21 days.',

  // Demand letter insert
  demandLetterInsert: 'Under California law (Civil Code § 1950.5(g)(1)), the landlord must furnish an itemized statement indicating the basis for any deductions and return any remaining portion of the security deposit within 21 calendar days after the tenant vacates. Pursuant to Civil Code § 1950.5(l), bad faith retention of the security deposit may subject the landlord to statutory damages of up to twice the amount of the deposit, in addition to actual damages. I reserve the right to pursue all remedies available under law.',
};
