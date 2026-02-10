const PACKET_PAGES = [
  {
    title: "Notice of Intent to Impose Claim",
    description:
      "The legally required letter per FL §83.49(3)(a), with exact statutory language, certified mail header, and proper formatting.",
    pages: "Pages 2-3",
  },
  {
    title: "Itemized Deductions Statement",
    description:
      "Detailed breakdown by category with evidence references, subtotals, and deposit balance calculation.",
    pages: "Page 4",
  },
  {
    title: "Evidence Documentation Checklist",
    description:
      "Per-deduction checklist showing what evidence you have and what you need to gather before sending.",
    pages: "Page 5",
  },
  {
    title: "Certified Mail Instructions & Timeline",
    description:
      "Step-by-step USPS guide, deadline calculator, and Certificate of Service for proof of mailing.",
    pages: "Page 6",
  },
];

export function PMWhatsIncluded() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-gray-50 snap-start">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black text-center mb-4">
          What&apos;s in Your Packet
        </h2>
        <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
          A 6-page, court-ready PDF packet with everything you need to comply
          with Florida Statute 83.49.
        </p>

        <div className="space-y-4">
          {PACKET_PAGES.map((page) => (
            <div
              key={page.title}
              className="bg-white rounded-lg border border-gray-200 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-black mb-1">{page.title}</h3>
                  <p className="text-sm text-gray-600">{page.description}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap mt-1">
                  {page.pages}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
