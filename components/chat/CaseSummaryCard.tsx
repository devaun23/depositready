"use client";

import { useChat } from "./ChatContext";

const STRENGTH_STYLES = {
  STRONG: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: "Strong Case", dot: "bg-emerald-400", dotSolid: "bg-emerald-500" },
  MODERATE: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "Moderate Case", dot: "bg-amber-400", dotSolid: "bg-amber-500" },
  WEAK: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "Weak Case", dot: "bg-red-400", dotSolid: "bg-red-500" },
};

const IMPACT_ICONS: Record<string, { icon: string; color: string }> = {
  positive: { icon: "+", color: "text-emerald-600 bg-emerald-50" },
  negative: { icon: "−", color: "text-red-600 bg-red-50" },
  neutral: { icon: "~", color: "text-gray-500 bg-gray-50" },
};

export function CaseSummaryCard() {
  const { caseData } = useChat();
  const {
    stateName,
    depositAmount,
    caseStrength,
    caseScore,
    caseFactors,
    violationDetected,
    violationType,
    recoveryAmount,
    deadlineDate,
    daysLate,
    statute,
    damagesMultiplier,
    returnDeadlineDays,
    claimDeadlineDays,
    certifiedMailRequired,
    amountOwed,
    multiplierDamagesAmount,
    multiplierDamagesEligible,
    smallClaimsEligible,
    courtName,
    filingFee,
    maxSmallClaims,
    damagesDescription,
  } = caseData;

  const strengthStyle = caseStrength ? STRENGTH_STYLES[caseStrength] : null;

  return (
    <div className="p-5 space-y-5">
      <h2 className="font-serif text-lg font-semibold text-brand">
        Your Case Summary
      </h2>

      {/* ── Case Strength with Score ─────────────────────────── */}
      {strengthStyle && (
        <div className="animate-fadeIn">
          <div className="flex items-center justify-between mb-2">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${strengthStyle.bg} ${strengthStyle.text} ${strengthStyle.border} border`}
            >
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${strengthStyle.dot}`} />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${strengthStyle.dotSolid}`} />
              </span>
              {strengthStyle.label}
            </div>
            {caseScore !== null && (
              <span className="text-sm font-medium text-gray-500">
                {caseScore}/100
              </span>
            )}
          </div>

          {/* Score bar */}
          {caseScore !== null && (
            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  caseScore >= 70 ? "bg-emerald-500" : caseScore >= 40 ? "bg-amber-500" : "bg-red-400"
                }`}
                style={{ width: `${caseScore}%` }}
              />
            </div>
          )}

          {/* Factor breakdown */}
          {caseFactors.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {caseFactors.map((factor, i) => {
                const style = IMPACT_ICONS[factor.impact] || IMPACT_ICONS.neutral;
                return (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className={`shrink-0 w-4 h-4 rounded flex items-center justify-center font-bold text-[10px] ${style.color}`}>
                      {style.icon}
                    </span>
                    <span className="text-gray-600">{factor.detail}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Case Status ──────────────────────────────────────── */}
      {(stateName || violationDetected !== null || daysLate !== null) && (
        <Section title="Case Status">
          {stateName && <SummaryRow label="State" value={stateName} />}
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
        </Section>
      )}

      {/* ── State Law ────────────────────────────────────────── */}
      {(statute || returnDeadlineDays !== null || certifiedMailRequired !== null) && (
        <Section title="State Law">
          {statute && <SummaryRow label="Statute" value={statute} />}
          {returnDeadlineDays !== null && (
            <SummaryRow label="Return Deadline" value={`${returnDeadlineDays} days`} />
          )}
          {claimDeadlineDays !== null && claimDeadlineDays !== returnDeadlineDays && (
            <SummaryRow label="Claim Deadline" value={`${claimDeadlineDays} days`} />
          )}
          {certifiedMailRequired !== null && (
            <SummaryRow label="Certified Mail" value={certifiedMailRequired ? "Required" : "Not required"} />
          )}
          {damagesMultiplier !== null && damagesMultiplier > 1 && (
            <SummaryRow
              label="Penalty"
              value={damagesDescription || `${damagesMultiplier}x damages`}
            />
          )}
        </Section>
      )}

      {/* ── Recovery ─────────────────────────────────────────── */}
      {recoveryAmount !== null && recoveryAmount > 0 && (
        <>
          <div className="rounded-xl bg-accent/5 border border-accent/20 p-4 text-center animate-fadeIn">
            <p className="text-xs font-medium uppercase tracking-wider text-accent/70 mb-1">
              Potential Recovery
            </p>
            <p className="font-serif text-3xl font-semibold text-accent">
              ${recoveryAmount.toLocaleString()}
            </p>
            {multiplierDamagesEligible && multiplierDamagesAmount !== null && multiplierDamagesAmount > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Includes ${multiplierDamagesAmount.toLocaleString()} in {damagesMultiplier}x penalty damages
              </p>
            )}
            {depositAmount && recoveryAmount > depositAmount && (
              <p className="text-[11px] text-accent/70 mt-2 font-medium">
                $29 investment to recover up to ${recoveryAmount.toLocaleString()}
              </p>
            )}
          </div>

          {(amountOwed !== null || smallClaimsEligible !== null) && (
            <Section title="Recovery Breakdown">
              {depositAmount !== null && (
                <SummaryRow label="Deposit" value={`$${depositAmount.toLocaleString()}`} />
              )}
              {amountOwed !== null && amountOwed !== depositAmount && (
                <SummaryRow label="Amount Owed" value={`$${amountOwed.toLocaleString()}`} />
              )}
              {smallClaimsEligible !== null && (
                <SummaryRow
                  label="Small Claims"
                  value={smallClaimsEligible ? (
                    <span className="text-emerald-600 font-medium">Eligible</span>
                  ) : (
                    <span className="text-gray-500">Exceeds limit</span>
                  )}
                />
              )}
            </Section>
          )}
        </>
      )}

      {/* ── Analysis Progress ──────────────────────────────────── */}
      <div className="space-y-2.5">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1">
          Analysis Progress
        </h3>
        <div className="space-y-1.5">
          <ProgressItem done={violationDetected !== null} label="Deadline analyzed" />
          <ProgressItem done={recoveryAmount !== null} label="Damages calculated" />
          <ProgressItem done={caseStrength !== null} label="Case strength assessed" />
        </div>
      </div>

      {/* Trust badge */}
      {statute && (
        <div className="flex items-center gap-2 rounded-lg bg-brand/5 border border-brand/10 px-3 py-2">
          <svg className="h-4 w-4 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-[11px] text-brand/70 leading-relaxed">
            Based on {stateName || "state"} statutes
          </p>
        </div>
      )}

      {/* ── Court Info ────────────────────────────────────────── */}
      {(courtName || maxSmallClaims !== null) && (
        <Section title="Court Info">
          {courtName && <SummaryRow label="Court" value={courtName} />}
          {maxSmallClaims !== null && (
            <SummaryRow label="Small Claims Limit" value={`$${maxSmallClaims.toLocaleString()}`} />
          )}
          {filingFee && (
            <SummaryRow
              label="Filing Fee"
              value={filingFee.min === filingFee.max
                ? `$${filingFee.min}`
                : `$${filingFee.min}–$${filingFee.max}`
              }
            />
          )}
        </Section>
      )}

      {/* Disclaimer */}
      <p className="text-[11px] leading-relaxed text-gray-400">
        This analysis is informational only, not legal advice. Recovery amounts
        are estimates based on state law.
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1">
        {title}
      </h3>
      <div className="space-y-2">
        {children}
      </div>
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
      <span className="text-xs text-gray-500 shrink-0">
        {label}
      </span>
      <span className="text-sm text-gray-900 text-right">{value}</span>
    </div>
  );
}

function ProgressItem({ done, label }: { done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {done ? (
        <svg className="h-3.5 w-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <div className="h-3.5 w-3.5 rounded-full border-2 border-gray-200 shrink-0" />
      )}
      <span className={done ? "text-gray-700" : "text-gray-400"}>{label}</span>
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
