const steps = [
  {
    number: "01",
    title: "Set your legal timeline",
    description:
      "Tell us your state and move-out date. We'll calculate your deadlines and requirements.",
  },
  {
    number: "02",
    title: "Lock in your evidence",
    description:
      "Upload your move-out photos. We'll help you label and organize them properly.",
  },
  {
    number: "03",
    title: "Send a professional dispute",
    description:
      "Download your complete packet with notice letter, timeline, and documentation.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-black mb-4">
            How it works
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center md:text-left cursor-default">
              <div className="font-serif text-4xl md:text-5xl font-semibold text-gray-200 mb-4 select-none">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Supporting Line */}
        <p className="text-center text-gray-500 mt-12">
          Most renters complete their packet in under 10 minutes.
        </p>
      </div>
    </section>
  );
}
