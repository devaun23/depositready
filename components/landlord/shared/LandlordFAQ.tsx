"use client";

import { Collapsible } from "@/components/ui/Collapsible";

interface FAQ {
  question: string;
  answer: string;
}

const complianceFAQs: FAQ[] = [
  {
    question: "What does the Compliance Kit analyze?",
    answer:
      "Our audit checks your deposit handling against all state-specific requirements including deposit limits, required notices, return deadlines, allowable deductions, and itemization rules. You'll get a clear report showing where you're compliant and where you need to make changes.",
  },
  {
    question: "Do I need this if I haven't received a complaint?",
    answer:
      "The Compliance Kit is designed for proactive landlords who want to handle deposits correctly from the start. Fixing issues before a tenant raises them is far less expensive than defending a dispute after the fact.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. DepositReady provides informational tools based on published state statutes. We are not a law firm and do not provide legal advice. For specific legal questions, consult a licensed attorney in your state.",
  },
  {
    question: "How quickly will I receive my documents?",
    answer:
      "Your documents are available for immediate download after purchase. Most documents are generated within minutes based on the information you provide in the intake form.",
  },
  {
    question: "What states are supported?",
    answer:
      "We currently support FL, CA, TX, NY, GA, IL, OH, PA, NC, VA, WA, MA, MI, NJ, CO, AZ.",
  },
];

const defenseFAQs: FAQ[] = [
  {
    question: "I received a demand letter. What should I do first?",
    answer:
      "Don't panic. Our Defense Kit helps you understand your exposure, evaluate the tenant's claims against your state's laws, and prepare a measured response. Time is often a factor, so getting organized quickly is important.",
  },
  {
    question: "Will this help me in court?",
    answer:
      "The Defense Kit provides documentation and analysis to help you understand your position. While it doesn't replace legal representation, many landlords use our tools to prepare for small claims proceedings and settlement negotiations.",
  },
  {
    question: "Should I respond to the tenant's demands?",
    answer:
      "Our Response Letter template provides a legally safe way to acknowledge the tenant's communication without admitting liability. Ignoring a demand letter can sometimes escalate the situation unnecessarily.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. DepositReady provides informational tools based on published state statutes. We are not a law firm and do not provide legal advice. For specific legal questions, consult a licensed attorney in your state.",
  },
  {
    question: "How quickly will I receive my documents?",
    answer:
      "Your documents are available for immediate download after purchase. Most documents are generated within minutes based on the information you provide in the intake form.",
  },
];

interface LandlordFAQProps {
  mode: "compliance" | "defense";
}

export function LandlordFAQ({ mode }: LandlordFAQProps) {
  const faqs = mode === "compliance" ? complianceFAQs : defenseFAQs;

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand text-center mb-10">
          Frequently asked questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <Collapsible
              key={faq.question}
              title={faq.question}
              className="bg-gray-50"
            >
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
