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
  title: "California Security Deposit Deadline for Renters",
  description:
    "California landlords must return security deposits within strict deadlines. Learn the California security deposit timeline, notice rules, penalties, and how renters dispute unfair charges.",
};

export default function CaliforniaSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="California Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="California law gives landlords a short window to return your deposit or justify deductions. If they miss it—or deduct improperly—you may have strong leverage to recover your money."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how California deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across California · Secure checkout · Not legal advice"
      />

      <SEOSection title="California is strict about security deposits">
        <p>
          California has some of the strongest tenant protections in the country
          when it comes to security deposits.
        </p>
        <p>Landlords must:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Act quickly",
            "Follow precise rules",
            "Provide detailed documentation",
          ]}
        />
        <p>
          If they fail to comply, penalties can apply—even if some damage
          existed.
        </p>
        <p>
          In many California disputes, the issue is not whether damage occurred,
          but whether the landlord followed the law.
        </p>
      </SEOSection>

      <SEOSection title="California security deposit deadlines explained" variant="gray">
        <p>After you move out:</p>
        <SEODeadlineBox
          title="California Deadline"
          items={[
            {
              days: "21 days",
              description:
                "The landlord must return your deposit, provide an itemized list of deductions, and include copies of receipts or invoices (with limited exceptions)",
            },
          ]}
          note="This 21-day deadline applies in all cases, whether or not deductions are taken."
        />
        <p className="text-sm text-gray-500">
          California security deposits are governed by California Civil Code
          §1950.5.
        </p>
      </SEOSection>

      <SEOSection title="California landlords must be very specific">
        <p>A valid California deduction notice must:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Be in writing",
            "Be sent within 21 days",
            "Itemize each deduction clearly",
            "Include receipts or invoices for repairs (when required)",
            "Distinguish damage from normal wear and tear",
          ]}
        />
        <p>Common California landlord mistakes:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Missing the 21 day deadline",
            "Charging for normal wear and tear",
            "Failing to include receipts",
            "Using estimates when receipts are required",
            "Sending vague or incomplete itemizations",
          ]}
        />
        <p>Each mistake increases renter leverage.</p>
      </SEOSection>

      <SEOSection
        title="If California deadlines or notice rules were violated"
        variant="gray"
      >
        <p>If a landlord fails to comply:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "You may be entitled to your full deposit",
            "California allows statutory penalties for bad faith",
            "Improper deductions can invalidate the claim",
          ]}
        />
        <p>California courts expect landlords to follow the statute precisely.</p>
        <p>
          Many disputes resolve once landlords realize their notice was
          defective.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful California renters usually:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Confirm the 21 day deadline</li>
          <li>Review itemization and receipts carefully</li>
          <li>Separate normal wear and tear from damage</li>
          <li>Organize photos chronologically</li>
          <li>
            Send a professional, law referenced{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              demand letter
            </Link>
          </li>
          <li>Escalate only if necessary</li>
        </ol>
        <p>Professional disputes are taken seriously. Unclear ones are ignored.</p>
      </SEOSection>

      <SEOSection title="Built for California security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact California deadline",
            "Identify notice or receipt violations",
            "Organize move out evidence properly",
            "Generate a California compliant demand letter",
            "Create a single dispute packet you can reuse",
          ]}
        />
        <p>You see your deadline before paying.</p>
      </SEOSection>

      <SEOFAQ
        title="California Security Deposit FAQ"
        items={[
          {
            question: "Do I need a lawyer in California to dispute a deposit?",
            answer:
              "Often no. Many disputes resolve with proper documentation and notice.",
          },
          {
            question:
              "Can landlords charge for normal wear and tear in California?",
            answer: "No. Normal wear and tear cannot be deducted.",
          },
          {
            question: "Are receipts always required?",
            answer: "Generally yes, with limited statutory exceptions.",
          },
          {
            question: "Is this legal advice?",
            answer:
              "No. DepositReady provides documentation tools and state specific information.",
          },
        ]}
      />

      <SEOCTA
        title="Check your California security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical California deposits range from $1,500–$3,500."
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
            title: "Texas Security Deposit Deadline",
            href: "/security-deposit-deadline-texas",
            description: "Texas has a 30-day deadline for deposit returns",
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
