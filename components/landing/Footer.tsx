import Link from "next/link";
import { Logo } from "@/components/ui";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="md" />
            <span className="font-serif text-lg text-foreground">DepositReady</span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <a href="mailto:support@depositready.co" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border-light text-center">
          <p className="text-xs text-muted/70">
            DepositReady is a self-help documentation tool and not a law firm. No legal advice provided.
          </p>
          <p className="text-xs text-muted/50 mt-2">
            &copy; {new Date().getFullYear()} DepositReady. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
