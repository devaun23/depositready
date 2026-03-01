const bullets = [
  {
    title: "State-specific statutes",
    description: "Across 16 supported states with exact legal references",
  },
  {
    title: "Deadline calculations",
    description: "Exact legal deadlines from your move-out date",
  },
  {
    title: "Recovery letters",
    description: "Correct legal language for your jurisdiction",
  },
  {
    title: "Evidence checklists",
    description: "Based on your state\u2019s specific requirements",
  },
];

export function TrustBullets() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-8">
          Built on real rental law
        </h2>

        {/* 2x2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {bullets.map((bullet) => (
            <div
              key={bullet.title}
              className="border-l-4 border-accent bg-white rounded-r-xl p-5 shadow-sm"
            >
              <p className="font-semibold text-base text-black mb-1">
                {bullet.title}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {bullet.description}
              </p>
            </div>
          ))}
        </div>

        {/* Guarantee badge */}
        <div className="mt-8 flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-200/60 px-5 py-4">
          <svg
            className="w-8 h-8 text-amber-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <div>
            <p className="font-semibold text-sm text-amber-900">
              7-day money-back guarantee
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Not satisfied with your documents? Full refund, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
