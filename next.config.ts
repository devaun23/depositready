import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/:slug(security-deposit-deadline-[a-z-]+)',
        destination: '/guides/:slug',
      },
      {
        source: '/:slug(security-deposit-law-[a-z-]+)',
        destination: '/guides/:slug',
      },
      {
        source: '/:slug(deposit-penalty-[a-z-]+)',
        destination: '/guides/:slug',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/quiz",
        destination: "/diagnose",
        permanent: false, // 302 — temporary while testing
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
