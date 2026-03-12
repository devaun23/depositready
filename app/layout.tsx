import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
// Removed: import { Analytics } from "@vercel/analytics/react"; - reduces JS bundle
import Script from "next/script";
import { AttributionCapture } from "@/components/tracking/AttributionCapture";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
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
      <body className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <AttributionCapture />
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

              // Load TikTok Pixel
              var ttPixelId = '${process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || ""}';
              if (ttPixelId) {
                !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
                ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
                ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
                var a=d.createElement("script");a.type="text/javascript";a.async=true;a.src=r+"?sdkid="+e+"&lib="+t;
                var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(a,s)};
                ttq.load(ttPixelId);ttq.page();
                }(window,document,"ttq");
              }

              // Load Meta Pixel
              var fbPixelId = '${process.env.NEXT_PUBLIC_META_PIXEL_ID || ""}';
              if (fbPixelId) {
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init',fbPixelId);fbq('track','PageView');
              }
            }, 5000);
          `}
        </Script>
      </body>
    </html>
  );
}
