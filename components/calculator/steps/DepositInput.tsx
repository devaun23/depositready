"use client";

interface DepositInputProps {
  value: string;
  onChange: (value: string) => void;
  smallClaimsLimit?: number;
}

export function DepositInput({ value, onChange, smallClaimsLimit }: DepositInputProps) {
  return (
    <section>
      <label htmlFor="calc-deposit" className="block text-sm font-medium text-gray-700 mb-2">
        How much was the security deposit?
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base">$</span>
        <input
          id="calc-deposit"
          type="text"
          inputMode="decimal"
          placeholder="1,400"
          value={value}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9.,]/g, "");
            onChange(raw);
          }}
          className="w-full pl-7 pr-3 py-3 min-h-[44px] border border-gray-300 rounded-lg bg-white text-base focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
        />
      </div>
      {smallClaimsLimit && (
        <p className="text-xs text-gray-500 mt-1">
          Small claims limit: ${smallClaimsLimit.toLocaleString()}
        </p>
      )}
    </section>
  );
}
