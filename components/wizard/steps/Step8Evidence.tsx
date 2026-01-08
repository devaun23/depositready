"use client";

import { useEffect } from "react";
import { useWizard } from "../WizardContext";

export function Step8Evidence() {
  const { data, updateNestedData, setCanProceed } = useWizard();

  // Evidence step is optional, always allow proceeding
  useEffect(() => {
    setCanProceed(true);
  }, [setCanProceed]);

  const updateField = (field: string, value: boolean | string) => {
    updateNestedData("evidence", field, value);
  };

  const evidenceItems = [
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
  ];

  const selectedCount = evidenceItems.filter(
    (item) => data.evidence[item.key as keyof typeof data.evidence] === true
  ).length;

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        What evidence do you have to support your dispute? Check all that apply.
        This helps us tailor your evidence checklist.
      </p>

      <div className="space-y-3">
        {evidenceItems.map((item) => (
          <label
            key={item.key}
            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              data.evidence[item.key as keyof typeof data.evidence]
                ? "border-black bg-gray-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={
                data.evidence[item.key as keyof typeof data.evidence] as boolean
              }
              onChange={(e) => updateField(item.key, e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-gray-300 text-black focus:ring-black accent-black"
            />
            <div>
              <div className="font-medium text-gray-900">{item.label}</div>
              <div className="text-sm text-gray-500">{item.description}</div>
            </div>
          </label>
        ))}
      </div>

      <div>
        <label
          htmlFor="otherEvidence"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Other evidence (optional)
        </label>
        <textarea
          id="otherEvidence"
          rows={2}
          placeholder="Describe any other evidence you have..."
          value={data.evidence.otherEvidence}
          onChange={(e) => updateField("otherEvidence", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
        />
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>You selected {selectedCount} types of evidence.</strong>
          {selectedCount === 0 && (
            <span className="block mt-1">
              Do not worry if you do not have much evidence. Your packet will
              include guidance on what to gather and how to document your case.
            </span>
          )}
          {selectedCount > 0 && (
            <span className="block mt-1">
              Great! This evidence will strengthen your dispute. Make sure to
              organize copies of everything before sending your demand letter.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
