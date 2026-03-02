"use client";

import { useRef, useState, useCallback } from "react";
import type { FileUIPart } from "ai";
import { useFileAttachments } from "@/lib/chat/useFileAttachments";
import { useVoiceToText } from "@/lib/chat/useVoiceToText";

interface ChatInputProps {
  onSend: (message: string, files?: FileUIPart[]) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    attachments,
    error: fileError,
    addFiles,
    removeAttachment,
    clearAttachments,
    toFileUIParts,
  } = useFileAttachments();

  // Voice transcript replaces textarea content while speaking
  const interimRef = useRef("");
  const baseTextRef = useRef("");

  const { isListening, isSupported, toggle: toggleVoice } = useVoiceToText({
    onTranscript: (text, isFinal) => {
      if (isFinal) {
        // Commit final transcript and reset
        const committed = baseTextRef.current + text + " ";
        setValue(committed);
        baseTextRef.current = committed;
        interimRef.current = "";
      } else {
        // Show interim text after the committed base
        interimRef.current = text;
        setValue(baseTextRef.current + text);
      }
      autoResize();
    },
  });

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, []);

  const canSend = (value.trim() || attachments.length > 0) && !disabled;

  const handleSend = useCallback(() => {
    if (!canSend) return;
    // Stop voice if active
    if (isListening) toggleVoice();
    baseTextRef.current = "";
    interimRef.current = "";

    const files = attachments.length > 0 ? toFileUIParts() : undefined;
    onSend(value.trim(), files);
    setValue("");
    clearAttachments();

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [canSend, value, attachments.length, toFileUIParts, onSend, clearAttachments, isListening, toggleVoice]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      // Update base text when user manually types (not during voice)
      if (!isListening) {
        baseTextRef.current = e.target.value;
      }
      autoResize();
    },
    [isListening, autoResize]
  );

  const handleToggleVoice = useCallback(() => {
    if (!isListening) {
      // Starting: capture current text as base
      baseTextRef.current = value;
      interimRef.current = "";
    }
    toggleVoice();
  }, [isListening, value, toggleVoice]);

  return (
    <div className="bg-white px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-1px_3px_rgba(0,0,0,0.04)]">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-gray-200 bg-gray-50/50 shadow-sm transition-shadow focus-within:shadow-md focus-within:border-gray-300">
          {/* ── Label ──────────────────────────────────────────── */}
          <span className="block px-4 pt-2.5 pb-0 text-[11px] font-medium tracking-wide uppercase text-gray-300 select-none">
            Chat with Insight
          </span>

          {/* ── Preview strip ─────────────────────────────────── */}
          {attachments.length > 0 && (
            <div className="flex gap-2 overflow-x-auto px-3 pt-3 pb-1">
              {attachments.map((a) => (
                <div key={a.id} className="relative shrink-0 group">
                  {a.mediaType.startsWith("image/") ? (
                    <img
                      src={a.previewUrl}
                      alt={a.filename}
                      className="h-14 w-14 rounded-lg object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-1">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="mt-0.5 max-w-[48px] truncate text-[9px] text-gray-500">
                        {a.filename}
                      </span>
                    </div>
                  )}
                  {/* Remove button */}
                  <button
                    onClick={() => removeAttachment(a.id)}
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-700 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-900"
                    aria-label={`Remove ${a.filename}`}
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── Error message ─────────────────────────────────── */}
          {fileError && (
            <div className="px-3 pt-2 text-xs text-red-500">{fileError}</div>
          )}

          {/* ── Textarea ──────────────────────────────────────── */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Tell me what happened with your deposit..."
            disabled={disabled}
            rows={2}
            className="w-full resize-none border-none bg-transparent px-4 pt-3 pb-2 text-[15px] leading-relaxed text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
            style={{ minHeight: "80px", maxHeight: "200px" }}
          />

          {/* ── Toolbar ───────────────────────────────────────── */}
          <div className="flex items-center justify-between border-t border-gray-200/60 px-2 py-1.5">
            {/* Left: attachment + voice buttons */}
            <div className="flex items-center gap-0.5">
              {/* Image / Photo button */}
              <button
                onClick={() => imageInputRef.current?.click()}
                disabled={disabled}
                title="Add photo"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-accent/5 hover:text-accent disabled:opacity-40"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zM10.5 6.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) addFiles(e.target.files);
                  e.target.value = "";
                }}
              />

              {/* File / Attach button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                title="Attach file"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-accent/5 hover:text-accent disabled:opacity-40"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) addFiles(e.target.files);
                  e.target.value = "";
                }}
              />

              {/* Microphone button */}
              {isSupported && (
                <button
                  onClick={handleToggleVoice}
                  disabled={disabled}
                  title={isListening ? "Stop recording" : "Voice input"}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    isListening
                      ? "bg-accent/10 text-accent animate-mic-pulse"
                      : "text-gray-400 hover:bg-accent/5 hover:text-accent"
                  } disabled:opacity-40`}
                  style={{ minHeight: "44px", minWidth: "44px" }}
                >
                  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Right: send button */}
            <button
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
              style={{ minHeight: "44px", minWidth: "44px" }}
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
      </div>
    </div>
  );
}
