import { Card, CardContent, CardTitle } from "@/components/ui";

const features = [
  {
    title: "State-Specific Response Letter",
    description:
      "A professionally formatted response that addresses the tenant's claims without admitting liability.",
    secondary:
      "Correct notice language and deadline-compliant formatting for your state.",
  },
  {
    title: "Deduction Documentation Checklist",
    description:
      "Know exactly what evidence you need to justify your deductions and what to avoid including.",
    secondary:
      "Organized by category: cleaning, repairs, unpaid rent, damages.",
  },
  {
    title: "Settle vs Fight Decision Framework",
    description:
      "A clear decision matrix for when to negotiate, when to refund, and when to prepare for court.",
    secondary:
      "Based on your specific situation, exposure amount, and state law.",
  },
  {
    title: "Small Claims Court Prep Guide",
    description:
      "Step-by-step guide if the tenant files suit. What to bring, how to present, what judges look for.",
    secondary:
      "Includes evidence organization templates and common landlord mistakes to avoid.",
  },
  {
    title: "Deadline Tracking Timeline",
    description:
      "A calendar with all critical dates: response deadline, court filing windows, and next steps.",
    secondary:
      "Know exactly what happens if the tenant ignores you or escalates.",
  },
];

export function LandlordWhatsIncluded() {
  return (
    <section
      id="whats-included"
      className="min-h-[calc(100dvh-124px)] sm:min-h-0 flex flex-col justify-center pt-20 pb-24 sm:pb-10 md:py-16 px-4 sm:px-6 snap-start"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl md:text-4xl font-semibold text-black mb-4">
            Everything You Need to Respond Correctly
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            A complete response system — not just a template.
          </p>
        </div>

        {/* Feature Grid - 5 items: 2+2+1 layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.slice(0, 4).map((feature, index) => (
            <Card key={index} className="p-6 cursor-default">
              <CardTitle className="mb-3 text-base font-medium text-gray-700">
                {feature.title}
              </CardTitle>
              <CardContent className="p-0">
                <p className="text-gray-600 mb-2">{feature.description}</p>
                <p className="text-gray-500 text-sm">{feature.secondary}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fifth item - full width */}
        <div className="mt-6">
          <Card className="p-6 cursor-default md:max-w-xl md:mx-auto">
            <CardTitle className="mb-3 text-base font-medium text-gray-700">
              {features[4].title}
            </CardTitle>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-2">{features[4].description}</p>
              <p className="text-gray-500 text-sm">{features[4].secondary}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
