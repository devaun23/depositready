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
  title: "Michigan Security Deposit Deadline for Renters",
  description:
    "Michigan landlords have 30 days to return security deposits. Learn the MI security deposit timeline, double damages, and the unique 45-day court filing rule.",
};

export default function MichiganSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Michigan Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="Michigan has a unique two-part system: landlords get 30 days to return deposits, but if they fail to act within 45 days, you can sue for double the original deposit amount."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across Michigan · Secure checkout · Not legal advice"
      />

      <SEOSection title="Michigan's 30-day rule with a 45-day kicker">
        <p>
          Michigan uses a <strong>two-deadline system</strong>. First, landlords
          have 30 days to return your deposit or send an itemized list. If they
          don&apos;t act within 45 days, they lose the right to dispute—and you can
          sue for double.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Fails to send an itemized list within 30 days",
            "Does not initiate a court action within 45 days",
            "Fails to respond to your dispute",
          ]}
        />
        <p>
          Failure to notify within 30 days{" "}
          <strong>constitutes agreement that no damages are due</strong>.
        </p>
      </SEOSection>

      <SEOSection title="Michigan security deposit deadlines explained" variant="gray">
        <p>After you move out:</p>
        <SEODeadlineBox
          title="Michigan Deadlines"
          items={[
            {
              days: "30 days",
              description:
                "Landlord must send an itemized list of damages with estimated repair costs",
            },
            {
              days: "7 days",
              description:
                "You have 7 days to respond and dispute the landlord's claims",
            },
            {
              days: "45 days",
              description:
                "If landlord doesn't file in court within 45 days, you can sue for double",
            },
          ]}
          note="Missing the 30-day deadline means the landlord agrees no damages are due."
        />
        <p className="text-sm text-gray-500">
          Michigan security deposits are governed by MCL 554.601-554.616.
        </p>
      </SEOSection>

      <SEOSection title="Silence equals agreement">
        <p>Michigan law is explicit about the 30-day deadline:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Failure to notify within 30 days = landlord agrees no damages exist",
            "They must immediately return the full deposit",
            "No excuses or extensions allowed",
            "The deadline is absolute",
          ]}
        />
        <p>
          This is one of the clearest tenant protections in any state—if they
          miss it, they admit they owe you everything.
        </p>
      </SEOSection>

      <SEOSection title="Double damages after 45 days" variant="gray">
        <p>Under MCL 554.613, if the landlord doesn&apos;t act within 45 days:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "They must have filed in court to dispute your claim",
            "If they didn't file, you can sue for double the original deposit",
            "Not double the amount withheld—double the entire deposit",
            "File in District Court Small Claims (up to $7,000)",
          ]}
        />
        <p>
          This makes Michigan particularly risky for landlords who ignore
          tenants.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful Michigan disputes usually involve:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Providing a forwarding address at move-out</li>
          <li>Waiting exactly 30 days for the itemized list</li>
          <li>If received, responding within 7 days to dispute</li>
          <li>Checking if landlord filed in court within 45 days</li>
          <li>
            Sending a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              professional, law-referenced demand letter
            </Link>
          </li>
          <li>Filing for double damages if deadlines passed</li>
        </ol>
        <p>Track the deadlines carefully—they matter.</p>
      </SEOSection>

      <SEOSection title="Built for Michigan security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your Michigan deadlines (30, 7, and 45 days)",
            "Track landlord response requirements",
            "Organize evidence correctly",
            "Generate an MI-compliant demand letter",
            "Create a reusable dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQ
        title="Michigan Security Deposit FAQ"
        items={[
          {
            question: "What is the deadline to return a security deposit in Michigan?",
            answer: "30 days to send an itemized list. If they don't, they agree no damages are due.",
          },
          {
            question: "What is the 45-day rule in Michigan?",
            answer: "If the landlord doesn't file in court within 45 days of move-out, you can sue for double the entire deposit.",
          },
          {
            question: "How long do I have to respond to the itemized list?",
            answer: "7 days to dispute the landlord's claimed damages.",
          },
          {
            question: "What is the maximum deposit in Michigan?",
            answer: "1.5 times the monthly rent.",
          },
        ]}
      />

      <SEOCTA
        title="Check your Michigan security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical MI deposits range from $1,000–$2,500."
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
            title: "Ohio Security Deposit Deadline",
            href: "/security-deposit-deadline-ohio",
            description: "Ohio has a 30-day deadline with interest requirements",
          },
          {
            title: "Illinois Security Deposit Deadline",
            href: "/security-deposit-deadline-illinois",
            description: "Illinois has 30-45 day deadlines with double damages",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
