export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  /** Path to the existing SEO page this article links to */
  seoPagePath: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "security-deposit-deadlines-by-state",
    title: "Security Deposit Deadlines: What Your Landlord Owes You",
    description:
      "Every state sets a deadline for returning your security deposit. Learn your state's rules and what happens when your landlord misses them.",
    date: "2026-02-15",
    readingTime: "5 min read",
    category: "Know Your Rights",
    seoPagePath: "/security-deposit-deadline",
  },
  {
    slug: "normal-wear-and-tear",
    title: "Normal Wear and Tear vs. Damage: Where's the Line?",
    description:
      "Landlords can't charge you for normal wear. Here's how courts draw the line and what deductions are actually legal.",
    date: "2026-02-10",
    readingTime: "4 min read",
    category: "Deductions",
    seoPagePath: "/normal-wear-and-tear-vs-damage",
  },
  {
    slug: "how-to-write-demand-letter",
    title: "How to Write a Security Deposit Demand Letter",
    description:
      "A well-written demand letter is the most effective first step to recovering your deposit. Here's exactly what to include.",
    date: "2026-02-05",
    readingTime: "6 min read",
    category: "Take Action",
    seoPagePath: "/security-deposit-demand-letter",
  },
  {
    slug: "how-to-dispute-security-deposit-deduction",
    title: "How to Dispute a Security Deposit Deduction",
    description:
      "Your landlord hit you with unfair deductions? Learn how to challenge them with evidence, timelines, and the law on your side.",
    date: "2026-01-28",
    readingTime: "5 min read",
    category: "Take Action",
    seoPagePath: "/security-deposit-dispute",
  },
  {
    slug: "landlord-kept-security-deposit",
    title: "What to Do When Your Landlord Keeps Your Deposit",
    description:
      "If your landlord ghosted you after move-out, you have legal options. Here's a step-by-step guide to getting your money back.",
    date: "2026-01-22",
    readingTime: "5 min read",
    category: "Know Your Rights",
    seoPagePath: "/landlord-kept-security-deposit",
  },
  {
    slug: "what-can-landlords-deduct-from-security-deposit",
    title: "What Can Landlords Deduct From Your Security Deposit?",
    description:
      "Not everything is a valid deduction. Learn what landlords can legally charge for — and what crosses the line.",
    date: "2026-01-15",
    readingTime: "6 min read",
    category: "Deductions",
    seoPagePath: "/what-can-landlords-deduct-from-security-deposit",
  },
  {
    slug: "security-deposit-not-returned-after-30-days",
    title: "Security Deposit Not Returned After 30 Days",
    description:
      "Most states require deposits back within 14–30 days. If yours is overdue, here's what to do next and how to escalate.",
    date: "2026-01-10",
    readingTime: "4 min read",
    category: "Know Your Rights",
    seoPagePath: "/security-deposit-not-returned-after-30-days",
  },
  {
    slug: "can-landlord-charge-for-cleaning",
    title: "Can Your Landlord Charge for Cleaning?",
    description:
      "Cleaning charges are the most common deposit dispute. Find out when they're legal, when they're not, and how to fight back.",
    date: "2026-01-05",
    readingTime: "4 min read",
    category: "Deductions",
    seoPagePath: "/can-landlord-charge-for-cleaning",
  },
  {
    slug: "can-landlord-charge-for-painting",
    title: "Can Your Landlord Charge for Painting?",
    description:
      "Repainting after move-out is usually the landlord's responsibility. Learn when painting charges are illegal deductions.",
    date: "2025-12-28",
    readingTime: "4 min read",
    category: "Deductions",
    seoPagePath: "/can-landlord-charge-for-painting",
  },
];
