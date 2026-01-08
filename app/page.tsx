import Link from "next/link";
import { getAllStates } from "@/lib/state-rules";

export default function Home() {
  const states = getAllStates();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">DepositReady</div>
          <div className="text-sm text-gray-500">Select your state below</div>
        </div>
      </header>

      {/* Hero */}
      <main id="main-content" className="max-w-5xl mx-auto px-4">
        <section className="py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Get Your Security Deposit Back
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Generate a complete dispute packet in 10 minutes. Customized demand
            letter, legal deadlines, and small claims guidance based on your
            state&apos;s laws.
          </p>

          {/* State Selector Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {states.map((state) => (
              <Link
                key={state.code}
                href={`/${state.slug}`}
                className="group p-6 bg-gray-50 hover:bg-blue-50 border-2 border-gray-100 hover:border-blue-200 rounded-xl transition-all text-left"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">
                    {state.name}
                  </span>
                  <span className="text-sm font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {state.code}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Return Deadline:</span>
                    <span className="font-medium">
                      {state.returnDeadline} days
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Small Claims Limit:</span>
                    <span className="font-medium">
                      ${state.maxSmallClaims.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Bad Faith Damages:</span>
                    <span className="font-medium capitalize">
                      {state.damagesDescription}
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-blue-600 font-medium group-hover:underline">
                  Start {state.name} packet &rarr;
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm text-gray-500">
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

        {/* How It Works */}
        <section className="py-16 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Select Your State",
                description:
                  "Choose your state above. We'll use your state's specific security deposit laws.",
              },
              {
                step: "2",
                title: "Answer Questions",
                description:
                  "10-minute wizard collects your move-out date, deposit amount, and landlord details.",
              },
              {
                step: "3",
                title: "Get Your Packet",
                description:
                  "Download your complete dispute packet. Print, sign, and send via certified mail.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white bg-blue-600 rounded-full">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
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
                description:
                  "Professional letter citing your state's statute, personalized with your dates, amounts, and landlord details.",
              },
              {
                title: "Legal Timeline Calculator",
                description:
                  "Know exactly if your landlord missed their deadline and what damages you can claim.",
              },
              {
                title: "Deductions Dispute Table",
                description:
                  "Line-by-line breakdown of each deduction with your rebuttal and legal basis for dispute.",
              },
              {
                title: "Small Claims Guide",
                description:
                  "Step-by-step instructions for filing in your state's small claims court.",
              },
              {
                title: "Evidence Checklist",
                description:
                  "Exactly what documentation to gather to support your case, from photos to receipts.",
              },
              {
                title: "Statute Reference",
                description:
                  "Key points of your state's security deposit law so you can cite it with confidence.",
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

        {/* FAQ */}
        <section className="py-16 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="group bg-gray-50 rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-medium text-gray-900">
                How long does it take to complete?
                <svg
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                Most people complete the wizard in about 10 minutes. You will
                need your move-out date, deposit amount, and landlord contact
                information handy.
              </div>
            </details>

            <details className="group bg-gray-50 rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-medium text-gray-900">
                Is this legal advice?
                <svg
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                No. DepositReady generates documents based on your state&apos;s
                security deposit laws, but we are not attorneys and this is not
                legal advice. For complex situations, please consult a licensed
                attorney.
              </div>
            </details>

            <details className="group bg-gray-50 rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-medium text-gray-900">
                Can I get a refund?
                <svg
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                Yes. If you are not satisfied with your dispute packet, contact
                us within 30 days for a full refund. No questions asked.
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Your Money Back?
          </h2>
          <p className="text-gray-600 mb-8">
            Select your state above to get started. The $39 packet pays for
            itself.
          </p>
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
