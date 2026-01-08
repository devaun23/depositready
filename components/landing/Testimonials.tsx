import { Card, CardContent } from "@/components/ui";

const testimonials = [
  {
    quote:
      "The timeline made everything clear. I knew exactly when my landlord's deadline was.",
    name: "Sarah M.",
    location: "California",
  },
  {
    quote:
      "Having everything in one organized packet gave me confidence when disputing unfair charges.",
    name: "Michael R.",
    location: "Texas",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-black mb-4">
            What renters are saying
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            DepositReady helps renters document and dispute charges. Outcomes
            depend on facts, timing, and local law.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <CardContent className="p-0">
                <blockquote className="font-serif text-xl text-black mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <p className="text-gray-500 text-sm">
                  &mdash; {testimonial.name}, {testimonial.location}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-400 text-sm">
          Individual results vary. Testimonials reflect personal experiences and
          are not guarantees of specific outcomes.
        </p>
      </div>
    </section>
  );
}
