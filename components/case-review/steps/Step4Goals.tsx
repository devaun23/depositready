"use client";

import { useCaseReview } from "../CaseReviewIntakeContext";

const CONCERN_OPTIONS = [
  {
    value: "full_refund",
    label: "I want my full deposit back",
    description: "You believe no deductions are justified",
  },
  {
    value: "partial_refund",
    label: "I want a larger portion back",
    description: "Some deductions may be fair, but not all",
  },
  {
    value: "understand_rights",
    label: "I want to understand my rights",
    description: "Not sure what you're entitled to",
  },
  {
    value: "prepare_for_court",
    label: "I'm considering small claims court",
    description: "You want to know if you have a case",
  },
  {
    value: "negotiate",
    label: "I want help negotiating with my landlord",
    description: "You want a strategy for getting a resolution",
  },
];

export function Step4Goals() {
  const { data, updateData } = useCaseReview();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-black">Your Goals</h2>
        <p className="text-sm text-gray-500 mt-1">
          Help us tailor our recommendations to what matters most to you.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-2">
          What&apos;s your primary concern?{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {CONCERN_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                data.primaryConcern === option.value
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="primaryConcern"
                value={option.value}
                checked={data.primaryConcern === option.value}
                onChange={(e) =>
                  updateData("primaryConcern", e.target.value)
                }
                className="mt-0.5 accent-black"
              />
              <div>
                <span className="text-sm font-medium text-black">
                  {option.label}
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  {option.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="desired-outcome"
          className="block text-sm font-medium text-black mb-1.5"
        >
          Anything else you want us to know?
        </label>
        <textarea
          id="desired-outcome"
          rows={3}
          value={data.desiredOutcome}
          onChange={(e) => updateData("desiredOutcome", e.target.value)}
          placeholder="e.g. I want to know if it's worth pursuing legally, or if a demand letter alone would work..."
          className="block w-full px-3 py-3 text-base bg-white border border-gray-300 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-y"
        />
      </div>
    </div>
  );
}
