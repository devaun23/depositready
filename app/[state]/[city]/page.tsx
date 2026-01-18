import { notFound } from "next/navigation";
import Link from "next/link";
import { getStateRules } from "@/lib/state-rules";
import { getCityData, getAllCityParams } from "@/lib/city-data";
import {
  SEOPageLayout,
  SEOHeroWithCTA,
  SEOSection,
  SEOCheckList,
  SEOFAQ,
  SEOCTA,
  SEORelatedResources,
  SEODisclaimer,
  SEOCallout,
} from "@/components/seo";

// Generate static params for all city pages
export function generateStaticParams() {
  return getAllCityParams();
}

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const cityData = getCityData(state, city);
  const stateRules = getStateRules(state);

  if (!cityData || !stateRules) {
    return { title: "City Not Found" };
  }

  return {
    title: `${cityData.name}, ${stateRules.name} Security Deposit Laws | DepositReady`,
    description: `Security deposit laws for ${cityData.name}, ${stateRules.name}. ${stateRules.returnDeadline}-day return deadline. File in ${cityData.county} Magistrate Court. Know your rights.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const cityData = getCityData(state, city);
  const stateRules = getStateRules(state);

  if (!cityData || !stateRules) {
    notFound();
  }

  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title={`${cityData.name} Security Deposit Laws`}
        subtitle={`Know Your Rights as a ${stateRules.name} Tenant`}
        intro={`${cityData.name} follows ${stateRules.name} state law. Your landlord has ${stateRules.returnDeadline} days to return your deposit or send an itemized list of deductions. If they miss the deadline, they may owe you penalties.`}
        primaryButton={{ text: "Start My Dispute Packet", href: `/${state}/wizard` }}
        secondaryButton={{
          text: `See ${stateRules.name} law details`,
          href: `/${state}`,
        }}
        tagline={`${cityData.county} · ${stateRules.name} Law · Not legal advice`}
      />

      <SEOSection title={`${stateRules.name} Security Deposit Rules`}>
        <p>
          {cityData.name} tenants are protected by{" "}
          <strong>{stateRules.statuteTitle}</strong>. Here&apos;s what you need to
          know:
        </p>
        <SEOCheckList
          variant="bullet"
          items={[
            `Landlord has ${stateRules.returnDeadline} days to return deposit (if no deductions)`,
            `Landlord has ${stateRules.claimDeadline} days to send itemized deductions`,
            `Small claims limit: $${stateRules.maxSmallClaims.toLocaleString()}`,
            `Bad faith penalty: ${stateRules.damagesDescription}`,
            stateRules.additionalDamages
              ? `Additional remedies: ${stateRules.additionalDamages}`
              : "Attorney fees may be recoverable",
          ]}
        />
        <SEOCallout variant="info">
          <strong>Important:</strong> The deadline starts when you move out AND
          return the keys. Make sure you have proof of your move-out date.
        </SEOCallout>
      </SEOSection>

      <SEOSection title={`Filing in ${cityData.county}`} variant="gray">
        <p>
          If your landlord doesn&apos;t respond to your demand letter, you can file
          in small claims court:
        </p>
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-3">
          <div>
            <div className="font-semibold text-black">
              {cityData.smallClaimsCourt.name}
            </div>
            <div className="text-gray-600">{cityData.smallClaimsCourt.address}</div>
          </div>
          {cityData.smallClaimsCourt.phone && (
            <div>
              <span className="text-gray-500">Phone:</span>{" "}
              <span className="text-gray-700">{cityData.smallClaimsCourt.phone}</span>
            </div>
          )}
          {cityData.smallClaimsCourt.filingInfo && (
            <div className="text-sm text-gray-500">
              {cityData.smallClaimsCourt.filingInfo}
            </div>
          )}
        </div>
        <SEOCheckList
          variant="bullet"
          items={[
            "Bring your lease, move-out photos, and demand letter",
            "File in the county where the rental property is located",
            "You don't need a lawyer for small claims court",
            "Many landlords settle before the hearing date",
          ]}
        />
      </SEOSection>

      {cityData.rentalMarketInfo && (
        <SEOSection title={`Renting in ${cityData.name}`}>
          <p>{cityData.rentalMarketInfo}</p>
          <p>
            Whether you&apos;re a long-term resident or new to {cityData.name},
            knowing your rights as a tenant can save you hundreds or even thousands
            of dollars when moving out.
          </p>
        </SEOSection>
      )}

      <SEOSection title="Steps to Get Your Deposit Back" variant="gray">
        <ol className="list-decimal pl-6 space-y-2 text-gray-600">
          <li>
            <strong>Document your move-out:</strong> Take timestamped photos and
            video of the property condition
          </li>
          <li>
            <strong>Provide forwarding address:</strong> Give your landlord your
            new address in writing
          </li>
          <li>
            <strong>Wait for the deadline:</strong> {stateRules.returnDeadline} days
            for return, {stateRules.claimDeadline} days for itemized deductions
          </li>
          <li>
            <strong>Send a demand letter:</strong> If the deadline passes, send a
            formal demand citing {stateRules.statuteTitle}
          </li>
          <li>
            <strong>File in small claims:</strong> If ignored, file at{" "}
            {cityData.smallClaimsCourt.name}
          </li>
        </ol>
      </SEOSection>

      <SEOSection title={`Built for ${cityData.name} Tenants`}>
        <p>DepositReady helps you:</p>
        <SEOCheckList
          items={[
            `Calculate your exact deadline under ${stateRules.name} law`,
            "Generate a professional demand letter citing the statute",
            "Organize evidence for court",
            `Know the filing process at ${cityData.smallClaimsCourt.name}`,
            "Understand what penalties you may be owed",
          ]}
        />
        <p>
          You see your deadline and potential recovery{" "}
          <strong>before</strong> paying.
        </p>
      </SEOSection>

      <SEOFAQ
        title={`${cityData.name} Security Deposit FAQ`}
        items={[
          {
            question: `What is the security deposit deadline in ${cityData.name}?`,
            answer: `${cityData.name} follows ${stateRules.name} state law. Landlords have ${stateRules.returnDeadline} days to return your deposit if they're not claiming deductions, or ${stateRules.claimDeadline} days to send an itemized list of deductions.`,
          },
          {
            question: `Where do I file a small claims case in ${cityData.name}?`,
            answer: `Security deposit cases are filed at ${cityData.smallClaimsCourt.name}, located at ${cityData.smallClaimsCourt.address}. ${cityData.smallClaimsCourt.filingInfo || ""}`,
          },
          {
            question: `Can my ${cityData.name} landlord charge for normal wear and tear?`,
            answer: `No. Under ${stateRules.name} law, landlords cannot deduct for normal wear and tear. This includes faded paint, minor scuffs, and worn carpet in high-traffic areas.`,
          },
          {
            question: `What if my ${cityData.name} landlord doesn't respond to my demand letter?`,
            answer: `If your landlord ignores your demand letter, you can file a small claims case. In ${stateRules.name}, if the landlord acted in bad faith, you may be entitled to ${stateRules.damagesDescription}.`,
          },
        ]}
      />

      <SEOCTA
        title={`Get your deposit back in ${cityData.name}`}
        description={`Calculate your deadline, penalties, and build your case. $79 one time · Takes about 10 minutes · Instant download.`}
        primaryButton={{
          text: "Start My Dispute Packet",
          href: `/${state}/wizard`,
        }}
        secondaryButtons={[
          { text: `${stateRules.name} deadline`, href: `/security-deposit-deadline-${state}` },
          { text: "Write a demand letter", href: "/security-deposit-demand-letter" },
          { text: "How to sue landlord", href: "/how-to-sue-landlord-for-security-deposit" },
        ]}
      />

      <SEORelatedResources
        links={[
          {
            title: `${stateRules.name} Security Deposit Laws`,
            href: `/${state}`,
            description: `Full guide to ${stateRules.name} tenant rights`,
          },
          {
            title: "Security Deposit Demand Letter",
            href: "/security-deposit-demand-letter",
            description: "How to write an effective demand letter",
          },
          {
            title: "How to Sue Landlord for Deposit",
            href: "/how-to-sue-landlord-for-security-deposit",
            description: "Small claims court guide",
          },
        ]}
      />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
