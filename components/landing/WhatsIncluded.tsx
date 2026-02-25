import { Card, CardContent, CardTitle } from "@/components/ui";

const features = [
  {
    title: "Evidence checklist",
    description:
      "Know exactly what to photograph and how to organize it for maximum impact.",
    secondary:
      "Clear, chronological evidence reduces disputes.",
  },
  {
    title: "State deadline tracker",
    description:
      "Your state's deadlines and notice requirements — so you never miss a critical date.",
    secondary:
      "Missed deadlines are the #1 reason tenants lose.",
  },
  {
    title: "Ready-to-send demand letter",
    description:
      "State-compliant, professionally formatted, and addressed to your landlord.",
    secondary: "Written in language landlords take seriously.",
  },
  {
    title: "Complete dispute packet",
    description:
      "Your photos, timeline, and letter — organized into one packet.",
    secondary: "One document, ready to send or escalate.",
  },
];

export function WhatsIncluded() {
  return (
    <section id="whats-included" className="min-h-[calc(100dvh-124px)] sm:min-h-0 flex flex-col justify-center pt-20 pb-24 sm:pb-10 md:py-16 px-4 sm:px-6 snap-start">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl md:text-4xl font-semibold text-black mb-4">
            Your move-out toolkit
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Everything you need to protect your deposit.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 cursor-default">
              <CardTitle className="mb-3 text-base font-medium text-gray-700">{feature.title}</CardTitle>
              <CardContent className="p-0">
                <p className="text-gray-600 mb-2">{feature.description}</p>
                <p className="text-gray-500 text-sm">{feature.secondary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
