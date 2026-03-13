"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { FeedbackPanel } from "@/components/feedback/FeedbackPanel";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToEngine = () => {
    document.getElementById("claim-engine")?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b transition-shadow duration-200 ${
        scrolled ? "border-border/50 shadow-sm" : "border-transparent"
      }`}
    >
      <nav className="container max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo size="md" className="text-primary" />
            <span className="font-serif text-lg sm:text-xl text-foreground">DepositReady</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent-light"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setFeedbackOpen(!feedbackOpen)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Feedback
            </button>
            <Button variant="hero" size="sm" onClick={scrollToEngine}>
              Check My Case Free
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile dropdown with Framer Motion */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-card border-b border-border"
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent-light transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() => { setMobileOpen(false); setFeedbackOpen(true); }}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent-light transition-colors"
                >
                  Feedback
                </button>
                <Button
                  variant="hero"
                  size="lg"
                  className="mt-2"
                  onClick={() => { setMobileOpen(false); scrollToEngine(); }}
                >
                  Check My Case Free
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {feedbackOpen && (
        <FeedbackPanel pagePath="/" onClose={() => setFeedbackOpen(false)} />
      )}
    </header>
  );
}
