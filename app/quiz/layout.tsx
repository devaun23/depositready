import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Deposit Deadline Quiz | Is Your Landlord Breaking the Law?",
  description:
    "Find out if your landlord missed the legal deadline to return your security deposit. Free 4-question quiz shows your state's law, deadline status, and potential recovery amount.",
  keywords: [
    "security deposit deadline",
    "landlord violation",
    "deposit return deadline",
    "tenant rights quiz",
    "security deposit calculator",
    "landlord breaking law",
  ],
  openGraph: {
    title: "Is Your Landlord Already Breaking the Law?",
    description:
      "Your state has strict deadlines. If they missed one, you could recover 2-3x your deposit. Take the free quiz.",
    url: "https://depositready.co/quiz",
    siteName: "DepositReady",
    images: [
      {
        url: "/og-quiz.png",
        width: 1200,
        height: 630,
        alt: "Security Deposit Deadline Quiz",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Is Your Landlord Already Breaking the Law?",
    description:
      "Your state has strict deadlines. If they missed one, you could recover 2-3x your deposit.",
    images: ["/og-quiz.png"],
  },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
