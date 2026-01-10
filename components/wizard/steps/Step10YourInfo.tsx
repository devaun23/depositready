"use client";

import { useEffect, useCallback, memo } from "react";
import { useWizard } from "../WizardContext";
import { AddressAutocomplete } from "@/components/ui/AddressAutocomplete";
import { ParsedAddress } from "@/types/google-places";

export const Step10YourInfo = memo(function Step10YourInfo() {
  const { data, updateNestedData, updateNestedBatch, setCanProceed } = useWizard();

  // Debounced validation to reduce re-renders during typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const { name, currentAddress, city, state, zip, phone } = data.tenant;
      setCanProceed(
        name.trim() !== "" &&
          currentAddress.trim() !== "" &&
          city.trim() !== "" &&
          state.trim() !== "" &&
          zip.trim() !== "" &&
          phone.trim() !== ""
      );
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [data.tenant, setCanProceed]);

  const updateField = (field: string, value: string) => {
    updateNestedData("tenant", field, value);
  };

  // Handler for tenant address autocomplete - uses batch update for speed
  const handleTenantAddressSelect = useCallback(
    (address: ParsedAddress) => {
      updateNestedBatch("tenant", {
        currentAddress: address.streetAddress,
        city: address.city,
        state: address.state,
        zip: address.zip,
      });
    },
    [updateNestedBatch]
  );

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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          />
          <p className="text-xs text-gray-500 mt-1">
            Use the name as it appears on your lease
          </p>
        </div>

        <AddressAutocomplete
          id="tenantAddress"
          label="Current Street Address"
          placeholder="789 New Street, Apt 3"
          value={data.tenant.currentAddress}
          required
          onChange={(value) => updateField("currentAddress", value)}
          onAddressSelect={handleTenantAddressSelect}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
          <div className="sm:col-span-3">
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
              className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <div className="sm:col-span-1">
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
              className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <div className="sm:col-span-2">
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
              inputMode="numeric"
              value={data.tenant.zip}
              onChange={(e) => updateField("zip", e.target.value)}
              className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
              inputMode="email"
              placeholder="you@email.com"
              value={data.tenant.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label
              htmlFor="tenantPhone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="tenantPhone"
              inputMode="tel"
              placeholder="(555) 123-4567"
              value={data.tenant.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Almost done!</strong> After this step, you will see a preview
          of your complete dispute packet before purchasing.
        </p>
      </div>
    </div>
  );
});
