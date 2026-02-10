"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui";
import type { StateCode } from "@/lib/state-rules";

interface PricingCardProps {
  email: string;
  stateCode: StateCode;
  depositAmount: number;
  moveOutDate: string;
  landlordName?: string;
  potentialRecovery?: number;
}

type Tier = "basic" | "full";

export function PricingCard({
  email,
  stateCode,
  depositAmount,
  moveOutDate,
  landlordName,
  potentialRecovery,
}: PricingCardProps) {
  const [loadingTier, setLoadingTier] = useState<Tier | null>(null);

  const handleCheckout = useCallback(
    async (tier: Tier) => {
      if (loadingTier) return;
      setLoadingTier(tier);

      const endpoint =
        tier === "basic" ? "/api/checkout-basic" : "/api/checkout";

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tenantName: "Tenant",
            tenantEmail: email,
            propertyAddress: "Property Address",
            depositAmount,
            source: "recover_page",
            formData: {
              stateCode,
              moveOutDate,
              landlordName,
              depositAmount,
            },
          }),
        });

        const result = await response.json();

        if (result.url) {
          window.location.href = result.url;
        } else {
          setLoadingTier(null);
        }
      } catch {
        setLoadingTier(null);
      }
    },
    [email, stateCode, depositAmount, moveOutDate, landlordName, loadingTier]
  );

  return (
    <div className="space-y-4">
      {/* Potential Recovery Banner */}
      {potentialRecovery && potentialRecovery > 0 && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <span className="font-medium">Potential recovery:</span> Up to{" "}
            <span className="font-bold text-green-900">
              ${potentialRecovery.toLocaleString()}
            </span>{" "}
            under your state&apos;s law
          </p>
        </div>
      )}

      {/* $29 Tier — Primary */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-green-500 text-xs font-medium px-2 py-0.5 rounded">
            MOST POPULAR
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-1">Recovery Kit</h3>
        <p className="text-gray-400 text-sm mb-4">
          Everything you need to send a professional demand letter
        </p>

        <ul className="space-y-2 mb-5 text-sm">
          {[
            "Court-ready PDF demand letter",
            "Evidence checklist",
            "Legal timeline analysis",
            "Small claims court guide",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-200">{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold">$29</span>
          <span className="text-gray-400 text-sm">one-time</span>
        </div>

        <Button
          onClick={() => handleCheckout("basic")}
          className="w-full bg-white text-black hover:bg-gray-100"
          size="lg"
          disabled={!!loadingTier}
        >
          {loadingTier === "basic" ? "Redirecting..." : "Get Recovery Kit"}
        </Button>
      </div>

      {/* $79 Tier */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-black mb-1">
          Full Package
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Maximum recovery with deductions dispute tools
        </p>

        <ul className="space-y-2 mb-5 text-sm">
          {[
            "Everything in Recovery Kit",
            "Deductions dispute table",
            "Professional PDF package",
            "Priority support",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-black">$79</span>
          <span className="text-gray-400 text-sm">one-time</span>
        </div>

        <Button
          onClick={() => handleCheckout("full")}
          className="w-full"
          size="lg"
          disabled={!!loadingTier}
        >
          {loadingTier === "full"
            ? "Redirecting..."
            : "Get Full Package"}
        </Button>
      </div>

      {/* Trust Signals */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <svg
            className="w-4 h-4 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Secure checkout powered by Stripe</span>
        </div>
        <p className="text-xs text-gray-400">
          7-day money-back guarantee · No questions asked
        </p>
      </div>
    </div>
  );
}
