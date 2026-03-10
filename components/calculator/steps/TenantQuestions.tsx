"use client";

type DepositReturnStatus = "nothing" | "partial" | "full";

interface TenantQuestionsProps {
  depositReturned: DepositReturnStatus | null;
  onSelect: (status: DepositReturnStatus) => void;
}

export function TenantQuestions({ depositReturned, onSelect }: TenantQuestionsProps) {
  const options: { value: DepositReturnStatus; label: string; desc: string }[] = [
    { value: "nothing", label: "Nothing returned", desc: "No deposit or notice received" },
    { value: "partial", label: "Partial return", desc: "Some returned with deductions" },
    { value: "full", label: "Full return", desc: "Deposit fully returned" },
  ];

  return (
    <section>
      <p className="block text-sm font-medium text-gray-700 mb-3">
        Has your landlord returned any of your deposit?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`px-4 py-3 min-h-[44px] rounded-lg border text-left transition-colors ${
              depositReturned === opt.value
                ? "bg-brand text-white border-brand"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            <span className="font-medium text-sm block">{opt.label}</span>
            <span className={`text-xs ${depositReturned === opt.value ? "text-white/80" : "text-gray-500"}`}>
              {opt.desc}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
