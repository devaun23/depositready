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
  title: "How to Sue Landlord for Security Deposit: Small Claims Court Guide",
  description:
    "Step-by-step guide to suing your landlord in small claims court for your security deposit. No lawyer needed. Learn what to file, what to bring, and how to win.",
};

export default function HowToSueLandlordPage() {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title="How to Sue Your Landlord for Security Deposit"
        subtitle="A Step-by-Step Small Claims Court Guide"
        intro="Small claims court is designed for exactly this situation. You don't need a lawyer, filing is cheap ($30-100), and judges see deposit disputes all the time. Here's how to do it right."
        primaryButton={{ text: "Start My Dispute Packet", href: "/wizard" }}
        secondaryButton={{
          text: "Check your state deadline first",
          href: "/security-deposit-deadline",
        }}
        tagline="Know your rights · Take action · Not legal advice"
      />

      <SEOSection title="Before you sue: Send a demand letter first">
        <p>
          Courts expect you to try resolving the dispute before suing. A formal{" "}
          <Link
            href="/security-deposit-demand-letter"
            className="text-black underline hover:text-gray-600"
          >
            demand letter
          </Link>{" "}
          accomplishes two things:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Often resolves the dispute without court",
            "Shows the judge you tried to settle first",
            "Creates a paper trail of your efforts",
            "Some states require it (Colorado requires 7 days notice)",
            "Puts the landlord on notice of legal consequences",
          ]}
        />
        <SEOCallout variant="tip">
          <strong>Pro tip:</strong> Many landlords pay up when they receive a
          well-written demand letter citing specific laws. Try this first—it&apos;s
          faster and cheaper than court.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="Step 1: Gather your evidence" variant="gray">
        <p>Before filing, collect everything you&apos;ll need:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Copy of your signed lease",
            "Proof of deposit amount paid (receipt, bank statement, canceled check)",
            "Move-out date documentation (key return, photos with timestamps)",
            "Forwarding address proof (email, certified mail receipt)",
            "Move-in photos (showing pre-existing conditions)",
            "Move-out photos (showing condition when you left)",
            "Any itemized deduction list from landlord",
            "Your demand letter and proof of delivery",
            "State statute printout with deadline highlighted",
            "Any communication with landlord (emails, texts)",
          ]}
        />
        <p>
          The more organized your evidence, the better your chances. Judges
          appreciate preparation.
        </p>
      </SEOSection>

      <SEOSection title="Step 2: Calculate what you're owed">
        <p>Determine the total amount to claim:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Original deposit amount",
            "Minus any legitimate deductions (be honest about actual damage)",
            "Plus penalty damages if landlord violated deadline",
            "Plus interest if your state requires it (MA, NJ, others)",
            "Check your state's penalty: 2x, 3x, or other",
          ]}
        />
        <SEOCallout variant="info">
          <strong>Example:</strong> $1,500 deposit in Massachusetts. Landlord
          missed the deadline. You could claim: $1,500 (deposit) + $4,500 (3x
          penalty) + interest + court costs = $6,000+.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="Step 3: File in small claims court" variant="gray">
        <p>Here&apos;s how to file:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>
            <strong>Find the right court:</strong> Usually the county where the rental
            property is located
          </li>
          <li>
            <strong>Get the forms:</strong> Available at the courthouse or online.
            Called &quot;Small Claims Complaint&quot; or similar
          </li>
          <li>
            <strong>Fill out the forms:</strong> Name the landlord (and property
            management company if applicable)
          </li>
          <li>
            <strong>Pay the filing fee:</strong> Usually $30-100 depending on claim
            amount and state
          </li>
          <li>
            <strong>Serve the landlord:</strong> The court will explain how (often
            by certified mail)
          </li>
          <li>
            <strong>Wait for your hearing date:</strong> Typically 30-60 days out
          </li>
        </ol>
        <p>
          Most courthouses have self-help centers that can assist with filing.
        </p>
      </SEOSection>

      <SEOSection title="Step 4: Prepare for the hearing">
        <p>Before your court date:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Organize all documents in a folder or binder",
            "Make copies of everything for the judge and landlord",
            "Practice explaining your case in 3-5 minutes",
            "Focus on: deposit amount, deadline, violation, what you're owed",
            "Bring the statute and highlight the key parts",
            "Dress professionally (business casual)",
            "Arrive early and observe other cases",
          ]}
        />
        <p>
          Keep it simple. Judges hear dozens of cases—be clear and concise.
        </p>
      </SEOSection>

      <SEOSection title="Step 5: Present your case" variant="gray">
        <p>At the hearing:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Stand when the judge enters and when speaking",
            "Address the judge as 'Your Honor'",
            "Stick to the facts—avoid emotional arguments",
            "Present your evidence in order (lease → deposit → deadline → violation)",
            "Let the landlord speak without interrupting",
            "You'll get a chance to respond",
            "Ask to submit your organized packet as evidence",
          ]}
        />
        <SEOCallout variant="tip">
          <strong>Pro tip:</strong> Many landlords don&apos;t show up. If they don&apos;t
          appear, you likely win by default judgment.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="Small claims court limits by state">
        <p>Make sure your claim fits within your state&apos;s limit:</p>
        <SEOCheckList
          variant="bullet"
          items={[
            "California: $12,500",
            "Florida: $8,000",
            "Texas: $20,000",
            "New York: $5,000 (NYC: $10,000)",
            "Georgia: $15,000 (Magistrate Court)",
            "Illinois: $10,000",
            "Most states: $5,000-$10,000",
          ]}
        />
        <p>
          If your claim exceeds the limit, you can sue for the maximum or file
          in regular civil court (which is more complex).
        </p>
      </SEOSection>

      <SEOSection title="Built for winning in court" variant="gray">
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            "Calculate your exact deadline and penalties",
            "Generate a professional demand letter",
            "Organize all evidence for court",
            "Create a complete dispute packet",
            "Know exactly what you're owed before you file",
          ]}
        />
        <p>
          Many users never need court—the demand letter resolves it. But if you
          do go to court, you&apos;ll be ready.
        </p>
      </SEOSection>

      <SEOFAQWithSchema
        title="Small Claims Court FAQ"
        items={[
          {
            question: "Do I need a lawyer for small claims court?",
            answer: "No. Small claims is designed for self-representation. In many states, lawyers aren't even allowed. You just need good documentation.",
          },
          {
            question: "How long does the process take?",
            answer: "From filing to hearing is typically 30-60 days. The hearing itself is usually 15-30 minutes. You may get a judgment the same day.",
          },
          {
            question: "What if my landlord doesn't show up?",
            answer: "You likely win by default judgment. The judge will review your evidence and grant your claim if it's supported.",
          },
          {
            question: "What if I win but the landlord doesn't pay?",
            answer: "You can pursue collection through wage garnishment, bank levies, or property liens. The court can help with enforcement.",
          },
        ]}
      />

      <SEOCTA
        title="Get ready for small claims court"
        description="Calculate your deadline, penalties, and build your case. $79 one time · Takes about 10 minutes · Instant download."
        primaryButton={{
          text: "Start My Dispute Packet",
          href: "/wizard",
        }}
        secondaryButtons={[
          { text: "Check state deadlines", href: "/security-deposit-deadline" },
          { text: "Write a demand letter", href: "/security-deposit-demand-letter" },
          { text: "Deposit not returned?", href: "/security-deposit-not-returned-after-30-days" },
        ]}
      />

      <SEORelatedResources
        links={[
          {
            title: "Security Deposit Not Returned?",
            href: "/security-deposit-not-returned-after-30-days",
            description: "What to do when the deadline passes",
          },
          {
            title: "Security Deposit Demand Letter",
            href: "/security-deposit-demand-letter",
            description: "Try this before going to court",
          },
          {
            title: "My Landlord Kept My Deposit",
            href: "/landlord-kept-security-deposit",
            description: "Your options when landlord won't return money",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
