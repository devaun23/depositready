import type { Metadata } from "next";
import Link from "next/link";
import {
  SEOPageLayout,
  SEOHeroWithCTA,
  SEOSection,
  SEOCheckList,
  SEODeadlineBox,
  SEOFAQ,
  SEOCTA,
  SEORelatedResources,
  SEODisclaimer,
} from "@/components/seo";

export const metadata: Metadata = {
  title: "Washington Security Deposit Deadline for Renters",
  description:
    "Washington landlords have 30 days to return security deposits with documentation. Learn the WA security deposit timeline, double damages, and how to dispute unfair charges.",
};

export default function WashingtonSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Washington Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="Washington requires landlords to return your deposit within 30 days with a full statement AND documentation of any deductions. Intentional violations? Up to double damages plus attorney fees."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across Washington · Secure checkout · Not legal advice"
      />

      <SEOSection title="Washington requires documentation, not just a list">
        <p>
          Washington is stricter than many states: landlords must provide{" "}
          <strong>documentation</strong> (invoices, receipts, estimates) for any
          deductions—not just an itemized list.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Fails to return the deposit within 30 days",
            "Does not provide documentation for deductions",
            "Intentionally refuses to give the statement or refund",
          ]}
        />
        <p>
          The court may award you <strong>up to double the deposit</strong> plus
          attorney fees.
        </p>
      </SEOSection>

      <SEOSection title="Washington security deposit deadlines explained" variant="gray">
        <p>After you move out:</p>
        <SEODeadlineBox
          title="Washington Deadline"
          items={[
            {
              days: "30 days",
              description:
                "The landlord must give a full and specific statement of deductions with documentation, plus any refund due",
            },
          ]}
          note="Documentation includes invoices, receipts, or estimates. No documentation = potential violation."
        />
        <p className="text-sm text-gray-500">
          Washington security deposits are governed by RCW 59.18.280.
        </p>
      </SEOSection>

      <SEOSection title="Carpet cleaning requires documentation">
        <p>Washington has a specific rule about carpet cleaning:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "No portion may be withheld for carpet cleaning without documentation",
            "Documentation must show condition beyond normal wear",
            "Generic \"cleaning fee\" without proof is likely invalid",
            "Move-in photos help prove pre-existing condition",
          ]}
        />
        <p>
          If your landlord charged for carpet cleaning without documentation, you
          may have a strong case.
        </p>
      </SEOSection>

      <SEOSection title="Double damages for intentional violations" variant="gray">
        <p>Under RCW 59.18.280, courts may award:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Up to 2x the deposit for intentional refusal",
            "Attorney fees to the prevailing party",
            "Court costs",
            "This applies to intentional, not accidental, violations",
          ]}
        />
        <p>
          <strong>Key word: intentional.</strong> If the landlord knowingly
          violated the law, penalties are higher.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful Washington disputes usually involve:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Confirming the 30-day deadline has passed</li>
          <li>Checking if documentation was provided (not just a list)</li>
          <li>Reviewing carpet deductions for required documentation</li>
          <li>Comparing move-out photos to deduction claims</li>
          <li>
            Sending a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              professional, law-referenced demand letter
            </Link>
          </li>
          <li>Filing in District Court if needed (up to $10,000)</li>
        </ol>
        <p>Documentation beats arguments—for both sides.</p>
      </SEOSection>

      <SEOSection title="Built for Washington security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact Washington deadline",
            "Understand documentation requirements",
            "Organize evidence correctly",
            "Generate a WA-compliant demand letter",
            "Create a reusable dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQ
        title="Washington Security Deposit FAQ"
        items={[
          {
            question: "What is the deadline to return a security deposit in Washington?",
            answer: "30 days after you move out. This was recently extended from 21 days.",
          },
          {
            question: "Does my landlord need to provide receipts in Washington?",
            answer: "Yes, Washington requires documentation (invoices, receipts, estimates) for all deductions—not just an itemized list.",
          },
          {
            question: "Can my landlord charge for carpet cleaning in Washington?",
            answer: "Only with documentation showing the condition is beyond normal wear. No documentation = potential violation.",
          },
          {
            question: "What damages can I recover in Washington?",
            answer: "Up to double the deposit for intentional violations, plus attorney fees to the prevailing party.",
          },
        ]}
      />

      <SEOCTA
        title="Check your Washington security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical WA deposits range from $1,500–$4,000."
        primaryButton={{
          text: "Start My Dispute Packet",
          href: "/wizard",
        }}
        secondaryButtons={[
          { text: "My landlord kept my deposit", href: "/landlord-kept-security-deposit" },
          { text: "Write a demand letter", href: "/security-deposit-demand-letter" },
          { text: "How to dispute a deposit", href: "/security-deposit-dispute" },
        ]}
      />

      <SEORelatedResources
        links={[
          {
            title: "My Landlord Kept My Deposit",
            href: "/landlord-kept-security-deposit",
            description: "What to do when your landlord won't return your money",
          },
          {
            title: "Oregon Security Deposit Deadline",
            href: "/security-deposit-deadline-oregon",
            description: "Oregon has a 31-day deadline",
          },
          {
            title: "California Security Deposit Deadline",
            href: "/security-deposit-deadline-california",
            description: "California requires return within 21 days",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
