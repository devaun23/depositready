"use client";

import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0"
      style={{ color: "var(--accent-amber)" }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

interface Tier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular: boolean;
}

const pricingData: Record<"compliance" | "defense", Tier[]> = {
  compliance: [
    {
      name: "Standard",
      price: "$99",
      description: "Essential compliance tools for deposit handling",
      features: [
        "Compliance audit report",
        "Deadline timeline",
        "Inspection checklist",
        "Deduction letter template",
        "Wear & tear guide",
        "Certified mail instructions",
      ],
      cta: "Get Standard Kit",
      href: "/landlord/compliance/intake",
      popular: false,
    },
    {
      name: "Complete",
      price: "$179",
      description: "Full compliance suite with premium extras",
      features: [
        "Everything in Standard",
        "Photo documentation guide",
        "Evidence organizer",
        "Priority support",
      ],
      cta: "Get Complete Kit",
      href: "/landlord/compliance/intake?tier=complete",
      popular: true,
    },
  ],
  defense: [
    {
      name: "Standard",
      price: "$129",
      description: "Core defense tools for deposit disputes",
      features: [
        "Liability assessment report",
        "Response letter template",
        "Settle vs. fight analysis",
        "Deadline timeline",
        "Certified mail instructions",
      ],
      cta: "Get Standard Kit",
      href: "/landlord/defense/intake",
      popular: false,
    },
    {
      name: "Complete",
      price: "$199",
      description: "Full defense suite with premium extras",
      features: [
        "Everything in Standard",
        "Settlement agreement template",
        "Evidence organizer",
        "Post-judgment guide",
        "Priority support",
      ],
      cta: "Get Complete Kit",
      href: "/landlord/defense/intake?tier=complete",
      popular: true,
    },
  ],
};

interface LandlordPricingProps {
  mode: "compliance" | "defense";
}

export function LandlordPricing({ mode }: LandlordPricingProps) {
  const { ref, visible } = useScrollReveal();
  const tiers = pricingData[mode];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="pricing"
      className="py-16 md:py-24 px-4 sm:px-6"
      style={{ backgroundColor: "var(--section-bg-alt)" }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand text-center mb-3">
          Simple, transparent pricing
        </h2>
        <p className="text-gray-600 text-base md:text-lg text-center mb-12">
          One-time purchase. Instant download. No subscriptions.
        </p>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl p-6 hover:-translate-y-0.5 transition-all duration-200 ${
                tier.popular
                  ? "ring-2 shadow-elevated"
                  : "shadow-[var(--shadow-card)] hover:shadow-elevated"
              } ${visible ? "animate-fadeSlideUp" : "opacity-0"}`}
              style={{
                animationDelay: visible ? `${i * 100}ms` : undefined,
                animationFillMode: "both",
                ...(tier.popular
                  ? { ringColor: "var(--accent-amber)" }
                  : {}),
              }}
            >
              {tier.popular && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                  style={{ backgroundColor: "var(--accent-amber)" }}
                >
                  BEST VALUE
                </span>
              )}

              <h3 className="font-serif text-lg font-semibold text-brand">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {tier.description}
              </p>

              <p className="mt-4 mb-6">
                <span className="text-3xl font-bold text-black">
                  {tier.price}
                </span>
                <span className="text-gray-500 text-sm ml-1">
                  one-time
                </span>
              </p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`block text-center py-3 px-4 rounded-xl font-medium transition-all duration-200 min-h-[44px] ${
                  tier.popular
                    ? "text-white hover:-translate-y-0.5"
                    : "hover:opacity-80"
                }`}
                style={
                  tier.popular
                    ? { backgroundColor: "var(--accent-amber)" }
                    : {
                        backgroundColor: "var(--accent-amber-light)",
                        color: "var(--accent-amber-hover)",
                      }
                }
                onMouseEnter={(e) => {
                  if (tier.popular) {
                    e.currentTarget.style.backgroundColor =
                      "var(--accent-amber-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (tier.popular) {
                    e.currentTarget.style.backgroundColor =
                      "var(--accent-amber)";
                  }
                }}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
