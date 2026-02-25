"use client";

import { useCaseReview } from "../CaseReviewIntakeContext";

export function Step3Communications() {
  const { data, updateData } = useCaseReview();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-black">
          Communications &amp; Details
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          These details help us build a stronger case assessment. All fields are
          optional.
        </p>
      </div>

      <div>
        <label
          htmlFor="landlord-response"
          className="block text-sm font-medium text-black mb-1.5"
        >
          What reason did your landlord give for withholding?
        </label>
        <textarea
          id="landlord-response"
          rows={3}
          value={data.landlordResponse}
          onChange={(e) => updateData("landlordResponse", e.target.value)}
          placeholder="e.g. They said there was damage to the carpet and walls, but didn't provide specifics..."
          className="block w-full px-3 py-3 text-base bg-white border border-gray-300 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-y"
        />
      </div>

      <div>
        <label
          htmlFor="deductions-described"
          className="block text-sm font-medium text-black mb-1.5"
        >
          What deductions were listed (if any)?
        </label>
        <textarea
          id="deductions-described"
          rows={3}
          value={data.deductionsDescribed}
          onChange={(e) => updateData("deductionsDescribed", e.target.value)}
          placeholder="e.g. Carpet cleaning: $300, Painting: $500, 'General repairs': $200..."
          className="block w-full px-3 py-3 text-base bg-white border border-gray-300 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-y"
        />
      </div>

      <div>
        <label
          htmlFor="communications-history"
          className="block text-sm font-medium text-black mb-1.5"
        >
          Any communication history worth noting?
        </label>
        <textarea
          id="communications-history"
          rows={3}
          value={data.communicationsHistory}
          onChange={(e) => updateData("communicationsHistory", e.target.value)}
          placeholder="e.g. I sent an email on Feb 1 asking about my deposit, no response. Called on Feb 15, they said they'd 'look into it'..."
          className="block w-full px-3 py-3 text-base bg-white border border-gray-300 rounded placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-y"
        />
      </div>
    </div>
  );
}
