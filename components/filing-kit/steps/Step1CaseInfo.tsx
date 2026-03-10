"use client";

import { useMemo } from "react";
import { useFilingKit } from "../FilingKitIntakeContext";
import { STATE_OPTIONS, getStateRulesByCode } from "@/lib/state-rules";
import { DateDropdowns } from "@/components/ui/DateDropdowns";
import type { StateCode } from "@/lib/state-rules";

export function Step1CaseInfo() {
  const { data, updateData } = useFilingKit();
  const today = useMemo(() => new Date(), []);

  const stateRules = useMemo(
    () => (data.stateCode ? getStateRulesByCode(data.stateCode) : null),
    [data.stateCode]
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Case Information</h2>
        <p className="text-sm text-gray-600 mt-1">
          Basic details about your security deposit dispute.
        </p>
      </div>

      {/* State */}
      <div>
        <label htmlFor="fk-state" className="block text-sm font-medium text-gray-700 mb-1">
          State
        </label>
        <select
          id="fk-state"
          value={data.stateCode || ""}
          onChange={(e) => updateData("stateCode", (e.target.value || null) as StateCode | null)}
          className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg bg-white text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)] appearance-none"
        >
          <option value="">Select state</option>
          {STATE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {stateRules && (
          <p className="text-xs text-gray-500 mt-1">
            Small claims limit: ${stateRules.maxSmallClaims.toLocaleString()} &middot;
            Filing fee: ${stateRules.filingFee.min}-${stateRules.filingFee.max}
          </p>
        )}
      </div>

      {/* Deposit */}
      <div>
        <label htmlFor="fk-deposit" className="block text-sm font-medium text-gray-700 mb-1">
          Security deposit amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            id="fk-deposit"
            type="text"
            inputMode="decimal"
            placeholder="1,400"
            value={data.depositAmount?.toString() || ""}
            onChange={(e) => {
              const n = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
              updateData("depositAmount", isNaN(n) ? null : n);
            }}
            className="w-full pl-7 pr-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          />
        </div>
      </div>

      {/* Move-out date */}
      <DateDropdowns
        value={data.moveOutDate || null}
        onChange={(val) => updateData("moveOutDate", val || "")}
        label="Move-out date"
        maxDate={today}
      />

      {/* Deposit return status */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Has your landlord returned any of your deposit?
        </p>
        <div className="grid grid-cols-3 gap-3">
          {(["nothing", "partial", "full"] as const).map((status) => (
            <button
              key={status}
              onClick={() => updateData("depositReturnStatus", status)}
              className={`px-3 py-2.5 min-h-[44px] rounded-lg border text-sm font-medium transition-colors ${
                data.depositReturnStatus === status
                  ? "bg-[var(--accent-orange)] text-white border-[var(--accent-orange)]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {status === "nothing" ? "Nothing" : status === "partial" ? "Partial" : "Full"}
            </button>
          ))}
        </div>
      </div>

      {/* Amount returned (if partial) */}
      {data.depositReturnStatus === "partial" && (
        <div>
          <label htmlFor="fk-returned" className="block text-sm font-medium text-gray-700 mb-1">
            Amount returned
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              id="fk-returned"
              type="text"
              inputMode="decimal"
              value={data.amountReturned?.toString() || ""}
              onChange={(e) => {
                const n = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
                updateData("amountReturned", isNaN(n) ? null : n);
              }}
              className="w-full pl-7 pr-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
