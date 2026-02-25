"use client";

import { useCaseReview } from "../CaseReviewIntakeContext";

export function Step2Situation() {
  const { data, updateData } = useCaseReview();

  const charCount = data.situationSummary.trim().length;
  const isShort = charCount > 0 && charCount < 20;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-black">Your Situation</h2>
        <p className="text-sm text-gray-500 mt-1">
          Tell us what happened with your security deposit. The more detail you
          provide, the better we can assess your case.
        </p>
      </div>

      <div>
        <label
          htmlFor="situation-summary"
          className="block text-sm font-medium text-black mb-1.5"
        >
          What happened? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="situation-summary"
          rows={6}
          value={data.situationSummary}
          onChange={(e) => updateData("situationSummary", e.target.value)}
          placeholder="Example: I moved out of my apartment on January 15th after giving 60 days notice. The apartment was in good condition — I cleaned everything and patched nail holes. My landlord kept my entire $1,500 deposit claiming there was 'damage' but never sent me an itemized list..."
          className="block w-full px-3 py-3 text-base bg-white border border-gray-300 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-y min-h-[150px]"
        />
        <div className="flex justify-between mt-1.5">
          <p
            className={`text-sm ${isShort ? "text-amber-600" : "text-gray-500"}`}
          >
            {isShort
              ? "Please provide at least a few sentences"
              : "Include dates, amounts, and any communication with your landlord"}
          </p>
          <span className="text-xs text-gray-400">
            {charCount} characters
          </span>
        </div>
      </div>
    </div>
  );
}
