"use client";

import { Select, Input } from "@/components/ui";
import { STATE_OPTIONS } from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules/types";
import { useCaseReview } from "../CaseReviewIntakeContext";

const stateSelectOptions = STATE_OPTIONS.map((s) => ({
  value: s.value,
  label: s.label,
}));

export function Step1CaseBasics() {
  const { data, updateData } = useCaseReview();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-black">Case Basics</h2>
        <p className="text-sm text-gray-500 mt-1">
          Tell us the basic details of your rental situation.
        </p>
      </div>

      <Select
        label="State"
        required
        options={stateSelectOptions}
        placeholder="Select your state"
        value={data.stateCode || ""}
        onChange={(e) =>
          updateData("stateCode", (e.target.value as StateCode) || null)
        }
      />

      <Input
        label="Security Deposit Amount"
        required
        type="number"
        min={1}
        step="0.01"
        placeholder="e.g. 1500"
        value={data.depositAmount ?? ""}
        onChange={(e) => {
          const val = e.target.value;
          updateData("depositAmount", val ? parseFloat(val) : null);
        }}
        helperText="The total deposit you paid"
      />

      <Input
        label="Move-Out Date"
        type="date"
        value={data.moveOutDate}
        onChange={(e) => updateData("moveOutDate", e.target.value)}
        helperText="When did you (or will you) move out?"
      />

      <Input
        label="Landlord / Property Manager Name"
        placeholder="e.g. John Smith or ABC Property Management"
        value={data.landlordName}
        onChange={(e) => updateData("landlordName", e.target.value)}
      />

      <Input
        label="Property Address"
        placeholder="e.g. 123 Main St, Apt 4B, Miami, FL 33101"
        value={data.propertyAddress}
        onChange={(e) => updateData("propertyAddress", e.target.value)}
      />
    </div>
  );
}
