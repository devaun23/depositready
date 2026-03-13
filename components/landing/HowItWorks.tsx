"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const steps = [
  {
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
      </svg>
    ),
    step: "1",
    title: "Check your case",
    desc: "Enter your deposit details and timeline.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    step: "2",
    title: "See violations",
    desc: "DepositReady analyzes deposit law and identifies violations.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
    step: "3",
    title: "Send enforcement packet",
    desc: "Download your demand letter or have us send it for you.",
  },
];

export function HowItWorks() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="how-it-works" className="py-16 sm:py-24 px-4 bg-card border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.15em] mb-3">How It Works</p>
          <h2 className="text-2xl sm:text-3xl text-foreground">Simple 3-step process</h2>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: visible ? "100ms" : undefined, animationFillMode: "both" }}>
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <p className="text-xs font-bold text-accent mb-1">Step {item.step}</p>
              <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
