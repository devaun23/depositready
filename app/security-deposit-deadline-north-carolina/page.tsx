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
  title: "North Carolina Security Deposit Deadline for Renters",
  description:
    "North Carolina landlords have 30 days to return security deposits. Learn the NC security deposit timeline, penalties for willful violations, and how to dispute unfair charges.",
};

export default function NorthCarolinaSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="North Carolina Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="North Carolina requires landlords to return your deposit within 30 days with an itemized list of damages. Willful violations void their right to keep any portion of your deposit."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across North Carolina · Secure checkout · Not legal advice"
      />

      <SEOSection title="North Carolina's 30-day rule with extensions">
        <p>
          North Carolina has a standard 30-day deadline, but allows landlords up
          to <strong>60 days</strong> if the extent of damages cannot be
          determined within 30 days.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Fails to return the deposit or provide an itemized list within 30 days",
            "Willfully violates the deposit requirements",
            "Charges for normal wear and tear",
          ]}
        />
        <p>
          They may <strong>forfeit all rights</strong> to retain any portion of
          your deposit.
        </p>
      </SEOSection>

      <SEOSection title="North Carolina security deposit deadlines explained" variant="gray">
        <p>After you move out:</p>
        <SEODeadlineBox
          title="North Carolina Deadline"
          items={[
            {
              days: "30 days",
              description:
                "Landlord must itemize damages and return the balance",
            },
            {
              days: "60 days (if needed)",
              description:
                "If extent of claim cannot be determined, landlord must provide interim accounting at 30 days and final accounting at 60 days",
            },
          ]}
          note="If you don't provide a forwarding address, the landlord holds the balance for 6 months."
        />
        <p className="text-sm text-gray-500">
          North Carolina security deposits are governed by N.C.G.S. § 42-50
          through 42-56.
        </p>
      </SEOSection>

      <SEOSection title="Willful violations have serious consequences">
        <p>In North Carolina, willful failure to comply:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Voids the landlord's right to retain ANY portion",
            "Is against the public policy of the state",
            "May result in attorney fees being awarded",
            "Gives you strong leverage in negotiations",
          ]}
        />
        <p>
          The key word is <strong>willful</strong>—intentional disregard of the
          law triggers the harshest penalties.
        </p>
      </SEOSection>

      <SEOSection title="Normal wear and tear is protected" variant="gray">
        <p>Under North Carolina law:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Landlords cannot charge for normal wear and tear",
            "Deductions cannot exceed actual damages",
            "All deductions must be itemized in writing",
            "Vague or unsupported charges may be challenged",
          ]}
        />
        <p>
          If your landlord charged for carpet cleaning, paint touch-ups, or
          minor wear without documenting actual damage, those charges may be
          invalid.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful North Carolina disputes usually involve:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Confirming the 30-day deadline (or 60-day extended deadline)</li>
          <li>Providing your forwarding address in writing</li>
          <li>Documenting the property condition at move-out</li>
          <li>Challenging normal wear and tear deductions</li>
          <li>
            Sending a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              professional, law-referenced demand letter
            </Link>
          </li>
          <li>Filing in Small Claims Court if needed (up to $10,000)</li>
        </ol>
        <p>Documentation beats arguments.</p>
      </SEOSection>

      <SEOSection title="Built for North Carolina security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact North Carolina deadline",
            "Understand when the 60-day extension applies",
            "Organize evidence correctly",
            "Generate an NC-compliant demand letter",
            "Create a reusable dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQ
        title="North Carolina Security Deposit FAQ"
        items={[
          {
            question: "What is the deadline to return a security deposit in NC?",
            answer: "30 days, or 60 days if the landlord needs more time to determine damages (must provide interim accounting at 30 days).",
          },
          {
            question: "What happens if I don't give a forwarding address?",
            answer: "The landlord must hold your deposit balance for at least 6 months for you to claim.",
          },
          {
            question: "Can landlords charge for normal wear and tear in NC?",
            answer: "No. The law specifically prohibits deductions for normal wear and tear.",
          },
          {
            question: "What if my landlord willfully violated the rules?",
            answer: "They forfeit all rights to retain any portion of your deposit, and the court may award attorney fees.",
          },
        ]}
      />

      <SEOCTA
        title="Check your North Carolina security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical NC deposits range from $1,000–$2,500."
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
            title: "Virginia Security Deposit Deadline",
            href: "/security-deposit-deadline-virginia",
            description: "Virginia has a 45-day deadline",
          },
          {
            title: "Georgia Security Deposit Deadline",
            href: "/security-deposit-deadline-georgia",
            description: "Georgia requires return within 30 days",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
