"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui";
import {
  STATE_OPTIONS,
  getStateRulesByCode,
  analyzeDeadlines,
  formatLegalDate,
} from "@/lib/state-rules";
import type { StateCode, StateRules, DeadlineAnalysis } from "@/lib/state-rules";
import { assessCaseStrength } from "@/lib/state-rules/case-strength";
import { runComplianceAudit } from "@/lib/landlord/compliance-audit";
import { calculateLiabilityExposure } from "@/lib/landlord/liability-calculator";
import { getApplicableQuestions } from "@/lib/landlord/questions";
import type { ComplianceAnswer, AuditResult, LiabilityExposure } from "@/lib/landlord/types";
import { RoleSelector } from "./steps/RoleSelector";
import { StateSelector } from "./steps/StateSelector";
import { DepositInput } from "./steps/DepositInput";
import { MoveOutDateInput } from "./steps/MoveOutDateInput";
import { TenantQuestions } from "./steps/TenantQuestions";
import { LandlordQuestions } from "./steps/LandlordQuestions";
import { TenantResults } from "./results/TenantResults";
import { LandlordResults } from "./results/LandlordResults";
import { ProductRecommendation } from "./results/ProductRecommendation";
import { DateDropdowns } from "@/components/ui/DateDropdowns";

type Role = "tenant" | "landlord";
type DepositReturnStatus = "nothing" | "partial" | "full";

export function CalculatorShell() {
  // ── Form state ──────────────────────────────────────────
  const [role, setRole] = useState<Role | null>(null);
  const [stateCode, setStateCode] = useState<StateCode | "">("");
  const [depositAmount, setDepositAmount] = useState("");
  const [moveOutDate, setMoveOutDate] = useState<string | null>(null);
  // Tenant-specific
  const [depositReturned, setDepositReturned] = useState<DepositReturnStatus | null>(null);
  // Landlord-specific
  const [complianceAnswers, setComplianceAnswers] = useState<ComplianceAnswer[]>([]);
  // Email capture
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);

  // ── Revealed sections (for first-time animation) ───────
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());
  const revealSection = useCallback((key: string) => {
    setRevealedSections((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  // ── Refs for auto-scroll ────────────────────────────────
  const stateRef = useRef<HTMLDivElement>(null);
  const depositRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // ── Derived state ───────────────────────────────────────
  const stateRules: StateRules | null = useMemo(
    () => (stateCode ? getStateRulesByCode(stateCode as StateCode) : null),
    [stateCode]
  );

  const parsedAmount = useMemo(() => {
    const cleaned = depositAmount.replace(/,/g, "");
    const n = parseFloat(cleaned);
    return isNaN(n) || n <= 0 ? 0 : n;
  }, [depositAmount]);

  const deadlineAnalysis: DeadlineAnalysis | null = useMemo(
    () =>
      stateRules && moveOutDate
        ? analyzeDeadlines(new Date(moveOutDate), stateRules)
        : null,
    [stateRules, moveOutDate]
  );

  // Tenant results
  const tenantCaseStrength = useMemo(() => {
    if (role !== "tenant" || !deadlineAnalysis || !depositReturned || parsedAmount <= 0) return null;
    const depositStatus = depositReturned === "nothing" ? "no" : depositReturned === "partial" ? "not_sure" : "yes";
    return assessCaseStrength(deadlineAnalysis, depositStatus, parsedAmount, stateRules || undefined);
  }, [role, deadlineAnalysis, depositReturned, parsedAmount, stateRules]);

  const tenantHasViolation = useMemo(
    () =>
      !!deadlineAnalysis?.landlordInViolation &&
      (depositReturned === "nothing" || depositReturned === "partial"),
    [deadlineAnalysis, depositReturned]
  );

  const potentialRecovery = useMemo(() => {
    if (!stateRules || parsedAmount <= 0) return 0;
    return tenantHasViolation ? parsedAmount * stateRules.damagesMultiplier : parsedAmount;
  }, [tenantHasViolation, parsedAmount, stateRules]);

  // Landlord results
  const auditResult: AuditResult | null = useMemo(() => {
    if (role !== "landlord" || !stateCode || complianceAnswers.length === 0) return null;
    return runComplianceAudit(stateCode as StateCode, complianceAnswers);
  }, [role, stateCode, complianceAnswers]);

  const liabilityExposure: LiabilityExposure | null = useMemo(() => {
    if (!auditResult || parsedAmount <= 0) return null;
    return calculateLiabilityExposure(stateCode as StateCode, parsedAmount, auditResult.violations);
  }, [auditResult, parsedAmount, stateCode]);

  // ── Section activation ──────────────────────────────────
  const stateActive = role !== null;
  const depositActive = stateCode !== "";
  const dateActive = parsedAmount > 0;
  const questionsActive = moveOutDate !== null;
  const resultsActive = role === "tenant"
    ? questionsActive && depositReturned !== null && parsedAmount > 0
    : questionsActive && complianceAnswers.length > 0 && parsedAmount > 0;

  // ── Auto-scroll + reveal ────────────────────────────────
  useEffect(() => {
    if (stateActive) {
      revealSection("state");
      stateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [stateActive, revealSection]);

  useEffect(() => {
    if (depositActive) {
      revealSection("deposit");
      depositRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [depositActive, revealSection]);

  useEffect(() => {
    if (dateActive) {
      revealSection("date");
      dateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [dateActive, revealSection]);

  useEffect(() => {
    if (questionsActive) {
      revealSection("questions");
      questionsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [questionsActive, revealSection]);

  useEffect(() => {
    if (resultsActive) {
      revealSection("results");
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [resultsActive, revealSection]);

  // ── Save session (analytics) ────────────────────────────
  useEffect(() => {
    if (!resultsActive || sessionSaved) return;

    const saveSession = async () => {
      try {
        await fetch("/api/calculator/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role,
            stateCode,
            depositAmount: parsedAmount,
            moveOutDate,
            depositReturned: role === "tenant" ? depositReturned : undefined,
            landlordCompliance: role === "landlord" ? complianceAnswers : undefined,
            violationDetected: role === "tenant" ? tenantHasViolation : auditResult?.overallStatus !== "compliant",
            potentialRecovery: role === "tenant" ? potentialRecovery : liabilityExposure?.worstCaseTotal,
            caseStrength: role === "tenant" ? tenantCaseStrength?.label : auditResult?.overallStatus,
            recommendedProduct: null, // Set after user sees recommendation
          }),
        });
        setSessionSaved(true);
      } catch {
        // Analytics save is non-critical
      }
    };

    saveSession();
  }, [resultsActive, sessionSaved, role, stateCode, parsedAmount, moveOutDate, depositReturned, complianceAnswers, tenantHasViolation, auditResult, potentialRecovery, liabilityExposure, tenantCaseStrength]);

  // ── Helpers ─────────────────────────────────────────────
  const sectionClass = (active: boolean, key: string) => {
    const isFirstReveal = active && !revealedSections.has(key);
    return `transition-all duration-500 ${
      active
        ? isFirstReveal
          ? "animate-fadeSlideUp"
          : "opacity-100"
        : "opacity-40 pointer-events-none"
    }`;
  };

  const today = useMemo(() => new Date(), []);

  const applicableQuestions = useMemo(
    () => (stateRules ? getApplicableQuestions(stateRules) : []),
    [stateRules]
  );

  const handleComplianceToggle = (questionId: string, answer: boolean) => {
    setComplianceAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, answer }];
    });
  };

  const handleEmailSubmit = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    try {
      await fetch("/api/calculator/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          stateCode,
          depositAmount: parsedAmount,
          email: email.trim(),
        }),
      });
      setEmailSubmitted(true);
    } catch {
      setEmailSubmitted(true);
    }
  };

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

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{
              width: resultsActive
                ? "100%"
                : questionsActive
                ? "80%"
                : dateActive
                ? "60%"
                : depositActive
                ? "40%"
                : stateActive
                ? "20%"
                : "0%",
            }}
          />
        </div>
      </div>

      {/* Main */}
      <main className="max-w-2xl mx-auto px-4 py-8 pb-24 md:pb-8 space-y-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-serif text-display font-semibold text-brand">
            Security Deposit Calculator
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Free analysis for tenants and landlords &mdash; see where you stand in 2 minutes
          </p>
        </div>

        {/* Step 1: Role */}
        <RoleSelector role={role} onSelect={setRole} />

        {/* Step 2: State */}
        <div ref={stateRef} className={sectionClass(stateActive, "state")}>
          <StateSelector
            stateCode={stateCode}
            onChange={setStateCode}
            stateRules={stateRules}
          />
        </div>

        {/* Step 3: Deposit Amount */}
        <div ref={depositRef} className={sectionClass(depositActive, "deposit")}>
          <DepositInput
            value={depositAmount}
            onChange={setDepositAmount}
            smallClaimsLimit={stateRules?.maxSmallClaims}
          />
        </div>

        {/* Step 4: Move-out Date */}
        <div ref={dateRef} className={sectionClass(dateActive, "date")}>
          <MoveOutDateInput
            value={moveOutDate}
            onChange={setMoveOutDate}
            stateRules={stateRules}
            deadlineAnalysis={deadlineAnalysis}
          />
        </div>

        {/* Step 5: Role-specific Questions */}
        <div ref={questionsRef} className={sectionClass(questionsActive, "questions")}>
          {role === "tenant" ? (
            <TenantQuestions
              depositReturned={depositReturned}
              onSelect={setDepositReturned}
            />
          ) : role === "landlord" ? (
            <LandlordQuestions
              questions={applicableQuestions}
              answers={complianceAnswers}
              onToggle={handleComplianceToggle}
            />
          ) : null}
        </div>

        {/* Results */}
        <div ref={resultsRef}>
          {resultsActive && role === "tenant" && stateRules && (
            <>
              <TenantResults
                hasViolation={tenantHasViolation}
                potentialRecovery={potentialRecovery}
                depositAmount={parsedAmount}
                stateRules={stateRules}
                deadlineAnalysis={deadlineAnalysis!}
                caseStrength={tenantCaseStrength}
              />
              <div className="mt-6">
                <ProductRecommendation
                  role="tenant"
                  hasViolation={tenantHasViolation}
                  caseStrength={tenantCaseStrength?.label || "WEAK"}
                  potentialRecovery={potentialRecovery}
                  auditResult={null}
                />
              </div>
            </>
          )}

          {resultsActive && role === "landlord" && stateRules && auditResult && (
            <>
              <LandlordResults
                auditResult={auditResult}
                liabilityExposure={liabilityExposure}
                stateRules={stateRules}
              />
              <div className="mt-6">
                <ProductRecommendation
                  role="landlord"
                  hasViolation={false}
                  caseStrength="MODERATE"
                  potentialRecovery={0}
                  auditResult={auditResult}
                />
              </div>
            </>
          )}
        </div>

        {/* Email Capture */}
        {resultsActive && !emailSubmitted && (
          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-700 mb-2 text-center">
              Get your analysis emailed to you (optional)
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleEmailSubmit();
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-gray-900 text-sm"
              />
              <button
                onClick={handleEmailSubmit}
                className="px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-light transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {emailSubmitted && (
          <p className="text-center text-sm text-green-700">
            Sent! Check your inbox.
          </p>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          DepositReady is not a law firm and does not provide legal advice. For
          complex matters, consult a licensed attorney.
        </p>
      </main>
    </>
  );
}
