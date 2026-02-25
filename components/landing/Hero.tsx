import Link from "next/link";
import { DeadlineCalculator } from "./DeadlineCalculator";

export function Hero() {
  return (
    <section className="min-h-[calc(100dvh-64px)] sm:min-h-0 flex flex-col justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 snap-start">
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline — matches "how to get security deposit back" intent */}
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4 md:mb-6">
          <span className="text-brand">Get your deposit back.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
          Enter your state and move-out date. We&apos;ll show you exactly what your landlord owes.
        </p>

        {/* Inline Calculator */}
        <DeadlineCalculator />

        {/* Testimonial */}
        <p className="text-sm text-gray-500 italic mt-8 mb-3">
          &quot;Landlord was 3 weeks late. I got my full $2,300 back.&quot;
          <span className="not-italic"> — Marcus W., Georgia</span>
        </p>

        {/* Trust Line */}
        <p className="text-xs text-gray-500 mb-2">
          Starting at <span className="text-brand font-medium">$29</span> · Court-ready documents from <span className="text-brand font-medium">$79</span> · Secure checkout
        </p>

        {/* Post-failure link */}
        <Link
          href="/next-steps"
          className="text-xs text-gray-400 hover:text-gray-600 transition"
        >
          Already sent a letter? See what&apos;s next →
        </Link>
      </div>

    </section>
  );
}
