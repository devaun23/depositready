"use client";

import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

const cases = [
  {
    violation: "Missed 21-day return deadline",
    discovered: "$2,400 in penalties",
    outcome: "Full deposit + penalty recovered",
    state: "California",
  },
  {
    violation: "No itemized deduction statement",
    discovered: "$1,200 forfeiture",
    outcome: "Full deposit returned in 9 days",
    state: "Texas",
  },
  {
    violation: "Deposit not held in separate account",
    discovered: "2× statutory penalty",
    outcome: "$4,800 recovered",
    state: "New York",
  },
];

export function MoneyProof() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-card"
    >
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center text-foreground mb-3">
          Violations most renters never find
        </h2>
        <p className="text-center text-sm text-muted mb-10 max-w-md mx-auto">
          Your landlord may owe you more than just your deposit. We find the violations — and the penalties that come with them.
        </p>

        {/* Case cards */}
        <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
          {cases.map((c, i) => (
            <div
              key={i}
              className={`rounded-xl border border-border overflow-hidden bg-card ${
                visible ? "animate-fadeSlideUp" : "opacity-0"
              }`}
              style={{ animationDelay: visible ? `${i * 80}ms` : undefined, animationFillMode: "both" }}
            >
              <div className="p-4 border-b border-border">
                <p className="text-[10px] font-bold text-destructive uppercase tracking-wide mb-1">Violation Found</p>
                <p className="text-sm font-semibold text-foreground">{c.violation}</p>
              </div>
              <div className="p-4 bg-accent/5">
                <p className="text-[10px] font-bold text-accent uppercase tracking-wide mb-1">Discovered</p>
                <p className="text-sm font-bold text-accent">{c.discovered}</p>
                <p className="text-xs text-muted mt-1">{c.outcome} · {c.state}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empathy */}
        <div className={`mt-10 max-w-sm mx-auto text-center ${visible ? "animate-fadeIn" : "opacity-0"}`} style={{ animationDelay: "400ms", animationFillMode: "both" }}>
          {/* Heart icon */}
          <svg className="h-4 w-4 text-accent mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <p className="text-sm text-muted leading-relaxed">
            Most renters don&rsquo;t know their landlord broke the law. That&rsquo;s the problem we solve.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/check-my-case"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-xl shadow-accent/20 min-h-[44px]"
          >
            Check My Case Free
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
