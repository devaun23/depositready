"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components/landing";
import {
  FreeDemandLetter,
  UpsellCard,
  DeadlineWarning,
  WhatHappensNext,
} from "@/components/free";
import type { StateCode } from "@/lib/state-rules";

interface FreeLetterData {
  email: string;
  stateCode: StateCode;
  stateName: string;
  statuteTitle: string;
  statuteUrl: string;
  depositAmount: number;
  moveOutDate: string;
  landlordName?: string;
  returnDeadline: string;
  claimDeadline: string;
  deadlinePassed: boolean;
  daysLate?: number;
  daysRemaining?: number;
  damagesMultiplier: number;
  damagesDescription: string;
  potentialRecovery: number;
  landlordInViolation: boolean;
}

export default function FreeLetterSuccessPage() {
  const router = useRouter();
  const [data, setData] = useState<FreeLetterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage
    const stored = localStorage.getItem("freeLetterData");
    if (!stored) {
      router.push("/free");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setData(parsed);
    } catch {
      router.push("/free");
      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading your letter...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main id="main-content" className="py-8 md:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-2">
              Your Free Demand Letter is Ready
            </h1>
            <p className="text-gray-600">
              Print it, fill in the blanks, and send via certified mail.
            </p>
          </div>

          {/* Deadline Warning */}
          <div className="mb-6">
            <DeadlineWarning
              stateCode={data.stateCode}
              stateName={data.stateName}
              deadline={data.returnDeadline}
              deadlinePassed={data.deadlinePassed}
              daysLate={data.daysLate}
              daysRemaining={data.daysRemaining}
            />
          </div>

          {/* Two Column Layout on Desktop */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Letter - Takes 2 columns */}
            <div className="lg:col-span-2">
              <FreeDemandLetter
                landlordName={data.landlordName}
                stateCode={data.stateCode}
                stateName={data.stateName}
                statuteTitle={data.statuteTitle}
                depositAmount={data.depositAmount}
                moveOutDate={data.moveOutDate}
                returnDeadline={data.returnDeadline}
                deadlinePassed={data.deadlinePassed}
                damagesMultiplier={data.damagesMultiplier}
                damagesDescription={data.damagesDescription}
              />

              {/* Legal Reference */}
              <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-500">
                  <span className="font-medium">Legal Reference:</span>{" "}
                  <a
                    href={data.statuteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {data.statuteTitle}
                  </a>
                </p>
              </div>
            </div>

            {/* Upsell - Takes 1 column */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <UpsellCard
                  email={data.email}
                  stateCode={data.stateCode}
                  depositAmount={data.depositAmount}
                  moveOutDate={data.moveOutDate}
                />

                {/* Potential Recovery */}
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">Potential recovery:</span>{" "}
                    Under {data.stateName} law, you could recover up to{" "}
                    <span className="font-bold">
                      ${data.potentialRecovery.toLocaleString()}
                    </span>{" "}
                    ({data.damagesDescription}).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="mt-12">
            <WhatHappensNext />
          </div>

          {/* Disclaimer */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              DepositReady provides tools and templates based on state law. This is not legal advice.
              For legal questions, consult a licensed attorney in your state.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
