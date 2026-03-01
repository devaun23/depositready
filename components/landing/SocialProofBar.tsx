const stats = [
  { value: "2,400+", label: "renters helped" },
  { value: "$3.2M+", label: "analyzed" },
  { value: "16", label: "states covered" },
];

export function SocialProofBar() {
  return (
    <section className="bg-[var(--section-bg-alt)] py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-8 sm:gap-16">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-brand">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
