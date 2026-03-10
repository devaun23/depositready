import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Small Claims Filing Kit — Court-Ready Documents | DepositReady",
  description:
    "Everything you need to file a small claims case for your security deposit. State-specific filing instructions, damage worksheets, and courtroom scripts.",
};

export default function FilingKitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
