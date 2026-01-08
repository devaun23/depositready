import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | DepositReady",
  description:
    "Privacy Policy for DepositReady - Florida Security Deposit Dispute Tool",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: January 2026</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              When you use DepositReady, we collect the following information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <strong>Contact Information:</strong> Your name, email address,
                phone number, and mailing address
              </li>
              <li>
                <strong>Rental Information:</strong> Property address, landlord
                contact details, lease dates, and deposit amounts
              </li>
              <li>
                <strong>Dispute Details:</strong> Information about deductions,
                evidence you have, and prior communications with your landlord
              </li>
              <li>
                <strong>Payment Information:</strong> Processed securely through
                Stripe; we do not store your credit card details
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                To generate your personalized dispute packet based on Florida
                Statute 83.49
              </li>
              <li>To process your payment through our payment provider</li>
              <li>
                To provide you with a permanent download link for your documents
              </li>
              <li>
                To send you a receipt and any important updates about your
                purchase
              </li>
              <li>
                To improve our service and develop new features (using
                anonymized, aggregated data)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Data Storage and Security
            </h2>
            <p className="text-gray-600 mb-4">
              Your data is stored securely in encrypted databases. We use
              industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>All data is encrypted in transit using TLS/SSL</li>
              <li>Database access is restricted and monitored</li>
              <li>Payment processing is handled by Stripe (PCI-DSS compliant)</li>
              <li>
                We retain your order data to allow you to re-download your
                documents
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-600 mb-4">We use the following services:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <strong>Stripe:</strong> For secure payment processing
              </li>
              <li>
                <strong>Vercel:</strong> For hosting our website
              </li>
              <li>
                <strong>Supabase:</strong> For secure data storage
              </li>
            </ul>
            <p className="text-gray-600 mt-4">
              These services have their own privacy policies governing their use
              of your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Request a copy of your data</li>
              <li>Request deletion of your data</li>
              <li>Update or correct your information</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="text-gray-600 mt-4">
              To exercise these rights, please contact us at the email below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Data Retention
            </h2>
            <p className="text-gray-600">
              We retain your order data and generated documents indefinitely to
              allow you to re-download your dispute packet at any time. If you
              request deletion of your data, we will remove it within 30 days,
              which will also disable your download link.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Cookies and Analytics
            </h2>
            <p className="text-gray-600">
              We use privacy-friendly analytics to understand how visitors use
              our site. We do not use tracking cookies or share data with
              advertisers. Essential cookies may be used for payment processing
              and maintaining your session.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. We will
              notify you of any material changes by posting the new policy on
              this page with an updated date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600">
              If you have questions about this privacy policy or your data,
              please contact us at:{" "}
              <a
                href="mailto:privacy@depositready.co"
                className="text-blue-600 hover:text-blue-700"
              >
                privacy@depositready.co
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
