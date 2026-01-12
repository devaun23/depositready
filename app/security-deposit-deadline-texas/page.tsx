import type { Metadata } from "next";
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
  title: "Texas Security Deposit Deadline for Renters",
  description:
    "Texas landlords must return security deposits within strict legal deadlines. Learn the Texas security deposit timeline, notice rules, penalties, and how renters dispute unfair charges.",
};

export default function TexasSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Texas Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="Texas law gives landlords a short window to return your deposit or explain deductions. If they miss it, you may have leverage to recover your money."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how Texas deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across Texas · Secure checkout · Not legal advice"
      />

      <SEOSection title="In Texas, Speed Matters">
        <p>
          Texas gives landlords less time than many states to act after move
          out.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Misses the deadline",
            "Sends notice late",
            "Fails to properly itemize deductions",
          ]}
        />
        <p>They may be acting outside Texas law.</p>
        <p>
          Many Texas disputes turn on whether the landlord acted on time, not
          whether damage existed.
        </p>
      </SEOSection>

      <SEOSection title="Texas Security Deposit Deadlines Explained" variant="gray">
        <p>After you move out and provide a forwarding address:</p>
        <SEODeadlineBox
          title="Texas Deadline"
          items={[
            {
              days: "30 days",
              description:
                "The landlord must return your deposit or send a written, itemized list of deductions",
            },
          ]}
          note="There is no separate grace period for 'no deductions' versus 'with deductions' in Texas. Thirty days is the deadline."
        />
        <p className="text-sm text-gray-500">
          Texas security deposits are governed by Texas Property Code
          §92.103–§92.109.
        </p>
      </SEOSection>

      <SEOSection title="This Is Where Many Landlords Slip Up">
        <p>In Texas, a valid deduction notice must:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Be in writing",
            "Be sent within 30 days",
            "Clearly itemize each deduction and amount",
            "Be delivered to your forwarding address",
          ]}
        />
        <p>Common Texas landlord mistakes:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Missing the 30 day deadline",
            "Sending vague or lump sum deductions",
            "Failing to explain charges clearly",
            "Sending notice without itemization",
          ]}
        />
        <p>Improper notice weakens the claim against your deposit.</p>
      </SEOSection>

      <SEOSection title="If the Texas Deadline Was Missed" variant="gray">
        <p>If the landlord fails to comply:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "You may be entitled to your full deposit",
            "Texas law allows penalties for bad faith withholding",
            "Your leverage increases significantly",
          ]}
        />
        <p>
          Many Texas renters recover deposits once deadlines are cited
          professionally and accurately.
        </p>
      </SEOSection>

      <SEOSection title="What Works in Practice">
        <p>Successful Texas disputes usually include:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Confirming the 30 day deadline</li>
          <li>Organizing move out photos by room and date</li>
          <li>Keeping communications documented</li>
          <li>Sending a clear, professional demand letter</li>
          <li>Escalating only if needed</li>
        </ol>
        <p>Emotion does not help. Clear documentation does.</p>
      </SEOSection>

      <SEOSection title="Built for Texas Security Deposit Disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact Texas deadline",
            "Understand whether the landlord complied",
            "Organize evidence properly",
            "Generate a Texas compliant demand letter",
            "Create a reusable dispute packet",
          ]}
        />
        <p>You see your deadline before paying.</p>
      </SEOSection>

      <SEOFAQ
        title="Texas Security Deposit FAQ"
        items={[
          {
            question: "Do I need a lawyer in Texas to dispute a deposit?",
            answer:
              "Often no. Many disputes resolve with proper documentation and notice.",
          },
          {
            question: "What if I didn't give a forwarding address?",
            answer:
              "Texas deadlines depend on whether a forwarding address was provided.",
          },
          {
            question: "Can Texas landlords charge for normal wear and tear?",
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
        title="Check Your Texas Security Deposit Deadline in 30 Seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical Texas deposits range from $1,000–$3,000."
        primaryButton={{
          text: "Start My Dispute Packet",
          href: "/wizard",
        }}
        secondaryButtons={[
          { text: "Write a demand letter", href: "/security-deposit-demand-letter" },
          { text: "My landlord kept my deposit", href: "/landlord-kept-security-deposit" },
          { text: "How to dispute a deposit", href: "/security-deposit-dispute" },
        ]}
      />

      <SEORelatedResources
        links={[
          {
            title: "How to Dispute Unfair Deductions",
            href: "/security-deposit-dispute",
            description: "Challenge charges that don't make sense",
          },
          {
            title: "California Security Deposit Deadline",
            href: "/security-deposit-deadline-california",
            description: "California has a strict 21-day deadline",
          },
          {
            title: "Florida Security Deposit Deadline",
            href: "/security-deposit-deadline-florida",
            description: "Florida requires certified mail for deduction notices",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
