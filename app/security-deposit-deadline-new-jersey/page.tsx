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
  title: "New Jersey Security Deposit Deadline for Renters",
  description:
    "New Jersey landlords must return security deposits within 30 days by certified mail. Learn the NJ security deposit timeline, double damages penalties, and how to dispute unfair charges.",
};

export default function NewJerseySecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="New Jersey Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="New Jersey has strong tenant protections. Landlords must return your deposit within 30 days by certified or registered mail, with an itemized list of any deductions. Miss this deadline? You may be entitled to double damages."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across New Jersey · Secure checkout · Not legal advice"
      />

      <SEOSection title="New Jersey requires certified mail for deposit returns">
        <p>
          Unlike many states, New Jersey requires landlords to return deposits
          by <strong>personal delivery or certified/registered mail</strong>.
          This creates a paper trail that protects tenants.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Fails to return the deposit within 30 days",
            "Does not send by certified or registered mail",
            "Does not provide an itemized list of deductions",
          ]}
        />
        <p>
          They may be liable for <strong>double the deposit amount</strong> plus
          court costs and attorney fees.
        </p>
      </SEOSection>

      <SEOSection title="New Jersey security deposit deadlines explained" variant="gray">
        <p>After you move out and provide a forwarding address:</p>
        <SEODeadlineBox
          title="New Jersey Deadline"
          items={[
            {
              days: "30 days",
              description:
                "The landlord must return your deposit by certified/registered mail with an itemized list of any deductions",
            },
          ]}
          note="The deposit must include interest earned while held by the landlord."
        />
        <p className="text-sm text-gray-500">
          New Jersey security deposits are governed by N.J.S.A. 46:8-19 through
          46:8-26.
        </p>
      </SEOSection>

      <SEOSection title="Common New Jersey landlord violations">
        <p>In New Jersey, landlords must:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Deposit your money in an interest-bearing account",
            "Notify you of the bank name and address within 30 days",
            "Return the deposit with interest within 30 days of move-out",
            "Use certified or registered mail",
          ]}
        />
        <p>Common violations include:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Returning by regular mail instead of certified",
            "Failing to pay interest on the deposit",
            "Missing the 30-day deadline",
            "Not providing itemized deductions",
          ]}
        />
        <p>Each violation can strengthen your case for double damages.</p>
      </SEOSection>

      <SEOSection title="Double damages in New Jersey" variant="gray">
        <p>If your landlord fails to comply with N.J.S.A. 46:8-21.1:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "You may recover double the amount wrongfully withheld",
            "Plus reasonable court costs",
            "Plus attorney fees",
            "Plus any unpaid interest",
          ]}
        />
        <p>
          This makes New Jersey one of the more tenant-friendly states for
          deposit disputes.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful New Jersey disputes usually involve:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Confirming the 30-day deadline has passed</li>
          <li>Checking if certified mail was used</li>
          <li>Verifying you provided a forwarding address</li>
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
          <li>Filing in Small Claims Court if needed (up to $5,000)</li>
        </ol>
        <p>Documentation beats arguments.</p>
      </SEOSection>

      <SEOSection title="Built for New Jersey security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact New Jersey deadline",
            "Understand certified mail requirements",
            "Organize evidence correctly",
            "Generate a NJ-compliant demand letter",
            "Create a reusable dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQ
        title="New Jersey Security Deposit FAQ"
        items={[
          {
            question: "What is the deadline to return a security deposit in NJ?",
            answer: "30 days after you move out and provide a forwarding address.",
          },
          {
            question: "Does my NJ landlord have to pay interest on my deposit?",
            answer: "Yes, if the property has 10 or more units. The interest must be paid annually or at move-out.",
          },
          {
            question: "What if my landlord sent the deposit by regular mail?",
            answer: "NJ law requires certified or registered mail. Regular mail may be a violation.",
          },
          {
            question: "Can I get double damages in New Jersey?",
            answer: "Yes, if the landlord fails to comply with the law, you may recover double the amount wrongfully withheld plus court costs and attorney fees.",
          },
        ]}
      />

      <SEOCTA
        title="Check your New Jersey security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical NJ deposits range from $1,500–$4,000."
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
            title: "New York Security Deposit Deadline",
            href: "/security-deposit-deadline-new-york",
            description: "NY requires deposits returned within 14 days",
          },
          {
            title: "Pennsylvania Security Deposit Deadline",
            href: "/security-deposit-deadline-pennsylvania",
            description: "PA landlords have 30 days to return deposits",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
