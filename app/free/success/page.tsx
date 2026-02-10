"use client";

import { useEffect, useState, useCallback } from "react";
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
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleDownloadPDF = useCallback(async () => {
    if (!data || isDownloading) return;
    setIsDownloading(true);

    try {
      const response = await fetch("/api/free-letter/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          landlordName: data.landlordName,
          stateCode: data.stateCode,
          stateName: data.stateName,
          statuteTitle: data.statuteTitle,
          depositAmount: data.depositAmount,
          moveOutDate: data.moveOutDate,
          returnDeadline: data.returnDeadline,
          deadlinePassed: data.deadlinePassed,
          damagesMultiplier: data.damagesMultiplier,
          damagesDescription: data.damagesDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Get the PDF blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `DepositReady_FreeLetter_${data.stateCode.toUpperCase()}_${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download PDF. Please try the Print option instead.");
    } finally {
      setIsDownloading(false);
    }
  }, [data, isDownloading]);

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
            <p className="text-gray-600 mb-4">
              Download it, fill in the blanks, and send via certified mail.
            </p>

            {/* Download and Print Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {isDownloading ? "Generating..." : "Download PDF"}
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
            </div>
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
                  landlordName={data.landlordName}
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
