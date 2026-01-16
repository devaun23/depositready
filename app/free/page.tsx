import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar, Footer } from "@/components/landing";
import { FreeLetterForm } from "@/components/free";
import { ViewFreeLandingTracker } from "@/components/tracking";

// Lazy load below-fold components
const WhatHappensNext = dynamic(
  () => import("@/components/free/WhatHappensNext").then((mod) => mod.WhatHappensNext),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "Free Security Deposit Demand Letter | DepositReady",
  description:
    "Get your free, personalized demand letter in 2 minutes. 90% of demand letters get a response. State-specific deadlines and legal references included.",
  openGraph: {
    title: "Free Security Deposit Demand Letter",
    description: "Get your free demand letter in 2 minutes. Don't let your landlord ignore you.",
  },
};

export default function FreeLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <ViewFreeLandingTracker />
      <Navbar />

      <main id="main-content">
        {/* Hero Section */}
        <section className="min-h-[calc(100dvh-64px)] sm:min-h-0 flex flex-col justify-center py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Headline */}
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight mb-4 md:mb-6">
              Get Your Security Deposit Back —{" "}
              <span className="text-green-600">Free</span> Demand Letter in 2 Minutes
            </h1>

            {/* Subheadline */}
            <p className="text-gray-600 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
              90% of demand letters get a response. Don&apos;t let your landlord ignore you.
            </p>

            {/* Form */}
            <FreeLetterForm />

            {/* Social Proof */}
            <div className="mt-10 space-y-3">
              <p className="text-sm text-gray-500 italic">
                &quot;Landlord was 3 weeks late. Got my full $2,300 back.&quot;
                <span className="not-italic"> — Marcus W., Georgia</span>
              </p>
              <p className="text-xs text-gray-400">
                Used by 847+ tenants in FL, CA, TX, NY, GA, IL
              </p>
            </div>
          </div>
        </section>

        {/* What Happens Next Section */}
        <WhatHappensNext />

        {/* Deadline Warning / Value Prop */}
        <section className="py-12 md:py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-4">
              Templates don&apos;t know your deadline
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Every state has different rules. Miss a deadline, and you lose leverage.
              Our free letter calculates your exact deadline based on your state law.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
              <div>
                <div className="text-2xl font-bold text-black">15</div>
                <div className="text-xs text-gray-500">days in FL</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-black">21</div>
                <div className="text-xs text-gray-500">days in CA</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-black">30</div>
                <div className="text-xs text-gray-500">days in TX</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-8 text-center">
              Common Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-black mb-2">
                  Is the demand letter really free?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes. You get a personalized, state-specific demand letter at no cost.
                  We offer a paid Recovery Package ($79) with additional tools if you want more support.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-black mb-2">
                  What if my landlord ignores the letter?
                </h3>
                <p className="text-gray-600 text-sm">
                  Most landlords respond within 14 days. If they don&apos;t, the Recovery Package
                  includes a small claims court guide to help you take next steps.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-black mb-2">
                  Is this legal advice?
                </h3>
                <p className="text-gray-600 text-sm">
                  No. DepositReady provides tools and templates based on state law, but we&apos;re not attorneys.
                  For legal advice, consult a licensed attorney in your state.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
