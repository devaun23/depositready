"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { EligibilityModal } from "./EligibilityModal";

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight mb-8">
          Get your security deposit back with a state-law-backed demand letter
        </h1>

        {/* Body Copy */}
        <div className="space-y-4 text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
          <p>
            Check your deadline in 30 seconds. If your landlord missed it, you
            may have leverage to recover your full deposit—and potentially more.
          </p>
          <p>See your deadline first. Pay only to unlock the full packet.</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Button onClick={() => setIsModalOpen(true)} size="lg">
            Check My Deadline
          </Button>
          <Button href="#whats-included" variant="outline" size="lg">
            See what&apos;s included
          </Button>
        </div>

        {/* Social Proof */}
        <p className="text-sm text-gray-500 mb-2">
          Join 2,400+ renters who&apos;ve disputed unfair charges
        </p>

        {/* Trust Blocks */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secure checkout via Stripe
          </span>
          <span className="hidden sm:inline">·</span>
          <span>Used in FL, CA, TX, NY, GA, IL</span>
          <span className="hidden sm:inline">·</span>
          <span>Questions? support@depositready.com</span>
        </div>

        {/* Value Prop with Anchoring */}
        <div className="text-sm text-gray-600">
          <p className="font-medium">
            $39 one-time · Takes 10 minutes · Instant download
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Typical deposit: $1,000–$3,000. One letter can recover hundreds to
            thousands.
          </p>
        </div>
      </div>

      {/* Eligibility Modal */}
      <EligibilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
