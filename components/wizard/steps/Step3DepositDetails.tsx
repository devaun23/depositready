"use client";

import { useEffect } from "react";
import { useWizard } from "../WizardContext";

export function Step3DepositDetails() {
  const { data, updateData, setCanProceed } = useWizard();

  useEffect(() => {
    setCanProceed(
      data.depositAmount !== null &&
        data.depositAmount > 0 &&
        data.wasItemized !== null
    );
  }, [data.depositAmount, data.wasItemized, setCanProceed]);

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Tell us about your security deposit so we can calculate what you are
        owed.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="depositAmount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            How much was your security deposit?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              id="depositAmount"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={data.depositAmount || ""}
              onChange={(e) =>
                updateData(
                  "depositAmount",
                  e.target.value ? parseFloat(e.target.value) : null
                )
              }
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Did you receive an itemized list of deductions?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => updateData("wasItemized", true)}
              className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${
                data.wasItemized === true
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => updateData("wasItemized", false)}
              className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${
                data.wasItemized === false
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              No
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Florida law requires landlords to provide an itemized list of any
            deductions within 30 days.
          </p>
        </div>
      </div>

      {data.wasItemized === false && (
        <div className="p-4 bg-amber-50 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> If your landlord did not provide an
            itemized list of deductions within 30 days of your move-out, they
            may have forfeited their right to keep any of your deposit.
          </p>
        </div>
      )}
    </div>
  );
}
