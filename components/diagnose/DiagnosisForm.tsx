"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Logo, Button } from "@/components/ui";
import { DateDropdowns } from "@/components/ui/DateDropdowns";
import {
  STATE_OPTIONS,
  getStateRulesByCode,
  analyzeDeadlines,
  formatLegalDate,
} from "@/lib/state-rules";
import type { StateCode, StateRules, DeadlineAnalysis } from "@/lib/state-rules";
import { InsightCard } from "./InsightCard";
import { RecoveryAmount } from "./RecoveryAmount";
import { PacketManifest } from "./PacketManifest";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type DepositStatus = "yes" | "no" | "not_sure";

function gtag(event: string, params: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
}

export function DiagnosisForm() {
  // ── Form state ──────────────────────────────────────────
  const [stateCode, setStateCode] = useState<StateCode | "">("");
  const [moveOutDate, setMoveOutDate] = useState<string | null>(null);
  const [depositStatus, setDepositStatus] = useState<DepositStatus | null>(null);
  const [noticeDate, setNoticeDate] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [email, setEmail] = useState("");

  // ── UI state ────────────────────────────────────────────
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [emailError, setEmailError] = useState("");

  // ── Refs for auto-scroll and one-time events ────────────
  const moveOutRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const noticeDateRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const hasTrackedStart = useRef(false);
  const hasTrackedComplete = useRef(false);

  // ── Derived state ───────────────────────────────────────
  const stateRules: StateRules | null = useMemo(
    () => (stateCode ? getStateRulesByCode(stateCode as StateCode) : null),
    [stateCode]
  );

  const deadlineAnalysis: DeadlineAnalysis | null = useMemo(
    () =>
      stateRules && moveOutDate
        ? analyzeDeadlines(new Date(moveOutDate), stateRules)
        : null,
    [stateRules, moveOutDate]
  );

  const hasViolation = useMemo(
    () =>
      !!deadlineAnalysis?.landlordInViolation &&
      (depositStatus === "no" || depositStatus === "not_sure"),
    [deadlineAnalysis, depositStatus]
  );

  const parsedAmount = useMemo(() => {
    const cleaned = depositAmount.replace(/,/g, "");
    const n = parseFloat(cleaned);
    return isNaN(n) || n <= 0 ? 0 : n;
  }, [depositAmount]);

  const potentialRecovery = useMemo(() => {
    if (!stateRules || parsedAmount <= 0) return 0;
    return hasViolation
      ? parsedAmount * stateRules.damagesMultiplier
      : parsedAmount;
  }, [hasViolation, parsedAmount, stateRules]);

  // ── Section activation (progressive reveal) ─────────────
  const moveOutActive = stateCode !== "";
  const statusActive = moveOutDate !== null;
  const noticeDateActive = depositStatus === "yes";
  const amountActive =
    depositStatus !== null &&
    (depositStatus !== "yes" || noticeDate !== null);
  const resultActive = amountActive && parsedAmount > 0;

  // ── Auto-scroll when sections activate ──────────────────
  useEffect(() => {
    if (moveOutActive) moveOutRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [moveOutActive]);

  useEffect(() => {
    if (statusActive) statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [statusActive]);

  useEffect(() => {
    if (noticeDateActive) noticeDateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [noticeDateActive]);

  useEffect(() => {
    if (amountActive) amountRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [amountActive]);

  useEffect(() => {
    if (resultActive) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [resultActive]);

  // ── GA4 events ──────────────────────────────────────────
  useEffect(() => {
    if (!hasTrackedStart.current) {
      gtag("diagnose_started", {});
      hasTrackedStart.current = true;
    }
  }, []);

  useEffect(() => {
    if (hasTrackedComplete.current) return;
    if (hasViolation || (resultActive && stateCode)) {
      gtag("diagnose_complete", {
        state: stateCode,
        has_violation: hasViolation,
        deposit_amount: parsedAmount,
      });
      hasTrackedComplete.current = true;
    }
  }, [hasViolation, resultActive, stateCode, parsedAmount]);

  // ── Handlers ────────────────────────────────────────────
  const handleCheckout = useCallback(async () => {
    if (isCheckoutLoading) return;
    setIsCheckoutLoading(true);

    gtag("diagnose_unlock_clicked", {
      state: stateCode,
      deposit_amount: parsedAmount,
      potential_recovery: potentialRecovery,
      value: 79,
    });

    // Derive noticeStatus and caseStrength for the diagnosis checkout endpoint
    let noticeStatus: string;
    let caseStrength: string;

    if (depositStatus === "no") {
      noticeStatus = hasViolation ? "NOTICE_MISSED" : "NOTICE_PENDING";
      caseStrength = hasViolation ? "STRONG" : "MODERATE";
    } else if (depositStatus === "yes") {
      const noticeLate =
        noticeDate &&
        deadlineAnalysis &&
        new Date(noticeDate) > deadlineAnalysis.claimDeadline;
      noticeStatus = noticeLate ? "NOTICE_LATE" : "NOTICE_TIMELY";
      caseStrength = noticeLate ? "STRONG" : "WEAK";
    } else {
      noticeStatus = "NOTICE_UNCLEAR";
      caseStrength = hasViolation ? "MODERATE" : "WEAK";
    }

    try {
      const response = await fetch("/api/checkout-diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stateCode,
          moveOutDate,
          noticeStatus,
          caseStrength,
          recoveryEstimate: potentialRecovery,
          totalDeposit: parsedAmount,
          amountWithheld: parsedAmount,
          noticeSentDate: noticeDate || undefined,
          email: email || undefined,
        }),
      });

      const result = await response.json();
      if (result.url) {
        window.location.href = result.url;
      } else {
        setIsCheckoutLoading(false);
      }
    } catch {
      setIsCheckoutLoading(false);
    }
  }, [
    isCheckoutLoading,
    stateCode,
    moveOutDate,
    depositStatus,
    noticeDate,
    parsedAmount,
    potentialRecovery,
    hasViolation,
    deadlineAnalysis,
    email,
  ]);

  const handleEmailSubmit = useCallback(async () => {
    if (!email.trim()) {
      setEmailError("Please enter your email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    setEmailError("");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          stateCode,
          depositAmount: parsedAmount,
          landlordInViolation: hasViolation,
          potentialRecovery,
          source: "diagnose",
        }),
      });
      setEmailCaptured(true);
    } catch {
      setEmailCaptured(true);
    }
  }, [email, stateCode, parsedAmount, hasViolation, potentialRecovery]);

  // ── Computed display values ─────────────────────────────
  const daysPastDeadline = deadlineAnalysis
    ? Math.abs(deadlineAnalysis.daysUntilClaimDeadline)
    : 0;

  const sectionClass = (active: boolean) =>
    `transition-all duration-500 ${
      active ? "opacity-100" : "opacity-40 pointer-events-none"
    }`;

  const today = useMemo(() => new Date(), []);

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-black"
          >
            <Logo size="md" />
            <span className="hidden sm:inline">DepositReady</span>
          </Link>
          <span className="text-xs text-gray-500">
            Free analysis &middot; No payment required
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 pb-24 md:pb-8 space-y-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Deposit Recovery Analyzer
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Answer a few questions to see if your landlord violated the law
          </p>
        </div>

        {/* ── Section 1: State ──────────────────────────── */}
        <section>
          <label
            htmlFor="state-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            What state is your rental property in?
          </label>
          <div className="relative">
            <select
              id="state-select"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value as StateCode)}
              className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg bg-white text-base focus:ring-2 focus:ring-black focus:border-black transition-colors appearance-none cursor-pointer"
            >
              <option value="">Select your state</option>
              {STATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <InsightCard visible={!!stateRules} variant="info">
            {stateRules && (
              <>
                <strong>{stateRules.returnDeadline}-day deadline</strong> under{" "}
                {stateRules.statuteTitle}
              </>
            )}
          </InsightCard>
        </section>

        {/* ── Section 2: Move-out date ─────────────────── */}
        <section ref={moveOutRef} className={sectionClass(moveOutActive)}>
          <DateDropdowns
            value={moveOutDate}
            onChange={setMoveOutDate}
            label="When did you move out?"
            maxDate={today}
          />

          <InsightCard
            visible={!!deadlineAnalysis}
            variant={deadlineAnalysis?.landlordInViolation ? "violation" : "info"}
          >
            {deadlineAnalysis && (
              <>
                Deadline was{" "}
                <strong>{formatLegalDate(deadlineAnalysis.claimDeadline)}</strong>
                {deadlineAnalysis.landlordInViolation ? (
                  <span className="font-semibold">
                    {" "}
                    &mdash; {daysPastDeadline} days past deadline
                  </span>
                ) : (
                  <span>
                    {" "}
                    &mdash; {deadlineAnalysis.daysUntilClaimDeadline} days
                    remaining
                  </span>
                )}
              </>
            )}
          </InsightCard>
        </section>

        {/* ── Section 3: Deposit status ────────────────── */}
        <section ref={statusRef} className={sectionClass(statusActive)}>
          <p className="block text-sm font-medium text-gray-700 mb-3">
            Have you received your deposit back?
          </p>
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { value: "no", label: "No" },
                { value: "yes", label: "Yes, partially" },
                { value: "not_sure", label: "Not sure" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setDepositStatus(opt.value);
                  if (opt.value !== "yes") setNoticeDate(null);
                }}
                className={`px-4 py-3 min-h-[44px] rounded-lg border text-sm font-medium transition-colors ${
                  depositStatus === opt.value
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <InsightCard
            visible={depositStatus === "no" && !!deadlineAnalysis?.landlordInViolation}
            variant="violation"
          >
            Your landlord has violated {stateRules?.name} law by failing to
            return your deposit within the legal deadline.
          </InsightCard>

          <InsightCard
            visible={depositStatus === "not_sure" && !!deadlineAnalysis?.landlordInViolation}
            variant="warning"
          >
            If you haven&apos;t received your full deposit or an itemized
            statement of deductions, your landlord may be in violation.
          </InsightCard>

          {/* ── Sub-section: Notice date (conditional) ── */}
          {depositStatus === "yes" && (
            <div
              ref={noticeDateRef}
              className={`mt-4 ${sectionClass(noticeDateActive)}`}
            >
              <DateDropdowns
                value={noticeDate}
                onChange={setNoticeDate}
                label="When did you receive the notice/partial return?"
                maxDate={today}
              />

              <InsightCard
                visible={
                  !!noticeDate &&
                  !!deadlineAnalysis &&
                  new Date(noticeDate) > deadlineAnalysis.claimDeadline
                }
                variant="violation"
              >
                {noticeDate && deadlineAnalysis && (
                  <>
                    Notice was{" "}
                    <strong>
                      {Math.ceil(
                        (new Date(noticeDate).getTime() -
                          deadlineAnalysis.claimDeadline.getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days late
                    </strong>{" "}
                    &mdash; your landlord missed the legal deadline.
                  </>
                )}
              </InsightCard>

              <InsightCard
                visible={
                  !!noticeDate &&
                  !!deadlineAnalysis &&
                  new Date(noticeDate) <= deadlineAnalysis.claimDeadline
                }
                variant="info"
              >
                Notice was within the legal deadline. You may still be entitled
                to dispute deductions.
              </InsightCard>
            </div>
          )}
        </section>

        {/* ── Section 4: Deposit amount ────────────────── */}
        <section ref={amountRef} className={sectionClass(amountActive)}>
          <label
            htmlFor="deposit-amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            How much was your security deposit?
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base">
              $
            </span>
            <input
              id="deposit-amount"
              type="text"
              inputMode="decimal"
              placeholder="1,400"
              value={depositAmount}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9.,]/g, "");
                setDepositAmount(raw);
              }}
              className="w-full pl-7 pr-3 py-3 min-h-[44px] border border-gray-300 rounded-lg bg-white text-base focus:ring-2 focus:ring-black focus:border-black transition-colors"
            />
          </div>
        </section>

        {/* ── Section 5: Recovery Amount ────────────────── */}
        <div ref={resultRef}>
          <RecoveryAmount
            depositAmount={parsedAmount}
            multiplier={stateRules?.damagesMultiplier ?? 1}
            damagesDescription={stateRules?.damagesDescription ?? ""}
            maxRecoverable={potentialRecovery}
            stateName={stateRules?.name ?? ""}
            visible={resultActive && hasViolation}
          />

          {resultActive && !hasViolation && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center transition-all duration-500">
              <p className="text-sm text-amber-700 mb-2">
                Your deposit amount
              </p>
              <div className="text-5xl font-bold text-amber-800">
                ${parsedAmount.toLocaleString()}
              </div>
              <p className="text-sm text-amber-700 mt-2">
                Send a demand letter now to protect your rights before the
                deadline passes.
              </p>
            </div>
          )}
        </div>

        {/* ── Section 6: Packet Manifest ───────────────── */}
        <PacketManifest
          visible={resultActive}
          stateRules={stateRules}
          hasViolation={hasViolation}
          hasDeadlineAnalysis={!!deadlineAnalysis}
          hasAmount={parsedAmount > 0}
          depositAmount={parsedAmount}
          potentialRecovery={potentialRecovery}
          onCheckout={handleCheckout}
          isCheckoutLoading={isCheckoutLoading}
        />

        {/* ── Section 7: Email Capture ─────────────────── */}
        {resultActive && !emailCaptured && (
          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-700 mb-2 text-center">
              Get your recovery timeline emailed to you (optional)
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleEmailSubmit();
                  }
                }}
                className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 text-sm ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
              />
              <Button onClick={handleEmailSubmit} size="sm" variant="outline">
                Send
              </Button>
            </div>
            {emailError && (
              <p className="text-xs text-red-600 mt-1 text-center">
                {emailError}
              </p>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          DepositReady is not a law firm and does not provide legal advice. For
          complex matters, consult a licensed attorney.
        </p>
      </main>

      {/* ── Mobile Sticky CTA ────────────────────────────── */}
      {resultActive && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe md:hidden z-50">
          <Button
            onClick={handleCheckout}
            size="lg"
            fullWidth
            loading={isCheckoutLoading}
            disabled={isCheckoutLoading}
          >
            {isCheckoutLoading
              ? "Redirecting..."
              : "Unlock Your Recovery Packet — $79"}
          </Button>
        </div>
      )}
    </>
  );
}
