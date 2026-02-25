"use client";

import Link from "next/link";

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden px-4 pb-[env(safe-area-inset-bottom,12px)] pt-2 bg-white/90 backdrop-blur-sm border-t border-gray-100">
      <Link
        href="/chat"
        className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-hover transition-colors text-base"
      >
        <span aria-hidden="true">💬</span>
        Chat Free &mdash; Get Answers
      </Link>
    </div>
  );
}
