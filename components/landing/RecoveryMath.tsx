"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export function RecoveryMath() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 px-4 bg-card border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className={`max-w-md mx-auto text-center ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.15em] mb-3">Recovery Math</p>
          <h2 className="text-2xl sm:text-3xl text-foreground mb-10">What renters actually recover</h2>
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted">Deposit withheld</span>
              <span className="font-serif text-lg text-foreground">$1,200</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted">Late return penalty</span>
              <span className="font-serif text-lg text-accent">+$1,200</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted">Bad faith penalty</span>
              <span className="font-serif text-lg text-accent">+$1,200</span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="font-semibold text-foreground">Total potential recovery</span>
              <span className="font-serif text-3xl text-foreground">$3,600</span>
            </div>
          </div>
          <a
            href="#claim-engine"
            className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-accent text-white text-base font-semibold rounded-2xl hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-xl shadow-accent/20 min-h-[44px]"
          >
            Check My Case Free
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
