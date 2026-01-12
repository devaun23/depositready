import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
// Removed: import { Analytics } from "@vercel/analytics/react"; - reduces JS bundle
import Script from "next/script";
import { LazyExitIntentPopup } from "@/components/common/LazyExitIntentPopup";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600"], // Only semibold used for headings
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
      "Generate a complete Florida security deposit dispute packet in 10 minutes. $79 one-time purchase.",
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
      <head>
        {/* Preconnect to third-party origins for faster resource loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <LazyExitIntentPopup />
        {/* Delay analytics by 5s to reduce TBT - most real users stay longer */}
        <Script id="delayed-analytics" strategy="lazyOnload">
          {`
            setTimeout(function() {
              // Load Google Tag Manager
              var gtagScript = document.createElement('script');
              gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-BWS7EBG6HG';
              gtagScript.async = true;
              document.head.appendChild(gtagScript);

              // Initialize gtag
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'G-BWS7EBG6HG');
              gtag('config', 'AW-17859927660', {
                'allow_google_signals': true,
                'allow_ad_personalization_signals': true
              });

              // Load Microsoft Clarity
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "uyvwb6yez0");
            }, 5000);
          `}
        </Script>
      </body>
    </html>
  );
}
