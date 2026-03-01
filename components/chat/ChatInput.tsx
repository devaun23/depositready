"use client";

import { useRef, useState, useCallback } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleInput = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, []);

  return (
    <div className="bg-white px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-1px_3px_rgba(0,0,0,0.04)]">
      <div className="relative mx-auto max-w-3xl">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Tell me what happened with your deposit..."
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-12 text-[15px] leading-relaxed text-gray-900 shadow-sm placeholder:text-gray-400 transition-shadow focus:shadow-md focus:border-gray-300 focus:outline-none disabled:opacity-50"
          style={{ minHeight: "44px", maxHeight: "120px" }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
          className="absolute right-2 bottom-2 flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
