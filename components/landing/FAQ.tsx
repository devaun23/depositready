"use client";

import { Collapsible } from "@/components/ui/Collapsible";

const faqs = [
  {
    question: "What does the free case check actually tell me?",
    answer:
      "It analyzes your situation against your state's deposit laws, identifies specific violations your landlord may have committed, calculates potential penalties, and rates your case strength. No sign-up required.",
  },
  {
    question: "How is this different from a free template?",
    answer:
      "A template gives you blank words to fill in. DepositReady diagnoses whether your landlord actually broke the law, calculates penalties most renters don't know about, and builds an enforcement packet from your specific violations — not generic fill-in-the-blank text.",
  },
  {
    question: "What do I get for $39?",
    answer:
      "A Recovery Packet built from your case: a demand letter citing your landlord's exact violations and the statutes they broke, penalty calculations, an evidence checklist tailored to your situation, and a follow-up escalation timeline.",
  },
  {
    question: "What if my landlord ignores the letter?",
    answer:
      "Your packet includes a follow-up template and escalation timeline. With the Expert Review add-on, you also get counter-argument prep and a small claims filing guide.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. DepositReady is a self-help documentation tool, not a law firm. We identify potential violations and generate state-specific documents, but we don't provide legal advice or represent you.",
  },
  {
    question: "What's the refund policy?",
    answer:
      "If you use our documents and don't recover your deposit, we refund your purchase in full. No questions asked.",
  },
];

export function FAQ() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-2xl mx-auto px-5">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center text-gray-900">
          Frequently asked questions
        </h2>

        <div className="mt-8 sm:mt-10 space-y-2.5">
          {faqs.map((faq) => (
            <Collapsible
              key={faq.question}
              title={faq.question}
              className="bg-white"
            >
              <p className="text-sm text-gray-500 leading-relaxed">
                {faq.answer}
              </p>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}
