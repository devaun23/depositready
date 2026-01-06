"use client";

import { useEffect } from "react";
import { useWizard } from "../WizardContext";

export function Step1Situation() {
  const { data, updateData, setCanProceed } = useWizard();

  useEffect(() => {
    setCanProceed(data.situation !== null);
  }, [data.situation, setCanProceed]);

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
    <div className="space-y-4">
      <p className="text-gray-600 mb-6">
        Tell us about your current living situation so we can tailor your
        dispute packet.
      </p>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => updateData("situation", option.value)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              data.situation === option.value
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center ${
                  data.situation === option.value
                    ? "border-blue-600"
                    : "border-gray-300"
                }`}
              >
                {data.situation === option.value && (
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
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

      {data.situation === "still_living" && (
        <div className="mt-6 p-4 bg-amber-50 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> This tool is designed for tenants who have
            already moved out. If you are still living at the property, you may
            want to wait until after you move out to file a dispute. However,
            you can still use this tool to understand your rights and prepare.
          </p>
        </div>
      )}
    </div>
  );
}
