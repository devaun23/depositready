"use client";

import type { StateRules } from "@/lib/state-rules";
import type { AuditResult, LiabilityExposure } from "@/lib/landlord/types";

interface LandlordResultsProps {
  auditResult: AuditResult;
  liabilityExposure: LiabilityExposure | null;
  stateRules: StateRules;
}

export function LandlordResults({ auditResult, liabilityExposure, stateRules }: LandlordResultsProps) {
  const statusColor =
    auditResult.overallStatus === "compliant"
      ? "text-green-700 bg-green-50 border-green-200"
      : auditResult.overallStatus === "at_risk"
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : "text-red-700 bg-red-50 border-red-200";

  const statusLabel =
    auditResult.overallStatus === "compliant"
      ? "Compliant"
      : auditResult.overallStatus === "at_risk"
      ? "At Risk"
      : "Non-Compliant";

  return (
    <div className="space-y-4 animate-fadeSlideUp">
      {/* Compliance scorecard */}
      <div className={`rounded-2xl border p-6 text-center ${statusColor}`}>
        <p className="text-sm mb-2">Compliance Status</p>
        <div className="text-3xl font-bold mb-1">{statusLabel}</div>
        <div className="text-5xl font-bold">{auditResult.score}/100</div>
        <p className="text-sm mt-2">
          {auditResult.compliantItems.length} of{" "}
          {auditResult.compliantItems.length + auditResult.violations.length} requirements met
        </p>
      </div>

      {/* Violations */}
      {auditResult.violations.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h3 className="text-sm font-semibold text-red-800 mb-3">Compliance Gaps</h3>
          <ul className="space-y-2">
            {auditResult.violations.map((v) => (
              <li key={v.questionId} className="flex items-start gap-2 text-sm">
                <span className={`mt-0.5 flex-shrink-0 ${v.severity === "critical" ? "text-red-600" : "text-amber-600"}`}>
                  {v.severity === "critical" ? "!!" : "!"}
                </span>
                <div>
                  <p className="text-red-900">{v.questionText}</p>
                  <p className="text-xs text-red-700 mt-0.5">
                    {v.statuteRef} &middot; {v.recommendation}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Compliant items */}
      {auditResult.compliantItems.length > 0 && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <h3 className="text-sm font-semibold text-green-800 mb-3">Compliant</h3>
          <ul className="space-y-1">
            {auditResult.compliantItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                <span className="mt-0.5 flex-shrink-0">&#10003;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Liability exposure */}
      {liabilityExposure && (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Liability Exposure</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-gray-600">Worst case</p>
              <p className="text-2xl font-bold text-red-700">
                ${liabilityExposure.worstCaseTotal.toLocaleString()}
              </p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-600">Settlement target</p>
              <p className="text-2xl font-bold text-green-700">
                ${liabilityExposure.breakEvenSettlement.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <p>Deposit return: ${liabilityExposure.breakdown.depositReturn.toLocaleString()}</p>
            {liabilityExposure.breakdown.penaltyDamages > 0 && (
              <p>
                Penalty damages ({stateRules.damagesMultiplier}x): $
                {liabilityExposure.breakdown.penaltyDamages.toLocaleString()}
              </p>
            )}
            <p>Est. court costs: ${liabilityExposure.breakdown.estimatedCourtCosts.toLocaleString()}</p>
            {liabilityExposure.breakdown.estimatedAttorneyFees > 0 && (
              <p>Est. attorney fees: ${liabilityExposure.breakdown.estimatedAttorneyFees.toLocaleString()}</p>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-900">
              Recommendation:{" "}
              <span className={
                liabilityExposure.recommendation === "settle"
                  ? "text-red-700"
                  : liabilityExposure.recommendation === "negotiate"
                  ? "text-amber-700"
                  : "text-green-700"
              }>
                {liabilityExposure.recommendation === "settle"
                  ? "Consider settling proactively"
                  : liabilityExposure.recommendation === "negotiate"
                  ? "Negotiate in good faith"
                  : "Strong position to defend"}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {auditResult.recommendations.length > 0 && (
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="text-sm font-semibold text-amber-800 mb-2">Recommendations</h3>
          <ul className="space-y-1">
            {auditResult.recommendations.map((rec, i) => (
              <li key={i} className="text-sm text-amber-900">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
