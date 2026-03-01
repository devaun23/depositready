import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Deposit Digest | DepositReady",
  description:
    "Practical guides on security deposit law, landlord disputes, and tenant rights — written in plain English.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
