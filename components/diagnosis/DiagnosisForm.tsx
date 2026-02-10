"use client";

import { Select } from "@/components/ui";
import { DateDropdowns } from "@/components/ui/DateDropdowns";
import { getAllStates } from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules/types";

export interface DiagnosisFormData {
  stateCode: StateCode | "";
  moveOutDate: string;
  receivedNotice: "yes" | "no" | "not_sure" | "";
  noticeSentDate: string;
  totalDeposit: string;
  amountWithheld: string;
}

interface DiagnosisFormProps {
  formData: DiagnosisFormData;
  onChange: (data: DiagnosisFormData) => void;
}

const stateOptions = getAllStates().map((state) => ({
  value: state.code,
  label: state.name,
}));

const noticeOptions: { value: "yes" | "no" | "not_sure"; label: string }[] = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
  { value: "not_sure", label: "Not sure" },
];

export function DiagnosisFormFields({ formData, onChange }: DiagnosisFormProps) {
  const update = (partial: Partial<DiagnosisFormData>) => {
    onChange({ ...formData, ...partial });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-black mb-1">
          Check Your Case
        </h2>
        <p className="text-sm text-gray-500">
          Fill in your details — results update automatically.
        </p>
      </div>

      {/* State */}
      <Select
        label="Which state was your rental in?"
        options={stateOptions}
        placeholder="Select your state"
        value={formData.stateCode}
        onChange={(e) => update({ stateCode: e.target.value as StateCode | "" })}
        required
      />

      {/* Move-out date */}
      <DateDropdowns
        label="When did you move out?"
        value={formData.moveOutDate || null}
        onChange={(date) => update({ moveOutDate: date || "" })}
        maxDate={new Date()}
        required
        id="diagnosis-moveout"
      />

      {/* Did landlord send notice? */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Did your landlord send you a notice about your deposit? <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          {noticeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update({ receivedNotice: opt.value })}
              className={`flex-1 py-2.5 px-3 rounded-lg border text-sm font-medium transition-colors min-h-[44px] ${
                formData.receivedNotice === opt.value
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notice date (conditional) */}
      {formData.receivedNotice === "yes" && (
        <div>
          <DateDropdowns
            label="When did you receive the notice?"
            value={formData.noticeSentDate || null}
            onChange={(date) => update({ noticeSentDate: date || "" })}
            maxDate={new Date()}
            id="diagnosis-notice-date"
          />
          <p className="text-xs text-gray-500 mt-1">
            This helps determine if the notice was sent on time.
          </p>
        </div>
      )}

      {/* Total deposit */}
      <div>
        <label className="block text-sm font-medium text-black mb-1.5">
          How much was your security deposit? <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="2,000"
            value={formData.totalDeposit}
            onChange={(e) => update({ totalDeposit: e.target.value })}
            className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Amount withheld */}
      <div>
        <label className="block text-sm font-medium text-black mb-1.5">
          How much did your landlord withhold?
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="Same as deposit if unsure"
            value={formData.amountWithheld}
            onChange={(e) => update({ amountWithheld: e.target.value })}
            className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
            min="0"
            step="0.01"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Leave blank if they kept the entire deposit.
        </p>
      </div>
    </div>
  );
}
