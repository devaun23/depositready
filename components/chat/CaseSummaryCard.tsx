"use client";

import { useChat } from "./ChatContext";

const STRENGTH_STYLES = {
  STRONG: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: "Strong Case" },
  MODERATE: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "Moderate Case" },
  WEAK: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "Weak Case" },
};

export function CaseSummaryCard() {
  const { caseData } = useChat();
  const {
    stateName,
    depositAmount,
    caseStrength,
    violationDetected,
    violationType,
    recoveryAmount,
    deadlineDate,
    daysLate,
    statute,
    damagesMultiplier,
  } = caseData;

  const strengthStyle = caseStrength ? STRENGTH_STYLES[caseStrength] : null;

  return (
    <div className="p-5 space-y-4">
      <h2 className="font-serif text-lg font-semibold text-brand">
        Your Case Summary
      </h2>

      {/* Case strength badge */}
      {strengthStyle && (
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${strengthStyle.bg} ${strengthStyle.text} ${strengthStyle.border} border animate-fadeIn`}
        >
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
              caseStrength === "STRONG" ? "bg-emerald-400" : caseStrength === "MODERATE" ? "bg-amber-400" : "bg-red-400"
            }`} />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${
              caseStrength === "STRONG" ? "bg-emerald-500" : caseStrength === "MODERATE" ? "bg-amber-500" : "bg-red-500"
            }`} />
          </span>
          {strengthStyle.label}
        </div>
      )}

      {/* Data rows */}
      <div className="space-y-3">
        {stateName && (
          <SummaryRow label="State" value={stateName} />
        )}

        {depositAmount !== null && (
          <SummaryRow
            label="Deposit"
            value={`$${depositAmount.toLocaleString()}`}
          />
        )}

        {violationDetected !== null && (
          <SummaryRow
            label="Violation"
            value={
              violationDetected ? (
                <span className="font-medium text-red-600">
                  Yes — {formatViolationType(violationType)}
                </span>
              ) : (
                <span className="text-gray-500">No violation detected</span>
              )
            }
          />
        )}

        {daysLate !== null && daysLate > 0 && (
          <SummaryRow
            label="Days Late"
            value={
              <span className="font-medium text-red-600">
                {daysLate} days past deadline
              </span>
            }
          />
        )}

        {deadlineDate && (
          <SummaryRow
            label="Deadline"
            value={new Date(deadlineDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          />
        )}

        {statute && (
          <SummaryRow label="Statute" value={statute} />
        )}

        {damagesMultiplier && damagesMultiplier > 1 && (
          <SummaryRow
            label="Penalty"
            value={`${damagesMultiplier}x damages available`}
          />
        )}
      </div>

      {/* Recovery amount (big number) */}
      {recoveryAmount !== null && recoveryAmount > 0 && (
        <div className="rounded-xl bg-accent/5 border border-accent/20 p-4 text-center animate-fadeIn">
          <p className="text-xs font-medium uppercase tracking-wider text-accent/70 mb-1">
            Potential Recovery
          </p>
          <p className="font-serif text-3xl font-semibold text-accent">
            ${recoveryAmount.toLocaleString()}
          </p>
          {damagesMultiplier && damagesMultiplier > 1 && depositAmount && (
            <p className="text-xs text-gray-500 mt-1">
              Includes {damagesMultiplier}x penalty on ${depositAmount.toLocaleString()} deposit
            </p>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-[11px] leading-relaxed text-gray-400">
        This analysis is informational only, not legal advice. Recovery amounts
        are estimates based on state law.
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-xs font-medium uppercase tracking-wider text-gray-400 shrink-0">
        {label}
      </span>
      <span className="text-sm text-gray-900 text-right">{value}</span>
    </div>
  );
}

function formatViolationType(type: string | null): string {
  if (!type) return "deadline missed";
  const labels: Record<string, string> = {
    return: "deposit not returned",
    claim: "no itemized statement",
    both: "deposit not returned & no statement",
  };
  return labels[type] || "deadline missed";
}
