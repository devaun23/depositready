"use client";

import { useState } from "react";
import { useFilingKit } from "../FilingKitIntakeContext";

export function Step5ReviewPay() {
  const { data, updateData } = useFilingKit();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/filing-kit/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.url) {
        window.location.href = result.url;
      } else {
        setError(result.error || "Something went wrong. Please try again.");
        setIsLoading(false);
      }
    } catch {
      setError("Connection error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Review & Pay</h2>
        <p className="text-sm text-gray-600 mt-1">
          Choose your tier and complete your purchase.
        </p>
      </div>

      {/* Tier selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => updateData("tier", "standard")}
          className={`p-5 rounded-xl border-2 text-left transition-all ${
            data.tier === "standard"
              ? "border-[var(--accent-orange)] bg-[var(--accent-orange-light)]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900">Standard</span>
            <span className="text-xl font-bold text-gray-900">$79</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>&#10003; Damage calculation worksheet</li>
            <li>&#10003; State-specific filing guide</li>
            <li>&#10003; Service of process instructions</li>
          </ul>
        </button>

        <button
          onClick={() => updateData("tier", "complete")}
          className={`p-5 rounded-xl border-2 text-left transition-all relative ${
            data.tier === "complete"
              ? "border-[var(--accent-orange)] bg-[var(--accent-orange-light)]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <span className="absolute -top-2.5 right-3 bg-[var(--accent-orange)] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            BEST VALUE
          </span>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900">Complete</span>
            <span className="text-xl font-bold text-gray-900">$129</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>&#10003; Everything in Standard</li>
            <li>&#10003; Pre-filled statement of claim</li>
            <li>&#10003; Courtroom script</li>
            <li>&#10003; Post-judgment collection guide</li>
          </ul>
        </button>
      </div>

      {/* Contact info */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-gray-800">Contact for order confirmation</legend>
        <input
          placeholder="Name"
          value={data.name}
          onChange={(e) => updateData("name", e.target.value)}
          className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
        />
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => updateData("email", e.target.value)}
          className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={data.phone}
          onChange={(e) => updateData("phone", e.target.value)}
          className="w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-orange)] focus:border-[var(--accent-orange)]"
        />
      </fieldset>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Filing Kit ({data.tier === "complete" ? "Complete" : "Standard"})</span>
          <span className="font-semibold">${data.tier === "complete" ? "129" : "79"}</span>
        </div>
        {data.stateCode && (
          <p className="text-xs text-gray-500 mt-1">State: {data.stateCode}</p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      {/* Checkout button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading || !data.name.trim() || !data.email.trim()}
        className="w-full bg-[var(--accent-orange)] text-white font-semibold py-3.5 rounded-lg hover:bg-[var(--accent-orange-hover)] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isLoading ? "Redirecting to payment..." : `Pay $${data.tier === "complete" ? "129" : "79"} — Get Your Filing Kit`}
      </button>

      <p className="text-center text-xs text-gray-500">
        Secure payment via Stripe. Instant download after payment.
      </p>
    </div>
  );
}
