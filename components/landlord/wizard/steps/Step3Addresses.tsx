"use client";

import { useEffect } from "react";
import { useLandlordWizard } from "../LandlordWizardContext";
import { Input } from "@/components/ui";

export function Step3Addresses() {
  const { data, updateNestedData, setCanProceed } = useLandlordWizard();

  // Validate on data change
  useEffect(() => {
    const isValid = Boolean(
      data.landlord?.name &&
        data.landlord?.address &&
        data.landlord?.city &&
        data.landlord?.zip &&
        data.tenant?.name &&
        data.property?.address &&
        data.property?.city &&
        data.property?.zip
    );
    setCanProceed(isValid);
  }, [data.landlord, data.tenant, data.property, setCanProceed]);

  return (
    <div className="space-y-8">
      {/* Your Info (Landlord) */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Your Information</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <Input
              type="text"
              placeholder="Full legal name"
              value={data.landlord?.name || ""}
              onChange={(e) =>
                updateNestedData("landlord", "name", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <Input
              type="text"
              placeholder="123 Main St"
              value={data.landlord?.address || ""}
              onChange={(e) =>
                updateNestedData("landlord", "address", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <Input
                type="text"
                placeholder="City"
                value={data.landlord?.city || ""}
                onChange={(e) =>
                  updateNestedData("landlord", "city", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <Input
                type="text"
                value={data.landlord?.state || data.stateCode || ""}
                disabled
                className="bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <Input
                type="text"
                placeholder="12345"
                value={data.landlord?.zip || ""}
                onChange={(e) =>
                  updateNestedData("landlord", "zip", e.target.value)
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (optional)
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={data.landlord?.email || ""}
                onChange={(e) =>
                  updateNestedData("landlord", "email", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone (optional)
              </label>
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                value={data.landlord?.phone || ""}
                onChange={(e) =>
                  updateNestedData("landlord", "phone", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Info */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-4">Tenant Information</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenant&apos;s Name
            </label>
            <Input
              type="text"
              placeholder="Full name from demand letter"
              value={data.tenant?.name || ""}
              onChange={(e) =>
                updateNestedData("tenant", "name", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenant&apos;s Current Address (optional)
            </label>
            <Input
              type="text"
              placeholder="Where to send your response"
              value={data.tenant?.currentAddress || ""}
              onChange={(e) =>
                updateNestedData("tenant", "currentAddress", e.target.value)
              }
            />
          </div>
          {data.tenant?.currentAddress && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <Input
                  type="text"
                  placeholder="City"
                  value={data.tenant?.city || ""}
                  onChange={(e) =>
                    updateNestedData("tenant", "city", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <Input
                  type="text"
                  placeholder="ST"
                  value={data.tenant?.state || ""}
                  onChange={(e) =>
                    updateNestedData("tenant", "state", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP
                </label>
                <Input
                  type="text"
                  placeholder="12345"
                  value={data.tenant?.zip || ""}
                  onChange={(e) =>
                    updateNestedData("tenant", "zip", e.target.value)
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Property Info */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-4">Rental Property</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Address
            </label>
            <Input
              type="text"
              placeholder="123 Rental Ave"
              value={data.property?.address || ""}
              onChange={(e) =>
                updateNestedData("property", "address", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Number (if applicable)
            </label>
            <Input
              type="text"
              placeholder="Apt 2B"
              value={data.property?.unit || ""}
              onChange={(e) =>
                updateNestedData("property", "unit", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <Input
                type="text"
                placeholder="City"
                value={data.property?.city || ""}
                onChange={(e) =>
                  updateNestedData("property", "city", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <Input
                type="text"
                value={data.property?.state || data.stateCode || ""}
                disabled
                className="bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <Input
                type="text"
                placeholder="12345"
                value={data.property?.zip || ""}
                onChange={(e) =>
                  updateNestedData("property", "zip", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
