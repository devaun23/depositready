"use client";

import { useState } from "react";
import { useLandlordIntake } from "../LandlordIntakeContext";

export function Step5ReviewPay() {
  const { data, updateData } = useLandlordIntake();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const price = data.tier === "complete" ? 179 : 99;

  const handleCheckout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/landlord/checkout", {
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

  const inputClass =
    "w-full px-3 py-3 min-h-[44px] border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[var(--accent-amber)] focus:border-[var(--accent-amber)] transition-colors";

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
              ? "border-[var(--accent-amber)] bg-[var(--accent-amber-light)]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900">Standard</span>
            <span className="text-xl font-bold text-gray-900">$99</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>&#10003; Compliance audit report</li>
            <li>&#10003; State-specific checklist</li>
            <li>&#10003; Risk assessment summary</li>
          </ul>
        </button>

        <button
          onClick={() => updateData("tier", "complete")}
          className={`p-5 rounded-xl border-2 text-left transition-all relative ${
            data.tier === "complete"
              ? "border-[var(--accent-amber)] bg-[var(--accent-amber-light)]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <span className="absolute -top-2.5 right-3 bg-[var(--accent-amber)] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            BEST VALUE
          </span>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900">Complete</span>
            <span className="text-xl font-bold text-gray-900">$179</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>&#10003; Everything in Standard</li>
            <li>&#10003; Remediation action plan</li>
            <li>&#10003; Response letter templates</li>
            <li>&#10003; Liability exposure calculator</li>
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
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => updateData("email", e.target.value)}
          className={inputClass}
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={data.phone}
          onChange={(e) => updateData("phone", e.target.value)}
          className={inputClass}
        />
      </fieldset>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Compliance Kit ({data.tier === "complete" ? "Complete" : "Standard"})</span>
          <span className="font-semibold">${price}</span>
        </div>
        {data.stateCode && (
          <p className="text-xs text-gray-500 mt-1">State: {data.stateCode}</p>
        )}
        {data.propertyAddress && (
          <p className="text-xs text-gray-500">
            Property: {data.propertyAddress}, {data.propertyCity}
          </p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      {/* Checkout button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading || !data.name.trim() || !data.email.trim()}
        className="w-full bg-[var(--accent-amber)] text-white font-semibold py-3.5 rounded-lg hover:bg-[var(--accent-amber-hover)] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isLoading
          ? "Redirecting to payment..."
          : `Pay $${price} — Get Your Compliance Kit`}
      </button>

      <p className="text-center text-xs text-gray-500">
        Secure payment via Stripe. Instant download after payment.
      </p>
    </div>
  );
}
