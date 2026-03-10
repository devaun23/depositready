import type { ComplianceQuestion } from './types';

/**
 * 10 compliance questions for the landlord audit.
 * Each question maps to a StateRules field for state-specific applicability.
 */
export const COMPLIANCE_QUESTIONS: ComplianceQuestion[] = [
  {
    id: 'returned_on_time',
    text: 'Did you return the full deposit within the state deadline?',
    helpText: 'Most states require deposits to be returned within 15-30 days of move-out.',
    statuteKey: 'returnDeadline',
  },
  {
    id: 'sent_itemization',
    text: 'Did you send an itemized list of deductions to the tenant?',
    helpText: 'An itemized statement must list each deduction with a specific amount and description.',
    relevantWhen: (rules) => rules.itemizedDeductionsRequired,
    statuteKey: 'itemizationRequirement',
  },
  {
    id: 'itemization_on_time',
    text: 'Was the itemized deduction notice sent within the state deadline?',
    helpText: 'The deduction notice must be sent within the state-specific claim deadline.',
    relevantWhen: (rules) => rules.itemizedDeductionsRequired,
    statuteKey: 'claimDeadline',
  },
  {
    id: 'used_certified_mail',
    text: 'Did you send notices via certified mail?',
    helpText: 'Some states require certified mail with return receipt for deposit communications.',
    relevantWhen: (rules) => rules.certifiedMailRequired,
    statuteKey: 'claimDeadline',
  },
  {
    id: 'documented_damages',
    text: 'Did you document property damage with photos or video before and after the tenancy?',
    helpText: 'Photo/video evidence is critical for justifying deductions beyond normal wear and tear.',
    statuteKey: 'damagesProvision',
  },
  {
    id: 'walkthrough_completed',
    text: 'Did you conduct a move-out inspection or walkthrough?',
    helpText: 'Some states require a pre-move-out inspection. Even where not required, it strengthens your position.',
    statuteKey: 'damagesProvision',
  },
  {
    id: 'deductions_reasonable',
    text: 'Are all deductions for damage beyond normal wear and tear?',
    helpText: 'Normal wear and tear (faded paint, minor carpet wear) cannot be deducted. Only actual damage counts.',
    statuteKey: 'damagesProvision',
  },
  {
    id: 'deposit_held_properly',
    text: 'Was the deposit held in a separate account as required by state law?',
    helpText: 'Many states require deposits to be held in a separate escrow or trust account.',
    statuteKey: 'forfeitureProvision',
  },
  {
    id: 'tenant_notified_of_account',
    text: 'Was the tenant notified of where the deposit is held?',
    helpText: 'Some states require landlords to notify tenants of the bank and account where their deposit is held.',
    statuteKey: 'forfeitureProvision',
  },
  {
    id: 'receipts_for_repairs',
    text: 'Do you have receipts or invoices for repair costs deducted?',
    helpText: 'Courts expect documentation of actual repair costs. Estimated costs are often challenged.',
    statuteKey: 'damagesProvision',
  },
];

/**
 * Get applicable questions for a specific state based on its rules.
 */
export function getApplicableQuestions(rules: {
  certifiedMailRequired: boolean;
  itemizedDeductionsRequired: boolean;
}): ComplianceQuestion[] {
  return COMPLIANCE_QUESTIONS.filter(
    (q) => !q.relevantWhen || q.relevantWhen(rules)
  );
}
