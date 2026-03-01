"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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
  const [done, setDone] = useState(false);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active || target <= 0) {
      setValue(0);
      setDone(false);
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
      } else {
        setDone(true);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, active]);

  return { value, done };
}

const CONFETTI_COLORS = [
  "#6366f1", // indigo
  "#818cf8", // indigo light
  "#a78bfa", // violet
  "#fbbf24", // amber
  "#f59e0b", // yellow
  "#3b82f6", // blue
];

function ConfettiBurst() {
  const pieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${Math.random() * 40}%`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: `${Math.random() * 0.3}s`,
    size: 6 + Math.random() * 6,
  }));

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}

export function RecoveryAmount({
  depositAmount,
  multiplier,
  damagesDescription,
  maxRecoverable,
  stateName,
  visible,
}: RecoveryAmountProps) {
  const { value: displayValue, done: countUpDone } = useCountUp(
    maxRecoverable,
    600,
    visible
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const hasTriggeredRef = useRef(false);

  const triggerCelebration = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    setShowConfetti(true);

    // Haptic feedback on mobile
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([100]);
    }

    // Clean up confetti after animation
    setTimeout(() => setShowConfetti(false), 1500);
  }, []);

  useEffect(() => {
    if (countUpDone && visible) {
      triggerCelebration();
    }
  }, [countUpDone, visible, triggerCelebration]);

  // Reset when visibility changes
  useEffect(() => {
    if (!visible) {
      hasTriggeredRef.current = false;
      setShowConfetti(false);
    }
  }, [visible]);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="relative bg-accent-light border-2 border-accent/30 rounded-2xl p-8 text-center">
        {showConfetti && <ConfettiBurst />}
        <p className="text-sm text-accent mb-2">
          Under {stateName} law, you could recover up to
        </p>
        <div className="text-6xl font-bold text-accent">
          ${displayValue.toLocaleString()}
        </div>
        {multiplier > 1 && (
          <p className="text-sm text-accent mt-2">
            ${depositAmount.toLocaleString()} deposit &times; {multiplier}x{" "}
            {damagesDescription}
          </p>
        )}
      </div>
    </div>
  );
}
