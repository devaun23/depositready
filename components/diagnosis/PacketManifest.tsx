"use client";

const PACKET_ITEMS = [
  { label: "Deadline Violation Analysis", status: "ready" },
  { label: "Demand Letter", status: "ready" },
  { label: "Deduction Dispute", status: "ready" },
  { label: "Certified Mail Guide", status: "ready" },
  { label: "Next Steps Escalation", status: "ready" },
] as const;

export function PacketManifest() {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        Your Dispute Packet
      </p>
      <ul className="space-y-2">
        {PACKET_ITEMS.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-sm text-gray-700">
            <svg
              className="w-4 h-4 text-green-600 flex-shrink-0"
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
            <span>{item.label}</span>
            <span className="ml-auto text-xs text-green-600 font-medium">
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
