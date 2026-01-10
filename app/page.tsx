import dynamic from "next/dynamic";
import { Navbar, Hero } from "@/components/landing";
import { ViewLandingTracker } from "@/components/tracking";

// Below-fold components - lazy loaded for faster initial paint
// Using ssr: true to preserve SEO (content still renders server-side)
const WhatsIncluded = dynamic(
  () => import("@/components/landing/WhatsIncluded").then(mod => mod.WhatsIncluded),
  { ssr: true }
);

const HowItWorks = dynamic(
  () => import("@/components/landing/HowItWorks").then(mod => mod.HowItWorks),
  { ssr: true }
);

const Testimonials = dynamic(
  () => import("@/components/landing/Testimonials").then(mod => mod.Testimonials),
  { ssr: true }
);

const WhatWeDo = dynamic(
  () => import("@/components/landing/WhatWeDo").then(mod => mod.WhatWeDo),
  { ssr: true }
);

const Footer = dynamic(
  () => import("@/components/landing/Footer").then(mod => mod.Footer),
  { ssr: true }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <ViewLandingTracker />
      <Navbar />
      <main id="main-content">
        <Hero />
        <WhatsIncluded />
        <HowItWorks />
        <Testimonials />
        <WhatWeDo />
      </main>
      <Footer />
    </div>
  );
}
