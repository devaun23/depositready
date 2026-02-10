"use client";

import { Button } from "@/components/ui";
import type { StateRules } from "@/lib/state-rules";

interface PacketManifestProps {
  visible: boolean;
  stateRules: StateRules | null;
  hasViolation: boolean;
  hasDeadlineAnalysis: boolean;
  hasAmount: boolean;
  depositAmount: number;
  potentialRecovery: number;
  onCheckout: () => void;
  isCheckoutLoading: boolean;
}

interface ChecklistItem {
  label: string;
  ready: boolean;
}

function CheckIcon({ ready }: { ready: boolean }) {
  if (ready) {
    return (
      <svg
        className="w-5 h-5 text-green-600 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    );
  }
  return (
    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
  );
}

export function PacketManifest({
  visible,
  stateRules,
  hasViolation,
  hasDeadlineAnalysis,
  hasAmount,
  depositAmount,
  potentialRecovery,
  onCheckout,
  isCheckoutLoading,
}: PacketManifestProps) {
  const items: ChecklistItem[] = [
    {
      label: `Demand letter citing ${stateRules?.statuteTitle || "state statute"}`,
      ready: !!stateRules,
    },
    {
      label: "Deadline violation analysis",
      ready: hasDeadlineAnalysis && hasViolation,
    },
    {
      label: "Statutory language & legal citations",
      ready: !!stateRules,
    },
    {
      label: "Evidence documentation checklist",
      ready: true,
    },
    {
      label: `Small claims court guide for ${stateRules?.name || "your state"}`,
      ready: !!stateRules,
    },
    {
      label: "Recovery calculation",
      ready: hasAmount,
    },
  ];

  const readyCount = items.filter((i) => i.ready).length;
  const roiMultiple =
    depositAmount > 0 ? Math.round(potentialRecovery / 79) : 0;

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Your Recovery Packet
          </h3>
          <span className="text-sm text-gray-500">
            {readyCount}/{items.length} ready
          </span>
        </div>

        <ul className="space-y-3 mb-6">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <CheckIcon ready={item.ready} />
              <span
                className={`text-sm ${
                  item.ready ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
              {item.ready && (
                <span className="ml-auto text-xs text-green-600 font-medium">
                  Ready
                </span>
              )}
            </li>
          ))}
        </ul>

        <Button
          onClick={onCheckout}
          size="lg"
          fullWidth
          loading={isCheckoutLoading}
          disabled={isCheckoutLoading}
        >
          {isCheckoutLoading
            ? "Redirecting to checkout..."
            : "Unlock Your Recovery Packet — $79"}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-3">
          Secure checkout &middot; 7-day money-back guarantee
        </p>

        {roiMultiple > 1 && (
          <p className="text-xs text-green-700 text-center mt-2 font-medium">
            {roiMultiple}:1 return on your ${depositAmount.toLocaleString()}{" "}
            deposit
          </p>
        )}
      </div>
    </div>
  );
}
