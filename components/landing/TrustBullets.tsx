function ShieldCheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

const bullets = [
  "State-specific statutes across 16 supported states",
  "Exact legal deadline calculations from your move-out date",
  "Formal demand letters with correct legal language",
  "Evidence checklists based on your state\u2019s requirements",
];

export function TrustBullets() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-8">
          Built on real rental law
        </h2>

        <ul className="space-y-4">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 text-gray-700 text-base leading-relaxed"
            >
              <ShieldCheckIcon />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
