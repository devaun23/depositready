import { getDeadlineRange } from "@/lib/landlord";

export function LandlordHero() {
  const { min, max } = getDeadlineRange();

  return (
    <section className="min-h-[calc(100dvh-64px)] sm:min-h-0 flex flex-col justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 snap-start">
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight mb-6 md:mb-8">
          A Tenant Just Sent You a Demand Letter.
          <br />
          <span className="text-gray-600">
            You Have {min}–{max} Days to Respond.
          </span>
        </h1>

        {/* Subheadline - Price Anchor */}
        <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
          A landlord-tenant lawyer charges $200–$500 per hour.
          <br className="hidden sm:block" />
          This response kit is <span className="font-semibold text-black">$79</span>.
        </p>

        {/* CTA to scroll to calculator */}
        <a
          href="#risk-calculator"
          className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-lg font-medium rounded hover:bg-gray-800 transition-colors min-h-[48px] mb-6"
        >
          Check My Deadline & Respond Safely
        </a>

        {/* Trust Line */}
        <p className="text-xs text-gray-500">
          No subscription · No court filing · No legal jargon
        </p>
      </div>
    </section>
  );
}
