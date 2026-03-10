"use client";

import { useFilingKit } from "../FilingKitIntakeContext";

export function Step4TenantInfo() {
  const { data, updateData } = useFilingKit();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Your Information</h2>
        <p className="text-sm text-gray-600 mt-1">
          This goes on the court claim form. Use your legal name and current address.
        </p>
      </div>

      <input
        placeholder="Full legal name"
        value={data.tenantName}
        onChange={(e) => updateData("tenantName", e.target.value)}
        className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
      />

      <input
        type="email"
        placeholder="Email"
        value={data.tenantEmail}
        onChange={(e) => updateData("tenantEmail", e.target.value)}
        className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
      />

      <input
        type="tel"
        placeholder="Phone number"
        value={data.tenantPhone}
        onChange={(e) => updateData("tenantPhone", e.target.value)}
        className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
      />

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-gray-800">Current mailing address</legend>
        <input
          placeholder="Street address"
          value={data.tenantAddress}
          onChange={(e) => updateData("tenantAddress", e.target.value)}
          className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
        />
        <div className="grid grid-cols-3 gap-3">
          <input
            placeholder="City"
            value={data.tenantCity}
            onChange={(e) => updateData("tenantCity", e.target.value)}
            className="px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          />
          <input
            placeholder="State"
            value={data.tenantState}
            onChange={(e) => updateData("tenantState", e.target.value)}
            className="px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          />
          <input
            placeholder="ZIP"
            value={data.tenantZip}
            onChange={(e) => updateData("tenantZip", e.target.value)}
            className="px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
          />
        </div>
      </fieldset>
    </div>
  );
}
