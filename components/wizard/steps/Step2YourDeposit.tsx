"use client";

import { useEffect, memo } from "react";
import { useWizard } from "../WizardContext";

export const Step2YourDeposit = memo(function Step2YourDeposit() {
  const { data, updateData, setCanProceed } = useWizard();

  // Debounced validation to reduce re-renders during typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const hasValidDeposit = data.depositAmount !== null && data.depositAmount > 0;
      const hasItemizedAnswer = data.wasItemized !== null;
      const hasIssueType = data.issueType !== null;
      const hasAmountReceivedIfNeeded =
        data.issueType !== "partial_refund" ||
        (data.amountReceived !== null && data.amountReceived >= 0);

      setCanProceed(
        hasValidDeposit && hasItemizedAnswer && hasIssueType && hasAmountReceivedIfNeeded
      );
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [
    data.depositAmount,
    data.wasItemized,
    data.issueType,
    data.amountReceived,
    setCanProceed,
  ]);

  const issueOptions = [
    {
      value: "no_refund" as const,
      title: "I received nothing",
      description:
        "Your landlord has not returned any of your deposit or sent any communication.",
    },
    {
      value: "unfair_deductions" as const,
      title: "Unfair deductions",
      description:
        "You received a document listing charges, but you disagree with some or all of them.",
    },
    {
      value: "partial_refund" as const,
      title: "Partial refund without explanation",
      description:
        "You received some money back, but less than expected and without proper itemization.",
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Tell us about your security deposit and what happened.
      </p>

      {/* Deposit Amount */}
      <div>
        <label
          htmlFor="depositAmount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          How much was your security deposit?{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="number"
            id="depositAmount"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={data.depositAmount || ""}
            onChange={(e) =>
              updateData(
                "depositAmount",
                e.target.value ? parseFloat(e.target.value) : null
              )
            }
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>
      </div>

      {/* Was Itemized */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Did your landlord give you a written breakdown of deductions?{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => updateData("wasItemized", true)}
            className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${
              data.wasItemized === true
                ? "border-black bg-gray-50 text-black"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => updateData("wasItemized", false)}
            className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${
              data.wasItemized === false
                ? "border-black bg-gray-50 text-black"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Most states require landlords to provide an itemized list of any
          deductions within a specific deadline.
        </p>
      </div>

      {data.wasItemized === false && (
        <div className="p-4 bg-amber-50 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> If your landlord did not provide an
            itemized list of deductions within the legal deadline, they
            may have forfeited their right to keep any of your deposit.
          </p>
        </div>
      )}

      {/* Issue Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What happened with your deposit? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          {issueOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateData("issueType", option.value)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                data.issueType === option.value
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center ${
                    data.issueType === option.value
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  {data.issueType === option.value && (
                    <div className="w-2.5 h-2.5 bg-black rounded-full" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{option.title}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {option.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Amount Received (for partial refund) */}
      {data.issueType === "partial_refund" && (
        <div>
          <label
            htmlFor="amountReceived"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            How much did you receive? <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              id="amountReceived"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={data.amountReceived ?? ""}
              onChange={(e) =>
                updateData(
                  "amountReceived",
                  e.target.value ? parseFloat(e.target.value) : null
                )
              }
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          {data.depositAmount && data.amountReceived !== null && (
            <p className="text-sm text-gray-600 mt-2">
              You are owed{" "}
              <strong>
                ${(data.depositAmount - data.amountReceived).toFixed(2)}
              </strong>{" "}
              plus potential damages.
            </p>
          )}
        </div>
      )}
    </div>
  );
});
