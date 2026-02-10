import Link from "next/link";
import { HeroCTA } from "./HeroCTA";

export function Hero() {
  return (
    <section className="min-h-[calc(100dvh-64px)] sm:min-h-0 flex flex-col justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 snap-start">
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight mb-6 md:mb-8">
          Your landlord missed a deadline.<br />
          That&apos;s not your problem.
        </h1>

        {/* Body Copy */}
        <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
          Check your state law in 30 seconds to see if you qualify to get your deposit back.
        </p>

        {/* Client component for interactive CTA */}
        <HeroCTA />

        {/* Testimonial */}
        <p className="text-sm text-gray-500 italic mb-3">
          &quot;Landlord was 3 weeks late. Got my full $2,300 back.&quot;
          <span className="not-italic"> — Marcus W., Georgia</span>
        </p>

        {/* Trust Line */}
        <p className="text-xs text-gray-500 mb-2">
          Starting at $29 · Court-ready case files from $79 · Secure checkout via Stripe
        </p>

        {/* Post-failure link */}
        <Link
          href="/next-steps"
          className="text-xs text-gray-400 hover:text-gray-600 transition"
        >
          Already sent a letter? Get next steps →
        </Link>
      </div>
    </section>
  );
}
