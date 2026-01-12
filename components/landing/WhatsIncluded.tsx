import { Card, CardContent, CardTitle } from "@/components/ui";

const features = [
  {
    title: "Photo checklist and labeling guide",
    description:
      "Know exactly what to photograph and how to organize your evidence for maximum impact.",
    secondary:
      "Reduces disputes by showing condition clearly and chronologically.",
  },
  {
    title: "State deadline timeline",
    description:
      "Your state's specific deadlines and notice requirements, so you never miss a critical date.",
    secondary:
      "Missed deadlines are the most common reason tenants lose disputes.",
  },
  {
    title: "Notice letter template",
    description:
      "A professionally formatted, state-compliant letter ready to send to your landlord.",
    secondary: "Uses neutral, professional language landlords recognize.",
  },
  {
    title: "Dispute packet summary page",
    description:
      "A comprehensive summary tying together your photos, timeline, and documentation.",
    secondary: "Creates a single document you can reuse if you escalate.",
  },
];

export function WhatsIncluded() {
  return (
    <section id="whats-included" className="min-h-[calc(100dvh-124px)] sm:min-h-0 flex flex-col justify-center pt-20 pb-24 sm:pb-10 md:py-16 px-4 sm:px-6 snap-start">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl md:text-4xl font-semibold text-black mb-4">
            What&apos;s included
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Everything you need to document your move-out and protect your
            deposit.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Each piece helps you document your move-out, notify your landlord,
            and escalate if needed.
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
