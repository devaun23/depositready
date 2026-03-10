import type { StateCode } from '@/lib/state-rules/types';
import { getStateRulesByCode } from '@/lib/state-rules';
import type { ComplianceAnswer, AuditResult, ComplianceViolation } from './types';
import { COMPLIANCE_QUESTIONS, getApplicableQuestions } from './questions';

/**
 * Run a compliance audit for a landlord based on their answers.
 * Maps each non-compliant answer to a statute-backed violation.
 */
export function runComplianceAudit(
  stateCode: StateCode,
  answers: ComplianceAnswer[]
): AuditResult {
  const rules = getStateRulesByCode(stateCode);
  const applicableQuestions = getApplicableQuestions(rules);
  const answerMap = new Map(answers.map((a) => [a.questionId, a.answer]));

  const violations: ComplianceViolation[] = [];
  const compliantItems: string[] = [];

  for (const question of applicableQuestions) {
    const answer = answerMap.get(question.id);

    // Unanswered questions treated as non-compliant
    if (answer === false || answer === undefined) {
      const statuteRef = rules.statuteSections[question.statuteKey];
      const isCritical =
        question.id === 'returned_on_time' ||
        question.id === 'sent_itemization' ||
        question.id === 'itemization_on_time' ||
        question.id === 'used_certified_mail';

      violations.push({
        questionId: question.id,
        questionText: question.text,
        statuteRef,
        severity: isCritical ? 'critical' : 'warning',
        recommendation: getRecommendation(question.id, rules.name),
      });
    } else {
      compliantItems.push(question.text);
    }
  }

  const totalQuestions = applicableQuestions.length;
  const compliantCount = compliantItems.length;
  const score = totalQuestions > 0 ? Math.round((compliantCount / totalQuestions) * 100) : 100;

  const criticalViolations = violations.filter((v) => v.severity === 'critical');

  let overallStatus: AuditResult['overallStatus'];
  if (criticalViolations.length > 0) {
    overallStatus = 'non_compliant';
  } else if (violations.length > 0) {
    overallStatus = 'at_risk';
  } else {
    overallStatus = 'compliant';
  }

  const recommendations = generateRecommendations(violations, rules.name);

  return {
    stateCode,
    stateName: rules.name,
    overallStatus,
    violations,
    compliantItems,
    recommendations,
    score,
  };
}

function getRecommendation(questionId: string, stateName: string): string {
  const recommendations: Record<string, string> = {
    returned_on_time: `Return the remaining deposit immediately. Under ${stateName} law, delays can trigger penalty damages.`,
    sent_itemization: `Send an itemized deduction statement to the tenant as soon as possible. Include specific amounts and descriptions for each deduction.`,
    itemization_on_time: `The itemization deadline may have already passed. Consult the statute to understand your liability exposure.`,
    used_certified_mail: `${stateName} requires certified mail for deposit-related notices. Resend via certified mail with return receipt requested.`,
    documented_damages: `Without photo/video evidence, deductions for damage are difficult to defend in court. Document current condition immediately.`,
    walkthrough_completed: `A documented move-out inspection strengthens your position. If the tenant is still in contact, request a walkthrough.`,
    deductions_reasonable: `Review each deduction to ensure it covers actual damage, not normal wear and tear. Unreasonable deductions can trigger penalty damages.`,
    deposit_held_properly: `Verify your deposit is held in a compliant account. Non-compliance can result in forfeiture of the deposit.`,
    tenant_notified_of_account: `Send the tenant written notice of the bank name, address, and account number where the deposit is held.`,
    receipts_for_repairs: `Gather invoices and receipts for all repair work. Courts may disallow deductions without supporting documentation.`,
  };
  return recommendations[questionId] || 'Review your compliance with state law.';
}

function generateRecommendations(violations: ComplianceViolation[], stateName: string): string[] {
  const recs: string[] = [];

  if (violations.length === 0) {
    recs.push(`Your deposit handling appears compliant with ${stateName} law. Maintain documentation for your records.`);
    return recs;
  }

  const hasCritical = violations.some((v) => v.severity === 'critical');

  if (hasCritical) {
    recs.push(`You have critical compliance gaps that expose you to penalty damages under ${stateName} law. Address these immediately.`);
  }

  if (violations.some((v) => v.questionId === 'returned_on_time' || v.questionId === 'itemization_on_time')) {
    recs.push('Consider proactively returning the deposit or reaching a settlement to avoid litigation.');
  }

  if (violations.some((v) => v.questionId === 'documented_damages' || v.questionId === 'receipts_for_repairs')) {
    recs.push('Strengthen your evidence file: gather photos, invoices, and contractor estimates before any dispute escalates.');
  }

  if (violations.length >= 3) {
    recs.push('With multiple compliance gaps, a proactive settlement may be more cost-effective than defending in court.');
  }

  return recs;
}
