import Link from "next/link";

const tiers = [
  {
    name: "Demand Letter",
    price: 29,
    tagline: "State-specific letter ready to send",
    features: [
      "Custom demand letter",
      "Legal timeline",
      "Delivery instructions",
      "5 free chat messages",
    ],
    cta: "Get My Letter",
    href: "/quiz?product=basic",
    popular: false,
  },
  {
    name: "Full Package",
    price: 79,
    tagline: "Complete dispute documentation",
    features: [
      "Everything in Demand Letter",
      "Full dispute packet",
      "Case review memo",
      "Evidence checklist",
    ],
    cta: "Get Full Package",
    href: "/quiz?product=full",
    popular: true,
  },
  {
    name: "Premium",
    price: 149,
    tagline: "Everything + priority case review",
    features: [
      "Everything in Full Package",
      "Priority review",
      "Enhanced case analysis",
      "Follow-up support",
    ],
    cta: "Go Premium",
    href: "/case-review",
    popular: false,
  },
] as const;

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-accent flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-3">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
            Start free. Pay only when you need legal documents.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl border p-6 flex flex-col ${
                tier.popular
                  ? "border-accent border-2 shadow-md"
                  : "border-brand/30"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="font-serif text-xl font-semibold text-brand">
                {tier.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{tier.tagline}</p>

              <p className="mt-4 mb-6">
                <span className="text-4xl font-bold text-black">
                  ${tier.price}
                </span>
                <span className="text-gray-400 text-sm ml-1">one-time</span>
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`block text-center py-3 px-4 rounded-lg font-medium transition-colors min-h-[44px] ${
                  tier.popular
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "border border-brand text-brand hover:bg-brand-bg"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
