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
  title: "Landlord Kept My Security Deposit? What to Do Next | DepositReady",
  description:
    "If your landlord kept your security deposit or charged unfair deductions, learn what to do next and how renters resolve deposit disputes fast.",
};

export default function LandlordKeptDepositPage() {
  return (
    <SEOPageLayout>
      <SEOHero
        title="My Landlord Kept My Security Deposit. What Can I Do?"
        intro="If your landlord kept your security deposit or charged deductions that do not make sense, you are not alone. This happens to renters every day, and in many cases it violates state law."
        callout="The good news is that you often still have leverage, but only if you act correctly and on time."
      />

      <SEOSection title="When Is a Landlord Allowed to Keep a Security Deposit?">
        <p>
          Landlords can only keep part or all of a security deposit for specific
          reasons, which usually include:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Unpaid rent",
            "Documented damage beyond normal wear and tear",
            "Cleaning costs clearly outlined in the lease",
          ]}
        />
        <p>
          Landlords generally cannot deduct for normal wear and tear, routine
          maintenance, vague charges, or repairs without documentation. If the
          deductions feel inflated or unclear, that is often a red flag.
        </p>
      </SEOSection>

      <SEOSection
        title="Most States Require a Deadline and Written Explanation"
        variant="gray"
      >
        <p>
          In most states, landlords must return your security deposit or provide
          a written, itemized list of deductions within a strict deadline after
          you move out. These deadlines typically range from 14 to 45 days
          depending on the state.
        </p>
        <SEOCallout>
          If your landlord missed the deadline, failed to itemize deductions, or
          only gave verbal explanations, they may already be out of compliance.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="Why Ignoring the Situation Usually Makes It Worse">
        <p>
          Many renters wait, send casual emails, or argue by phone.
          Unfortunately, that rarely works. Deadlines expire, leverage
          disappears, and landlords assume the issue will go away.
        </p>
        <SEOCallout variant="warning">
          Landlords respond when disputes are written, documented, and tied to
          legal deadlines.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="What Actually Works to Get a Deposit Back" variant="gray">
        <p>
          Renters who successfully recover their deposits usually do three
          things:
        </p>
        <SEOCheckList
          items={[
            "Reference the correct state deadline",
            "Include move out documentation and photos",
            "Send a formal written demand that creates a paper trail",
          ]}
        />
        <p>
          This does not require a lawyer. It requires sending the right document
          the right way.
        </p>
      </SEOSection>

      <SEOSection title="How DepositReady Helps">
        <p>
          DepositReady helps renters create a complete, professional security
          deposit dispute packet in minutes. You answer a few questions and
          DepositReady generates a demand letter customized to your state laws,
          a clear deadline reference, and a clean paper trail landlords take
          seriously.
        </p>
      </SEOSection>

      <SEOCTA
        title="Ready to Get Your Deposit Back?"
        description="Build a professional dispute packet customized to your state in minutes."
        primaryButton={{
          text: "Start My Dispute Packet",
          href: "/wizard",
        }}
        secondaryButtons={[
          { text: "Check my deadline", href: "/security-deposit-deadline" },
          { text: "Write a demand letter", href: "/security-deposit-demand-letter" },
        ]}
      />

      <SEORelatedResources
        links={[
          {
            title: "Security Deposit Deadline by State",
            href: "/security-deposit-deadline",
            description: "Learn how long your landlord has to return your deposit",
          },
          {
            title: "How to Dispute Unfair Deductions",
            href: "/security-deposit-dispute",
            description: "Step-by-step guide to challenging charges",
          },
          {
            title: "Write a Demand Letter",
            href: "/security-deposit-demand-letter",
            description: "Create a professional letter that gets results",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
