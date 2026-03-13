"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { Button } from "@/components/ui/Button";
import { Timer, AlertTriangle, ArrowRight } from "lucide-react";

export function Urgency() {
  const { ref, visible } = useScrollReveal();

  const scrollToEngine = () => {
    document.getElementById("claim-engine")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 px-4 bg-destructive/5 border-y border-destructive/10">
      <div className="max-w-5xl mx-auto">
        <div className={`max-w-2xl mx-auto text-center ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <div className="h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <Timer className="h-6 w-6 text-destructive" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
            Waiting can reduce your claim.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">Deposit laws have strict deadlines. If you wait too long:</p>
          <div className="mt-6 space-y-3 text-left max-w-sm mx-auto">
            {[
              "Penalty claims may expire",
              "Evidence becomes harder to prove",
              "Landlords face no consequences",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
          <Button
            variant="hero"
            size="lg"
            className="mt-10 shadow-xl shadow-primary/20"
            onClick={scrollToEngine}
          >
            Check your case now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
