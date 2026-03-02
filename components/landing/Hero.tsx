"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const suggestions = [
  "My landlord kept my deposit",
  "Unfair deductions from my deposit",
  "Landlord never returned my deposit",
  "How much can I recover?",
];

const avatars = [
  { initials: "SM", bg: "bg-indigo-100 text-indigo-700" },
  { initials: "MR", bg: "bg-amber-100 text-amber-700" },
  { initials: "JL", bg: "bg-emerald-100 text-emerald-700" },
  { initials: "DK", bg: "bg-rose-100 text-rose-700" },
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
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        {/* Headline */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "0ms", animationFillMode: "both" }}
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold text-gray-900 tracking-tight leading-[1.1]">
            Get your deposit{" "}
            <span className="animate-gradient-text">back.</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "80ms", animationFillMode: "both" }}
        >
          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-lg mx-auto">
            AI-powered deposit recovery — free to start.
          </p>
        </div>

        {/* ── THE INPUT BOX ─────────────────────────────────── */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "160ms", animationFillMode: "both" }}
        >
          <div className="relative mt-8 mx-auto max-w-xl">
            {/* Glow layer */}
            <div
              className="absolute -inset-1 rounded-2xl blur-xl animate-glow-pulse"
              style={{ background: "var(--glow-gradient)" }}
              aria-hidden="true"
            />

            {/* Input container — mirrors ChatInput style */}
            <div className="relative rounded-2xl bg-white shadow-elevated">
              <span className="block px-4 pt-3 pb-0 text-[11px] font-medium tracking-wide uppercase text-gray-300 select-none">
                Chat with Insight
              </span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  go(input);
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tell us what happened with your deposit..."
                  className="w-full bg-transparent px-4 pt-2 pb-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none min-h-[44px]"
                />

                {/* Toolbar — decorative, mirrors ChatInput */}
                <div className="flex items-center justify-between border-t border-gray-200/60 px-2 py-1.5">
                  {/* Left: decorative icons */}
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => router.push("/chat")}
                      title="Add photo"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-accent/5 hover:text-accent"
                      style={{ minHeight: "44px", minWidth: "44px" }}
                    >
                      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zM10.5 6.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push("/chat")}
                      title="Attach file"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-accent/5 hover:text-accent"
                      style={{ minHeight: "44px", minWidth: "44px" }}
                    >
                      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push("/chat")}
                      title="Voice input"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-accent/5 hover:text-accent"
                      style={{ minHeight: "44px", minWidth: "44px" }}
                    >
                      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </svg>
                    </button>
                  </div>

                  {/* Right: send button */}
                  <button
                    type="submit"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md"
                    style={{ minHeight: "44px", minWidth: "44px" }}
                    aria-label="Send message"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Suggestion chips */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "240ms", animationFillMode: "both" }}
        >
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {suggestions.map((chip) => (
              <button
                key={chip}
                onClick={() => go(chip)}
                className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm hover:shadow-md transition-all hover:border-accent hover:bg-accent/5 hover:text-accent active:scale-[0.97] min-h-[44px]"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Avatar stack + testimonial quote */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "320ms", animationFillMode: "both" }}
        >
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex items-center">
              {avatars.map((a, i) => (
                <div
                  key={a.initials}
                  className={`w-8 h-8 rounded-full ${a.bg} flex items-center justify-center text-xs font-semibold ring-2 ring-white ${i > 0 ? "-ml-2" : ""}`}
                >
                  {a.initials}
                </div>
              ))}
              <span className="ml-2 text-xs text-gray-400">+3 more</span>
            </div>
            <span className="text-sm italic text-gray-500">
              &ldquo;Got my full $2,400 back&rdquo; &mdash; Sarah M.
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          <p className="mt-8 text-xs text-gray-500 max-w-md mx-auto">
            Not a law firm. No legal advice. No guaranteed outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
