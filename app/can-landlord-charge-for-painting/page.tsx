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
  title: "Can My Landlord Charge for Painting? Security Deposit Deductions",
  description:
    "Learn when landlords can legally charge for painting from your security deposit. Paint fading and minor nail holes are normal wear and tear. Know your rights.",
};

export default function CanLandlordChargeForPaintingPage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Can My Landlord Charge for Painting?"
        subtitle="When Paint Deductions Are (and Aren't) Legitimate"
        intro="Paint charges are among the most common—and most disputed—security deposit deductions. The short answer: landlords usually CANNOT charge you for repainting. Paint fading is normal wear and tear."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Know your rights · Dispute unfair charges · Not legal advice"
      />

      <SEOSection title="Paint fading is normal wear and tear—period">
        <p>
          Every state prohibits landlords from charging for{" "}
          <strong>normal wear and tear</strong>. Paint naturally fades,
          discolors, and needs refreshing between tenants. This is a landlord&apos;s
          cost of doing business.
        </p>
        <SEOCallout variant="info">
          Paint has a limited lifespan (typically 3-5 years for interior paint).
          If the walls were painted before you moved in and look &quot;worn&quot; now,
          that&apos;s normal aging—not damage you caused.
        </SEOCallout>
        <p>
          Repainting between tenants is standard property maintenance, not
          something tenants should pay for.
        </p>
      </SEOSection>

      <SEOSection title="When landlords CANNOT charge for painting" variant="gray">
        <p>
          These paint conditions are <strong>normal wear and tear</strong>:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Faded paint from sunlight exposure",
            "Minor scuffs around light switches and door frames",
            "Small nail holes from hanging pictures",
            "Slightly dirty walls from everyday living",
            "Color looking 'dull' after years of use",
            "Pin holes from hanging lightweight items",
            "Minor marks that can be wiped clean",
          ]}
        />
        <p>
          These are expected conditions in any rental—landlords can&apos;t charge
          you to return walls to &quot;like new&quot; condition.
        </p>
      </SEOSection>

      <SEOSection title="When landlords CAN charge for painting">
        <p>
          These conditions <strong>may justify</strong> paint deductions:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Large holes in walls (beyond small nail holes)",
            "Crayon, marker, or drawings on walls",
            "Smoke staining from indoor smoking",
            "Pet damage (scratches, stains)",
            "Unauthorized paint colors you applied",
            "Grease or food stains that won't clean",
            "Water damage you caused or failed to report",
          ]}
        />
        <p>
          Even then, landlords should only charge for the{" "}
          <strong>affected area</strong>, not entire rooms—and should prorate
          based on paint age.
        </p>
      </SEOSection>

      <SEOSection title="The proration principle" variant="gray">
        <p>
          Even if you did cause damage, landlords often overcharge. Here&apos;s how
          proration works:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Paint typically lasts 3-5 years",
            "If walls were painted 4 years ago, they're near end of life anyway",
            "You shouldn't pay full cost for something that needed replacing",
            "Deductions should reflect remaining useful life",
            "Example: 4-year-old paint damaged? You might owe 20%, not 100%",
          ]}
        />
        <SEOCallout variant="tip">
          <strong>Pro tip:</strong> Ask when the walls were last painted. If the
          landlord can&apos;t prove recent painting, any charge may be excessive.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="Nail holes: The common dispute">
        <p>Nail holes are one of the most argued-about deductions:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Small nail holes (picture hangers) = normal wear and tear",
            "Most states: Landlords cannot charge for small nail holes",
            "Multiple large holes or anchors = may be tenant damage",
            "Filling holes yourself may be required—but not repainting",
            "Even if mentioned in lease, courts often rule it's normal wear",
          ]}
        />
        <p>
          Hanging pictures is a normal part of living somewhere. Small nail
          holes shouldn&apos;t cost you your deposit.
        </p>
      </SEOSection>

      <SEOSection title="How to dispute painting charges" variant="gray">
        <p>If your landlord charged unfair painting fees:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Review the itemized deduction carefully</li>
          <li>Note when the walls were last painted (before you moved in)</li>
          <li>Compare move-in photos to move-out photos</li>
          <li>Calculate proper proration if any damage exists</li>
          <li>
            Send a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              demand letter
            </Link>{" "}
            citing normal wear and tear laws
          </li>
          <li>File in small claims court if needed</li>
        </ol>
        <p>
          Paint charges are often dropped when landlords realize you know the
          law.
        </p>
      </SEOSection>

      <SEOSection title="Built for disputing paint charges">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Identify if painting charges are legitimate",
            "Calculate proper proration amounts",
            "Generate a demand letter citing the law",
            "Organize your move-in/move-out evidence",
            "Create a complete dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQWithSchema
        title="Painting Charges FAQ"
        items={[
          {
            question: "Can my landlord charge for repainting the whole apartment?",
            answer: "Almost never. Repainting between tenants is normal maintenance. Even if you caused damage in one area, they can only charge for that area—prorated for paint age.",
          },
          {
            question: "What about small nail holes from picture frames?",
            answer: "These are almost always normal wear and tear. Hanging pictures is a normal part of living somewhere. Most courts agree.",
          },
          {
            question: "I painted a wall a different color. Can they charge me?",
            answer: "Possibly, if you didn't have permission. But they should only charge to repaint that wall—and should prorate if the original paint was old.",
          },
          {
            question: "How do I prove the walls were already worn when I moved in?",
            answer: "Move-in photos are crucial. If you don't have them, ask the landlord when they last painted. If they can't prove recent painting, the burden shifts to them.",
          },
        ]}
      />

      <SEOCTA
        title="Dispute unfair painting charges"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download."
        primaryButton={{
          text: "Start My Dispute Packet",
          href: "/wizard",
        }}
        secondaryButtons={[
          { text: "My landlord kept my deposit", href: "/landlord-kept-security-deposit" },
          { text: "Write a demand letter", href: "/security-deposit-demand-letter" },
          { text: "Normal wear and tear guide", href: "/normal-wear-and-tear-vs-damage" },
        ]}
      />

      <SEORelatedResources
        links={[
          {
            title: "Normal Wear and Tear vs Damage",
            href: "/normal-wear-and-tear-vs-damage",
            description: "What landlords can and can't charge for",
          },
          {
            title: "Can Landlord Charge for Cleaning?",
            href: "/can-landlord-charge-for-cleaning",
            description: "When cleaning fees are legitimate",
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
