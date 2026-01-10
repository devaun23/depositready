import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { ExitIntentPopup } from "@/components/common/ExitIntentPopup";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
    "FL Statute 83.49",
    "small claims court",
    "tenant dispute",
  ],
  metadataBase: new URL("https://depositready.co"),
  openGraph: {
    title: "DepositReady - Get Your Security Deposit Back",
    description:
      "Generate a complete Florida security deposit dispute packet in 10 minutes. Customized demand letters, legal timelines, and small claims guidance.",
    url: "https://depositready.co",
    siteName: "DepositReady",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DepositReady - Florida Security Deposit Recovery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DepositReady - Get Your Security Deposit Back",
    description:
      "Generate a complete Florida security deposit dispute packet in 10 minutes. $39 one-time purchase.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <ExitIntentPopup />
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17859927660"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17859927660', {
              'allow_google_signals': true,
              'allow_ad_personalization_signals': true
            });
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uyvwb6yez0");
          `}
        </Script>
      </body>
    </html>
  );
}
