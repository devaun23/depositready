import {
  Navbar,
  Hero,
  WhatWeDo,
  WhatsIncluded,
  HowItWorks,
  Testimonials,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content">
        <Hero />
        <WhatWeDo />
        <WhatsIncluded />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
