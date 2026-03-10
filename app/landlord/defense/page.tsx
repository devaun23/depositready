import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui";
import { LandlordHero } from "@/components/landlord/shared/LandlordHero";
import { LandlordFeatures } from "@/components/landlord/shared/LandlordFeatures";
import { LandlordPricing } from "@/components/landlord/shared/LandlordPricing";
import { LandlordTestimonials } from "@/components/landlord/shared/LandlordTestimonials";
import { LandlordTrustSignals } from "@/components/landlord/shared/LandlordTrustSignals";
import { LandlordFAQ } from "@/components/landlord/shared/LandlordFAQ";

export const metadata: Metadata = {
  title: "Landlord Defense Kit — Respond to Tenant Threats | DepositReady",
  description:
    "Respond to tenant demand letters and legal threats with confidence. Get point-by-point rebuttals, deduction justifications, and state-specific legal defense. From $129.",
};

export default function DefenseLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/landlord/defense"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-black"
          >
            <Logo size="md" />
            <span className="hidden sm:inline">DepositReady</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/landlord"
              className="text-[var(--text-secondary)] hover:text-gray-900 transition-colors"
            >
              All Landlord Products
            </Link>
            <Link
              href="/landlord/compliance"
              className="text-[var(--text-secondary)] hover:text-gray-900 transition-colors"
            >
              Compliance Kit
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <LandlordHero
          title={"Tenant threatening legal action?\nRespond with confidence."}
          subtitle="Build a professional, legally-grounded response to tenant demands. Our defense tools help you document deductions, cite state law, and protect your position."
          badge="Landlord Defense Kit"
          ctaText="Get Your Defense Kit — From $129"
          ctaHref="/landlord/defense/intake"
        />
        <LandlordFeatures mode="defense" />
        <LandlordPricing mode="defense" />
        <LandlordTestimonials />
        <LandlordTrustSignals />
        <LandlordFAQ mode="defense" />
      </main>

      {/* Footer disclaimer */}
      <footer className="border-t border-gray-200 py-8 px-4">
        <p className="text-xs text-center text-gray-400 max-w-2xl mx-auto">
          DepositReady provides informational tools and document preparation
          services. We are not a law firm and do not provide legal advice. Consult
          a licensed attorney for legal guidance specific to your situation.
        </p>
      </footer>
    </div>
  );
}
