"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#pricing", label: "Pricing" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b transition-shadow duration-200 ${
        scrolled ? "border-border/50 shadow-sm" : "border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo size="md" className="text-accent" />
            <span className="font-serif text-lg sm:text-xl text-foreground">DepositReady</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-lg hover:bg-accent-light"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/check-my-case"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-xl hover:bg-accent-hover transition-colors shadow-sm shadow-accent/20"
            >
              Check My Case Free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-muted hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-border-light pb-4 pt-2 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-muted hover:text-foreground rounded-lg hover:bg-accent-light transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 px-2">
              <Link
                href="/check-my-case"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-hover transition-colors text-sm min-h-[44px]"
              >
                Check My Case Free
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
