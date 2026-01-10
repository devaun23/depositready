"use client";

import { useEffect, memo } from "react";
import { useWizard } from "../WizardContext";
import type { StateCode } from "@/lib/state-rules/types";

const STATES: { code: StateCode; name: string }[] = [
  { code: "FL", name: "Florida" },
  { code: "CA", name: "California" },
  { code: "TX", name: "Texas" },
  { code: "NY", name: "New York" },
  { code: "GA", name: "Georgia" },
  { code: "IL", name: "Illinois" },
];

export const Step1Situation = memo(function Step1Situation() {
  const { data, updateData, setCanProceed } = useWizard();

  useEffect(() => {
    setCanProceed(data.situation !== null && data.stateCode !== null);
  }, [data.situation, data.stateCode, setCanProceed]);

  const options = [
    {
      value: "moved_out" as const,
      title: "I have moved out",
      description:
        "You no longer live at the rental property and are waiting for your deposit back.",
    },
    {
      value: "still_living" as const,
      title: "I am still living there",
      description:
        "You are currently a tenant but have concerns about your deposit.",
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Tell us about your current living situation so we can tailor your
        dispute packet.
      </p>

      {/* State Selection */}
      <div>
        <label
          htmlFor="stateCode"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Which state is the property in? <span className="text-red-500">*</span>
        </label>
        <select
          id="stateCode"
          value={data.stateCode || ""}
          onChange={(e) => {
            const value = e.target.value as StateCode | "";
            updateData("stateCode", value || null);
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-black focus:border-black transition-colors"
        >
          <option value="">Select a state...</option>
          {STATES.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          We currently support these states. More coming soon.
        </p>
      </div>

      {/* Situation Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What is your current situation? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => updateData("situation", option.value)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                data.situation === option.value
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center ${
                    data.situation === option.value
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  {data.situation === option.value && (
                    <div className="w-2.5 h-2.5 bg-black rounded-full" />
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
      </div>

      {data.situation === "still_living" && (
        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> This tool is designed for tenants who have
            already moved out. If you are still living at the property, you may
            want to wait until after you move out to file a dispute. However,
            you can still use this tool to understand your rights and prepare.
          </p>
        </div>
      )}
    </div>
  );
});
