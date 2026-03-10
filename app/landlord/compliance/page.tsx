import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui";
import { LandlordHero } from "@/components/landlord/shared/LandlordHero";
import { LandlordFeatures } from "@/components/landlord/shared/LandlordFeatures";
import { LandlordPricing } from "@/components/landlord/shared/LandlordPricing";
import { LandlordTrustSignals } from "@/components/landlord/shared/LandlordTrustSignals";
import { LandlordFAQ } from "@/components/landlord/shared/LandlordFAQ";

export const metadata: Metadata = {
  title: "Landlord Compliance Kit — Proactive Deposit Protection | DepositReady",
  description:
    "Audit your security deposit handling against state law. Get compliance checklists, required notices, and proper documentation templates. From $99.",
};

export default function ComplianceLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
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
              href="/landlord/defense"
              className="text-[var(--text-secondary)] hover:text-gray-900 transition-colors"
            >
              Defense Kit
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <LandlordHero
          title={"Handle deposits right.\nAvoid costly disputes."}
          subtitle="Run a full compliance audit against your state's security deposit laws. Get checklists, required notices, and proper documentation so you never face a valid tenant complaint."
          badge="Landlord Compliance Kit"
          ctaText="Get Your Compliance Kit — From $99"
          ctaHref="/landlord/compliance/intake"
        />
        <LandlordFeatures mode="compliance" />
        <LandlordPricing mode="compliance" />
        <LandlordTrustSignals />
        <LandlordFAQ mode="compliance" />
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
