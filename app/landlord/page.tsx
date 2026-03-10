import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui";

export const metadata: Metadata = {
  title:
    "For Landlords — Security Deposit Compliance & Defense | DepositReady",
  description:
    "Proactive compliance kits and emergency defense tools for landlords. Handle security deposits correctly and respond to tenant disputes with confidence.",
};

const complianceFeatures = [
  "Full state-law compliance audit",
  "Proper deposit handling checklist",
  "Required notices & timeline guide",
  "Itemized deduction templates",
  "Landlord-friendly letter templates",
];

const defenseFeatures = [
  "Point-by-point rebuttal builder",
  "Deduction justification documents",
  "State-specific legal defense brief",
  "Evidence organization guide",
  "Response letter with legal citations",
];

export default function LandlordHubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/landlord"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-black"
          >
            <Logo size="md" />
            <span className="hidden sm:inline">DepositReady</span>
          </Link>
          <span
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{
              backgroundColor: "var(--accent-amber-light, #fffbeb)",
              color: "var(--accent-amber, #d97706)",
            }}
          >
            For Landlords
          </span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 px-4 sm:px-6 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Protect yourself before
            <br className="hidden sm:block" /> disputes happen.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Whether you&apos;re being proactive about compliance or responding
            to a tenant threat, we have the tools you need.
          </p>
        </section>

        {/* Product Cards */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Compliance Kit */}
            <div className="glass-panel rounded-2xl p-8 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg">
              <div
                className="inline-block text-sm font-medium px-3 py-1 rounded-full mb-4"
                style={{
                  backgroundColor: "var(--accent-amber-light, #fffbeb)",
                  color: "var(--accent-amber, #d97706)",
                }}
              >
                Proactive
              </div>
              <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-2">
                Compliance Kit
              </h2>
              <p className="text-3xl font-semibold text-gray-900 mb-1">
                $99
                <span className="text-base font-normal text-gray-500">
                  {" "}
                  &ndash; $179
                </span>
              </p>
              <p className="text-[var(--text-secondary)] mb-6">
                Proactive compliance before disputes arise
              </p>
              <ul className="space-y-3 mb-8">
                {complianceFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--accent-amber, #d97706)" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/landlord/compliance"
                className="block w-full text-center font-medium py-3 rounded-lg transition-colors text-white"
                style={{ backgroundColor: "var(--accent-amber, #d97706)" }}
              >
                Get Compliance Kit
              </Link>
            </div>

            {/* Defense Kit */}
            <div className="glass-panel rounded-2xl p-8 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg">
              <div
                className="inline-block text-sm font-medium px-3 py-1 rounded-full mb-4"
                style={{
                  backgroundColor: "var(--accent-amber-light, #fffbeb)",
                  color: "var(--accent-amber, #d97706)",
                }}
              >
                Emergency
              </div>
              <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-2">
                Defense Kit
              </h2>
              <p className="text-3xl font-semibold text-gray-900 mb-1">
                $129
                <span className="text-base font-normal text-gray-500">
                  {" "}
                  &ndash; $199
                </span>
              </p>
              <p className="text-[var(--text-secondary)] mb-6">
                Emergency response to tenant threats
              </p>
              <ul className="space-y-3 mb-8">
                {defenseFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--accent-amber, #d97706)" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/landlord/defense"
                className="block w-full text-center font-medium py-3 rounded-lg transition-colors text-white"
                style={{ backgroundColor: "var(--accent-amber, #d97706)" }}
              >
                Get Defense Kit
              </Link>
            </div>
          </div>
        </section>

        {/* Which is right for you */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="glass-panel-strong rounded-2xl p-8 text-center">
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
              Which is right for you?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div className="p-4 rounded-xl bg-gray-50">
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Haven&apos;t received a complaint yet?
                </p>
                <Link
                  href="/landlord/compliance"
                  className="font-medium hover:underline"
                  style={{ color: "var(--accent-amber, #d97706)" }}
                >
                  Compliance Kit &rarr;
                </Link>
              </div>
              <div className="p-4 rounded-xl bg-gray-50">
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Already threatened or received a demand letter?
                </p>
                <Link
                  href="/landlord/defense"
                  className="font-medium hover:underline"
                  style={{ color: "var(--accent-amber, #d97706)" }}
                >
                  Defense Kit &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer disclaimer */}
      <footer className="border-t border-gray-200 py-8 px-4">
        <p className="text-xs text-center text-gray-400 max-w-2xl mx-auto">
          DepositReady provides informational tools and document preparation
          services. We are not a law firm and do not provide legal advice. Consult
          a licensed attorney for legal guidance specific to your situation.
        </p>
      </footer>
    </div>
  );
}
