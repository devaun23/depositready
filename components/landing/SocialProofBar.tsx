"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const stats = [
  { value: "4.9 \u2605", label: "user rating" },
  { value: "2,400+", label: "renters helped" },
  { value: "$3.2M+", label: "analyzed" },
  { value: "16", label: "states covered" },
];

export function SocialProofBar() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-[var(--section-bg-alt)] py-8 md:py-10 px-4 sm:px-6"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-center divide-x divide-gray-200">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center px-6 sm:px-8 ${
              visible ? "animate-fadeSlideUp" : "opacity-0"
            }`}
            style={{ animationDelay: visible ? `${i * 100}ms` : undefined, animationFillMode: "both" }}
          >
            <p className="text-2xl sm:text-3xl font-extrabold text-brand">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
