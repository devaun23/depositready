/**
 * Same-state cluster link generation.
 *
 * Internal linking prioritizes the same-state topical cluster because
 * a Florida renter doesn't care about California deadlines.
 */

import type { StateRules } from '@/lib/state-rules';
import type { PageTypeConfig, RelatedLink } from './types';
import { PAGE_TYPES } from './index';

/**
 * Generate related links for a given page, prioritizing same-state different-topic links.
 *
 * Returns up to 5 links:
 * - 3-4 same-state, different topic (e.g., FL deadline → FL law, FL penalty)
 * - 0-1 generic SEO page (e.g., normal-wear-and-tear)
 */
export function generateRelatedLinks(
  currentPageType: PageTypeConfig,
  rules: StateRules,
): RelatedLink[] {
  const links: RelatedLink[] = [];

  // Same-state, different page type links
  const sameStateLinks = PAGE_TYPES
    .filter(pt => pt.id !== currentPageType.id && pt.status === 'published')
    .map(pt => {
      const descriptions: Record<string, string> = {
        deadline: `${rules.name} has a ${rules.returnDeadline}-day return deadline`,
        law: `Full overview of ${rules.name} security deposit law`,
        penalty: `${rules.name} allows ${rules.damagesDescription} for violations`,
      };

      return {
        title: pt.hero(rules).title,
        href: `/${pt.slugPrefix}-${rules.slug}`,
        description: descriptions[pt.id] || `${rules.name} ${pt.id} guide`,
      };
    });

  links.push(...sameStateLinks.slice(0, 4));

  // Add 1 generic SEO page
  const genericLinks: RelatedLink[] = [
    {
      title: 'Normal Wear and Tear vs. Damage',
      href: '/normal-wear-and-tear-vs-damage',
      description: 'What landlords can and cannot deduct',
    },
    {
      title: 'Write a Demand Letter',
      href: '/security-deposit-demand-letter',
      description: 'Create a formal request that gets results',
    },
    {
      title: 'My Landlord Kept My Deposit',
      href: '/landlord-kept-security-deposit',
      description: 'What to do when your landlord won\'t return your money',
    },
  ];

  // Rotate generic links based on page type to vary content
  const genericIndex = PAGE_TYPES.findIndex(pt => pt.id === currentPageType.id) % genericLinks.length;
  links.push(genericLinks[genericIndex]);

  return links.slice(0, 5);
}
