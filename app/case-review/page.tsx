import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Personalized Case Review — DepositReady",
  description:
    "Get your security deposit situation reviewed by a deposit recovery specialist. Receive a personalized case assessment, action plan, and legal analysis. $149 one-time.",
  openGraph: {
    title: "Personalized Case Review — DepositReady",
    description:
      "Get your security deposit situation reviewed by a deposit recovery specialist. Personalized assessment, state-specific legal analysis, and step-by-step action plan.",
  },
};

const WHAT_YOU_GET = [
  {
    title: "Your Situation, Clearly Stated",
    description:
      "We restate your case so you know we understand exactly what happened.",
  },
  {
    title: "What the Law Says",
    description:
      "Your state's specific security deposit rules applied to your facts — deadlines, requirements, and penalties.",
  },
  {
    title: "Honest Case Assessment",
    description:
      "Strengths, weaknesses, and where you stand. No sugarcoating — just a clear picture.",
  },
  {
    title: "Step-by-Step Action Plan",
    description:
      "Exactly what to do next, in what order, with a timeline. No guessing.",
  },
  {
    title: "Key Deadlines",
    description:
      "Critical dates for your state and situation so you don't miss a window.",
  },
  {
    title: "When to Escalate",
    description:
      "Honest guidance on whether you need a lawyer — and when to consider small claims court.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Tell Us What Happened",
    description:
      "Fill out a short intake form about your deposit situation — takes about 5 minutes.",
  },
  {
    step: "2",
    title: "We Analyze Your Case",
    description:
      "A deposit recovery specialist reviews your specific facts against your state's laws.",
  },
  {
    step: "3",
    title: "Get Your Case Review",
    description:
      "Receive a personalized 3-5 page memo with your assessment and action plan within 24 hours.",
  },
];

export default function CaseReviewLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-black"
          >
            <Logo size="md" />
            <span className="hidden sm:inline">DepositReady</span>
          </Link>
          <Link
            href="/case-review/intake"
            className="bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Start Your Review
          </Link>
        </div>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="py-16 sm:py-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Personalized Case Review
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-black leading-tight">
              Get Expert Eyes on Your Deposit Case
            </h1>
            <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
              Not sure where you stand? A deposit recovery specialist will
              review your specific situation and deliver a personalized
              assessment with an action plan — within 24 hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/case-review/intake"
                className="w-full sm:w-auto bg-black text-white font-medium px-8 py-3.5 rounded-lg hover:bg-gray-800 transition text-center"
              >
                Get My Case Reviewed — $149
              </Link>
              <a
                href="#how-it-works"
                className="text-sm text-gray-500 hover:text-black transition"
              >
                See how it works
              </a>
            </div>
          </div>
        </section>

        {/* Who this is for */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-black text-center">
              Is This Right for You?
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                "Your landlord kept some or all of your deposit",
                "You're not sure if the deductions are legal",
                "You want to know your rights before taking action",
                "You need a clear plan — not generic advice",
                "You're considering small claims court",
                "You want someone to actually look at your situation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200"
                >
                  <span className="text-green-600 mt-0.5 flex-shrink-0">
                    &#10003;
                  </span>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-black text-center">
              What&apos;s In Your Case Review
            </h2>
            <p className="text-center text-gray-500 mt-2">
              A personalized 3-5 page memo covering:
            </p>
            <div className="mt-8 space-y-4">
              {WHAT_YOU_GET.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-200"
                >
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-black">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-gray-50 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-black text-center">
              How It Works
            </h2>
            <div className="mt-8 space-y-6">
              {HOW_IT_WORKS.map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border-2 border-black text-black flex items-center justify-center text-lg font-semibold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-medium text-black">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <div className="border-2 border-black rounded-xl p-6 text-center">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                One-Time Payment
              </p>
              <p className="text-5xl font-bold text-black mt-2">$149</p>
              <p className="text-gray-500 mt-1">No subscription. No hidden fees.</p>
              <ul className="mt-5 space-y-2 text-sm text-left">
                {[
                  "Personalized case assessment",
                  "State-specific legal analysis",
                  "Step-by-step action plan",
                  "Key deadlines for your case",
                  "Reviewed by a specialist",
                  "Delivered within 24 hours",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-green-600">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/case-review/intake"
                className="mt-6 block w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition text-center"
              >
                Start My Case Review
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="border-t border-gray-200 py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs text-gray-400">
              DepositReady provides informational case assessments — not legal
              advice. Our case reviews are prepared by deposit recovery
              specialists, not attorneys. For legal representation, consult a
              licensed attorney in your state.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
