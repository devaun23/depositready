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
  title: "Illinois Security Deposit Deadline for Renters",
  description:
    "Illinois landlords must return security deposits within strict legal deadlines. Learn the Illinois security deposit timeline, itemization rules, penalties, and how renters dispute unfair charges.",
};

export default function IllinoisSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Illinois Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="Illinois law sets clear deadlines and documentation rules for returning security deposits. If your landlord misses a deadline or fails to itemize properly, you may have leverage to recover your money."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how Illinois deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across Illinois · Secure checkout · Not legal advice"
      />

      <SEOSection title="Illinois takes deposit timing seriously">
        <p>
          Illinois requires landlords to follow specific timelines and notice
          rules, especially in larger rental buildings.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Misses a deadline",
            "Fails to itemize deductions",
            "Sends incomplete or late notice",
          ]}
        />
        <p>Their ability to keep your deposit may be limited.</p>
        <p>
          Many Illinois disputes hinge on whether the landlord followed the
          statute exactly.
        </p>
      </SEOSection>

      <SEOSection title="Illinois security deposit deadlines explained" variant="gray">
        <p>
          Deadlines in Illinois depend on whether deductions are taken and the
          type of property.
        </p>
        <SEODeadlineBox
          title="Illinois Deadlines"
          items={[
            {
              days: "45 days",
              description:
                "If no deductions are taken, the landlord must return the full deposit within 45 days of move out",
            },
            {
              days: "30 days",
              description:
                "If deductions are taken, the landlord must send an itemized statement within 30 days and return any remaining balance within 45 days",
            },
          ]}
        />
        <p className="text-sm text-gray-500">
          Illinois security deposits are governed by 765 ILCS 710/1 et seq.
        </p>
        <p className="text-sm text-gray-500">
          (Some local ordinances, such as Chicago, may impose stricter rules.)
        </p>
      </SEOSection>

      <SEOSection title="Itemization is critical">
        <p>A valid Illinois deduction notice must:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Be in writing",
            "Be sent within 30 days (if deductions are claimed)",
            "Clearly itemize each deduction and amount",
            "Distinguish damage from normal wear and tear",
          ]}
        />
        <p>Common Illinois landlord mistakes:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Missing the 30-day itemization deadline",
            "Sending vague or lump-sum deductions",
            "Failing to return the remaining balance on time",
            "Charging for normal wear and tear",
          ]}
        />
        <p>Each mistake can weaken the claim against your deposit.</p>
      </SEOSection>

      <SEOSection title="If Illinois rules were not followed" variant="gray">
        <p>If a landlord fails to comply:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "You may be entitled to your full deposit",
            "Illinois law allows penalties and interest in certain situations",
            "Improper deductions may be invalid",
          ]}
        />
        <p>
          Many Illinois renters recover deposits once deadlines are clearly
          cited and documented.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful Illinois disputes usually involve:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Confirming whether deductions were claimed</li>
          <li>Tracking the 30-day and 45-day deadlines</li>
          <li>Reviewing itemized statements carefully</li>
          <li>Organizing move-out photos chronologically</li>
          <li>
            Sending a professional, law-referenced{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              demand letter
            </Link>
          </li>
          <li>Escalating only if necessary</li>
        </ol>
        <p>Clarity and timing win disputes.</p>
      </SEOSection>

      <SEOSection title="Built for Illinois security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact Illinois deadlines",
            "Understand itemization and return requirements",
            "Organize evidence properly",
            "Generate an Illinois compliant demand letter",
            "Create a single dispute packet you can reuse",
          ]}
        />
        <p>You see your deadline before paying.</p>
      </SEOSection>

      <SEOFAQ
        title="Illinois Security Deposit FAQ"
        items={[
          {
            question: "Do I need a lawyer in Illinois to dispute a deposit?",
            answer:
              "Often no. Many disputes resolve with proper documentation and notice.",
          },
          {
            question: "What if my landlord never itemized deductions?",
            answer: "They may lose the right to withhold the deposit.",
          },
          {
            question:
              "Can landlords charge for normal wear and tear in Illinois?",
            answer: "No. Normal wear and tear cannot be deducted.",
          },
          {
            question: "Is this legal advice?",
            answer:
              "No. DepositReady provides documentation tools and state specific information.",
          },
        ]}
      />

      <SEOCTA
        title="Check your Illinois security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical Illinois deposits range from $1,000–$2,500."
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
            title: "Write a Demand Letter",
            href: "/security-deposit-demand-letter",
            description: "Create a formal request that gets results",
          },
          {
            title: "California Security Deposit Deadline",
            href: "/security-deposit-deadline-california",
            description: "California has a strict 21-day deadline",
          },
          {
            title: "Texas Security Deposit Deadline",
            href: "/security-deposit-deadline-texas",
            description: "Texas has a 30-day deadline for deposit returns",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
