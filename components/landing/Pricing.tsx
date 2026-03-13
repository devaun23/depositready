"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export function Pricing() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="pricing"
      className="py-16 sm:py-24 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.15em] mb-3">Pricing</p>
          <h2 className="text-2xl sm:text-3xl text-foreground">The verdict is free.</h2>
          <p className="mt-2 text-muted">Find out if you have a case in 60 seconds.</p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: visible ? "100ms" : undefined, animationFillMode: "both" }}>
          {/* Free Tier */}
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs font-bold text-muted uppercase tracking-wider">Free Case Verdict</p>
            <p className="font-serif text-3xl text-foreground mt-2">$0</p>
            <div className="mt-6 space-y-3">
              {["Violations detected", "Penalty estimate", "Case strength rating"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  </svg>
                  <span className="text-foreground">{f}</span>
                </div>
              ))}
            </div>
            <a
              href="#claim-engine"
              className="flex items-center justify-center w-full mt-6 px-5 py-3 border-2 border-accent text-accent text-sm font-medium rounded-xl hover:bg-accent/5 transition-colors min-h-[44px]"
            >
              Check My Case Free
            </a>
          </div>

          {/* Paid Tier */}
          <div className="rounded-xl border-2 border-accent bg-card p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <p className="text-xs font-bold text-muted uppercase tracking-wider">Recovery Packet</p>
            <div className="flex items-baseline gap-1 mt-2">
              <p className="font-serif text-3xl text-foreground">$39</p>
              <span className="text-sm text-muted">one-time</span>
            </div>
            <div className="mt-6 space-y-3">
              {[
                "Demand letter citing violations",
                "Penalty calculations with statutes",
                "Evidence checklist",
                "Follow-up escalation timeline",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  </svg>
                  <span className="text-foreground">{f}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <p className="text-xs text-muted font-medium">Optional:</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Certified Mail</span>
                <span className="text-foreground font-medium">+$29</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Expert Case Review</span>
                <span className="text-foreground font-medium">+$49</span>
              </div>
            </div>
            <a
              href="#claim-engine"
              className="flex items-center justify-center gap-2 w-full mt-6 px-6 py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-xl shadow-accent/20 min-h-[44px]"
            >
              Get My Recovery Packet
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>

        <p className={`text-center mt-8 text-sm text-muted ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: visible ? "200ms" : undefined, animationFillMode: "both" }}>
          <svg className="h-4 w-4 text-accent inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          If DepositReady cannot identify a valid claim, you pay nothing.
        </p>
      </div>
    </section>
  );
}
