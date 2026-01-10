import type { Metadata } from "next";
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
  title: "Security Deposit Dispute: How to Challenge Unfair Deductions",
  description:
    "If you disagree with your landlord's security deposit deductions, learn how to dispute them properly, avoid common mistakes, and improve your chances of getting your money back.",
};

export default function SecurityDepositDisputePage() {
  return (
    <SEOPageLayout>
      <SEOHero
        title="Security Deposit Dispute: How to Challenge Unfair Deductions"
        intro="A security deposit dispute happens when a landlord withholds part or all of a deposit for reasons the renter disagrees with. This often involves inflated charges, missing documentation, or deductions that go beyond normal wear and tear."
        callout="Disputing a security deposit does not require a lawyer in most cases, but it does require the right steps, documentation, and timing."
      />

      <SEOSection title="Common Reasons Renters Dispute Security Deposits">
        <p>If any of these apply, your landlord may be required to return some or all of your deposit depending on state law:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Charges for normal wear and tear",
            "Cleaning fees not specified in the lease",
            "Repair costs without receipts or proof",
            "Deductions listed without itemization",
            "Deposit not returned by the legal deadline",
          ]}
        />
      </SEOSection>

      <SEOSection title="How to Properly Dispute a Security Deposit" variant="gray">
        <p>
          Successful disputes usually follow a clear process. Renters who get
          results typically:
        </p>
        <SEOCheckList
          items={[
            "Review the lease and move out documentation",
            "Identify which deductions are being disputed",
            "Reference the legal deadline in their state",
            "Send a written demand creating a paper trail",
          ]}
        />
        <SEOCallout>
          Phone calls and informal messages rarely work. Written disputes tied to
          legal requirements are far more effective.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="What to Avoid During a Deposit Dispute">
        <p>These mistakes can weaken your position and make disputes drag on or fail entirely:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Threatening legal action without preparation",
            "Missing response deadlines",
            "Sending emotional or unclear messages",
            "Failing to document communication",
          ]}
        />
      </SEOSection>

      <SEOSection title="How DepositReady Helps With Deposit Disputes" variant="gray">
        <p>
          DepositReady helps renters dispute security deposits by generating a
          complete, professional dispute packet. You answer a few questions and
          receive a demand letter customized to your state laws, along with a
          clear documentation checklist.
        </p>
        <p>
          This gives landlords a clear, organized request they are more likely to
          take seriously.
        </p>
      </SEOSection>

      <SEOCTA
        title="Start Your Dispute Today"
        description="Get a professional dispute packet customized to your state in minutes."
        primaryButton={{
          text: "Start my security deposit dispute",
          href: "/wizard",
        }}
        secondaryButtons={[
          { text: "My landlord kept my deposit", href: "/landlord-kept-security-deposit" },
          { text: "Check my deposit deadline", href: "/security-deposit-deadline" },
        ]}
      />

      <SEORelatedResources
        links={[
          {
            title: "My Landlord Kept My Deposit",
            href: "/landlord-kept-security-deposit",
            description: "What to do when your money isn't returned",
          },
          {
            title: "Security Deposit Deadline by State",
            href: "/security-deposit-deadline",
            description: "Know your state's legal deadline",
          },
          {
            title: "Write a Demand Letter",
            href: "/security-deposit-demand-letter",
            description: "Create a professional letter that works",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
