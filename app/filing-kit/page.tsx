"use client";

import Link from "next/link";
import { Logo } from "@/components/ui";
import { useScrollReveal } from "@/lib/useScrollReveal";

const filingTestimonials = [
  {
    quote:
      "Filed in small claims and won my full deposit plus penalties. The damage calculation worksheet made it airtight.",
    name: "Marcus J.",
    location: "California",
    amount: "$4,600",
    initials: "MJ",
  },
  {
    quote:
      "The courtroom script gave me so much confidence. I knew exactly what to say to the judge and won my case.",
    name: "Aisha R.",
    location: "Texas",
    amount: "$2,100",
    initials: "AR",
  },
  {
    quote:
      "I had no idea how small claims even worked. The filing guide broke down every step for my state. So simple.",
    name: "Kevin P.",
    location: "Georgia",
    amount: "$1,750",
    initials: "KP",
  },
  {
    quote:
      "My landlord settled before the hearing after seeing my filing paperwork. Got $3,800 back without even going to court.",
    name: "Danielle S.",
    location: "New York",
    amount: "$3,800",
    initials: "DS",
  },
];

function FilingStarRow() {
  return (
    <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-[var(--accent-orange)]"
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

export default function FilingKitLandingPage() {
  const { ref: includedRef, visible: includedVisible } = useScrollReveal();
  const { ref: trustRef, visible: trustVisible } = useScrollReveal();
  const { ref: testimonialsRef, visible: testimonialsVisible } = useScrollReveal();
  const { ref: ctaRef, visible: ctaVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/filing-kit" className="flex items-center gap-2 font-serif text-xl font-semibold text-black">
            <Logo size="md" />
            <span className="hidden sm:inline">DepositReady</span>
          </Link>
          <Link
            href="/filing-kit/intake"
            className="bg-[var(--accent-orange)] text-white font-medium px-5 py-2 rounded-lg hover:bg-[var(--accent-orange-hover)] transition-colors text-sm"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, var(--accent-orange-light) 0%, #ffffff 50%, #ffffff 100%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="inline-block bg-[var(--accent-orange-light)] text-[var(--accent-orange)] text-xs font-semibold px-3 py-1 rounded-full mb-4 animate-fadeSlideUp"
          >
            NEW: Small Claims Filing Kit
          </div>
          <h1
            className="text-display font-serif font-semibold text-gray-900 animate-fadeSlideUp"
            style={{ animationDelay: "60ms", animationFillMode: "both" }}
          >
            Take your landlord to court.
            <br />
            <span className="text-[var(--accent-orange)]">We&apos;ll show you how.</span>
          </h1>
          <p
            className="text-lg text-gray-600 mt-4 max-w-xl mx-auto animate-fadeSlideUp"
            style={{ animationDelay: "120ms", animationFillMode: "both" }}
          >
            State-specific court filing documents, damage calculations, and step-by-step instructions.
            No lawyer needed.
          </p>
          <div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fadeSlideUp"
            style={{ animationDelay: "180ms", animationFillMode: "both" }}
          >
            <Link
              href="/filing-kit/intake"
              className="inline-flex items-center justify-center bg-[var(--accent-orange)] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[var(--accent-orange-hover)] hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg text-lg"
            >
              Start Your Filing Kit &mdash; From $79
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section
        ref={includedRef as React.RefObject<HTMLElement>}
        className="py-16 bg-gray-50 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-2xl font-serif font-semibold text-center text-gray-900 mb-10 ${
              includedVisible ? "animate-fadeSlideUp" : "opacity-0"
            }`}
          >
            What&apos;s included
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard */}
            <div
              className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-elevated transition-all duration-200 ${
                includedVisible ? "animate-fadeSlideUp" : "opacity-0"
              }`}
              style={{
                animationDelay: includedVisible ? "80ms" : undefined,
                animationFillMode: "both",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Standard</h3>
                <span className="text-2xl font-bold text-gray-900">$79</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-green-600 flex-shrink-0">&#10003;</span>
                  <span><strong>Damage calculation worksheet</strong> &mdash; deposit + statutory penalties + filing fees + interest</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 flex-shrink-0">&#10003;</span>
                  <span><strong>State-specific filing guide</strong> &mdash; which court, which forms, how to file</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 flex-shrink-0">&#10003;</span>
                  <span><strong>Service of process guide</strong> &mdash; sheriff vs. certified mail for your state</span>
                </li>
              </ul>
            </div>

            {/* Complete */}
            <div
              className={`bg-white rounded-xl border-2 border-[var(--accent-orange)] p-6 shadow-sm relative hover:-translate-y-0.5 hover:shadow-elevated transition-all duration-200 ${
                includedVisible ? "animate-fadeSlideUp" : "opacity-0"
              }`}
              style={{
                animationDelay: includedVisible ? "160ms" : undefined,
                animationFillMode: "both",
              }}
            >
              <span className="absolute -top-3 right-4 bg-[var(--accent-orange)] text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Complete</h3>
                <span className="text-2xl font-bold text-gray-900">$129</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-[var(--accent-orange)] flex-shrink-0">&#10003;</span>
                  <span>Everything in Standard</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent-orange)] flex-shrink-0">&#10003;</span>
                  <span><strong>Pre-filled statement of claim</strong> &mdash; your facts, organized for the judge</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent-orange)] flex-shrink-0">&#10003;</span>
                  <span><strong>Courtroom script</strong> &mdash; exactly what to say to the judge</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent-orange)] flex-shrink-0">&#10003;</span>
                  <span><strong>Post-judgment collection guide</strong> &mdash; how to actually collect if you win</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section
        ref={trustRef as React.RefObject<HTMLElement>}
        className="py-12 md:py-16 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: "\uD83D\uDCCD", title: "16-State Coverage", description: "Updated statutes and court procedures" },
              { icon: "\u2696\uFE0F", title: "Court-Ready Documents", description: "Formatted for small claims filing" },
              { icon: "\u26A1", title: "Instant Download", description: "Documents ready in minutes" },
            ].map((signal, i) => (
              <div
                key={signal.title}
                className={`flex flex-col items-center text-center ${
                  trustVisible ? "animate-fadeSlideUp" : "opacity-0"
                }`}
                style={{
                  animationDelay: trustVisible ? `${i * 80}ms` : undefined,
                  animationFillMode: "both",
                }}
              >
                <span
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-xl mb-3"
                  style={{ backgroundColor: "var(--accent-orange-light)" }}
                >
                  {signal.icon}
                </span>
                <h3 className="font-serif text-base font-semibold text-brand mb-1">
                  {signal.title}
                </h3>
                <p className="text-sm text-gray-600">{signal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef as React.RefObject<HTMLElement>}
        className="py-16 md:py-24 px-4 sm:px-6 bg-[var(--section-bg-alt)]"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-10">
            Tenants Who Took Action
          </h2>

          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
            {filingTestimonials.map((t, i) => (
              <div
                key={t.name}
                className={`w-[85vw] flex-shrink-0 snap-center md:w-auto bg-white/85 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${
                  testimonialsVisible ? "animate-fadeSlideUp" : "opacity-0"
                }`}
                style={{ animationDelay: testimonialsVisible ? `${i * 100}ms` : undefined, animationFillMode: "both" }}
              >
                <FilingStarRow />

                <p className="text-2xl font-bold text-[var(--accent-orange)] mb-3">
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
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[var(--accent-orange)]">
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

      {/* CTA */}
      <section
        ref={ctaRef as React.RefObject<HTMLElement>}
        className="py-16 px-4"
      >
        <div
          className={`max-w-2xl mx-auto text-center ${
            ctaVisible ? "animate-fadeSlideUp" : "opacity-0"
          }`}
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
            Ready to file?
          </h2>
          <p className="text-gray-600 mb-6">
            Answer a few questions about your case and get your filing documents in minutes.
          </p>
          <Link
            href="/filing-kit/intake"
            className="inline-flex items-center justify-center bg-[var(--accent-orange)] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[var(--accent-orange-hover)] hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <p className="text-center text-xs text-gray-500 max-w-xl mx-auto">
          DepositReady is not a law firm and does not provide legal advice. The Filing Kit
          provides informational tools and templates based on state law. For complex legal
          matters, consult a licensed attorney.
        </p>
      </footer>
    </div>
  );
}
