import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Landlord Ignored Your Demand Letter? Here's What to Do Next | DepositReady",
  description:
    "If your security deposit demand letter was ignored, you have legal options. Check your state's deadline, calculate penalties, and build your court-ready case file.",
  keywords: [
    "landlord ignored demand letter",
    "landlord won't return deposit",
    "security deposit next steps",
    "small claims court security deposit",
    "demand letter didn't work",
    "landlord ignored letter",
    "security deposit court",
  ],
  openGraph: {
    title: "Your Letter Didn't Work. Your Case Isn't Over.",
    description:
      "Most landlords ignore the first letter. That's actually good news — it means they've likely missed a legal deadline. Check your case now.",
    url: "https://depositready.co/next-steps",
    siteName: "DepositReady",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Letter Didn't Work. Your Case Isn't Over.",
    description:
      "Most landlords ignore the first letter. That's actually good news — it means they've likely missed a legal deadline.",
  },
};

export default function NextStepsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
