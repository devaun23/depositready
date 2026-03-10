import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance Kit Intake | DepositReady",
  robots: { index: false },
};

export default function ComplianceIntakeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
