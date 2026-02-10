"use client";

interface LetterPreviewOverlayProps {
  children: React.ReactNode;
  onUnlock?: () => void;
}

export function LetterPreviewOverlay({
  children,
  onUnlock,
}: LetterPreviewOverlayProps) {
  return (
    <div className="relative">
      {/* Letter content */}
      <div className="relative overflow-hidden">
        {children}

        {/* Diagonal watermark text */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -rotate-45 text-gray-300/30 font-bold text-6xl md:text-8xl whitespace-nowrap select-none tracking-widest uppercase">
            PREVIEW
          </div>
          <div className="absolute -rotate-45 translate-x-48 translate-y-32 text-gray-300/20 font-bold text-4xl md:text-6xl whitespace-nowrap select-none tracking-widest uppercase">
            PREVIEW
          </div>
          <div className="absolute -rotate-45 -translate-x-48 -translate-y-32 text-gray-300/20 font-bold text-4xl md:text-6xl whitespace-nowrap select-none tracking-widest uppercase">
            PREVIEW
          </div>
        </div>

        {/* Bottom blur gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.95) 100%)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 30%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 30%)",
          }}
        />
      </div>

      {/* Unlock CTA at blur boundary */}
      {onUnlock && (
        <div className="relative -mt-20 z-10 text-center pb-4">
          <button
            onClick={onUnlock}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Unlock Full Letter — $29
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Download the complete, court-ready PDF
          </p>
        </div>
      )}
    </div>
  );
}
