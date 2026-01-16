"use client";

import { useQuiz } from "../QuizContext";
import { useEffect, useRef } from "react";

export function AmountStep() {
  const { data, updateData } = useQuiz();
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");
    const amount = parseFloat(numericValue) || null;
    updateData("depositAmount", amount);
  };

  return (
    <div className="max-w-sm mx-auto w-full">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-2xl">
          $
        </span>
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          placeholder="2,000"
          value={data.depositAmount?.toLocaleString() || ""}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-4 text-2xl border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 text-center"
        />
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Enter the total amount you paid as a security deposit
      </p>
    </div>
  );
}
