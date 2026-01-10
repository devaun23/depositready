"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui";

export function Navbar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-black">
            <Logo size="md" />
            <span className="font-serif">DepositReady</span>
          </Link>

          {/* Center Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            {isHomepage ? (
              <>
                <a
                  href="#whats-included"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  What&apos;s included
                </a>
                <a
                  href="#how-it-works"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Get started
                </a>
              </>
            ) : (
              <>
                <Link
                  href="/security-deposit-deadline"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Deadlines
                </Link>
                <Link
                  href="/security-deposit-dispute"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  How to dispute
                </Link>
              </>
            )}
          </div>

          {/* CTA */}
          {isHomepage ? (
            <a
              href="#testimonials"
              className="px-3 py-1.5 text-sm font-medium border border-black rounded hover:bg-gray-50 transition-colors"
            >
              What renters say
            </a>
          ) : (
            <Link
              href="/wizard"
              className="px-3 py-1.5 text-sm font-medium bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
