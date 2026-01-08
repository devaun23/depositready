import Link from "next/link";
import { notFound } from "next/navigation";
import { getStateRules, getAllStateSlugs } from "@/lib/state-rules";

// Generate static params for all supported states
export function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const rules = getStateRules(state);
  if (!rules) return { title: "State Not Found" };

  return {
    title: `Get Your Security Deposit Back in ${rules.name} | DepositReady`,
    description: rules.description,
  };
}

export default async function StateLandingPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const rules = getStateRules(state);

  if (!rules) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            DepositReady
          </Link>
          <Link
            href={`/${state}/wizard`}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Start Your Packet
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main id="main-content" className="max-w-5xl mx-auto px-4">
        <section className="py-16 md:py-24 text-center">
          <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-amber-700 bg-amber-50 rounded-full">
            {rules.name} Tenants
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {rules.headline}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate a complete dispute packet in 10 minutes. Customized demand
            letter, legal deadlines, and small claims guidance based on{" "}
            {rules.statuteTitle}.
          </p>
          <Link
            href={`/${state}/wizard`}
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Start Your Dispute Packet
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            $39 one-time purchase. Preview before you pay.
          </p>

          {/* Trust Signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
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
              <span>Instant Download</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Money-Back Guarantee</span>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-16 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Your Complete Dispute Packet
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Customized Demand Letter",
                description: `Professional letter citing ${rules.statuteTitle}, personalized with your dates, amounts, and landlord details.`,
              },
              {
                title: "Legal Timeline Calculator",
                description: `Know exactly if your landlord missed the ${rules.returnDeadline}-day or ${rules.claimDeadline}-day deadline and what damages you can claim.`,
              },
              {
                title: "Deductions Dispute Table",
                description:
                  "Line-by-line breakdown of each deduction with your rebuttal and legal basis for dispute.",
              },
              {
                title: "Small Claims Guide",
                description: `Step-by-step instructions for filing in ${rules.name} small claims court if your demand is ignored.`,
              },
              {
                title: "Evidence Checklist",
                description:
                  "Exactly what documentation to gather to support your case, from photos to receipts.",
              },
              {
                title: "Statute Reference",
                description: `Full text of ${rules.name} security deposit law so you can cite it with confidence.`,
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* State Specific Info */}
        <section className="py-16 border-t border-gray-100">
          <div className="max-w-3xl mx-auto bg-amber-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {rules.name} Law Is On Your Side
            </h2>
            <p className="text-gray-700 mb-4">
              Under {rules.statuteTitle}, your landlord must return your deposit
              within <strong>{rules.returnDeadline} days</strong> if they are
              not claiming deductions, or send an itemized claim within{" "}
              <strong>{rules.claimDeadline} days</strong> if they are.
            </p>
            <p className="text-gray-700 mb-4">
              If they miss these deadlines, they forfeit the right to claim
              deductions. If they act in bad faith, you may be entitled to{" "}
              <strong>{rules.damagesDescription}</strong>.
              {rules.additionalDamages && (
                <> Additional remedies: {rules.additionalDamages}</>
              )}
            </p>
            <p className="text-gray-600 text-sm">
              This tool generates documents based on current {rules.name} law.
              It is not legal advice. For complex situations, consult an
              attorney.
            </p>
          </div>
        </section>

        {/* Key Info Grid */}
        <section className="py-16 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {rules.name} Security Deposit Rules
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {rules.returnDeadline} Days
              </div>
              <div className="text-gray-700">Return Deadline</div>
              <div className="text-sm text-gray-500 mt-1">
                (if no deductions claimed)
              </div>
            </div>
            <div className="p-6 bg-green-50 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${rules.maxSmallClaims.toLocaleString()}
              </div>
              <div className="text-gray-700">Small Claims Limit</div>
              {rules.smallClaimsNote && (
                <div className="text-sm text-gray-500 mt-1">
                  {rules.smallClaimsNote}
                </div>
              )}
            </div>
            <div className="p-6 bg-amber-50 rounded-lg text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2 capitalize">
                {rules.damagesDescription}
              </div>
              <div className="text-gray-700">For Bad Faith</div>
              <div className="text-sm text-gray-500 mt-1">
                (if landlord acted willfully)
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Your Money Back?
          </h2>
          <p className="text-gray-600 mb-8">
            Most tenants recover 100% of their deposit. The $39 packet pays for
            itself.
          </p>
          <Link
            href={`/${state}/wizard`}
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Start Your Dispute Packet
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/privacy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href={`/${state}/rules`} className="hover:text-gray-700">
              {rules.name} Deposit Law
            </Link>
          </div>
          <p>
            DepositReady is not a law firm and does not provide legal advice.
          </p>
          <p className="mt-2">All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
