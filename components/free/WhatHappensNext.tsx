export function WhatHappensNext() {
  const steps = [
    {
      number: "01",
      title: "Generate your letter",
      description: "Enter your info and get a personalized demand letter with state law citations.",
    },
    {
      number: "02",
      title: "Send via certified mail",
      description: "Print and send your letter with return receipt requested for proof of delivery.",
    },
    {
      number: "03",
      title: "Wait for response",
      description: "Most landlords respond within 14 days. Your letter creates a paper trail.",
    },
  ];

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-8 text-center">
          What happens next
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white font-medium mb-4">
                {step.number}
              </div>
              <h3 className="font-medium text-black mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
