import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">DepositReady</div>
          <Link
            href="/wizard"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Start Your Packet
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-4">
        <section className="py-16 md:py-24 text-center">
          <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-amber-700 bg-amber-50 rounded-full">
            Florida Tenants Only
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Get Your Security Deposit Back
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate a complete dispute packet in 10 minutes. Customized demand
            letter, legal deadlines, and small claims guidance based on Florida
            Statute 83.49.
          </p>
          <Link
            href="/wizard"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Start Your Dispute Packet
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            $39 one-time purchase. Preview before you pay.
          </p>
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
                  "Professional letter citing Florida Statute 83.49, personalized with your dates, amounts, and landlord details.",
              },
              {
                title: "Legal Timeline Calculator",
                description:
                  "Know exactly if your landlord missed the 15 or 30-day deadline and what damages you can claim.",
              },
              {
                title: "Deductions Dispute Table",
                description:
                  "Line-by-line breakdown of each deduction with your rebuttal and legal basis for dispute.",
              },
              {
                title: "Small Claims Guide",
                description:
                  "Step-by-step instructions for filing in Florida small claims court if your demand is ignored.",
              },
              {
                title: "Evidence Checklist",
                description:
                  "Exactly what documentation to gather to support your case, from photos to receipts.",
              },
              {
                title: "Statute Reference",
                description:
                  "Full text of Florida security deposit law so you can cite it with confidence.",
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

        {/* How It Works */}
        <section className="py-16 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Answer Questions",
                description:
                  "10-minute wizard collects your move-out date, deposit amount, and landlord details.",
              },
              {
                step: "2",
                title: "Preview Your Packet",
                description:
                  "See exactly what you will receive before paying. No surprises.",
              },
              {
                step: "3",
                title: "Download and Send",
                description:
                  "Get your complete packet instantly. Print, sign, and send via certified mail.",
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

        {/* Florida Specific */}
        <section className="py-16 border-t border-gray-100">
          <div className="max-w-3xl mx-auto bg-amber-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Florida Law Is On Your Side
            </h2>
            <p className="text-gray-700 mb-4">
              Under Florida Statute 83.49, your landlord must return your
              deposit within <strong>15 days</strong> if they are not claiming
              deductions, or send an itemized claim within{" "}
              <strong>30 days</strong> if they are.
            </p>
            <p className="text-gray-700 mb-4">
              If they miss these deadlines, they forfeit the right to claim
              deductions. If they act in bad faith, you may be entitled to{" "}
              <strong>triple damages</strong>.
            </p>
            <p className="text-gray-600 text-sm">
              This tool generates documents based on current Florida law. It is
              not legal advice. For complex situations, consult an attorney.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Your Money Back?
          </h2>
          <p className="text-gray-600 mb-8">
            Most tenants recover 100% of their deposit. The $39 packet pays for
            itself.
          </p>
          <Link
            href="/wizard"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Start Your Dispute Packet
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            DepositReady is not a law firm and does not provide legal advice.
          </p>
          <p className="mt-2">Florida tenants only. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
