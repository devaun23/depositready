"use client";

import { useEffect, memo } from "react";
import { useWizard } from "../WizardContext";

export const Step9PriorContact = memo(function Step9PriorContact() {
  const { data, updateNestedData, setCanProceed } = useWizard();

  // Always allow proceeding
  useEffect(() => {
    setCanProceed(true);
  }, [setCanProceed]);

  const updateField = (field: string, value: boolean | string | null) => {
    updateNestedData("priorCommunication", field, value);
  };

  const contactMethods = [
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone call" },
    { value: "letter", label: "Written letter" },
    { value: "in_person", label: "In person" },
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Have you already tried to resolve this with your landlord? This helps us
        document your good-faith efforts.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Have you contacted your landlord about the deposit?
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => updateField("hasContacted", true)}
            className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${
              data.priorCommunication.hasContacted === true
                ? "border-black bg-gray-50 text-black"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => {
              updateField("hasContacted", false);
              updateField("contactMethod", null);
              updateField("contactDate", null);
              updateField("response", "");
            }}
            className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${
              data.priorCommunication.hasContacted === false
                ? "border-black bg-gray-50 text-black"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            No
          </button>
        </div>
      </div>

      {data.priorCommunication.hasContacted && (
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How did you contact them?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {contactMethods.map((method) => (
                <button
                  key={method.value}
                  onClick={() => updateField("contactMethod", method.value)}
                  className={`py-2 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                    data.priorCommunication.contactMethod === method.value
                      ? "border-black bg-gray-50 text-black"
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
                updateField("contactDate", e.target.value || null)
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
              onChange={(e) => updateField("response", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
        </div>
      )}

      {data.priorCommunication.hasContacted === false && (
        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">
            <strong>That is okay.</strong> A formal demand letter is often the
            first step. It puts your landlord on notice and creates a paper
            trail for any future legal action.
          </p>
        </div>
      )}
    </div>
  );
});
