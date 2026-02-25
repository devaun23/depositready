import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer } from "@/components/landing";

export const metadata: Metadata = {
  title: "Security Deposit Resources & Guides | DepositReady",
  description:
    "Free guides on security deposit disputes, state deadlines, landlord deductions, and how to recover your deposit. Know your rights as a renter.",
};

interface Article {
  href: string;
  title: string;
  description: string;
}

interface Category {
  name: string;
  tag: string;
  articles: Article[];
}

const categories: Category[] = [
  {
    name: "Getting Started",
    tag: "Basics",
    articles: [
      {
        href: "/security-deposit-dispute",
        title: "How to Dispute Security Deposit Deductions",
        description:
          "Step-by-step guide to challenging unfair charges from your landlord.",
      },
      {
        href: "/security-deposit-demand-letter",
        title: "Security Deposit Demand Letter",
        description:
          "How to write and send an effective demand letter to recover your deposit.",
      },
      {
        href: "/landlord-kept-security-deposit",
        title: "Landlord Kept My Security Deposit",
        description:
          "What to do when your landlord won't return your security deposit.",
      },
    ],
  },
  {
    name: "Know Your Deadlines",
    tag: "Deadlines",
    articles: [
      {
        href: "/security-deposit-deadline",
        title: "Security Deposit Return Deadlines by State",
        description:
          "Look up your state's deadline for landlords to return security deposits.",
      },
      {
        href: "/security-deposit-deadline-california",
        title: "California Security Deposit Deadline",
        description: "California landlords have 21 days to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-florida",
        title: "Florida Security Deposit Deadline",
        description: "Florida landlords have 15–30 days depending on whether they claim deductions.",
      },
      {
        href: "/security-deposit-deadline-texas",
        title: "Texas Security Deposit Deadline",
        description: "Texas landlords have 30 days to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-georgia",
        title: "Georgia Security Deposit Deadline",
        description: "Georgia landlords have 30 days to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-illinois",
        title: "Illinois Security Deposit Deadline",
        description: "Illinois landlords have 30–45 days to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-new-jersey",
        title: "New Jersey Security Deposit Deadline",
        description: "New Jersey landlords have 30 days to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-arizona",
        title: "Arizona Security Deposit Deadline",
        description: "Arizona landlords have 14 days to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-colorado",
        title: "Colorado Security Deposit Deadline",
        description: "Colorado landlords have 30 days (or up to 60) to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-washington",
        title: "Washington Security Deposit Deadline",
        description: "Washington landlords have 21 days to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-north-carolina",
        title: "North Carolina Security Deposit Deadline",
        description: "North Carolina landlords have 30 days to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-virginia",
        title: "Virginia Security Deposit Deadline",
        description: "Virginia landlords have 45 days to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-ohio",
        title: "Ohio Security Deposit Deadline",
        description: "Ohio landlords have 30 days to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-pennsylvania",
        title: "Pennsylvania Security Deposit Deadline",
        description: "Pennsylvania landlords have 30 days to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-michigan",
        title: "Michigan Security Deposit Deadline",
        description: "Michigan landlords have 30 days to return your deposit.",
      },
      {
        href: "/security-deposit-deadline-massachusetts",
        title: "Massachusetts Security Deposit Deadline",
        description: "Massachusetts landlords have 30 days to return your deposit.",
      },
    ],
  },
  {
    name: "Deductions & Charges",
    tag: "Deductions",
    articles: [
      {
        href: "/what-can-landlords-deduct-from-security-deposit",
        title: "What Can Landlords Deduct From Your Security Deposit?",
        description:
          "Know what's a legitimate deduction and what crosses the line.",
      },
      {
        href: "/normal-wear-and-tear-vs-damage",
        title: "Normal Wear and Tear vs. Damage",
        description:
          "Learn the difference — landlords can't charge you for normal wear.",
      },
      {
        href: "/can-landlord-charge-for-cleaning",
        title: "Can Your Landlord Charge for Cleaning?",
        description:
          "When cleaning charges are valid and when they're not.",
      },
      {
        href: "/can-landlord-charge-for-painting",
        title: "Can Your Landlord Charge for Painting?",
        description:
          "Painting after normal use is the landlord's responsibility in most states.",
      },
    ],
  },
  {
    name: "Taking Action",
    tag: "Action",
    articles: [
      {
        href: "/security-deposit-not-returned-after-30-days",
        title: "Security Deposit Not Returned After 30 Days",
        description:
          "What to do when your landlord misses the return deadline.",
      },
      {
        href: "/how-to-sue-landlord-for-security-deposit",
        title: "How to Sue Your Landlord for Security Deposit",
        description:
          "Small claims court guide for recovering your security deposit.",
      },
    ],
  },
  {
    name: "State Guides",
    tag: "States",
    articles: [
      {
        href: "/florida-rules",
        title: "Florida Security Deposit Rules",
        description:
          "Complete guide to Florida's security deposit laws, deadlines, and tenant rights.",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="py-12 md:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight mb-4">
              Security Deposit Resources
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Free guides to help you understand your rights, meet deadlines,
              and recover your security deposit.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-12 md:space-y-16">
            {categories.map((category) => (
              <section key={category.name}>
                <h2 className="font-serif text-xl md:text-2xl font-semibold text-black mb-6">
                  {category.name}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.articles.map((article) => (
                    <Link
                      key={article.href}
                      href={article.href}
                      className="group block p-5 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                      <span className="inline-block text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                        {category.tag}
                      </span>
                      <h3 className="font-medium text-black group-hover:text-gray-700 mb-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {article.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              Ready to get your deposit back?
            </p>
            <Link
              href="/wizard"
              className="inline-flex px-6 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors"
            >
              Start Your Recovery
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
