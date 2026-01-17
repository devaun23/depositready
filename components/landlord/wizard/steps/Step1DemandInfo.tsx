"use client";

import { useEffect } from "react";
import { useLandlordWizard } from "../LandlordWizardContext";
import { Select, Input } from "@/components/ui";
import { STATE_OPTIONS } from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules/types";

export function Step1DemandInfo() {
  const { data, updateData, setCanProceed } = useLandlordWizard();

  // Validate on data change
  useEffect(() => {
    const isValid = Boolean(
      data.stateCode && data.demandLetterDate && data.depositAmount && data.depositAmount > 0
    );
    setCanProceed(isValid);
  }, [data.stateCode, data.demandLetterDate, data.depositAmount, setCanProceed]);

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Tell us about the demand letter you received from your tenant.
      </p>

      {/* State */}
      <div>
        <Select
          label="Which state is the rental property in?"
          placeholder="Select a state..."
          options={STATE_OPTIONS}
          value={data.stateCode || ""}
          onChange={(e) => {
            const code = e.target.value as StateCode;
            updateData({
              stateCode: code,
              property: { ...data.property!, state: code },
              landlord: { ...data.landlord!, state: code },
            });
          }}
        />
      </div>

      {/* Demand Letter Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          When did you receive the demand letter?
        </label>
        <Input
          type="date"
          value={data.demandLetterDate || ""}
          onChange={(e) => updateData({ demandLetterDate: e.target.value })}
          max={new Date().toISOString().split("T")[0]}
        />
        <p className="text-sm text-gray-500 mt-1">
          This helps us calculate your response deadline.
        </p>
      </div>

      {/* Deposit Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What was the security deposit amount?
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>
          <Input
            type="number"
            className="pl-7"
            placeholder="0.00"
            value={data.depositAmount || ""}
            onChange={(e) =>
              updateData({ depositAmount: parseFloat(e.target.value) || 0 })
            }
            min={0}
            step={0.01}
          />
        </div>
      </div>

      {/* Move Out Date (optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          When did the tenant move out? (optional)
        </label>
        <Input
          type="date"
          value={data.moveOutDate || ""}
          onChange={(e) => updateData({ moveOutDate: e.target.value })}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
    </div>
  );
}
