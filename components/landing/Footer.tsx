import Link from "next/link";
import { Logo } from "@/components/ui";

export function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Brand description — full width on mobile, first col on desktop */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Logo size="sm" className="text-white" />
              <span className="font-serif font-semibold">DepositReady</span>
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
                  href="/#how-it-works"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Free Chat
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
