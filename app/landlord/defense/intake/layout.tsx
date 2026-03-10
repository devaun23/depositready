import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Defense Kit Intake | DepositReady",
  robots: { index: false },
};

export default function DefenseIntakeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
