"use client";

import { useState, useCallback } from "react";
import { Navbar, Footer } from "@/components/landing";
import { CustomerTypes } from "@/components/business/CustomerTypes";
import { PricingCards } from "@/components/business/PricingCards";
import { Input, Select } from "@/components/ui";

const CUSTOMER_TYPE_OPTIONS = [
  { value: "property_mgmt", label: "Property Management" },
  { value: "attorney", label: "Attorney / Legal Aid" },
  { value: "advocacy", label: "Tenant Advocacy Organization" },
  { value: "other", label: "Other" },
];

export default function BusinessPage() {
  const [form, setForm] = useState({
    email: "",
    companyName: "",
    customerType: "",
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="py-8 md:py-16 px-4 sm:px-6">
        {/* Hero */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="font-serif text-3xl md:text-5xl font-semibold text-black leading-tight mb-4">
            Security Deposit Letters at Scale
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Court-ready, state-specific demand letters for property managers,
            attorneys, and tenant advocacy organizations. Buy in bulk, generate
            on demand.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            View Pricing
          </a>
        </section>

        {/* Customer Types */}
        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black text-center mb-8">
            Built for Professionals
          </h2>
          <CustomerTypes />
        </section>

        {/* Pricing */}
        <section id="pricing" className="max-w-5xl mx-auto mb-16 scroll-mt-8">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black text-center mb-2">
            Bulk Pricing
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Up to 75% off individual letter pricing. No subscriptions.
          </p>

          {/* Contact Form */}
          <div
            id="b2b-form"
            className="max-w-lg mx-auto bg-white rounded-xl border border-gray-200 p-6 mb-8"
          >
            <p className="text-sm font-medium text-black mb-4">
              Enter your info, then select a pack below:
            </p>
            <div className="space-y-3">
              <Input
                label="Work Email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Company / Organization"
                name="companyName"
                placeholder="Acme Property Management"
                value={form.companyName}
                onChange={handleChange}
              />
              <Select
                label="I am a..."
                name="customerType"
                value={form.customerType}
                onChange={handleChange}
                options={CUSTOMER_TYPE_OPTIONS}
                placeholder="Select your role"
              />
            </div>
          </div>

          <PricingCards
            email={form.email}
            companyName={form.companyName}
            customerType={form.customerType}
          />
        </section>

        {/* How it Works */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black text-center mb-8">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Buy a Letter Pack",
                desc: "Choose 5, 10, or 25 letters. One-time payment, no subscription.",
              },
              {
                step: "2",
                title: "Generate Letters",
                desc: "Use your dashboard to create state-specific demand letters as needed.",
              },
              {
                step: "3",
                title: "Download & Send",
                desc: "Each letter is a court-ready PDF with proper legal citations and formatting.",
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
        </section>

        {/* Enterprise CTA */}
        <section className="max-w-2xl mx-auto mb-16">
          <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Need 100+ letters?
            </h2>
            <p className="text-gray-300 mb-6">
              We offer custom pricing for high-volume organizations. Let&apos;s
              talk about your needs.
            </p>
            <a
              href="mailto:business@depositready.com?subject=Enterprise%20Inquiry"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure checkout via Stripe
            </div>
            <span>16 states covered</span>
            <span>Court-ready formatting</span>
            <span>State-specific citations</span>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-xs text-gray-400 max-w-xl mx-auto">
            DepositReady provides tools and templates based on state law. This
            is not legal advice. For legal questions, consult a licensed
            attorney in your state.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
