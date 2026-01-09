"use client";

import { useEffect } from "react";
import { useWizard } from "../WizardContext";
import { getStateRulesByCode, formatLegalDate } from "@/lib/state-rules";
import { analyzeDeadlines } from "@/lib/state-rules/deadlines";

export function Step7Review() {
  const { data, goToStep, setCanProceed } = useWizard();

  useEffect(() => {
    setCanProceed(true);
  }, [setCanProceed]);

  const stateRules = data.stateCode ? getStateRulesByCode(data.stateCode) : null;
  const deadlineAnalysis =
    data.moveOutDate && stateRules
      ? analyzeDeadlines(new Date(data.moveOutDate), stateRules)
      : null;

  const totalDeductions = data.deductions.reduce((sum, d) => sum + d.amount, 0);
  const amountOwed = (data.depositAmount || 0) - (data.amountReceived || 0);

  const issueTypeLabels = {
    no_refund: "No refund received",
    unfair_deductions: "Unfair deductions",
    partial_refund: "Partial refund without explanation",
  };

  const evidenceItems = [
    { key: "hasPhotos", label: "Photos" },
    { key: "hasVideos", label: "Videos" },
    { key: "hasReceipts", label: "Receipts" },
    { key: "hasLeaseAgreement", label: "Lease" },
    { key: "hasMoveInChecklist", label: "Move-in checklist" },
    { key: "hasMoveOutChecklist", label: "Move-out checklist" },
    { key: "hasCorrespondence", label: "Correspondence" },
  ];

  const selectedEvidence = evidenceItems.filter(
    (item) => data.evidence[item.key as keyof typeof data.evidence] === true
  );

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Review your information before generating your dispute packet preview.
      </p>

      {/* Situation & Timeline */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-gray-900">Situation & Timeline</h3>
          <button
            onClick={() => goToStep(1)}
            className="text-sm text-gray-500 hover:text-black"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">State:</span>
            <span className="ml-2 font-medium">{stateRules?.name || data.stateCode}</span>
          </div>
          <div>
            <span className="text-gray-500">Status:</span>
            <span className="ml-2 font-medium">
              {data.situation === "moved_out" ? "Moved out" : "Still living there"}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Move-out:</span>
            <span className="ml-2 font-medium">
              {data.moveOutDate
                ? new Date(data.moveOutDate).toLocaleDateString()
                : "Not set"}
            </span>
          </div>
          {deadlineAnalysis && (
            <div>
              <span className="text-gray-500">Deadline status:</span>
              <span
                className={`ml-2 font-medium ${
                  deadlineAnalysis.landlordInViolation
                    ? "text-green-600"
                    : "text-gray-900"
                }`}
              >
                {deadlineAnalysis.landlordInViolation ? "Landlord in violation" : "Within deadline"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Deposit Details */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-gray-900">Deposit Details</h3>
          <button
            onClick={() => goToStep(2)}
            className="text-sm text-gray-500 hover:text-black"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">Deposit:</span>
            <span className="ml-2 font-medium">
              ${data.depositAmount?.toFixed(2) || "0.00"}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Itemized:</span>
            <span className="ml-2 font-medium">
              {data.wasItemized === true
                ? "Yes"
                : data.wasItemized === false
                ? "No"
                : "Not specified"}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Issue:</span>
            <span className="ml-2 font-medium">
              {data.issueType ? issueTypeLabels[data.issueType] : "Not specified"}
            </span>
          </div>
          {data.issueType === "partial_refund" && (
            <div>
              <span className="text-gray-500">Received:</span>
              <span className="ml-2 font-medium">
                ${data.amountReceived?.toFixed(2) || "0.00"}
              </span>
            </div>
          )}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <span className="text-gray-500">Amount owed:</span>
          <span className="ml-2 font-medium text-green-600">
            ${amountOwed.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Addresses */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-gray-900">Addresses</h3>
          <button
            onClick={() => goToStep(3)}
            className="text-sm text-gray-500 hover:text-black"
          >
            Edit
          </button>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-500">Landlord:</span>
            <span className="ml-2 font-medium">{data.landlord.name}</span>
            <p className="text-gray-600 ml-0 mt-1">
              {data.landlord.address}, {data.landlord.city}, {data.stateCode}{" "}
              {data.landlord.zip}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Property:</span>
            <p className="text-gray-600 mt-1">
              {data.property.address}
              {data.property.unit && `, ${data.property.unit}`},{" "}
              {data.property.city}, {data.stateCode} {data.property.zip}
            </p>
          </div>
        </div>
      </div>

      {/* Deductions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-gray-900">Deductions</h3>
          <button
            onClick={() => goToStep(4)}
            className="text-sm text-gray-500 hover:text-black"
          >
            Edit
          </button>
        </div>
        {data.deductions.length > 0 ? (
          <div className="space-y-2 text-sm">
            {data.deductions.map((d) => (
              <div key={d.id} className="flex justify-between">
                <span className="text-gray-600">{d.description}</span>
                <span className="font-medium text-red-600">
                  ${d.amount.toFixed(2)}
                </span>
              </div>
            ))}
            <div className="pt-2 border-t border-gray-200 flex justify-between">
              <span className="text-gray-500">Total claimed:</span>
              <span className="font-medium text-red-600">
                ${totalDeductions.toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            {data.issueType === "no_refund"
              ? "No written breakdown received"
              : "No deductions added"}
          </p>
        )}
      </div>

      {/* Evidence & Contact */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-gray-900">Evidence & Prior Contact</h3>
          <button
            onClick={() => goToStep(5)}
            className="text-sm text-gray-500 hover:text-black"
          >
            Edit
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500">Evidence:</span>
            <span className="ml-2 font-medium">
              {selectedEvidence.length > 0
                ? selectedEvidence.map((e) => e.label).join(", ")
                : "None selected"}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Prior contact:</span>
            <span className="ml-2 font-medium">
              {data.priorCommunication.hasContacted === true
                ? `Yes (${data.priorCommunication.contactMethod || "method not specified"})`
                : data.priorCommunication.hasContacted === false
                ? "No"
                : "Not specified"}
            </span>
          </div>
        </div>
      </div>

      {/* Your Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-gray-900">Your Information</h3>
          <button
            onClick={() => goToStep(6)}
            className="text-sm text-gray-500 hover:text-black"
          >
            Edit
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500">Name:</span>
            <span className="ml-2 font-medium">{data.tenant.name}</span>
          </div>
          <div>
            <span className="text-gray-500">Current address:</span>
            <p className="text-gray-600 mt-1">
              {data.tenant.currentAddress}, {data.tenant.city},{" "}
              {data.tenant.state} {data.tenant.zip}
            </p>
          </div>
          {(data.tenant.email || data.tenant.phone) && (
            <div>
              <span className="text-gray-500">Contact:</span>
              <span className="ml-2 font-medium">
                {[data.tenant.email, data.tenant.phone].filter(Boolean).join(", ")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-medium text-green-900 mb-2">Ready to Generate</h3>
        <p className="text-sm text-green-800">
          Click &quot;Review Packet&quot; to see a preview of your complete dispute packet
          including your customized demand letter, legal timeline, and evidence
          checklist.
        </p>
      </div>
    </div>
  );
}
