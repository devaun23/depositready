import type { Metadata } from "next";
import Link from "next/link";
import {
  SEOPageLayout,
  SEOHeroWithCTA,
  SEOSection,
  SEOCheckList,
  SEOCallout,
  SEOComparisonGrid,
  SEOCTA,
  SEORelatedResources,
  SEODisclaimer,
} from "@/components/seo";

export const metadata: Metadata = {
  title: "What Can Landlords Deduct From a Security Deposit?",
  description:
    "Landlords can only deduct specific costs from a security deposit. Learn what is allowed, what is illegal, and how renters dispute unfair deductions.",
};

export default function WhatCanLandlordsDeductPage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="What Can Landlords Deduct From a Security Deposit?"
        subtitle="And What They're Not Allowed to Charge You For"
        intro="Landlords can only deduct certain costs from a security deposit. Many charges renters accept are actually improper, exaggerated, or illegal under state law."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See common illegal deductions",
          href: "#cannot-deduct",
        }}
        tagline="Used by renters nationwide · Secure checkout · Not legal advice"
      />

      <SEOSection title="Not everything a landlord lists is deductible">
        <p>Many renters assume:</p>
        <SEOCallout>
          &ldquo;If the landlord says it costs money, they can deduct it.&rdquo;
        </SEOCallout>
        <p>That&apos;s not true.</p>
        <p>
          Across most states, landlords may only deduct for{" "}
          <strong>actual damage beyond normal wear and tear</strong>, plus a few
          specific categories.
        </p>
        <p>Routine turnover costs cannot usually be passed on to tenants.</p>
      </SEOSection>

      <SEOSection title="Commonly allowed deductions" variant="gray">
        <p>
          While rules vary by state, landlords are often allowed to deduct for:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Physical damage beyond normal wear and tear (broken fixtures, holes in walls, damaged doors)",
            "Unpaid rent (if rent was legitimately owed)",
            "Cleaning caused by excessive filth (not standard move-out cleaning)",
            "Lost keys or access devices (if replacement was required)",
            "Repairs caused by tenant negligence",
          ]}
        />
        <p>These deductions must usually be:</p>
        <SEOCheckList
          items={["Reasonable", "Documented", "Itemized", "Timely"]}
        />
      </SEOSection>

      <div id="cannot-deduct">
        <SEOSection title="Charges renters frequently accept but shouldn't">
          <p>
            In many states, landlords <strong>cannot deduct</strong> for:
          </p>
          <SEOCheckList
            variant="bullet"
            items={[
              "Normal wear and tear (faded paint, worn carpet, minor scuffs)",
              "Routine cleaning between tenants",
              "Painting after a normal-length tenancy",
              "Carpet replacement due to age, not damage",
              "Upgrades or renovations",
              "Repairs unrelated to tenant conduct",
              'Vague "maintenance" or "administrative" fees',
            ]}
          />
          <p>
            If a charge would have occurred{" "}
            <strong>regardless of who lived there</strong>, it&apos;s often not
            deductible.
          </p>
        </SEOSection>
      </div>

      <SEOSection title="Normal wear and tear vs damage" variant="gray">
        <p>This distinction decides most disputes.</p>
        <SEOComparisonGrid
          columns={[
            {
              title: "Normal Wear and Tear",
              items: [
                "Fading paint",
                "Minor nail holes",
                "Light carpet wear",
                "Loose handles from use",
                "Dust and minor dirt",
              ],
            },
            {
              title: "Damage",
              items: [
                "Large holes",
                "Broken fixtures",
                "Stains requiring replacement",
                "Pet damage beyond normal wear",
                "Unauthorized modifications",
              ],
            },
          ]}
        />
        <p>
          Landlords often blur this line. Clear documentation helps separate the
          two.
        </p>
      </SEOSection>

      <SEOSection title="Landlords must explain the charges">
        <p>In most states, landlords must provide:</p>
        <SEOCheckList
          items={[
            "A written, itemized list of deductions",
            "Specific dollar amounts",
            "Supporting documentation (sometimes required)",
          ]}
        />
        <p>Common problems:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Lump-sum deductions",
            "No explanation",
            "No receipts",
            'Vague categories like "repairs"',
          ]}
        />
        <p>Improper itemization weakens the landlord&apos;s position.</p>
      </SEOSection>

      <SEOSection title="Even valid charges can become unenforceable" variant="gray">
        <p>In many states, landlords must:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Send deductions within a strict deadline",
            "Use proper notice methods",
            "Provide itemization on time",
          ]}
        />
        <SEOCallout variant="warning">
          If deadlines are missed, deductions may be invalid, renters gain
          leverage, and deposits are often recoverable.
        </SEOCallout>
        <p>
          Deadlines are one of the most overlooked aspects of deposit disputes.
          Learn more about{" "}
          <Link
            href="/security-deposit-deadline"
            className="text-black underline hover:text-gray-600"
          >
            security deposit deadlines
          </Link>
          .
        </p>
      </SEOSection>

      <SEOSection title="How renters successfully dispute unfair deductions">
        <p>Renters who succeed usually:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Identify which deductions are improper</li>
          <li>Separate wear and tear from damage</li>
          <li>Check whether deadlines were met</li>
          <li>Organize photos chronologically</li>
          <li>
            Send a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              professional, structured demand letter
            </Link>
          </li>
        </ol>
        <p>Unstructured arguments rarely work. Clear documentation does.</p>
      </SEOSection>

      <SEOSection title="Built to challenge unfair deductions" variant="gray">
        <p>DepositReady helps renters:</p>
        <SEOCheckList
          items={[
            "Understand what deductions are allowed",
            "Check deadline compliance",
            "Organize move-out evidence",
            "Generate a professional demand letter",
            "Create a reusable dispute packet",
          ]}
        />
        <p>
          You see your situation <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOCTA
        title="Unsure if your landlord's deductions are valid?"
        description="Check where you stand before escalating. $39 one-time · Takes about 10 minutes · Instant download. Typical deposits range from $1,000–$3,000."
        primaryButton={{
          text: "Start My Dispute Packet",
          href: "/wizard",
        }}
        secondaryButtons={[
          { text: "Check my deadline", href: "/security-deposit-deadline" },
          { text: "Write a demand letter", href: "/security-deposit-demand-letter" },
          { text: "How to dispute a deposit", href: "/security-deposit-dispute" },
        ]}
      />

      <SEORelatedResources
        links={[
          {
            title: "Security Deposit Deadlines",
            href: "/security-deposit-deadline",
            description: "Know when your landlord's time runs out",
          },
          {
            title: "Write a Demand Letter",
            href: "/security-deposit-demand-letter",
            description: "Create a formal request that gets results",
          },
          {
            title: "How to Dispute Unfair Deductions",
            href: "/security-deposit-dispute",
            description: "Challenge charges that don't make sense",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
