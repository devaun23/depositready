"use client";

export function PMCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 sm:hidden z-40">
      <a
        href="/pm/wizard"
        className="flex items-center justify-center bg-black text-white px-6 py-3 text-base font-medium rounded hover:bg-gray-800 transition-colors w-full min-h-[48px]"
      >
        Generate My Packet — $29
      </a>
    </div>
  );
}
