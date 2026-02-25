const steps = [
  {
    number: "01",
    title: "Set your timeline",
    description:
      "Enter your state and move-out date. We calculate your deadlines automatically.",
  },
  {
    number: "02",
    title: "Lock in your evidence",
    description:
      "Upload your move-out photos. We help you label and organize them.",
  },
  {
    number: "03",
    title: "Send your dispute",
    description:
      "Download your complete packet — demand letter, timeline, and documentation included.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-10 md:py-16 px-4 sm:px-6 bg-brand-bg">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl md:text-4xl font-semibold text-black mb-4">
            Three steps. No lawyer.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center md:text-left cursor-default">
              <div className="font-serif text-3xl md:text-5xl font-semibold text-brand/20 mb-3 md:mb-4 select-none">
                {step.number}
              </div>
              <h3 className="text-lg font-medium text-black mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Supporting Line */}
        <p className="text-center text-gray-500 mt-8 md:mt-12">
          Most renters finish in under 10 minutes.
        </p>
      </div>
    </section>
  );
}
