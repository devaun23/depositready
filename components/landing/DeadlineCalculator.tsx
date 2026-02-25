"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { DateDropdowns } from "@/components/ui/DateDropdowns";
import {
  STATE_OPTIONS,
  getStateRulesByCode,
  analyzeDeadlines,
} from "@/lib/state-rules";
import type { StateCode, DeadlineAnalysis, StateRules } from "@/lib/state-rules";

export function DeadlineCalculator() {
  const router = useRouter();
  const [stateCode, setStateCode] = useState<StateCode | "">("");
  const [moveOutDate, setMoveOutDate] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo<{
    rules: StateRules;
    analysis: DeadlineAnalysis;
    potentialRecovery: number;
  } | null>(() => {
    if (!submitted || !stateCode || !moveOutDate) return null;
    try {
      const rules = getStateRulesByCode(stateCode as StateCode);
      const analysis = analyzeDeadlines(new Date(moveOutDate), rules);
      // Show multiplier damages if landlord is in violation
      const potentialRecovery = analysis.landlordInViolation
        ? 1500 * rules.damagesMultiplier // Use $1,500 as example deposit
        : 1500;
      return { rules, analysis, potentialRecovery };
    } catch {
      return null;
    }
  }, [submitted, stateCode, moveOutDate]);

  const handleSubmit = () => {
    if (stateCode && moveOutDate) {
      setSubmitted(true);

      // Track in analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "deadline_check", {
          event_category: "engagement",
          state: stateCode,
        });
      }
    }
  };

  const handleGetStarted = () => {
    const params = new URLSearchParams({
      state: stateCode,
      moveout: moveOutDate || "",
      source: "hero_calculator",
    });
    router.push(`/quiz?${params.toString()}`);
  };

  // Show result state
  if (result) {
    const { rules, analysis } = result;
    const daysPast = Math.abs(analysis.daysUntilReturnDeadline);

    return (
      <div className="max-w-md mx-auto">
        {/* Result card */}
        <div className={`rounded-xl p-5 text-center ${
          analysis.landlordInViolation
            ? "bg-red-50 border-2 border-red-200"
            : "bg-amber-50 border-2 border-amber-200"
        }`}>
          {analysis.landlordInViolation ? (
            <>
              <div className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                DEADLINE VIOLATED
              </div>
              <p className="text-gray-900 font-medium mb-1">
                Your landlord is <strong className="text-red-700">{daysPast} days</strong> past the
                {" "}{rules.name} deadline
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Under {rules.statuteSections.returnDeadline}, they had {rules.returnDeadline} days to return your deposit.
              </p>
              {rules.damagesMultiplier > 1 && (
                <p className="text-sm font-medium text-red-700 mt-2">
                  You may be entitled to {rules.damagesDescription} under state law.
                </p>
              )}
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                DEADLINE APPROACHING
              </div>
              <p className="text-gray-900 font-medium mb-1">
                Your landlord has <strong className="text-amber-700">{analysis.daysUntilReturnDeadline} days</strong> left
              </p>
              <p className="text-sm text-gray-600">
                The {rules.name} deadline is {rules.returnDeadline} days from move-out.
                Send a demand letter now — before the deadline passes.
              </p>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 space-y-2">
          <Button onClick={handleGetStarted} className="w-full" size="lg">
            {analysis.landlordInViolation
              ? "Start My Recovery"
              : "Send a Demand Letter"}
          </Button>
          <button
            onClick={() => setSubmitted(false)}
            className="block w-full text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Check a different date
          </button>
        </div>
      </div>
    );
  }

  // Input form
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        {/* State */}
        <div className="mb-4">
          <label
            htmlFor="calc-state"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Your state
          </label>
          <div className="relative">
            <select
              id="calc-state"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value as StateCode | "")}
              className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg bg-white text-base focus:ring-2 focus:ring-black focus:border-black transition-colors appearance-none cursor-pointer"
            >
              <option value="">Select your state</option>
              {STATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Move-out date */}
        <div className="mb-4">
          <DateDropdowns
            value={moveOutDate}
            onChange={setMoveOutDate}
            label="When did you move out?"
            maxDate={new Date()}
            minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 3))}
          />
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          className="w-full"
          size="lg"
          disabled={!stateCode || !moveOutDate}
        >
          Check My Deadline
        </Button>
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Free · No sign-up · 16 states covered
      </p>
    </div>
  );
}
