import type { Metadata } from "next";
import { CalculatorLoader } from "@/components/calculator/CalculatorLoader";

export const metadata: Metadata = {
  title: "Security Deposit Calculator — Free Legal Analysis | DepositReady",
  description:
    "Free security deposit calculator. Tenants: check if your landlord violated the law and estimate your recovery. Landlords: audit your compliance and understand your liability exposure.",
  openGraph: {
    title: "Security Deposit Calculator — Free Legal Analysis",
    description:
      "Check your security deposit situation in 2 minutes. Free analysis for tenants and landlords.",
    type: "website",
  },
};

export default function CalculatorPage() {
  return <CalculatorLoader />;
}
