import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer } from "@/components/landing";

export const metadata: Metadata = {
  title: "California Security Deposit Deadline for Renters",
  description:
    "California landlords must return security deposits within strict deadlines. Learn the California security deposit timeline, notice rules, penalties, and how renters dispute unfair charges.",
};

export default function CaliforniaSecurityDepositDeadlinePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-16">
        {/* Hero Section */}
        <h1 className="text-3xl font-bold mb-2">
          California Security Deposit Deadlines
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          What the Law Requires After You Move Out
        </p>

        <p className="text-gray-600 mb-6">
          California law gives landlords a short window to return your deposit
          or justify deductions. If they miss it—or deduct improperly—you may
          have strong leverage to recover your money.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap mb-8">
          <Link
            href="/wizard"
            className="inline-block rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition text-center"
          >
            Check My California Deadline
          </Link>
          <Link
            href="/security-deposit-dispute"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            See how California deposit disputes work
          </Link>
        </div>

        <p className="text-sm text-gray-500 mb-12">
          Used by renters across California · Secure checkout · Not legal advice
        </p>

        {/* Section 1: Why California Deadlines Matter */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            California is strict about security deposits
          </h2>

          <p className="text-gray-600 mb-4">
            California has some of the strongest tenant protections in the
            country when it comes to security deposits.
          </p>

          <p className="text-gray-600 mb-4">Landlords must:</p>

          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Act quickly</li>
            <li>Follow precise rules</li>
            <li>Provide detailed documentation</li>
          </ul>

          <p className="text-gray-600 mb-4">
            If they fail to comply, penalties can apply—even if some damage
            existed.
          </p>

          <p className="text-gray-600">
            In many California disputes, the issue is not whether damage
            occurred, but whether the landlord followed the law.
          </p>
        </section>

        {/* Section 2: California Security Deposit Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            California security deposit deadlines explained
          </h2>

          <p className="text-gray-600 mb-6">After you move out:</p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-2xl font-bold text-black mb-2">Within 21 days</p>
            <p className="text-gray-600 mb-3">The landlord must:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Return your deposit, or</li>
              <li>Provide an itemized list of deductions, and</li>
              <li>
                Include copies of receipts or invoices (with limited exceptions)
              </li>
            </ul>
          </div>

          <p className="text-gray-600 mb-4">
            This 21-day deadline applies in all cases, whether or not deductions
            are taken.
          </p>

          <p className="text-sm text-gray-500">
            California security deposits are governed by California Civil Code
            §1950.5.
          </p>
        </section>

        {/* Section 3: What Counts as Proper Notice */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            California landlords must be very specific
          </h2>

          <p className="text-gray-600 mb-4">
            A valid California deduction notice must:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Be in writing</li>
            <li>Be sent within 21 days</li>
            <li>Itemize each deduction clearly</li>
            <li>Include receipts or invoices for repairs (when required)</li>
            <li>Distinguish damage from normal wear and tear</li>
          </ul>

          <p className="text-gray-600 mb-4">
            Common California landlord mistakes:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Missing the 21 day deadline</li>
            <li>Charging for normal wear and tear</li>
            <li>Failing to include receipts</li>
            <li>Using estimates when receipts are required</li>
            <li>Sending vague or incomplete itemizations</li>
          </ul>

          <p className="text-gray-600">Each mistake increases renter leverage.</p>
        </section>

        {/* Section 4: What Happens If Landlord Is Late */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            If California deadlines or notice rules were violated
          </h2>

          <p className="text-gray-600 mb-4">If a landlord fails to comply:</p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>You may be entitled to your full deposit</li>
            <li>California allows statutory penalties for bad faith</li>
            <li>Improper deductions can invalidate the claim</li>
          </ul>

          <p className="text-gray-600 mb-4">
            California courts expect landlords to follow the statute precisely.
          </p>

          <p className="text-gray-600">
            Many disputes resolve once landlords realize their notice was
            defective.
          </p>
        </section>

        {/* Section 5: How California Renters Dispute */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What works in practice</h2>

          <p className="text-gray-600 mb-4">
            Successful California renters usually:
          </p>

          <ol className="list-decimal pl-6 mb-6 text-gray-600">
            <li>Confirm the 21 day deadline</li>
            <li>Review itemization and receipts carefully</li>
            <li>Separate normal wear and tear from damage</li>
            <li>Organize photos chronologically</li>
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
          </ol>

          <p className="text-gray-600">
            Professional disputes are taken seriously. Unclear ones are ignored.
          </p>
        </section>

        {/* Section 6: How DepositReady Helps */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Built for California security deposit disputes
          </h2>

          <p className="text-gray-600 mb-4">DepositReady helps you:</p>

          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Calculate your exact California deadline</li>
            <li>Identify notice or receipt violations</li>
            <li>Organize move out evidence properly</li>
            <li>Generate a California compliant demand letter</li>
            <li>Create a single dispute packet you can reuse</li>
          </ul>

          <p className="text-gray-600">You see your deadline before paying.</p>
        </section>

        {/* Section 7: California FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            California Security Deposit FAQ
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-black mb-2">
                Do I need a lawyer in California to dispute a deposit?
              </h3>
              <p className="text-gray-600">
                Often no. Many disputes resolve with proper documentation and
                notice.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">
                Can landlords charge for normal wear and tear in California?
              </h3>
              <p className="text-gray-600">
                No. Normal wear and tear cannot be deducted.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">
                Are receipts always required?
              </h3>
              <p className="text-gray-600">
                Generally yes, with limited statutory exceptions.
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
            Check your California security deposit deadline in 30 seconds
          </h2>
          <p className="text-gray-600 mb-6">
            Know where you stand before taking action.
          </p>
          <Link
            href="/wizard"
            className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Check My California Deadline
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            $39 one time · Takes about 10 minutes · Instant download
          </p>
          <p className="text-sm text-gray-500">
            Typical California deposits range from $1,500–$3,500
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
