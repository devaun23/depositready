"use client";

import { useLandlordIntake } from "../LandlordIntakeContext";
import { STATE_OPTIONS } from "@/lib/state-rules";

const PROPERTY_TYPES = [
  { value: "single_family", label: "Single Family Home" },
  { value: "multi_family", label: "Multi-Family Home" },
  { value: "condo", label: "Condo / Townhome" },
  { value: "apartment", label: "Apartment Complex" },
] as const;

export function Step3PropertyInfo() {
  const { data, updateData } = useLandlordIntake();

  const inputClass =
    "w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-amber)] focus:border-[var(--accent-amber)] transition-colors";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Property Information</h2>
        <p className="text-sm text-gray-600 mt-1">
          Details about the rental property.
        </p>
      </div>

      {/* Property Address */}
      <div>
        <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-2">
          Property Address <span className="text-red-500">*</span>
        </label>
        <input
          id="propertyAddress"
          placeholder="123 Main St, Apt 4B"
          value={data.propertyAddress}
          onChange={(e) => updateData("propertyAddress", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* City / State / Zip */}
      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-3">
          <label htmlFor="propertyCity" className="block text-sm font-medium text-gray-700 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <input
            id="propertyCity"
            placeholder="City"
            value={data.propertyCity}
            onChange={(e) => updateData("propertyCity", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="propertyState" className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <div className="relative">
            <select
              id="propertyState"
              value={data.propertyState}
              onChange={(e) => updateData("propertyState", e.target.value)}
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
          <label htmlFor="propertyZip" className="block text-sm font-medium text-gray-700 mb-2">
            Zip <span className="text-red-500">*</span>
          </label>
          <input
            id="propertyZip"
            placeholder="12345"
            inputMode="numeric"
            maxLength={10}
            value={data.propertyZip}
            onChange={(e) => updateData("propertyZip", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </label>
        <div className="relative">
          <select
            id="propertyType"
            value={data.propertyType}
            onChange={(e) =>
              updateData("propertyType", e.target.value as typeof data.propertyType)
            }
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="">Select type</option>
            {PROPERTY_TYPES.map((pt) => (
              <option key={pt.value} value={pt.value}>
                {pt.label}
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

      {/* Number of Units */}
      <div>
        <label htmlFor="numUnits" className="block text-sm font-medium text-gray-700 mb-2">
          Number of Units
        </label>
        <input
          id="numUnits"
          type="number"
          inputMode="numeric"
          min="1"
          placeholder="1"
          value={data.numUnits ?? ""}
          onChange={(e) => {
            const val = e.target.value ? parseInt(e.target.value, 10) : null;
            updateData("numUnits", val);
          }}
          className={inputClass}
        />
      </div>
    </div>
  );
}
