import dynamic from "next/dynamic";
import { Navbar, Hero } from "@/components/landing";
import { ViewLandingTracker } from "@/components/tracking";

// Below-fold sections — lazy loaded for faster initial paint
const ProductDemo = dynamic(
  () =>
    import("@/components/landing/ProductDemo").then((mod) => mod.ProductDemo),
  { ssr: true }
);

const MoneyProof = dynamic(
  () =>
    import("@/components/landing/MoneyProof").then((mod) => mod.MoneyProof),
  { ssr: true }
);

const WhyNotChatGPT = dynamic(
  () =>
    import("@/components/landing/WhyNotChatGPT").then(
      (mod) => mod.WhyNotChatGPT
    ),
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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <ViewLandingTracker />
      <Navbar />
      <main id="main-content">
        <Hero />
        <ProductDemo />
        <MoneyProof />
        <WhyNotChatGPT />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
