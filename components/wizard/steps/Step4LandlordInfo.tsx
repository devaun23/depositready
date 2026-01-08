"use client";

import { useEffect } from "react";
import { useWizard } from "../WizardContext";

export function Step4LandlordInfo() {
  const { data, updateNestedData, setCanProceed } = useWizard();

  useEffect(() => {
    const { name, address, city, zip } = data.landlord;
    setCanProceed(
      name.trim() !== "" &&
        address.trim() !== "" &&
        city.trim() !== "" &&
        zip.trim() !== ""
    );
  }, [data.landlord, setCanProceed]);

  const updateField = (field: string, value: string) => {
    updateNestedData("landlord", field, value);
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        We need your landlord&apos;s information to address the demand letter
        properly.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="landlordName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Landlord / Property Manager Name{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="landlordName"
            placeholder="John Smith or ABC Property Management"
            value={data.landlord.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>

        <div>
          <label
            htmlFor="landlordAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="landlordAddress"
            placeholder="123 Main Street"
            value={data.landlord.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>

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
              onChange={(e) => updateField("city", e.target.value)}
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
              value="FL"
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
              onChange={(e) => updateField("zip", e.target.value)}
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
              onChange={(e) => updateField("email", e.target.value)}
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
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
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
