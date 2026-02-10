"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui";
import {
  DiagnosisFormFields,
  DiagnosisResults,
  type DiagnosisFormData,
} from "@/components/diagnosis";
import { SEOFAQWithSchema } from "@/components/seo/SEOFAQWithSchema";
import { diagnose } from "@/lib/diagnosis";
import type { DiagnosisInput, DiagnosisResult } from "@/lib/state-rules/types";
import type { StateCode } from "@/lib/state-rules";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type LetterOutcome =
  | ""
  | "ignored"
  | "partial_refund"
  | "refused"
  | "not_sent";

const LETTER_OUTCOMES: { value: LetterOutcome; label: string }[] = [
  { value: "ignored", label: "Landlord ignored it" },
  { value: "partial_refund", label: "Got a partial refund" },
  { value: "refused", label: "Landlord refused" },
  { value: "not_sent", label: "Haven't sent one yet" },
];

const FAQ_ITEMS = [
  {
    question: "What if my landlord ignored my demand letter?",
    answer:
      "If your landlord didn't respond within the legal deadline, they may have forfeited the right to withhold any of your deposit. Most states impose penalty damages — often 2x or 3x the deposit amount — for landlords who miss the return deadline.",
  },
  {
    question: "Can I take my landlord to small claims court?",
    answer:
      "Yes. Small claims court is designed for disputes like security deposits. Filing fees are typically $30-$75, no lawyer is required, and cases are usually heard within 30-60 days. Your Court-Ready Case File includes everything you need to file.",
  },
  {
    question: "How much does it cost to get my deposit back?",
    answer:
      "DepositReady's Court-Ready Case File is $79 one-time. Small claims court filing fees vary by state ($30-$75). If you win, the court may order your landlord to pay your filing fees. No lawyer needed.",
  },
  {
    question: "What's in the Court-Ready Case File?",
    answer:
      "A 10-page legal packet including: formal demand letter with statute citations, deadline violation analysis, damages calculation, evidence index, deduction dispute table, and a small claims court filing guide specific to your state.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. DepositReady is a document preparation tool, not a law firm. We help you organize your case using your state's security deposit statute. For legal advice specific to your situation, consult a licensed attorney in your state.",
  },
];

const INITIAL_FORM: DiagnosisFormData = {
  stateCode: "",
  moveOutDate: "",
  receivedNotice: "",
  noticeSentDate: "",
  totalDeposit: "",
  amountWithheld: "",
};

export default function NextStepsPage() {
  const router = useRouter();
  const [letterOutcome, setLetterOutcome] = useState<LetterOutcome>("");
  const [formData, setFormData] = useState<DiagnosisFormData>(INITIAL_FORM);
  const [email, setEmail] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  // Track page view
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "next_steps_page_viewed", {
        event_category: "engagement",
      });
    }
  }, []);

  // Redirect to /free if they haven't sent a letter
  useEffect(() => {
    if (letterOutcome === "not_sent") {
      router.push("/free");
    }
  }, [letterOutcome, router]);

  // Compute diagnosis result reactively
  const diagnosisResult: DiagnosisResult | null = useMemo(() => {
    if (
      !formData.stateCode ||
      !formData.moveOutDate ||
      !formData.receivedNotice ||
      !formData.totalDeposit
    ) {
      return null;
    }

    const input: DiagnosisInput = {
      stateCode: formData.stateCode as StateCode,
      moveOutDate: formData.moveOutDate,
      receivedNotice: formData.receivedNotice as "yes" | "no" | "not_sure",
      noticeSentDate: formData.noticeSentDate || null,
      totalDeposit: parseFloat(formData.totalDeposit),
      amountWithheld: formData.amountWithheld
        ? parseFloat(formData.amountWithheld)
        : 0,
    };

    return diagnose(input);
  }, [formData]);

  const handleFirstInteraction = useCallback(() => {
    if (hasInteracted) return;
    setHasInteracted(true);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "diagnosis_started", {
        event_category: "engagement",
        event_label: "next_steps",
        state: formData.stateCode,
      });
    }
  }, [hasInteracted, formData.stateCode]);

  // Track letter outcome selection
  const handleOutcomeChange = useCallback(
    (outcome: LetterOutcome) => {
      setLetterOutcome(outcome);

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "prior_letter_outcome_selected", {
          event_category: "engagement",
          event_label: outcome,
        });
      }

      // Save lead if we have email
      if (email && outcome && outcome !== "not_sent") {
        fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            stateCode: formData.stateCode || null,
            source: "next_steps",
          }),
        }).catch(() => {});
      }
    },
    [email, formData.stateCode]
  );

  const showForm = letterOutcome && letterOutcome !== "not_sent";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-black"
          >
            <Logo size="md" />
            <span className="hidden sm:inline">DepositReady</span>
          </Link>
          <Link
            href="/free"
            className="text-sm text-gray-500 hover:text-black transition"
          >
            Get a free letter instead
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Post-Failure Hero */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight mb-4">
            Your letter didn&apos;t work.
            <br />
            Your case isn&apos;t over.
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Most landlords ignore the first letter. That&apos;s actually good
            news — it means they&apos;ve likely missed a legal deadline, which
            strengthens your case.
          </p>
        </div>

        {/* Letter Outcome Qualifier */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <label className="block text-sm font-medium text-black mb-3">
              What happened after you sent your demand letter?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {LETTER_OUTCOMES.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleOutcomeChange(opt.value)}
                  className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors min-h-[44px] ${
                    letterOutcome === opt.value
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnosis Form + Results */}
        {showForm && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Left: Form */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <DiagnosisFormFields
                formData={formData}
                onChange={(data) => {
                  handleFirstInteraction();
                  setFormData(data);
                }}
              />
            </div>

            {/* Right: Results (appear as form is filled) */}
            <div>
              {diagnosisResult ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <DiagnosisResults
                    result={diagnosisResult}
                    email={email}
                    onEmailChange={setEmail}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center justify-center min-h-[300px]">
                  <div className="text-center text-gray-400">
                    <svg
                      className="w-12 h-12 mx-auto mb-3 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <p className="text-sm">
                      Fill in your details to see your case analysis
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Why Letters Fail Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
            <h2 className="font-serif text-2xl font-semibold text-black mb-6 text-center">
              Why demand letters get ignored
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">73%</div>
                <p className="text-sm text-gray-600">
                  of landlords ignore the first demand letter, hoping tenants
                  give up
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">2-3x</div>
                <p className="text-sm text-gray-600">
                  penalty damages in most states when landlords miss the return
                  deadline
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">89%</div>
                <p className="text-sm text-gray-600">
                  of tenants who file in small claims court recover their
                  deposit
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-12">
          <SEOFAQWithSchema
            title="Common questions about next steps"
            items={FAQ_ITEMS}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        <p>
          DepositReady is a document preparation tool, not a law firm.{" "}
          <Link href="/" className="underline hover:text-black">
            Home
          </Link>{" "}
          ·{" "}
          <Link href="/free" className="underline hover:text-black">
            Free Letter
          </Link>
        </p>
      </footer>
    </div>
  );
}
