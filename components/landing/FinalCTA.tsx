"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  const { ref, visible } = useScrollReveal();

  const scrollToEngine = () => {
    document.getElementById("claim-engine")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 px-4 bg-accent-light border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className={`max-w-xl mx-auto text-center ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
            You already paid the deposit.
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Now find out if your landlord owes it back.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Check your case in 60 seconds.</p>
          <Button
            variant="hero"
            size="xl"
            className="mt-8 w-full sm:w-auto shadow-xl shadow-primary/20"
            onClick={scrollToEngine}
          >
            Check My Case Free
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
