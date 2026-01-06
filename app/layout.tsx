import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DepositReady - Get Your Security Deposit Back",
  description:
    "Generate a complete Florida security deposit dispute packet in 10 minutes. Customized demand letters, legal timelines, and small claims guidance.",
  keywords: [
    "security deposit",
    "Florida",
    "tenant rights",
    "demand letter",
    "landlord dispute",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
