"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui";
import { Suspense, useState, useCallback } from "react";
import { useConversionTracking } from "@/lib/useConversionTracking";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { status, paymentDetails } = useConversionTracking(sessionId);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const handleDownload = useCallback(async () => {
    if (isDownloading || !paymentDetails?.downloadToken) return;
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const response = await fetch(
        `/api/filing-kit/generate?token=${paymentDetails.downloadToken}`
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "PDF generation failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const contentDisposition = response.headers.get("Content-Disposition");
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      a.download = filenameMatch
        ? filenameMatch[1]
        : `DepositReady_Filing_Kit_${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setHasDownloaded(true);
    } catch (error) {
      console.error("Download error:", error);
      setDownloadError(
        error instanceof Error ? error.message : "Failed to download PDF."
      );
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading, paymentDetails]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/40 to-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/filing-kit"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-black"
          >
            <Logo size="md" />
            <span className="hidden sm:inline">DepositReady</span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12 text-center">
        {status === "loading" && (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Verifying your payment...</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-2">
              Payment Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">
              We could not verify your payment. If you completed payment, please
              contact support with your confirmation email.
            </p>
            <Link
              href="/filing-kit"
              className="inline-block px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-light transition-colors"
            >
              Return to Filing Kit
            </Link>
          </div>
        )}

        {status === "verified" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-elevated p-8 animate-fadeSlideUp">
            <div
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-fadeSlideUp"
              style={{ animationDelay: "80ms", animationFillMode: "both" }}
            >
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1
              className="text-2xl font-serif font-semibold text-gray-900 mb-2 animate-fadeSlideUp"
              style={{ animationDelay: "160ms", animationFillMode: "both" }}
            >
              Your Filing Kit is Ready!
            </h1>

            {paymentDetails && (
              <div
                className="bg-gray-50 rounded-lg p-4 mt-2 mb-6 text-sm text-gray-600 inline-block animate-fadeSlideUp"
                style={{ animationDelay: "240ms", animationFillMode: "both" }}
              >
                <p>
                  Amount paid:{" "}
                  <span className="font-semibold">
                    ${paymentDetails.amountPaid.toFixed(2)}
                  </span>
                </p>
                {paymentDetails.customerEmail && (
                  <p>
                    Receipt sent to:{" "}
                    <span className="font-semibold">
                      {paymentDetails.customerEmail}
                    </span>
                  </p>
                )}
              </div>
            )}

            {paymentDetails?.downloadToken && (
              <div
                className="space-y-3 mb-6 animate-fadeSlideUp"
                style={{ animationDelay: "320ms", animationFillMode: "both" }}
              >
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand-light hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Generating PDF...
                    </span>
                  ) : hasDownloaded ? (
                    "Download Again"
                  ) : (
                    "Download Your Filing Kit"
                  )}
                </button>

                {downloadError && (
                  <p className="text-red-600 text-sm">{downloadError}</p>
                )}
                {hasDownloaded && (
                  <p className="text-green-600 text-sm">
                    Download started! Check your downloads folder.
                  </p>
                )}
              </div>
            )}

            <div
              className="border-t border-gray-200 pt-6 mt-6 animate-fadeSlideUp"
              style={{ animationDelay: "400ms", animationFillMode: "both" }}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Next Steps
              </h2>
              <ol className="text-left text-sm text-gray-600 space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-[var(--accent-orange)] rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>
                    <strong>Review your documents</strong> &mdash; check all
                    details for accuracy before filing
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-[var(--accent-orange)] rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>
                    <strong>File at small claims court</strong> &mdash; follow
                    the state-specific instructions included in your kit
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-[var(--accent-orange)] rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>
                    <strong>Serve your landlord</strong> &mdash; use the service
                    of process guide for your state
                  </span>
                </li>
              </ol>
            </div>

            <div
              className="space-y-3 mt-6 animate-fadeSlideUp"
              style={{ animationDelay: "480ms", animationFillMode: "both" }}
            >
              <Link
                href="/chat"
                className={`block w-full font-medium py-3 rounded-lg transition-colors ${
                  paymentDetails?.downloadToken
                    ? "bg-gray-600 text-white"
                    : "bg-brand text-white hover:bg-brand-light"
                }`}
              >
                Chat with Insight for Filing Help
              </Link>
              <Link
                href="/"
                className="block text-sm text-gray-600 hover:text-black transition"
              >
                Back to home
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function FilingKitSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-orange-50/40 to-gray-50" />}>
      <SuccessContent />
    </Suspense>
  );
}
