import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Small Claims Filing Kit — Court-Ready Documents | DepositReady",
  description:
    "Everything you need to file a small claims case for your security deposit. State-specific filing instructions, damage worksheets, and courtroom scripts.",
};

export default function FilingKitLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold text-black">
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
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-[var(--accent-orange-light)] text-[var(--accent-orange)] text-xs font-semibold px-3 py-1 rounded-full mb-4">
            NEW: Small Claims Filing Kit
          </div>
          <h1 className="text-display font-serif font-semibold text-gray-900">
            Take your landlord to court.
            <br />
            <span className="text-[var(--accent-orange)]">We&apos;ll show you how.</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
            State-specific court filing documents, damage calculations, and step-by-step instructions.
            No lawyer needed.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/filing-kit/intake"
              className="inline-flex items-center justify-center bg-[var(--accent-orange)] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[var(--accent-orange-hover)] transition-all shadow-md hover:shadow-lg text-lg"
            >
              Start Your Filing Kit &mdash; From $79
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-semibold text-center text-gray-900 mb-10">
            What&apos;s included
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
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
            <div className="bg-white rounded-xl border-2 border-[var(--accent-orange)] p-6 shadow-sm relative">
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

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
            Ready to file?
          </h2>
          <p className="text-gray-600 mb-6">
            Answer a few questions about your case and get your filing documents in minutes.
          </p>
          <Link
            href="/filing-kit/intake"
            className="inline-flex items-center justify-center bg-[var(--accent-orange)] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[var(--accent-orange-hover)] transition-all shadow-md"
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
