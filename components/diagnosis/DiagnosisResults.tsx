"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { TimelineVisual } from "./TimelineVisual";
import { PacketManifest } from "./PacketManifest";
import { trackDiagnosis } from "@/lib/analytics";
import { formatLegalDate } from "@/lib/state-rules";
import type { DiagnosisResult } from "@/lib/state-rules/types";

interface DiagnosisResultsProps {
  result: DiagnosisResult;
  email: string;
  onEmailChange: (email: string) => void;
}

const STATUS_CONFIG = {
  STRONG: {
    badge: "Violation Found — Strong Case",
    badgeBg: "bg-red-50 border-red-200",
    badgeText: "text-red-800",
    icon: (
      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
  },
  MODERATE: {
    badge: "Possible Violation — Review Needed",
    badgeBg: "bg-amber-50 border-amber-200",
    badgeText: "text-amber-800",
    icon: (
      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  WEAK: {
    badge: "No Timing Violation Detected",
    badgeBg: "bg-gray-50 border-gray-200",
    badgeText: "text-gray-700",
    icon: (
      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
} as const;

function getViolationDetail(result: DiagnosisResult): string {
  const { stateRules, noticeStatus, daysLate, daysRemaining } = result;

  switch (noticeStatus) {
    case "NOTICE_MISSED":
      return `Under ${stateRules.name} law (${stateRules.statuteTitle}), your landlord had ${stateRules.claimDeadline} days to return your deposit or send an itemized notice. That deadline passed ${daysLate} day${daysLate !== 1 ? "s" : ""} ago with no notice sent.`;
    case "NOTICE_LATE":
      return `Your landlord sent notice ${daysLate} day${daysLate !== 1 ? "s" : ""} after the ${stateRules.claimDeadline}-day deadline under ${stateRules.statuteTitle}. Late notice may trigger forfeiture of the right to withhold.`;
    case "NOTICE_PENDING":
      return `Your landlord has ${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining to send notice under ${stateRules.statuteTitle}. If the deadline passes without notice, you'll have a strong case.`;
    case "NOTICE_UNCLEAR":
      return `Based on what you've shared, we can't confirm whether notice was sent on time. The deadline under ${stateRules.statuteTitle} is ${stateRules.claimDeadline} days from move-out (${formatLegalDate(result.deadlineDate)}).`;
    case "NOTICE_TIMELY":
      return `Your landlord appears to have sent notice within the ${stateRules.claimDeadline}-day deadline. You may still have grounds to dispute unfair or excessive deductions.`;
  }
}

export function DiagnosisResults({ result, email, onEmailChange }: DiagnosisResultsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = STATUS_CONFIG[result.caseStrength];
  const isWeak = result.caseStrength === "WEAK";

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    trackDiagnosis.checkoutClicked({
      estimated_recovery: result.recoveryEstimate,
      strength: result.caseStrength,
    });

    try {
      const response = await fetch("/api/checkout-diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stateCode: result.stateRules.code,
          moveOutDate: result.timeline[0]?.date.toISOString().split("T")[0],
          noticeStatus: result.noticeStatus,
          caseStrength: result.caseStrength,
          recoveryEstimate: result.recoveryEstimate,
          totalDeposit: result.recoveryBasis === "forfeiture" ? result.recoveryEstimate : undefined,
          amountWithheld: result.recoveryBasis === "withheld_only" ? result.recoveryEstimate : undefined,
          email: email || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Checkout failed");
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Status Badge */}
      <div className={`rounded-lg border p-4 ${config.badgeBg}`}>
        <div className="flex items-start gap-3">
          {config.icon}
          <div>
            <h3 className={`font-semibold ${config.badgeText}`}>{config.badge}</h3>
            <p className={`text-sm mt-1 ${config.badgeText} opacity-80`}>
              {getViolationDetail(result)}
            </p>
          </div>
        </div>
      </div>

      {/* Recovery Estimate */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
        <p className="text-sm text-green-700 mb-1">
          {isWeak ? "Amount in dispute" : "Estimated recovery"}
        </p>
        <div className="text-4xl font-bold text-green-800">
          ${result.recoveryEstimate.toLocaleString()}
        </div>
        {result.maxRecovery && result.maxRecovery > result.recoveryEstimate && (
          <p className="text-xs text-green-600 mt-1">
            Potential up to ${result.maxRecovery.toLocaleString()} ({result.stateRules.damagesDescription} under {result.stateRules.statuteTitle})
          </p>
        )}
      </div>

      {/* Timeline */}
      <TimelineVisual events={result.timeline} />

      {/* Packet Manifest */}
      <PacketManifest />

      {/* Email capture (optional, pre-checkout) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email (for your receipt & documents)
        </label>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
        />
      </div>

      {/* CTA */}
      <Button
        onClick={handleCheckout}
        loading={isLoading}
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        {isWeak ? "Dispute Unfair Deductions — $79" : "Unlock Your Dispute Packet — $79"}
      </Button>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      {/* ROI framing */}
      <p className="text-sm text-gray-600 text-center">
        {isWeak
          ? "Professional packet to dispute unfair deductions. Money-back guarantee."
          : `Your estimated recovery: $${result.recoveryEstimate.toLocaleString()}. Your cost: $79. That's ${result.roiMultiple}x return.`}
      </p>

      {/* Trust signals */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Money-back guarantee · Secure checkout via Stripe</span>
      </div>
    </div>
  );
}
