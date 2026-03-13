"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Shield,
  FileText,
  Upload,
  Clock,
  Scale,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  AlertTriangle,
  Target,
  Zap,
} from "lucide-react";
import type { CaseAnalysis } from "@/lib/case-data";
import { trackDashboard } from "@/lib/analytics";
import ClaimHeader from "@/components/dashboard/ClaimHeader";
import EvidenceBuilder from "@/components/dashboard/EvidenceBuilder";
import DemandLetter from "@/components/dashboard/DemandLetter";
import EnforcementTimeline from "@/components/dashboard/EnforcementTimeline";
import StatuteEngine from "@/components/dashboard/StatuteEngine";

type TabId = "overview" | "evidence" | "letter" | "timeline" | "statutes";

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: Shield },
  { id: "evidence", label: "Evidence", icon: Upload },
  { id: "letter", label: "Demand Letter", icon: FileText },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "statutes", label: "Statutes", icon: Scale },
];

export default function DashboardPage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<CaseAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "pro" | null>(null);
  const [evidenceCount, setEvidenceCount] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("dr-analysis");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CaseAnalysis;
        if (parsed.deposit && parsed.violations && parsed.statute) {
          setAnalysis(parsed);
        }
      } catch {
        // invalid data
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-foreground mb-2">No case data found</h1>
          <p className="text-muted-foreground mb-6">
            Run the free case check first to see your claim dashboard.
          </p>
          <Button variant="hero" size="lg" onClick={() => router.push("/")}>
            Check My Case Free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  const isPro = selectedPlan === "pro";
  const isBasicOrPro = !!selectedPlan;

  const progressSteps = [
    { label: "Case Verified", done: true },
    { label: "Upload Evidence", done: evidenceCount >= 2 },
    { label: "Send Demand Letter", done: false },
    { label: "Await Response", done: false },
    { label: "File Small Claims", done: false },
  ];

  const riskItems = [
    { label: "Deposit return", amount: `$${analysis.deposit.toLocaleString()}` },
    ...(analysis.penaltyAmount > 0 ? [{ label: "Statutory penalties", amount: `$${analysis.penaltyAmount.toLocaleString()}` }] : []),
    { label: "Court filing fees", amount: "~$75" },
  ];

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    trackDashboard.view(tab);
  };

  const handleSelectPlan = async (plan: "basic" | "pro") => {
    if (!analysis || checkoutLoading) return;
    setCheckoutLoading(true);
    trackDashboard.checkoutInitiated({ plan, total_claim: analysis.totalClaim, state: analysis.stateCode });

    try {
      if (plan === "basic") {
        // $39 Basic — uses check-my-case checkout route
        const res = await fetch("/api/check-my-case/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            state: analysis.stateCode || "",
            stateName: analysis.stateName,
            depositAmount: analysis.deposit,
            daysSinceMoveOut: analysis.days,
            violations: analysis.violations,
            penaltyAmount: analysis.penaltyAmount,
            totalClaim: analysis.totalClaim,
            statute: analysis.statute,
            strength: analysis.strength,
          }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      } else {
        // $79 Pro — uses checkout route
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tenantName: "",
            propertyAddress: "",
            depositAmount: analysis.deposit,
            formData: {
              source: "dashboard-pro",
              state_name: analysis.stateName,
              violations: analysis.violations,
              penalty_amount: analysis.penaltyAmount,
              total_claim: analysis.totalClaim,
              statute: analysis.statute,
              strength: analysis.strength,
            },
            cancelUrl: "/dashboard",
          }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }

    setCheckoutLoading(false);
  };

  return (
    <>
      <ClaimHeader analysis={analysis} evidenceCount={evidenceCount} />

      {/* Unlock Banner */}
      {!selectedPlan && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary text-primary-foreground"
        >
          <div className="container max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <Sparkles className="h-5 w-5 shrink-0 hidden sm:block" />
                <p className="font-semibold text-sm">
                  You have a {analysis.strength.toLowerCase()} claim worth ${analysis.totalClaim.toLocaleString()}. Start enforcing it now.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => handleSelectPlan("basic")}
                >
                  Basic $39
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white text-primary hover:bg-white/90 font-bold"
                  onClick={() => handleSelectPlan("pro")}
                >
                  Pro $79
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Left column — 2/3 */}
                <div className="lg:col-span-2 space-y-5">
                  {/* Claim Progress */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4">
                      Claim Progress
                    </h4>
                    <div className="space-y-0">
                      {progressSteps.map((step, i) => (
                        <div key={step.label} className="flex items-center gap-3 py-2">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            step.done
                              ? "bg-success/10 text-success"
                              : i === progressSteps.findIndex(s => !s.done)
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          }`}>
                            {step.done ? (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            ) : (
                              <span>{i + 1}</span>
                            )}
                          </div>
                          <span className={`text-sm ${
                            step.done ? "text-muted-foreground line-through" :
                            i === progressSteps.findIndex(s => !s.done) ? "text-foreground font-semibold" :
                            "text-muted-foreground"
                          }`}>
                            {step.label}
                          </span>
                          {i === progressSteps.findIndex(s => !s.done) && (
                            <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider ml-auto">
                              Current
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recovery Strategy */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4">
                      Recovery Strategy
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { step: "1", title: "Send statutory demand letter", desc: "Certified mail with return receipt" },
                        { step: "2", title: "Allow response window", desc: `${analysis.deadline}-day statutory period` },
                        { step: "3", title: "Escalate with final demand", desc: "Notice of intent to file" },
                        { step: "4", title: "File small claims if unpaid", desc: "Full statutory amount + fees" },
                      ].map((item) => (
                        <div key={item.step} className="flex gap-3 p-3 rounded-lg bg-background border border-border">
                          <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                            {item.step}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.title}</p>
                            <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick module actions */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: Upload, title: "Evidence", tab: "evidence" as TabId, available: true },
                      { icon: Scale, title: "Statutes", tab: "statutes" as TabId, available: true },
                      { icon: FileText, title: "Letter", tab: "letter" as TabId, available: isBasicOrPro },
                      { icon: Clock, title: "Timeline", tab: "timeline" as TabId, available: isBasicOrPro },
                    ].map((action) => (
                      <motion.button
                        key={action.title}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTabChange(action.tab)}
                        className={`rounded-xl border p-4 text-center transition-all ${
                          action.available
                            ? "border-border bg-card hover:border-primary/30 hover:shadow-md"
                            : "border-border/50 bg-secondary/30 opacity-60"
                        }`}
                      >
                        <div className={`h-9 w-9 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                          action.available ? "bg-primary/10" : "bg-secondary"
                        }`}>
                          {action.available ? (
                            <action.icon className="h-4 w-4 text-primary" />
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-xs font-semibold text-foreground">{action.title}</p>
                        {!action.available && (
                          <p className="text-[9px] text-primary font-medium mt-1">Unlock →</p>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Right column — 1/3 */}
                <div className="space-y-5">
                  {/* Landlord Risk Score */}
                  <div className="rounded-xl border border-destructive/20 bg-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-4 w-4 text-destructive" />
                      <h4 className="text-xs font-bold text-destructive uppercase tracking-[0.15em]">
                        Landlord Risk
                      </h4>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-destructive/10 text-destructive text-sm font-bold px-3 py-1.5 rounded-lg mb-3">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      HIGH
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      If this claim proceeds to small claims court, the landlord may be liable for:
                    </p>
                    <div className="space-y-2">
                      {riskItems.map((item) => (
                        <div key={item.label} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="text-foreground font-medium">{item.amount}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
                      <span className="font-semibold text-foreground">Total exposure</span>
                      <span className="font-serif text-foreground font-bold">
                        ${(analysis.totalClaim + 75).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Resolution Timeline */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em] mb-3">
                      Expected Timeline
                    </h4>
                    <div className="space-y-3">
                      {[
                        { week: "Week 1", event: "Demand letter delivered" },
                        { week: "Week 2", event: "Landlord response window" },
                        { week: "3–4", event: "Payment or escalation" },
                      ].map((item) => (
                        <div key={item.week} className="flex gap-3">
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded h-fit uppercase tracking-wider whitespace-nowrap">
                            {item.week}
                          </span>
                          <p className="text-xs text-foreground">{item.event}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Average recovery time: <span className="font-semibold text-foreground">17 days</span>
                      </p>
                    </div>
                  </div>

                  {/* Pricing CTA (if no plan) */}
                  {!selectedPlan && (
                    <div className="rounded-xl border-2 border-primary bg-card p-5">
                      <div className="text-center mb-4">
                        <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="font-serif text-lg text-foreground">Unlock Recovery System</p>
                      </div>
                      <div className="space-y-2 mb-4">
                        {[
                          "Demand letter generator",
                          "Certified mail delivery",
                          "Enforcement timeline",
                          "Small claims packet",
                        ].map((f) => (
                          <div key={f} className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                            <span className="text-foreground">{f}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Button variant="hero-outline" size="md" className="w-full" onClick={() => handleSelectPlan("basic")}>
                          Basic — $39
                        </Button>
                        <Button variant="hero" size="md" className="w-full shadow-lg shadow-primary/20" onClick={() => handleSelectPlan("pro")}>
                          Pro — $79
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Plan active */}
                  {selectedPlan && (
                    <div className="rounded-xl border border-success/20 bg-success/5 p-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <p className="text-sm font-semibold text-foreground">
                          {selectedPlan === "pro" ? "Pro" : "Basic"} Active
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        All {selectedPlan === "pro" ? "pro" : "basic"} tools unlocked.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "evidence" && (
            <motion.div key="evidence" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <EvidenceBuilder onCountChange={setEvidenceCount} />
            </motion.div>
          )}

          {activeTab === "letter" && (
            <motion.div key="letter" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <DemandLetter analysis={analysis} isPro={isPro} />
            </motion.div>
          )}

          {activeTab === "timeline" && (
            <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <EnforcementTimeline analysis={analysis} isPro={isPro} />
            </motion.div>
          )}

          {activeTab === "statutes" && (
            <motion.div key="statutes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <StatuteEngine analysis={analysis} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
