import type { Metadata } from "next";
import Link from "next/link";
import {
  SEOPageLayout,
  SEOHeroWithCTA,
  SEOSection,
  SEOCheckList,
  SEOFAQWithSchema,
  SEOCTA,
  SEORelatedResources,
  SEODisclaimer,
  SEOCallout,
} from "@/components/seo";

export const metadata: Metadata = {
  title: "Normal Wear and Tear vs Damage: What Landlords Can't Charge For",
  description:
    "Learn what counts as normal wear and tear on a rental property. Landlords cannot deduct for faded paint, worn carpets, or minor scuffs. Know your rights and dispute unfair charges.",
};

export default function NormalWearAndTearPage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Normal Wear and Tear vs. Damage"
        subtitle="What Your Landlord Can (and Can't) Charge You For"
        intro="Every state prohibits landlords from deducting for normal wear and tear. But what counts as 'normal'? Understanding the difference can save you hundreds—or even thousands—of dollars."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Know your rights · Dispute unfair charges · Not legal advice"
      />

      <SEOSection title="The golden rule: Landlords cannot charge for normal wear and tear">
        <p>
          This is one of the most fundamental tenant protections in every state.{" "}
          <strong>Normal wear and tear</strong> is the natural deterioration
          that occurs from ordinary, everyday use of a rental property.
        </p>
        <SEOCallout variant="info">
          If something would wear out over time regardless of who lived there,
          it&apos;s probably normal wear and tear—not damage.
        </SEOCallout>
        <p>
          Landlords often try to charge for things that are clearly normal wear
          and tear. Knowing the difference gives you the leverage to dispute.
        </p>
      </SEOSection>

      <SEOSection title="What IS normal wear and tear" variant="gray">
        <p>
          These are examples of conditions landlords{" "}
          <strong>cannot charge you for</strong>:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Faded or slightly discolored paint from sunlight",
            "Minor scuffs and nail holes in walls",
            "Worn carpet in high-traffic areas (hallways, doorways)",
            "Light marks or scratches on hardwood floors",
            "Faded or worn window blinds",
            "Loose door handles or hinges from regular use",
            "Minor marks around light switches and door knobs",
            "Dusty or dirty HVAC vents",
            "Worn caulking in bathrooms",
            "Faded grout in tile",
          ]}
        />
        <p>
          These conditions develop naturally over time. A tenant shouldn&apos;t pay
          to return the property to &quot;like new&quot; condition.
        </p>
      </SEOSection>

      <SEOSection title="What IS tenant damage">
        <p>
          These are examples of conditions landlords{" "}
          <strong>can legitimately deduct for</strong>:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Large holes in walls (beyond nail holes)",
            "Burns, stains, or tears in carpet",
            "Broken windows or doors",
            "Pet damage (scratches, stains, odors)",
            "Crayon, marker, or paint on walls",
            "Broken appliances from misuse",
            "Missing fixtures or hardware",
            "Mold from failure to report leaks",
            "Excessive dirt requiring professional cleaning",
            "Unauthorized modifications",
          ]}
        />
        <p>
          The key distinction: damage results from <strong>misuse, abuse, or neglect</strong>
          —not from simply living in the space.
        </p>
      </SEOSection>

      <SEOSection title="The carpet controversy" variant="gray">
        <p>
          Carpet is the most common source of security deposit disputes. Here&apos;s
          what you need to know:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Carpet has a limited lifespan (typically 5-10 years)",
            "Worn paths in hallways = normal wear and tear",
            "Faded carpet from sunlight = normal wear and tear",
            "Pet stains, burns, or tears = tenant damage",
            "Landlords often charge full replacement when carpet was already old",
          ]}
        />
        <SEOCallout variant="tip">
          <strong>Pro tip:</strong> If the carpet was already several years old
          when you moved in, the landlord should prorate any replacement
          cost—not charge you for new carpet.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="State-by-state variations">
        <p>
          While all states prohibit normal wear and tear deductions, some have
          specific rules:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Colorado (2026): Carpet can't be charged if not replaced in 10+ years",
            "Massachusetts: No deductions for 'reasonable wear and tear' (2025 case law)",
            "California: Landlords must prorate based on useful life",
            "Many states: Require itemized deductions with receipts",
          ]}
        />
        <p>
          Check your{" "}
          <Link
            href="/security-deposit-deadline"
            className="text-black underline hover:text-gray-600"
          >
            state&apos;s specific rules
          </Link>{" "}
          for additional protections.
        </p>
      </SEOSection>

      <SEOSection title="How to dispute wear and tear charges" variant="gray">
        <p>If your landlord charged for normal wear and tear:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Review the itemized deduction list carefully</li>
          <li>Identify which charges are for normal wear and tear</li>
          <li>Gather your move-in and move-out photos</li>
          <li>Research your state&apos;s specific rules</li>
          <li>
            Send a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              formal demand letter
            </Link>{" "}
            citing the law
          </li>
          <li>Escalate to small claims court if needed</li>
        </ol>
        <p>
          Most disputes resolve once landlords realize you know the law.
        </p>
      </SEOSection>

      <SEOSection title="Built for disputing unfair deductions">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Identify which charges violate normal wear and tear rules",
            "Calculate your state's deadline for landlord response",
            "Generate a professional demand letter citing the law",
            "Organize evidence for small claims court",
            "Create a complete dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQWithSchema
        title="Normal Wear and Tear FAQ"
        items={[
          {
            question: "Can my landlord charge for painting?",
            answer: "Generally no, unless there's actual damage beyond normal fading or small nail holes. Paint is expected to fade and need refreshing between tenants.",
          },
          {
            question: "What about carpet cleaning?",
            answer: "Most states don't allow mandatory carpet cleaning charges unless the carpet is actually damaged or excessively dirty beyond normal use.",
          },
          {
            question: "How long does carpet 'normally' last?",
            answer: "Typical carpet lifespan is 5-10 years depending on quality. If you're charged for carpet that was already 7 years old, you have a strong case.",
          },
          {
            question: "Can landlords charge for professional cleaning?",
            answer: "Only if you left the property excessively dirty—not for normal cleaning between tenants. 'Broom clean' is usually the standard.",
          },
        ]}
      />

      <SEOCTA
        title="Dispute unfair wear and tear charges"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download."
        primaryButton={{
          text: "Start My Dispute Packet",
          href: "/wizard",
        }}
        secondaryButtons={[
          { text: "My landlord kept my deposit", href: "/landlord-kept-security-deposit" },
          { text: "Write a demand letter", href: "/security-deposit-demand-letter" },
          { text: "State deadline lookup", href: "/security-deposit-deadline" },
        ]}
      />

      <SEORelatedResources
        links={[
          {
            title: "Can Landlord Charge for Cleaning?",
            href: "/can-landlord-charge-for-cleaning",
            description: "When cleaning fees are legitimate vs. unfair",
          },
          {
            title: "Can Landlord Charge for Painting?",
            href: "/can-landlord-charge-for-painting",
            description: "Paint deductions are rarely legitimate",
          },
          {
            title: "What Can Landlords Deduct?",
            href: "/what-can-landlords-deduct-from-security-deposit",
            description: "Complete guide to allowed deductions",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
