"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  CheckCircle2,
  Camera,
  MessageSquare,
  Home,
  Receipt,
  Mail,
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface EvidenceItem {
  id: string;
  label: string;
  description: string;
  strengthImpact: string;
  icon: React.ElementType;
  required: boolean;
  uploaded: boolean;
}

interface EvidenceBuilderProps {
  onCountChange?: (count: number) => void;
}

export default function EvidenceBuilder({ onCountChange }: EvidenceBuilderProps) {
  const [items, setItems] = useState<EvidenceItem[]>([
    { id: "lease", label: "Lease Agreement", description: "Upload your signed lease or rental agreement", strengthImpact: "Proves deposit terms and obligations", icon: FileText, required: true, uploaded: false },
    { id: "receipt", label: "Deposit Receipt", description: "Proof of your security deposit payment", strengthImpact: "Establishes exact deposit amount for penalty calculation", icon: Receipt, required: true, uploaded: false },
    { id: "photos", label: "Move-Out Photos", description: "Photos documenting condition at move-out", strengthImpact: "Prevents landlord from disputing property condition", icon: Camera, required: false, uploaded: false },
    { id: "messages", label: "Landlord Communications", description: "Emails, texts, or letters from your landlord", strengthImpact: "Documents landlord awareness and potential bad faith", icon: MessageSquare, required: false, uploaded: false },
    { id: "inspection", label: "Move-Out Inspection", description: "Move-out inspection report if available", strengthImpact: "Official record of property condition", icon: Home, required: false, uploaded: false },
    { id: "return", label: "Return Envelope / Notice", description: "Any deposit return notice or partial refund received", strengthImpact: "Proves landlord's failure to comply with statute", icon: Mail, required: false, uploaded: false },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const completedCount = items.filter((i) => i.uploaded).length;
  const requiredCount = items.filter((i) => i.required).length;
  const requiredComplete = items.filter((i) => i.required && i.uploaded).length;

  const strengthLevel = completedCount >= 5 ? "Strong" : completedCount >= 3 ? "Moderate" : completedCount >= 1 ? "Building" : "Weak";
  const strengthColor = completedCount >= 5 ? "text-success" : completedCount >= 3 ? "text-primary" : "text-muted-foreground";
  const strengthBarColor = completedCount >= 5 ? "bg-success" : completedCount >= 3 ? "bg-primary" : "bg-muted-foreground";
  const strengthPercent = Math.round((completedCount / items.length) * 100);

  const toggleUpload = (id: string) => {
    setItems((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, uploaded: !item.uploaded } : item));
      const newCount = updated.filter((i) => i.uploaded).length;
      onCountChange?.(newCount);
      return updated;
    });
  };

  const nextRecommended = items.find((i) => !i.uploaded && i.required) || items.find((i) => !i.uploaded);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-border">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="font-serif text-xl text-foreground">Evidence Builder</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Each upload increases your claim strength and recovery probability.
            </p>
          </div>
        </div>

        {/* Strength indicator */}
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className={`h-4 w-4 ${strengthColor}`} />
              <span className={`text-xs font-bold uppercase tracking-wider ${strengthColor}`}>
                Evidence: {strengthLevel}
              </span>
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {completedCount}/{items.length} documents
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${strengthBarColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${strengthPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-[10px] text-muted-foreground">
              {requiredComplete}/{requiredCount} required items uploaded
            </p>
            {completedCount < items.length && (
              <p className="text-[10px] text-primary font-medium">
                +{Math.round(100 / items.length)}% per upload
              </p>
            )}
          </div>
        </div>

        {/* Next recommended action */}
        {nextRecommended && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3 flex items-center gap-3 cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={() => setExpandedId(nextRecommended.id)}
          >
            <Zap className="h-4 w-4 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground">
                Next: Upload {nextRecommended.label}
              </p>
              <p className="text-[10px] text-muted-foreground">{nextRecommended.strengthImpact}</p>
            </div>
            <TrendingUp className="h-3.5 w-3.5 text-primary shrink-0" />
          </motion.div>
        )}
      </div>

      {/* Evidence items */}
      <div className="divide-y divide-border">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <button
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="w-full flex items-center gap-3 p-4 sm:px-6 hover:bg-secondary/50 transition-colors text-left"
            >
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                item.uploaded ? "bg-success/10" : item.required ? "bg-primary/10" : "bg-secondary"
              }`}>
                {item.uploaded ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <item.icon className={`h-4 w-4 ${item.required ? "text-primary" : "text-muted-foreground"}`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium ${item.uploaded ? "text-muted-foreground line-through" : "text-foreground"}`}>
                    {item.label}
                  </p>
                  {item.required && !item.uploaded && (
                    <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Required
                    </span>
                  )}
                  {item.uploaded && (
                    <span className="text-[9px] font-bold text-success bg-success/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Done
                    </span>
                  )}
                </div>
                {!item.uploaded && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.strengthImpact}</p>
                )}
              </div>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform shrink-0 ${expandedId === item.id ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 pb-4 pl-[4rem]">
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div
                      onClick={() => toggleUpload(item.id)}
                      className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all ${
                        item.uploaded
                          ? "border-success/30 bg-success/5"
                          : "border-border hover:border-primary/30 hover:bg-accent-light/50"
                      }`}
                    >
                      {item.uploaded ? (
                        <div className="flex flex-col items-center gap-1.5">
                          <CheckCircle2 className="h-7 w-7 text-success" />
                          <p className="text-sm font-medium text-success">Uploaded</p>
                          <p className="text-[10px] text-muted-foreground">Click to remove</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1.5">
                          <Upload className="h-7 w-7 text-muted-foreground/40" />
                          <p className="text-sm font-medium text-foreground">Click to upload</p>
                          <p className="text-[10px] text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
