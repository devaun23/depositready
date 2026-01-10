import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer } from "@/components/landing";

export const metadata: Metadata = {
  title: "Florida Security Deposit Deadline for Renters",
  description:
    "Florida landlords must return security deposits within strict legal deadlines. Learn the Florida security deposit timeline, notice rules, penalties, and how renters dispute unfair charges.",
};

export default function FloridaSecurityDepositDeadlinePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-16">
        {/* Hero Section */}
        <h1 className="text-3xl font-bold mb-2">
          Florida Security Deposit Deadlines
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          What the Law Requires After You Move Out
        </p>

        <p className="text-gray-600 mb-6">
          Florida law sets strict deadlines landlords must follow after you move
          out. If they miss one, you may have leverage to recover your full
          deposit.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap mb-8">
          <Link
            href="/wizard"
            className="inline-block rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition text-center"
          >
            Check My Florida Deadline
          </Link>
          <Link
            href="/security-deposit-dispute"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            See how Florida deposit disputes work
          </Link>
        </div>

        <p className="text-sm text-gray-500 mb-12">
          Used by renters across Florida · Secure checkout · Not legal advice
        </p>

        {/* Section 1: Why Florida Deadlines Matter */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            In Florida, timing is often more important than damage
          </h2>

          <p className="text-gray-600 mb-4">
            Many renters focus on photos and condition. That matters — but
            Florida security deposit disputes are frequently decided by
            deadlines, not repairs.
          </p>

          <p className="text-gray-600 mb-4">If a landlord:</p>

          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Misses a deadline</li>
            <li>Sends notice incorrectly</li>
            <li>Fails to itemize deductions</li>
          </ul>

          <p className="text-gray-600 mb-4">
            They may lose the right to keep part or all of the deposit.
          </p>

          <p className="text-gray-600">
            Florida courts expect strict compliance with the statute.
          </p>
        </section>

        {/* Section 2: Florida Security Deposit Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Florida security deposit deadlines explained
          </h2>

          <p className="text-gray-600 mb-6">
            After you move out and provide a forwarding address:
          </p>

          <div className="space-y-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-2xl font-bold text-black mb-2">
                Within 15 days
              </p>
              <p className="text-gray-600">
                The landlord must return your full deposit if no deductions are
                claimed
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-2xl font-bold text-black mb-2">
                Within 30 days
              </p>
              <p className="text-gray-600 mb-3">
                If deductions are claimed, the landlord must send:
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Written notice</li>
                <li>An itemized list of deductions</li>
                <li>The amount being withheld</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            If these deadlines are missed, the landlord&apos;s ability to keep
            the deposit may be weakened.
          </p>

          <p className="text-sm text-gray-500">
            Florida security deposits are governed by Florida Statute §83.49.
          </p>
        </section>

        {/* Section 3: What Counts as a Valid Notice */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            This is where many landlords make mistakes
          </h2>

          <p className="text-gray-600 mb-4">
            A valid Florida deduction notice must:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Be in writing</li>
            <li>Be sent within 30 days</li>
            <li>Clearly list each deduction and amount</li>
            <li>Be delivered to your forwarding address</li>
          </ul>

          <p className="text-gray-600 mb-4">Common landlord errors include:</p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Sending notice late</li>
            <li>Sending vague or lump sum deductions</li>
            <li>Using texts or emails instead of proper notice</li>
            <li>Failing to itemize</li>
            <li>Charging estimates instead of actual costs</li>
          </ul>

          <p className="text-gray-600">Each error can reduce their leverage.</p>
        </section>

        {/* Section 4: If Your Landlord Missed the Deadline */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            What it means if Florida deadlines were not followed
          </h2>

          <p className="text-gray-600 mb-4">If deadlines were missed:</p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>You may be entitled to your full deposit</li>
            <li>The landlord may lose the right to deductions</li>
            <li>You gain leverage in negotiations or escalation</li>
          </ul>

          <p className="text-gray-600">
            Many Florida disputes resolve once deadlines are clearly cited and
            documented — without court.
          </p>
        </section>

        {/* Section 5: How Renters Successfully Dispute */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What actually works</h2>

          <p className="text-gray-600 mb-4">Renters who succeed usually:</p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Confirm the exact Florida deadline</li>
            <li>Organize move out photos by room and date</li>
            <li>Document communications chronologically</li>
            <li>
              Send a professional, law referenced{" "}
              <Link
                href="/security-deposit-demand-letter"
                className="text-black underline hover:text-gray-600"
              >
                demand letter
              </Link>
            </li>
            <li>Escalate only if necessary</li>
          </ul>

          <p className="text-gray-600">
            Unorganized disputes get ignored. Clear, professional disputes get
            responses.
          </p>
        </section>

        {/* Section 6: How DepositReady Helps */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Built for Florida deposit disputes
          </h2>

          <p className="text-gray-600 mb-4">DepositReady helps you:</p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Calculate your exact Florida deadline</li>
            <li>Understand whether your landlord complied</li>
            <li>Organize evidence correctly</li>
            <li>Generate a Florida compliant demand letter</li>
            <li>Create a single dispute packet you can reuse</li>
          </ul>

          <p className="text-gray-600">You see your deadline before paying.</p>
        </section>

        {/* Section 7: Florida FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Florida Security Deposit FAQ
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-black mb-2">
                Do I need a lawyer to dispute a Florida deposit?
              </h3>
              <p className="text-gray-600">
                No. Many disputes resolve with proper documentation and notice.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">
                What if I never gave a forwarding address?
              </h3>
              <p className="text-gray-600">
                Deadlines may depend on when or if a forwarding address was
                provided.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">
                Can landlords charge for cleaning in Florida?
              </h3>
              <p className="text-gray-600">
                Only for damage beyond normal wear and tear.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">
                Is this legal advice?
              </h3>
              <p className="text-gray-600">
                No. DepositReady provides documentation tools and state specific
                information.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-black mb-2">
            Check your Florida security deposit deadline in 30 seconds
          </h2>
          <p className="text-gray-600 mb-6">
            Know where you stand before taking action.
          </p>
          <Link
            href="/wizard"
            className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Check My Florida Deadline
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            $39 one time · Takes about 10 minutes · Instant download
          </p>
          <p className="text-sm text-gray-500">
            Typical Florida deposits range from $1,000–$3,000
          </p>
        </div>

        {/* Related Links */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/landlord-kept-security-deposit"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            My landlord kept my deposit
          </Link>
          <Link
            href="/security-deposit-demand-letter"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            Write a demand letter
          </Link>
          <Link
            href="/security-deposit-dispute"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            How to dispute a deposit
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-12">
          DepositReady is not a law firm and does not provide legal advice. No
          outcomes are guaranteed.
        </p>
      </main>
      <Footer />
    </div>
  );
}
