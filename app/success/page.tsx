"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui";
import { WizardData } from "@/types/dispute";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type PaymentStatus = "loading" | "verified" | "error" | "no_data";

interface PaymentDetails {
  customerEmail: string | null;
  amountPaid: number;
  downloadToken: string | null;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [wizardData, setWizardData] = useState<WizardData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  // Helper function to wait for gtag to be ready
  const waitForGtag = (timeout = 5000): Promise<void> => {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const check = () => {
        if (typeof window !== "undefined" && window.gtag) {
          resolve();
        } else if (Date.now() - start > timeout) {
          reject(new Error("gtag not available"));
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  };

  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId) {
        setStatus("error");
        return;
      }

      // Load wizard data from localStorage (may not exist if session expired)
      const storedData = localStorage.getItem("disputeData");
      if (storedData) {
        setWizardData(JSON.parse(storedData) as WizardData);
      }

      try {
        const response = await fetch(
          `/api/verify-payment?session_id=${sessionId}`
        );

        if (!response.ok) {
          throw new Error("Payment verification failed");
        }

        const result = await response.json();

        if (result.paid) {
          setPaymentDetails({
            customerEmail: result.customerEmail,
            amountPaid: result.amountTotal / 100,
            downloadToken: result.downloadToken,
          });
          setStatus("verified");

          // Fire Google Ads conversion
          const fireConversion = async () => {
            try {
              console.log("[Conversion] Waiting for gtag to be ready...");
              await waitForGtag();
              console.log("[Conversion] gtag ready, firing conversion event");
              window.gtag?.("event", "conversion", {
                send_to: "AW-17859927660/jtPRCJKB9N4bEOy8o8RC",
                value: result.amountTotal / 100,
                currency: "USD",
                transaction_id: sessionId,
              });
              console.log("[Conversion] Google Ads conversion fired successfully", {
                value: result.amountTotal / 100,
                transaction_id: sessionId,
              });
            } catch (error) {
              console.error("[Conversion] Failed to fire Google Ads conversion:", error);
            }
          };
          fireConversion();
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
      }
    }

    verifyPayment();
  }, [sessionId]);

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadError(null);

    try {
      let response: Response;

      // Prefer token-based download if available
      if (paymentDetails?.downloadToken) {
        response = await fetch(
          `/api/generate?token=${paymentDetails.downloadToken}`
        );
      } else if (wizardData) {
        // Fallback to POST with wizard data from localStorage
        response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: wizardData }),
        });
      } else {
        throw new Error(
          "No download method available. Please use the token link below."
        );
      }

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
        : `DepositReady_Packet_${new Date().toISOString().split("T")[0]}.pdf`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setHasDownloaded(true);
    } catch (error) {
      console.error("Download error:", error);
      setDownloadError(
        error instanceof Error ? error.message : "Failed to download PDF. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  }, [wizardData, paymentDetails, isDownloading]);

  useEffect(() => {
    if (status === "verified" && !hasDownloaded && (wizardData || paymentDetails?.downloadToken)) {
      const timer = setTimeout(handleDownload, 1000);
      return () => clearTimeout(timer);
    }
  }, [status, hasDownloaded, handleDownload, wizardData, paymentDetails]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Verification Failed
          </h1>
          <p className="text-gray-600 mb-6">
            We could not verify your payment. If you completed payment, please
            contact support with your confirmation email.
          </p>
          <Link
            href="/preview"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Return to Preview
          </Link>
        </div>
      </div>
    );
  }

  if (status === "no_data") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Session Expired
          </h1>
          <p className="text-gray-600 mb-6">
            Your form data has expired. Please complete the wizard again.
          </p>
          <Link
            href="/wizard"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Start Over
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Logo size="md" />
            DepositReady
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your dispute packet is ready.
          </p>

          {paymentDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600">
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

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors mb-4"
          >
            {isDownloading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Generating PDF...
              </span>
            ) : hasDownloaded ? (
              "Download Again"
            ) : (
              "Download Your Packet"
            )}
          </button>

          {downloadError && (
            <p className="text-red-600 text-sm mb-4">{downloadError}</p>
          )}

          {hasDownloaded && (
            <p className="text-green-600 text-sm mb-4">
              Download started! Check your downloads folder.
            </p>
          )}

          {/* Token-based download link as backup */}
          {paymentDetails?.downloadToken && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm">
              <p className="text-blue-800 mb-2">
                <strong>Permanent Download Link:</strong>
              </p>
              <p className="text-blue-700 mb-2">
                Bookmark this link to download your packet anytime:
              </p>
              <Link
                href={`/download?token=${paymentDetails.downloadToken}`}
                className="text-blue-600 hover:text-blue-800 underline break-all"
              >
                {typeof window !== "undefined"
                  ? `${window.location.origin}/download?token=${paymentDetails.downloadToken}`
                  : `/download?token=${paymentDetails.downloadToken}`}
              </Link>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Next Steps
            </h2>
            <ol className="text-left text-sm text-gray-600 space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>
                  Print your demand letter and send it via{" "}
                  <strong>certified mail</strong> with return receipt
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Keep a copy of everything for your records</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>
                  Wait 14 days for a response before considering small claims
                  court
                </span>
              </li>
            </ol>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          DepositReady is not a law firm and does not provide legal advice. For
          complex matters, consult a licensed attorney.
        </p>
      </main>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
