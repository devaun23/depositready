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
];
