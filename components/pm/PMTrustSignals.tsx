const SIGNALS = [
  {
    stat: "FL §83.49",
    label: "Compliant",
    description: "Every packet follows Florida Statute 83.49 requirements",
  },
  {
    stat: "30 Days",
    label: "Your Deadline",
    description: "You must send certified mail notice within 30 days of move-out",
  },
  {
    stat: "3x",
    label: "Potential Damages",
    description: "Non-compliance can result in triple damages plus attorney fees",
  },
];

export function PMTrustSignals() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 snap-start">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black text-center mb-10">
          Why Compliance Matters
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {SIGNALS.map((signal) => (
            <div key={signal.stat} className="text-center">
              <p className="text-3xl font-semibold text-black mb-1">
                {signal.stat}
              </p>
              <p className="text-sm font-medium text-gray-900 mb-2">
                {signal.label}
              </p>
              <p className="text-sm text-gray-600">{signal.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Did you know?</span> If you miss the
            30-day notice deadline, you forfeit your right to claim ANY
            deductions — even legitimate ones. Most small claims judges rule
            against landlords who can&apos;t show proper documentation and timely
            notice.
          </p>
        </div>
      </div>
    </section>
  );
}
