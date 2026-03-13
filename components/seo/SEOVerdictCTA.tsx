import Link from 'next/link';

interface SEOVerdictCTAProps {
  stateName: string;
  stateSlug: string;
  stateCode: string;
  slug: string;
  pageTypeId: string;
  damagesMultiplier: number;
  compact?: boolean;
}

/**
 * Standardized Verdict CTA — the conversion mechanism on every SEO page.
 *
 * Full variant: hook + subtext + CTA button + state-specific social proof.
 * Compact variant: shorter copy for second placement (avoids feeling pushy).
 */
export function SEOVerdictCTA({
  stateName,
  stateCode,
  slug,
  pageTypeId,
  damagesMultiplier,
  compact = false,
}: SEOVerdictCTAProps) {
  const href = `/check-my-case?state=${stateCode}&ref=${slug}&page_type=${pageTypeId}`;
  const exampleRecovery = (1500 * damagesMultiplier).toLocaleString();

  if (compact) {
    return (
      <section
        className="py-8 my-4"
        data-track="verdict-cta-compact"
        data-state={stateCode}
        data-page-type={pageTypeId}
      >
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-lg font-semibold text-gray-900 mb-1">
            Ready to check your case?
          </p>
          <p className="text-sm text-gray-600 mb-3">
            Check if you're owed up to {damagesMultiplier}x your deposit under {stateName} law
          </p>
          <Link
            href={href}
            className="inline-block rounded-md bg-accent px-6 py-3 text-white font-semibold hover:bg-accent-hover transition-all shadow-md hover:shadow-lg btn-touch"
          >
            Check My Case Free
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Free case check · No payment required
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-8 my-4"
      data-track="verdict-cta"
      data-state={stateCode}
      data-page-type={pageTypeId}
    >
      <div className="bg-gradient-to-br from-gray-50 to-indigo-50 border border-gray-200 rounded-xl p-8 text-center">
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Did your {stateName} landlord break the law?
        </h3>
        <p className="text-gray-600 mb-6 text-lg">
          Free case check. No payment required.
        </p>
        <Link
          href={href}
          className="inline-block rounded-md bg-accent px-8 py-4 text-white font-semibold hover:bg-accent-hover transition-all shadow-lg hover:shadow-xl text-lg btn-touch"
        >
          Check My Case Free →
        </Link>
        <p className="text-sm text-gray-500 mt-6">
          On a $1,500 {stateName} deposit, you could recover up to ${exampleRecovery}
        </p>
      </div>
    </section>
  );
}
