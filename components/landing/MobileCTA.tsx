"use client";

import Link from "next/link";

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden px-4 pb-[env(safe-area-inset-bottom,12px)] pt-2 bg-white/90 backdrop-blur-sm border-t border-gray-100 animate-slideUp">
      <Link
        href="/chat"
        className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-hover transition-colors text-base min-h-[44px]"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
        Get Started — Free
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
          Free
        </span>
      </Link>
    </div>
  );
}
