"use client";

import { useEffect } from "react";
import { useWizard } from "../WizardContext";

export function Step6WhatHappened() {
  const { data, updateData, setCanProceed } = useWizard();

  useEffect(() => {
    if (data.issueType === "partial_refund") {
      setCanProceed(data.amountReceived !== null && data.amountReceived >= 0);
    } else {
      setCanProceed(data.issueType !== null);
    }
  }, [data.issueType, data.amountReceived, setCanProceed]);

  const options = [
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
        "You received an itemized list of deductions, but you disagree with some or all of them.",
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
        What happened with your security deposit?
      </p>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => updateData("issueType", option.value)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              data.issueType === option.value
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center ${
                  data.issueType === option.value
                    ? "border-blue-600"
                    : "border-gray-300"
                }`}
              >
                {data.issueType === option.value && (
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
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

      {data.issueType === "partial_refund" && (
        <div className="mt-4">
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
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
}
