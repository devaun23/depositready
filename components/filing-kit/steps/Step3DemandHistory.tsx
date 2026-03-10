"use client";

import { useMemo } from "react";
import { useFilingKit } from "../FilingKitIntakeContext";
import { DateDropdowns } from "@/components/ui/DateDropdowns";

export function Step3DemandHistory() {
  const { data, updateData } = useFilingKit();
  const today = useMemo(() => new Date(), []);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Demand History</h2>
        <p className="text-sm text-gray-600 mt-1">
          Courts want to see you tried to resolve this before filing.
        </p>
      </div>

      {/* Sent demand letter? */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Have you sent a demand letter to your landlord?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[true, false].map((val) => (
            <button
              key={String(val)}
              onClick={() => updateData("sentDemandLetter", val)}
              className={`px-4 py-3 min-h-[44px] rounded-lg border text-sm font-medium transition-colors ${
                data.sentDemandLetter === val
                  ? "bg-[var(--accent-orange)] text-white border-[var(--accent-orange)]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {val ? "Yes" : "No"}
            </button>
          ))}
        </div>
      </div>

      {data.sentDemandLetter && (
        <>
          <DateDropdowns
            value={data.demandLetterDate || null}
            onChange={(val) => updateData("demandLetterDate", val || "")}
            label="When was it sent?"
            maxDate={today}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How was it sent?
            </label>
            <select
              value={data.demandLetterMethod}
              onChange={(e) => updateData("demandLetterMethod", e.target.value as typeof data.demandLetterMethod)}
              className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg bg-white text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)] appearance-none"
            >
              <option value="">Select method</option>
              <option value="certified_mail">Certified mail</option>
              <option value="regular_mail">Regular mail</option>
              <option value="email">Email</option>
              <option value="hand_delivered">Hand delivered</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Did the landlord respond?</p>
            <div className="grid grid-cols-2 gap-3">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => updateData("landlordResponded", val)}
                  className={`px-4 py-3 min-h-[44px] rounded-lg border text-sm font-medium transition-colors ${
                    data.landlordResponded === val
                      ? "bg-[var(--accent-orange)] text-white border-[var(--accent-orange)]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {val ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>

          {data.landlordResponded && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What did they say? (brief summary)
              </label>
              <textarea
                value={data.landlordResponseSummary}
                onChange={(e) => updateData("landlordResponseSummary", e.target.value)}
                rows={3}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
                placeholder="e.g., They claimed damages for cleaning and carpet replacement..."
              />
            </div>
          )}
        </>
      )}

      {/* Deductions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What deductions has the landlord claimed? (if any)
        </label>
        <textarea
          value={data.deductionsClaimed}
          onChange={(e) => updateData("deductionsClaimed", e.target.value)}
          rows={3}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          placeholder="e.g., Carpet cleaning $200, paint $300, broken blinds $100..."
        />
      </div>

      {data.deductionsClaimed && (
        <div>
          <label htmlFor="fk-deductions-amt" className="block text-sm font-medium text-gray-700 mb-1">
            Total deductions amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              id="fk-deductions-amt"
              type="text"
              inputMode="decimal"
              value={data.deductionsAmount?.toString() || ""}
              onChange={(e) => {
                const n = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
                updateData("deductionsAmount", isNaN(n) ? null : n);
              }}
              className="w-full pl-7 pr-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
