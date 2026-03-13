"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export function Pricing() {
  const { ref, visible } = useScrollReveal();

  const scrollToEngine = () => {
    document.getElementById("claim-engine")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBasicCheckout = async () => {
    scrollToEngine();
  };

  const handleProCheckout = async () => {
    scrollToEngine();
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="pricing"
      className="py-16 sm:py-24 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">Pricing</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">The verdict is free.</h2>
          <p className="mt-2 text-muted-foreground">Find out if you have a case in 60 seconds.</p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: visible ? "100ms" : undefined, animationFillMode: "both" }}>
          {/* Free Tier */}
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Free Verdict</p>
            <p className="font-serif text-3xl text-foreground mt-2">$0</p>
            <div className="mt-6 space-y-3">
              {["Violations detected", "Penalty estimate", "Case strength rating"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-foreground">{f}</span>
                </div>
              ))}
            </div>
            <Button variant="hero-outline" size="lg" className="w-full mt-6" onClick={scrollToEngine}>
              Check My Case Free
            </Button>
          </div>

          {/* Basic $39 */}
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Basic</p>
            <div className="flex items-baseline gap-1 mt-2">
              <p className="font-serif text-3xl text-foreground">$39</p>
              <span className="text-sm text-muted-foreground">one-time</span>
            </div>
            <div className="mt-6 space-y-3">
              {[
                "Demand letter generator",
                "Penalty calculator",
                "Evidence checklist",
                "Statute citations",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-foreground">{f}</span>
                </div>
              ))}
            </div>
            <Button variant="hero-outline" size="lg" className="w-full mt-6" onClick={handleBasicCheckout}>
              Get Basic
            </Button>
          </div>

          {/* Pro $79 */}
          <div className="rounded-xl border-2 border-primary bg-card p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Recommended
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pro</p>
            <div className="flex items-baseline gap-1 mt-2">
              <p className="font-serif text-3xl text-foreground">$79</p>
              <span className="text-sm text-muted-foreground">one-time</span>
            </div>
            <div className="mt-6 space-y-3">
              {[
                "Everything in Basic",
                "Certified mail delivery",
                "Enforcement timeline",
                "Small claims packet",
                "Claim tracking",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-foreground">{f}</span>
                </div>
              ))}
            </div>
            <Button
              variant="hero"
              size="lg"
              className="w-full mt-6 shadow-xl shadow-primary/20"
              onClick={handleProCheckout}
            >
              Get Pro
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className={`text-center mt-8 text-sm text-muted-foreground ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: visible ? "200ms" : undefined, animationFillMode: "both" }}>
          <ShieldCheck className="h-4 w-4 text-primary inline mr-1" />
          If DepositReady cannot identify a valid claim, you pay nothing.
        </p>
      </div>
    </section>
  );
}
