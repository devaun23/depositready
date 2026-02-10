import type { Metadata } from "next";
import { DiagnosisForm } from "@/components/diagnose/DiagnosisForm";

export const metadata: Metadata = {
  title: "Free Security Deposit Analysis | DepositReady",
  description:
    "Find out if your landlord violated security deposit law. Get a free deadline analysis and see how much you could recover — in under 60 seconds.",
};

export default function DiagnosePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DiagnosisForm />
    </div>
  );
}
