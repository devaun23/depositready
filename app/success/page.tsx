"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui";
import { WizardData } from "@/types/dispute";
import { PostPaymentForm } from "@/components/success/PostPaymentForm";
import { trackDiagnosis } from "@/lib/analytics";
import { trackConversion } from "@/lib/pixels";

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
  orderId: string | null;
  productType: string | null;
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
  const [postPaymentDone, setPostPaymentDone] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralCopied, setReferralCopied] = useState(false);

  const isDiagnosis = paymentDetails?.productType === "diagnosis";

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

      // Load wizard data from localStorage (may not exist for diagnosis flow)
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
            orderId: result.metadata?.order_id || null,
            productType: result.metadata?.product_type || null,
          });
          setStatus("verified");

          // Fire Google Ads conversion
          const fireConversion = async () => {
            try {
              await waitForGtag();
              window.gtag?.("event", "conversion", {
                send_to: "AW-17859927660/jtPRCJKB9N4bEOy8o8RC",
                value: result.amountTotal / 100,
                currency: "USD",
                transaction_id: sessionId,
              });

              // Funnel analytics
              const productType = result.metadata?.product_type || "full";
              window.gtag?.("event", "payment_completed", {
                event_category: "conversion",
                transaction_id: sessionId,
                value: result.amountTotal / 100,
                currency: "USD",
                product_type: productType,
              });

              if (productType === "diagnosis") {
                trackDiagnosis.paymentCompleted({
                  amount: result.amountTotal / 100,
                  state: result.metadata?.state_code || "",
                });
              }

              // Fire TikTok + Meta pixel Purchase event
              trackConversion("Purchase", {
                value: result.amountTotal / 100,
                currency: "USD",
                content_type: productType,
              });
            } catch (error) {
              console.error("[Conversion] Failed to fire conversion:", error);
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

  // Fetch referral code once payment is verified
  useEffect(() => {
    if (status === "verified" && paymentDetails?.customerEmail && !referralCode) {
      fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: paymentDetails.customerEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code) setReferralCode(data.code);
        })
        .catch(() => {
          // Non-critical — silently fail
        });
    }
  }, [status, paymentDetails?.customerEmail, referralCode]);

  // Auto-download for non-diagnosis orders
  useEffect(() => {
    if (
      status === "verified" &&
      !hasDownloaded &&
      !isDiagnosis &&
      (wizardData || paymentDetails?.downloadToken)
    ) {
      const timer = setTimeout(handleDownload, 1000);
      return () => clearTimeout(timer);
    }
  }, [status, hasDownloaded, handleDownload, wizardData, paymentDetails, isDiagnosis]);

  // Auto-download after diagnosis post-payment form is done
  useEffect(() => {
    if (postPaymentDone && !hasDownloaded && paymentDetails?.downloadToken) {
      const timer = setTimeout(handleDownload, 500);
      return () => clearTimeout(timer);
    }
  }, [postPaymentDone, hasDownloaded, handleDownload, paymentDetails]);

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
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Success header — always shown */}
          <div className="text-center mb-8">
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

            {paymentDetails && (
              <div className="bg-gray-50 rounded-lg p-4 mt-4 text-sm text-gray-600 inline-block">
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
          </div>

          {/* Diagnosis flow: show PostPaymentForm */}
          {isDiagnosis && !postPaymentDone && paymentDetails && (
            <PostPaymentForm
              orderId={paymentDetails.orderId || ""}
              email={paymentDetails.customerEmail || ""}
              downloadToken={paymentDetails.downloadToken || ""}
              onComplete={() => setPostPaymentDone(true)}
            />
          )}

          {/* Non-diagnosis OR post-payment complete: show download UI */}
          {(!isDiagnosis || postPaymentDone) && (
            <div className="text-center">
              {isDiagnosis && postPaymentDone && (
                <p className="text-gray-600 mb-6">
                  Your personalized dispute packet is being generated...
                </p>
              )}

              {!isDiagnosis && (
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase. Your Recovery Package is ready.
                </p>
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
                  "Download Your Recovery Package"
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
                    Bookmark this link to download your Recovery Package anytime:
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

              {/* Share & Referral Section */}
              <div className="border-t border-gray-200 pt-6 mt-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Know someone whose landlord kept their deposit?
                </h2>

                {/* Referral card */}
                {referralCode && (
                  <div className="bg-accent-light border border-accent/20 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-3">
                      Share your referral link &mdash; they get <strong>$5 off</strong>:
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={`depositready.co/chat?ref=${referralCode}`}
                        className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 select-all"
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `https://depositready.co/chat?ref=${referralCode}`
                          );
                          setReferralCopied(true);
                          setTimeout(() => setReferralCopied(false), 2000);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          referralCopied
                            ? "bg-green-100 text-green-700"
                            : "bg-brand text-white hover:bg-brand-light"
                        }`}
                      >
                        {referralCopied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Pre-written social post */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium">
                    Share on social
                  </p>
                  <p className="text-sm text-gray-700 mb-3 italic">
                    &ldquo;Just found out my landlord violated state law. Getting my deposit back.
                    Check yours free: depositready.co&rdquo;
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const text = encodeURIComponent(
                          "Just found out my landlord violated state law. Getting my deposit back 💰 Check yours free:\n\n"
                        );
                        const url = encodeURIComponent(
                          referralCode
                            ? `https://depositready.co/chat?ref=${referralCode}`
                            : "https://depositready.co/chat"
                        );
                        window.open(
                          `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Post
                    </button>
                    <button
                      onClick={() => {
                        const url = encodeURIComponent(
                          referralCode
                            ? `https://depositready.co/chat?ref=${referralCode}`
                            : "https://depositready.co/chat"
                        );
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Share
                    </button>
                    {typeof navigator !== "undefined" && navigator.share && (
                      <button
                        onClick={() => {
                          navigator.share({
                            title: "Check if your landlord owes you money",
                            text: "Just found out my landlord violated state law. Check yours free:",
                            url: referralCode
                              ? `https://depositready.co/chat?ref=${referralCode}`
                              : "https://depositready.co/chat",
                          });
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        More
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
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
