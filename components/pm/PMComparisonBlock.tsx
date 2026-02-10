const OPTIONS = [
  {
    title: "Do Nothing",
    price: "$2,000–$8,000+",
    description: "Risk triple damages + attorney fees if tenant sues",
    items: [
      "Miss the 30-day certified mail deadline",
      "Forfeit right to claim deductions under §83.49",
      "Face up to 3x deposit in damages",
      "Pay tenant's attorney fees and court costs",
    ],
    highlight: false,
    verdict: "Most expensive option",
  },
  {
    title: "Hire an Attorney",
    price: "$200–$500/hr",
    description: "A lawyer drafts the notice and handles compliance",
    items: [
      "Minimum 1-2 hours of attorney time",
      "May take days to schedule and draft",
      "Same template-based letter you can generate yourself",
      "Overkill for straightforward deposit dispositions",
    ],
    highlight: false,
    verdict: "Overpriced for this task",
  },
  {
    title: "DepositReady",
    price: "$29",
    description: "FL §83.49-compliant packet in 10 minutes",
    items: [
      "Legally formatted Notice of Intent",
      "Itemized deductions with evidence references",
      "Certified mail instructions + timeline",
      "Certificate of Service for proof of mailing",
    ],
    highlight: true,
    verdict: "Best value",
  },
];

export function PMComparisonBlock() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 snap-start">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black text-center mb-10">
          $29 vs. $500/hr vs. a Lawsuit
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {OPTIONS.map((option) => (
            <div
              key={option.title}
              className={`rounded-lg border p-5 ${
                option.highlight
                  ? "border-black border-2 bg-white"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              {option.highlight && (
                <div className="text-xs font-medium text-white bg-black inline-block px-2 py-0.5 rounded mb-3">
                  Recommended
                </div>
              )}
              <h3 className="font-medium text-black text-lg mb-1">
                {option.title}
              </h3>
              <p className="text-2xl font-semibold text-black mb-2">
                {option.price}
              </p>
              <p className="text-sm text-gray-600 mb-4">{option.description}</p>
              <ul className="space-y-2">
                {option.items.map((item) => (
                  <li
                    key={item}
                    className={`text-sm flex items-start gap-2 ${
                      option.highlight ? "text-gray-700" : "text-gray-500"
                    }`}
                  >
                    <span className={option.highlight ? "text-green-600" : "text-gray-400"}>
                      {option.highlight ? "\u2713" : "\u2022"}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p
                className={`text-xs mt-4 font-medium ${
                  option.highlight ? "text-green-700" : "text-gray-400"
                }`}
              >
                {option.verdict}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
