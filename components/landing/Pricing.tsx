"use client";

import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function Pricing() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="pricing"
      className="section-padding bg-section-bg-alt"
    >
      <div className="max-w-2xl mx-auto px-5">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-foreground">
            The verdict is free. Recovery is $39.
          </h2>
          <p className="mt-2 text-sm text-muted">
            Find out if you have a case — no cost, no sign-up. If you do, we build the enforcement packet.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {/* Free — Case Verdict */}
          <div
            className={`rounded-xl p-4 sm:p-5 border border-border bg-card flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 ${
              visible ? "animate-fadeSlideUp" : "opacity-0"
            }`}
            style={{ animationFillMode: "both" }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-success uppercase tracking-wide bg-success-light px-2 py-0.5 rounded">
                  Free
                </span>
                <span className="font-semibold text-foreground text-sm">
                  Case Verdict
                </span>
              </div>
              <p className="text-xs text-muted">
                Violations found, penalties calculated, case strength rated.
              </p>
            </div>
            <Link
              href="/check-my-case"
              className="inline-flex items-center justify-center px-5 py-2.5 border-2 border-accent text-accent text-sm font-medium rounded-xl hover:bg-accent/5 transition-colors min-h-[44px] w-full sm:w-auto flex-shrink-0"
            >
              Check My Case Free
            </Link>
          </div>

          {/* $39 — Recovery Packet */}
          <div
            className={`relative rounded-xl p-5 sm:p-6 border-2 border-accent bg-card shadow-lg ring-1 ring-accent/20 ${
              visible ? "animate-fadeSlideUp" : "opacity-0"
            }`}
            style={{ animationDelay: visible ? "80ms" : undefined, animationFillMode: "both" }}
          >
            <span className="absolute -top-2.5 left-5 bg-accent text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              Most Popular
            </span>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-foreground">$39</span>
                  <span className="text-sm text-muted">one-time</span>
                </div>
                <p className="font-semibold text-foreground text-sm">
                  Recovery Packet
                </p>
                <p className="text-xs text-muted mt-1 mb-3">
                  Built from your specific violations — not a template.
                </p>
                <ul className="space-y-1.5">
                  {[
                    "Demand letter citing your exact violations",
                    "Penalty calculations with statute references",
                    "Evidence checklist tailored to your case",
                    "Follow-up + escalation timeline",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-foreground"
                    >
                      <svg
                        className="h-3.5 w-3.5 text-success flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/check-my-case"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-accent/20 min-h-[44px] w-full sm:w-auto flex-shrink-0"
              >
                Check My Case Free
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Add-ons */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${
              visible ? "animate-fadeSlideUp" : "opacity-0"
            }`}
            style={{ animationDelay: visible ? "150ms" : undefined, animationFillMode: "both" }}
          >
            <div className="rounded-xl p-4 sm:p-5 border border-border bg-card">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-foreground text-sm">
                  We Send It For You
                </span>
                <span className="flex items-center gap-0.5 text-sm font-bold text-foreground">
                  <span className="text-muted/70 text-xs">+</span>$29
                </span>
              </div>
              <p className="text-xs text-muted">
                Certified mail, delivery proof, auto follow-up.
              </p>
            </div>

            <div className="rounded-xl p-4 sm:p-5 border border-border bg-card">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-foreground text-sm">
                  Expert Case Review
                </span>
                <span className="flex items-center gap-0.5 text-sm font-bold text-foreground">
                  <span className="text-muted/70 text-xs">+</span>$49
                </span>
              </div>
              <p className="text-xs text-muted">
                Human review, case score, counter-argument prep.
              </p>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
            <svg
              className="h-4 w-4 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            <span className="text-xs font-semibold text-foreground">
              Don&rsquo;t recover? Full refund.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
