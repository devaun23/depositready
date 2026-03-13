import dynamic from "next/dynamic";
import { Navbar, Hero } from "@/components/landing";
import { ViewLandingTracker } from "@/components/tracking";

// Below-fold sections — lazy loaded for faster initial paint
const ClaimEngine = dynamic(
  () =>
    import("@/components/landing/ClaimEngine").then((mod) => mod.ClaimEngine),
  { ssr: true }
);

const RealProblem = dynamic(
  () =>
    import("@/components/landing/RealProblem").then((mod) => mod.RealProblem),
  { ssr: true }
);

const RecoveryMath = dynamic(
  () =>
    import("@/components/landing/RecoveryMath").then((mod) => mod.RecoveryMath),
  { ssr: true }
);

const TemplatesFail = dynamic(
  () =>
    import("@/components/landing/TemplatesFail").then(
      (mod) => mod.TemplatesFail
    ),
  { ssr: true }
);

const HowItWorks = dynamic(
  () =>
    import("@/components/landing/HowItWorks").then((mod) => mod.HowItWorks),
  { ssr: true }
);

const SocialProof = dynamic(
  () =>
    import("@/components/landing/SocialProof").then((mod) => mod.SocialProof),
  { ssr: true }
);

const Urgency = dynamic(
  () => import("@/components/landing/Urgency").then((mod) => mod.Urgency),
  { ssr: true }
);

const Pricing = dynamic(
  () => import("@/components/landing/Pricing").then((mod) => mod.Pricing),
  { ssr: true }
);

const FAQ = dynamic(
  () => import("@/components/landing/FAQ").then((mod) => mod.FAQ),
  { ssr: true }
);

const FinalCTA = dynamic(
  () => import("@/components/landing/FinalCTA").then((mod) => mod.FinalCTA),
  { ssr: true }
);

const Footer = dynamic(
  () => import("@/components/landing/Footer").then((mod) => mod.Footer),
  { ssr: true }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ViewLandingTracker />
      <Navbar />
      <main id="main-content">
        <Hero />
        <ClaimEngine />
        <RealProblem />
        <RecoveryMath />
        <TemplatesFail />
        <HowItWorks />
        <SocialProof />
        <Urgency />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
