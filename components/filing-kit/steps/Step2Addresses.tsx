"use client";

import { useFilingKit } from "../FilingKitIntakeContext";

export function Step2Addresses() {
  const { data, updateData } = useFilingKit();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Addresses</h2>
        <p className="text-sm text-gray-600 mt-1">
          The court needs accurate addresses for the landlord and property.
        </p>
      </div>

      {/* Landlord */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-gray-800">Landlord / Management Company</legend>
        <input
          placeholder="Full name or company name"
          value={data.landlordName}
          onChange={(e) => updateData("landlordName", e.target.value)}
          className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
        />
        <input
          placeholder="Street address"
          value={data.landlordAddress}
          onChange={(e) => updateData("landlordAddress", e.target.value)}
          className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
        />
        <div className="grid grid-cols-3 gap-3">
          <input
            placeholder="City"
            value={data.landlordCity}
            onChange={(e) => updateData("landlordCity", e.target.value)}
            className="px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          />
          <input
            placeholder="State"
            value={data.landlordState}
            onChange={(e) => updateData("landlordState", e.target.value)}
            className="px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          />
          <input
            placeholder="ZIP"
            value={data.landlordZip}
            onChange={(e) => updateData("landlordZip", e.target.value)}
            className="px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          />
        </div>
      </fieldset>

      {/* Property */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-gray-800">Rental Property</legend>
        <div className="grid grid-cols-4 gap-3">
          <input
            placeholder="Street address"
            value={data.propertyAddress}
            onChange={(e) => updateData("propertyAddress", e.target.value)}
            className="col-span-3 px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          />
          <input
            placeholder="Unit #"
            value={data.propertyUnit}
            onChange={(e) => updateData("propertyUnit", e.target.value)}
            className="px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <input
            placeholder="City"
            value={data.propertyCity}
            onChange={(e) => updateData("propertyCity", e.target.value)}
            className="px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          />
          <input
            placeholder="State"
            value={data.propertyState}
            onChange={(e) => updateData("propertyState", e.target.value)}
            className="px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          />
          <input
            placeholder="ZIP"
            value={data.propertyZip}
            onChange={(e) => updateData("propertyZip", e.target.value)}
            className="px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          />
        </div>
      </fieldset>
    </div>
  );
}
