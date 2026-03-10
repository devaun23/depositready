"use client";

import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

function CheckIcon({ className = "text-accent" }: { className?: string }) {
  return (
    <svg
      className={`w-4 h-4 flex-shrink-0 ${className}`}
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

const tiers = [
  {
    name: "Insight",
    price: "Free",
    priceDetail: null,
    description: "Understand your rights in minutes",
    cta: "Start Free Chat",
    href: "/chat",
    popular: false,
    features: [
      "State-specific deadline check",
      "Violation detection",
      "Recovery estimate",
      "Case strength assessment",
    ],
  },
  {
    name: "Recovery Letter",
    price: "$29",
    priceDetail: "one-time",
    description: "Professional letter ready to send",
    cta: "Get My Letter",
    href: "/quiz?product=basic",
    popular: true,
    features: [
      "Custom recovery letter for your state",
      "State law breakdown and deadlines",
      "Legal timeline with key dates",
      "Evidence checklist",
    ],
  },
  {
    name: "Recovery Kit",
    price: "$79",
    priceDetail: "one-time",
    description: "Complete dispute documentation",
    cta: "Get Recovery Kit",
    href: "/quiz?product=full",
    popular: false,
    features: [
      "Everything in Recovery Letter",
      "Case review memo",
      "Small claims filing guide",
      "Follow-up letter templates",
    ],
  },
];

export function Pricing() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="pricing"
      className="py-16 md:py-24 px-4 sm:px-6 bg-[var(--section-bg-alt)]"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-3">
          Simple, transparent pricing
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-10">
          Start free. Pay only when you need legal documents.
        </p>

        {/* 3-tier card grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl p-6 hover:-translate-y-0.5 transition-all duration-200 ${
                tier.popular
                  ? "ring-2 ring-accent shadow-elevated bg-gradient-to-b from-accent-light/50 to-white hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
                  : "shadow-[var(--shadow-card)] hover:shadow-elevated"
              } ${visible ? "animate-fadeSlideUp" : "opacity-0"}`}
              style={{ animationDelay: visible ? `${i * 100}ms` : undefined, animationFillMode: "both" }}
            >
              {/* Most Popular badge */}
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  Most Popular
                </span>
              )}

              <h3 className="font-serif text-lg font-semibold text-brand">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{tier.description}</p>

              <p className="mt-4 mb-6">
                <span className="text-3xl font-bold text-black">
                  {tier.price}
                </span>
                {tier.priceDetail && (
                  <span className="text-gray-500 text-sm ml-1">
                    {tier.priceDetail}
                  </span>
                )}
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
                className={`block text-center py-3 px-4 rounded-xl font-medium transition-colors min-h-[44px] ${
                  tier.popular
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "bg-brand/5 text-brand hover:bg-brand/10"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Additional products */}
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-semibold text-black">
                Small Claims Filing Kit
              </p>
              <p className="text-sm text-gray-600 mt-0.5">
                Court-ready documents, damage worksheets, and courtroom scripts
              </p>
            </div>
            <Link
              href="/filing-kit"
              className="inline-flex items-center justify-center gap-1 rounded-xl border border-[var(--accent-orange)] px-5 py-2.5 text-sm font-medium text-[var(--accent-orange)] hover:bg-[var(--accent-orange-light)] transition-colors min-h-[44px] flex-shrink-0"
            >
              From $79 &rarr;
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-semibold text-black">
                Priority Case Review
              </p>
              <p className="text-sm text-gray-600 mt-0.5">
                Enhanced analysis with personalized follow-up support
              </p>
            </div>
            <Link
              href="/case-review"
              className="inline-flex items-center justify-center gap-1 rounded-xl border border-brand px-5 py-2.5 text-sm font-medium text-brand hover:bg-brand-bg transition-colors min-h-[44px] flex-shrink-0"
            >
              $149 &rarr;
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-semibold text-black">
                For Landlords
              </p>
              <p className="text-sm text-gray-600 mt-0.5">
                Compliance kits and defense tools for deposit disputes
              </p>
            </div>
            <Link
              href="/landlord"
              className="inline-flex items-center justify-center gap-1 rounded-xl border border-[var(--accent-amber)] px-5 py-2.5 text-sm font-medium text-[var(--accent-amber)] hover:bg-[var(--accent-amber-light)] transition-colors min-h-[44px] flex-shrink-0"
            >
              From $99 &rarr;
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-accent-light/30 to-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-semibold text-black">
                Free Calculator
              </p>
              <p className="text-sm text-gray-600 mt-0.5">
                Instant analysis for tenants and landlords — no account needed
              </p>
            </div>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-1 rounded-xl bg-accent text-white px-5 py-2.5 text-sm font-medium hover:bg-accent-hover transition-colors min-h-[44px] flex-shrink-0"
            >
              Try Free &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
