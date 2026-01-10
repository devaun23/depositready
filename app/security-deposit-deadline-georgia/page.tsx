import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer } from "@/components/landing";

export const metadata: Metadata = {
  title: "Georgia Security Deposit Deadline for Renters",
  description:
    "Georgia landlords must follow strict rules when returning security deposits. Learn the Georgia security deposit timeline, inspection requirements, notice rules, and how renters dispute unfair charges.",
};

export default function GeorgiaSecurityDepositDeadlinePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-16">
        {/* Hero Section */}
        <h1 className="text-3xl font-bold mb-2">
          Georgia Security Deposit Deadlines
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          What the Law Requires After You Move Out
        </p>

        <p className="text-gray-600 mb-6">
          Georgia law requires landlords to inspect your unit and return your
          deposit on a strict timeline. If they skip steps or miss deadlines,
          you may have leverage to recover your money.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap mb-8">
          <Link
            href="/wizard"
            className="inline-block rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition text-center"
          >
            Check My Georgia Deadline
          </Link>
          <Link
            href="/security-deposit-dispute"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            See how Georgia deposit disputes work
          </Link>
        </div>

        <p className="text-sm text-gray-500 mb-12">
          Used by renters across Georgia · Secure checkout · Not legal advice
        </p>

        {/* Section 1: Why Georgia Deadlines and Procedures Matter */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            In Georgia, process matters as much as timing
          </h2>

          <p className="text-gray-600 mb-4">
            Georgia is different from many states because landlords must follow{" "}
            <strong>specific inspection procedures</strong> in addition to
            deadlines.
          </p>

          <p className="text-gray-600 mb-4">If a landlord:</p>

          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Fails to perform a proper move-out inspection</li>
            <li>Does not provide an itemized list of damages</li>
            <li>Misses the return deadline</li>
          </ul>

          <p className="text-gray-600 mb-4">
            They may lose the right to keep part or all of the deposit.
          </p>

          <p className="text-gray-600">
            Many Georgia disputes turn on{" "}
            <strong>whether the landlord followed the required steps</strong>,
            not just whether damage existed.
          </p>
        </section>

        {/* Section 2: Georgia Security Deposit Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Georgia security deposit deadlines explained
          </h2>

          <p className="text-gray-600 mb-6">After you move out:</p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-2xl font-bold text-black mb-2">
              Within 30 days
            </p>
            <p className="text-gray-600 mb-3">The landlord must:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Return your deposit, or</li>
              <li>Send an itemized list of damages and deductions</li>
            </ul>
          </div>

          <p className="text-gray-600 mb-4">
            Before this, Georgia law requires a{" "}
            <strong>move-out inspection</strong> and documentation of damages.
          </p>

          <p className="text-sm text-gray-500">
            Georgia security deposits are governed by O.C.G.A. §44-7-30 through
            §44-7-36.
          </p>
        </section>

        {/* Section 3: Georgia's Move-Out Inspection Requirement */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            This is where many landlords fail
          </h2>

          <p className="text-gray-600 mb-4">In Georgia, landlords must:</p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Inspect the unit after move out</li>
            <li>Create a written list of damages</li>
            <li>Allow the tenant to review and agree or disagree</li>
            <li>Keep records of the inspection</li>
          </ul>

          <p className="text-gray-600 mb-4">
            Common Georgia landlord mistakes:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Skipping the inspection entirely</li>
            <li>Failing to document damages properly</li>
            <li>Creating deductions after the fact</li>
            <li>Sending vague or unsupported charges</li>
          </ul>

          <p className="text-gray-600">
            If inspection rules are not followed, deductions may be challenged.
          </p>
        </section>

        {/* Section 4: What Happens If Landlord Violates Georgia Law */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            If Georgia rules were not followed
          </h2>

          <p className="text-gray-600 mb-4">If a landlord fails to comply:</p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>
              You may be entitled to your <strong>full deposit</strong>
            </li>
            <li>Improper deductions may be invalid</li>
            <li>Your leverage increases in negotiations or escalation</li>
          </ul>

          <p className="text-gray-600">
            Many Georgia renters recover deposits once inspection or deadline
            failures are clearly documented.
          </p>
        </section>

        {/* Section 5: How Georgia Renters Successfully Dispute */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What works in practice</h2>

          <p className="text-gray-600 mb-4">
            Successful Georgia disputes usually involve:
          </p>

          <ol className="list-decimal pl-6 mb-6 text-gray-600">
            <li>Confirming the 30-day deadline</li>
            <li>Reviewing whether a proper inspection occurred</li>
            <li>Organizing move-out photos by room and date</li>
            <li>Comparing deductions to inspection records</li>
            <li>
              Sending a{" "}
              <Link
                href="/security-deposit-demand-letter"
                className="text-black underline hover:text-gray-600"
              >
                professional, law-referenced demand letter
              </Link>
            </li>
            <li>Escalating only if necessary</li>
          </ol>

          <p className="text-gray-600">Documentation beats arguments.</p>
        </section>

        {/* Section 6: How DepositReady Helps */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Built for Georgia security deposit disputes
          </h2>

          <p className="text-gray-600 mb-4">DepositReady helps you:</p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Calculate your exact Georgia deadline</li>
            <li>Understand inspection and notice requirements</li>
            <li>Organize evidence correctly</li>
            <li>Generate a Georgia compliant demand letter</li>
            <li>Create a reusable dispute packet</li>
          </ul>

          <p className="text-gray-600">
            You see your deadline <strong>before</strong> paying.
          </p>
        </section>

        {/* Section 7: Georgia FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Georgia Security Deposit FAQ
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-black mb-2">
                Do I need a lawyer in Georgia to dispute a deposit?
              </h3>
              <p className="text-gray-600">
                Often no. Many disputes resolve with proper documentation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">
                What if my landlord never did an inspection?
              </h3>
              <p className="text-gray-600">
                That may affect their ability to claim deductions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">
                Can landlords charge for normal wear and tear in Georgia?
              </h3>
              <p className="text-gray-600">
                No. Only actual damages beyond normal wear and tear may be
                deducted.
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
            Check your Georgia security deposit deadline in 30 seconds
          </h2>
          <p className="text-gray-600 mb-6">
            Know where you stand before taking action.
          </p>
          <Link
            href="/wizard"
            className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Check My Georgia Deadline
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            $39 one time · Takes about 10 minutes · Instant download
          </p>
          <p className="text-sm text-gray-500">
            Typical Georgia deposits range from $800–$2,500
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
