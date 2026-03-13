"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { XCircle, CheckCircle2 } from "lucide-react";

const comparisons = [
  { template: "Generic wording", dr: "Diagnoses your specific violations" },
  { template: "No penalty math", dr: "Calculates statutory penalties" },
  { template: "You fill in the blanks", dr: "Built from your case facts" },
  { template: "No enforcement strategy", dr: "Escalation timeline if ignored" },
];

export function TemplatesFail() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className={`max-w-2xl mx-auto ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">Why Templates Fail</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
              A free template can&apos;t tell you if your landlord broke the law.
            </h2>
            <p className="mt-3 text-muted-foreground">Templates give you words. DepositReady gives you leverage.</p>
          </div>
          <div className="space-y-3">
            {comparisons.map((row) => (
              <div key={row.template} className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                  <XCircle className="h-4 w-4 text-destructive shrink-0" />
                  <span className="text-sm text-muted-foreground">{row.template}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-success/5 border border-success/10">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  <span className="text-sm text-foreground">{row.dr}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
