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
  title: "Colorado Security Deposit Deadline for Renters",
  description:
    "Colorado landlords have 30-60 days to return security deposits. Learn the CO security deposit timeline, triple damages for willful violations, and how to dispute unfair charges.",
};

export default function ColoradoSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Colorado Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="Colorado allows 30 days by default, or up to 60 days if your lease specifies. Willfully violate the law? Landlords face triple damages plus attorney fees."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across Colorado · Secure checkout · Not legal advice"
      />

      <SEOSection title="Colorado deadlines depend on your lease">
        <p>
          Colorado is unique: the deadline is <strong>30 days by default</strong>,
          but your lease can extend it up to 60 days. Check your lease first.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Fails to provide a written statement within the deadline",
            "Willfully retains your deposit without cause",
            "Does not itemize deductions properly",
          ]}
        />
        <p>
          They forfeit the right to withhold any portion—and may owe you{" "}
          <strong>triple damages</strong>.
        </p>
      </SEOSection>

      <SEOSection title="Colorado security deposit deadlines explained" variant="gray">
        <p>After you move out:</p>
        <SEODeadlineBox
          title="Colorado Deadline"
          items={[
            {
              days: "30 days (default)",
              description:
                "If your lease is silent on the timeline, the landlord has 30 days",
            },
            {
              days: "Up to 60 days",
              description:
                "If your lease specifically states a longer period (maximum 60 days)",
            },
          ]}
          note="You must give 7 days' notice before filing legal action."
        />
        <p className="text-sm text-gray-500">
          Colorado security deposits are governed by C.R.S. § 38-12-103.
        </p>
      </SEOSection>

      <SEOSection title="Triple damages for willful violations">
        <p>Colorado has serious penalties for bad landlords:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Failure to provide written statement = forfeiture of all rights to withhold",
            "Willful retention = triple (3x) the amount wrongfully withheld",
            "Plus reasonable attorney fees",
            "Plus court costs",
          ]}
        />
        <p>
          <strong>Important:</strong> You must give the landlord 7 days&apos; written
          notice of your intent to file before going to court.
        </p>
      </SEOSection>

      <SEOSection title="2026 changes to Colorado law" variant="gray">
        <p>
          Starting January 1, 2026, Colorado has new tenant protections under HB 25-1249:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "No deductions for \"normal wear and tear\" explicitly prohibited",
            "No deductions for pre-existing damage",
            "Carpet cannot be deemed damaged if not replaced in 10+ years",
            "Landlords must provide documentation within 14 days of request",
          ]}
        />
        <p>
          These stronger protections make it even easier to dispute unfair deductions.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful Colorado disputes usually involve:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Checking your lease for any extended deadline (up to 60 days)</li>
          <li>Confirming you provided a forwarding address</li>
          <li>Documenting the property condition at move-out</li>
          <li>Reviewing deductions for normal wear and tear charges</li>
          <li>
            Sending a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              7-day notice letter
            </Link>{" "}
            (required before filing)
          </li>
          <li>Filing in County Court if needed (up to $7,500)</li>
        </ol>
        <p>The 7-day notice requirement is critical—don&apos;t skip it.</p>
      </SEOSection>

      <SEOSection title="Built for Colorado security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact Colorado deadline",
            "Generate the required 7-day notice",
            "Organize evidence correctly",
            "Create a CO-compliant demand letter",
            "Build a reusable dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQ
        title="Colorado Security Deposit FAQ"
        items={[
          {
            question: "What is the deadline to return a security deposit in Colorado?",
            answer: "30 days by default, or up to 60 days if your lease specifies a longer period.",
          },
          {
            question: "Do I need to give notice before suing in Colorado?",
            answer: "Yes, you must give the landlord 7 days' written notice before filing legal action.",
          },
          {
            question: "Can I get triple damages in Colorado?",
            answer: "Yes, for willful retention. Plus attorney fees and court costs.",
          },
          {
            question: "What about carpet charges in Colorado?",
            answer: "Starting 2026, landlords cannot charge for carpet replacement unless there's substantial damage beyond normal wear and tear, and the carpet was replaced within the last 10 years.",
          },
        ]}
      />

      <SEOCTA
        title="Check your Colorado security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical CO deposits range from $1,500–$3,500."
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
            title: "Arizona Security Deposit Deadline",
            href: "/security-deposit-deadline-arizona",
            description: "Arizona has a short 14 business day deadline",
          },
          {
            title: "Washington Security Deposit Deadline",
            href: "/security-deposit-deadline-washington",
            description: "Washington requires return within 30 days",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
