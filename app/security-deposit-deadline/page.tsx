import type { Metadata } from "next";
import Link from "next/link";
import {
  SEOPageLayout,
  SEOHero,
  SEOSection,
  SEOCheckList,
  SEOCallout,
  SEOCTA,
  SEORelatedResources,
  SEODisclaimer,
} from "@/components/seo";

export const metadata: Metadata = {
  title: "Security Deposit Deadline by State: How Long Does a Landlord Have?",
  description:
    "Security deposit return deadlines vary by state. Learn the common deadline range, what landlords must send, and what to do if the deadline is missed.",
};

export default function SecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHero
        title="Security Deposit Deadline: How Long Does a Landlord Have to Return It?"
        intro="If you moved out and your landlord has not returned your security deposit, the most important question is the deadline in your state. Many deposit disputes are decided by whether the landlord sent the deposit or an itemized deduction notice on time."
        callout="Deadlines vary by state, but a common range is about 14 to 45 days after move out."
      />

      <SEOSection title="What Landlords Usually Must Do by the Deadline">
        <p>By the deadline, landlords typically must do one of the following:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Return the full security deposit, or",
            "Send a written itemized list of deductions and return any remaining balance",
          ]}
        />
        <SEOCallout variant="warning">
          If your landlord only texted you, gave a vague explanation, or never
          provided an itemized list, that can be a compliance issue depending on
          your state.
        </SEOCallout>
      </SEOSection>

      <SEOSection
        title="If the Deadline Was Missed, Your Leverage Can Increase"
        variant="gray"
      >
        <p>
          When landlords miss legal deadlines, renters often gain leverage. The
          landlord may lose the ability to withhold certain amounts or may face
          penalties depending on state law.
        </p>
        <SEOCallout variant="success">
          Even when penalties do not apply, a missed deadline can strengthen your
          negotiating position.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="The Fastest Way to Resolve a Deposit Dispute">
        <p>
          Most renters get better results when they stop arguing informally and
          send a clear written demand that:
        </p>
        <SEOCheckList
          items={[
            "References the deadline",
            "Requests the required documentation",
            "Includes photos or move out evidence",
          ]}
        />
        <p>Landlords take organized paper trails seriously.</p>
      </SEOSection>

      <SEOSection title="How DepositReady Helps" variant="gray">
        <p>
          DepositReady helps you check the deadline and generate a professional
          dispute packet in minutes. You answer a few questions and get a demand
          letter customized to your state and a clean documentation checklist you
          can send immediately.
        </p>
      </SEOSection>

      <SEOSection title="State-Specific Deadlines">
        <p>
          Security deposit deadlines vary by state. Select your state for
          specific deadlines, requirements, and penalties:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          <Link
            href="/security-deposit-deadline-california"
            className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium block">California</span>
            <span className="block text-sm text-gray-500">21-day deadline</span>
          </Link>
          <Link
            href="/security-deposit-deadline-florida"
            className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium block">Florida</span>
            <span className="block text-sm text-gray-500">15/30-day deadline</span>
          </Link>
          <Link
            href="/security-deposit-deadline-georgia"
            className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium block">Georgia</span>
            <span className="block text-sm text-gray-500">30-day deadline</span>
          </Link>
          <Link
            href="/security-deposit-deadline-illinois"
            className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium block">Illinois</span>
            <span className="block text-sm text-gray-500">30/45-day deadline</span>
          </Link>
          <Link
            href="/security-deposit-deadline-texas"
            className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium block">Texas</span>
            <span className="block text-sm text-gray-500">30-day deadline</span>
          </Link>
        </div>
      </SEOSection>

      <SEOCTA
        title="Check Your Deadline Now"
        description="See if your landlord missed the deadline and get your dispute packet ready."
        primaryButton={{
          text: "Start My Dispute Packet",
          href: "/wizard",
        }}
        secondaryButtons={[
          { text: "My landlord kept my deposit", href: "/landlord-kept-security-deposit" },
          { text: "Write a demand letter", href: "/security-deposit-demand-letter" },
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
            title: "How to Dispute Unfair Deductions",
            href: "/security-deposit-dispute",
            description: "Challenge charges that don't make sense",
          },
          {
            title: "California Security Deposit Deadline",
            href: "/security-deposit-deadline-california",
            description: "21-day deadline with strict itemization requirements",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
