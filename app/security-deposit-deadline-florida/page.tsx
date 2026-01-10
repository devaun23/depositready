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
  title: "Florida Security Deposit Deadline for Renters",
  description:
    "Florida landlords must return security deposits within strict legal deadlines. Learn the Florida security deposit timeline, notice rules, penalties, and how renters dispute unfair charges.",
};

export default function FloridaSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Florida Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="Florida law sets strict deadlines landlords must follow after you move out. If they miss one, you may have leverage to recover your full deposit."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how Florida deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across Florida · Secure checkout · Not legal advice"
      />

      <SEOSection title="In Florida, timing is often more important than damage">
        <p>
          Many renters focus on photos and condition. That matters — but Florida
          security deposit disputes are frequently decided by deadlines, not
          repairs.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Misses a deadline",
            "Sends notice incorrectly",
            "Fails to itemize deductions",
          ]}
        />
        <p>They may lose the right to keep part or all of the deposit.</p>
        <p>Florida courts expect strict compliance with the statute.</p>
      </SEOSection>

      <SEOSection title="Florida security deposit deadlines explained" variant="gray">
        <p>After you move out and provide a forwarding address:</p>
        <SEODeadlineBox
          title="Florida Deadlines"
          items={[
            {
              days: "15 days",
              description:
                "The landlord must return your full deposit if no deductions are claimed",
            },
            {
              days: "30 days",
              description:
                "If deductions are claimed, the landlord must send written notice with an itemized list of deductions and the amount being withheld",
            },
          ]}
          note="If these deadlines are missed, the landlord's ability to keep the deposit may be weakened."
        />
        <p className="text-sm text-gray-500">
          Florida security deposits are governed by Florida Statute §83.49.
        </p>
      </SEOSection>

      <SEOSection title="This is where many landlords make mistakes">
        <p>A valid Florida deduction notice must:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Be in writing",
            "Be sent within 30 days",
            "Clearly list each deduction and amount",
            "Be delivered to your forwarding address",
          ]}
        />
        <p>Common landlord errors include:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Sending notice late",
            "Sending vague or lump sum deductions",
            "Using texts or emails instead of proper notice",
            "Failing to itemize",
            "Charging estimates instead of actual costs",
          ]}
        />
        <p>Each error can reduce their leverage.</p>
      </SEOSection>

      <SEOSection
        title="What it means if Florida deadlines were not followed"
        variant="gray"
      >
        <p>If deadlines were missed:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "You may be entitled to your full deposit",
            "The landlord may lose the right to deductions",
            "You gain leverage in negotiations or escalation",
          ]}
        />
        <p>
          Many Florida disputes resolve once deadlines are clearly cited and
          documented — without court.
        </p>
      </SEOSection>

      <SEOSection title="What actually works">
        <p>Renters who succeed usually:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Confirm the exact Florida deadline",
            "Organize move out photos by room and date",
            "Document communications chronologically",
          ]}
        />
        <p>
          Send a professional, law referenced{" "}
          <Link
            href="/security-deposit-demand-letter"
            className="text-black underline hover:text-gray-600"
          >
            demand letter
          </Link>
          . Escalate only if necessary.
        </p>
        <p>
          Unorganized disputes get ignored. Clear, professional disputes get
          responses.
        </p>
      </SEOSection>

      <SEOSection title="Built for Florida deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact Florida deadline",
            "Understand whether your landlord complied",
            "Organize evidence correctly",
            "Generate a Florida compliant demand letter",
            "Create a single dispute packet you can reuse",
          ]}
        />
        <p>You see your deadline before paying.</p>
      </SEOSection>

      <SEOFAQ
        title="Florida Security Deposit FAQ"
        items={[
          {
            question: "Do I need a lawyer to dispute a Florida deposit?",
            answer:
              "No. Many disputes resolve with proper documentation and notice.",
          },
          {
            question: "What if I never gave a forwarding address?",
            answer:
              "Deadlines may depend on when or if a forwarding address was provided.",
          },
          {
            question: "Can landlords charge for cleaning in Florida?",
            answer: "Only for damage beyond normal wear and tear.",
          },
          {
            question: "Is this legal advice?",
            answer:
              "No. DepositReady provides documentation tools and state specific information.",
          },
        ]}
      />

      <SEOCTA
        title="Check your Florida security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $39 one time · Takes about 10 minutes · Instant download. Typical Florida deposits range from $1,000–$3,000."
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
            title: "Georgia Security Deposit Deadline",
            href: "/security-deposit-deadline-georgia",
            description: "Georgia allows up to 3x damages for bad faith",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
