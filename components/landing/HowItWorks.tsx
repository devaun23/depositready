"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { Search, AlertTriangle, Send } from "lucide-react";

const steps = [
  { icon: Search, step: "1", title: "Check your case", desc: "Enter your deposit details and timeline." },
  { icon: AlertTriangle, step: "2", title: "See violations", desc: "DepositReady analyzes deposit law and identifies violations." },
  { icon: Send, step: "3", title: "Send enforcement packet", desc: "Download your demand letter or have us send it for you." },
];

export function HowItWorks() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="how-it-works" className="py-16 sm:py-24 px-4 bg-card border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">How It Works</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">Simple 3-step process</h2>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: visible ? "100ms" : undefined, animationFillMode: "both" }}>
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs font-bold text-primary mb-1">Step {item.step}</p>
              <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
