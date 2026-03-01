"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-brand"
          >
            <Logo size="md" />
            <span className="font-serif">DepositReady</span>
          </Link>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/blog"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/landlord"
              className="text-sm text-gray-600 hover:text-black transition-colors inline-flex items-center gap-1.5"
            >
              For Landlords
              <span className="text-[10px] font-medium text-gray-400 border border-gray-200 rounded px-1 py-0.5 leading-none">
                Coming Soon
              </span>
            </Link>
          </div>

          {/* CTA — desktop */}
          <Link
            href="/chat"
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium bg-accent text-white rounded-full hover:bg-accent-hover transition-colors min-h-[44px]"
          >
            Start Free Chat
          </Link>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-black transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 pb-4 pt-2 space-y-1">
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-3 text-sm text-gray-600 hover:text-black transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/landlord"
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-3 text-sm text-gray-600 hover:text-black transition-colors"
            >
              For Landlords
              <span className="ml-1.5 text-[10px] font-medium text-gray-400 border border-gray-200 rounded px-1 py-0.5">
                Coming Soon
              </span>
            </Link>
            <Link
              href="/chat"
              onClick={() => setMenuOpen(false)}
              className="block mt-2 text-center py-3 bg-accent text-white font-medium rounded-full hover:bg-accent-hover transition-colors"
            >
              Start Free Chat
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
