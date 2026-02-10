export function PMPricing() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-gray-50 snap-start">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-4">
          Simple Pricing
        </h2>
        <p className="text-gray-600 mb-8">
          One price. One packet. Complete FL §83.49 compliance.
        </p>

        <div className="bg-white border-2 border-black rounded-lg p-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            Per Packet
          </p>
          <p className="text-5xl font-semibold text-black mb-2">$29</p>
          <p className="text-gray-600 mb-6">
            One-time purchase per move-out
          </p>

          <a
            href="/pm/wizard"
            className="inline-flex items-center justify-center bg-black text-white px-8 py-4 text-lg font-medium rounded hover:bg-gray-800 transition-colors w-full min-h-[48px] mb-4"
          >
            Generate My Packet
          </a>

          <ul className="text-left space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-green-600">&#10003;</span>
              6-page FL §83.49-compliant PDF
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">&#10003;</span>
              Instant download after payment
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">&#10003;</span>
              Court-ready formatting
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">&#10003;</span>
              Certified mail instructions included
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">&#10003;</span>
              No subscription — pay only when you need it
            </li>
          </ul>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Secure payment via Stripe. Download link never expires.
        </p>
      </div>
    </section>
  );
}
