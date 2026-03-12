"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const gaps = [
  {
    template: "Generic wording",
    depositready: "Diagnoses your specific violations",
    // Search icon
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    template: "No penalty math",
    depositready: "Calculates 2-3× statutory penalties",
    // Calculator icon
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
      </svg>
    ),
  },
  {
    template: "You fill in the blanks",
    depositready: "Pre-built from your case facts",
    // FileText icon
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    template: "No follow-up plan",
    depositready: "Escalation path if they ignore you",
    // FileX icon
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
];

export function WhyNotChatGPT() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="section-padding">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900">
            Why a free template won&rsquo;t work
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Templates give you words. You need a verdict, leverage, and a plan.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 space-y-3">
          {gaps.map((g, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-gray-200/50 ${
                visible ? "animate-fadeSlideUp" : "opacity-0"
              }`}
              style={{ animationDelay: visible ? `${i * 60}ms` : undefined, animationFillMode: "both" }}
            >
              <div className="h-8 w-8 rounded-lg bg-gray-100 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                {g.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-sm text-gray-400 line-through">{g.template}</span>
                  <span className="hidden sm:block text-gray-300">→</span>
                  <span className="text-sm font-semibold text-gray-900">{g.depositready}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
