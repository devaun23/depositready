"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const steps = [
  {
    id: "diagnose",
    label: "We diagnose violations",
    desc: "Not generic info — a verdict",
  },
  {
    id: "calculate",
    label: "We calculate your claim",
    desc: "Penalties most renters miss",
  },
  {
    id: "enforce",
    label: "We build the packet",
    desc: "Evidence-backed enforcement",
  },
];

function DiagnosePreview() {
  return (
    <div className="space-y-3">
      <div className="flex justify-end animate-fadeSlideUp" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
        <div className="bg-accent text-white rounded-2xl rounded-br-md px-4 py-2.5 text-sm max-w-[85%]">
          My landlord kept $1,200 for &ldquo;cleaning.&rdquo; It&rsquo;s been 45 days.
        </div>
      </div>
      <div className="flex justify-start animate-fadeSlideUp" style={{ animationDelay: "700ms", animationFillMode: "both" }}>
        <div className="bg-section-bg-alt text-foreground rounded-2xl rounded-bl-md px-4 py-2.5 text-sm max-w-[85%]">
          <span className="font-semibold text-destructive">⚠ 2 violations found.</span>
          <br />
          <span className="text-xs text-muted mt-1 block">Missed 21-day deadline · No itemized statement</span>
        </div>
      </div>
    </div>
  );
}

function CalculatePreview() {
  const rows = [
    { label: "Deposit withheld", value: "$1,200", color: "text-foreground" },
    { label: "Late return penalty", value: "+$1,200", color: "text-success" },
    { label: "Bad faith penalty", value: "+$1,200", color: "text-success" },
  ];
  return (
    <div className="space-y-2.5">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className="flex justify-between text-sm animate-fadeSlideUp"
          style={{ animationDelay: `${i * 200 + 100}ms`, animationFillMode: "both" }}
        >
          <span className="text-foreground">{row.label}</span>
          <span className={`font-semibold ${row.color}`}>{row.value}</span>
        </div>
      ))}
      <div
        className="border-t border-border pt-2.5 flex justify-between items-baseline animate-fadeSlideUp"
        style={{ animationDelay: "700ms", animationFillMode: "both" }}
      >
        <span className="font-bold text-foreground text-sm">You may be owed</span>
        <span className="font-bold text-accent text-xl">$3,600</span>
      </div>
    </div>
  );
}

function EnforcePreview() {
  const items = [
    "State-specific demand citing exact violations",
    "Penalty calculations with statute references",
    "Evidence checklist + follow-up timeline",
  ];
  return (
    <div className="space-y-3">
      {items.map((text, i) => (
        <div
          key={i}
          className="flex items-start gap-3 animate-fadeSlideUp"
          style={{ animationDelay: `${i * 250 + 200}ms`, animationFillMode: "both" }}
        >
          {/* CheckCircle icon */}
          <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-foreground">{text}</span>
        </div>
      ))}
    </div>
  );
}

const previews = [DiagnosePreview, CalculatePreview, EnforcePreview];

// Step icons as SVGs
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const stepIcons = [SearchIcon, AlertIcon, FileIcon];

export function ProductDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  // Key to force re-mount of preview when step changes
  const [previewKey, setPreviewKey] = useState(0);

  // IntersectionObserver for in-view trigger
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { rootMargin: "-60px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (!isInView || !autoplay) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          setAutoplay(false);
          return prev;
        }
        const next = prev + 1;
        setPreviewKey((k) => k + 1);
        return next;
      });
    }, 3200);
    return () => clearInterval(timer);
  }, [isInView, autoplay]);

  const handleStepClick = useCallback((i: number) => {
    setActiveStep(i);
    setAutoplay(false);
    setPreviewKey((k) => k + 1);
  }, []);

  const step = steps[activeStep];
  const Preview = previews[activeStep];

  return (
    <section id="how-it-works" className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center text-foreground mb-3">
          A free template can&rsquo;t do this.
        </h2>
        <p className="text-center text-sm text-muted mb-10 sm:mb-12 max-w-md mx-auto">
          We don&rsquo;t just give you words. We diagnose violations, calculate penalties, and build an enforcement packet.
        </p>

        {/* 3-step strip */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {steps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <button
                key={s.id}
                onClick={() => handleStepClick(i)}
                className="flex items-center gap-1.5 sm:gap-2 group"
              >
                <div
                  className={`h-9 w-9 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    activeStep === i
                      ? "bg-accent text-white shadow-lg scale-110"
                      : i < activeStep
                      ? "bg-accent/10 text-accent"
                      : "bg-section-bg-alt text-muted/70"
                  }`}
                >
                  {i < activeStep ? (
                    <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:block transition-colors ${
                    activeStep === i ? "text-foreground" : "text-muted/70"
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={`w-5 sm:w-10 h-0.5 rounded-full transition-colors duration-300 ${
                      i < activeStep ? "bg-accent" : "bg-border"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Step label on mobile */}
        <p className="sm:hidden text-center text-sm font-medium text-foreground mb-4">{step.label}</p>

        {/* Preview card */}
        <div
          key={previewKey}
          className="glass-card rounded-2xl overflow-hidden max-w-xl mx-auto animate-fadeSlideUp"
          style={{ animationDuration: "0.3s" }}
        >
          <div className="px-4 sm:px-5 py-3 border-b border-border/50 flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
              {(() => { const Icon = stepIcons[activeStep]; return <Icon className="h-4 w-4" />; })()}
            </div>
            <p className="text-sm font-semibold text-foreground">{step.label}</p>
            <p className="text-xs text-muted/70 ml-auto hidden sm:block">{step.desc}</p>
          </div>
          <div className="p-5 sm:p-6 min-h-[160px] sm:min-h-[180px]">
            <Preview />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/check-my-case"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-xl shadow-accent/20 min-h-[44px]"
          >
            Check My Case Free
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
