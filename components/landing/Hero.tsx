import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight mb-8">
          Get your security deposit back with a professional dispute packet
        </h1>

        {/* Body Copy */}
        <div className="space-y-4 text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
          <p>
            Answer a few questions and get a complete documentation packet with
            a demand letter customized to your state&apos;s laws.
          </p>
          <p>
            Landlords respond when disputes are organized, documented, and
            reference legal deadlines.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button href="/wizard" size="lg">
            Build my packet
          </Button>
          <Button href="#whats-included" variant="outline" size="lg">
            See what&apos;s included
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-sm text-gray-500">
          Not a law firm. No legal advice. No guaranteed outcomes.
        </p>
      </div>
    </section>
  );
}
