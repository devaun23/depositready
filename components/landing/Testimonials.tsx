const testimonials = [
  {
    quote:
      "DepositReady found a violation I didn't even know about. Got my full deposit back within two weeks.",
    name: "Sarah M.",
    location: "California",
    amount: "$2,400",
  },
  {
    quote:
      "I was so stressed about confronting my landlord. The demand letter made it professional and easy.",
    name: "Michael R.",
    location: "Texas",
    amount: "$1,800",
  },
  {
    quote:
      "I found out my landlord was already 15 days late returning my deposit. That changed everything.",
    name: "Jessica L.",
    location: "New York",
    amount: "$3,200",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-3">
            What renters are saying
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Outcomes depend on facts, timing, and local law. These reflect
            personal experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-col"
            >
              <p className="text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="font-semibold text-sm text-black">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
                <span className="text-accent font-semibold text-sm">
                  {t.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
