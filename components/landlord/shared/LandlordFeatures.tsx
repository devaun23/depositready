"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const complianceFeatures: Feature[] = [
  {
    icon: "\u2705",
    title: "Compliance Audit",
    description:
      "State-specific analysis of your deposit handling procedures",
  },
  {
    icon: "\u{1F4C5}",
    title: "Deadline Timeline",
    description:
      "Visual timeline of all legal deadlines for your state",
  },
  {
    icon: "\u{1F4CB}",
    title: "Inspection Checklist",
    description: "Room-by-room documentation checklist",
  },
  {
    icon: "\u{1F4DD}",
    title: "Deduction Letter Template",
    description: "Pre-formatted with proper statute citations",
  },
  {
    icon: "\u{1F6E0}\uFE0F",
    title: "Wear & Tear Guide",
    description: "State-specific guide to allowable deductions",
  },
  {
    icon: "\u{1F4EC}",
    title: "Certified Mail Guide",
    description: "Step-by-step mailing instructions with tracking",
  },
];

const defenseFeatures: Feature[] = [
  {
    icon: "\u26A0\uFE0F",
    title: "Liability Assessment",
    description:
      "Worst-case exposure breakdown with dollar amounts",
  },
  {
    icon: "\u{1F4E8}",
    title: "Response Letter",
    description:
      "Legally safe template to respond to tenant threats",
  },
  {
    icon: "\u2696\uFE0F",
    title: "Settle vs. Fight Analysis",
    description:
      "Dollar breakpoint analysis for settlement decisions",
  },
  {
    icon: "\u{1F4C2}",
    title: "Evidence Organizer",
    description:
      "Systematic approach to gathering defense evidence",
  },
  {
    icon: "\u{1F4C5}",
    title: "Deadline Timeline",
    description:
      "Critical dates and legal deadlines for your response",
  },
  {
    icon: "\u{1F4EC}",
    title: "Certified Mail Guide",
    description: "Proper documentation for all communications",
  },
];

interface LandlordFeaturesProps {
  mode: "compliance" | "defense";
}

export function LandlordFeatures({ mode }: LandlordFeaturesProps) {
  const { ref, visible } = useScrollReveal();
  const features =
    mode === "compliance" ? complianceFeatures : defenseFeatures;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 md:py-24 px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand text-center mb-4">
          {mode === "compliance"
            ? "Everything you need to stay compliant"
            : "Everything you need to defend your position"}
        </h2>
        <p className="text-gray-600 text-base md:text-lg text-center mb-12 max-w-2xl mx-auto">
          {mode === "compliance"
            ? "Proactive tools to handle deposits the right way from the start."
            : "Respond to tenant disputes with confidence and documentation."}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-200 ${
                visible ? "animate-fadeSlideUp" : "opacity-0"
              }`}
              style={{
                animationDelay: visible ? `${i * 80}ms` : undefined,
                animationFillMode: "both",
              }}
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-lg mb-3"
                style={{ backgroundColor: "var(--accent-amber-light)" }}
              >
                {feature.icon}
              </span>
              <h3 className="font-serif text-base font-semibold text-brand mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
