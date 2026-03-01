"use client";

import { useRef } from "react";

interface ChatTestimonial {
  quote: string;
  name: string;
  location: string;
  amount: string;
  initials: string;
  color: string;
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

// Doubled for seamless loop
const TICKER_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS];

export function ChatTestimonials() {
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (innerRef.current) innerRef.current.style.animationPlayState = "paused";
  };
  const handleMouseLeave = () => {
    if (innerRef.current) innerRef.current.style.animationPlayState = "running";
  };

  return (
    <div className="p-5 space-y-3">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
        What renters are saying
      </h3>

      <div
        className="overflow-hidden"
        style={{ height: 280 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={innerRef} className="animate-ticker-scroll">
          {TICKER_ITEMS.map((t, i) => (
            <div
              key={`${t.initials}-${i}`}
              className="py-3 border-b border-gray-100 last:border-b-0"
            >
              <p className="text-sm text-gray-600 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <div className={`flex items-center justify-center h-7 w-7 rounded-full text-[10px] font-semibold ring-2 ring-accent/20 ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-gray-900">{t.name}</p>
                    <p className="text-[10px] text-gray-500">{t.location}</p>
                  </div>
                </div>
                <span className="text-accent font-semibold text-sm">
                  {t.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-gray-400 text-center leading-relaxed">
        Results vary. Not guaranteed outcomes.
      </p>
    </div>
  );
}
