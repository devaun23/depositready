"use client";

interface DocumentPreviewProps {
  product: "demand_letter" | "legal_packet" | "case_review";
  stateName: string | null;
  statute: string | null;
}

export function DocumentPreview({ product, stateName, statute }: DocumentPreviewProps) {
  if (product === "case_review") {
    return <MemoPreview stateName={stateName} />;
  }
  if (product === "legal_packet") {
    return <PacketPreview stateName={stateName} statute={statute} />;
  }
  return <LetterPreview stateName={stateName} statute={statute} />;
}

/** Demand letter format — looks like a formal legal letter */
function LetterPreview({ stateName, statute }: { stateName: string | null; statute: string | null }) {
  return (
    <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Paper-style content */}
      <div className="px-4 py-3 space-y-2 text-[11px] leading-relaxed text-gray-700 font-serif">
        <p className="font-semibold text-[10px] text-gray-900 uppercase tracking-wide">
          RE: Demand for Return of Security Deposit
        </p>
        <p className="text-gray-500 text-[10px]">
          Property: <span className="text-gray-400">[your address]</span>
        </p>
        {statute && (
          <p>
            Pursuant to <span className="font-semibold text-gray-900">{statute}</span>,
            you were required to return the security deposit
            {stateName ? ` under ${stateName} law` : ""}...
          </p>
        )}
        {!statute && (
          <p>
            Pursuant to applicable state law, you were required to return
            the security deposit within the statutory deadline...
          </p>
        )}

        {/* Redacted lines */}
        <div className="space-y-1.5 pt-1">
          <div className="h-2 rounded-full bg-gray-200" style={{ width: "92%" }} />
          <div className="h-2 rounded-full bg-gray-200" style={{ width: "78%" }} />
          <div className="h-2 rounded-full bg-gray-200" style={{ width: "88%" }} />
          <div className="h-2 rounded-full bg-gray-200" style={{ width: "65%" }} />
          <div className="h-2 rounded-full bg-gray-200" style={{ width: "82%" }} />
        </div>
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 pb-3 px-4">
        <p className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-medium">
          <LockIcon />
          Full document unlocked after purchase
        </p>
      </div>
    </div>
  );
}

/** Legal packet — table of contents style */
function PacketPreview({ stateName, statute }: { stateName: string | null; statute: string | null }) {
  return (
    <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 space-y-2 text-[11px] leading-relaxed text-gray-700">
        <p className="font-semibold text-[10px] text-gray-900 uppercase tracking-wide font-serif">
          {stateName ? `${stateName} ` : ""}Legal Recovery Packet
        </p>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">1.</span>
            <span>Personalized Demand Letter{statute ? ` (${statute})` : ""}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">2.</span>
            <span>Evidence Documentation Checklist</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">3.</span>
            <span>Small Claims Filing Guide</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="font-bold">4.</span>
            <span>Landlord Response Templates</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="font-bold">5.</span>
            <span>Court Hearing Preparation</span>
          </div>
        </div>

        {/* Redacted lines */}
        <div className="space-y-1.5 pt-1">
          <div className="h-2 rounded-full bg-gray-200" style={{ width: "70%" }} />
          <div className="h-2 rounded-full bg-gray-200" style={{ width: "55%" }} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 pb-3 px-4">
        <p className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-medium">
          <LockIcon />
          Full packet unlocked after purchase
        </p>
      </div>
    </div>
  );
}

/** Case review — memo format */
function MemoPreview({ stateName }: { stateName: string | null }) {
  return (
    <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 space-y-2 text-[11px] leading-relaxed text-gray-700 font-serif">
        <p className="font-semibold text-[10px] text-gray-900 uppercase tracking-wide">
          Case Review Memorandum
        </p>
        <div className="text-[10px] text-gray-500 space-y-0.5">
          <p>To: <span className="text-gray-400">[you]</span></p>
          <p>Re: Security Deposit Recovery{stateName ? ` — ${stateName}` : ""}</p>
        </div>
        <p className="text-[10px]">
          Based on our review of your case details, we have identified
          several key factors that strengthen your position...
        </p>

        {/* Redacted lines */}
        <div className="space-y-1.5 pt-1">
          <div className="h-2 rounded-full bg-gray-200" style={{ width: "85%" }} />
          <div className="h-2 rounded-full bg-gray-200" style={{ width: "72%" }} />
          <div className="h-2 rounded-full bg-gray-200" style={{ width: "90%" }} />
          <div className="h-2 rounded-full bg-gray-200" style={{ width: "60%" }} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 pb-3 px-4">
        <p className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-medium">
          <LockIcon />
          Full review unlocked after purchase
        </p>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}
