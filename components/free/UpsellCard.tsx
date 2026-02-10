"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui";
import type { StateCode } from "@/lib/state-rules";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface UpsellCardProps {
  email: string;
  stateCode: StateCode;
  depositAmount: number;
  moveOutDate: string;
  tenantName?: string;
  landlordName?: string;
  propertyAddress?: string;
}

export function UpsellCard({
  email,
  stateCode,
  depositAmount,
  moveOutDate,
  tenantName,
  landlordName,
  propertyAddress,
}: UpsellCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpsellClick = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    // Track upsell click
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "free_upsell_clicked", {
        event_category: "conversion",
        state: stateCode,
        value: 29,
      });
    }

    // Store upsell click timestamp (non-blocking)
    fetch("/api/free-letter/upsell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {});

    try {
      // Call $29 checkout API directly
      const response = await fetch("/api/checkout-basic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantName: tenantName || "Tenant",
          tenantEmail: email,
          propertyAddress: propertyAddress || "Property Address",
          depositAmount,
          source: "free_upsell",
          formData: {
            stateCode,
            moveOutDate,
            tenantName,
            landlordName,
            propertyAddress,
            depositAmount,
          },
        }),
      });

      const result = await response.json();

      if (result.url) {
        window.location.href = result.url;
      } else {
        console.error("No checkout URL returned");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  }, [email, stateCode, depositAmount, moveOutDate, tenantName, landlordName, propertyAddress, isLoading]);

  const features = [
    "Evidence checklist to document your case",
    "Legal timeline analysis",
    "Small claims court guide",
    "Deductions dispute table",
    "Professional PDF package",
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 text-white">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-green-500 text-xs font-medium px-2 py-1 rounded">
          UPGRADE
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-semibold mb-2">
        Get 10x the impact with the Recovery Package
      </h3>

      <p className="text-gray-300 text-sm mb-6">
        Your free letter is a great start. The Recovery Package gives you everything
        you need to maximize your chances of getting your full deposit back.
      </p>

      <ul className="space-y-3 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
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
            <span className="text-sm text-gray-200">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-bold">$29</span>
        <span className="text-gray-400 text-sm">one-time</span>
      </div>

      <Button
        onClick={handleUpsellClick}
        className="w-full bg-white text-black hover:bg-gray-100"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? "Redirecting..." : "Get Recovery Kit"}
      </Button>

      {/* Court-Ready Case File mention */}
      <p className="text-xs text-gray-400 text-center mt-3">
        Need to go to court? Our{" "}
        <a href="/next-steps" className="underline hover:text-gray-200">
          $79 Court-Ready Case File
        </a>{" "}
        includes a full legal analysis and small claims filing guide.
      </p>

      {/* Trust Signals */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-300 mb-2">
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Secure checkout powered by Stripe</span>
        </div>
        <p className="text-xs text-gray-400 text-center">
          7-day money-back guarantee • No questions asked
        </p>
      </div>

      {/* Social Proof */}
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
        <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
        </svg>
        <span>127 tenants recovered their deposit this month</span>
      </div>
    </div>
  );
}
