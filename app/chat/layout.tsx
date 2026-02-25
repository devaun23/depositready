import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat — DepositReady",
  description:
    "Talk to our AI about your security deposit. Get instant analysis of your rights, deadlines, and recovery options.",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Full-screen layout — no navbar or footer
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white">
      {children}
    </div>
  );
}
