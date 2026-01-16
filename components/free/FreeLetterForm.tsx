"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Select } from "@/components/ui";
import { DateDropdowns } from "@/components/ui/DateDropdowns";
import { getAllStates } from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type FormStep = "email" | "details" | "landlord";

interface FormData {
  email: string;
  stateCode: StateCode | "";
  depositAmount: string;
  moveOutDate: string;
  landlordName: string;
}

export function FreeLetterForm() {
  const router = useRouter();
  const [step, setStep] = useState<FormStep>("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    stateCode: "",
    depositAmount: "",
    moveOutDate: "",
    landlordName: "",
  });

  const stateOptions = getAllStates().map((state) => ({
    value: state.code,
    label: state.name,
  }));

  // Validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle email submission (Step 1)
  const handleEmailSubmit = useCallback(async () => {
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");

    // Track email capture
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "free_email_captured", {
        event_category: "conversion",
      });
    }

    setStep("details");
  }, [formData.email]);

  // Handle details submission (Step 2)
  const handleDetailsSubmit = useCallback(() => {
    if (!formData.stateCode || !formData.depositAmount || !formData.moveOutDate) {
      setError("Please fill in all required fields");
      return;
    }

    if (parseFloat(formData.depositAmount) <= 0) {
      setError("Deposit amount must be greater than $0");
      return;
    }

    setError("");
    setStep("landlord");
  }, [formData.stateCode, formData.depositAmount, formData.moveOutDate]);

  // Handle final submission (Step 3)
  const handleFinalSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setError("");

    try {
      // Get UTM params from URL
      const urlParams = new URLSearchParams(window.location.search);

      const response = await fetch("/api/free-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          stateCode: formData.stateCode,
          depositAmount: parseFloat(formData.depositAmount),
          moveOutDate: formData.moveOutDate,
          landlordName: formData.landlordName || undefined,
          utmSource: urlParams.get("utm_source") || undefined,
          utmMedium: urlParams.get("utm_medium") || undefined,
          utmCampaign: urlParams.get("utm_campaign") || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate letter");
      }

      const data = await response.json();

      // Track letter generation
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "free_letter_generated", {
          event_category: "conversion",
          state: formData.stateCode,
          deposit_amount: parseFloat(formData.depositAmount),
          deadline_passed: data.deadlinePassed,
        });
      }

      // Store data for success page
      localStorage.setItem("freeLetterData", JSON.stringify({
        ...formData,
        ...data,
      }));

      // Navigate to success page
      router.push("/free/success");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, router]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Step 1: Email Only */}
      {step === "email" && (
        <div className="space-y-4">
          <Input
            type="email"
            label="Email address"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={error}
            required
          />
          <Button
            onClick={handleEmailSubmit}
            className="w-full"
            size="lg"
          >
            Get My Free Letter Now
          </Button>
          <p className="text-xs text-center text-gray-500">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      )}

      {/* Step 2: Details */}
      {step === "details" && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-800">
              Great! Now tell us about your situation.
            </p>
          </div>

          <Select
            label="Which state was the rental in?"
            value={formData.stateCode}
            onChange={(e) => setFormData({ ...formData, stateCode: e.target.value as StateCode })}
            options={stateOptions}
            placeholder="Select state"
            required
          />

          <Input
            type="text"
            inputMode="decimal"
            label="Security deposit amount"
            placeholder="$1,500"
            value={formData.depositAmount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, "");
              setFormData({ ...formData, depositAmount: value });
            }}
            required
          />

          <DateDropdowns
            label="When did you move out?"
            value={formData.moveOutDate || null}
            onChange={(value) => setFormData({ ...formData, moveOutDate: value || "" })}
            maxDate={new Date()}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            onClick={handleDetailsSubmit}
            className="w-full"
            size="lg"
          >
            Continue
          </Button>

          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full text-sm text-gray-500 hover:text-gray-700"
          >
            Back
          </button>
        </div>
      )}

      {/* Step 3: Landlord Name (Optional) */}
      {step === "landlord" && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800">
              Almost done! Add your landlord&apos;s name to personalize the letter.
            </p>
          </div>

          <Input
            type="text"
            label="Landlord or property manager name"
            placeholder="John Smith or ABC Property Management"
            value={formData.landlordName}
            onChange={(e) => setFormData({ ...formData, landlordName: e.target.value })}
            helperText="Optional — you can leave blank and fill in later"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            onClick={handleFinalSubmit}
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating..." : "Generate My Free Letter"}
          </Button>

          <button
            type="button"
            onClick={() => setStep("details")}
            className="w-full text-sm text-gray-500 hover:text-gray-700"
          >
            Back
          </button>
        </div>
      )}

      {/* Progress indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {["email", "details", "landlord"].map((s, i) => (
          <div
            key={s}
            className={`h-2 w-8 rounded-full transition-colors ${
              i <= ["email", "details", "landlord"].indexOf(step)
                ? "bg-black"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
