"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Select, Input } from "@/components/ui";
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
}

type ModalStep = "form" | "result";

export function EligibilityModal({ isOpen, onClose }: EligibilityModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<ModalStep>("form");
  const [formData, setFormData] = useState<FormData>({
    stateCode: "",
    moveOutDate: "",
    forwardingAddress: "",
    receivedItemized: "",
    noticeDate: "",
  });
  const [analysis, setAnalysis] = useState<DeadlineAnalysis | null>(null);
  const [stateRules, setStateRules] = useState<StateRules | null>(null);

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
    formData.receivedItemized;

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

    // Track start packet
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "start_packet", {
        event_category: "engagement",
        state: formData.stateCode,
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
      })
    );

    // Navigate to wizard with query params
    const params = new URLSearchParams({
      state: formData.stateCode,
      moveout: formData.moveOutDate,
      skipStep1: "true",
    });

    router.push(`/wizard?${params.toString()}`);
  }, [formData, router]);

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
      });
      setAnalysis(null);
      setStateRules(null);
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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[calc(100vw-2rem)] sm:max-w-md max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gray-600 transition"
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

              {/* Move-out date */}
              <Input
                label="When did you move out?"
                type="date"
                value={formData.moveOutDate}
                onChange={(e) =>
                  setFormData({ ...formData, moveOutDate: e.target.value })
                }
                max={new Date().toISOString().split("T")[0]}
                required
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
                <Input
                  label="When did you receive this document?"
                  type="date"
                  value={formData.noticeDate}
                  onChange={(e) =>
                    setFormData({ ...formData, noticeDate: e.target.value })
                  }
                  max={new Date().toISOString().split("T")[0]}
                  helperText="This helps determine if the notice was sent on time"
                />
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
        ) : (
          <div className="p-6">
            {analysis && stateRules && (
              <>
                {/* Result header */}
                {analysis.landlordInViolation ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🚨</span>
                      <div>
                        <h3 className="font-semibold text-red-800">
                          Your landlord may have missed their deadline
                        </h3>
                        <p className="text-sm text-red-700 mt-1">
                          Based on {stateRules.name} law, your landlord had until{" "}
                          <strong>
                            {formatLegalDate(analysis.claimDeadline)}
                          </strong>{" "}
                          to return your deposit or send itemized deductions.
                          That deadline has passed.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : formData.forwardingAddress === "not_sure" ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">ℹ️</span>
                      <div>
                        <h3 className="font-semibold text-blue-800">
                          Your deadline depends on your forwarding address
                        </h3>
                        <p className="text-sm text-blue-700 mt-1">
                          If you provided your forwarding address in writing,
                          your landlord&apos;s deadline was{" "}
                          <strong>
                            {formatLegalDate(analysis.claimDeadline)}
                          </strong>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">✓</span>
                      <div>
                        <h3 className="font-semibold text-green-800">
                          Your landlord is still within their deadline
                        </h3>
                        <p className="text-sm text-green-700 mt-1">
                          Based on {stateRules.name} law, your landlord has until{" "}
                          <strong>
                            {formatLegalDate(analysis.claimDeadline)}
                          </strong>{" "}
                          to return your deposit or send itemized deductions.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Leverage explanation */}
                <div className="mb-6">
                  {analysis.landlordInViolation ? (
                    <p className="text-gray-700">
                      This gives you leverage. You may be able to recover your
                      full deposit, and in some cases additional damages
                      depending on your state.
                    </p>
                  ) : (
                    <p className="text-gray-700">
                      Even without a missed deadline, a well-documented demand
                      letter can help you dispute unfair deductions.
                    </p>
                  )}
                </div>

                {/* Key info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">State:</span>
                    <span className="font-medium">{stateRules.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Move-out date:</span>
                    <span className="font-medium">
                      {formatLegalDate(analysis.moveOutDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Return deadline:</span>
                    <span
                      className={`font-medium ${
                        analysis.returnDeadlinePassed ? "text-red-600" : ""
                      }`}
                    >
                      {formatLegalDate(analysis.returnDeadline)}
                      {analysis.returnDeadlinePassed && " (passed)"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Claim deadline:</span>
                    <span
                      className={`font-medium ${
                        analysis.claimDeadlinePassed ? "text-red-600" : ""
                      }`}
                    >
                      {formatLegalDate(analysis.claimDeadline)}
                      {analysis.claimDeadlinePassed && " (passed)"}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  onClick={handleContinueToWizard}
                  className="w-full"
                  size="lg"
                >
                  {analysis.landlordInViolation
                    ? "Generate My Demand Letter"
                    : "Build My Dispute Packet"}
                </Button>

                <button
                  onClick={() => setStep("form")}
                  className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  ← Edit my answers
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  $39 one-time · Preview before you pay
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
