"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Logo, Button } from "@/components/ui";

interface OrderData {
  downloadToken: string;
  managerName: string;
  propertyAddress: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID provided");
      setLoading(false);
      return;
    }

    fetch(`/api/verify-payment?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrderData({
            downloadToken: data.downloadToken,
            managerName: data.landlordName || data.tenantName || "Manager",
            propertyAddress: data.propertyAddress || "",
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to verify payment");
        setLoading(false);
      });
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4" />
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-2xl font-semibold text-black mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/pm">
            <Button>Return to PM Page</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link
            href="/pm"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-black"
          >
            <Logo size="md" />
            <span>DepositReady</span>
            <span className="text-xs font-sans font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              PM
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
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

          <h1 className="font-serif text-3xl font-semibold text-black mb-4">
            Your Disposition Packet is Ready!
          </h1>

          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Your FL §83.49-compliant deposit disposition packet has been
            generated and is ready to download.
          </p>

          {orderData?.downloadToken && (
            <a
              href={`/api/pm/generate?token=${orderData.downloadToken}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors mb-8"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Your Packet (PDF)
            </a>
          )}

          <div className="border-t border-gray-200 pt-8 mt-8">
            <h2 className="font-serif text-xl font-semibold text-black mb-4">
              What&apos;s in Your Packet
            </h2>
            <ul className="text-left max-w-md mx-auto space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span className="text-gray-600">
                  FL §83.49(3)(a) Notice of Intent to Impose Claim
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span className="text-gray-600">
                  Itemized Deductions Statement with evidence references
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span className="text-gray-600">
                  Evidence Documentation Checklist
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span className="text-gray-600">
                  Certified Mail Instructions & Deadline Timeline
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span className="text-gray-600">
                  Certificate of Service (proof of mailing)
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mt-8 text-left">
            <h3 className="font-medium text-blue-900 mb-3">
              Next Steps — Act Now
            </h3>
            <ol className="space-y-2 text-sm text-blue-800">
              <li>1. Download and review your packet</li>
              <li>2. Print pages 2-4 (the Notice + Itemized Statement)</li>
              <li>
                3. Send via <strong>USPS Certified Mail, Return Receipt Requested</strong>
              </li>
              <li>4. Record the tracking number on Page 6</li>
              <li>5. Keep the green return receipt card when it arrives</li>
              <li>6. File everything — this is your lawsuit protection</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PMSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
