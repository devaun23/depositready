"use client";

import { STATE_OPTIONS } from "@/lib/state-rules";
import type { StateCode, StateRules } from "@/lib/state-rules";

interface StateSelectorProps {
  stateCode: StateCode | "";
  onChange: (code: StateCode | "") => void;
  stateRules: StateRules | null;
}

export function StateSelector({ stateCode, onChange, stateRules }: StateSelectorProps) {
  return (
    <section>
      <label htmlFor="calc-state" className="block text-sm font-medium text-gray-700 mb-2">
        What state is the rental property in?
      </label>
      <div className="relative">
        <select
          id="calc-state"
          value={stateCode}
          onChange={(e) => onChange(e.target.value as StateCode)}
          className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg bg-white text-base focus:ring-2 focus:ring-brand focus:border-brand transition-colors appearance-none cursor-pointer"
        >
          <option value="">Select your state</option>
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

      {stateRules && (
        <div className="mt-3 p-3 bg-accent-light rounded-lg text-sm text-gray-700 animate-fadeSlideUp">
          <strong>{stateRules.returnDeadline}-day deadline</strong> under {stateRules.statuteTitle}
          {stateRules.damagesMultiplier > 1 && (
            <span> &middot; Up to <strong>{stateRules.damagesMultiplier}x</strong> penalty damages</span>
          )}
        </div>
      )}
    </section>
  );
}
