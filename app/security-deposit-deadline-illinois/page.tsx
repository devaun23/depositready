import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer } from "@/components/landing";

export const metadata: Metadata = {
  title: "Illinois Security Deposit Deadline for Renters",
  description:
    "Illinois landlords must return security deposits within strict legal deadlines. Learn the Illinois security deposit timeline, itemization rules, penalties, and how renters dispute unfair charges.",
};

export default function IllinoisSecurityDepositDeadlinePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-16">
        {/* Hero Section */}
        <h1 className="text-3xl font-bold mb-2">
          Illinois Security Deposit Deadlines
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          What the Law Requires After You Move Out
        </p>

        <p className="text-gray-600 mb-6">
          Illinois law sets clear deadlines and documentation rules for
          returning security deposits. If your landlord misses a deadline or
          fails to itemize properly, you may have leverage to recover your
          money.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap mb-8">
          <Link
            href="/wizard"
            className="inline-block rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition text-center"
          >
            Check My Illinois Deadline
          </Link>
          <Link
            href="/security-deposit-dispute"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            See how Illinois deposit disputes work
          </Link>
        </div>

        <p className="text-sm text-gray-500 mb-12">
          Used by renters across Illinois · Secure checkout · Not legal advice
        </p>

        {/* Section 1: Why Illinois Deadlines Matter */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Illinois takes deposit timing seriously
          </h2>

          <p className="text-gray-600 mb-4">
            Illinois requires landlords to follow specific timelines and notice
            rules, especially in larger rental buildings.
          </p>

          <p className="text-gray-600 mb-4">If a landlord:</p>

          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Misses a deadline</li>
            <li>Fails to itemize deductions</li>
            <li>Sends incomplete or late notice</li>
          </ul>

          <p className="text-gray-600 mb-4">
            Their ability to keep your deposit may be limited.
          </p>

          <p className="text-gray-600">
            Many Illinois disputes hinge on whether the landlord followed the
            statute exactly.
          </p>
        </section>

        {/* Section 2: Illinois Security Deposit Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Illinois security deposit deadlines explained
          </h2>

          <p className="text-gray-600 mb-6">
            Deadlines in Illinois depend on whether deductions are taken and the
            type of property.
          </p>

          <div className="space-y-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-2xl font-bold text-black mb-2">
                If no deductions are taken
              </p>
              <p className="text-gray-600">
                The landlord must return the full deposit within 45 days of move
                out
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-2xl font-bold text-black mb-2">
                If deductions are taken
              </p>
              <p className="text-gray-600 mb-3">The landlord must:</p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Send an itemized statement within 30 days</li>
                <li>Return any remaining balance within 45 days</li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Illinois security deposits are governed by 765 ILCS 710/1 et seq.
          </p>

          <p className="text-sm text-gray-500">
            (Some local ordinances, such as Chicago, may impose stricter rules.)
          </p>
        </section>

        {/* Section 3: What Counts as Proper Notice */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Itemization is critical
          </h2>

          <p className="text-gray-600 mb-4">
            A valid Illinois deduction notice must:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Be in writing</li>
            <li>Be sent within 30 days (if deductions are claimed)</li>
            <li>Clearly itemize each deduction and amount</li>
            <li>Distinguish damage from normal wear and tear</li>
          </ul>

          <p className="text-gray-600 mb-4">
            Common Illinois landlord mistakes:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Missing the 30-day itemization deadline</li>
            <li>Sending vague or lump-sum deductions</li>
            <li>Failing to return the remaining balance on time</li>
            <li>Charging for normal wear and tear</li>
          </ul>

          <p className="text-gray-600">
            Each mistake can weaken the landlord&apos;s claim.
          </p>
        </section>

        {/* Section 4: What Happens If Landlord Misses Deadlines */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            If Illinois rules were not followed
          </h2>

          <p className="text-gray-600 mb-4">If a landlord fails to comply:</p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>You may be entitled to your full deposit</li>
            <li>
              Illinois law allows penalties and interest in certain situations
            </li>
            <li>Improper deductions may be invalid</li>
          </ul>

          <p className="text-gray-600">
            Many Illinois renters recover deposits once deadlines are clearly
            cited and documented.
          </p>
        </section>

        {/* Section 5: How Illinois Renters Dispute */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What works in practice</h2>

          <p className="text-gray-600 mb-4">
            Successful Illinois disputes usually involve:
          </p>

          <ol className="list-decimal pl-6 mb-6 text-gray-600">
            <li>Confirming whether deductions were claimed</li>
            <li>Tracking the 30-day and 45-day deadlines</li>
            <li>Reviewing itemized statements carefully</li>
            <li>Organizing move-out photos chronologically</li>
            <li>
              Sending a professional, law-referenced{" "}
              <Link
                href="/security-deposit-demand-letter"
                className="text-black underline hover:text-gray-600"
              >
                demand letter
              </Link>
            </li>
            <li>Escalating only if necessary</li>
          </ol>

          <p className="text-gray-600">Clarity and timing win disputes.</p>
        </section>

        {/* Section 6: How DepositReady Helps */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Built for Illinois security deposit disputes
          </h2>

          <p className="text-gray-600 mb-4">DepositReady helps you:</p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Calculate your exact Illinois deadlines</li>
            <li>Understand itemization and return requirements</li>
            <li>Organize evidence properly</li>
            <li>Generate an Illinois compliant demand letter</li>
            <li>Create a single dispute packet you can reuse</li>
          </ul>

          <p className="text-gray-600">You see your deadline before paying.</p>
        </section>

        {/* Section 7: Illinois FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Illinois Security Deposit FAQ
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-black mb-2">
                Do I need a lawyer in Illinois to dispute a deposit?
              </h3>
              <p className="text-gray-600">
                Often no. Many disputes resolve with proper documentation and
                notice.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">
                What if my landlord never itemized deductions?
              </h3>
              <p className="text-gray-600">
                They may lose the right to withhold the deposit.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">
                Can landlords charge for normal wear and tear in Illinois?
              </h3>
              <p className="text-gray-600">
                No. Normal wear and tear cannot be deducted.
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
            Check your Illinois security deposit deadline in 30 seconds
          </h2>
          <p className="text-gray-600 mb-6">
            Know where you stand before taking action.
          </p>
          <Link
            href="/wizard"
            className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Check My Illinois Deadline
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            $39 one time · Takes about 10 minutes · Instant download
          </p>
          <p className="text-sm text-gray-500">
            Typical Illinois deposits range from $1,000–$2,500
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
