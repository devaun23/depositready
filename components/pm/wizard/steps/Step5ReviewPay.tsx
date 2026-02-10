"use client";

import { useEffect } from "react";
import { usePMWizard } from "../PMWizardContext";
import { PM_DEDUCTION_CATEGORY_LABELS } from "@/types/pm";

export function Step5ReviewPay() {
  const { data, deadlineAnalysis, setCanProceed } = usePMWizard();

  useEffect(() => {
    setCanProceed(true);
  }, [setCanProceed]);

  const totalDeductions = (data.deductions || []).reduce(
    (sum, d) => sum + d.amount,
    0
  );
  const depositAmount = data.depositAmount || 0;
  const amountToReturn = Math.max(0, depositAmount - totalDeductions);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Review your information below. After payment, your FL §83.49-compliant
        deposit disposition packet will be ready to download immediately.
      </p>

      {/* Deadline urgency */}
      {deadlineAnalysis && (
        <div
          className={`p-4 rounded-lg border ${
            deadlineAnalysis.urgency === "overdue"
              ? "bg-red-50 border-red-200"
              : deadlineAnalysis.urgency === "urgent"
                ? "bg-red-50 border-red-200"
                : deadlineAnalysis.urgency === "soon"
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-green-50 border-green-200"
          }`}
        >
          <p className="text-sm font-medium">
            {deadlineAnalysis.urgencyLabel}
          </p>
          <p className="text-sm mt-1">{deadlineAnalysis.urgencyDescription}</p>
        </div>
      )}

      {/* Property Summary */}
      <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide mb-2">
            Property
          </h3>
          <p className="text-gray-700">
            {data.property?.address}
            {data.property?.unit && `, Unit ${data.property.unit}`}
          </p>
          <p className="text-gray-700">
            {data.property?.city}, {data.property?.state} {data.property?.zip}
          </p>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide mb-2">
            Tenant
          </h3>
          <p className="text-gray-700">{data.tenant?.name}</p>
          <p className="text-sm text-gray-500">
            {data.tenant?.forwardingAddress}, {data.tenant?.city},{" "}
            {data.tenant?.state} {data.tenant?.zip}
          </p>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide mb-2">
            Deductions ({(data.deductions || []).length})
          </h3>
          {(data.deductions || []).length === 0 ? (
            <p className="text-sm text-gray-500">
              No deductions — packet will document full deposit return.
            </p>
          ) : (
            <div className="space-y-1">
              {(data.deductions || []).map((d) => (
                <div key={d.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {d.description}{" "}
                    <span className="text-gray-400">
                      ({PM_DEDUCTION_CATEGORY_LABELS[d.category]})
                    </span>
                  </span>
                  <span className="font-medium">
                    {formatCurrency(d.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50">
          <div className="flex justify-between text-sm mb-1">
            <span>Security Deposit:</span>
            <span>{formatCurrency(depositAmount)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Total Deductions:</span>
            <span>({formatCurrency(totalDeductions)})</span>
          </div>
          <div className="flex justify-between font-medium border-t border-gray-200 pt-2 mt-2">
            <span>Amount to Return:</span>
            <span>{formatCurrency(amountToReturn)}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wide mb-2">
            Company
          </h3>
          <p className="text-gray-700">{data.company?.companyName}</p>
          <p className="text-sm text-gray-500">
            {data.company?.managerName} | {data.company?.email}
          </p>
        </div>
      </div>

      {/* What you get */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">
          Your Packet Includes:
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            FL §83.49(3)(a) compliant Notice of Intent to Impose Claim
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            Itemized Deductions Statement with evidence references
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            Evidence Documentation Checklist
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            Certified Mail Instructions & Deadline Timeline
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            Certificate of Service (proof of mailing)
          </li>
        </ul>
      </div>
    </div>
  );
}
