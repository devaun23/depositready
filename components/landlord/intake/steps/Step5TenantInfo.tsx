"use client";

import { useLandlordIntake } from "../LandlordIntakeContext";
import { STATE_OPTIONS } from "@/lib/state-rules";

export function Step5TenantInfo() {
  const { data, updateData } = useLandlordIntake();

  const inputClass =
    "w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-amber)] focus:border-[var(--accent-amber)] transition-colors";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Tenant Information</h2>
        <p className="text-sm text-gray-600 mt-1">
          Details about the tenant making the claim.
        </p>
      </div>

      {/* Tenant Name */}
      <div>
        <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700 mb-2">
          Tenant Name <span className="text-red-500">*</span>
        </label>
        <input
          id="tenantName"
          placeholder="John Smith"
          value={data.tenantName}
          onChange={(e) => updateData("tenantName", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Tenant Email */}
      <div>
        <label htmlFor="tenantEmail" className="block text-sm font-medium text-gray-700 mb-2">
          Tenant Email <span className="text-xs text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="tenantEmail"
          type="email"
          placeholder="tenant@example.com"
          value={data.tenantEmail}
          onChange={(e) => updateData("tenantEmail", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="tenantAddress" className="block text-sm font-medium text-gray-700 mb-2">
          Tenant Address
        </label>
        <input
          id="tenantAddress"
          placeholder="Current mailing address"
          value={data.tenantAddress}
          onChange={(e) => updateData("tenantAddress", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* City / State / Zip */}
      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-3">
          <label htmlFor="tenantCity" className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            id="tenantCity"
            placeholder="City"
            value={data.tenantCity}
            onChange={(e) => updateData("tenantCity", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="tenantState" className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <div className="relative">
            <select
              id="tenantState"
              value={data.tenantState}
              onChange={(e) => updateData("tenantState", e.target.value)}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="">--</option>
              {STATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <label htmlFor="tenantZip" className="block text-sm font-medium text-gray-700 mb-2">
            Zip
          </label>
          <input
            id="tenantZip"
            placeholder="12345"
            inputMode="numeric"
            maxLength={10}
            value={data.tenantZip}
            onChange={(e) => updateData("tenantZip", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}
