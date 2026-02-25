import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Case Review Submitted — DepositReady",
  robots: { index: false },
};

export default function CaseReviewSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-2 font-serif text-xl font-semibold text-black">
          <Logo size="md" />
          <span className="hidden sm:inline">DepositReady</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Success Banner */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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

          <h1 className="text-2xl font-serif font-semibold text-black">
            Your Case Review is Being Prepared
          </h1>
          <p className="text-gray-600 mt-3 max-w-md mx-auto">
            Thank you for your payment. A deposit recovery specialist is
            reviewing your case and preparing your personalized memo.
          </p>
        </div>

        {/* What happens next */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-6">
          <h2 className="font-semibold text-black mb-4">What Happens Next</h2>
          <div className="space-y-4">
            <Step
              number="1"
              title="We review your case"
              description="A specialist analyzes your situation against your state's security deposit laws."
              active
            />
            <Step
              number="2"
              title="We prepare your memo"
              description="A personalized case assessment with an action plan tailored to your specific situation."
            />
            <Step
              number="3"
              title="Check your email"
              description="You'll receive your case review memo within 24 hours at the email you provided."
            />
          </div>
        </div>

        {/* Helpful while you wait */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-6">
          <h2 className="font-semibold text-black mb-3">While You Wait</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">&#8226;</span>
              Gather any communication with your landlord (texts, emails, letters)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">&#8226;</span>
              Take photos of the rental unit&apos;s condition (if you still have access)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">&#8226;</span>
              Keep copies of your lease and move-in/move-out inspection reports
            </li>
          </ul>
        </div>

        {/* Back to site */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-black transition"
          >
            Return to DepositReady
          </Link>
        </div>
      </main>
    </div>
  );
}

function Step({
  number,
  title,
  description,
  active,
}: {
  number: string;
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
          active
            ? "bg-black text-white"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {number}
      </div>
      <div>
        <p className="font-medium text-black text-sm">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
