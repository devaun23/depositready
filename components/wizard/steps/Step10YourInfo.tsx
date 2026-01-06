"use client";

import { useEffect } from "react";
import { useWizard } from "../WizardContext";

export function Step10YourInfo() {
  const { data, updateNestedData, setCanProceed } = useWizard();

  useEffect(() => {
    const { name, currentAddress, city, state, zip } = data.tenant;
    setCanProceed(
      name.trim() !== "" &&
        currentAddress.trim() !== "" &&
        city.trim() !== "" &&
        state.trim() !== "" &&
        zip.trim() !== ""
    );
  }, [data.tenant, setCanProceed]);

  const updateField = (field: string, value: string) => {
    updateNestedData("tenant", field, value);
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Finally, we need your information to complete the demand letter. This is
        where your landlord will send their response.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="tenantName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Full Legal Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="tenantName"
            placeholder="Jane Doe"
            value={data.tenant.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Use the name as it appears on your lease
          </p>
        </div>

        <div>
          <label
            htmlFor="tenantAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="tenantAddress"
            placeholder="789 New Street, Apt 3"
            value={data.tenant.currentAddress}
            onChange={(e) => updateField("currentAddress", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-3">
            <label
              htmlFor="tenantCity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="tenantCity"
              placeholder="Tampa"
              value={data.tenant.city}
              onChange={(e) => updateField("city", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="tenantState"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="tenantState"
              placeholder="FL"
              maxLength={2}
              value={data.tenant.state}
              onChange={(e) =>
                updateField("state", e.target.value.toUpperCase())
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="tenantZip"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ZIP <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="tenantZip"
              placeholder="33602"
              maxLength={10}
              value={data.tenant.zip}
              onChange={(e) => updateField("zip", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="tenantEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email (optional)
            </label>
            <input
              type="email"
              id="tenantEmail"
              placeholder="you@email.com"
              value={data.tenant.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="tenantPhone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone (optional)
            </label>
            <input
              type="tel"
              id="tenantPhone"
              placeholder="(555) 123-4567"
              value={data.tenant.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>Almost done!</strong> After this step, you will see a preview
          of your complete dispute packet before purchasing.
        </p>
      </div>
    </div>
  );
}
