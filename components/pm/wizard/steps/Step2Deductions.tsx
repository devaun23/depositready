"use client";

import { useEffect, useState } from "react";
import { usePMWizard } from "../PMWizardContext";
import { Input, Select, Button } from "@/components/ui";
import type { PMDeduction, PMDeductionCategory, PMEvidenceType } from "@/types/pm";
import { PM_DEDUCTION_CATEGORY_LABELS, PM_EVIDENCE_TYPE_LABELS } from "@/types/pm";

const CATEGORY_OPTIONS = Object.entries(PM_DEDUCTION_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
);

const EVIDENCE_OPTIONS = Object.entries(PM_EVIDENCE_TYPE_LABELS).map(
  ([value, label]) => ({ value, label })
);

export function Step2Deductions() {
  const { data, addDeduction, removeDeduction, setCanProceed } = usePMWizard();

  const [newDeduction, setNewDeduction] = useState({
    category: "cleaning" as PMDeductionCategory,
    description: "",
    amount: 0,
    evidenceType: [] as PMEvidenceType[],
    hasDocumentation: false,
  });

  // Deductions are optional — allow proceeding with zero
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
        evidenceType: [],
        hasDocumentation: false,
      });
    }
  };

  const toggleEvidenceType = (type: PMEvidenceType) => {
    setNewDeduction((prev) => ({
      ...prev,
      evidenceType: prev.evidenceType.includes(type)
        ? prev.evidenceType.filter((t) => t !== type)
        : [...prev.evidenceType, type],
    }));
  };

  const totalDeductions = (data.deductions || []).reduce(
    (sum, d) => sum + d.amount,
    0
  );
  const depositAmount = data.depositAmount || 0;
  const amountToReturn = Math.max(0, depositAmount - totalDeductions);

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Add each deduction you are claiming against the security deposit. If you
        have no deductions, skip this step to generate a full return notice.
      </p>

      {/* No deductions guidance */}
      {(data.deductions || []).length === 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-medium">No deductions?</span> If you have no
            deductions, your packet will document a full deposit return. Under FL
            §83.49, you must return the full deposit within 15 days of move-out.
          </p>
        </div>
      )}

      {/* Existing Deductions */}
      {(data.deductions || []).length > 0 && (
        <div className="space-y-2">
          {(data.deductions || []).map((deduction) => (
            <div
              key={deduction.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <span className="font-medium">{deduction.description}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({PM_DEDUCTION_CATEGORY_LABELS[deduction.category]})
                </span>
                {deduction.hasDocumentation && (
                  <span className="text-xs text-green-600 ml-2">Has docs</span>
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
            <span className="font-medium">${totalDeductions.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Amount to Return to Tenant:</span>
            <span>${amountToReturn.toFixed(2)}</span>
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
              options={CATEGORY_OPTIONS}
              value={newDeduction.category}
              onChange={(e) =>
                setNewDeduction({
                  ...newDeduction,
                  category: e.target.value as PMDeductionCategory,
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
              setNewDeduction({ ...newDeduction, description: e.target.value })
            }
          />
        </div>

        {/* Evidence types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supporting Evidence (select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {EVIDENCE_OPTIONS.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newDeduction.evidenceType.includes(value as PMEvidenceType)}
                  onChange={() => toggleEvidenceType(value as PMEvidenceType)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
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
            I have this documentation ready to provide if requested
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
  );
}
