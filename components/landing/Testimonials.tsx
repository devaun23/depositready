"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";

const people = [
  {
    name: "Sarah M.",
    state: "California",
    amount: "$2,400",
    description: "Missed return deadline",
    quote:
      "I had no idea my landlord missed the legal deadline.",
    image: "/testimonials/sarah.jpg",
  },
  {
    name: "Michael R.",
    state: "Texas",
    amount: "$1,800",
    description: "Illegal deduction notice",
    quote:
      "I thought I had no case until DepositReady showed two violations.",
    image: "/testimonials/michael.jpg",
  },
  {
    name: "Jessica L.",
    state: "New York",
    amount: "$3,200",
    description: "Bad faith penalty",
    quote:
      "The recovery packet cited the exact statute and my landlord paid within a week.",
    image: "/testimonials/jessica.jpg",
  },
];

export function Testimonials() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding"
    >
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center text-foreground">
          Renters recovering their deposits
        </h2>

        {/* Stat cards row */}
        <div className="mt-10 sm:mt-12 grid gap-4 sm:grid-cols-3">
          {people.map((p, i) => (
            <div
              key={p.name + "-stat"}
              className={`rounded-2xl border border-border bg-section-bg p-6 text-center ${
                visible ? "animate-fadeSlideUp" : "opacity-0"
              }`}
              style={{
                animationDelay: visible ? `${i * 80}ms` : undefined,
                animationFillMode: "both",
              }}
            >
              <p className="text-3xl sm:text-4xl font-serif text-foreground">
                {p.amount}
              </p>
              <p className="mt-1 text-sm font-medium text-accent lowercase">
                recovered
              </p>
              <p className="mt-2 text-sm text-muted">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Quote cards row */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {people.map((p, i) => (
            <div
              key={p.name + "-quote"}
              className={`rounded-2xl border border-border bg-section-bg p-6 ${
                visible ? "animate-fadeSlideUp" : "opacity-0"
              }`}
              style={{
                animationDelay: visible ? `${(i + 3) * 80}ms` : undefined,
                animationFillMode: "both",
              }}
            >
              <p className="text-foreground text-sm italic leading-relaxed mb-4">
                &ldquo;{p.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover w-12 h-12"
                />
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {p.name}
                  </p>
                  <p className="text-xs text-muted">{p.state}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-muted/70">
          Outcomes depend on facts, timing, and local law.
        </p>
      </div>
    </section>
  );
}
