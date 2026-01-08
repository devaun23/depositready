import Link from "next/link";

export const metadata = {
  title: "Terms of Service | DepositReady",
  description:
    "Terms of Service for DepositReady - Florida Security Deposit Dispute Tool",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            DepositReady
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Terms of Service
        </h1>
        <p className="text-gray-500 mb-8">Last updated: January 2026</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Service Description
            </h2>
            <p className="text-gray-600 mb-4">
              DepositReady provides an automated document generation service for
              Florida residential tenants seeking to recover security deposits.
              We generate customized dispute packets including demand letters,
              legal timelines, and informational guides based on Florida Statute
              83.49.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
              <strong>Important:</strong> DepositReady is not a law firm and does
              not provide legal advice. The documents we generate are for
              informational purposes only. Using our service does not create an
              attorney-client relationship. For legal advice specific to your
              situation, please consult a licensed Florida attorney.
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Eligibility
            </h2>
            <p className="text-gray-600 mb-4">
              Our service is designed exclusively for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <strong>Florida residential tenants</strong> with security
                deposit disputes
              </li>
              <li>
                Disputes involving <strong>residential leases only</strong> (not
                commercial properties)
              </li>
              <li>
                Situations where the tenant has <strong>already moved out</strong>{" "}
                of the rental property
              </li>
            </ul>
            <p className="text-gray-600 mt-4">
              By using our service, you confirm that you meet these eligibility
              requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Your Responsibilities
            </h2>
            <p className="text-gray-600 mb-4">When using DepositReady, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide accurate and truthful information in the wizard</li>
              <li>
                Use the generated documents only for legitimate dispute
                resolution
              </li>
              <li>
                Verify that the information in your documents is correct before
                sending
              </li>
              <li>
                Consult an attorney if your situation involves complex legal
                issues
              </li>
              <li>Not use our service for harassment or bad faith purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Pricing and Payment
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                The current price for a dispute packet is <strong>$39</strong>{" "}
                (one-time payment)
              </li>
              <li>
                Payment is processed securely through Stripe
              </li>
              <li>
                You will receive immediate access to download your documents
                after payment
              </li>
              <li>
                Your download link remains active indefinitely
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Refund Policy
            </h2>
            <p className="text-gray-600 mb-4">
              We offer a <strong>30-day money-back guarantee</strong>. If you
              are not satisfied with your dispute packet for any reason, contact
              us within 30 days of your purchase for a full refund.
            </p>
            <p className="text-gray-600">
              To request a refund, email us at{" "}
              <a
                href="mailto:support@depositready.co"
                className="text-blue-600 hover:text-blue-700"
              >
                support@depositready.co
              </a>{" "}
              with your order details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Limitations of Liability
            </h2>
            <p className="text-gray-600 mb-4">
              DepositReady provides documents based on the information you
              provide. We make no guarantees about:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                The outcome of your dispute with your landlord
              </li>
              <li>
                The success of any legal action you may take
              </li>
              <li>
                The accuracy of legal information for situations outside Florida
                residential tenancies
              </li>
              <li>
                The applicability of our documents to commercial leases or
                non-Florida jurisdictions
              </li>
            </ul>
            <p className="text-gray-600 mt-4">
              To the maximum extent permitted by law, DepositReady shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use of our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-gray-600 mb-4">
              The document templates, website design, and other materials on
              DepositReady are protected by copyright. When you purchase a
              dispute packet:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                You receive a license to use the generated documents for your
                personal dispute
              </li>
              <li>
                You may not resell, redistribute, or create derivative works
                from our templates
              </li>
              <li>
                You may share your generated documents with your landlord,
                attorneys, or courts as needed for your dispute
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Service Availability
            </h2>
            <p className="text-gray-600">
              We strive to keep DepositReady available at all times, but we do
              not guarantee uninterrupted service. We may temporarily suspend
              service for maintenance, updates, or circumstances beyond our
              control.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-gray-600">
              We may update these terms from time to time. Continued use of
              DepositReady after changes are posted constitutes acceptance of
              the new terms. Material changes will be announced on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              10. Governing Law
            </h2>
            <p className="text-gray-600">
              These terms are governed by the laws of the State of Florida. Any
              disputes arising from your use of DepositReady shall be resolved
              in the courts of Florida.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              11. Contact
            </h2>
            <p className="text-gray-600">
              For questions about these terms, contact us at:{" "}
              <a
                href="mailto:support@depositready.co"
                className="text-blue-600 hover:text-blue-700"
              >
                support@depositready.co
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
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
