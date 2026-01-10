import { ReactNode } from "react";

interface SEOHeroProps {
  title: string;
  intro: string;
  callout?: string;
}

export function SEOHero({ title, intro, callout }: SEOHeroProps) {
  return (
    <section className="py-12 md:py-16">
      <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight mb-6">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
        {intro}
      </p>
      {callout && (
        <p className="text-lg font-semibold text-black">
          {callout}
        </p>
      )}
    </section>
  );
}
