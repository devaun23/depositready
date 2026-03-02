"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui";
import { FeedbackPanel } from "@/components/feedback/FeedbackPanel";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b transition-shadow duration-200 ${
        scrolled ? "border-gray-200 shadow-sm" : "border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-xl font-semibold text-brand"
          >
            <Logo size="lg" className="group-hover:scale-105 group-hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.4)] transition-all duration-200" />
            <span className="font-serif tracking-tight">DepositReady</span>
          </Link>

          {/* Center — capsule pill nav (desktop) */}
          <div className="hidden md:flex items-center bg-gray-100/90 backdrop-blur-md rounded-full px-1 py-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-5 py-2 text-sm font-medium text-gray-700 hover:bg-white/80 hover:text-black transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Feedback link — balances logo width for centered nav */}
          <button
            onClick={() => setFeedbackOpen(true)}
            className="hidden md:inline-flex text-sm text-gray-500 hover:text-accent transition-colors"
          >
            Feedback
          </button>

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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-3 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setFeedbackOpen(true); }}
              className="block w-full text-left px-2 py-3 text-sm text-gray-600 hover:text-black transition-colors"
            >
              Feedback
            </button>
          </div>
        )}
      </nav>

      {feedbackOpen && (
        <FeedbackPanel
          pagePath={pathname || "/"}
          onClose={() => setFeedbackOpen(false)}
        />
      )}
    </header>
  );
}
