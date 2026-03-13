"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { XCircle } from "lucide-react";

export function RealProblem() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className={`max-w-2xl mx-auto text-center ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">The Real Problem</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
            Most renters don&apos;t know their landlord broke the law.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Deposit laws contain strict rules landlords must follow. When they fail, penalties apply.
          </p>
        </div>
        <div className={`mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: visible ? "100ms" : undefined, animationFillMode: "both" }}>
          {[
            "Missing the legal deadline to return the deposit",
            "Failing to provide itemized deductions",
            "Withholding deposits in bad faith",
            "Not storing deposits according to state law",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
              <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>
        <p className={`text-center mt-8 text-sm font-medium text-primary ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: visible ? "200ms" : undefined, animationFillMode: "both" }}>
          DepositReady identifies these violations automatically.
        </p>
      </div>
    </section>
  );
}
