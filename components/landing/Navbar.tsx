"use client";

import Link from "next/link";
import { Button, Logo } from "@/components/ui";

export function Navbar() {
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
          </div>

          {/* CTA */}
          <Button href="/wizard" size="sm">
            Build my packet
          </Button>
        </div>
      </nav>
    </header>
  );
}
