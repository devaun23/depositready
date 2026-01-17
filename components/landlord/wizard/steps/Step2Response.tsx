"use client";

import { useEffect, useState } from "react";
import { useLandlordWizard } from "../LandlordWizardContext";
import { Input, Select, Button } from "@/components/ui";
import type { LandlordDeduction } from "@/types/landlord";

const DEDUCTION_CATEGORIES = [
  { value: "cleaning", label: "Cleaning" },
  { value: "repairs", label: "Repairs" },
  { value: "damages", label: "Damages" },
  { value: "unpaid_rent", label: "Unpaid Rent" },
  { value: "other", label: "Other" },
] as const;

export function Step2Response() {
  const { data, updateData, addDeduction, removeDeduction, setCanProceed } =
    useLandlordWizard();

  const [newDeduction, setNewDeduction] = useState({
    category: "cleaning" as LandlordDeduction["category"],
    description: "",
    amount: 0,
    hasDocumentation: false,
  });

  // This step has no required fields
  useEffect(() => {
    setCanProceed(true);
  }, [setCanProceed]);

  const handleAddDeduction = () => {
    if (newDeduction.description && newDeduction.amount > 0) {
      addDeduction(newDeduction);
      setNewDeduction({
        category: "cleaning",
        description: "",
        amount: 0,
        hasDocumentation: false,
      });
    }
  };

  const totalDeductions = (data.deductions || []).reduce(
    (sum, d) => sum + d.amount,
    0
  );
  const amountDisputed = (data.depositAmount || 0) - totalDeductions;

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Tell us about your response to the tenant&apos;s demand.
      </p>

      {/* Itemization Status */}
      <div className="space-y-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={data.itemizedListSent || false}
            onChange={(e) => updateData({ itemizedListSent: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">
            I already sent an itemized list of deductions to the tenant
          </span>
        </label>

        {data.itemizedListSent && (
          <div className="ml-7">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              When did you send the itemization?
            </label>
            <Input
              type="date"
              value={data.itemizedListDate || ""}
              onChange={(e) => updateData({ itemizedListDate: e.target.value })}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        )}

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={data.depositReturned || false}
            onChange={(e) => updateData({ depositReturned: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">
            I returned part or all of the deposit
          </span>
        </label>

        {data.depositReturned && (
          <div className="ml-7">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How much did you return?
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                type="number"
                className="pl-7"
                placeholder="0.00"
                value={data.amountReturned || ""}
                onChange={(e) =>
                  updateData({
                    amountReturned: parseFloat(e.target.value) || 0,
                  })
                }
                min={0}
                step={0.01}
              />
            </div>
          </div>
        )}
      </div>

      {/* Deductions Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-4">
          Deductions Made from Deposit
        </h3>

        {/* Existing Deductions */}
        {(data.deductions || []).length > 0 && (
          <div className="mb-4 space-y-2">
            {(data.deductions || []).map((deduction) => (
              <div
                key={deduction.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <span className="font-medium">{deduction.description}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({deduction.category})
                  </span>
                  {deduction.hasDocumentation && (
                    <span className="text-xs text-green-600 ml-2">
                      Has docs
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">
                    ${deduction.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeDeduction(deduction.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-medium">Total Deductions:</span>
              <span className="font-medium">
                ${totalDeductions.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Amount in Dispute:</span>
              <span>${amountDisputed.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Add New Deduction */}
        <div className="p-4 border border-gray-200 rounded-lg space-y-4">
          <h4 className="font-medium text-gray-700">Add a Deduction</h4>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select
                label="Category"
                options={DEDUCTION_CATEGORIES.map(cat => ({ value: cat.value, label: cat.label }))}
                value={newDeduction.category}
                onChange={(e) =>
                  setNewDeduction({
                    ...newDeduction,
                    category: e.target.value as LandlordDeduction["category"],
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  type="number"
                  className="pl-7"
                  placeholder="0.00"
                  value={newDeduction.amount || ""}
                  onChange={(e) =>
                    setNewDeduction({
                      ...newDeduction,
                      amount: parseFloat(e.target.value) || 0,
                    })
                  }
                  min={0}
                  step={0.01}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Input
              type="text"
              placeholder="e.g., Carpet cleaning due to pet stains"
              value={newDeduction.description}
              onChange={(e) =>
                setNewDeduction({
                  ...newDeduction,
                  description: e.target.value,
                })
              }
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newDeduction.hasDocumentation}
              onChange={(e) =>
                setNewDeduction({
                  ...newDeduction,
                  hasDocumentation: e.target.checked,
                })
              }
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">
              I have documentation (photos, receipts, invoices)
            </span>
          </label>

          <Button
            type="button"
            variant="outline"
            onClick={handleAddDeduction}
            disabled={!newDeduction.description || newDeduction.amount <= 0}
          >
            Add Deduction
          </Button>
        </div>
      </div>
    </div>
  );
}
