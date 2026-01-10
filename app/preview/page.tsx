"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { WizardData } from "@/types/dispute";
import { analyzeDeadlines } from "@/lib/state-rules/deadlines";
import { getStateRulesByCode, FLORIDA, formatLegalDate } from "@/lib/state-rules";
import { PacketPreviewSection } from "@/components/preview/PacketPreviewSection";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function PreviewContent() {
  const [data, setData] = useState<WizardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    const stored = localStorage.getItem("disputeData");
    if (stored) {
      const parsedData = JSON.parse(stored);
      setData(parsedData);

      // Track preview view for retargeting
      if (typeof window !== "undefined" && "gtag" in window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag("event", "preview_view", {
          event_category: "engagement",
          value: parsedData.depositAmount || 0,
        });
      }
    }
  }, []);

  const handlePurchase = async () => {
    if (!data) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantName: data.tenant.name,
          tenantEmail: data.tenant.email,
          propertyAddress: `${data.property.address}, ${data.property.city}, ${data.stateCode || 'FL'}`,
          depositAmount: data.depositAmount,
          formData: data, // Pass full wizard data for database storage
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to create checkout session"
        );
      }

      const { url } = await response.json();

      if (url) {
        // Fire Google Ads conversion for checkout initiation
        window.gtag?.("event", "conversion", {
          send_to: "AW-17859927660/jtPRCJKB9N4bEOy8o8RC",
          value: 39.0,
          currency: "USD",
        });

        window.location.href = url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No dispute data found.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Select your state to begin
          </Link>
        </div>
      </div>
    );
  }

  // Get state rules based on wizard data
  const stateRules = data.stateCode
    ? getStateRulesByCode(data.stateCode)
    : FLORIDA;

  const deadlines = data.moveOutDate
    ? analyzeDeadlines(new Date(data.moveOutDate), stateRules)
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
            href={`/${stateRules.slug}/wizard`}
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
                {data.property.city}, {stateRules.code}
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
                missed the legal deadline under {stateRules.statuteTitle}. This
                strengthens your case.
              </p>
            </div>
          )}
        </div>

        {/* PDF Preview Section */}
        <div className="mb-6">
          <PacketPreviewSection
            onPurchaseClick={handlePurchase}
            isLoading={isLoading}
          />
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mt-4 text-sm">
              {error}
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
                description: `Addressed to ${data.landlord.name}, citing ${stateRules.statuteTitle}, demanding return of your $${data.depositAmount?.toFixed(2) || "0.00"} deposit.`,
                preview: true,
              },
              {
                title: "Legal Timeline Analysis",
                description: deadlines
                  ? `Shows the ${stateRules.returnDeadline}-day deadline (${formatLegalDate(deadlines.returnDeadline)}) and ${stateRules.claimDeadline}-day deadline (${formatLegalDate(deadlines.claimDeadline)}) with violation status.`
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
                description: `Step-by-step instructions for filing in ${stateRules.name} small claims court (up to $${stateRules.maxSmallClaims.toLocaleString()}).`,
                preview: false,
              },
              {
                title: `${stateRules.statuteTitle} Reference`,
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
          {canceled && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 mb-4 text-sm">
              Payment was canceled. Your data is still saved - try again when
              ready.
            </div>
          )}

          <div className="text-3xl font-bold text-gray-900 mb-2">$39</div>
          <p className="text-gray-600 mb-6">
            One-time purchase. Instant download. No subscription.
          </p>

          <button
            onClick={handlePurchase}
            disabled={isLoading}
            className="w-full md:w-auto px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Redirecting to checkout...
              </span>
            ) : (
              "Get My Packet — $39"
            )}
          </button>

          <p className="text-xs text-green-600 mt-2 font-medium">
            Not satisfied? Full refund within 7 days, no questions asked.
          </p>

          <p className="text-xs text-gray-500 mt-2">
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

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
