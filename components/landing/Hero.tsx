"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const suggestions = [
  "My landlord kept my deposit",
  "Unfair deductions from my deposit",
  "Landlord never returned my deposit",
  "How much can I recover?",
];

export function Hero() {
  const router = useRouter();
  const [input, setInput] = useState("");

  function go(message: string) {
    if (!message.trim()) return;
    router.push(`/chat?message=${encodeURIComponent(message.trim())}`);
  }

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 bg-gradient-to-b from-brand-bg/30 via-white to-white overflow-hidden">
      {/* Subtle grid overlay — Superdesign atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-1.5 text-sm font-medium text-accent mb-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Free AI-Powered Analysis
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold text-brand tracking-tight leading-[1.1]">
          Get your deposit{" "}
          <span className="animate-gradient-text">back.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-500 text-base md:text-lg max-w-lg mx-auto">
          Describe your situation. Get instant legal guidance.
        </p>

        {/* ── THE INPUT BOX ─────────────────────────────────── */}
        <div className="relative mt-8 mx-auto max-w-xl">
          {/* Glow layer */}
          <div
            className="absolute -inset-1 rounded-2xl blur-lg animate-glow-pulse"
            style={{ background: "var(--glow-gradient)" }}
            aria-hidden="true"
          />

          {/* Input container */}
          <div className="relative rounded-2xl bg-white shadow-elevated p-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                go(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="My landlord kept my security deposit..."
                className="flex-1 rounded-xl bg-transparent px-4 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none min-h-[44px]"
              />
              <button
                type="submit"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white hover:bg-accent-hover transition-colors mr-0.5"
                aria-label="Send message"
              >
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
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {suggestions.map((chip) => (
            <button
              key={chip}
              onClick={() => go(chip)}
              className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 shadow-sm transition-all hover:border-accent hover:bg-accent/5 hover:text-accent active:scale-[0.97] min-h-[44px]"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Star rating */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="flex" aria-label="4.9 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-accent"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            <span className="font-semibold text-black">4.9</span> from 180+
            reviews
          </span>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-gray-400 max-w-md mx-auto">
          Not a law firm. No legal advice. No guaranteed outcomes.
        </p>
      </div>
    </section>
  );
}
