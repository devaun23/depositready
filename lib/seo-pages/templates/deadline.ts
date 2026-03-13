/**
 * Deadline Template — "security deposit deadline {state}"
 *
 * Ported from the 16 hand-written deadline pages.
 * Structure mirrors the existing Florida page for content parity.
 */

import type { StateRules } from '@/lib/state-rules';
import type { PageTypeConfig, SeoSectionData, FaqItem } from '../types';

export const deadlineTemplate: PageTypeConfig = {
  id: 'deadline',
  slugPrefix: 'security-deposit-deadline',
  status: 'published',

  titleTemplate: (s) =>
    `${s.name} Security Deposit Deadline for Renters`,

  descriptionTemplate: (s) =>
    `${s.name} landlords must return security deposits within strict legal deadlines. Learn the ${s.name} security deposit timeline, notice rules, penalties, and how renters dispute unfair charges.`,

  hero: (s) => ({
    title: `${s.name} Security Deposit Deadlines`,
    subtitle: 'What the Law Requires After You Move Out',
    intro: `${s.name} law sets strict deadlines landlords must follow after you move out. If they miss one, you may have leverage to recover your full deposit.`,
    secondaryButton: {
      text: `See how ${s.name} deposit disputes work`,
      href: '/security-deposit-dispute',
    },
  }),

  sections: (s: StateRules): SeoSectionData[] => {
    const hasSeperateDeadlines = s.returnDeadline !== s.claimDeadline;

    const deadlineItems = hasSeperateDeadlines
      ? [
          {
            days: `${s.returnDeadline} days`,
            description: 'The landlord must return your full deposit if no deductions are claimed',
          },
          {
            days: `${s.claimDeadline} days`,
            description: 'If deductions are claimed, the landlord must send written notice with an itemized list of deductions and the amount being withheld',
          },
        ]
      : [
          {
            days: `${s.returnDeadline} days`,
            description: 'The landlord must return your deposit or send a written, itemized list of deductions',
          },
        ];

    const deadlineNote = hasSeperateDeadlines
      ? s.claimDeadlineNote || `Per ${s.statuteSections.returnDeadline}, if these deadlines are missed, the landlord's ability to keep the deposit may be weakened.`
      : `Per ${s.statuteSections.returnDeadline}, there is no separate grace period for "no deductions" versus "with deductions" in ${s.name}. ${s.returnDeadline} days is the deadline.`;

    const requirementItems = [
      'Be in writing',
      `Be sent within ${s.claimDeadline} days`,
      'Clearly list each deduction and amount',
      'Be delivered to your forwarding address',
    ];

    if (s.certifiedMailRequired) {
      requirementItems.push('Be sent via certified mail');
    }

    const mistakeItems = [
      `Sending notice late (after ${s.claimDeadline} days)`,
      'Sending vague or lump sum deductions',
      'Failing to itemize deductions',
      'Charging estimates instead of actual costs',
    ];

    if (s.certifiedMailRequired) {
      mistakeItems.push('Using texts or emails instead of certified mail');
    }

    return [
      {
        id: 'verdict-cta-top',
        heading: '',
        blocks: [{ type: 'verdict-cta' }],
      },
      {
        id: 'timing-matters',
        heading: `In ${s.name}, timing is often more important than damage`,
        blocks: [
          {
            type: 'paragraph',
            text: `Many renters focus on photos and condition. That matters — but ${s.name} security deposit disputes are frequently decided by deadlines, not repairs.`,
          },
          { type: 'paragraph', text: 'If a landlord:' },
          {
            type: 'checklist',
            variant: 'bullet',
            items: [
              'Misses a deadline',
              'Sends notice incorrectly',
              'Fails to itemize deductions',
            ],
          },
          { type: 'paragraph', text: 'They may lose the right to keep part or all of the deposit.' },
          { type: 'paragraph', text: `${s.name} courts expect strict compliance with the statute.` },
        ],
      },
      {
        id: 'deadlines-explained',
        heading: `${s.name} security deposit deadlines explained`,
        variant: 'gray',
        blocks: [
          { type: 'paragraph', text: 'After you move out and provide a forwarding address:' },
          {
            type: 'deadline-box',
            title: `${s.name} Deadlines`,
            items: deadlineItems,
            note: deadlineNote,
          },
          {
            type: 'statute-quote',
            quote: s.statutoryLanguage.deadlineClause,
            citation: s.statuteSections.returnDeadline,
          },
          {
            type: 'statute-note',
            text: `${s.name} security deposits are governed by ${s.statuteTitle}.`,
          },
        ],
      },
      {
        id: 'landlord-mistakes',
        heading: 'This is where many landlords make mistakes',
        blocks: [
          { type: 'paragraph', text: `A valid ${s.name} deduction notice must:` },
          { type: 'checklist', variant: 'bullet', items: requirementItems },
          { type: 'paragraph', text: 'Common landlord errors include:' },
          { type: 'checklist', variant: 'bullet', items: mistakeItems },
          { type: 'paragraph', text: 'Each error can reduce their leverage.' },
        ],
      },
      {
        id: 'consequences',
        heading: `What it means if ${s.name} deadlines were not followed`,
        variant: 'gray',
        blocks: [
          { type: 'paragraph', text: 'If deadlines were missed:' },
          {
            type: 'checklist',
            variant: 'bullet',
            items: [
              'You may be entitled to your full deposit',
              'The landlord may lose the right to deductions',
              'You gain leverage in negotiations or escalation',
            ],
          },
          {
            type: 'paragraph',
            text: `Many ${s.name} disputes resolve once deadlines are clearly cited and documented — without court.`,
          },
        ],
      },
      {
        id: 'what-works',
        heading: 'What actually works',
        blocks: [
          { type: 'paragraph', text: 'Renters who succeed usually:' },
          {
            type: 'checklist',
            variant: 'bullet',
            items: [
              `Confirm the exact ${s.name} deadline`,
              'Organize move out photos by room and date',
              'Document communications chronologically',
              'Send a professional, law-referenced demand letter',
              'Escalate only if necessary',
            ],
          },
          {
            type: 'paragraph',
            text: 'Unorganized disputes get ignored. Clear, professional disputes get responses.',
          },
        ],
      },
      {
        id: 'how-we-help',
        heading: `Built for ${s.name} deposit disputes`,
        variant: 'gray',
        blocks: [
          { type: 'paragraph', text: `DepositReady calculates your exact ${s.name} deadlines and checks whether your landlord complied:` },
          {
            type: 'checklist',
            variant: 'check',
            items: [
              `Calculate both ${s.name} deadlines from your move-out date`,
              `Flag whether the ${s.returnDeadline}-day or ${s.claimDeadline}-day window was missed`,
              'Check if required notice was sent on time and in the correct format',
              `Cite ${s.statuteSections.returnDeadline} in a ready-to-send demand`,
              'Show your deadline analysis before you pay anything',
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
      question: `Do I need a lawyer to dispute a ${s.name} deposit?`,
      answer: 'No. Many disputes resolve with proper documentation and notice.',
    },
    {
      question: 'What if I never gave a forwarding address?',
      answer: 'Deadlines may depend on when or if a forwarding address was provided.',
    },
    {
      question: `Can landlords charge for cleaning in ${s.name}?`,
      answer: 'Only for damage beyond normal wear and tear.',
    },
    {
      question: 'Is this legal advice?',
      answer: 'No. DepositReady provides documentation tools and state-specific information.',
    },
  ],
};
