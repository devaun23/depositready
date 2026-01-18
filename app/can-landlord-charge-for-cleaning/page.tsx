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
  title: "Can My Landlord Charge for Cleaning? Security Deposit Deductions",
  description:
    "Learn when landlords can legally charge cleaning fees from your security deposit. Most cleaning charges are not legitimate. Know your rights and dispute unfair fees.",
};

export default function CanLandlordChargeForCleaningPage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Can My Landlord Charge for Cleaning?"
        subtitle="When Cleaning Fees Are (and Aren't) Legitimate"
        intro="Cleaning fees are one of the most disputed security deposit deductions. The short answer: most cleaning charges are NOT legitimate. Your landlord can't charge you for routine turnover cleaning."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Know your rights · Dispute unfair charges · Not legal advice"
      />

      <SEOSection title="The standard: 'Broom clean' is usually enough">
        <p>
          In most states, you&apos;re only required to leave the property in{" "}
          <strong>&quot;broom clean&quot;</strong> condition—meaning reasonably clean,
          not professionally cleaned.
        </p>
        <SEOCallout variant="info">
          Landlords cannot require you to return the property in better
          condition than when you moved in. Routine cleaning between tenants is
          the landlord&apos;s responsibility.
        </SEOCallout>
        <p>
          Professional cleaning is a cost of doing business for landlords, not
          something tenants should pay for.
        </p>
      </SEOSection>

      <SEOSection title="When landlords CANNOT charge for cleaning" variant="gray">
        <p>These cleaning charges are generally <strong>not legitimate</strong>:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Routine cleaning between tenants",
            "Professional carpet cleaning (in most states)",
            "Window cleaning",
            "Deep cleaning of appliances that work normally",
            "Cleaning that's just 'standard practice'",
            "Any cleaning if you left the place reasonably clean",
          ]}
        />
        <p>
          If your landlord charged $200-400 for &quot;professional cleaning&quot; when you
          left the place in good condition, that&apos;s likely not legitimate.
        </p>
      </SEOSection>

      <SEOSection title="When landlords CAN charge for cleaning">
        <p>These situations <strong>may justify</strong> cleaning deductions:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Excessive dirt or filth beyond normal use",
            "Grease buildup on stove requiring professional cleaning",
            "Pet stains or odors requiring treatment",
            "Mold or mildew from tenant neglect",
            "Trash or debris left behind",
            "Biohazard situations",
          ]}
        />
        <p>
          The key word is <strong>excessive</strong>. Normal dust, minor
          grease, and everyday dirt are not grounds for deductions.
        </p>
      </SEOSection>

      <SEOSection title="Carpet cleaning: A special case" variant="gray">
        <p>Carpet cleaning is the most controversial cleaning charge:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Many states specifically prohibit mandatory carpet cleaning fees",
            "Washington: Can't withhold for carpet cleaning without documentation",
            "California: Can't require professional cleaning unless lease says so AND there's damage",
            "Most states: No charge unless carpet is actually damaged or stained",
          ]}
        />
        <SEOCallout variant="tip">
          <strong>Pro tip:</strong> Check if your lease requires professional
          carpet cleaning. Even if it does, many courts have found such clauses
          unenforceable.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="What the law says">
        <p>
          Security deposit laws in most states share these principles:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Cannot charge for normal wear and tear (includes normal dirt)",
            "Must return property in same condition, minus normal wear",
            "Cleaning between tenants is landlord's business expense",
            "Deductions must be itemized and documented",
            "Many states require receipts for cleaning charges",
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
          for documentation requirements.
        </p>
      </SEOSection>

      <SEOSection title="How to dispute cleaning charges" variant="gray">
        <p>If your landlord charged unfair cleaning fees:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Review the itemized deduction for cleaning charges</li>
          <li>Compare to your move-out photos (you took photos, right?)</li>
          <li>Check if receipts were provided (required in many states)</li>
          <li>Research your state&apos;s specific rules on cleaning</li>
          <li>
            Send a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              demand letter
            </Link>{" "}
            challenging the charges
          </li>
          <li>File in small claims court if the landlord doesn&apos;t respond</li>
        </ol>
        <p>
          Many landlords back down when they realize you know the law.
        </p>
      </SEOSection>

      <SEOSection title="Built for disputing cleaning charges">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Identify if cleaning charges are legitimate in your state",
            "Calculate your deadline for landlord response",
            "Generate a demand letter citing specific laws",
            "Organize evidence for your dispute",
            "Create a complete dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQWithSchema
        title="Cleaning Charges FAQ"
        items={[
          {
            question: "Can my landlord require professional cleaning?",
            answer: "In most states, no—even if it's in the lease. You're only required to leave the property reasonably clean, not professionally cleaned.",
          },
          {
            question: "What if my lease says I must pay for carpet cleaning?",
            answer: "Such clauses are often unenforceable. Many courts have ruled that landlords can't require professional cleaning unless there's actual damage.",
          },
          {
            question: "Do I need to hire cleaners before moving out?",
            answer: "No. 'Broom clean' is typically the standard—sweep, vacuum, wipe surfaces, clean appliances of food residue. You don't need professional cleaners.",
          },
          {
            question: "What if my landlord didn't provide receipts?",
            answer: "Many states require receipts for deductions. No receipt may mean the charge is invalid. Check your state's requirements.",
          },
        ]}
      />

      <SEOCTA
        title="Dispute unfair cleaning charges"
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
