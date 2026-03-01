"use client";

import Link from "next/link";

const intents = [
  { label: "Landlord kept it", value: "kept" },
  { label: "Unfair deductions", value: "deductions" },
  { label: "Never returned", value: "never-returned" },
  { label: "Not sure", value: "unsure" },
];

export function Hero() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-brand-bg/40 to-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-display font-semibold text-brand leading-tight animate-gradient-text">
          Get your security deposit back.
        </h1>

        <p className="mt-4 text-gray-500 text-base md:text-lg max-w-xl">
          Free AI guidance. State-specific law. No sign-up required.
        </p>

        {/* Intent pills — TurboTax-style guided entry */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {intents.map((intent) => (
            <Link
              key={intent.value}
              href={`/chat?intent=${intent.value}`}
              className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-accent hover:bg-accent/5 hover:text-accent active:scale-[0.97] min-h-[44px] inline-flex items-center"
            >
              {intent.label}
            </Link>
          ))}
        </div>

        <Link
          href="/chat"
          className="inline-flex items-center justify-center gap-2 mt-6 w-full sm:w-auto px-8 py-4 bg-accent text-white text-lg font-medium rounded-xl hover:bg-accent-hover transition-colors shadow-md hover:shadow-lg"
        >
          Start Free Chat
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>

        {/* Star rating row */}
        <div className="mt-6 flex items-center gap-2">
          <div className="flex" aria-label="4.9 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-accent"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            <span className="font-semibold text-black">4.9</span> from 180+ reviews
          </span>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-gray-400 max-w-md">
          Not a law firm. No legal advice. No guaranteed outcomes.
        </p>
      </div>
    </section>
  );
}
