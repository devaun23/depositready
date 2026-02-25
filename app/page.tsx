import dynamic from "next/dynamic";
import { Navbar, Hero } from "@/components/landing";
import { FeedbackBanner } from "@/components/landing/FeedbackBanner";
import { ViewLandingTracker } from "@/components/tracking";

// Below-fold sections — lazy loaded for faster initial paint
const HowItWorks = dynamic(
  () =>
    import("@/components/landing/HowItWorks").then((mod) => mod.HowItWorks),
  { ssr: true }
);

const Testimonials = dynamic(
  () =>
    import("@/components/landing/Testimonials").then(
      (mod) => mod.Testimonials
    ),
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

const Footer = dynamic(
  () => import("@/components/landing/Footer").then((mod) => mod.Footer),
  { ssr: true }
);

// Client component — imported directly (ssr:false not allowed in Server Components)
import { MobileCTA } from "@/components/landing/MobileCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <ViewLandingTracker />
      <Navbar />
      <FeedbackBanner />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
