"use client";

import { useEffect, useCallback } from "react";
import { useWizard } from "../WizardContext";
import { AddressAutocomplete } from "@/components/ui/AddressAutocomplete";
import { ParsedAddress } from "@/types/google-places";

export function Step3Addresses() {
  const { data, updateNestedData, updateNestedBatch, setCanProceed } = useWizard();

  useEffect(() => {
    const landlordValid =
      data.landlord.name.trim() !== "" &&
      data.landlord.address.trim() !== "" &&
      data.landlord.city.trim() !== "" &&
      data.landlord.zip.trim() !== "";

    const propertyValid =
      data.property.address.trim() !== "" &&
      data.property.city.trim() !== "" &&
      data.property.zip.trim() !== "";

    setCanProceed(landlordValid && propertyValid);
  }, [data.landlord, data.property, setCanProceed]);

  const updateLandlord = (field: string, value: string) => {
    updateNestedData("landlord", field, value);
  };

  const updateProperty = (field: string, value: string) => {
    updateNestedData("property", field, value);
  };

  // Handler for landlord address autocomplete - uses batch update for speed
  const handleLandlordAddressSelect = useCallback(
    (address: ParsedAddress) => {
      updateNestedBatch("landlord", {
        address: address.streetAddress,
        city: address.city,
        zip: address.zip,
      });
    },
    [updateNestedBatch]
  );

  // Handler for property address autocomplete - uses batch update for speed
  const handlePropertyAddressSelect = useCallback(
    (address: ParsedAddress) => {
      updateNestedBatch("property", {
        address: address.streetAddress,
        city: address.city,
        zip: address.zip,
      });
    },
    [updateNestedBatch]
  );

  return (
    <div className="space-y-8">
      <p className="text-gray-600">
        We need your landlord&apos;s information and the rental property address.
      </p>

      {/* Landlord Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Landlord / Property Manager
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="landlordName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="landlordName"
              placeholder="John Smith or ABC Property Management"
              value={data.landlord.name}
              onChange={(e) => updateLandlord("name", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <AddressAutocomplete
            id="landlordAddress"
            label="Street Address"
            placeholder="123 Main Street"
            value={data.landlord.address}
            required
            onChange={(value) => updateLandlord("address", value)}
            onAddressSelect={handleLandlordAddressSelect}
          />

          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-3">
              <label
                htmlFor="landlordCity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="landlordCity"
                placeholder="Miami"
                value={data.landlord.city}
                onChange={(e) => updateLandlord("city", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="landlordState"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State
              </label>
              <input
                type="text"
                id="landlordState"
                value={data.stateCode || ""}
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="landlordZip"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ZIP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="landlordZip"
                placeholder="33101"
                maxLength={10}
                value={data.landlord.zip}
                onChange={(e) => updateLandlord("zip", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="landlordEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email (optional)
              </label>
              <input
                type="email"
                id="landlordEmail"
                placeholder="landlord@email.com"
                value={data.landlord.email}
                onChange={(e) => updateLandlord("email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label
                htmlFor="landlordPhone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone (optional)
              </label>
              <input
                type="tel"
                id="landlordPhone"
                placeholder="(555) 123-4567"
                value={data.landlord.phone}
                onChange={(e) => updateLandlord("phone", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Property Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Rental Property
        </h3>
        <div className="space-y-4">
          <AddressAutocomplete
            id="propertyAddress"
            label="Street Address"
            placeholder="456 Oak Avenue"
            value={data.property.address}
            required
            onChange={(value) => updateProperty("address", value)}
            onAddressSelect={handlePropertyAddressSelect}
          />

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
              onChange={(e) => updateProperty("unit", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
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
                onChange={(e) => updateProperty("city", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
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
                value={data.stateCode || ""}
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
                onChange={(e) => updateProperty("zip", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
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
                  updateProperty("leaseStartDate", e.target.value || "")
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
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
                  updateProperty("leaseEndDate", e.target.value || "")
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Tip:</strong> Check your lease agreement for the correct
          mailing address. The demand letter should be sent via certified mail
          with return receipt requested.
        </p>
      </div>
    </div>
  );
}
