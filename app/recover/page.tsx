"use client";

import { useState, useCallback, useRef } from "react";
import { Navbar, Footer } from "@/components/landing";
import { FreeDemandLetter } from "@/components/free";
import { LetterPreviewOverlay } from "@/components/preview/LetterPreviewOverlay";
import { PricingCard } from "@/components/recover/PricingCard";
import { Input, Select, Button } from "@/components/ui";
import { STATE_OPTIONS } from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules";

interface LetterData {
  email: string;
  stateCode: StateCode;
  stateName: string;
  statuteTitle: string;
  statuteUrl: string;
  depositAmount: number;
  moveOutDate: string;
  landlordName?: string;
  returnDeadline: string;
  deadlinePassed: boolean;
  damagesMultiplier: number;
  damagesDescription: string;
  potentialRecovery: number;
}

export default function RecoverPage() {
  const [form, setForm] = useState({
    email: "",
    stateCode: "",
    depositAmount: "",
    moveOutDate: "",
    landlordName: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [letterData, setLetterData] = useState<LetterData | null>(null);
  const [error, setError] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setError("");
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isGenerating) return;

      // Basic validation
      if (!form.email || !form.stateCode || !form.depositAmount || !form.moveOutDate) {
        setError("Please fill in all required fields.");
        return;
      }

      setIsGenerating(true);
      setError("");

      try {
        const response = await fetch("/api/free-letter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            stateCode: form.stateCode,
            depositAmount: parseFloat(form.depositAmount),
            moveOutDate: form.moveOutDate,
            landlordName: form.landlordName || undefined,
            utmSource: "recover_page",
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Something went wrong. Please try again.");
          return;
        }

        setLetterData({
          email: form.email,
          stateCode: result.stateCode,
          stateName: result.stateName,
          statuteTitle: result.statuteTitle,
          statuteUrl: result.statuteUrl,
          depositAmount: parseFloat(form.depositAmount),
          moveOutDate: form.moveOutDate,
          landlordName: form.landlordName || undefined,
          returnDeadline: result.returnDeadline,
          deadlinePassed: result.deadlinePassed,
          damagesMultiplier: result.damagesMultiplier,
          damagesDescription: result.damagesDescription,
          potentialRecovery: result.potentialRecovery,
        });

        // Scroll to preview after a brief delay for render
        setTimeout(() => {
          previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } catch {
        setError("Network error. Please check your connection and try again.");
      } finally {
        setIsGenerating(false);
      }
    },
    [form, isGenerating]
  );

  const scrollToPricing = useCallback(() => {
    previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="py-8 md:py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight mb-4">
              See your demand letter in 60 seconds
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Enter your details below and we&apos;ll generate a personalized,
              state-specific demand letter you can preview instantly.
            </p>
          </div>

          {/* Quick Form */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <Select
                  label="State"
                  name="stateCode"
                  value={form.stateCode}
                  onChange={handleChange}
                  options={STATE_OPTIONS}
                  placeholder="Select your state"
                  required
                />
                <Input
                  label="Security Deposit"
                  name="depositAmount"
                  type="number"
                  placeholder="$1,500"
                  min="1"
                  step="0.01"
                  value={form.depositAmount}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Move-out Date"
                  name="moveOutDate"
                  type="date"
                  value={form.moveOutDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Landlord Name"
                name="landlordName"
                placeholder="Optional — we'll use [Landlord Name] as placeholder"
                value={form.landlordName}
                onChange={handleChange}
              />

              {error && (
                <p className="text-red-600 text-sm mt-3">{error}</p>
              )}

              <div className="mt-6">
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  loading={isGenerating}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate My Letter"}
                </Button>
              </div>

              <p className="text-xs text-gray-400 text-center mt-3">
                Free preview · No credit card required · Takes 10 seconds
              </p>
            </form>
          </div>

          {/* Letter Preview + Pricing (shown after form submit) */}
          {letterData && (
            <div ref={previewRef} className="scroll-mt-8">
              {/* Section header */}
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-2">
                  Your Personalized Demand Letter
                </h2>
                <p className="text-gray-600">
                  Based on {letterData.stateName} law ({letterData.statuteTitle})
                </p>
              </div>

              {/* Two column layout */}
              <div className="grid lg:grid-cols-3 gap-6 items-start">
                {/* Letter Preview — 2 columns */}
                <div className="lg:col-span-2">
                  <LetterPreviewOverlay onUnlock={scrollToPricing}>
                    <FreeDemandLetter
                      landlordName={letterData.landlordName}
                      stateCode={letterData.stateCode}
                      stateName={letterData.stateName}
                      statuteTitle={letterData.statuteTitle}
                      depositAmount={letterData.depositAmount}
                      moveOutDate={letterData.moveOutDate}
                      returnDeadline={letterData.returnDeadline}
                      deadlinePassed={letterData.deadlinePassed}
                      damagesMultiplier={letterData.damagesMultiplier}
                      damagesDescription={letterData.damagesDescription}
                    />
                  </LetterPreviewOverlay>
                </div>

                {/* Pricing Sidebar — 1 column, sticky */}
                <div className="lg:col-span-1">
                  <div className="lg:sticky lg:top-24">
                    <PricingCard
                      email={letterData.email}
                      stateCode={letterData.stateCode}
                      depositAmount={letterData.depositAmount}
                      moveOutDate={letterData.moveOutDate}
                      landlordName={letterData.landlordName}
                      potentialRecovery={letterData.potentialRecovery}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Social proof & FAQ (always visible) */}
          <div className="mt-16 max-w-3xl mx-auto">
            {/* Social Proof */}
            <div className="text-center mb-12">
              <p className="text-sm text-gray-500 italic mb-1">
                &quot;Landlord was 3 weeks late. Got my full $2,300 back.&quot;
                <span className="not-italic"> — Marcus W., Georgia</span>
              </p>
              <p className="text-sm text-gray-500 italic">
                &quot;Sent the letter Monday, got a check Friday.&quot;
                <span className="not-italic"> — Sarah K., California</span>
              </p>
            </div>

            {/* How It Works */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-black text-center mb-8">
                How It Works
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    step: "1",
                    title: "Preview Your Letter",
                    desc: "Enter your details and see your personalized demand letter instantly.",
                  },
                  {
                    step: "2",
                    title: "Download & Send",
                    desc: "Get the court-ready PDF, fill in remaining details, and send via certified mail.",
                  },
                  {
                    step: "3",
                    title: "Recover Your Deposit",
                    desc: "Most landlords respond within 14 days. If not, you're ready for small claims.",
                  },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-black text-white rounded-full font-bold mb-3">
                      {item.step}
                    </div>
                    <h3 className="font-medium text-black mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-black text-center mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: "Is the preview really free?",
                    a: "Yes. You can see your personalized letter with no credit card required. You only pay when you want the downloadable, court-ready PDF.",
                  },
                  {
                    q: "What's the difference between $29 and $79?",
                    a: "The $29 Recovery Kit includes your demand letter, evidence checklist, and court guide. The $79 Full Package adds a deductions dispute table and priority support.",
                  },
                  {
                    q: "Is this legal advice?",
                    a: "No. DepositReady provides tools and templates based on your state's security deposit law. For specific legal questions, consult a licensed attorney.",
                  },
                  {
                    q: "How long does recovery take?",
                    a: "Most landlords respond within 14 days of receiving a formal demand letter. If they don't, you'll have everything you need to file in small claims court.",
                  },
                ].map((faq) => (
                  <details
                    key={faq.q}
                    className="bg-white border border-gray-200 rounded-lg p-4 group"
                  >
                    <summary className="font-medium text-black cursor-pointer list-none flex items-center justify-between">
                      {faq.q}
                      <svg
                        className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <p className="text-sm text-gray-600 mt-3">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-center mt-12">
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              DepositReady provides tools and templates based on state law. This
              is not legal advice. For legal questions, consult a licensed
              attorney in your state.
            </p>
          </div>
        </div>
      </main>

      {/* Mobile fixed bottom CTA (when letter is showing) */}
      {letterData && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:hidden z-40">
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
            <div className="text-sm">
              <span className="font-semibold text-black">$29</span>
              <span className="text-gray-500"> · Recovery Kit</span>
            </div>
            <Button
              onClick={scrollToPricing}
              size="md"
            >
              Unlock Letter
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
