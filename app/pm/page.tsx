import { Metadata } from "next";
import { Navbar, Footer } from "@/components/landing";
import {
  PMHero,
  PMWhatsIncluded,
  PMComparisonBlock,
  PMPricing,
  PMTrustSignals,
  PMCTA,
} from "@/components/pm";

export const metadata: Metadata = {
  title: "Security Deposit Disposition Packets for Property Managers | DepositReady",
  description:
    "Generate FL §83.49-compliant deposit disposition packets in 10 minutes. Proper notice, itemized deductions, certified mail instructions — $29 per packet.",
  openGraph: {
    title: "Lawsuit-Proof Your Security Deposit Process | DepositReady",
    description:
      "Generate a FL §83.49-compliant deposit disposition packet for $29. Avoid lawsuits with proper documentation.",
    type: "website",
  },
};

export default function PMPage() {
  return (
    <div className="min-h-screen bg-white sm:snap-none snap-y snap-mandatory overflow-y-auto">
      <Navbar />
      <main id="main-content">
        <PMHero />
        <PMTrustSignals />
        <PMWhatsIncluded />
        <PMComparisonBlock />
        <PMPricing />
      </main>
      <Footer />
      <PMCTA />
    </div>
  );
}
