function ChatBubbleIcon() {
  return (
    <svg
      className="w-7 h-7 text-brand"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      className="w-7 h-7 text-brand"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

const steps = [
  {
    icon: ChatBubbleIcon,
    title: "Tell us what happened",
    description:
      "Answer a few questions about your situation and get a personalized case analysis based on your state's laws.",
  },
  {
    icon: DocumentIcon,
    title: "Get your documents",
    description:
      "Download a state-specific demand letter, dispute packet, or full case memo — ready to send.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-3">
            How it works
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Two steps to protect your deposit — no lawyer needed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {steps.map((step) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <step.icon />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
