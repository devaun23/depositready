import Link from "next/link";
import { Logo } from "@/components/ui";

export function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white pt-0 pb-12 md:pb-16 px-4 sm:px-6">
      {/* CTA banner */}
      <div className="max-w-6xl mx-auto py-10 mb-10 border-b border-white/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-lg font-serif font-semibold">
              Start your free case analysis
            </p>
            <p className="text-gray-300 text-sm mt-1">
              Currently supporting: FL, CA, TX, NY, GA, IL, OH, PA, NC, VA, WA, MA, MI, NJ, CO, AZ
            </p>
          </div>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-hover transition-colors min-h-[44px] flex-shrink-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Chat with Insight
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Brand description — full width on mobile, first col on desktop */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Logo size="md" className="text-white drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]" checkColor="white" />
              <span className="font-serif font-semibold tracking-tight">DepositReady</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Tools to help renters understand their rights and recover their
              security deposits.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-medium text-sm mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/chat"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Free Chat
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Legal Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-medium text-sm mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/20">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} depositready.co &middot;
            DepositReady is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
