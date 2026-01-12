import { HeroCTA } from "./HeroCTA";

export function Hero() {
  return (
    <section className="py-12 pb-20 sm:pb-12 md:py-16 px-4 sm:px-6">
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
        <p className="text-xs text-gray-500">
          $39 one-time · Secure checkout via Stripe · Used in FL, CA, TX, NY, GA, IL
        </p>
      </div>
    </section>
  );
}
