import { Metadata } from "next";
import { Navbar, Footer } from "@/components/landing";
import {
  LandlordHero,
  RiskCalculator,
  LandlordWhatsIncluded,
  ComparisonBlock,
  TrustSignals,
  LandlordCTA,
} from "@/components/landlord";

export const metadata: Metadata = {
  title: "Respond to a Tenant Demand Letter | DepositReady",
  description:
    "Got a demand letter from your tenant? Check your deadline and get a state-specific response kit for $79. Respond correctly before your deadline.",
  openGraph: {
    title: "Respond to a Tenant Demand Letter | DepositReady",
    description:
      "A tenant just sent you a demand letter. Check your deadline and get the tools to respond correctly — for $79, not $500/hour.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Respond to a Tenant Demand Letter | DepositReady",
    description:
      "A tenant just sent you a demand letter. Check your deadline and get the tools to respond correctly — for $79, not $500/hour.",
  },
};

export default function LandlordPage() {
  return (
    <div className="min-h-screen bg-white sm:snap-none snap-y snap-mandatory overflow-y-auto">
      <Navbar />
      <main id="main-content">
        <LandlordHero />
        <RiskCalculator />
        <LandlordWhatsIncluded />
        <ComparisonBlock />
        <TrustSignals />
      </main>
      <Footer />
      <LandlordCTA />
    </div>
  );
}
