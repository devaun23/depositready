"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const testimonials = [
  {
    quote:
      "DepositReady found a violation I didn't even know about. Got my full deposit back within two weeks.",
    name: "Sarah M.",
    location: "California",
    amount: "$2,400",
    initials: "SM",
  },
  {
    quote:
      "I was so stressed about confronting my landlord. The recovery letter made it professional and easy.",
    name: "Michael R.",
    location: "Texas",
    amount: "$1,800",
    initials: "MR",
  },
  {
    quote:
      "I found out my landlord was already 15 days late returning my deposit. That changed everything.",
    name: "Jessica L.",
    location: "New York",
    amount: "$3,200",
    initials: "JL",
  },
  {
    quote:
      "The chat walked me through my rights step by step. I had my letter sent the same day.",
    name: "David K.",
    location: "Georgia",
    amount: "$1,450",
    initials: "DK",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-accent"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { ref: sectionRef, visible } = useScrollReveal();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="testimonials"
      className="py-16 md:py-24 px-4 sm:px-6 bg-[var(--section-bg-alt)]"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-10">
          Real Renters. Real Results.
        </h2>

        {/* Mobile: horizontal scroll carousel / Desktop: 2-col grid */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`w-[85vw] flex-shrink-0 snap-center md:w-auto bg-white/85 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${
                visible ? "animate-fadeSlideUp" : "opacity-0"
              }`}
              style={{ animationDelay: visible ? `${i * 100}ms` : undefined, animationFillMode: "both" }}
            >
              <StarRow />

              <p className="text-2xl font-bold text-accent mb-3">
                {t.amount}{" "}
                <span className="text-sm font-normal text-gray-500">
                  recovered
                </span>
              </p>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-black">{t.name}</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-gray-500">{t.location}</p>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-accent">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-gray-400 max-w-lg">
          Outcomes depend on facts, timing, and local law. These reflect
          personal experiences.
        </p>
      </div>
    </section>
  );
}
