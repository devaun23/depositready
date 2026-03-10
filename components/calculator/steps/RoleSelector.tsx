"use client";

type Role = "tenant" | "landlord";

interface RoleSelectorProps {
  role: Role | null;
  onSelect: (role: Role) => void;
}

export function RoleSelector({ role, onSelect }: RoleSelectorProps) {
  return (
    <section>
      <p className="block text-sm font-medium text-gray-700 mb-3">
        I am a...
      </p>
      <div className="grid grid-cols-2 gap-4">
        {([
          {
            value: "tenant" as const,
            label: "Tenant",
            desc: "I want to recover my deposit",
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            ),
          },
          {
            value: "landlord" as const,
            label: "Landlord",
            desc: "I want to check my compliance",
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            ),
          },
        ]).map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`flex flex-col items-center gap-2 p-6 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5 ${
              role === opt.value
                ? "border-brand bg-brand-bg shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-card-hover"
            }`}
          >
            <div className={role === opt.value ? "text-brand" : "text-gray-400"}>
              {opt.icon}
            </div>
            <span className="font-semibold text-gray-900">{opt.label}</span>
            <span className="text-xs text-gray-500">{opt.desc}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
