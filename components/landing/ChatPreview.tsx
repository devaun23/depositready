"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const USER_MESSAGE =
  "I moved out 6 weeks ago and my landlord still hasn\u2019t returned my $1,800 deposit.";

const ASSISTANT_MESSAGE =
  "I can help with that. What state did you rent in? I\u2019ll check your specific deadlines and what you may be owed.";

const TYPING_SPEED = 25; // ms per character
const SHIMMER_DURATION = 1200; // ms before typing starts

const chips = ["My landlord kept it", "Unfair deductions", "Not sure what to do"];

export function ChatPreview() {
  const [phase, setPhase] = useState<"idle" | "shimmer" | "typing" | "done">("idle");
  const [visibleChars, setVisibleChars] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger animation when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shimmer");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Shimmer → typing transition
  useEffect(() => {
    if (phase !== "shimmer") return;
    const timer = setTimeout(() => setPhase("typing"), SHIMMER_DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  // Progressive text reveal
  useEffect(() => {
    if (phase !== "typing") return;
    if (visibleChars >= ASSISTANT_MESSAGE.length) {
      setPhase("done");
      return;
    }
    const timer = setTimeout(
      () => setVisibleChars((c) => c + 1),
      TYPING_SPEED
    );
    return () => clearTimeout(timer);
  }, [phase, visibleChars]);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-4 sm:px-6 bg-[var(--section-bg-alt)]"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-10">
          Try it free. Right now.
        </h2>

        {/* Simulated chat window */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-[var(--shadow-elevated)] overflow-hidden max-w-md mx-auto">
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <span className="ml-2 text-xs text-gray-400 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Online
            </span>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-4 min-h-[200px]">
            {/* User message — always visible */}
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-brand/8 px-4 py-3 text-[15px] leading-relaxed text-gray-900">
                {USER_MESSAGE}
              </div>
            </div>

            {/* Shimmer thinking skeleton */}
            {phase === "shimmer" && (
              <div className="flex justify-start animate-messageEnter">
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white border border-gray-100/80 px-4 py-3 shadow-sm min-w-[180px]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <span className="text-[11px] text-gray-400">Analyzing...</span>
                  </div>
                  <div className="space-y-2">
                    <div className="shimmer-line" style={{ width: "85%" }} />
                    <div className="shimmer-line" style={{ width: "65%", animationDelay: "0.15s" }} />
                    <div className="shimmer-line" style={{ width: "75%", animationDelay: "0.3s" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Assistant response — typing animation */}
            {(phase === "typing" || phase === "done") && (
              <div className="flex justify-start animate-messageEnter">
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white border border-gray-100/80 px-4 py-3 text-[15px] leading-relaxed text-gray-900 shadow-sm">
                  {ASSISTANT_MESSAGE.slice(0, visibleChars)}
                  {phase === "typing" && (
                    <span className="inline-block w-0.5 h-[1.1em] bg-accent ml-0.5 rounded-sm animate-cursor-blink align-text-bottom" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Suggestion chips below window */}
          <div className="border-t border-gray-100 px-4 py-3 flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-500"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-lg font-medium rounded-xl hover:bg-accent-hover transition-colors shadow-md hover:shadow-lg"
          >
            Start Free Case Chat
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
