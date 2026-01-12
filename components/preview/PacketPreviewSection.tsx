"use client";

import { PDFPreviewViewer } from "./PDFPreviewViewer";

interface PacketPreviewSectionProps {
  onPurchaseClick?: () => void;
  isLoading?: boolean;
}

export function PacketPreviewSection({
  onPurchaseClick,
  isLoading = false,
}: PacketPreviewSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          Preview Your Recovery Package
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          See exactly what you&apos;re getting — a professional recovery package that landlords take seriously.
        </p>
      </div>

      {/* PDF Viewer */}
      <div className="p-4 bg-gray-50">
        <PDFPreviewViewer className="w-full" />
      </div>

      {/* Footer with CTA */}
      <div className="px-6 py-4 bg-white border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center mb-4">
          This preview uses sample data. Your Recovery Package will include your specific details, deadlines, and state law references.
        </p>

        <button
          onClick={onPurchaseClick}
          disabled={isLoading}
          className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            "Download My Demand Letter — $79"
          )}
        </button>

        {/* Guarantee */}
        <p className="text-xs text-green-600 mt-2 font-medium text-center">
          7-day money-back guarantee — no questions asked
        </p>

        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Takes 5 minutes
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Instant download
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No subscription
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Money-back guarantee
          </span>
        </div>
      </div>
    </div>
  );
}
