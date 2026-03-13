"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function RecoveryMath() {
  const { ref, visible } = useScrollReveal();

  const scrollToEngine = () => {
    document.getElementById("claim-engine")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 px-4 bg-card border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className={`max-w-md mx-auto text-center ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">Recovery Math</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-10">What renters actually recover</h2>
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Deposit withheld</span>
              <span className="font-serif text-lg text-foreground">$1,200</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Late return penalty</span>
              <span className="font-serif text-lg text-primary">+$1,200</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Bad faith penalty</span>
              <span className="font-serif text-lg text-primary">+$1,200</span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="font-semibold text-foreground">Total potential recovery</span>
              <span className="font-serif text-3xl text-foreground">$3,600</span>
            </div>
          </div>
          <Button
            variant="hero"
            size="lg"
            className="mt-10 w-full sm:w-auto shadow-xl shadow-primary/20"
            onClick={scrollToEngine}
          >
            Check My Case Free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
