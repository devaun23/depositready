"use client";

import { useCallback, useEffect, useState } from "react";

interface ChatTestimonial {
  quote: string;
  name: string;
  location: string;
  amount: string;
  initials: string;
  color: string; // tailwind bg class for avatar
}

const TESTIMONIALS: ChatTestimonial[] = [
  {
    quote: "DepositReady found a violation I didn't even know about. Got my full deposit back within two weeks.",
    name: "Sarah M.",
    location: "California",
    amount: "$2,400",
    initials: "SM",
    color: "bg-violet-100 text-violet-700",
  },
  {
    quote: "I was so stressed about confronting my landlord. The demand letter made it professional and easy.",
    name: "Michael R.",
    location: "Texas",
    amount: "$1,800",
    initials: "MR",
    color: "bg-sky-100 text-sky-700",
  },
  {
    quote: "I found out my landlord was already 15 days late returning my deposit. That changed everything.",
    name: "Jessica L.",
    location: "New York",
    amount: "$3,200",
    initials: "JL",
    color: "bg-amber-100 text-amber-700",
  },
  {
    quote: "The case review helped me understand exactly what I was owed under Florida law. Worth every penny.",
    name: "David K.",
    location: "Florida",
    amount: "$4,100",
    initials: "DK",
    color: "bg-emerald-100 text-emerald-700",
  },
];

const ROTATION_INTERVAL = 8000;

export function ChatTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const advance = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      setIsTransitioning(false);
    }, 200);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(advance, ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, advance]);

  const t = TESTIMONIALS[activeIndex];

  return (
    <div
      className="p-5 space-y-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
        What renters are saying
      </h3>

      <div
        className={`transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          &ldquo;{t.quote}&rdquo;
        </p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2.5">
            {/* Avatar */}
            <div className={`flex items-center justify-center h-8 w-8 rounded-full text-xs font-semibold ring-2 ring-accent/20 ${t.color}`}>
              {t.initials}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">{t.name}</p>
              <p className="text-xs text-gray-500">{t.location}</p>
            </div>
          </div>
          <span className="text-accent font-semibold text-sm">
            {t.amount}
          </span>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 pt-1">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setActiveIndex(i);
                setIsTransitioning(false);
              }, 200);
            }}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex ? "w-4 bg-accent" : "w-1.5 bg-gray-200 hover:bg-gray-300"
            }`}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>

      <p className="text-[10px] text-gray-400 text-center leading-relaxed">
        Results vary. Not guaranteed outcomes.
      </p>
    </div>
  );
}
