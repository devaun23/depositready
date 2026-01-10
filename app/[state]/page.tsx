import { notFound } from "next/navigation";
import { getStateRules, getAllStateSlugs } from "@/lib/state-rules";
import { Navbar, Footer } from "@/components/landing";
import { Button, Card, CardContent, CardTitle } from "@/components/ui";
import { ViewLandingTracker } from "@/components/tracking";

// Generate static params for all supported states
export function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const rules = getStateRules(state);
  if (!rules) return { title: "State Not Found" };

  return {
    title: `Get Your Security Deposit Back in ${rules.name} | DepositReady`,
    description: rules.description,
  };
}

export default async function StateLandingPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const rules = getStateRules(state);

  if (!rules) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <ViewLandingTracker state={rules.code} />
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section className="py-10 md:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-4 md:mb-6 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
              {rules.name} Tenants
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight mb-4 md:mb-6">
              {rules.headline}
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
              Generate a complete dispute packet in 10 minutes. Customized
              demand letter, legal deadlines, and small claims guidance based on{" "}
              {rules.statuteTitle}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button href={`/${state}/wizard`} size="lg">
                Start Your Dispute Packet
              </Button>
              <Button href="#whats-included" variant="outline" size="lg">
                See what&apos;s included
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              $39 one-time purchase. Preview before you pay.
            </p>
          </div>
        </section>

        {/* State Law Section */}
        <section className="py-10 md:py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <CardTitle className="text-2xl mb-4">
                {rules.name} Law Is On Your Side
              </CardTitle>
              <CardContent className="p-0 space-y-4 text-gray-600">
                <p>
                  Under {rules.statuteTitle}, your landlord must return your
                  deposit within{" "}
                  <strong className="text-black">
                    {rules.returnDeadline} days
                  </strong>{" "}
                  if they are not claiming deductions, or send an itemized claim
                  within{" "}
                  <strong className="text-black">
                    {rules.claimDeadline} days
                  </strong>{" "}
                  if they are.
                </p>
                <p>
                  If they miss these deadlines, they forfeit the right to claim
                  deductions. If they act in bad faith, you may be entitled to{" "}
                  <strong className="text-black">
                    {rules.damagesDescription}
                  </strong>
                  .
                  {rules.additionalDamages && (
                    <> Additional remedies: {rules.additionalDamages}</>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  This tool generates documents based on current {rules.name}{" "}
                  law. It is not legal advice.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Stats */}
        <section className="py-10 md:py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-6 md:mb-8 text-center">
              {rules.name} Security Deposit Rules
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="font-serif text-4xl font-semibold text-black mb-2">
                    {rules.returnDeadline}
                  </div>
                  <div className="text-gray-600">Days to Return</div>
                  <div className="text-sm text-gray-500 mt-1">
                    (if no deductions claimed)
                  </div>
                </CardContent>
              </Card>
              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="font-serif text-4xl font-semibold text-black mb-2">
                    ${rules.maxSmallClaims.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Small Claims Limit</div>
                  {rules.smallClaimsNote && (
                    <div className="text-sm text-gray-500 mt-1">
                      {rules.smallClaimsNote}
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="font-serif text-4xl font-semibold text-black mb-2 capitalize">
                    {rules.damagesDescription}
                  </div>
                  <div className="text-gray-600">For Bad Faith</div>
                  <div className="text-sm text-gray-500 mt-1">
                    (if landlord acted willfully)
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section id="whats-included" className="py-10 md:py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-6 md:mb-8 text-center">
              Your Complete Dispute Packet
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Customized Demand Letter",
                  description: `Professional letter citing ${rules.statuteTitle}, personalized with your dates, amounts, and landlord details.`,
                },
                {
                  title: "Legal Timeline Calculator",
                  description: `Know exactly if your landlord missed the ${rules.returnDeadline}-day or ${rules.claimDeadline}-day deadline and what damages you can claim.`,
                },
                {
                  title: "Deductions Dispute Table",
                  description:
                    "Line-by-line breakdown of each deduction with your rebuttal and legal basis for dispute.",
                },
                {
                  title: "Small Claims Guide",
                  description: `Step-by-step instructions for filing in ${rules.name} small claims court if your demand is ignored.`,
                },
              ].map((item, i) => (
                <Card key={i} className="p-6">
                  <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                  <CardContent className="p-0 text-gray-600">
                    {item.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 md:py-16 px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-4">
              Ready to Get Your Money Back?
            </h2>
            <p className="text-gray-600 mb-8">
              Most tenants recover 100% of their deposit. The $39 packet pays
              for itself.
            </p>
            <Button href={`/${state}/wizard`} size="lg">
              Start Your Dispute Packet
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
