import Link from "next/link";
import { Logo } from "@/components/ui";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="md" />
            <span className="font-serif text-lg text-gray-900">DepositReady</span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">
              Terms
            </Link>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">
              Blog
            </Link>
            <a href="mailto:support@depositready.co" className="hover:text-gray-900 transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            DepositReady is a self-help documentation tool. Not a law firm. No legal advice. No guaranteed outcomes.
          </p>
          <p className="text-xs text-gray-300 mt-2">
            &copy; {new Date().getFullYear()} DepositReady. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
