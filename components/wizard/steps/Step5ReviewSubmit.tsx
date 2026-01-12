"use client";

import { useEffect, useMemo, useCallback, memo } from "react";
import { useWizard } from "../WizardContext";
import { AddressAutocomplete } from "@/components/ui/AddressAutocomplete";
import { getStateRulesByCode } from "@/lib/state-rules";
import { analyzeDeadlines } from "@/lib/state-rules/deadlines";
import { ParsedAddress } from "@/types/google-places";

const EVIDENCE_ITEMS = [
  { key: "hasPhotos", label: "Photos" },
  { key: "hasVideos", label: "Videos" },
  { key: "hasReceipts", label: "Receipts" },
  { key: "hasLeaseAgreement", label: "Lease" },
  { key: "hasMoveInChecklist", label: "Move-in checklist" },
  { key: "hasMoveOutChecklist", label: "Move-out checklist" },
  { key: "hasCorrespondence", label: "Correspondence" },
] as const;

export const Step5ReviewSubmit = memo(function Step5ReviewSubmit() {
  const { data, updateNestedData, updateNestedBatch, goToStep, setCanProceed, markTouched, touched } = useWizard();

  // Validation - require name and email at minimum
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const { name, email } = data.tenant;
      setCanProceed(name.trim() !== "" && email.trim() !== "");
    }, 150);
    return () => clearTimeout(timeoutId);
  }, [data.tenant, setCanProceed]);

  const updateField = useCallback((field: string, value: string) => {
    updateNestedData("tenant", field, value);
  }, [updateNestedData]);

  const handleTenantAddressSelect = useCallback((address: ParsedAddress) => {
    updateNestedBatch("tenant", {
      currentAddress: address.streetAddress,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
  }, [updateNestedBatch]);

  const stateRules = data.stateCode ? getStateRulesByCode(data.stateCode) : null;
  const deadlineAnalysis = data.moveOutDate && stateRules
    ? analyzeDeadlines(new Date(data.moveOutDate), stateRules)
    : null;

  const totalDeductions = useMemo(
    () => data.deductions.reduce((sum, d) => sum + d.amount, 0),
    [data.deductions]
  );

  const amountOwed = (data.depositAmount || 0) - (data.amountReceived || 0);

  const issueTypeLabels = {
    no_refund: "No refund received",
    unfair_deductions: "Unfair deductions",
    partial_refund: "Partial refund",
  };

  const selectedEvidence = useMemo(
    () => EVIDENCE_ITEMS.filter(
      (item) => data.evidence[item.key as keyof typeof data.evidence] === true
    ),
    [data.evidence]
  );

  // Show errors only if field was touched and is empty
  const showNameError = touched["tenant.name"] && !data.tenant.name.trim();
  const showEmailError = touched["tenant.email"] && !data.tenant.email.trim();

  return (
    <div className="space-y-8">
      {/* SECTION 1: Your Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Your Information
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          This is where your landlord will send their response.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700 mb-1">
              Your Full Legal Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="tenantName"
              placeholder="Jane Doe"
              value={data.tenant.name}
              onChange={(e) => updateField("name", e.target.value)}
              onBlur={() => markTouched("tenant.name")}
              className={`w-full px-4 py-3 min-h-[48px] border rounded-lg focus:ring-2 focus:ring-black focus:border-black ${
                showNameError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showNameError && (
              <p className="text-sm text-red-600 mt-1">Please enter your name</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Use the name as it appears on your lease</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="tenantEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="tenantEmail"
                inputMode="email"
                placeholder="you@email.com"
                value={data.tenant.email}
                onChange={(e) => updateField("email", e.target.value)}
                onBlur={() => markTouched("tenant.email")}
                className={`w-full px-4 py-3 min-h-[48px] border rounded-lg focus:ring-2 focus:ring-black focus:border-black ${
                  showEmailError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {showEmailError && (
                <p className="text-sm text-red-600 mt-1">Please enter your email</p>
              )}
            </div>
            <div>
              <label htmlFor="tenantPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone (optional)
              </label>
              <input
                type="tel"
                id="tenantPhone"
                inputMode="tel"
                placeholder="(555) 123-4567"
                value={data.tenant.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
          </div>

          <AddressAutocomplete
            id="tenantAddress"
            label="Current Street Address (optional)"
            placeholder="789 New Street, Apt 3"
            value={data.tenant.currentAddress}
            onChange={(value) => updateField("currentAddress", value)}
            onAddressSelect={handleTenantAddressSelect}
          />

          {data.tenant.currentAddress && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="tenantCity" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="tenantCity"
                  placeholder="Tampa"
                  value={data.tenant.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="tenantState" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="tenantState"
                  placeholder="FL"
                  maxLength={2}
                  value={data.tenant.state}
                  onChange={(e) => updateField("state", e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="tenantZip" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP
                </label>
                <input
                  type="text"
                  id="tenantZip"
                  placeholder="33602"
                  maxLength={10}
                  inputMode="numeric"
                  value={data.tenant.zip}
                  onChange={(e) => updateField("zip", e.target.value)}
                  className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Review Summary */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Review Your Information
        </h3>

        {/* Situation & Timeline */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium text-gray-900">Situation</h4>
            <button
              onClick={() => goToStep(1)}
              className="text-sm text-gray-600 hover:text-black underline"
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
              <span className="text-gray-500">Move-out:</span>
              <span className="ml-2 font-medium">
                {data.moveOutDate ? new Date(data.moveOutDate).toLocaleDateString() : "Not set"}
              </span>
            </div>
            {deadlineAnalysis && (
              <div className="col-span-2">
                <span className="text-gray-500">Deadline status:</span>
                <span className={`ml-2 font-medium ${deadlineAnalysis.landlordInViolation ? "text-green-600" : "text-gray-900"}`}>
                  {deadlineAnalysis.landlordInViolation ? "Landlord in violation" : "Within deadline"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Deposit Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium text-gray-900">Deposit</h4>
            <button
              onClick={() => goToStep(2)}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Amount:</span>
              <span className="ml-2 font-medium">${data.depositAmount?.toFixed(2) || "0.00"}</span>
            </div>
            <div>
              <span className="text-gray-500">Issue:</span>
              <span className="ml-2 font-medium">
                {data.issueType ? issueTypeLabels[data.issueType] : "Not specified"}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <span className="text-gray-500">Amount owed:</span>
            <span className="ml-2 font-medium text-green-600">${amountOwed.toFixed(2)}</span>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium text-gray-900">Addresses</h4>
            <button
              onClick={() => goToStep(3)}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              Edit
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-500">Landlord:</span>
              <span className="ml-2 font-medium">{data.landlord.name}</span>
            </div>
            <div>
              <span className="text-gray-500">Property:</span>
              <span className="ml-2 font-medium">
                {data.property.address}{data.property.unit && `, ${data.property.unit}`}
              </span>
            </div>
          </div>
        </div>

        {/* Case Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium text-gray-900">Your Case</h4>
            <button
              onClick={() => goToStep(4)}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              Edit
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-500">Disputed deductions:</span>
              <span className="ml-2 font-medium">
                {data.deductions.length > 0
                  ? `${data.deductions.length} items ($${totalDeductions.toFixed(2)})`
                  : data.issueType === "no_refund" ? "N/A (no breakdown received)" : "None added"}
              </span>
            </div>
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
      </div>

      {/* Ready to Generate */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">Ready to Generate Your Packet</h4>
        <p className="text-sm text-green-800">
          Click &quot;Generate Packet&quot; to see a preview of your complete dispute packet including your customized demand letter, legal timeline, and evidence checklist.
        </p>
      </div>
    </div>
  );
});
