import type { Metadata } from "next";
import Link from "next/link";
import {
  SEOPageLayout,
  SEOHeroWithCTA,
  SEOSection,
  SEOCheckList,
  SEOFAQWithSchema,
  SEOCTA,
  SEORelatedResources,
  SEODisclaimer,
  SEOCallout,
} from "@/components/seo";

export const metadata: Metadata = {
  title: "Security Deposit Not Returned After 30 Days? Here's What to Do",
  description:
    "Your landlord missed the deadline to return your security deposit. Learn what penalties apply in your state and how to take action to get your money back.",
};

export default function SecurityDepositNotReturnedPage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="Security Deposit Not Returned After 30 Days?"
        subtitle="Your Landlord May Already Be in Violation"
        intro="If your landlord hasn't returned your deposit within the legal deadline, they may owe you MORE than just your deposit back. Many states impose double or triple damages for violations."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "Check your state's deadline",
          href: "/security-deposit-deadline",
        }}
        tagline="Know your rights · Take action · Not legal advice"
      />

      <SEOSection title="Missing the deadline has consequences">
        <p>
          Every state has a deadline for landlords to return security deposits.
          When landlords miss that deadline, they don&apos;t just owe you your money
          back—they may owe you <strong>penalties</strong>.
        </p>
        <SEOCallout variant="warning">
          <strong>Important:</strong> State deadlines vary from 14 to 60 days.
          &quot;30 days&quot; is common, but your state may be different.{" "}
          <Link
            href="/security-deposit-deadline"
            className="underline"
          >
            Check your specific deadline.
          </Link>
        </SEOCallout>
        <p>
          If your landlord has missed the deadline, you likely have leverage you
          didn&apos;t know about.
        </p>
      </SEOSection>

      <SEOSection title="State-by-state penalties for late return" variant="gray">
        <p>
          Here&apos;s what happens when landlords miss the deadline in select states:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Massachusetts: Triple damages + 5% interest + attorney fees",
            "Pennsylvania: Forfeits ALL rights to deduct + double damages",
            "Colorado: Treble (3x) damages + attorney fees",
            "Georgia: 3x amount wrongfully withheld + attorney fees",
            "New Jersey: Double damages + court costs + attorney fees",
            "California: 2x deposit (bad faith) + full deposit",
            "Michigan: Double the entire deposit (45-day rule)",
            "Ohio: Double amount wrongfully withheld + attorney fees",
          ]}
        />
        <p>
          Your state&apos;s penalties could turn a $1,500 deposit into a $3,000-4,500
          recovery.
        </p>
      </SEOSection>

      <SEOSection title="Step 1: Confirm the deadline passed">
        <p>Before taking action, verify these facts:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "What is your state's specific deadline? (14-60 days depending on state)",
            "When did you actually move out and return keys?",
            "Did you provide a forwarding address in writing? (required in most states)",
            "Has the deadline actually passed? (count carefully)",
            "Did you receive anything—even a late response?",
          ]}
        />
        <SEOCallout variant="tip">
          <strong>Pro tip:</strong> The deadline usually starts when you both
          vacate AND return keys. Make sure you have proof of your move-out date.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="Step 2: Send a demand letter" variant="gray">
        <p>
          Your first step should be a formal{" "}
          <Link
            href="/security-deposit-demand-letter"
            className="text-black underline hover:text-gray-600"
          >
            demand letter
          </Link>
          . This letter should:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "State the exact deadline that was missed",
            "Cite your state's specific statute",
            "Explain the penalties the landlord now faces",
            "Demand the full deposit plus applicable penalties",
            "Give a deadline to respond (typically 7-10 days)",
            "Warn that you'll file in small claims court if ignored",
          ]}
        />
        <p>
          Many disputes resolve at this stage—landlords often pay when they
          realize the legal consequences.
        </p>
      </SEOSection>

      <SEOSection title="Step 3: File in small claims court">
        <p>If the demand letter doesn&apos;t work, small claims court is your next step:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Filing fees are typically $30-100",
            "You don't need a lawyer",
            "Most states: Claims up to $5,000-10,000",
            "Bring: Lease, move-out photos, demand letter, deadline calculation",
            "Judges are familiar with deposit disputes",
            "Many landlords settle before the hearing",
          ]}
        />
        <p>
          Small claims court is designed for exactly these situations—it&apos;s
          accessible and usually favors well-prepared tenants.
        </p>
      </SEOSection>

      <SEOSection title="What to gather for your case" variant="gray">
        <p>Strong documentation makes all the difference:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Copy of your lease showing deposit amount",
            "Proof of move-out date (key return receipt, photos)",
            "Proof you gave a forwarding address",
            "Any correspondence with landlord",
            "Move-in and move-out photos",
            "Your state's statute citation",
            "Calculation showing deadline violation",
            "Your demand letter and proof it was sent",
          ]}
        />
        <p>
          The more organized your evidence, the stronger your case.
        </p>
      </SEOSection>

      <SEOSection title="Built for getting your deposit back">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact state deadline",
            "Determine what penalties apply",
            "Generate a professional demand letter",
            "Organize evidence for court",
            "Create a complete dispute packet",
          ]}
        />
        <p>
          You see your deadline and potential recovery{" "}
          <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQWithSchema
        title="Deposit Not Returned FAQ"
        items={[
          {
            question: "What if my landlord sent a late response?",
            answer: "In many states, a late response still triggers penalties. The deadline is the deadline. Check your state's specific rules.",
          },
          {
            question: "Do I need a lawyer to go to small claims court?",
            answer: "No. Small claims court is designed for people to represent themselves. Lawyers are often not even allowed.",
          },
          {
            question: "What if my landlord lives in another state?",
            answer: "You typically file in the county where the property is located. The landlord may need to appear or may default.",
          },
          {
            question: "Can I sue for more than the deposit?",
            answer: "Yes, if your state allows penalty damages. You may recover 2x or 3x the deposit plus attorney fees in some states.",
          },
        ]}
      />

      <SEOCTA
        title="Your landlord missed the deadline. Take action."
        description="Calculate your deadline, penalties, and recovery amount. $79 one time · Takes about 10 minutes · Instant download."
        primaryButton={{
          text: "Start My Dispute Packet",
          href: "/wizard",
        }}
        secondaryButtons={[
          { text: "Check state deadlines", href: "/security-deposit-deadline" },
          { text: "Write a demand letter", href: "/security-deposit-demand-letter" },
          { text: "How to sue landlord", href: "/how-to-sue-landlord-for-security-deposit" },
        ]}
      />

      <SEORelatedResources
        links={[
          {
            title: "Security Deposit Deadlines by State",
            href: "/security-deposit-deadline",
            description: "Find your state's exact deadline",
          },
          {
            title: "How to Sue Landlord for Deposit",
            href: "/how-to-sue-landlord-for-security-deposit",
            description: "Small claims court guide",
          },
          {
            title: "My Landlord Kept My Deposit",
            href: "/landlord-kept-security-deposit",
            description: "What to do when landlord won't return money",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
