"use client";

import { useState } from "react";
import { Input } from "@/components/ui";
import { useCaseReview } from "../CaseReviewIntakeContext";

export function Step5ReviewPay() {
  const { data, updateData, canProceed } = useCaseReview();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (!canProceed) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/case-review/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to create checkout session");
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black">Review &amp; Pay</h2>
        <p className="text-sm text-gray-500 mt-1">
          Review your information and provide your contact details for delivery.
        </p>
      </div>

      {/* Case Summary */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-semibold text-black uppercase tracking-wide">
          Case Summary
        </h3>
        <SummaryRow label="State" value={data.stateCode || "—"} />
        <SummaryRow
          label="Deposit"
          value={
            data.depositAmount
              ? `$${data.depositAmount.toLocaleString()}`
              : "—"
          }
        />
        {data.moveOutDate && (
          <SummaryRow label="Move-out Date" value={data.moveOutDate} />
        )}
        {data.landlordName && (
          <SummaryRow label="Landlord" value={data.landlordName} />
        )}
        {data.propertyAddress && (
          <SummaryRow label="Address" value={data.propertyAddress} />
        )}
        <SummaryRow
          label="Situation"
          value={
            data.situationSummary.length > 120
              ? data.situationSummary.slice(0, 120) + "..."
              : data.situationSummary || "—"
          }
        />
        {data.primaryConcern && (
          <SummaryRow
            label="Goal"
            value={data.primaryConcern.replace(/_/g, " ")}
          />
        )}
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-black uppercase tracking-wide">
          Your Contact Info
        </h3>

        <Input
          label="Full Name"
          required
          placeholder="Your name"
          value={data.name}
          onChange={(e) => updateData("name", e.target.value)}
        />

        <Input
          label="Email"
          required
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => updateData("email", e.target.value)}
          helperText="We'll deliver your case review here"
        />

        <Input
          label="Phone (optional)"
          type="tel"
          placeholder="(555) 123-4567"
          value={data.phone}
          onChange={(e) => updateData("phone", e.target.value)}
        />
      </div>

      {/* Pricing */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-black">Personalized Case Review</p>
            <p className="text-sm text-gray-500">
              Expert analysis of your deposit situation
            </p>
          </div>
          <p className="text-2xl font-bold text-black">$149</p>
        </div>
        <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            Personalized case assessment with your specific facts
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            Your state&apos;s laws applied to your situation
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            Step-by-step action plan with deadlines
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            Reviewed by a deposit recovery specialist
          </li>
        </ul>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
          {error}
        </p>
      )}

      <button
        onClick={handleCheckout}
        disabled={!canProceed || loading}
        className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-base"
      >
        {loading ? "Redirecting to checkout..." : "Continue to Payment — $149"}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Secure payment via Stripe. You&apos;ll receive your personalized case
        review within 24 hours.
      </p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-black font-medium text-right max-w-[60%] capitalize">
        {value}
      </span>
    </div>
  );
}
