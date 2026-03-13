"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";

const recoveryCards = [
  { amount: "$2,400", reason: "Missed return deadline" },
  { amount: "$1,800", reason: "Illegal deduction notice" },
  { amount: "$3,200", reason: "Bad faith penalty" },
];

const testimonials = [
  { quote: "I had no idea my landlord missed the legal deadline.", name: "Sarah M.", state: "California", img: "/testimonials/sarah.jpg" },
  { quote: "I thought I had no case until DepositReady showed two violations.", name: "Michael R.", state: "Texas", img: "/testimonials/michael.jpg" },
  { quote: "The recovery packet cited the exact statute and my landlord paid within a week.", name: "Jessica L.", state: "New York", img: "/testimonials/jessica.jpg" },
];

export function SocialProof() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.15em] mb-3">Results</p>
          <h2 className="text-2xl sm:text-3xl text-foreground">Renters recovering their deposits</h2>
        </div>

        {/* Recovery cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: visible ? "100ms" : undefined, animationFillMode: "both" }}>
          {recoveryCards.map((card) => (
            <div key={card.amount} className="rounded-xl border border-border bg-card p-5 text-center">
              <p className="font-serif text-2xl text-foreground">{card.amount}</p>
              <p className="text-xs text-accent font-medium mt-1">recovered</p>
              <p className="text-xs text-muted mt-2">{card.reason}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: visible ? "200ms" : undefined, animationFillMode: "both" }}>
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm text-foreground italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <Image
                  src={t.img}
                  alt={t.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">{t.state}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
