import Link from "next/link";

export const metadata = {
  title: "Florida Security Deposit Law (Statute 83.49) | DepositReady",
  description:
    "Plain-English explanation of Florida security deposit law, deadlines, tenant rights, and what to do if your landlord keeps your deposit.",
};

export default function FloridaRulesPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            DepositReady
          </Link>
          <Link
            href="/wizard"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Start Your Packet
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Florida Security Deposit Law
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A plain-English guide to Florida Statute 83.49 and your rights as a
          tenant.
        </p>

        {/* Key Deadlines Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">
            Key Deadlines Your Landlord Must Meet
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                15 Days
              </div>
              <div className="text-sm text-gray-600">
                To return your full deposit if they&apos;re <strong>not</strong>{" "}
                claiming deductions
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                30 Days
              </div>
              <div className="text-sm text-gray-600">
                To send written notice by certified mail if they <strong>are</strong>{" "}
                claiming deductions
              </div>
            </div>
          </div>
          <p className="text-sm text-blue-800 mt-4">
            These deadlines start from the day you move out (lease termination).
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="prose prose-gray max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What the Law Requires
            </h2>
            <p className="text-gray-600 mb-4">
              Florida Statute 83.49 is clear about what landlords must do with
              your security deposit after you move out:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900">
                  If No Deductions
                </h3>
                <p className="text-gray-600">
                  The landlord must return your entire deposit within{" "}
                  <strong>15 days</strong> of the lease ending.
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="font-semibold text-gray-900">
                  If Claiming Deductions
                </h3>
                <p className="text-gray-600">
                  The landlord must send a written notice by{" "}
                  <strong>certified mail</strong> within <strong>30 days</strong>,
                  including:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600">
                  <li>An itemized list of each deduction</li>
                  <li>The amount claimed for each item</li>
                  <li>
                    A statement that you have 15 days to object in writing
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What Happens If They Miss the Deadline?
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 font-medium">
                If your landlord fails to provide proper notice within 30 days,
                they forfeit the right to claim any deductions from your deposit.
              </p>
            </div>
            <p className="text-gray-600">
              This is one of the strongest protections in Florida law. A landlord
              who doesn&apos;t send timely notice loses their ability to keep any of
              your money for damages, cleaning, or other claims.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your 15-Day Right to Object
            </h2>
            <p className="text-gray-600 mb-4">
              If you receive a deduction notice from your landlord, you have{" "}
              <strong>15 days</strong> from receiving it to object in writing. If
              you don&apos;t object within this window, the landlord may proceed with
              the deductions.
            </p>
            <p className="text-gray-600">
              Your objection should be sent via certified mail, clearly stating
              which deductions you disagree with and why.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Normal Wear and Tear
            </h2>
            <p className="text-gray-600 mb-4">
              Landlords <strong>cannot</strong> deduct for normal wear and tear.
              This includes:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Normal Wear (Not Deductible)
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Minor scuffs on walls</li>
                  <li>Carpet wearing in high-traffic areas</li>
                  <li>Faded paint from sunlight</li>
                  <li>Small nail holes from pictures</li>
                  <li>Worn door handles or hinges</li>
                  <li>Minor scratches on appliances</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Damage (Potentially Deductible)
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Large holes in walls</li>
                  <li>Stains that require carpet replacement</li>
                  <li>Broken windows or doors</li>
                  <li>Pet damage beyond normal wear</li>
                  <li>Unauthorized modifications</li>
                  <li>Missing fixtures or appliances</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Triple Damages for Bad Faith
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800">
                If a landlord acts in <strong>bad faith</strong> by wrongfully
                withholding your deposit, you may be entitled to{" "}
                <strong>three times the amount wrongfully withheld</strong>, plus
                court costs and reasonable attorney&apos;s fees.
              </p>
            </div>
            <p className="text-gray-600">
              Bad faith typically means the landlord knew they had no valid claim
              to your deposit but kept it anyway, or deliberately failed to follow
              the required procedures.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Small Claims Court
            </h2>
            <p className="text-gray-600 mb-4">
              If your landlord refuses to return your deposit after receiving your
              demand letter, you can file in Florida Small Claims Court.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Key Facts</h3>
              <ul className="text-gray-600 space-y-2">
                <li>
                  <strong>Maximum claim:</strong> $8,000 (plus court costs)
                </li>
                <li>
                  <strong>Filing fees:</strong> $55 to $300 depending on amount
                </li>
                <li>
                  <strong>No attorney required:</strong> You can represent yourself
                </li>
                <li>
                  <strong>Typical timeline:</strong> Hearing within 30-60 days of
                  filing
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Read the Full Statute
            </h2>
            <p className="text-gray-600 mb-4">
              You can read Florida Statute 83.49 in full on the official Florida
              Legislature website:
            </p>
            <a
              href="http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0000-0099/0083/Sections/0083.49.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              Florida Statute 83.49 - Official Text
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              When to Consult an Attorney
            </h2>
            <p className="text-gray-600 mb-4">
              While many deposit disputes can be resolved without a lawyer, you
              should consider consulting an attorney if:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Your claim exceeds $8,000 (beyond small claims limit)</li>
              <li>
                Your landlord has also filed claims against you
              </li>
              <li>
                Complex lease terms are in dispute
              </li>
              <li>
                You&apos;re facing retaliation or harassment
              </li>
              <li>
                The property is commercial rather than residential
              </li>
            </ul>
          </section>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-lg p-6 text-center mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to Get Your Deposit Back?
          </h2>
          <p className="text-gray-600 mb-6">
            Generate a customized demand letter and dispute packet in 10 minutes.
          </p>
          <Link
            href="/wizard"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Your Dispute Packet
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p className="mb-4">
            This page provides general information about Florida law and is not
            legal advice. For advice specific to your situation, consult a
            licensed Florida attorney.
          </p>
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/privacy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href="/florida-rules" className="hover:text-gray-700">
              Florida Deposit Law
            </Link>
          </div>
          <p>Florida tenants only. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
