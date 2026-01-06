"use client";

import Link from "next/link";

export default function WizardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            DepositReady
          </Link>
          <div className="text-sm text-gray-500">Step 1 of 10</div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="h-1 bg-gray-100">
            <div className="h-1 bg-blue-600 w-[10%]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Let&apos;s Start Your Dispute
          </h1>
          <p className="text-gray-600 mb-8">
            First, tell us about your current situation.
          </p>

          <div className="space-y-4">
            <p className="text-center text-gray-500 py-12">
              Wizard coming soon...
            </p>
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <Link
              href="/"
              className="px-6 py-2 text-gray-600 hover:text-gray-900"
            >
              Back
            </Link>
            <button
              disabled
              className="px-6 py-2 bg-blue-600 text-white rounded-lg opacity-50 cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
