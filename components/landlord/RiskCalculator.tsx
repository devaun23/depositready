"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Select } from "@/components/ui";
import { DateDropdowns } from "@/components/ui/DateDropdowns";
import { getAllStates, formatLegalDate } from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules";
import { calculateLandlordRisk } from "@/lib/landlord";
import type { RiskAssessment, RiskLevel } from "@/lib/landlord";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface FormData {
  stateCode: StateCode | "";
  demandLetterDate: string;
  depositReturned: "yes" | "no" | "";
  itemizedListSent: "yes" | "no" | "";
  depositAmount: string;
}

const RISK_COLORS: Record<RiskLevel, { bg: string; text: string; border: string }> = {
  green: { bg: "bg-green-50", text: "text-green-800", border: "border-green-200" },
  yellow: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  red: { bg: "bg-red-50", text: "text-red-800", border: "border-red-200" },
};

const RISK_ICONS: Record<RiskLevel, string> = {
  green: "bg-green-500",
  yellow: "bg-amber-500",
  red: "bg-red-500",
};

export function RiskCalculator() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    stateCode: "",
    demandLetterDate: "",
    depositReturned: "",
    itemizedListSent: "",
    depositAmount: "",
  });
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [showResults, setShowResults] = useState(false);

  const stateOptions = getAllStates().map((state) => ({
    value: state.code,
    label: state.name,
  }));

  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const canSubmit =
    formData.stateCode &&
    formData.demandLetterDate &&
    formData.depositReturned &&
    formData.itemizedListSent;

  const handleSubmit = useCallback(() => {
    if (!canSubmit || !formData.stateCode) return;

    // Track risk assessment start
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "landlord_risk_check_start", {
        event_category: "engagement",
        state: formData.stateCode,
      });
    }

    const depositAmount = formData.depositAmount
      ? parseFloat(formData.depositAmount)
      : undefined;

    const result = calculateLandlordRisk({
      stateCode: formData.stateCode,
      demandLetterDate: new Date(formData.demandLetterDate),
      depositReturned: formData.depositReturned === "yes",
      itemizedListSent: formData.itemizedListSent === "yes",
      depositAmount,
    });

    setAssessment(result);
    setShowResults(true);

    // Track risk assessment complete
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "landlord_risk_check_complete", {
        event_category: "engagement",
        state: formData.stateCode,
        risk_level: result.riskLevel,
        exposure_amount: result.exposureAmount,
        violation_count: result.violationCount,
      });
    }
  }, [canSubmit, formData]);

  const handleContinue = useCallback(() => {
    if (!formData.stateCode || !assessment) return;

    // Track conversion intent
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "landlord_cta_clicked", {
        event_category: "conversion",
        state: formData.stateCode,
        risk_level: assessment.riskLevel,
        exposure_amount: assessment.exposureAmount,
      });
    }

    // Store data for checkout flow
    localStorage.setItem(
      "landlordData",
      JSON.stringify({
        stateCode: formData.stateCode,
        demandLetterDate: formData.demandLetterDate,
        depositReturned: formData.depositReturned === "yes",
        itemizedListSent: formData.itemizedListSent === "yes",
        depositAmount: formData.depositAmount,
        assessment,
      })
    );

    // Navigate to checkout (reuse existing flow for now)
    const params = new URLSearchParams({
      state: formData.stateCode,
      product: "landlord",
    });
    router.push(`/preview?${params.toString()}`);
  }, [formData, assessment, router]);

  const handleReset = useCallback(() => {
    setShowResults(false);
    setAssessment(null);
  }, []);

  const colors = assessment ? RISK_COLORS[assessment.riskLevel] : RISK_COLORS.green;

  return (
    <section className="py-12 md:py-16 bg-gray-50" id="risk-calculator">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {!showResults ? (
            /* Form View */
            <div className="p-6 md:p-8">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-2">
                Assess Your Risk in 30 Seconds
              </h2>
              <p className="text-gray-600 mb-6">
                Answer a few questions to see your deadline and potential exposure.
              </p>

              <div className="space-y-5">
                {/* State */}
                <Select
                  label="Which state is the property in?"
                  options={stateOptions}
                  placeholder="Select your state"
                  value={formData.stateCode}
                  onChange={(e) =>
                    setFormData({ ...formData, stateCode: e.target.value as StateCode | "" })
                  }
                  required
                />

                {/* Demand Letter Date */}
                <DateDropdowns
                  label="When did you receive the demand letter?"
                  value={formData.demandLetterDate || null}
                  onChange={(date) =>
                    setFormData({ ...formData, demandLetterDate: date || "" })
                  }
                  maxDate={new Date()}
                  required
                  id="landlord-demand-date"
                />

                {/* Deposit Amount (optional) */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">
                    Security deposit amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      placeholder="2,000"
                      value={formData.depositAmount}
                      onChange={(e) =>
                        setFormData({ ...formData, depositAmount: e.target.value })
                      }
                      className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Optional — used to calculate your exposure
                  </p>
                </div>

                {/* Deposit Returned */}
                <Select
                  label="Has any of the deposit been returned to the tenant?"
                  options={yesNoOptions}
                  placeholder="Select an option"
                  value={formData.depositReturned}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      depositReturned: e.target.value as "yes" | "no" | "",
                    })
                  }
                  required
                />

                {/* Itemized List Sent */}
                <Select
                  label="Did you send the tenant an itemized list of deductions?"
                  options={yesNoOptions}
                  placeholder="Select an option"
                  value={formData.itemizedListSent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      itemizedListSent: e.target.value as "yes" | "no" | "",
                    })
                  }
                  required
                />
              </div>

              <div className="mt-8">
                <Button onClick={handleSubmit} disabled={!canSubmit} fullWidth size="lg">
                  Check My Risk
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Free to check. No payment required.
              </p>
            </div>
          ) : (
            /* Results View */
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-semibold text-black">
                  Your Risk Assessment
                </h2>
                <button
                  onClick={handleReset}
                  className="text-sm text-gray-500 hover:text-black underline"
                >
                  Start over
                </button>
              </div>

              {assessment && (
                <>
                  {/* Risk Meter */}
                  <div
                    className={`rounded-lg p-5 mb-6 border ${colors.bg} ${colors.border}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-4 h-4 rounded-full ${RISK_ICONS[assessment.riskLevel]}`}
                      />
                      <span className={`text-lg font-semibold ${colors.text}`}>
                        {assessment.riskLabel}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response deadline:</span>
                        <span className={`font-medium ${colors.text}`}>
                          {formatLegalDate(assessment.responseDeadline)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Days remaining:</span>
                        <span className={`font-medium ${colors.text}`}>
                          {assessment.isOverdue
                            ? "OVERDUE"
                            : `${assessment.daysRemaining} days`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Exposure */}
                  <div className="bg-gray-50 rounded-lg p-5 mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Potential Exposure
                    </h3>
                    <p className="text-3xl font-bold text-black">
                      ${assessment.exposureAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {assessment.exposureDescription}
                    </p>
                  </div>

                  {/* Violations */}
                  {assessment.violations.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        Issues Detected
                      </h3>
                      <ul className="space-y-2">
                        {assessment.violations.map((violation, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-red-500 mt-0.5">!</span>
                            <span className="text-gray-700">{violation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Recommendations
                    </h3>
                    <ul className="space-y-2">
                      {assessment.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-green-600 mt-0.5">→</span>
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button onClick={handleContinue} fullWidth size="lg">
                    Respond Before Your Deadline — $79
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Not legal advice · 24-hour refund guarantee
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
