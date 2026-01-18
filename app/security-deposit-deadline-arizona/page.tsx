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
  title: "Arizona Security Deposit Deadline for Renters",
  description:
    "Arizona landlords have just 14 business days to return security deposits. Learn the AZ security deposit timeline, bad faith penalties, and how to dispute unfair charges.",
};

export default function ArizonaSecurityDepositDeadlinePage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Arizona Security Deposit Deadlines"
        subtitle="What the Law Requires After You Move Out"
        intro="Arizona has one of the shortest deposit return deadlines in the country: just 14 business days. If your landlord acts in bad faith, you may recover double damages."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "See how deposit disputes work",
          href: "/security-deposit-dispute",
        }}
        tagline="Used by renters across Arizona · Secure checkout · Not legal advice"
      />

      <SEOSection title="Arizona's 14 business day deadline is strict">
        <p>
          Arizona uses <strong>business days</strong>, not calendar days. This
          excludes weekends and holidays, giving landlords roughly 2-3 weeks
          in real time.
        </p>
        <p>If a landlord:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Fails to return the deposit within 14 business days",
            "Does not provide an itemized list of damages",
            "Acts in bad faith when withholding money",
          ]}
        />
        <p>
          They may be liable for <strong>double the amount wrongfully withheld</strong>.
        </p>
      </SEOSection>

      <SEOSection title="Arizona security deposit deadlines explained" variant="gray">
        <p>After you move out and demand return of your deposit:</p>
        <SEODeadlineBox
          title="Arizona Deadline"
          items={[
            {
              days: "14 business days",
              description:
                "The landlord must provide an itemized list of damages and return any amount due (excludes weekends and holidays)",
            },
          ]}
          note="You have 60 days to dispute the landlord's deductions after receiving the itemized list."
        />
        <p className="text-sm text-gray-500">
          Arizona security deposits are governed by A.R.S. § 33-1321.
        </p>
      </SEOSection>

      <SEOSection title="Move-in and move-out inspections matter">
        <p>Arizona requires landlords to:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Provide a move-in inspection form",
            "Allow you to be present at move-out inspection (if you request)",
            "Document the condition of the property",
            "Give you the chance to dispute damages",
          ]}
        />
        <p>Common landlord mistakes in Arizona:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Not providing a move-in checklist",
            "Refusing to let tenant attend move-out inspection",
            "Charging for pre-existing damage",
            "Missing the 14 business day deadline",
          ]}
        />
        <p>If inspection procedures were not followed, deductions may be invalid.</p>
      </SEOSection>

      <SEOSection title="Bad faith means double damages" variant="gray">
        <p>Under A.R.S. § 33-1321, if a landlord acts in bad faith:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "You may recover double the amount wrongfully withheld",
            "Bad faith includes knowingly making false deductions",
            "Intentionally missing deadlines may qualify",
            "You can also recover the property itself if wrongfully held",
          ]}
        />
        <p>
          Bad faith generally means the landlord knew they were violating the law.
        </p>
      </SEOSection>

      <SEOSection title="What works in practice">
        <p>Successful Arizona disputes usually involve:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>Counting business days (not calendar days) from move-out</li>
          <li>Confirming you delivered keys and demanded return</li>
          <li>Comparing move-in photos to move-out condition</li>
          <li>Reviewing the itemized list for unsupported charges</li>
          <li>
            Sending a{" "}
            <Link
              href="/security-deposit-demand-letter"
              className="text-black underline hover:text-gray-600"
            >
              professional, law-referenced demand letter
            </Link>
          </li>
          <li>Filing in Justice Court if needed (up to $3,500)</li>
        </ol>
        <p>Documentation beats arguments.</p>
      </SEOSection>

      <SEOSection title="Built for Arizona security deposit disputes" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact Arizona deadline (14 business days)",
            "Understand inspection requirements",
            "Organize evidence correctly",
            "Generate an AZ-compliant demand letter",
            "Create a reusable dispute packet",
          ]}
        />
        <p>
          You see your deadline <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQ
        title="Arizona Security Deposit FAQ"
        items={[
          {
            question: "What is the deadline to return a security deposit in Arizona?",
            answer: "14 business days (excludes weekends and holidays) after you move out and demand return.",
          },
          {
            question: "Can I attend the move-out inspection in Arizona?",
            answer: "Yes, if you request it. The landlord must notify you when the inspection will occur.",
          },
          {
            question: "What is the maximum deposit in Arizona?",
            answer: "One and a half month's rent. Any more is illegal.",
          },
          {
            question: "What if my landlord charged for pre-existing damage?",
            answer: "Compare to your move-in form. If the damage was documented at move-in, the charge may be invalid.",
          },
        ]}
      />

      <SEOCTA
        title="Check your Arizona security deposit deadline in 30 seconds"
        description="Know where you stand before taking action. $79 one time · Takes about 10 minutes · Instant download. Typical AZ deposits range from $1,000–$2,500."
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
            title: "Colorado Security Deposit Deadline",
            href: "/security-deposit-deadline-colorado",
            description: "Colorado has 30-60 day deadlines with triple damages",
          },
          {
            title: "California Security Deposit Deadline",
            href: "/security-deposit-deadline-california",
            description: "California requires return within 21 days",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
