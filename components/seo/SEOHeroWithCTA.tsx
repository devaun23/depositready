import Link from "next/link";

interface SEOHeroWithCTAProps {
  title: string;
  subtitle: string;
  intro: string;
  primaryButton: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  tagline?: string;
}

export function SEOHeroWithCTA({
  title,
  subtitle,
  intro,
  primaryButton,
  secondaryButton,
  tagline,
}: SEOHeroWithCTAProps) {
  return (
    <section className="py-12 md:py-16">
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{title}</h1>
      <p className="text-xl text-gray-600 mb-4">{subtitle}</p>
      <p className="text-gray-600 mb-6">{intro}</p>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap mb-8">
        <Link
          href={primaryButton.href}
          className="inline-block rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition text-center"
        >
          {primaryButton.text}
        </Link>
        {secondaryButton && (
          <Link
            href={secondaryButton.href}
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            {secondaryButton.text}
          </Link>
        )}
      </div>

      {tagline && <p className="text-sm text-gray-500">{tagline}</p>}
    </section>
  );
}
