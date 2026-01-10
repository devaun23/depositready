import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer } from "@/components/landing";

export const metadata: Metadata = {
  title: "Texas Security Deposit Deadline for Renters",
  description:
    "Texas landlords must return security deposits within strict legal deadlines. Learn the Texas security deposit timeline, notice rules, penalties, and how renters dispute unfair charges.",
};

export default function TexasSecurityDepositDeadlinePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-16">
        {/* Hero Section */}
        <h1 className="text-3xl font-bold mb-2">
          Texas Security Deposit Deadlines
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          What the Law Requires After You Move Out
        </p>

        <p className="mb-6">
          Texas law gives landlords a short window to return your deposit or
          explain deductions. If they miss it, you may have leverage to recover
          your money.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap mb-12">
          <Link
            href="/build"
            className="inline-block rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition text-center"
          >
            Check My Texas Deadline
          </Link>
          <Link
            href="/security-deposit-dispute"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            See how Texas deposit disputes work
          </Link>
        </div>

        <p className="text-sm text-gray-500 mb-12">
          Used by renters across Texas. Secure checkout. Not legal advice.
        </p>

        {/* Section 1: Why Texas Deadlines Matter */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          In Texas, Speed Matters
        </h2>

        <p className="mb-6">
          Texas gives landlords less time than many states to act after move
          out.
        </p>

        <p className="mb-4">If a landlord:</p>

        <ul className="list-disc pl-6 mb-6">
          <li>Misses the deadline</li>
          <li>Sends notice late</li>
          <li>Fails to properly itemize deductions</li>
        </ul>

        <p className="mb-6">They may be acting outside Texas law.</p>

        <p className="mb-6">
          Many Texas disputes turn on whether the landlord acted on time, not
          whether damage existed.
        </p>

        {/* Section 2: Texas Security Deposit Timeline */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Texas Security Deposit Deadlines Explained
        </h2>

        <p className="mb-6">
          After you move out and provide a forwarding address:
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="font-semibold mb-2">Within 30 days</p>
          <p className="mb-2">The landlord must:</p>
          <ul className="list-disc pl-6">
            <li>Return your deposit, or</li>
            <li>Send a written, itemized list of deductions</li>
          </ul>
        </div>

        <p className="mb-6">
          There is no separate grace period for &quot;no deductions&quot; versus
          &quot;with deductions&quot; in Texas. Thirty days is the deadline.
        </p>

        <p className="mb-6 text-sm text-gray-600">
          Texas security deposits are governed by Texas Property Code
          §92.103–§92.109.
        </p>

        {/* Section 3: What Counts as Proper Notice */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          This Is Where Many Landlords Slip Up
        </h2>

        <p className="mb-4">In Texas, a valid deduction notice must:</p>

        <ul className="list-disc pl-6 mb-6">
          <li>Be in writing</li>
          <li>Be sent within 30 days</li>
          <li>Clearly itemize each deduction and amount</li>
          <li>Be delivered to your forwarding address</li>
        </ul>

        <p className="mb-4">Common Texas landlord mistakes:</p>

        <ul className="list-disc pl-6 mb-6">
          <li>Missing the 30 day deadline</li>
          <li>Sending vague or lump sum deductions</li>
          <li>Failing to explain charges clearly</li>
          <li>Sending notice without itemization</li>
        </ul>

        <p className="mb-6">
          Improper notice weakens the landlord&apos;s position.
        </p>

        {/* Section 4: What Happens If Landlord Is Late */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          If the Texas Deadline Was Missed
        </h2>

        <p className="mb-4">If the landlord fails to comply:</p>

        <ul className="list-disc pl-6 mb-6">
          <li>You may be entitled to your full deposit</li>
          <li>Texas law allows penalties for bad faith withholding</li>
          <li>Your leverage increases significantly</li>
        </ul>

        <p className="mb-6">
          Many Texas renters recover deposits once deadlines are cited
          professionally and accurately.
        </p>

        {/* Section 5: How Texas Renters Dispute Deposits */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          What Works in Practice
        </h2>

        <p className="mb-4">Successful Texas disputes usually include:</p>

        <ol className="list-decimal pl-6 mb-6">
          <li>Confirming the 30 day deadline</li>
          <li>Organizing move out photos by room and date</li>
          <li>Keeping communications documented</li>
          <li>Sending a clear, professional demand letter</li>
          <li>Escalating only if needed</li>
        </ol>

        <p className="mb-6">Emotion does not help. Clear documentation does.</p>

        {/* Section 6: How DepositReady Helps */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Built for Texas Security Deposit Disputes
        </h2>

        <p className="mb-4">DepositReady helps you:</p>

        <ul className="list-disc pl-6 mb-6">
          <li>Calculate your exact Texas deadline</li>
          <li>Understand whether the landlord complied</li>
          <li>Organize evidence properly</li>
          <li>Generate a Texas compliant demand letter</li>
          <li>Create a reusable dispute packet</li>
        </ul>

        <p className="mb-6">
          You see your deadline before paying.
        </p>

        {/* Section 7: FAQ */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Texas Security Deposit FAQ
        </h2>

        <div className="space-y-6 mb-12">
          <div>
            <p className="font-semibold mb-2">
              Do I need a lawyer in Texas to dispute a deposit?
            </p>
            <p className="text-gray-600">
              Often no. Many disputes resolve with proper documentation and
              notice.
            </p>
          </div>

          <div>
            <p className="font-semibold mb-2">
              What if I didn&apos;t give a forwarding address?
            </p>
            <p className="text-gray-600">
              Texas deadlines depend on whether a forwarding address was
              provided.
            </p>
          </div>

          <div>
            <p className="font-semibold mb-2">
              Can Texas landlords charge for normal wear and tear?
            </p>
            <p className="text-gray-600">
              No. Only actual damages beyond normal wear and tear may be
              deducted.
            </p>
          </div>

          <div>
            <p className="font-semibold mb-2">Is this legal advice?</p>
            <p className="text-gray-600">
              No. DepositReady provides documentation tools and state specific
              information.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gray-50 rounded-lg p-6 text-center mt-12">
          <h2 className="text-xl font-semibold mb-2">
            Check Your Texas Security Deposit Deadline in 30 Seconds
          </h2>
          <p className="text-gray-600 mb-6">
            Know where you stand before taking action.
          </p>
          <Link
            href="/build"
            className="inline-block rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition"
          >
            Check My Texas Deadline
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            $39 one time. Takes about 10 minutes. Instant download.
          </p>
          <p className="text-sm text-gray-500">
            Typical Texas deposits range from $1,000–$3,000
          </p>
        </div>

        {/* Internal Links */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/security-deposit-demand-letter"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            Write a demand letter
          </Link>
          <Link
            href="/landlord-kept-security-deposit"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            My landlord kept my deposit
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
