import Link from "next/link";

export const metadata = {
  title: "Landlord Kept My Security Deposit? What to Do Next | DepositReady",
  description:
    "If your landlord kept your security deposit or charged unfair deductions, learn what to do next and how renters resolve deposit disputes fast.",
};

export default function LandlordKeptDepositPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            DepositReady
          </Link>
          <Link
            href="/wizard"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            Build my packet
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          My Landlord Kept My Security Deposit. What Can I Do?
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          If your landlord kept your security deposit or charged deductions that
          do not make sense, you are not alone. This happens to renters every
          day, and in many cases it violates state law.
        </p>

        <p className="text-gray-600 mb-6">
          The good news is that you often still have leverage, but only if you
          act correctly and on time. This page explains what landlords are
          required to do, what usually goes wrong, and how renters resolve
          deposit disputes.
        </p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              When Is a Landlord Allowed to Keep a Security Deposit?
            </h2>
            <p className="text-gray-600 mb-4">
              Landlords can only keep part or all of a security deposit for
              specific reasons, which usually include:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
              <li>Unpaid rent</li>
              <li>Documented damage beyond normal wear and tear</li>
              <li>Cleaning costs clearly outlined in the lease</li>
            </ul>
            <p className="text-gray-600">
              Landlords generally cannot deduct for normal wear and tear, routine
              maintenance, vague charges, or repairs without documentation. If
              the deductions feel inflated or unclear, that is often a red flag.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Most States Require a Deadline and Written Explanation
            </h2>
            <p className="text-gray-600 mb-4">
              In most states, landlords must return your security deposit or
              provide a written, itemized list of deductions within a strict
              deadline after you move out. These deadlines typically range from
              14 to 45 days depending on the state.
            </p>
            <p className="text-gray-600">
              If your landlord missed the deadline, failed to itemize
              deductions, or only gave verbal explanations, they may already be
              out of compliance.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Why Ignoring the Situation Usually Makes It Worse
            </h2>
            <p className="text-gray-600 mb-4">
              Many renters wait, send casual emails, or argue by phone.
              Unfortunately, that rarely works. Deadlines expire, leverage
              disappears, and landlords assume the issue will go away.
            </p>
            <p className="text-gray-600">
              Landlords respond when disputes are written, documented, and tied
              to legal deadlines.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What Actually Works to Get a Deposit Back
            </h2>
            <p className="text-gray-600 mb-4">
              Renters who successfully recover their deposits usually do three
              things:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
              <li>Reference the correct state deadline</li>
              <li>Include move out documentation and photos</li>
              <li>Send a formal written demand that creates a paper trail</li>
            </ul>
            <p className="text-gray-600">
              This does not require a lawyer. It requires sending the right
              document the right way.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              How DepositReady Helps
            </h2>
            <p className="text-gray-600 mb-4">
              DepositReady helps renters create a complete, professional security
              deposit dispute packet in minutes.
            </p>
            <p className="text-gray-600">
              You answer a few questions and DepositReady generates a demand
              letter customized to your state laws, a clear deadline reference,
              and a clean paper trail landlords take seriously.
            </p>
          </section>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-lg p-6 text-center mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to Get Your Deposit Back?
          </h2>
          <p className="text-gray-600 mb-6">
            Build a professional dispute packet customized to your state in
            minutes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/wizard"
              className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Build my dispute packet
            </Link>
            <Link
              href="/security-deposit-deadline"
              className="inline-block px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Check my deadline
            </Link>
            <Link
              href="/security-deposit-demand-letter"
              className="inline-block px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Write a demand letter
            </Link>
            <Link
              href="/security-deposit-dispute"
              className="inline-block px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              How to dispute a deposit
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p className="mb-4">
            DepositReady is not a law firm and does not provide legal advice. No
            outcomes are guaranteed. This page provides general information and
            is not legal advice.
          </p>
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/privacy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700">
              Terms of Service
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} DepositReady. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
