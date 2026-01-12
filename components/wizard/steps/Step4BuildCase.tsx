"use client";

import { useEffect, useState, useMemo, memo, useCallback } from "react";
import { useWizard } from "../WizardContext";
import { DateDropdowns } from "@/components/ui/DateDropdowns";
import { Deduction } from "@/types/dispute";

const DEDUCTION_CATEGORIES = [
  { value: "cleaning", label: "Cleaning" },
  { value: "damage", label: "Property Damage" },
  { value: "unpaid_rent", label: "Unpaid Rent" },
  { value: "utilities", label: "Utilities" },
  { value: "other", label: "Other" },
] as const;

const EVIDENCE_ITEMS = [
  {
    key: "hasPhotos",
    label: "Move-in/move-out photos",
    description: "Photos documenting the condition of the property",
  },
  {
    key: "hasVideos",
    label: "Video walkthrough",
    description: "Video documentation of property condition",
  },
  {
    key: "hasReceipts",
    label: "Receipts for repairs/cleaning",
    description: "Any receipts for work you did before moving out",
  },
  {
    key: "hasLeaseAgreement",
    label: "Lease agreement",
    description: "Your original lease contract",
  },
  {
    key: "hasMoveInChecklist",
    label: "Move-in checklist",
    description: "Condition report from when you moved in",
  },
  {
    key: "hasMoveOutChecklist",
    label: "Move-out checklist",
    description: "Condition report from when you moved out",
  },
  {
    key: "hasCorrespondence",
    label: "Communication with landlord",
    description: "Emails, texts, or letters about the deposit",
  },
] as const;

const CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "letter", label: "Letter" },
  { value: "in_person", label: "In person" },
] as const;

export const Step4BuildCase = memo(function Step4BuildCase() {
  const { data, addDeduction, removeDeduction, updateNestedData, setCanProceed } =
    useWizard();
  const [isAdding, setIsAdding] = useState(false);
  const [newDeduction, setNewDeduction] = useState<Partial<Deduction>>({
    description: "",
    amount: 0,
    dispute: "",
    category: null,
  });

  // This step is optional for no_refund, otherwise need at least one deduction
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const canSkip = data.issueType === "no_refund";
      const hasDeductions = data.deductions.length > 0;
      setCanProceed(canSkip || hasDeductions);
    }, 150);
    return () => clearTimeout(timeoutId);
  }, [data.deductions, data.issueType, setCanProceed]);

  const handleAddDeduction = useCallback(() => {
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
  }, [newDeduction, addDeduction]);

  const updateEvidence = useCallback((field: string, value: boolean | string) => {
    updateNestedData("evidence", field, value);
  }, [updateNestedData]);

  const updateContact = useCallback((field: string, value: boolean | string | null) => {
    updateNestedData("priorCommunication", field, value);
  }, [updateNestedData]);

  const totalDeductions = useMemo(
    () => data.deductions.reduce((sum, d) => sum + d.amount, 0),
    [data.deductions]
  );

  const selectedEvidenceCount = useMemo(
    () => EVIDENCE_ITEMS.filter(
      (item) => data.evidence[item.key as keyof typeof data.evidence] === true
    ).length,
    [data.evidence]
  );

  // Special case: no_refund means no itemized deductions to list
  const showDeductionsSection = data.issueType !== "no_refund";

  return (
    <div className="space-y-8">
      <p className="text-gray-600">
        Build your case by listing disputed charges and documenting your evidence.
      </p>

      {/* SECTION 1: Deductions */}
      {showDeductionsSection ? (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
            Disputed Deductions
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            List each deduction your landlord claimed and explain why you dispute it.
          </p>

          {/* Existing Deductions */}
          {data.deductions.length > 0 && (
            <div className="space-y-3 mb-4">
              {data.deductions.map((deduction) => (
                <div
                  key={deduction.id}
                  className="p-4 border border-gray-200 rounded-lg bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
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
                      className="text-gray-400 hover:text-red-600 ml-4 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Remove deduction"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-2 text-sm">
                <span className="text-gray-600">Total disputed:</span>
                <span className="font-medium text-red-600">${totalDeductions.toFixed(2)}</span>
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
                  placeholder="e.g., Carpet cleaning, Wall damage"
                  value={newDeduction.description}
                  onChange={(e) => setNewDeduction({ ...newDeduction, description: e.target.value })}
                  className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={newDeduction.amount || ""}
                      onChange={(e) => setNewDeduction({ ...newDeduction, amount: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-8 pr-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newDeduction.category || ""}
                    onChange={(e) => setNewDeduction({ ...newDeduction, category: e.target.value as Deduction["category"] })}
                    className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  >
                    <option value="">Select...</option>
                    {DEDUCTION_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
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
                  placeholder="e.g., The carpet was stained when I moved in (see move-in photos)"
                  value={newDeduction.dispute}
                  onChange={(e) => setNewDeduction({ ...newDeduction, dispute: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddDeduction}
                  disabled={!newDeduction.description || !newDeduction.amount}
                  className="px-4 py-3 min-h-[48px] bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-600"
                >
                  Add Deduction
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-3 min-h-[48px] text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full py-3 min-h-[48px] border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-black transition-colors"
            >
              + Add a Deduction
            </button>
          )}
        </div>
      ) : (
        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">
            Since you did not receive a written breakdown of charges, your demand letter will focus on the failure to return your deposit within the legal deadline.
          </p>
        </div>
      )}

      {/* SECTION 2: Evidence */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Your Evidence
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Check all evidence you have. This helps us tailor your packet.
        </p>
        <div className="space-y-2">
          {EVIDENCE_ITEMS.map((item) => (
            <label
              key={item.key}
              className={`flex items-start gap-3 p-3 min-h-[52px] rounded-lg border-2 cursor-pointer transition-all ${
                data.evidence[item.key as keyof typeof data.evidence]
                  ? "border-black bg-gray-50 ring-1 ring-black"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                type="checkbox"
                checked={data.evidence[item.key as keyof typeof data.evidence] as boolean}
                onChange={(e) => updateEvidence(item.key, e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-black focus:ring-black accent-black"
              />
              <div>
                <div className="font-medium text-gray-900 text-sm">{item.label}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </label>
          ))}
        </div>

        {selectedEvidenceCount === 0 && (
          <p className="text-sm text-gray-500 mt-3">
            Don&apos;t worry if you don&apos;t have much evidence. Your packet includes guidance on what to gather.
          </p>
        )}
      </div>

      {/* SECTION 3: Prior Contact */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Prior Contact
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Have you already tried to resolve this with your landlord?
        </p>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => updateContact("hasContacted", true)}
            className={`flex-1 py-3 px-4 min-h-[48px] rounded-lg border-2 font-medium transition-all ${
              data.priorCommunication.hasContacted === true
                ? "border-black bg-gray-50 text-black ring-1 ring-black"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => {
              updateContact("hasContacted", false);
              updateContact("contactMethod", null);
              updateContact("contactDate", null);
              updateContact("response", "");
            }}
            className={`flex-1 py-3 px-4 min-h-[48px] rounded-lg border-2 font-medium transition-all ${
              data.priorCommunication.hasContacted === false
                ? "border-black bg-gray-50 text-black ring-1 ring-black"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            No
          </button>
        </div>

        {data.priorCommunication.hasContacted && (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How did you contact them?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CONTACT_METHODS.map((method) => (
                  <button
                    key={method.value}
                    onClick={() => updateContact("contactMethod", method.value)}
                    className={`py-3 px-4 min-h-[48px] rounded-lg border-2 text-sm font-medium transition-all ${
                      data.priorCommunication.contactMethod === method.value
                        ? "border-black bg-gray-50 text-black ring-1 ring-black"
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            <DateDropdowns
              label="When did you contact them? (approximate)"
              value={data.priorCommunication.contactDate}
              onChange={(date) => updateContact("contactDate", date)}
              maxDate={new Date()}
              id="contactDate"
            />

            <div>
              <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-1">
                What was their response?
              </label>
              <textarea
                id="response"
                rows={2}
                placeholder="Describe their response, or note if they didn't respond..."
                value={data.priorCommunication.response}
                onChange={(e) => updateContact("response", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
          </div>
        )}

        {data.priorCommunication.hasContacted === false && (
          <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700">
              <strong>That&apos;s okay.</strong> A formal demand letter is often the first step and creates a paper trail for any future legal action.
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
