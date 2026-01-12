"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Select } from "@/components/ui";
import { DateDropdowns } from "@/components/ui/DateDropdowns";
import {
  analyzeDeadlines,
  getStateRulesByCode,
  formatLegalDate,
  getAllStates,
} from "@/lib/state-rules";
import type { StateCode, DeadlineAnalysis, StateRules } from "@/lib/state-rules";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ForwardingAddressStatus = "yes" | "no" | "not_sure";

interface FormData {
  stateCode: StateCode | "";
  moveOutDate: string;
  forwardingAddress: ForwardingAddressStatus | "";
  receivedItemized: "yes" | "no" | "not_sure" | "";
  noticeDate: string;
  depositAmount: string;
}

type ModalStep = "form" | "result" | "email" | "preview";

export function EligibilityModal({ isOpen, onClose }: EligibilityModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<ModalStep>("form");
  const [formData, setFormData] = useState<FormData>({
    stateCode: "",
    moveOutDate: "",
    forwardingAddress: "",
    receivedItemized: "",
    noticeDate: "",
    depositAmount: "",
  });
  const [analysis, setAnalysis] = useState<DeadlineAnalysis | null>(null);
  const [stateRules, setStateRules] = useState<StateRules | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailError, setEmailError] = useState("");

  const stateOptions = getAllStates().map((state) => ({
    value: state.code,
    label: state.name,
  }));

  const forwardingOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "not_sure", label: "Not sure" },
  ];

  const itemizedOptions = [
    { value: "yes", label: "Yes, I received a document with charges and amounts" },
    { value: "no", label: "No, I did not receive anything like that" },
    { value: "not_sure", label: "I'm not sure" },
  ];

  const canSubmit =
    formData.stateCode &&
    formData.moveOutDate &&
    formData.forwardingAddress &&
    formData.receivedItemized &&
    formData.depositAmount &&
    parseFloat(formData.depositAmount) > 0;

  const handleSubmit = useCallback(() => {
    if (!canSubmit || !formData.stateCode) return;

    // Track eligibility check start
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "start_eligibility_check", {
        event_category: "engagement",
        state: formData.stateCode,
      });
    }

    const rules = getStateRulesByCode(formData.stateCode);
    const moveOut = new Date(formData.moveOutDate);
    const deadlineAnalysis = analyzeDeadlines(moveOut, rules);

    setStateRules(rules);
    setAnalysis(deadlineAnalysis);
    setStep("result");

    // Track eligibility complete
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "eligibility_complete", {
        event_category: "engagement",
        state: formData.stateCode,
        landlord_in_violation: deadlineAnalysis.landlordInViolation,
        violation_type: deadlineAnalysis.violationType,
      });
    }
  }, [canSubmit, formData.stateCode, formData.moveOutDate]);

  const handleContinueToWizard = useCallback(() => {
    if (!formData.stateCode || !formData.moveOutDate) return;

    // Track wizard start
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "wizard_started", {
        event_category: "conversion",
        state: formData.stateCode,
        deposit_amount: parseFloat(formData.depositAmount) || 0,
        from_eligibility: true,
      });
    }

    // Store in localStorage as backup
    localStorage.setItem(
      "eligibilityData",
      JSON.stringify({
        stateCode: formData.stateCode,
        moveOutDate: formData.moveOutDate,
        forwardingAddress: formData.forwardingAddress,
        receivedItemized: formData.receivedItemized,
        noticeDate: formData.noticeDate,
        depositAmount: formData.depositAmount,
        email: email.trim(),
      })
    );

    // Navigate to wizard with query params
    const params = new URLSearchParams({
      state: formData.stateCode,
      moveout: formData.moveOutDate,
      deposit: formData.depositAmount,
      skipStep1: "true",
    });

    router.push(`/wizard?${params.toString()}`);
  }, [formData, email, router]);

  const handleShowEmailStep = useCallback(() => {
    setStep("email");
  }, []);

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

    setIsSubmittingEmail(true);
    setEmailError("");

    const depositAmount = parseFloat(formData.depositAmount) || 0;
    const multiplier = stateRules?.damagesMultiplier || 1;
    const potentialRecovery = analysis?.landlordInViolation
      ? depositAmount * multiplier
      : depositAmount;

    try {
      // Save lead to database
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          stateCode: formData.stateCode,
          depositAmount,
          landlordInViolation: analysis?.landlordInViolation || false,
          potentialRecovery,
        }),
      });

      // Track email capture
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "email_captured", {
          event_category: "conversion",
          state: formData.stateCode,
          deposit_amount: depositAmount,
        });
      }
    } catch (error) {
      console.error("Failed to save lead:", error);
    } finally {
      setIsSubmittingEmail(false);
      // Continue to wizard regardless of lead save result
      handleContinueToWizard();
    }
  }, [email, formData, stateRules, analysis, handleContinueToWizard]);

  // Reset form when modal closes - intentional sync with external prop state
  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting form when modal closes
      setStep("form");
      setFormData({
        stateCode: "",
        moveOutDate: "",
        forwardingAddress: "",
        receivedItemized: "",
        noticeDate: "",
        depositAmount: "",
      });
      setAnalysis(null);
      setStateRules(null);
      setEmail("");
      setEmailError("");
      setIsSubmittingEmail(false);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - no click to close to prevent accidental dismissal */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className={`relative bg-white rounded-xl shadow-2xl w-full max-w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto ${
        step === "preview" ? "sm:max-w-3xl" : "sm:max-w-md"
      }`}>
        {/* Close button - improved contrast */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {step === "form" ? (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-black mb-2">
              Check Your Deadline
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Answer a few quick questions to see if your landlord missed their
              legal deadline.
            </p>

            <div className="space-y-4">
              {/* State */}
              <Select
                label="Which state was your rental in?"
                options={stateOptions}
                placeholder="Select your state"
                value={formData.stateCode}
                onChange={(e) =>
                  setFormData({ ...formData, stateCode: e.target.value as StateCode | "" })
                }
                required
              />

              {/* Deposit Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  How much was your security deposit? <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="2,000"
                    value={formData.depositAmount}
                    onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                    className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Move-out date */}
              <DateDropdowns
                label="When did you move out?"
                value={formData.moveOutDate || null}
                onChange={(date) =>
                  setFormData({ ...formData, moveOutDate: date || "" })
                }
                maxDate={new Date()}
                required
                id="eligibility-moveout"
              />

              {/* Forwarding address */}
              <Select
                label="Did you give your landlord your new address via email, letter, or text?"
                options={forwardingOptions}
                placeholder="Select an option"
                value={formData.forwardingAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    forwardingAddress: e.target.value as ForwardingAddressStatus | "",
                  })
                }
                required
              />

              {/* Received itemized */}
              <Select
                label="Did your landlord send you a document listing specific charges and amounts taken from your deposit?"
                options={itemizedOptions}
                placeholder="Select an option"
                value={formData.receivedItemized}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    receivedItemized: e.target.value as "yes" | "no" | "not_sure" | "",
                  })
                }
                required
              />

              {/* Notice date (conditional) */}
              {formData.receivedItemized === "yes" && (
                <div>
                  <DateDropdowns
                    label="When did you receive this document?"
                    value={formData.noticeDate || null}
                    onChange={(date) =>
                      setFormData({ ...formData, noticeDate: date || "" })
                    }
                    maxDate={new Date()}
                    id="eligibility-notice"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This helps determine if the notice was sent on time
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full"
                size="lg"
              >
                Check My Deadline
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Free to check. No payment required.
            </p>
          </div>
        ) : step === "result" ? (
          <div className="p-6">
            {analysis && stateRules && (
              <>
                {/* Calculate potential recovery */}
                {(() => {
                  const depositAmount = parseFloat(formData.depositAmount) || 0;
                  const multiplier = stateRules.damagesMultiplier || 1;
                  const potentialRecovery = analysis.landlordInViolation
                    ? depositAmount * multiplier
                    : depositAmount;

                  return (
                    <>
                      {/* Result header */}
                      {analysis.landlordInViolation ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🚨</span>
                            <div>
                              <h3 className="font-semibold text-red-800">
                                Your landlord violated the deadline
                              </h3>
                              <p className="text-sm text-red-700 mt-1">
                                Under {stateRules.name} law, the deadline was{" "}
                                <strong>{formatLegalDate(analysis.claimDeadline)}</strong>.
                                That deadline has passed.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : formData.forwardingAddress === "not_sure" ? (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">ℹ️</span>
                            <div>
                              <h3 className="font-semibold text-blue-800">
                                Your deadline depends on your forwarding address
                              </h3>
                              <p className="text-sm text-blue-700 mt-1">
                                If you provided your forwarding address in writing,
                                the deadline was{" "}
                                <strong>{formatLegalDate(analysis.claimDeadline)}</strong>.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">⏳</span>
                            <div>
                              <h3 className="font-semibold text-amber-800">
                                Your landlord still has time
                              </h3>
                              <p className="text-sm text-amber-700 mt-1">
                                Deadline is{" "}
                                <strong>{formatLegalDate(analysis.claimDeadline)}</strong>.
                                A demand letter now can still help you get your deposit back.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Potential Recovery - THE KEY ELEMENT */}
                      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-5 text-center">
                        <p className="text-sm text-green-700 mb-1">
                          {analysis.landlordInViolation
                            ? `Under ${stateRules.name} law, you could recover up to`
                            : "Your deposit amount"}
                        </p>
                        <div className="text-4xl font-bold text-green-800">
                          ${potentialRecovery.toLocaleString()}
                        </div>
                        {analysis.landlordInViolation && multiplier > 1 && (
                          <p className="text-xs text-green-600 mt-1">
                            (${depositAmount.toLocaleString()} deposit × {multiplier}x statutory damages)
                          </p>
                        )}
                      </div>

                      {/* Primary CTA */}
                      <Button
                        onClick={() => {
                          // Track CTA click
                          if (typeof window !== "undefined" && window.gtag) {
                            window.gtag("event", "cta_clicked", {
                              event_category: "conversion",
                              event_label: "get_recovery_package",
                              state: formData.stateCode,
                              deposit_amount: depositAmount,
                              potential_recovery: potentialRecovery,
                              landlord_in_violation: analysis.landlordInViolation,
                            });
                          }
                          handleShowEmailStep();
                        }}
                        className="w-full"
                        size="lg"
                      >
                        Get Your Recovery Package — $79
                      </Button>

                      {/* Trust signals */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span>Get your deposit back or your money back</span>
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                          A lawyer would charge $300+ for this letter
                        </p>
                      </div>

                      {/* What's included - compact */}
                      <div className="mt-5 pt-5 border-t border-gray-200">
                        <p className="text-xs font-medium text-gray-700 mb-2">Your Recovery Package includes:</p>
                        <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Demand letter
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Legal timeline
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Evidence checklist
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Small claims guide
                          </div>
                        </div>
                      </div>

                      {/* Edit link */}
                      <button
                        onClick={() => setStep("form")}
                        className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 transition"
                      >
                        ← Edit my answers
                      </button>
                    </>
                  );
                })()}
              </>
            )}
          </div>
        ) : step === "email" ? (
          /* Email Capture Step */
          <div className="p-6">
            <h2 className="text-xl font-semibold text-black mb-2 text-center">
              Almost there!
            </h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Enter your email to get started with your Recovery Package.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="lead-email" className="block text-sm font-medium text-gray-900 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="lead-email"
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
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 ${
                    emailError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {emailError && (
                  <p className="text-sm text-red-600 mt-1">{emailError}</p>
                )}
              </div>

              <Button
                onClick={handleEmailSubmit}
                disabled={isSubmittingEmail}
                className="w-full"
                size="lg"
              >
                {isSubmittingEmail ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Continue to Recovery Package"
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                We&apos;ll send your Recovery Package to this email after purchase.
              </p>
            </div>

            <button
              onClick={() => setStep("result")}
              className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 transition"
            >
              ← Back
            </button>
          </div>
        ) : (
          /* Preview Step */
          <div className="p-6">
            <h2 className="text-xl font-semibold text-black mb-6 text-center">
              Your Recovery Package
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: PDF Preview */}
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src="/packet-preview.png"
                    alt="Preview of your Recovery Package"
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Your personalized 10-page Recovery Package
                </p>
              </div>

              {/* Right: Why It Works */}
              <div className="space-y-6">
                {/* Success Stat */}
                <div className="text-center md:text-left">
                  <div className="text-4xl font-bold text-black">85%+</div>
                  <p className="text-gray-600 text-sm">
                    of users recover their full security deposit
                  </p>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <blockquote className="text-gray-700 text-sm italic mb-2">
                    &ldquo;The deadline calculator showed my landlord was 3 weeks late. I cited the statute in my letter and got my full $1,800 back.&rdquo;
                  </blockquote>
                  <p className="text-gray-500 text-xs">
                    — Marcus W., Texas
                  </p>
                </div>

                {/* What's Included */}
                <div>
                  <h3 className="font-medium text-black mb-2 text-sm">What&apos;s Included:</h3>
                  <ul className="space-y-1.5 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      10-page legal demand letter
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Deadline violation analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Damages calculation
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Evidence checklist
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Small claims court guide
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      // Track CTA click from preview
                      if (typeof window !== "undefined" && window.gtag) {
                        window.gtag("event", "cta_clicked", {
                          event_category: "conversion",
                          event_label: "get_recovery_package_preview",
                          state: formData.stateCode,
                        });
                      }
                      handleContinueToWizard();
                    }}
                    className="w-full"
                    size="lg"
                  >
                    Get Your Recovery Package — $79
                  </Button>
                  <button
                    onClick={() => setStep("result")}
                    className="w-full text-sm text-gray-500 hover:text-gray-700 transition"
                  >
                    ← Back
                  </button>
                </div>

                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Get your deposit back or your money back</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Takes 5 minutes · Secure checkout via Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
