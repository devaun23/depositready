"use client";

import { useState } from "react";

interface VideoEmbedProps {
  platform: "tiktok" | "instagram" | "youtube";
  videoId: string;
}

function getEmbedUrl(platform: string, videoId: string): string {
  switch (platform) {
    case "tiktok":
      return `https://www.tiktok.com/embed/v2/${videoId}`;
    case "instagram":
      return `https://www.instagram.com/reel/${videoId}/embed`;
    case "youtube":
      return `https://www.youtube.com/embed/${videoId}`;
    default:
      return "";
  }
}

export function VideoEmbed({ platform, videoId }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const embedUrl = getEmbedUrl(platform, videoId);

  if (!embedUrl) return null;

  const isVertical = platform === "tiktok" || platform === "instagram";

  return (
    <div
      className={`relative mx-auto overflow-hidden rounded-xl bg-gray-100 ${
        isVertical ? "max-w-[325px] aspect-[9/16]" : "max-w-full aspect-video"
      }`}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
        </div>
      )}
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        onLoad={() => setLoaded(true)}
        title={`${platform} video`}
      />
    </div>
  );
}
