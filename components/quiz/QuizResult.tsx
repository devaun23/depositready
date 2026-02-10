"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo, Button } from "@/components/ui";
import { useQuiz } from "./QuizContext";
import {
  analyzeDeadlines,
  getStateRulesByCode,
  formatLegalDate,
  calculateCaseStrength,
} from "@/lib/state-rules";
import type { CaseStrength } from "@/lib/state-rules";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function QuizResult() {
  const router = useRouter();
  const { data, emailCaptured, captureEmail, prevStep } = useQuiz();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Get state rules and analyze deadlines
  const { stateRules, analysis, potentialRecovery, caseStrength } = useMemo(() => {
    if (!data.stateCode || !data.moveOutDate || !data.depositAmount) {
      return { stateRules: null, analysis: null, potentialRecovery: 0, caseStrength: 'WEAK' as CaseStrength };
    }

    const rules = getStateRulesByCode(data.stateCode);
    const moveOut = new Date(data.moveOutDate);
    const deadlineAnalysis = analyzeDeadlines(moveOut, rules);

    // Calculate potential recovery
    // If violation AND deposit not returned, show multiplier damages
    const hasViolation =
      deadlineAnalysis.landlordInViolation &&
      (data.depositStatus === "no" || data.depositStatus === "not_sure");
    const recovery = hasViolation
      ? data.depositAmount * rules.damagesMultiplier
      : data.depositAmount;

    const strength = calculateCaseStrength(
      deadlineAnalysis,
      data.depositStatus as 'yes' | 'no' | 'not_sure',
      data.depositAmount
    );

    return {
      stateRules: rules,
      analysis: deadlineAnalysis,
      potentialRecovery: recovery,
      caseStrength: strength,
    };
  }, [data]);

  // Track diagnosis_completed when results render
  useEffect(() => {
    if (!stateRules || !analysis) return;
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "diagnosis_completed", {
        event_category: "funnel",
        state: data.stateCode,
        case_strength: caseStrength,
        landlord_in_violation: analysis.landlordInViolation,
        potential_recovery: potentialRecovery,
        deposit_amount: data.depositAmount,
      });
    }
  }, [stateRules, analysis, caseStrength, data.stateCode, data.depositAmount, potentialRecovery]);

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

    setIsSubmitting(true);
    setEmailError("");

    try {
      // Save lead to database with quiz source
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          stateCode: data.stateCode,
          depositAmount: data.depositAmount,
          landlordInViolation: analysis?.landlordInViolation || false,
          potentialRecovery,
          source: "quiz",
        }),
      });

      // Track email capture
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "email_captured", {
          event_category: "conversion",
          event_label: "quiz",
          state: data.stateCode,
          deposit_amount: data.depositAmount,
          potential_recovery: potentialRecovery,
        });
      }

      captureEmail(email.trim());
    } catch (error) {
      console.error("Failed to save lead:", error);
      // Still capture email locally even if API fails
      captureEmail(email.trim());
    } finally {
      setIsSubmitting(false);
    }
  }, [email, data, analysis, potentialRecovery, captureEmail]);

  const handleGetPackage = useCallback(() => {
    // Track conversion click
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "cta_clicked", {
        event_category: "conversion",
        event_label: "quiz_get_package",
        state: data.stateCode,
        deposit_amount: data.depositAmount,
        potential_recovery: potentialRecovery,
      });
    }

    // Store quiz data in localStorage for checkout
    localStorage.setItem(
      "quizData",
      JSON.stringify({
        stateCode: data.stateCode,
        moveOutDate: data.moveOutDate,
        depositStatus: data.depositStatus,
        depositAmount: data.depositAmount,
        email: data.email,
      })
    );

    // Navigate to wizard with pre-filled data
    const params = new URLSearchParams({
      state: data.stateCode || "",
      moveout: data.moveOutDate || "",
      deposit: String(data.depositAmount || ""),
      source: "quiz",
    });

    router.push(`/wizard?${params.toString()}`);
  }, [data, potentialRecovery, router]);

  const handleGetBasicPackage = useCallback(async () => {
    if (isCheckoutLoading) return;
    setIsCheckoutLoading(true);

    // Track conversion click
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "cta_clicked", {
        event_category: "conversion",
        event_label: "quiz_get_basic_package",
        state: data.stateCode,
        deposit_amount: data.depositAmount,
        potential_recovery: potentialRecovery,
        value: 29,
      });
    }

    try {
      // Call $29 checkout API directly
      const response = await fetch("/api/checkout-basic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantName: "Tenant",
          tenantEmail: data.email,
          propertyAddress: "Property Address",
          depositAmount: data.depositAmount,
          source: "quiz_basic",
          formData: {
            stateCode: data.stateCode,
            moveOutDate: data.moveOutDate,
            depositStatus: data.depositStatus,
            depositAmount: data.depositAmount,
          },
        }),
      });

      const result = await response.json();

      if (result.url) {
        window.location.href = result.url;
      } else {
        console.error("No checkout URL returned");
        setIsCheckoutLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsCheckoutLoading(false);
    }
  }, [data, potentialRecovery, isCheckoutLoading]);

  const handleGet79Package = useCallback(async () => {
    if (isCheckoutLoading) return;
    setIsCheckoutLoading(true);

    // Funnel event: checkout_clicked
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "checkout_clicked", {
        event_category: "funnel",
        value: 79,
        case_strength: caseStrength,
        state: data.stateCode,
      });
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantName: "Tenant",
          tenantEmail: data.email,
          propertyAddress: "To be provided",
          depositAmount: data.depositAmount,
          source: "quiz_full",
          formData: {
            stateCode: data.stateCode,
            moveOutDate: data.moveOutDate,
            depositStatus: data.depositStatus,
            depositAmount: data.depositAmount,
          },
        }),
      });

      const result = await response.json();

      if (result.url) {
        window.location.href = result.url;
      } else {
        console.error("No checkout URL returned");
        setIsCheckoutLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsCheckoutLoading(false);
    }
  }, [data, caseStrength, isCheckoutLoading]);

  const handleCustomize = useCallback(() => {
    // Track customize click
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "cta_clicked", {
        event_category: "conversion",
        event_label: "quiz_customize",
        state: data.stateCode,
      });
    }

    // Navigate to wizard
    const params = new URLSearchParams({
      state: data.stateCode || "",
      moveout: data.moveOutDate || "",
      deposit: String(data.depositAmount || ""),
      source: "quiz",
    });

    router.push(`/wizard?${params.toString()}`);
  }, [data, router]);

  if (!stateRules || !analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading results...</p>
      </div>
    );
  }

  const isViolation =
    analysis.landlordInViolation &&
    (data.depositStatus === "no" || data.depositStatus === "not_sure");

  const daysPastDeadline = Math.abs(analysis.daysUntilClaimDeadline);
  const daysRemaining = analysis.daysUntilClaimDeadline;

  return (
    <div className="min-h-screen bg-gray-50">
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
          <button
            onClick={prevStep}
            className="text-sm text-gray-500 hover:text-black transition"
          >
            Edit answers
          </button>
        </div>
      </header>

      {/* Result Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Violation Status Banner */}
          {isViolation ? (
            <div className="bg-red-600 text-white p-6 text-center">
              <div className="text-4xl mb-2">&#x1F6A8;</div>
              <h1 className="text-2xl font-semibold mb-2">
                Your landlord violated {stateRules.name} law
              </h1>
              <p className="text-red-100">
                They are{" "}
                <strong className="text-white">{daysPastDeadline} days</strong>{" "}
                past the legal deadline
              </p>
            </div>
          ) : analysis.landlordInViolation ? (
            <div className="bg-amber-500 text-white p-6 text-center">
              <div className="text-4xl mb-2">&#x26A0;&#xFE0F;</div>
              <h1 className="text-2xl font-semibold mb-2">
                Your landlord may be in violation
              </h1>
              <p className="text-amber-100">
                The deadline has passed, but you indicated receiving something.
                Let&apos;s verify.
              </p>
            </div>
          ) : (
            <div className="bg-amber-100 text-amber-900 p-6 text-center">
              <div className="text-4xl mb-2">&#x23F0;</div>
              <h1 className="text-2xl font-semibold mb-2">
                Your landlord still has {daysRemaining} days
              </h1>
              <p className="text-amber-700">
                The deadline is {formatLegalDate(analysis.claimDeadline)}. Send
                a demand letter now to protect your rights.
              </p>
            </div>
          )}

          {/* Statute Citation - Credibility Element */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              Under{" "}
              <strong className="text-gray-900">
                {stateRules.statuteSections.returnDeadline}
              </strong>
              , landlords have{" "}
              <strong className="text-gray-900">
                {stateRules.returnDeadline} days
              </strong>{" "}
              to return your deposit or provide an itemized statement.
            </p>
          </div>

          <div className="p-6">
            {/* Recovery Amount - Always Visible */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mb-6">
              <p className="text-sm text-green-700 mb-1">
                {isViolation
                  ? `Under ${stateRules.name} law, you could recover up to`
                  : "Your deposit amount"}
              </p>
              <div className="text-5xl font-bold text-green-800">
                ${potentialRecovery.toLocaleString()}
              </div>
              {isViolation && stateRules.damagesMultiplier > 1 && (
                <p className="text-xs text-green-600 mt-2">
                  (${data.depositAmount?.toLocaleString()} deposit ×{" "}
                  {stateRules.damagesMultiplier}x{" "}
                  {stateRules.damagesDescription})
                </p>
              )}
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span>127 tenants recovered their deposit this month</span>
            </div>

            {/* Optional Email Capture */}
            {!emailCaptured && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 mb-2 text-center">
                  Get your recovery timeline emailed to you
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
                  <Button
                    onClick={handleEmailSubmit}
                    disabled={isSubmitting}
                    size="sm"
                    variant="outline"
                  >
                    {isSubmitting ? "..." : "Send"}
                  </Button>
                </div>
                {emailError && (
                  <p className="text-xs text-red-600 mt-1 text-center">{emailError}</p>
                )}
              </div>
            )}

            {/* Urgency - Deadline Warning */}
            {analysis && (
              <div className={`mb-6 p-4 rounded-lg border ${
                analysis.landlordInViolation
                  ? "bg-red-50 border-red-200"
                  : "bg-amber-50 border-amber-200"
              }`}>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium text-gray-900">
                    {analysis.landlordInViolation
                      ? `Landlord is ${daysPastDeadline} days past deadline — act now`
                      : `Deadline in ${daysRemaining} days — send demand letter before it passes`}
                  </p>
                </div>
              </div>
            )}

            {/* Case Strength Indicator */}
            <div className={`mb-6 rounded-lg p-4 text-center ${
              caseStrength === 'STRONG'
                ? 'bg-green-50 border border-green-200'
                : caseStrength === 'MODERATE'
                ? 'bg-amber-50 border border-amber-200'
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <p className="text-xs text-gray-600 mb-1">Case Strength</p>
              <p className={`text-lg font-bold ${
                caseStrength === 'STRONG'
                  ? 'text-green-800'
                  : caseStrength === 'MODERATE'
                  ? 'text-amber-800'
                  : 'text-gray-700'
              }`}>
                {caseStrength === 'STRONG' ? 'Strong' : caseStrength === 'MODERATE' ? 'Moderate' : 'Weak'}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {caseStrength === 'STRONG'
                  ? 'Deadline passed, deposit not returned — you have a clear violation.'
                  : caseStrength === 'MODERATE'
                  ? 'Potential violation — acting now strengthens your position.'
                  : 'Deadline hasn\'t passed yet — a demand letter puts your landlord on notice.'}
              </p>
            </div>

            {/* Pricing Options */}
            <div className="space-y-4">
              {isViolation ? (
                <>
                  {/* Violation detected: $79 Court-Ready Case File is PRIMARY */}
                  <div className="border-2 border-black rounded-xl p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Court-Ready Case File</span>
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                        COURT-READY
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      10-page legal case file with violation analysis, damages calculation, and small claims filing guide.
                    </p>
                    <Button
                      onClick={handleGet79Package}
                      className="w-full"
                      size="lg"
                      disabled={isCheckoutLoading}
                    >
                      {isCheckoutLoading ? "Redirecting..." : "Get Case File — $79"}
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400 whitespace-nowrap">Or start with a letter</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <div className="border border-gray-300 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Recovery Kit</span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                        QUICK START
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      Demand letter + evidence checklist. Good for straightforward cases.
                    </p>
                    <Button
                      onClick={handleGetBasicPackage}
                      variant="outline"
                      className="w-full"
                      size="lg"
                      disabled={isCheckoutLoading}
                    >
                      {isCheckoutLoading ? "Redirecting..." : "Get Recovery Kit — $29"}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* No violation: $29 Recovery Kit is PRIMARY */}
                  <div className="border-2 border-black rounded-xl p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Recovery Kit</span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                        QUICK START
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      Demand letter + evidence checklist. Perfect for straightforward cases.
                    </p>
                    <Button
                      onClick={handleGetBasicPackage}
                      className="w-full"
                      size="lg"
                      disabled={isCheckoutLoading}
                    >
                      {isCheckoutLoading ? "Redirecting..." : "Get Recovery Kit — $29"}
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400 whitespace-nowrap">If your landlord ignores this</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <div className="border border-gray-300 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Court-Ready Case File</span>
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                        COURT-READY
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      10-page legal case file with violation analysis, damages calculation, and small claims filing guide.
                    </p>
                    <Button
                      onClick={handleGet79Package}
                      variant="outline"
                      className="w-full"
                      size="lg"
                      disabled={isCheckoutLoading}
                    >
                      {isCheckoutLoading ? "Redirecting..." : "Get Case File — $79"}
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Trust Signals */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Get your deposit back or your money back</span>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Secure checkout • 7-day money-back guarantee
              </p>
            </div>

            {/* What's Included */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-3 text-center">
                Your Case File includes:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                {[
                  "Formal demand letter with statute citations",
                  "Legal analysis of landlord violations",
                  "Court-ready evidence index",
                  "Small claims filing guide for your state",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
