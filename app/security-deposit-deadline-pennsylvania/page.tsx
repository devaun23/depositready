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
  title: "Pennsylvania Security Deposit Deadline for Renters",
  description:
    "Pennsylvania landlords have 30 days to return security deposits. Learn the PA security deposit timeline, double damages, and how missing the deadline forfeits ALL deduction rights.",
};

export default function PennsylvaniaSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Pennsylvania Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="Pennsylvania has one of the strongest penalty provisions: landlords who miss the 30-day deadline forfeit ALL rights to withhold ANY portion of your deposit—and may owe you double."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across Pennsylvania · Secure checkout · Not legal advice"
      />

      <SEOSection title="Miss the deadline, lose everything">
        <p>
          Pennsylvania law is clear: if a landlord fails to provide an itemized
          list within 30 days, they{" "}
          <strong>forfeit all rights to withhold any portion</strong> of your
          deposit.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Fails to provide a written list within 30 days",
            "Does not return the deposit with the list",
            "Makes deductions without proper documentation",
          ]}
        />
        <p>
          They forfeit the right to keep anything AND may owe you{" "}
          <strong>double the deposit</strong>.
        </p>
      </SEOSection>

      <SEOSection title="Pennsylvania security deposit deadlines explained" variant="gray">
        <p>After you move out and provide a forwarding address:</p>
        <SEODeadlineBox
          title="Pennsylvania Deadline"
          items={[
            {
              days: "30 days",
              description:
                "Landlord must provide a written list of damages and return the balance",
            },
          ]}
          note="The clock starts when you both vacate AND provide a forwarding address."
        />
        <p className="text-sm text-gray-500">
          Pennsylvania security deposits are governed by 68 Pa. Stat. § 250.512.
        </p>
      </SEOSection>

      <SEOSection title="Total forfeiture is automatic">
        <p>Pennsylvania&apos;s penalty is uniquely severe:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Missing the 30-day deadline = forfeit ALL rights to withhold",
            "Also forfeits the right to sue tenant for property damage",
            "No excuses—the deadline is absolute",
            "Even legitimate damage claims are forfeited",
          ]}
        />
        <p>
          This makes the deadline extremely important for landlords—and gives
          tenants significant leverage.
        </p>
      </SEOSection>

      <SEOSection title="Double damages for violations" variant="gray">
        <p>Under 68 Pa. Stat. § 250.512(d):</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "If the landlord fails to comply, you recover double the deposit",
            "This is in addition to the forfeiture",
            "Applies statewide including Philadelphia and Pittsburgh",
            "File in Magisterial District Court (up to $12,000)",
          ]}
        />
        <p>
          Pennsylvania is one of the most tenant-friendly states for deposit
          disputes.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful Pennsylvania disputes usually involve:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Confirming you provided a forwarding address</li>
          <li>Counting exactly 30 days from move-out</li>
          <li>Documenting that no written list was received</li>
          <li>Taking photos of property condition at move-out</li>
          <li>
            Sending a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              professional, law-referenced demand letter
            </Link>
          </li>
          <li>Filing in Magisterial District Court if needed</li>
        </ol>
        <p>The 30-day deadline is your strongest argument.</p>
      </SEOSection>

      <SEOSection title="Built for Pennsylvania security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact Pennsylvania deadline",
            "Understand the forfeiture rule",
            "Organize evidence correctly",
            "Generate a PA-compliant demand letter",
            "Create a reusable dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQ
        title="Pennsylvania Security Deposit FAQ"
        items={[
          {
            question: "What is the deadline to return a security deposit in PA?",
            answer: "30 days after you move out and provide a forwarding address.",
          },
          {
            question: "What if my PA landlord missed the 30-day deadline?",
            answer: "They forfeit ALL rights to withhold any portion—even for legitimate damage. And you may recover double the deposit.",
          },
          {
            question: "Does this apply in Philadelphia?",
            answer: "Yes, 68 Pa. Stat. § 250.512 applies statewide, including Philadelphia and Pittsburgh.",
          },
          {
            question: "Where do I file a claim in Pennsylvania?",
            answer: "Magisterial District Court handles claims up to $12,000.",
          },
        ]}
      />

      <SEOCTA
        title="Check your Pennsylvania security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical PA deposits range from $1,000–$2,500."
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
            title: "New Jersey Security Deposit Deadline",
            href: "/security-deposit-deadline-new-jersey",
            description: "NJ requires certified mail and has double damages",
          },
          {
            title: "Ohio Security Deposit Deadline",
            href: "/security-deposit-deadline-ohio",
            description: "Ohio landlords have 30 days to return deposits",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
