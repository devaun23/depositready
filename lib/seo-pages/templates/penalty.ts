/**
 * Penalty Template — "deposit penalty {state}"
 *
 * Recovery and damages focused. Distinct from deadline (timing)
 * and law (full legal overview).
 */

import type { StateRules } from '@/lib/state-rules';
import type { PageTypeConfig, SeoSectionData, FaqItem } from '../types';

export const penaltyTemplate: PageTypeConfig = {
  id: 'penalty',
  slugPrefix: 'deposit-penalty',
  status: 'published',

  titleTemplate: (s) =>
    `${s.name} Security Deposit Penalties — What You Could Recover`,

  descriptionTemplate: (s) =>
    `${s.name} landlords who violate deposit laws face serious penalties. Learn about ${s.damagesDescription}, forfeiture rules, and how to calculate your potential recovery.`,

  hero: (s) => ({
    title: `${s.name} Security Deposit Penalties`,
    subtitle: `What Happens When Landlords Break ${s.name} Law`,
    intro: `${s.name} imposes real consequences on landlords who mishandle security deposits. If your landlord missed a deadline or withheld your deposit improperly, here's what the law says you may recover.`,
    secondaryButton: {
      text: `Check ${s.name} deadlines`,
      href: `/security-deposit-deadline-${s.slug}`,
    },
  }),

  sections: (s: StateRules): SeoSectionData[] => {
    const penaltyTypes = [
      `Forfeiture — landlord loses the right to withhold any deposit amount`,
      `Multiplier damages — up to ${s.damagesMultiplier}x the wrongfully withheld amount`,
      `Court costs — filing fees range from $${s.filingFee.min} to $${s.filingFee.max}`,
    ];

    if (s.additionalDamages) {
      penaltyTypes.push(`Additional penalties — ${s.additionalDamages}`);
    }

    const whenPenaltiesApply = [
      `Landlord failed to return deposit within ${s.returnDeadline} days`,
      `No itemized statement was provided within ${s.claimDeadline} days`,
      'Deductions included normal wear and tear',
      'Landlord acted in bad faith',
    ];

    if (s.certifiedMailRequired) {
      whenPenaltiesApply.push('Notice was not sent via certified mail');
    }

    if (s.itemizedDeductionsRequired) {
      whenPenaltiesApply.push('Deductions were not properly itemized');
    }

    return [
      {
        id: 'verdict-cta-top',
        heading: '',
        blocks: [{ type: 'verdict-cta' }],
      },
      {
        id: 'penalty-types',
        heading: `Types of penalties under ${s.name} law`,
        blocks: [
          {
            type: 'paragraph',
            text: `${s.name} law doesn't just require landlords to return deposits — it penalizes those who don't. The penalties exist to discourage bad faith withholding and protect tenants.`,
          },
          {
            type: 'checklist',
            variant: 'bullet',
            items: penaltyTypes,
          },
          {
            type: 'statute-quote',
            quote: s.statutoryLanguage.damagesClause,
            citation: s.statuteSections.damagesProvision,
          },
        ],
      },
      {
        id: 'when-penalties-apply',
        heading: `When ${s.name} penalties apply`,
        variant: 'gray',
        blocks: [
          {
            type: 'paragraph',
            text: 'Penalties may be triggered when any of the following occur:',
          },
          {
            type: 'checklist',
            variant: 'bullet',
            items: whenPenaltiesApply,
          },
          {
            type: 'callout',
            variant: 'warning',
            text: `Not every violation triggers the maximum penalty. Courts consider whether the landlord acted in bad faith. But procedural failures — like missing the ${s.claimDeadline}-day deadline — often shift the burden to the landlord.`,
          },
        ],
      },
      {
        id: 'calculating-recovery',
        heading: 'Calculating your potential recovery',
        blocks: [
          {
            type: 'paragraph',
            text: `In ${s.name}, your recovery depends on the violation and deposit amount. Here's how the math works:`,
          },
          {
            type: 'checklist',
            variant: 'bullet',
            items: [
              'Start with the amount wrongfully withheld',
              `Apply the ${s.damagesMultiplier}x multiplier if the landlord acted in bad faith`,
              'Add court costs and filing fees',
              ...(s.additionalDamages ? [`Factor in additional damages: ${s.additionalDamages}`] : []),
            ],
          },
          {
            type: 'callout',
            variant: 'success',
            text: `Example: On a $1,500 deposit wrongfully withheld in ${s.name}, you could potentially recover up to $${(1500 * s.damagesMultiplier).toLocaleString()} in ${s.damagesDescription}, plus court costs.`,
          },
          {
            type: 'paragraph',
            text: `Cases are heard in ${s.courtName}. Filing costs $${s.filingFee.min}–$${s.filingFee.max}. ${s.name}'s small claims court handles cases up to $${s.maxSmallClaims.toLocaleString()} — no lawyer required.`,
          },
        ],
      },
      {
        id: 'how-we-help',
        heading: 'How DepositReady helps you recover',
        variant: 'gray',
        blocks: [
          { type: 'paragraph', text: `DepositReady calculates your exact recovery amount under ${s.name} law and generates the demand letter to claim it:` },
          {
            type: 'checklist',
            variant: 'check',
            items: [
              `Calculate your penalty amount using ${s.name}'s ${s.damagesMultiplier}x multiplier`,
              `Add court costs ($${s.filingFee.min}–$${s.filingFee.max}) and any additional damages to your total`,
              `Generate a demand letter citing ${s.statuteSections.damagesProvision} with your exact recovery figure`,
              `Prepare a filing-ready case packet for ${s.courtName}`,
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
      question: `What is the maximum penalty in ${s.name}?`,
      answer: `${s.name} allows ${s.damagesDescription} (${s.damagesMultiplier}x) for bad faith withholding, plus court costs.${s.additionalDamages ? ` Additional: ${s.additionalDamages}.` : ''}`,
    },
    {
      question: `How do I prove bad faith in ${s.name}?`,
      answer: 'Missing statutory deadlines, failing to itemize deductions, and charging for normal wear and tear are common indicators courts consider.',
    },
    {
      question: `Can I get ${s.damagesDescription} in small claims court?`,
      answer: `Yes. ${s.name} small claims courts can award ${s.damagesDescription}. The limit is $${s.maxSmallClaims.toLocaleString()}.${s.smallClaimsNote ? ` Note: ${s.smallClaimsNote}` : ''}`,
    },
    {
      question: 'Do I need a lawyer?',
      answer: 'No. Small claims court is designed for self-representation. A well-documented case is often more important than legal representation.',
    },
    {
      question: 'Is this legal advice?',
      answer: 'No. DepositReady provides documentation tools and state-specific information.',
    },
  ],
};
