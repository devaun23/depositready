"use client";

import { useEffect } from "react";
import { useWizard } from "../WizardContext";

export function Step5PropertyInfo() {
  const { data, updateNestedData, setCanProceed } = useWizard();

  useEffect(() => {
    const { address, city, zip } = data.property;
    setCanProceed(
      address.trim() !== "" && city.trim() !== "" && zip.trim() !== ""
    );
  }, [data.property, setCanProceed]);

  const updateField = (field: string, value: string) => {
    updateNestedData("property", field, value);
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Tell us about the rental property where you paid the security deposit.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="propertyAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Property Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="propertyAddress"
            placeholder="456 Oak Avenue"
            value={data.property.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="propertyUnit"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Unit / Apt Number (if applicable)
          </label>
          <input
            type="text"
            id="propertyUnit"
            placeholder="Apt 2B"
            value={data.property.unit}
            onChange={(e) => updateField("unit", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-3">
            <label
              htmlFor="propertyCity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="propertyCity"
              placeholder="Orlando"
              value={data.property.city}
              onChange={(e) => updateField("city", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="propertyState"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State
            </label>
            <input
              type="text"
              id="propertyState"
              value="FL"
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="propertyZip"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ZIP <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="propertyZip"
              placeholder="32801"
              maxLength={10}
              value={data.property.zip}
              onChange={(e) => updateField("zip", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="leaseStartDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lease Start Date (optional)
            </label>
            <input
              type="date"
              id="leaseStartDate"
              value={data.property.leaseStartDate || ""}
              onChange={(e) =>
                updateField("leaseStartDate", e.target.value || "")
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="leaseEndDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lease End Date (optional)
            </label>
            <input
              type="date"
              id="leaseEndDate"
              value={data.property.leaseEndDate || ""}
              onChange={(e) =>
                updateField("leaseEndDate", e.target.value || "")
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
