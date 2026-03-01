"use client";

import { Collapsible } from "@/components/ui/Collapsible";

const faqs = [
  {
    question: "Is this legal advice?",
    answer:
      "No. DepositReady is a self-help documentation tool, not a law firm. We help you organize evidence and generate state-specific documents, but we don't provide legal advice or represent you in court.",
  },
  {
    question: "What's included in the recovery letter?",
    answer:
      "Your recovery letter includes your state's specific statute references, your landlord's legal deadlines, a professional request for your deposit return, and delivery instructions. It's formatted and ready to send.",
  },
  {
    question: "How does the chat work?",
    answer:
      "Our AI chat analyzes your situation based on your state's security deposit laws. It identifies potential violations, calculates deadlines, and helps you understand your options — all for free, no sign-up required.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes. If you're not satisfied with your documents, contact us within 7 days of purchase for a full refund.",
  },
  {
    question: "Will this guarantee I get my deposit back?",
    answer:
      "No. Outcomes depend on the facts of your situation, your landlord's response, and your state's laws. We give you the tools and documentation to make your strongest case.",
  },
];

export function FAQ() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand text-center mb-10">
          Frequently asked questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <Collapsible key={faq.question} title={faq.question} className="bg-gray-50">
              <p className="text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}
