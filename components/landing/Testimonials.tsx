"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const testimonials = [
  {
    amount: "$2,400",
    quote:
      "I had no idea my landlord missed the legal deadline. DepositReady found it and showed me I was owed triple.",
    name: "Sarah M.",
    state: "California",
    initials: "SM",
  },
  {
    amount: "$1,800",
    quote:
      "I thought I had no case. The free check showed two violations I didn't know existed.",
    name: "Michael R.",
    state: "Texas",
    initials: "MR",
  },
  {
    amount: "$3,200",
    quote:
      "The recovery packet cited the exact statute my landlord violated. He paid within a week.",
    name: "Jessica L.",
    state: "New York",
    initials: "JL",
  },
  {
    amount: "$1,450",
    quote:
      "A free template wouldn't have found the penalty. DepositReady did.",
    name: "David K.",
    state: "Georgia",
    initials: "DK",
  },
];

const initialsColors: Record<string, string> = {
  SM: "bg-accent-light text-accent",
  MR: "bg-amber-100 text-amber-700",
  JL: "bg-emerald-100 text-emerald-700",
  DK: "bg-rose-100 text-rose-700",
};

export function Testimonials() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding"
    >
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center text-foreground">
          They didn&rsquo;t know they had a case.
        </h2>

        <div className="mt-10 sm:mt-12 grid gap-4 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`glass-card glass-card-hover rounded-2xl p-5 sm:p-6 ${
                visible ? "animate-fadeSlideUp" : "opacity-0"
              }`}
              style={{
                animationDelay: visible ? `${i * 80}ms` : undefined,
                animationFillMode: "both",
              }}
            >
              {/* Recovery amount */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl sm:text-2xl font-bold text-success">
                  {t.amount}
                </span>
                <span className="text-[10px] font-medium text-success uppercase">
                  recovered
                </span>
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed text-sm mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${
                    initialsColors[t.initials] || "bg-section-bg-alt text-muted"
                  }`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">{t.state}</p>
                </div>
                {/* Verified badge */}
                <div className="ml-auto flex items-center gap-1 text-xs text-accent">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified
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
