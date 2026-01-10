"use client";

import { useEffect, useState } from "react";
import { useWizard } from "../WizardContext";
import { Deduction } from "@/types/dispute";

export function Step7Deductions() {
  const { data, addDeduction, removeDeduction, setCanProceed } =
    useWizard();
  const [isAdding, setIsAdding] = useState(false);
  const [newDeduction, setNewDeduction] = useState<Partial<Deduction>>({
    description: "",
    amount: 0,
    dispute: "",
    category: null,
  });

  // If no deductions claimed (no_refund), allow skip. Otherwise need at least one deduction.
  useEffect(() => {
    const canSkip = data.issueType === "no_refund";
    const hasDeductions = data.deductions.length > 0;
    setCanProceed(canSkip || hasDeductions);
  }, [data.deductions, data.issueType, setCanProceed]);

  const handleAddDeduction = () => {
    if (newDeduction.description && newDeduction.amount) {
      addDeduction({
        id: crypto.randomUUID(),
        description: newDeduction.description,
        amount: newDeduction.amount,
        dispute: newDeduction.dispute || "",
        category: newDeduction.category || null,
      });
      setNewDeduction({
        description: "",
        amount: 0,
        dispute: "",
        category: null,
      });
      setIsAdding(false);
    }
  };

  const categories = [
    { value: "cleaning", label: "Cleaning" },
    { value: "damage", label: "Property Damage" },
    { value: "unpaid_rent", label: "Unpaid Rent" },
    { value: "utilities", label: "Utilities" },
    { value: "other", label: "Other" },
  ];

  const totalDeductions = data.deductions.reduce((sum, d) => sum + d.amount, 0);

  if (data.issueType === "no_refund") {
    return (
      <div className="space-y-6">
        <p className="text-gray-600">
          Since you did not receive a written breakdown of charges, we will focus your
          demand letter on the failure to return your deposit within the legal
          deadline.
        </p>
        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">
            Your landlord was required to either return your full deposit within
            15 days or send a written breakdown of charges within 30 days. Their
            failure to do so may entitle you to your full deposit plus damages.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        List each deduction your landlord claimed and explain why you dispute
        it. This will be used to create your line-by-line rebuttal.
      </p>

      {/* Existing Deductions */}
      {data.deductions.length > 0 && (
        <div className="space-y-3">
          {data.deductions.map((deduction) => (
            <div
              key={deduction.id}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{deduction.description}</span>
                    {deduction.category && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                        {deduction.category}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-red-600 font-medium mt-1">
                    ${deduction.amount.toFixed(2)}
                  </div>
                  {deduction.dispute && (
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Your dispute:</strong> {deduction.dispute}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeDeduction(deduction.id)}
                  className="text-gray-400 hover:text-red-600 ml-4"
                >
                  <svg
                    className="w-5 h-5"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-2 text-sm">
            <span className="text-gray-600">Total claimed deductions:</span>
            <span className="font-medium text-red-600">
              ${totalDeductions.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Add Deduction Form */}
      {isAdding ? (
        <div className="p-4 border-2 border-gray-300 bg-gray-50 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What did they charge for?
            </label>
            <input
              type="text"
              placeholder="e.g., Carpet cleaning, Wall damage, etc."
              value={newDeduction.description}
              onChange={(e) =>
                setNewDeduction({ ...newDeduction, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newDeduction.amount || ""}
                  onChange={(e) =>
                    setNewDeduction({
                      ...newDeduction,
                      amount: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newDeduction.category || ""}
                onChange={(e) =>
                  setNewDeduction({
                    ...newDeduction,
                    category: e.target.value as Deduction["category"],
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              >
                <option value="">Select...</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Why do you dispute this?
            </label>
            <textarea
              rows={2}
              placeholder="e.g., The carpet was already stained when I moved in, as documented in move-in photos."
              value={newDeduction.dispute}
              onChange={(e) =>
                setNewDeduction({ ...newDeduction, dispute: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddDeduction}
              disabled={!newDeduction.description || !newDeduction.amount}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Deduction
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-black transition-colors"
        >
          + Add a Deduction
        </button>
      )}
    </div>
  );
}
