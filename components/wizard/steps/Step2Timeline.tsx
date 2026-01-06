"use client";

import { useEffect } from "react";
import { useWizard } from "../WizardContext";
import { analyzeDeadlines, formatLegalDate } from "@/lib/florida-rules";

export function Step2Timeline() {
  const { data, updateData, setCanProceed } = useWizard();

  useEffect(() => {
    setCanProceed(data.moveOutDate !== null);
  }, [data.moveOutDate, setCanProceed]);

  const deadlineAnalysis = data.moveOutDate
    ? analyzeDeadlines(new Date(data.moveOutDate))
    : null;

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        These dates are critical for calculating legal deadlines under Florida
        Statute 83.49.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="moveOutDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            When did you move out? <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="moveOutDate"
            value={data.moveOutDate || ""}
            onChange={(e) => updateData("moveOutDate", e.target.value || null)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="depositPaidDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            When did you pay the security deposit? (optional)
          </label>
          <input
            type="date"
            id="depositPaidDate"
            value={data.depositPaidDate || ""}
            onChange={(e) =>
              updateData("depositPaidDate", e.target.value || null)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Usually the same as your lease start date
          </p>
        </div>
      </div>

      {/* Deadline Analysis */}
      {deadlineAnalysis && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-3">
            Your Legal Deadlines
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
                15-day return deadline:
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
                30-day claim deadline:
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
                deadline. Under Florida law, they may have forfeited their right
                to claim deductions from your deposit.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
