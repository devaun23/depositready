const trustItems = [
  {
    icon: "📋",
    title: "Built from state statutes",
    description:
      "Templates are based on actual landlord-tenant court procedures and state law requirements.",
  },
  {
    icon: "🏠",
    title: "Designed for small landlords",
    description:
      "Not a property management platform. Just the tools you need to respond correctly.",
  },
  {
    icon: "⚖️",
    title: "Not legal advice",
    description:
      "We provide structured guidance and templates — not attorney representation.",
  },
];

export function TrustSignals() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Trust Items */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {trustItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Guarantee Box */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center max-w-xl mx-auto">
          <h3 className="font-semibold text-gray-900 mb-2">
            24-Hour Refund Guarantee
          </h3>
          <p className="text-gray-600 text-sm">
            If you don't find this useful, request a full refund within 24 hours.
            No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
