"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const signals = [
  {
    icon: "\u{1F4DA}",
    title: "State Law Database",
    description: "Updated statutes for 16 states",
  },
  {
    icon: "\u26A1",
    title: "Instant Download",
    description: "Documents ready in minutes",
  },
  {
    icon: "\u{1F6E1}\uFE0F",
    title: "Not Legal Advice",
    description: "Informational tools, not attorney services",
  },
];

export function LandlordTrustSignals() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-12 md:py-16 px-4 sm:px-6 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-3">
          {signals.map((signal, i) => (
            <div
              key={signal.title}
              className={`flex flex-col items-center text-center ${
                visible ? "animate-fadeSlideUp" : "opacity-0"
              }`}
              style={{
                animationDelay: visible ? `${i * 80}ms` : undefined,
                animationFillMode: "both",
              }}
            >
              <span
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-xl mb-3"
                style={{ backgroundColor: "var(--accent-amber-light)" }}
              >
                {signal.icon}
              </span>
              <h3 className="font-serif text-base font-semibold text-brand mb-1">
                {signal.title}
              </h3>
              <p className="text-sm text-gray-600">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
