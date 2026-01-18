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
  title: "Ohio Security Deposit Deadline for Renters",
  description:
    "Ohio landlords have 30 days to return security deposits. Learn the OH security deposit timeline, double damages, and how to dispute unfair charges.",
};

export default function OhioSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Ohio Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="Ohio gives landlords 30 days to return your deposit with an itemized list. Fail to comply? You may recover double the amount wrongfully withheld plus attorney fees."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across Ohio · Secure checkout · Not legal advice"
      />

      <SEOSection title="Ohio requires a forwarding address">
        <p>
          Ohio has a specific requirement: you must provide your landlord with a{" "}
          <strong>forwarding address in writing</strong> to be entitled to
          damages if they violate the law.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Fails to return the deposit within 30 days",
            "Does not provide an itemized list of deductions",
            "Wrongfully withholds any portion",
          ]}
        />
        <p>
          You may recover <strong>double the amount wrongfully withheld</strong>{" "}
          plus reasonable attorney fees.
        </p>
      </SEOSection>

      <SEOSection title="Ohio security deposit deadlines explained" variant="gray">
        <p>After you move out and provide a forwarding address:</p>
        <SEODeadlineBox
          title="Ohio Deadline"
          items={[
            {
              days: "30 days",
              description:
                "The landlord must deliver an itemized list of deductions with the amount due",
            },
          ]}
          note="You must provide a forwarding address in writing to preserve your right to damages."
        />
        <p className="text-sm text-gray-500">
          Ohio security deposits are governed by ORC § 5321.16.
        </p>
      </SEOSection>

      <SEOSection title="Interest may be owed on long tenancies">
        <p>Ohio has unique interest requirements:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "If your tenancy lasted more than 6 months",
            "And your deposit exceeded $50 or 1 month's rent",
            "The landlord must pay 5% annual interest",
            "Interest can be from a bank account or their own pocket",
          ]}
        />
        <p>
          Many Ohio tenants are owed interest they don&apos;t know about. Check if
          this applies to you.
        </p>
      </SEOSection>

      <SEOSection title="Double damages plus attorney fees" variant="gray">
        <p>Under ORC § 5321.16(C), if your landlord fails to comply:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "You may recover the property and money due",
            "Plus damages equal to the amount wrongfully withheld",
            "Plus reasonable attorney fees",
            "Small Claims handles up to $6,000",
          ]}
        />
        <p>
          <strong>Important:</strong> You must have provided a forwarding address
          in writing to be entitled to these damages.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful Ohio disputes usually involve:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Confirming you gave a forwarding address in writing</li>
          <li>Confirming the 30-day deadline has passed</li>
          <li>Checking if you&apos;re owed interest (tenancy {">"}6 months)</li>
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
          <li>Filing in Small Claims Court if needed (up to $6,000)</li>
        </ol>
        <p>Documentation beats arguments.</p>
      </SEOSection>

      <SEOSection title="Built for Ohio security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact Ohio deadline",
            "Determine if you're owed interest",
            "Organize evidence correctly",
            "Generate an OH-compliant demand letter",
            "Create a reusable dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQ
        title="Ohio Security Deposit FAQ"
        items={[
          {
            question: "What is the deadline to return a security deposit in Ohio?",
            answer: "30 days after you move out and provide a forwarding address in writing.",
          },
          {
            question: "Do I need to give a forwarding address in Ohio?",
            answer: "Yes, in writing. Without it, you may not be entitled to damages or attorney fees if the landlord violates the law.",
          },
          {
            question: "Does my Ohio landlord owe me interest?",
            answer: "If your tenancy lasted more than 6 months and your deposit exceeded $50 or 1 month's rent, you're owed 5% annual interest.",
          },
          {
            question: "What damages can I recover in Ohio?",
            answer: "Double the amount wrongfully withheld plus reasonable attorney fees.",
          },
        ]}
      />

      <SEOCTA
        title="Check your Ohio security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical OH deposits range from $800–$2,000."
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
            title: "Michigan Security Deposit Deadline",
            href: "/security-deposit-deadline-michigan",
            description: "Michigan has a 30-day deadline with double damages",
          },
          {
            title: "Pennsylvania Security Deposit Deadline",
            href: "/security-deposit-deadline-pennsylvania",
            description: "Pennsylvania landlords have 30 days",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
