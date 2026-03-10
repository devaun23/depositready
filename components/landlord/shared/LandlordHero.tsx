"use client";

import Link from "next/link";

interface LandlordHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  badge?: string;
}

export function LandlordHero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  badge,
}: LandlordHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 px-4 sm:px-6">
      {/* Subtle amber gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, var(--accent-amber-light) 0%, #ffffff 50%, var(--accent-amber-light) 100%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center stagger-children">
        {badge && (
          <span
            className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase mb-6 animate-fadeSlideUp"
            style={{
              backgroundColor: "var(--accent-amber-light)",
              color: "var(--accent-amber-hover)",
            }}
          >
            {badge}
          </span>
        )}

        <h1
          className="font-serif text-display font-semibold text-brand animate-fadeSlideUp"
          style={{ animationDelay: "60ms", animationFillMode: "both" }}
        >
          {title}
        </h1>

        <p
          className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fadeSlideUp"
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
        >
          {subtitle}
        </p>

        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center mt-8 px-8 py-3.5 rounded-xl text-white font-medium text-base transition-all duration-200 hover:-translate-y-0.5 min-h-[44px] animate-fadeSlideUp"
          style={{
            backgroundColor: "var(--accent-amber)",
            animationDelay: "180ms",
            animationFillMode: "both",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--accent-amber-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--accent-amber)")
          }
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
