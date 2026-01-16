const withoutItems = [
  "Ignore the letter and hope it goes away",
  "Panic-pay the full amount to avoid conflict",
  "Miss your response deadline",
  "Hire a lawyer ($500+ per hour)",
  "Show up to court unprepared",
];

const withItems = [
  "Respond professionally with state-correct language",
  "Know exactly what you owe (and what you don't)",
  "Meet every critical deadline",
  "Get organized for $79 — one time",
  "Walk into court with organized evidence",
];

export function ComparisonBlock() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl md:text-4xl font-semibold text-black mb-4">
            The Difference
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            One missed deadline can cost thousands. This costs $79.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Without */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-6">
            <h3 className="font-semibold text-red-800 mb-4 text-lg">
              Without DepositReady
            </h3>
            <ul className="space-y-3">
              {withoutItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-0.5">✗</span>
                  <span className="text-red-900 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-6">
            <h3 className="font-semibold text-green-800 mb-4 text-lg">
              With DepositReady
            </h3>
            <ul className="space-y-3">
              {withItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span className="text-green-900 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
