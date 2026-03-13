"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export function FinalCTA() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 px-4 bg-accent-light border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className={`max-w-xl mx-auto text-center ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <h2 className="text-2xl sm:text-3xl text-foreground">
            You already paid the deposit.
          </h2>
          <p className="mt-3 text-lg text-muted">
            Now find out if your landlord owes it back.
          </p>
          <p className="mt-1 text-sm text-muted">Check your case in 60 seconds.</p>
          <a
            href="#claim-engine"
            className="inline-flex items-center gap-2 mt-8 px-10 py-4 bg-accent text-white text-lg font-semibold rounded-2xl hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-xl shadow-accent/20 min-h-[44px]"
          >
            Check My Case Free
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
