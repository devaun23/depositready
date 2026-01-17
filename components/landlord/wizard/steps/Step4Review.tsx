"use client";

import { useEffect } from "react";
import { useLandlordWizard } from "../LandlordWizardContext";
import { getStateRulesByCode } from "@/lib/state-rules";

export function Step4Review() {
  const { data, setCanProceed, goToStep } = useLandlordWizard();

  const stateRules = data.stateCode ? getStateRulesByCode(data.stateCode) : null;

  // Always allow proceeding on review step
  useEffect(() => {
    setCanProceed(true);
  }, [setCanProceed]);

  const totalDeductions = (data.deductions || []).reduce(
    (sum, d) => sum + d.amount,
    0
  );

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Review your information before generating your response kit.
      </p>

      {/* Demand Info */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">Demand Letter Info</h3>
          <button
            onClick={() => goToStep(1)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Edit
          </button>
        </div>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">State</dt>
            <dd className="font-medium">{stateRules?.name || data.stateCode}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Demand Letter Received</dt>
            <dd className="font-medium">{formatDate(data.demandLetterDate || "")}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Security Deposit</dt>
            <dd className="font-medium">{formatCurrency(data.depositAmount || 0)}</dd>
          </div>
          {data.moveOutDate && (
            <div>
              <dt className="text-gray-500">Tenant Move-Out</dt>
              <dd className="font-medium">{formatDate(data.moveOutDate)}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Response Info */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">Your Response</h3>
          <button
            onClick={() => goToStep(2)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Edit
          </button>
        </div>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Itemization Sent</dt>
            <dd className="font-medium">
              {data.itemizedListSent
                ? `Yes (${formatDate(data.itemizedListDate || "")})`
                : "No"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Deposit Returned</dt>
            <dd className="font-medium">
              {data.depositReturned
                ? formatCurrency(data.amountReturned || 0)
                : "No"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Total Deductions</dt>
            <dd className="font-medium">{formatCurrency(totalDeductions)}</dd>
          </div>
          {(data.deductions || []).length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <dt className="text-gray-500 mb-2">Deductions Breakdown:</dt>
              <dd>
                {(data.deductions || []).map((d) => (
                  <div key={d.id} className="flex justify-between py-1">
                    <span className="text-gray-700">{d.description}</span>
                    <span>{formatCurrency(d.amount)}</span>
                  </div>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Addresses */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">Addresses</h3>
          <button
            onClick={() => goToStep(3)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Edit
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="text-gray-500 mb-1">You (Landlord)</h4>
            <p className="font-medium">{data.landlord?.name}</p>
            <p className="text-gray-600">{data.landlord?.address}</p>
            <p className="text-gray-600">
              {data.landlord?.city}, {data.landlord?.state} {data.landlord?.zip}
            </p>
          </div>
          <div>
            <h4 className="text-gray-500 mb-1">Tenant</h4>
            <p className="font-medium">{data.tenant?.name}</p>
            {data.tenant?.currentAddress && (
              <>
                <p className="text-gray-600">{data.tenant?.currentAddress}</p>
                <p className="text-gray-600">
                  {data.tenant?.city}, {data.tenant?.state} {data.tenant?.zip}
                </p>
              </>
            )}
          </div>
          <div>
            <h4 className="text-gray-500 mb-1">Property</h4>
            <p className="font-medium">
              {data.property?.address}
              {data.property?.unit && `, ${data.property?.unit}`}
            </p>
            <p className="text-gray-600">
              {data.property?.city}, {data.property?.state} {data.property?.zip}
            </p>
          </div>
        </div>
      </div>

      {/* Exposure Warning */}
      {stateRules && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-medium text-amber-900 mb-2">
            Your Potential Exposure in {stateRules.name}
          </h3>
          <p className="text-sm text-amber-800">
            Under {stateRules.statuteTitle}, tenants can recover up to{" "}
            <strong>{stateRules.damagesMultiplier}x</strong> the deposit amount
            ({stateRules.damagesDescription}) plus court costs if you violated
            statutory requirements.
          </p>
          <p className="text-sm text-amber-800 mt-2">
            <strong>Maximum exposure:</strong>{" "}
            {formatCurrency(
              (data.depositAmount || 0) * stateRules.damagesMultiplier +
                stateRules.filingFee.max
            )}
          </p>
        </div>
      )}

      {/* What You Get */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">
          Your Response Kit Includes:
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>
              State-specific response letter addressing the tenant&apos;s claims
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Deduction documentation checklist</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Settle vs. fight decision framework</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Small claims court defense guide</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Deadline tracking timeline</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
