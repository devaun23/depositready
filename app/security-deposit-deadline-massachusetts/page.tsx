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
  title: "Massachusetts Security Deposit Deadline for Renters",
  description:
    "Massachusetts has strict security deposit laws with potential triple damages. Learn the MA 30-day timeline, interest requirements, and how to dispute unfair charges.",
};

export default function MassachusettsSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Massachusetts Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="Massachusetts has some of the strictest security deposit laws in the country. Multiple violations can result in triple damages plus 5% interest plus attorney fees."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across Massachusetts · Secure checkout · Not legal advice"
      />

      <SEOSection title="Massachusetts law is strict on landlords">
        <p>
          Massachusetts has <strong>numerous requirements</strong> landlords must
          follow—and violating any of them can trigger penalties.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Fails to return the deposit within 30 days",
            "Did not put the deposit in a separate interest-bearing account",
            "Did not provide a statement of condition at move-in",
            "Did not provide the bank information within 30 days of receipt",
          ]}
        />
        <p>
          Any violation may entitle you to <strong>triple damages</strong> plus
          5% interest plus attorney fees.
        </p>
      </SEOSection>

      <SEOSection title="Massachusetts security deposit deadlines explained" variant="gray">
        <p>After you move out:</p>
        <SEODeadlineBox
          title="Massachusetts Deadline"
          items={[
            {
              days: "30 days",
              description:
                "Landlord must return the deposit with interest, or provide a signed itemized list of damages",
            },
          ]}
          note="Itemized deductions must be signed under penalty of perjury."
        />
        <p className="text-sm text-gray-500">
          Massachusetts security deposits are governed by M.G.L. c. 186 § 15B.
        </p>
      </SEOSection>

      <SEOSection title="Multiple compliance requirements">
        <p>Massachusetts requires landlords to:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Deposit your money in a separate interest-bearing account within 30 days",
            "Provide the bank name and account number",
            "Provide a statement of property conditions within 10 days of move-in",
            "Pay interest annually or at move-out",
            "Return deposit with sworn itemized deductions within 30 days",
          ]}
        />
        <p>
          Each requirement is a potential violation—check if your landlord
          complied with all of them.
        </p>
      </SEOSection>

      <SEOSection title="Triple damages in Massachusetts" variant="gray">
        <p>Under M.G.L. c. 186 § 15B, certain violations trigger triple damages:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Three times the amount of the deposit or balance owed",
            "Plus 5% interest from when payment became due",
            "Plus court costs",
            "Plus reasonable attorney fees",
          ]}
        />
        <p>
          <strong>Note:</strong> Not all violations qualify for triple damages—but
          many do. The law specifies which violations trigger this penalty.
        </p>
      </SEOSection>

      <SEOSection title="2025 updates to Massachusetts law">
        <p>Recent court decisions and amendments have clarified:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Landlords cannot deduct for reasonable wear and tear (confirmed August 2025)",
            "What constitutes \"reasonable wear and tear\" is fact-specific",
            "Deductions must be supported by documentation",
            "Itemized list must be signed under penalties of perjury",
          ]}
        />
        <p>
          These clarifications strengthen tenant protections in Massachusetts.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful Massachusetts disputes usually involve:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Checking if you received move-in condition statement</li>
          <li>Verifying you received bank account information</li>
          <li>Confirming the 30-day deadline has passed</li>
          <li>Reviewing if deductions were signed under perjury</li>
          <li>
            Sending a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              professional, law-referenced demand letter
            </Link>
          </li>
          <li>Filing in Small Claims if needed (up to $7,000)</li>
        </ol>
        <p>Multiple violations can stack—check for all of them.</p>
      </SEOSection>

      <SEOSection title="Built for Massachusetts security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact Massachusetts deadline",
            "Check for all potential violations",
            "Organize evidence correctly",
            "Generate an MA-compliant demand letter",
            "Create a reusable dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQ
        title="Massachusetts Security Deposit FAQ"
        items={[
          {
            question: "What is the deadline to return a security deposit in MA?",
            answer: "30 days after you move out. The landlord must return the deposit with interest or provide a sworn itemized list.",
          },
          {
            question: "Does my Massachusetts landlord owe me interest?",
            answer: "Yes, if they held your deposit in an interest-bearing account (required by law). Interest must be paid annually or at move-out.",
          },
          {
            question: "Can I get triple damages in Massachusetts?",
            answer: "Yes, for certain violations of M.G.L. c. 186 § 15B. Plus 5% interest, court costs, and attorney fees.",
          },
          {
            question: "What if I never received a statement of condition?",
            answer: "Failure to provide a statement of property conditions within 10 days of move-in is a violation that may affect the landlord's right to deductions.",
          },
        ]}
      />

      <SEOCTA
        title="Check your Massachusetts security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical MA deposits range from $2,000–$5,000."
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
            title: "Connecticut Security Deposit Deadline",
            href: "/security-deposit-deadline-connecticut",
            description: "Connecticut landlords have 30 days",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
