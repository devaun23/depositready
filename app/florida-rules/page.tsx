import type { Metadata } from "next";
import {
  SEOPageLayout,
  SEOHero,
  SEOSection,
  SEOCheckList,
  SEOCallout,
  SEOCTA,
  SEODeadlineBox,
  SEOComparisonGrid,
  SEOInfoList,
  SEORelatedResources,
  SEODisclaimer,
} from "@/components/seo";

export const metadata: Metadata = {
  title: "Florida Security Deposit Law (Statute 83.49) | DepositReady",
  description:
    "Plain-English explanation of Florida security deposit law, deadlines, tenant rights, and what to do if your landlord keeps your deposit.",
};

export default function FloridaRulesPage() {
  return (
    <SEOPageLayout>
      <SEOHero
        title="Florida Security Deposit Law"
        intro="A plain-English guide to Florida Statute 83.49 and your rights as a tenant."
      />

      <SEODeadlineBox
        title="Key Deadlines Your Landlord Must Meet"
        items={[
          {
            days: "15 Days",
            description:
              "To return your full deposit if they're not claiming deductions",
          },
          {
            days: "30 Days",
            description:
              "To send written notice by certified mail if they are claiming deductions",
          },
        ]}
        note="These deadlines start from the day you move out (lease termination)."
      />

      <SEOSection title="What the Law Requires">
        <p>
          Florida Statute 83.49 is clear about what landlords must do with your
          security deposit after you move out:
        </p>
        <div className="space-y-4 mt-4">
          <SEOCallout variant="success">
            <strong>If No Deductions:</strong> The landlord must return your
            entire deposit within <strong>15 days</strong> of the lease ending.
          </SEOCallout>
          <SEOCallout variant="warning">
            <strong>If Claiming Deductions:</strong> The landlord must send a
            written notice by <strong>certified mail</strong> within{" "}
            <strong>30 days</strong>, including an itemized list of each
            deduction, the amount claimed for each item, and a statement that you
            have 15 days to object in writing.
          </SEOCallout>
        </div>
      </SEOSection>

      <SEOSection title="What Happens If They Miss the Deadline?" variant="gray">
        <SEOCallout variant="success">
          If your landlord fails to provide proper notice within 30 days, they
          forfeit the right to claim any deductions from your deposit.
        </SEOCallout>
        <p>
          This is one of the strongest protections in Florida law. A landlord who
          doesn&apos;t send timely notice loses their ability to keep any of your
          money for damages, cleaning, or other claims.
        </p>
      </SEOSection>

      <SEOSection title="Your 15-Day Right to Object">
        <p>
          If you receive a deduction notice from your landlord, you have{" "}
          <strong>15 days</strong> from receiving it to object in writing. If you
          don&apos;t object within this window, the landlord may proceed with the
          deductions.
        </p>
        <SEOCallout>
          Your objection should be sent via certified mail, clearly stating which
          deductions you disagree with and why.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="Normal Wear and Tear" variant="gray">
        <p className="mb-4">
          Landlords <strong>cannot</strong> deduct for normal wear and tear. This
          includes:
        </p>
        <SEOComparisonGrid
          columns={[
            {
              title: "Normal Wear (Not Deductible)",
              items: [
                "Minor scuffs on walls",
                "Carpet wearing in high-traffic areas",
                "Faded paint from sunlight",
                "Small nail holes from pictures",
                "Worn door handles or hinges",
                "Minor scratches on appliances",
              ],
            },
            {
              title: "Damage (Potentially Deductible)",
              items: [
                "Large holes in walls",
                "Stains that require carpet replacement",
                "Broken windows or doors",
                "Pet damage beyond normal wear",
                "Unauthorized modifications",
                "Missing fixtures or appliances",
              ],
            },
          ]}
        />
      </SEOSection>

      <SEOSection title="Damages for Bad Faith">
        <SEOCallout variant="warning">
          If a landlord acts in <strong>bad faith</strong> by wrongfully
          withholding your deposit, you may be entitled to damages, plus court
          costs and reasonable attorney&apos;s fees.
        </SEOCallout>
        <p>
          Bad faith typically means the landlord knew they had no valid claim to
          your deposit but kept it anyway, or deliberately failed to follow the
          required procedures.
        </p>
      </SEOSection>

      <SEOSection title="Small Claims Court" variant="gray">
        <p className="mb-4">
          If your landlord refuses to return your deposit after receiving your
          demand letter, you can file in Florida Small Claims Court.
        </p>
        <SEOInfoList
          items={[
            { label: "Maximum claim", value: "$8,000 (plus court costs)" },
            { label: "Filing fees", value: "$55 to $300 depending on amount" },
            { label: "No attorney required", value: "You can represent yourself" },
            {
              label: "Typical timeline",
              value: "Hearing within 30-60 days of filing",
            },
          ]}
        />
      </SEOSection>

      <SEOSection title="Read the Full Statute">
        <p>
          You can read Florida Statute 83.49 in full on the official Florida
          Legislature website:
        </p>
        <a
          href="http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0000-0099/0083/Sections/0083.49.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline mt-2"
        >
          Florida Statute 83.49 - Official Text
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </SEOSection>

      <SEOSection title="When to Consult an Attorney" variant="gray">
        <p className="mb-4">
          While many deposit disputes can be resolved without a lawyer, you should
          consider consulting an attorney if:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Your claim exceeds $8,000 (beyond small claims limit)",
            "Your landlord has also filed claims against you",
            "Complex lease terms are in dispute",
            "You're facing retaliation or harassment",
            "The property is commercial rather than residential",
          ]}
        />
      </SEOSection>

      <SEOCTA
        title="Ready to Get Your Deposit Back?"
        description="Generate a customized demand letter and dispute packet in 10 minutes."
        primaryButton={{
          text: "Start Your Dispute Packet",
          href: "/wizard",
        }}
      />

      <SEORelatedResources
        links={[
          {
            title: "Florida Security Deposit Deadline",
            href: "/security-deposit-deadline-florida",
            description: "Check your deadline and build your dispute packet",
          },
          {
            title: "Write a Demand Letter",
            href: "/security-deposit-demand-letter",
            description: "Create a formal request that gets results",
          },
          {
            title: "How to Dispute Unfair Deductions",
            href: "/security-deposit-dispute",
            description: "Challenge charges that don't make sense",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
