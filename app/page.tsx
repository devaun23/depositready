import dynamic from "next/dynamic";
import { Navbar, Hero } from "@/components/landing";
import { ViewLandingTracker } from "@/components/tracking";

// Below-fold sections — lazy loaded for faster initial paint
const Testimonials = dynamic(
  () =>
    import("@/components/landing/Testimonials").then(
      (mod) => mod.Testimonials
    ),
  { ssr: true }
);

const HowItWorks = dynamic(
  () =>
    import("@/components/landing/HowItWorks").then((mod) => mod.HowItWorks),
  { ssr: true }
);

const ChatPreview = dynamic(
  () =>
    import("@/components/landing/ChatPreview").then((mod) => mod.ChatPreview),
  { ssr: true }
);

const TrustBullets = dynamic(
  () =>
    import("@/components/landing/TrustBullets").then(
      (mod) => mod.TrustBullets
    ),
  { ssr: true }
);

const Pricing = dynamic(
  () => import("@/components/landing/Pricing").then((mod) => mod.Pricing),
  { ssr: true }
);

const BlogPreview = dynamic(
  () =>
    import("@/components/landing/BlogPreview").then((mod) => mod.BlogPreview),
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
      <main id="main-content">
        <Hero />
        <Testimonials />
        <HowItWorks />
        <ChatPreview />
        <TrustBullets />
        <Pricing />
        <BlogPreview />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
