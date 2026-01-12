"use client";

import { useEffect, memo, useCallback } from "react";
import { useWizard } from "../WizardContext";
import { DateDropdowns } from "@/components/ui/DateDropdowns";
import { getStateRulesByCode, formatLegalDate } from "@/lib/state-rules";
import { analyzeDeadlines } from "@/lib/state-rules/deadlines";
import type { StateCode } from "@/lib/state-rules/types";

const STATES: { code: StateCode; name: string }[] = [
  { code: "FL", name: "Florida" },
  { code: "CA", name: "California" },
  { code: "TX", name: "Texas" },
  { code: "NY", name: "New York" },
  { code: "GA", name: "Georgia" },
  { code: "IL", name: "Illinois" },
];

export const Step1GettingStarted = memo(function Step1GettingStarted() {
  const { data, updateData, setCanProceed, markTouched, touched } = useWizard();

  // Validation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCanProceed(
        data.stateCode !== null &&
          data.situation !== null &&
          data.moveOutDate !== null
      );
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [data.stateCode, data.situation, data.moveOutDate, setCanProceed]);

  const handleMoveOutDateChange = useCallback((date: string | null) => {
    updateData("moveOutDate", date);
  }, [updateData]);

  const handleMoveOutDateBlur = useCallback(() => {
    markTouched("moveOutDate");
  }, [markTouched]);

  // Show error only if field was touched and is empty
  const showMoveOutError = touched.moveOutDate && !data.moveOutDate;

  const stateRules = data.stateCode ? getStateRulesByCode(data.stateCode) : null;
  const deadlineAnalysis =
    data.moveOutDate && stateRules
      ? analyzeDeadlines(new Date(data.moveOutDate), stateRules)
      : null;

  const situationOptions = [
    {
      value: "moved_out" as const,
      title: "I have moved out",
      description:
        "You no longer live at the rental property and are waiting for your deposit back.",
    },
    {
      value: "still_living" as const,
      title: "I am still living there",
      description:
        "You are currently a tenant but have concerns about your deposit.",
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Let&apos;s start with some basic information about your situation.
      </p>

      {/* State Selection */}
      <div>
        <label
          htmlFor="stateCode"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Which state is the property in? <span className="text-red-500">*</span>
        </label>
        <select
          id="stateCode"
          value={data.stateCode || ""}
          onChange={(e) => {
            const value = e.target.value as StateCode | "";
            updateData("stateCode", value || null);
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-black focus:border-black transition-colors"
        >
          <option value="">Select a state...</option>
          {STATES.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          We currently support these states. More coming soon.
        </p>
      </div>

      {/* Situation Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What is your current situation? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          {situationOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateData("situation", option.value)}
              className={`w-full p-4 min-h-[56px] text-left rounded-lg border-2 transition-all ${
                data.situation === option.value
                  ? "border-black bg-gray-50 ring-1 ring-black"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <div className="font-medium text-gray-900">{option.title}</div>
              <div className="text-sm text-gray-500 mt-1">
                {option.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {data.situation === "still_living" && (
        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> This tool is designed for tenants who have
            already moved out. If you are still living at the property, you may
            want to wait until after you move out to file a dispute. However,
            you can still use this tool to understand your rights and prepare.
          </p>
        </div>
      )}

      {/* Move-out Date */}
      <DateDropdowns
        label="When did you move out?"
        required
        value={data.moveOutDate}
        onChange={handleMoveOutDateChange}
        onBlur={handleMoveOutDateBlur}
        maxDate={new Date()}
        error={showMoveOutError ? "Please select a date" : undefined}
        id="moveOutDate"
      />

      {/* Deadline Analysis */}
      {deadlineAnalysis && stateRules && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-3">
            Your Legal Deadlines ({stateRules.code})
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Move-out date:</span>
              <span className="font-medium">
                {formatLegalDate(deadlineAnalysis.moveOutDate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                {stateRules.returnDeadline}-day return deadline:
              </span>
              <span
                className={`font-medium ${
                  deadlineAnalysis.returnDeadlinePassed
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {formatLegalDate(deadlineAnalysis.returnDeadline)}
                {deadlineAnalysis.returnDeadlinePassed ? " (PASSED)" : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                {stateRules.claimDeadline}-day claim deadline:
              </span>
              <span
                className={`font-medium ${
                  deadlineAnalysis.claimDeadlinePassed
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {formatLegalDate(deadlineAnalysis.claimDeadline)}
                {deadlineAnalysis.claimDeadlinePassed ? " (PASSED)" : ""}
              </span>
            </div>
          </div>

          {deadlineAnalysis.landlordInViolation && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Good news:</strong> Your landlord has missed the legal
                deadline. Under {stateRules.name} law, they may have forfeited their right
                to claim deductions from your deposit.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
