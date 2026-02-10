"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui";

interface PricingCardsProps {
  email?: string;
  companyName?: string;
  customerType?: string;
}

const TIERS = [
  {
    size: 5,
    price: 99,
    perUnit: "19.80",
    label: "Starter",
    popular: false,
  },
  {
    size: 10,
    price: 179,
    perUnit: "17.90",
    label: "Professional",
    popular: true,
  },
  {
    size: 25,
    price: 399,
    perUnit: "15.96",
    label: "Enterprise",
    popular: false,
  },
];

export function PricingCards({
  email,
  companyName,
  customerType,
}: PricingCardsProps) {
  const [loadingSize, setLoadingSize] = useState<number | null>(null);

  const handleCheckout = useCallback(
    async (packageSize: number) => {
      if (loadingSize) return;
      if (!email) {
        // Scroll to form if no email provided
        document.getElementById("b2b-form")?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      setLoadingSize(packageSize);

      try {
        const response = await fetch("/api/business/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            companyName,
            customerType,
            packageSize,
          }),
        });

        const result = await response.json();

        if (result.url) {
          window.location.href = result.url;
        } else {
          setLoadingSize(null);
        }
      } catch {
        setLoadingSize(null);
      }
    },
    [email, companyName, customerType, loadingSize]
  );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {TIERS.map((tier) => (
        <div
          key={tier.size}
          className={`relative bg-white rounded-xl p-6 ${
            tier.popular
              ? "border-2 border-black shadow-lg"
              : "border border-gray-200"
          }`}
        >
          {tier.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>
          )}

          <div className="text-center mb-6">
            <p className="text-sm font-medium text-gray-500 mb-1">
              {tier.label}
            </p>
            <h3 className="text-lg font-semibold text-black mb-1">
              {tier.size} Letters
            </h3>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-black">
                ${tier.price}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              ${tier.perUnit} per letter
            </p>
            <p className="text-xs text-green-600 font-medium mt-1">
              Save {Math.round((1 - tier.price / (tier.size * 29)) * 100)}% vs
              retail
            </p>
          </div>

          <ul className="space-y-2 mb-6 text-sm">
            {[
              `${tier.size} court-ready demand letters`,
              "State-specific legal citations",
              "Dashboard to track usage",
              "Generate letters on demand",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
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
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => handleCheckout(tier.size)}
            fullWidth
            size="lg"
            variant={tier.popular ? "primary" : "outline"}
            disabled={!!loadingSize}
          >
            {loadingSize === tier.size
              ? "Redirecting..."
              : `Get ${tier.size}-Pack`}
          </Button>
        </div>
      ))}
    </div>
  );
}
