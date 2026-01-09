import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-semibold text-black mb-3">DepositReady</h3>
            <p className="text-gray-500 text-sm">
              Build a landlord-proof move-out packet with state-specific
              documentation and ready-to-send notice templates.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium text-black mb-3 text-sm">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <Link
                  href="/florida-rules"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  State deadlines
                </Link>
              </li>
              <li>
                <Link
                  href="/landlord-kept-security-deposit"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  Landlord kept deposit?
                </Link>
              </li>
              <li>
                <Link
                  href="/security-deposit-deadline"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  Deposit deadlines
                </Link>
              </li>
              <li>
                <a
                  href="#whats-included"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-black mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-black text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <span className="text-gray-400 text-sm">
                  Not legal advice
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} DepositReady. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
