"use client";

import { useLandlordIntake } from "../LandlordIntakeContext";
import { DateDropdowns } from "@/components/ui/DateDropdowns";

const THREAT_TYPES = [
  { value: "demand_letter", label: "Demand Letter" },
  { value: "verbal", label: "Verbal Threat" },
  { value: "email", label: "Email / Text Message" },
  { value: "attorney_letter", label: "Attorney Letter" },
  { value: "court_filing", label: "Court Filing" },
] as const;

export function Step3ThreatDetails() {
  const { data, updateData } = useLandlordIntake();

  const inputClass =
    "w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-amber)] focus:border-[var(--accent-amber)] transition-colors";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Threat Details</h2>
        <p className="text-sm text-gray-600 mt-1">
          Tell us about the tenant&apos;s claim or legal threat.
        </p>
      </div>

      {/* Threat Type */}
      <div>
        <label htmlFor="threatType" className="block text-sm font-medium text-gray-700 mb-2">
          Type of Threat <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            id="threatType"
            value={data.threatType}
            onChange={(e) =>
              updateData("threatType", e.target.value as typeof data.threatType)
            }
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="">Select type</option>
            {THREAT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Threat Date */}
      <DateDropdowns
        label="Date Received"
        required
        value={data.threatDate || null}
        onChange={(date) => updateData("threatDate", date ?? "")}
        maxDate={new Date()}
        minDate={new Date(new Date().getFullYear() - 2, 0, 1)}
      />

      {/* Description */}
      <div>
        <label htmlFor="threatDescription" className="block text-sm font-medium text-gray-700 mb-2">
          Describe the Threat <span className="text-red-500">*</span>
        </label>
        <textarea
          id="threatDescription"
          rows={5}
          placeholder="What did the tenant claim? Include any specific amounts, deadlines, or legal references mentioned..."
          value={data.threatDescription}
          onChange={(e) => updateData("threatDescription", e.target.value)}
          className={`${inputClass} resize-y`}
        />
        <p className="mt-1 text-xs text-gray-500">
          The more detail you provide, the better we can tailor your defense strategy.
        </p>
      </div>
    </div>
  );
}
