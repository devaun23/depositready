import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check My Case — DepositReady",
  description:
    "Free security deposit recovery calculator. Enter your details and see your claim calculated in real time with state-specific penalties and violations.",
};

export default function CheckMyCaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f6f8]">{children}</div>
  );
}
