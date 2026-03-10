"use client";

import { useLandlordIntake } from "../LandlordIntakeContext";
import { STATE_OPTIONS } from "@/lib/state-rules";

export function Step4LandlordInfo() {
  const { data, updateData } = useLandlordIntake();

  const inputClass =
    "w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-amber)] focus:border-[var(--accent-amber)] transition-colors";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Your Information</h2>
        <p className="text-sm text-gray-600 mt-1">
          Landlord or property management company details.
        </p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="landlordName" className="block text-sm font-medium text-gray-700 mb-2">
          Name / Company <span className="text-red-500">*</span>
        </label>
        <input
          id="landlordName"
          placeholder="Jane Doe or ABC Properties LLC"
          value={data.landlordName}
          onChange={(e) => updateData("landlordName", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="landlordEmail" className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="landlordEmail"
          type="email"
          placeholder="you@example.com"
          value={data.landlordEmail}
          onChange={(e) => updateData("landlordEmail", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="landlordPhone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone
        </label>
        <input
          id="landlordPhone"
          type="tel"
          placeholder="(555) 123-4567"
          value={data.landlordPhone}
          onChange={(e) => updateData("landlordPhone", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="landlordAddress" className="block text-sm font-medium text-gray-700 mb-2">
          Mailing Address
        </label>
        <input
          id="landlordAddress"
          placeholder="456 Oak Ave"
          value={data.landlordAddress}
          onChange={(e) => updateData("landlordAddress", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* City / State / Zip */}
      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-3">
          <label htmlFor="landlordCity" className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            id="landlordCity"
            placeholder="City"
            value={data.landlordCity}
            onChange={(e) => updateData("landlordCity", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="landlordState" className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <div className="relative">
            <select
              id="landlordState"
              value={data.landlordState}
              onChange={(e) => updateData("landlordState", e.target.value)}
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
          <label htmlFor="landlordZip" className="block text-sm font-medium text-gray-700 mb-2">
            Zip
          </label>
          <input
            id="landlordZip"
            placeholder="12345"
            inputMode="numeric"
            maxLength={10}
            value={data.landlordZip}
            onChange={(e) => updateData("landlordZip", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}
