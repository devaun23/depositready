"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield } from "lucide-react";

const faqs = [
  {
    q: "What does the free case check tell me?",
    a: "It analyzes your situation against your state's deposit laws, identifies specific violations your landlord may have committed, calculates potential penalties, and rates your case strength — all in under 60 seconds with no sign-up.",
  },
  {
    q: "How is this different from a free template?",
    a: "A template gives you blank words to fill in. DepositReady diagnoses whether your landlord actually broke the law, calculates penalties most renters don't know about, and builds an enforcement packet from your specific violations — not generic fill-in-the-blank text.",
  },
  {
    q: "What do I get for $39?",
    a: "A Recovery Packet built from your case: a demand letter citing your landlord's exact violations and the statutes they broke, penalty calculations, an evidence checklist tailored to your situation, and a follow-up escalation timeline.",
  },
  {
    q: "What if my landlord ignores the letter?",
    a: "Your packet includes a follow-up template and escalation timeline with small claims filing guidance. The Expert Review add-on also includes counter-argument prep.",
  },
  {
    q: "Is this legal advice?",
    a: "No. DepositReady is a self-help documentation tool, not a law firm. We identify potential violations and generate state-specific documents, but we don't provide legal advice or represent you.",
  },
  {
    q: "What's the refund policy?",
    a: "If you use our documents and don't recover your deposit, we refund your purchase in full. No questions asked.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-accent-light text-primary text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
            <Shield className="h-3.5 w-3.5" />
            Common Questions
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Everything you need to know about checking your case and recovering your deposit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-10 sm:mt-12 space-y-3"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={false}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-primary/30 bg-card shadow-sm"
                    : "border-border bg-card hover:border-primary/15"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <span className="font-semibold text-foreground text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
