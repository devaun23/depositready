"use client";

import { useEffect } from "react";
import { usePMWizard } from "../PMWizardContext";
import { Input } from "@/components/ui";

export function Step1PropertyLease() {
  const { data, updateData, updateNestedData, setCanProceed } = usePMWizard();

  useEffect(() => {
    const isValid = Boolean(
      data.property?.address &&
        data.property?.city &&
        data.property?.zip &&
        data.moveOutDate &&
        data.depositAmount &&
        data.depositAmount > 0
    );
    setCanProceed(isValid);
  }, [data.property, data.moveOutDate, data.depositAmount, setCanProceed]);

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Enter the rental property details and lease information.
      </p>

      {/* Property Address */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Property Address</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
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
                value="FL"
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

      {/* Lease & Deposit */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-4">Lease & Deposit Details</h3>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lease Start Date
              </label>
              <Input
                type="date"
                value={data.leaseStartDate || ""}
                onChange={(e) => updateData({ leaseStartDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lease End Date
              </label>
              <Input
                type="date"
                value={data.leaseEndDate || ""}
                onChange={(e) => updateData({ leaseEndDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Move-Out Date <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={data.moveOutDate || ""}
              onChange={(e) => updateData({ moveOutDate: e.target.value })}
              max={new Date().toISOString().split("T")[0]}
            />
            <p className="text-xs text-gray-500 mt-1">
              This date starts the 30-day clock for sending your certified mail notice.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Security Deposit Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                type="number"
                className="pl-7"
                placeholder="0.00"
                value={data.depositAmount || ""}
                onChange={(e) =>
                  updateData({
                    depositAmount: parseFloat(e.target.value) || 0,
                  })
                }
                min={0}
                step={0.01}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
