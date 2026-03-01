import Link from "next/link";

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

const features = [
  "Custom demand letter for your state",
  "State law breakdown and deadlines",
  "Legal timeline with key dates",
  "Evidence checklist",
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6 bg-[var(--section-bg-alt)]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-3">
          Simple, transparent pricing
        </h2>
        <p className="text-gray-500 text-base md:text-lg mb-10">
          Start free. Pay only when you need legal documents.
        </p>

        {/* Primary card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[var(--shadow-elevated)]">
          <h3 className="font-serif text-xl font-semibold text-brand">
            Demand Letter Package
          </h3>
          <p className="mt-2 mb-6">
            <span className="text-4xl font-bold text-black">$29</span>
            <span className="text-gray-400 text-sm ml-1">one-time</span>
          </p>

          <ul className="space-y-3 mb-8">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <CheckIcon />
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href="/quiz?product=basic"
            className="block text-center py-3 px-4 rounded-xl font-medium bg-accent text-white hover:bg-accent-hover transition-colors min-h-[44px]"
          >
            Get My Letter
          </Link>
        </div>

        {/* Secondary options */}
        <div className="mt-8 space-y-4">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-4">
            <div>
              <p className="font-semibold text-sm text-black">
                Full Dispute Package
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Complete dispute documentation with case review memo
              </p>
            </div>
            <Link
              href="/quiz?product=full"
              className="text-sm font-medium text-brand hover:text-brand-light transition-colors flex-shrink-0 ml-4"
            >
              $79 &rarr;
            </Link>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <p className="font-semibold text-sm text-black">
                Priority Case Review
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Enhanced analysis with follow-up support
              </p>
            </div>
            <Link
              href="/case-review"
              className="text-sm font-medium text-brand hover:text-brand-light transition-colors flex-shrink-0 ml-4"
            >
              $149 &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
