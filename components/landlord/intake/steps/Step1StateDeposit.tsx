"use client";

import { useMemo } from "react";
import { useLandlordIntake } from "../LandlordIntakeContext";
import { DateDropdowns } from "@/components/ui/DateDropdowns";
import { STATE_OPTIONS, getStateRulesByCode } from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules";

export function Step1StateDeposit() {
  const { data, updateData } = useLandlordIntake();

  const stateHint = useMemo(() => {
    if (!data.stateCode) return null;
    try {
      const rules = getStateRulesByCode(data.stateCode);
      return `${rules.name}: Deposit must be returned within ${rules.returnDeadline} days. ${rules.statuteTitle}`;
    } catch {
      return null;
    }
  }, [data.stateCode]);

  const inputClass =
    "w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-amber)] focus:border-[var(--accent-amber)] transition-colors";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">State & Deposit Info</h2>
        <p className="text-sm text-gray-600 mt-1">
          Tell us about the rental property and security deposit.
        </p>
      </div>

      {/* State */}
      <div>
        <label htmlFor="stateCode" className="block text-sm font-medium text-gray-700 mb-2">
          Property State <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            id="stateCode"
            value={data.stateCode ?? ""}
            onChange={(e) =>
              updateData("stateCode", (e.target.value || null) as StateCode | null)
            }
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="">Select a state</option>
            {STATE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {stateHint && (
          <p className="mt-2 text-xs text-[var(--accent-amber)] bg-[var(--accent-amber-light)] rounded-md px-3 py-2">
            {stateHint}
          </p>
        )}
      </div>

      {/* Deposit Amount */}
      <div>
        <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700 mb-2">
          Security Deposit Amount <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base">$</span>
          <input
            id="depositAmount"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={data.depositAmount ?? ""}
            onChange={(e) => {
              const val = e.target.value ? parseFloat(e.target.value) : null;
              updateData("depositAmount", val);
            }}
            className={`${inputClass} pl-7`}
          />
        </div>
      </div>

      {/* Move-out Date */}
      <DateDropdowns
        label="Tenant Move-out Date"
        value={data.moveOutDate || null}
        onChange={(date) => updateData("moveOutDate", date ?? "")}
        maxDate={new Date()}
        minDate={new Date(new Date().getFullYear() - 3, 0, 1)}
      />
    </div>
  );
}
