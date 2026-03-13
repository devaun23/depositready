"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export function Urgency() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 px-4 bg-destructive/5 border-y border-destructive/10">
      <div className="max-w-5xl mx-auto">
        <div className={`max-w-2xl mx-auto text-center ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <div className="h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            {/* Timer icon */}
            <svg className="h-6 w-6 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl text-foreground">
            Waiting can reduce your claim.
          </h2>
          <p className="mt-4 text-muted leading-relaxed">Deposit laws have strict deadlines. If you wait too long:</p>
          <div className="mt-6 space-y-3 text-left max-w-sm mx-auto">
            {[
              "Penalty claims may expire",
              "Evidence becomes harder to prove",
              "Landlords face no consequences",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                {/* AlertTriangle */}
                <svg className="h-4 w-4 text-destructive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
          <a
            href="#claim-engine"
            className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-accent text-white text-base font-semibold rounded-2xl hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-xl shadow-accent/20 min-h-[44px]"
          >
            Check your case now
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
