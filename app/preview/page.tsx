"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WizardData, EMPTY_WIZARD_DATA } from "@/types/dispute";
import { analyzeDeadlines, formatLegalDate, FLORIDA_RULES } from "@/lib/florida-rules";

export default function PreviewPage() {
  const [data, setData] = useState<WizardData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("disputeData");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No dispute data found.</p>
          <Link href="/wizard" className="text-blue-600 hover:text-blue-700">
            Start the wizard
          </Link>
        </div>
      </div>
    );
  }

  const deadlines = data.moveOutDate
    ? analyzeDeadlines(new Date(data.moveOutDate))
    : null;

  const totalDeductions = data.deductions.reduce((sum, d) => sum + d.amount, 0);
  const amountOwed = (data.depositAmount || 0) - (data.amountReceived || 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            DepositReady
          </Link>
          <Link
            href="/wizard"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Edit answers
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Dispute Packet Preview
          </h1>
          <p className="text-gray-600">
            Review what you will receive, then purchase to download.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Dispute Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Tenant:</span>
              <span className="ml-2 font-medium">{data.tenant.name}</span>
            </div>
            <div>
              <span className="text-gray-500">Landlord:</span>
              <span className="ml-2 font-medium">{data.landlord.name}</span>
            </div>
            <div>
              <span className="text-gray-500">Property:</span>
              <span className="ml-2 font-medium">
                {data.property.address}
                {data.property.unit && `, ${data.property.unit}`},{" "}
                {data.property.city}, FL
              </span>
            </div>
            <div>
              <span className="text-gray-500">Deposit Amount:</span>
              <span className="ml-2 font-medium">
                ${data.depositAmount?.toFixed(2) || "0.00"}
              </span>
            </div>
            {deadlines && (
              <div>
                <span className="text-gray-500">Move-out Date:</span>
                <span className="ml-2 font-medium">
                  {formatLegalDate(deadlines.moveOutDate)}
                </span>
              </div>
            )}
            <div>
              <span className="text-gray-500">Amount Owed:</span>
              <span className="ml-2 font-medium text-green-600">
                ${amountOwed.toFixed(2)}
              </span>
            </div>
          </div>

          {deadlines?.landlordInViolation && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Deadline Violation Detected:</strong> Your landlord
                missed the legal deadline under Florida Statute 83.49. This
                strengthens your case.
              </p>
            </div>
          )}
        </div>

        {/* Packet Contents */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Your Packet Includes
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Customized Demand Letter",
                description: `Addressed to ${data.landlord.name}, citing Florida Statute 83.49, demanding return of your $${data.depositAmount?.toFixed(2) || "0.00"} deposit.`,
                preview: true,
              },
              {
                title: "Legal Timeline Analysis",
                description: deadlines
                  ? `Shows the 15-day deadline (${formatLegalDate(deadlines.returnDeadline)}) and 30-day deadline (${formatLegalDate(deadlines.claimDeadline)}) with violation status.`
                  : "Deadline calculations based on your move-out date.",
                preview: true,
              },
              {
                title: "Deductions Dispute Table",
                description:
                  data.deductions.length > 0
                    ? `Line-by-line rebuttal of ${data.deductions.length} deduction(s) totaling $${totalDeductions.toFixed(2)}.`
                    : "Documentation of failure to provide itemized deductions.",
                preview: data.deductions.length > 0,
              },
              {
                title: "Evidence Checklist",
                description:
                  "Customized list of evidence to gather based on your situation.",
                preview: false,
              },
              {
                title: "Small Claims Court Guide",
                description: `Step-by-step instructions for filing in Florida small claims court (up to $${FLORIDA_RULES.maxSmallClaims.toLocaleString()}).`,
                preview: false,
              },
              {
                title: "Florida Statute 83.49 Reference",
                description:
                  "Full text of the security deposit law with key sections highlighted.",
                preview: false,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase CTA */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-2">$39</div>
          <p className="text-gray-600 mb-6">
            One-time purchase. Instant download. No subscription.
          </p>
          <button
            onClick={() => alert("Stripe integration coming soon!")}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Your Dispute Packet
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Secure payment via Stripe. You will receive a download link
            immediately after purchase.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            DepositReady is not a law firm and does not provide legal advice.
            The documents generated are for informational purposes only. For
            complex legal matters, consult a licensed attorney.
          </p>
        </div>
      </main>
    </div>
  );
}
