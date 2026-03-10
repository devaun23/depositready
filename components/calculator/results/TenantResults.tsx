"use client";

import type { StateRules, DeadlineAnalysis, CaseStrengthAssessment } from "@/lib/state-rules";

interface TenantResultsProps {
  hasViolation: boolean;
  potentialRecovery: number;
  depositAmount: number;
  stateRules: StateRules;
  deadlineAnalysis: DeadlineAnalysis;
  caseStrength: CaseStrengthAssessment | null;
}

export function TenantResults({
  hasViolation,
  potentialRecovery,
  depositAmount,
  stateRules,
  deadlineAnalysis,
  caseStrength,
}: TenantResultsProps) {
  const strengthColor =
    caseStrength?.label === "STRONG"
      ? "text-green-700"
      : caseStrength?.label === "MODERATE"
      ? "text-amber-700"
      : "text-red-700";

  const strengthBg =
    caseStrength?.label === "STRONG"
      ? "bg-green-50 border-green-200"
      : caseStrength?.label === "MODERATE"
      ? "bg-amber-50 border-amber-200"
      : "bg-red-50 border-red-200";

  return (
    <div className="space-y-4 animate-fadeSlideUp">
      {/* Recovery estimate */}
      {hasViolation ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <p className="text-sm text-green-700 mb-2">Potential recovery</p>
          <div className="text-5xl font-bold text-green-800">
            ${potentialRecovery.toLocaleString()}
          </div>
          <p className="text-sm text-green-700 mt-2">
            ${depositAmount.toLocaleString()} deposit &times; {stateRules.damagesMultiplier}x{" "}
            {stateRules.damagesDescription} under {stateRules.statuteTitle}
          </p>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <p className="text-sm text-amber-700 mb-2">Your deposit amount</p>
          <div className="text-5xl font-bold text-amber-800">
            ${depositAmount.toLocaleString()}
          </div>
          <p className="text-sm text-amber-700 mt-2">
            No deadline violation detected yet. You may still be entitled to dispute deductions.
          </p>
        </div>
      )}

      {/* Case strength */}
      {caseStrength && (
        <div className={`rounded-xl border p-5 ${strengthBg}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-semibold ${strengthColor}`}>
              Case Strength: {caseStrength.label}
            </span>
            <span className={`text-2xl font-bold ${strengthColor}`}>
              {caseStrength.score}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                caseStrength.label === "STRONG"
                  ? "bg-green-500"
                  : caseStrength.label === "MODERATE"
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${caseStrength.score}%` }}
            />
          </div>
          <ul className="space-y-1">
            {caseStrength.factors.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                <span className="mt-0.5">
                  {f.impact === "positive" ? "+" : f.impact === "negative" ? "-" : "~"}
                </span>
                <span>{f.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Statute citation */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
        <p className="font-medium text-gray-700 mb-1">Legal basis</p>
        <p>
          {stateRules.statuteTitle} ({stateRules.statuteSections.returnDeadline}) requires
          landlords to return deposits within {stateRules.returnDeadline} days.
          {hasViolation && (
            <span>
              {" "}Violation may entitle tenants to {stateRules.damagesDescription} per{" "}
              {stateRules.statuteSections.damagesProvision}.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
