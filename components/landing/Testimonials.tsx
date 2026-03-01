const testimonials = [
  {
    quote:
      "DepositReady found a violation I didn't even know about. Got my full deposit back within two weeks.",
    name: "Sarah M.",
    location: "California",
    amount: "$2,400",
    initials: "SM",
  },
  {
    quote:
      "I was so stressed about confronting my landlord. The demand letter made it professional and easy.",
    name: "Michael R.",
    location: "Texas",
    amount: "$1,800",
    initials: "MR",
  },
  {
    quote:
      "I found out my landlord was already 15 days late returning my deposit. That changed everything.",
    name: "Jessica L.",
    location: "New York",
    amount: "$3,200",
    initials: "JL",
  },
  {
    quote:
      "The chat walked me through my rights step by step. I had my letter sent the same day.",
    name: "David K.",
    location: "Georgia",
    amount: "$1,450",
    initials: "DK",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 px-4 sm:px-6 bg-[var(--section-bg-alt)]"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-10">
          Real Renters. Real Results.
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
            >
              <p className="text-2xl font-bold text-accent mb-3">
                {t.amount}{" "}
                <span className="text-sm font-normal text-gray-500">
                  recovered
                </span>
              </p>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-black">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-gray-400 max-w-lg">
          Outcomes depend on facts, timing, and local law. These reflect
          personal experiences.
        </p>
      </div>
    </section>
  );
}
