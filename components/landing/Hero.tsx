import { HeroCTA } from "./HeroCTA";

export function Hero() {
  return (
    <section className="py-16 pb-24 sm:pb-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight mb-6 md:mb-8">
          Your landlord missed a deadline.<br />
          That&apos;s not your problem.
        </h1>

        {/* Body Copy */}
        <div className="space-y-3 text-gray-600 text-base md:text-lg mb-10 md:mb-10 max-w-2xl mx-auto">
          <p>Check your state law in 30 seconds.</p>
          <p>Generate the letter renters use instead of hiring a lawyer.</p>
        </div>

        {/* Client component for interactive CTA */}
        <HeroCTA />

        {/* Social Proof */}
        <a href="#testimonials" className="text-sm text-gray-500 mb-6 underline hover:text-gray-700 block">
          Join 2,400+ renters who&apos;ve disputed unfair charges →
        </a>

        {/* Trust Blocks */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-8">
          <span className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secure checkout via Stripe
          </span>
          <span className="hidden sm:inline">·</span>
          <span>Used in FL, CA, TX, NY, GA, IL</span>
          <span className="hidden sm:inline">·</span>
          <span>Questions? <a href="mailto:support@depositready.com" className="underline hover:text-gray-700">support@depositready.com</a></span>
        </div>

        {/* Value Prop with Anchoring */}
        <div className="text-sm text-gray-600">
          <p className="font-medium">
            $39 · One-time · Instant
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Typical deposit: $1,000–$3,000. One letter can recover hundreds to
            thousands.
          </p>
        </div>
      </div>
    </section>
  );
}
