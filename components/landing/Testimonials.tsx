import { Card, CardContent } from "@/components/ui";

const testimonials = [
  {
    quote:
      "My landlord tried to keep $1,200 for 'cleaning fees.' I sent the demand letter and got a check for $1,050 within 10 days.",
    name: "Jessica T.",
    location: "Florida",
    amount: "$1,050 recovered",
  },
  {
    quote:
      "The deadline calculator showed my landlord was 3 weeks late. I cited the statute in my letter and got my full $1,800 back.",
    name: "Marcus W.",
    location: "Texas",
    amount: "$1,800 recovered",
  },
  {
    quote:
      "I was ready to give up on my $900 deposit. The packet gave me confidence to push back. Settled for $750.",
    name: "Amanda K.",
    location: "California",
    amount: "$750 recovered",
  },
  {
    quote:
      "Landlord claimed $400 in damages that didn't exist. The evidence checklist helped me prove it. Full deposit returned.",
    name: "David R.",
    location: "Georgia",
    amount: "$1,400 recovered",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-10 md:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl md:text-4xl font-semibold text-black mb-4">
            What renters are saying
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            DepositReady helps renters document and dispute charges. Outcomes
            depend on facts, timing, and local law.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 cursor-default">
              <CardContent className="p-0">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    {testimonial.amount}
                  </span>
                </div>
                <blockquote className="font-serif text-lg text-black mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <p className="text-gray-500 text-sm">
                  &mdash; {testimonial.name}, {testimonial.location}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
