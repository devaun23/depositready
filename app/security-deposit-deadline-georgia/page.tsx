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
  title: "Georgia Security Deposit Deadline for Renters",
  description:
    "Georgia landlords must follow strict rules when returning security deposits. Learn the Georgia security deposit timeline, inspection requirements, notice rules, and how renters dispute unfair charges.",
};

export default function GeorgiaSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Georgia Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="Georgia law requires landlords to inspect your unit and return your deposit on a strict timeline. If they skip steps or miss deadlines, you may have leverage to recover your money."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how Georgia deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across Georgia · Secure checkout · Not legal advice"
      />

      <SEOSection title="In Georgia, process matters as much as timing">
        <p>
          Georgia is different from many states because landlords must follow{" "}
          <strong>specific inspection procedures</strong> in addition to
          deadlines.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Fails to perform a proper move-out inspection",
            "Does not provide an itemized list of damages",
            "Misses the return deadline",
          ]}
        />
        <p>They may lose the right to keep part or all of the deposit.</p>
        <p>
          Many Georgia disputes turn on{" "}
          <strong>whether the landlord followed the required steps</strong>, not
          just whether damage existed.
        </p>
      </SEOSection>

      <SEOSection title="Georgia security deposit deadlines explained" variant="gray">
        <p>After you move out:</p>
        <SEODeadlineBox
          title="Georgia Deadline"
          items={[
            {
              days: "30 days",
              description:
                "The landlord must return your deposit or send an itemized list of damages and deductions",
            },
          ]}
          note="Before this, Georgia law requires a move-out inspection and documentation of damages."
        />
        <p className="text-sm text-gray-500">
          Georgia security deposits are governed by O.C.G.A. §44-7-30 through
          §44-7-36.
        </p>
      </SEOSection>

      <SEOSection title="This is where many landlords fail">
        <p>In Georgia, landlords must:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Inspect the unit after move out",
            "Create a written list of damages",
            "Allow the tenant to review and agree or disagree",
            "Keep records of the inspection",
          ]}
        />
        <p>Common Georgia landlord mistakes:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Skipping the inspection entirely",
            "Failing to document damages properly",
            "Creating deductions after the fact",
            "Sending vague or unsupported charges",
          ]}
        />
        <p>If inspection rules are not followed, deductions may be challenged.</p>
      </SEOSection>

      <SEOSection title="If Georgia rules were not followed" variant="gray">
        <p>If a landlord fails to comply:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "You may be entitled to your full deposit",
            "Improper deductions may be invalid",
            "Your leverage increases in negotiations or escalation",
          ]}
        />
        <p>
          Many Georgia renters recover deposits once inspection or deadline
          failures are clearly documented.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful Georgia disputes usually involve:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Confirming the 30-day deadline</li>
          <li>Reviewing whether a proper inspection occurred</li>
          <li>Organizing move-out photos by room and date</li>
          <li>Comparing deductions to inspection records</li>
          <li>
            Sending a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              professional, law-referenced demand letter
            </Link>
          </li>
          <li>Escalating only if necessary</li>
        </ol>
        <p>Documentation beats arguments.</p>
      </SEOSection>

      <SEOSection title="Built for Georgia security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact Georgia deadline",
            "Understand inspection and notice requirements",
            "Organize evidence correctly",
            "Generate a Georgia compliant demand letter",
            "Create a reusable dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQ
        title="Georgia Security Deposit FAQ"
        items={[
          {
            question: "Do I need a lawyer in Georgia to dispute a deposit?",
            answer: "Often no. Many disputes resolve with proper documentation.",
          },
          {
            question: "What if my landlord never did an inspection?",
            answer: "That may affect their ability to claim deductions.",
          },
          {
            question:
              "Can landlords charge for normal wear and tear in Georgia?",
            answer:
              "No. Only actual damages beyond normal wear and tear may be deducted.",
          },
          {
            question: "Is this legal advice?",
            answer:
              "No. DepositReady provides documentation tools and state specific information.",
          },
        ]}
      />

      <SEOCTA
        title="Check your Georgia security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $39 one time · Takes about 10 minutes · Instant download. Typical Georgia deposits range from $800–$2,500."
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
            title: "Florida Security Deposit Deadline",
            href: "/security-deposit-deadline-florida",
            description: "Florida requires certified mail for deduction notices",
          },
          {
            title: "Illinois Security Deposit Deadline",
            href: "/security-deposit-deadline-illinois",
            description: "Illinois has 30/45-day deadlines with double damages",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
