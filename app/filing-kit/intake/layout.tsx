import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filing Kit Intake | DepositReady",
  robots: { index: false },
};

export default function FilingKitIntakeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
