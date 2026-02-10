"use client";

import type { TimelineEvent } from "@/lib/state-rules/types";

interface TimelineVisualProps {
  events: TimelineEvent[];
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function TimelineVisual({ events }: TimelineVisualProps) {
  if (events.length < 2) return null;

  const sorted = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  const totalSpan = sorted[sorted.length - 1].date.getTime() - sorted[0].date.getTime();

  return (
    <div className="py-4">
      <div className="relative">
        {/* Base line */}
        <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200 rounded" />

        {/* Colored segments between events */}
        {sorted.map((event, i) => {
          if (i === 0) return null;
          const prev = sorted[i - 1];
          const leftPct = totalSpan > 0
            ? ((prev.date.getTime() - sorted[0].date.getTime()) / totalSpan) * 100
            : 0;
          const widthPct = totalSpan > 0
            ? ((event.date.getTime() - prev.date.getTime()) / totalSpan) * 100
            : 100 / (sorted.length - 1);

          const isViolation = event.type === "violation" || prev.type === "violation";

          return (
            <div
              key={`seg-${i}`}
              className={`absolute top-3 h-1 rounded ${isViolation ? "bg-red-400" : "bg-green-400"}`}
              style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
            />
          );
        })}

        {/* Event nodes */}
        <div className="relative flex justify-between">
          {sorted.map((event, i) => (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{
                position: sorted.length > 2 ? "absolute" : "relative",
                left: sorted.length > 2 && totalSpan > 0
                  ? `${((event.date.getTime() - sorted[0].date.getTime()) / totalSpan) * 100}%`
                  : undefined,
                transform: sorted.length > 2 ? "translateX(-50%)" : undefined,
              }}
            >
              <div
                className={`w-3 h-3 rounded-full border-2 z-10 ${
                  event.type === "violation"
                    ? "bg-red-500 border-red-600"
                    : event.type === "compliant"
                    ? "bg-green-500 border-green-600"
                    : "bg-white border-gray-400"
                }`}
              />
              <span className="text-[10px] text-gray-500 mt-1.5 whitespace-nowrap">
                {event.label}
              </span>
              <span className="text-[10px] text-gray-400 whitespace-nowrap">
                {formatShortDate(event.date)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
