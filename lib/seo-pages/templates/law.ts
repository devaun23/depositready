/**
 * Law Template — "security deposit law {state}"
 *
 * Full legal overview of security deposit statutes.
 * Distinct from deadline (timing-focused) and penalty (recovery-focused).
 */

import type { StateRules } from '@/lib/state-rules';
import type { PageTypeConfig, SeoSectionData, FaqItem } from '../types';

export const lawTemplate: PageTypeConfig = {
  id: 'law',
  slugPrefix: 'security-deposit-law',
  status: 'published',

  titleTemplate: (s) =>
    `${s.name} Security Deposit Law — What Renters Need to Know`,

  descriptionTemplate: (s) =>
    `Understand ${s.name} security deposit law under ${s.statuteTitle}. Learn landlord obligations, tenant rights, deadlines, penalties, and how to enforce your rights.`,

  hero: (s) => ({
    title: `${s.name} Security Deposit Law Explained`,
    subtitle: `Your Rights Under ${s.statuteTitle}`,
    intro: `${s.name} law gives tenants specific protections when it comes to security deposits. Here's what the statute says, what landlords must do, and what happens when they don't.`,
    secondaryButton: {
      text: `Check ${s.name} deadlines`,
      href: `/security-deposit-deadline-${s.slug}`,
    },
  }),

  sections: (s: StateRules): SeoSectionData[] => {
    const obligations = [
      `Return the deposit or send an itemized statement within ${s.claimDeadline} days`,
      'Provide a written list of any deductions',
      s.itemizedDeductionsRequired
        ? 'Itemize every deduction with specific amounts'
        : 'Describe the basis for any deductions',
    ];

    if (s.certifiedMailRequired) {
      obligations.push('Send notice via certified mail');
    }

    const tenantRights = [
      'Receive your deposit back within the statutory deadline',
      'Get an itemized statement of any deductions',
      'Challenge deductions that exceed actual damages',
      'Sue in small claims court without a lawyer',
      `Seek ${s.damagesDescription} if the landlord acted in bad faith`,
    ];

    const penaltyItems = [];
    if (s.damagesMultiplier > 1) {
      penaltyItems.push(`Up to ${s.damagesMultiplier}x the deposit amount in damages`);
    }
    penaltyItems.push(
      'Forfeiture of the right to withhold any portion',
      `Court costs and filing fees ($${s.filingFee.min}–$${s.filingFee.max})`,
    );
    if (s.additionalDamages) {
      penaltyItems.push(s.additionalDamages);
    }

    return [
      {
        id: 'verdict-cta-top',
        heading: '',
        blocks: [{ type: 'verdict-cta' }],
      },
      {
        id: 'statute-overview',
        heading: `What ${s.statuteTitle} covers`,
        blocks: [
          {
            type: 'paragraph',
            text: `${s.name}'s security deposit law is codified in ${s.statuteTitle}. It governs how landlords must handle, hold, and return security deposits for residential tenants.`,
          },
          {
            type: 'paragraph',
            text: 'The statute covers:',
          },
          {
            type: 'checklist',
            variant: 'bullet',
            items: [
              'How deposits must be held during the tenancy',
              'Deadlines for returning deposits after move-out',
              'What landlords can and cannot deduct',
              'Notice and itemization requirements',
              'Penalties for non-compliance',
            ],
          },
          {
            type: 'statute-note',
            text: `Full statute: ${s.statuteTitle} (${s.statuteUrl})`,
          },
        ],
      },
      {
        id: 'landlord-obligations',
        heading: `What ${s.name} landlords must do`,
        variant: 'gray',
        blocks: [
          {
            type: 'paragraph',
            text: `Under ${s.name} law, landlords have specific obligations after a tenant moves out:`,
          },
          {
            type: 'checklist',
            variant: 'check',
            items: obligations,
          },
          {
            type: 'callout',
            variant: 'info',
            text: `The ${s.claimDeadline}-day clock starts when you vacate and provide a forwarding address.`,
          },
        ],
      },
      {
        id: 'tenant-rights',
        heading: `Your rights as a ${s.name} tenant`,
        blocks: [
          {
            type: 'paragraph',
            text: `${s.name} law gives you these protections:`,
          },
          {
            type: 'checklist',
            variant: 'check',
            items: tenantRights,
          },
          {
            type: 'paragraph',
            text: `File in ${s.courtName} for $${s.filingFee.min}–$${s.filingFee.max}. ${s.name}'s small claims court limit is $${s.maxSmallClaims.toLocaleString()}, which covers most deposit disputes.`,
          },
          ...(s.smallClaimsNote
            ? [{ type: 'callout' as const, variant: 'info' as const, text: s.smallClaimsNote }]
            : []),
        ],
      },
      {
        id: 'penalties',
        heading: 'Penalties for violations',
        variant: 'gray',
        blocks: [
          {
            type: 'paragraph',
            text: `When a ${s.name} landlord violates the security deposit statute, they may face:`,
          },
          {
            type: 'checklist',
            variant: 'bullet',
            items: penaltyItems,
          },
          {
            type: 'statute-quote',
            quote: s.statutoryLanguage.forfeitureClause,
            citation: s.statuteSections.forfeitureProvision,
          },
          {
            type: 'paragraph',
            text: `Courts in ${s.name} generally expect strict compliance with the statute. Procedural errors can weaken a landlord's position even when some deductions were legitimate.`,
          },
        ],
      },
      {
        id: 'how-we-help',
        heading: `How DepositReady helps with ${s.name} deposits`,
        blocks: [
          { type: 'paragraph', text: `DepositReady translates ${s.statuteTitle} into plain English and shows you exactly which provisions apply to your situation:` },
          {
            type: 'checklist',
            variant: 'check',
            items: [
              `Break down your rights under ${s.statuteTitle} section by section`,
              'Identify which landlord obligations were violated in your case',
              `Map your situation to the specific penalty provisions in ${s.statuteSections.damagesProvision}`,
              `Generate a demand letter that cites the exact statute sections your landlord breached`,
            ],
          },
        ],
      },
      {
        id: 'verdict-cta-bottom',
        heading: '',
        blocks: [{ type: 'verdict-cta-compact' }],
      },
    ];
  },

  faq: (s: StateRules): FaqItem[] => [
    {
      question: `What is the ${s.name} security deposit law?`,
      answer: `${s.name}'s security deposit law is ${s.statuteTitle}. It sets rules for how landlords must handle, hold, and return security deposits.`,
    },
    {
      question: `How long does a ${s.name} landlord have to return my deposit?`,
      answer: `${s.name} landlords must return deposits or send an itemized statement within ${s.claimDeadline} days of move-out.`,
    },
    {
      question: `What counts as normal wear and tear in ${s.name}?`,
      answer: `${s.name} law distinguishes between normal wear and tear (which landlords cannot deduct) and actual damage caused by the tenant. Examples of normal wear and tear include minor scuff marks, faded paint, and worn carpet from everyday use.`,
    },
    {
      question: `Can I sue my ${s.name} landlord in small claims court?`,
      answer: `Yes. ${s.name}'s small claims court limit is $${s.maxSmallClaims.toLocaleString()}, which covers most deposit disputes.${s.smallClaimsNote ? ` Note: ${s.smallClaimsNote}` : ''}`,
    },
    {
      question: 'Is this legal advice?',
      answer: 'No. DepositReady provides documentation tools and state-specific information.',
    },
  ],
};
