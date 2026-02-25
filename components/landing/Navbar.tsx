import Link from "next/link";
import { Logo } from "@/components/ui";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-brand">
            <Logo size="md" />
            <span className="font-serif">DepositReady</span>
          </Link>

          {/* Center Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#how-it-works"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/resources"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Resources
            </Link>
          </div>

          {/* CTA */}
          <Link
            href="/wizard"
            className="px-3 py-1.5 text-sm font-medium bg-accent text-white rounded hover:bg-accent-hover transition-colors"
          >
            Start Free
          </Link>
        </div>
      </nav>
    </header>
  );
}
