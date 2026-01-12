"use client";

import { useEffect, memo } from "react";
import { useWizard } from "../WizardContext";

// Move constant arrays outside component to prevent recreation on every render
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
  { value: "phone", label: "Phone call" },
  { value: "letter", label: "Written letter" },
  { value: "in_person", label: "In person" },
] as const;

export const Step5EvidenceContact = memo(function Step5EvidenceContact() {
  const { data, updateNestedData, setCanProceed } = useWizard();

  // This step is optional, always allow proceeding
  useEffect(() => {
    setCanProceed(true);
  }, [setCanProceed]);

  const updateEvidence = (field: string, value: boolean | string) => {
    updateNestedData("evidence", field, value);
  };

  const updateContact = (field: string, value: boolean | string | null) => {
    updateNestedData("priorCommunication", field, value);
  };



  const selectedCount = EVIDENCE_ITEMS.filter(
    (item) => data.evidence[item.key as keyof typeof data.evidence] === true
  ).length;

  return (
    <div className="space-y-8">
      <p className="text-gray-600">
        Tell us about your evidence and any prior contact with your landlord.
      </p>

      {/* Evidence Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Evidence You Have
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Check all that apply. This helps us tailor your evidence checklist.
        </p>
        <div className="space-y-3">
          {EVIDENCE_ITEMS.map((item) => {
            const isChecked = data.evidence[item.key as keyof typeof data.evidence] as boolean;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => updateEvidence(item.key, !isChecked)}
                className={`flex items-start gap-3 p-4 min-h-[52px] w-full text-left rounded-lg border-2 cursor-pointer transition-all ${
                  isChecked
                    ? "border-black bg-gray-50 ring-1 ring-black"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  isChecked ? "bg-black border-black" : "border-gray-300"
                }`}>
                  {isChecked && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4">
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
            onChange={(e) => updateEvidence("otherEvidence", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>You selected {selectedCount} types of evidence.</strong>
            {selectedCount === 0 && (
              <span className="block mt-1">
                Don&apos;t worry if you don&apos;t have much evidence. Your packet will
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

      {/* Prior Contact Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Prior Contact
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Have you already tried to resolve this with your landlord?
        </p>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => updateContact("hasContacted", true)}
            className={`flex-1 py-3 px-4 min-h-[48px] rounded-lg border-2 font-medium transition-all ${
              data.priorCommunication.hasContacted === true
                ? "border-black bg-gray-50 text-black ring-1 ring-black"
                : "border-gray-200 hover:border-gray-300"
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
                : "border-gray-200 hover:border-gray-300"
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
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="contactDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                When did you contact them? (approximate)
              </label>
              <input
                type="date"
                id="contactDate"
                value={data.priorCommunication.contactDate || ""}
                onChange={(e) =>
                  updateContact("contactDate", e.target.value || null)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="response"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                What was their response?
              </label>
              <textarea
                id="response"
                rows={3}
                placeholder="Describe their response, or note if they didn't respond..."
                value={data.priorCommunication.response}
                onChange={(e) => updateContact("response", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
          </div>
        )}

        {data.priorCommunication.hasContacted === false && (
          <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700">
              <strong>That&apos;s okay.</strong> A formal demand letter is often the
              first step. It puts your landlord on notice and creates a paper
              trail for any future legal action.
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
