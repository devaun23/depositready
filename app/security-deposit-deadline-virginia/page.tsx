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
  title: "Virginia Security Deposit Deadline for Renters",
  description:
    "Virginia landlords have 45 days to return security deposits. Learn the VA security deposit timeline, double damages for violations, and how to dispute unfair charges.",
};

export default function VirginiaSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Virginia Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="Virginia gives landlords 45 days—longer than most states. But miss that deadline by even one day? They may forfeit the right to make ANY deductions. Willful violations can mean double damages."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across Virginia · Secure checkout · Not legal advice"
      />

      <SEOSection title="Virginia's 45-day deadline is strict">
        <p>
          While Virginia allows more time than most states, the{" "}
          <strong>45-day deadline is absolute</strong>. Missing it—even by one
          day—can have serious consequences.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Fails to return the deposit within 45 days",
            "Does not provide an itemized written statement",
            "Willfully violates the requirements",
          ]}
        />
        <p>
          They may <strong>forfeit all rights</strong> to withhold any portion
          and may owe you double damages.
        </p>
      </SEOSection>

      <SEOSection title="Virginia security deposit deadlines explained" variant="gray">
        <p>After you move out:</p>
        <SEODeadlineBox
          title="Virginia Deadline"
          items={[
            {
              days: "45 days",
              description:
                "Landlord must provide an itemized written statement with deductions and return any refund due",
            },
          ]}
          note="For deductions over $125, landlords must provide actual receipts or invoices."
        />
        <p className="text-sm text-gray-500">
          Virginia security deposits are governed by Va. Code § 55.1-1226.
        </p>
      </SEOSection>

      <SEOSection title="Deductions over $125 need documentation">
        <p>Virginia has a documentation threshold:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Deductions over $125 require receipts or invoices",
            "Cannot just write \"Carpet cleaning - $300\"",
            "Must show what was actually paid",
            "No documentation = potential violation",
          ]}
        />
        <p>
          If your landlord made large deductions without providing receipts, you
          may have a strong case.
        </p>
      </SEOSection>

      <SEOSection title="Double damages for willful violations" variant="gray">
        <p>Under Virginia law, if the landlord willfully violated § 55.1-1226:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "You may recover double the deposit amount wrongfully withheld",
            "Plus actual damages",
            "Plus court costs",
            "Plus reasonable attorney fees",
          ]}
        />
        <p>
          The inspection within 72 hours of your request is also required—if
          denied, it strengthens your case.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful Virginia disputes usually involve:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Confirming the 45-day deadline has passed</li>
          <li>Requesting to attend the move-out inspection</li>
          <li>Checking if deductions over $125 have documentation</li>
          <li>Documenting the property condition at move-out</li>
          <li>
            Sending a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              professional, law-referenced demand letter
            </Link>
          </li>
          <li>Filing in General District Court if needed (up to $25,000)</li>
        </ol>
        <p>Documentation beats arguments.</p>
      </SEOSection>

      <SEOSection title="Built for Virginia security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact Virginia deadline",
            "Understand documentation requirements",
            "Organize evidence correctly",
            "Generate a VA-compliant demand letter",
            "Create a reusable dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQ
        title="Virginia Security Deposit FAQ"
        items={[
          {
            question: "What is the deadline to return a security deposit in Virginia?",
            answer: "45 days after you move out or the lease ends, whichever is later.",
          },
          {
            question: "Does my landlord need receipts in Virginia?",
            answer: "For deductions over $125, yes. They must provide actual receipts or invoices.",
          },
          {
            question: "Can I attend the move-out inspection in Virginia?",
            answer: "Yes, if you request it. The inspection must occur within 72 hours of your request.",
          },
          {
            question: "What if my landlord missed the 45-day deadline?",
            answer: "They may forfeit the right to withhold any portion. You could recover the full deposit plus damages.",
          },
        ]}
      />

      <SEOCTA
        title="Check your Virginia security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical VA deposits range from $1,500–$3,500."
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
            title: "North Carolina Security Deposit Deadline",
            href: "/security-deposit-deadline-north-carolina",
            description: "NC has a 30-day deadline",
          },
          {
            title: "Maryland Security Deposit Deadline",
            href: "/security-deposit-deadline-maryland",
            description: "Maryland landlords have 45 days",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
