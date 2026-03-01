"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

function ChatBubbleIcon() {
  return (
    <svg
      className="w-7 h-7 text-brand"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function MagnifyingGlassIcon() {
  return (
    <svg
      className="w-7 h-7 text-brand"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      className="w-7 h-7 text-brand"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

const steps = [
  {
    icon: ChatBubbleIcon,
    title: "Tell us what happened",
    description:
      "Chat with Insight about your situation. It only takes a couple of minutes.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Get your case analysis",
    description:
      "We check your state's laws, calculate deadlines, and assess your case strength.",
  },
  {
    icon: SendIcon,
    title: "Send your recovery letter",
    description:
      "Download a state-specific recovery letter and evidence checklist — ready to send.",
  },
];

export function HowItWorks() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="how-it-works"
      className="py-16 md:py-24 px-4 sm:px-6 bg-white"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-10">
          How it works
        </h2>

        <div className="relative space-y-6">
          {/* Vertical dashed connecting line */}
          <div
            className="absolute left-6 top-6 bottom-6 border-l-2 border-dashed border-gray-200 pointer-events-none"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`relative flex gap-4 items-start bg-[var(--section-bg-alt)] rounded-xl p-6 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 ${
                visible ? "animate-fadeSlideUp" : "opacity-0"
              }`}
              style={{ animationDelay: visible ? `${i * 100}ms` : undefined, animationFillMode: "both" }}
            >
              {/* Icon with numbered badge */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-accent-light flex items-center justify-center shadow-[var(--shadow-card)]">
                  <step.icon />
                </div>
                {/* Number badge */}
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                  {i + 1}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-base font-semibold text-black mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
