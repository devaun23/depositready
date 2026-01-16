"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
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
}

export function UpsellCard({ email, stateCode, depositAmount, moveOutDate }: UpsellCardProps) {
  const router = useRouter();

  const handleUpsellClick = useCallback(() => {
    // Track upsell click
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "free_upsell_clicked", {
        event_category: "conversion",
        state: stateCode,
        value: 79,
      });
    }

    // Store upsell click timestamp
    fetch("/api/free-letter/upsell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {
      // Non-blocking, ignore errors
    });

    // Build query params for wizard
    const params = new URLSearchParams({
      source: "free",
      email,
      state: stateCode,
      deposit: depositAmount.toString(),
      moveout: moveOutDate,
    });

    router.push(`/wizard?${params.toString()}`);
  }, [email, stateCode, depositAmount, moveOutDate, router]);

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
        <span className="text-3xl font-bold">$79</span>
        <span className="text-gray-400 text-sm">one-time</span>
      </div>

      <Button
        onClick={handleUpsellClick}
        className="w-full bg-white text-black hover:bg-gray-100"
        size="lg"
      >
        Get Full Package
      </Button>

      <p className="text-xs text-gray-400 text-center mt-4">
        7-day money-back guarantee. No questions asked.
      </p>
    </div>
  );
}
