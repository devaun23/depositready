"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-28 sm:pt-32 pb-20 sm:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.08] via-white to-white" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-5 text-center">
        {/* Headline */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "0ms", animationFillMode: "both", animationDuration: "0.6s" }}
        >
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight text-gray-900">
            Did your landlord{" "}
            <span className="gradient-text">break the law?</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "150ms", animationFillMode: "both", animationDuration: "0.5s" }}
        >
          <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
            Find out in 60 seconds — free. See exactly what violations exist and how much you may be owed.
          </p>
        </div>

        {/* CTA Button */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "300ms", animationFillMode: "both", animationDuration: "0.5s" }}
        >
          <div className="mt-10">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-base font-semibold rounded-2xl hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 min-h-[44px]"
            >
              Check My Case Free
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <p className="mt-3 text-xs text-gray-400 flex items-center justify-center gap-1.5">
              {/* Clock icon */}
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              60 seconds · No sign-up · Free verdict
            </p>
          </div>
        </div>

        {/* Bottom trust signals */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "500ms", animationFillMode: "both", animationDuration: "0.5s" }}
        >
          <div className="mt-10 flex items-center justify-center gap-5 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              {/* ShieldCheck icon */}
              <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Money-back guarantee
            </span>
            <span className="h-3 w-px bg-gray-200" />
            <span>2,400+ cases checked</span>
          </div>
        </div>
      </div>
    </section>
  );
}
