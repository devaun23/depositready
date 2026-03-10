"use client";

import { useMemo } from "react";
import { DateDropdowns } from "@/components/ui/DateDropdowns";
import { formatLegalDate } from "@/lib/state-rules";
import type { StateRules, DeadlineAnalysis } from "@/lib/state-rules";

interface MoveOutDateInputProps {
  value: string | null;
  onChange: (date: string | null) => void;
  stateRules: StateRules | null;
  deadlineAnalysis: DeadlineAnalysis | null;
}

export function MoveOutDateInput({ value, onChange, stateRules, deadlineAnalysis }: MoveOutDateInputProps) {
  const today = useMemo(() => new Date(), []);

  return (
    <section>
      <DateDropdowns
        value={value}
        onChange={onChange}
        label="When did the tenant move out?"
        maxDate={today}
      />

      {deadlineAnalysis && stateRules && (
        <div
          className={`mt-3 p-3 rounded-lg text-sm animate-fadeSlideUp ${
            deadlineAnalysis.landlordInViolation
              ? "bg-red-50 border border-red-200 text-red-800"
              : "bg-green-50 border border-green-200 text-green-800"
          }`}
        >
          Deadline: <strong>{formatLegalDate(deadlineAnalysis.claimDeadline)}</strong>
          {deadlineAnalysis.landlordInViolation ? (
            <span className="font-semibold">
              {" "}&mdash; {Math.abs(deadlineAnalysis.daysUntilClaimDeadline)} days past deadline
            </span>
          ) : (
            <span>
              {" "}&mdash; {deadlineAnalysis.daysUntilClaimDeadline} days remaining
            </span>
          )}
        </div>
      )}
    </section>
  );
}
