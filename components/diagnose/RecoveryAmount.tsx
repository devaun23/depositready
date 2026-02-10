"use client";

import { useEffect, useRef, useState } from "react";

interface RecoveryAmountProps {
  depositAmount: number;
  multiplier: number;
  damagesDescription: string;
  maxRecoverable: number;
  stateName: string;
  visible: boolean;
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active || target <= 0) {
      setValue(0);
      return;
    }

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, active]);

  return value;
}

export function RecoveryAmount({
  depositAmount,
  multiplier,
  damagesDescription,
  maxRecoverable,
  stateName,
  visible,
}: RecoveryAmountProps) {
  const displayValue = useCountUp(maxRecoverable, 600, visible);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-8 text-center">
        <p className="text-sm text-green-700 mb-2">
          Under {stateName} law, you could recover up to
        </p>
        <div className="text-6xl font-bold text-green-800">
          ${displayValue.toLocaleString()}
        </div>
        {multiplier > 1 && (
          <p className="text-sm text-green-700 mt-2">
            ${depositAmount.toLocaleString()} deposit &times; {multiplier}x{" "}
            {damagesDescription}
          </p>
        )}
      </div>
    </div>
  );
}
