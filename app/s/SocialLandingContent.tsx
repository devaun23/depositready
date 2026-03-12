"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { VideoEmbed } from "@/components/landing/VideoEmbed";

export function SocialLandingContent() {
  const searchParams = useSearchParams();

  // Optional video embed via ?v= and ?p= (platform) params
  const videoId = searchParams.get("v");
  const platform = (searchParams.get("p") || "tiktok") as "tiktok" | "instagram" | "youtube";

  // Pass through UTM params to quiz
  const utmSource = searchParams.get("utm_source") || "social";
  const ref = searchParams.get("ref");
  const quizParams = new URLSearchParams({ utm_source: utmSource });
  if (ref) quizParams.set("ref", ref);

  return (
    <div className="w-full max-w-sm mx-auto space-y-8 text-center">
      {/* Optional video */}
      {videoId && (
        <div className="mb-4">
          <VideoEmbed platform={platform} videoId={videoId} />
        </div>
      )}

      {/* Headline */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          Your landlord owes you money.
        </h1>
        <p className="text-gray-500 text-base">
          Free check. 30 seconds. No payment needed.
        </p>
      </div>

      {/* Single CTA */}
      <Link
        href="/chat"
        className="block w-full py-4 px-6 bg-accent text-white text-lg font-bold rounded-xl hover:bg-accent-hover transition-colors shadow-lg shadow-accent/25"
      >
        See How Much &rarr;
      </Link>

      {/* Micro-testimonial */}
      <div className="pt-2">
        <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
          <div className="flex -space-x-1">
            <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand">
              M
            </div>
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent">
              S
            </div>
          </div>
          <p className="text-sm text-gray-600">
            &ldquo;Got <span className="font-semibold text-gray-900">$2,300</span> back in 10 days&rdquo;
          </p>
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
        <span>16 states covered</span>
        <span>&bull;</span>
        <span>No login required</span>
        <span>&bull;</span>
        <span>100% free check</span>
      </div>
    </div>
  );
}
