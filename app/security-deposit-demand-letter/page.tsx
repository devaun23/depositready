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
  title: "Security Deposit Demand Letter: How to Write One That Works",
  description:
    "A security deposit demand letter is often the fastest way to get your deposit back. Learn what to include, common mistakes, and how renters resolve disputes.",
};

export default function SecurityDepositDemandLetterPage() {
  return (
    <SEOPageLayout>
      <SEOHero
        title="Security Deposit Demand Letter: How to Write One That Works"
        intro="If your landlord has not returned your security deposit or charged deductions you do not agree with, a security deposit demand letter is often the fastest way to resolve the dispute."
        callout="A demand letter creates a written record, references legal deadlines, and signals that you understand your rights."
      />

      <SEOSection title="What Is a Security Deposit Demand Letter?">
        <p>
          A security deposit demand letter is a written request asking the
          landlord to return all or part of your deposit. It typically references
          state deadlines, explains why deductions are disputed, and sets a clear
          timeframe for response.
        </p>
        <SEOCallout>
          Many landlords respond once a formal letter is sent because it shows you
          are serious and understand your rights.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="What a Strong Demand Letter Should Include" variant="gray">
        <p>An effective demand letter includes:</p>
        <SEOCheckList
          items={[
            "Your move out date and rental address",
            "The amount of the security deposit paid",
            "The legal deadline for return in your state",
            "A request for the deposit or proper itemization",
            "A clear response deadline",
          ]}
        />
      </SEOSection>

      <SEOSection title="Common Mistakes Renters Make">
        <p>
          Missing key details or sending an emotional message instead of a clear,
          professional request often causes landlords to ignore the dispute.
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            "Threatening legal action without understanding deadlines",
            "Sending vague emails or text messages",
            "Failing to reference state specific requirements",
            "Not keeping a written paper trail",
          ]}
        />
        <SEOCallout variant="warning">
          These mistakes weaken your position and make it easier for the landlord
          to delay or deny your request.
        </SEOCallout>
      </SEOSection>

      <SEOSection title="How DepositReady Makes This Easy" variant="gray">
        <p>
          DepositReady generates a professional security deposit demand letter
          customized to your state laws. You answer a few questions and receive a
          letter that includes the correct deadlines, structure, and language
          landlords recognize.
        </p>
        <p>
          Instead of guessing what to write, you can send a clear, organized
          demand in minutes.
        </p>
      </SEOSection>

      <SEOCTA
        title="Generate Your Demand Letter"
        description="Create a professional, state-specific demand letter in minutes."
        primaryButton={{
          text: "Start My Dispute Packet",
          href: "/wizard",
        }}
        secondaryButtons={[
          { text: "Check my deposit deadline", href: "/security-deposit-deadline" },
          { text: "My landlord kept my deposit", href: "/landlord-kept-security-deposit" },
        ]}
      />

      <SEORelatedResources
        links={[
          {
            title: "Security Deposit Deadline by State",
            href: "/security-deposit-deadline",
            description: "Know when your landlord's deadline expires",
          },
          {
            title: "My Landlord Kept My Deposit",
            href: "/landlord-kept-security-deposit",
            description: "Steps to take when your deposit isn't returned",
          },
          {
            title: "Dispute Unfair Deductions",
            href: "/security-deposit-dispute",
            description: "Challenge charges you disagree with",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
