"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseVoiceToTextOptions {
  /** Called with transcript text (interim or final) */
  onTranscript: (text: string, isFinal: boolean) => void;
}

interface UseVoiceToTextReturn {
  isListening: boolean;
  isSupported: boolean;
  toggle: () => void;
}

/**
 * Custom hook wrapping the Web Speech API for voice-to-text input.
 * continuous + interimResults for real-time feedback while speaking.
 * Hidden on browsers without SpeechRecognition (Firefox desktop).
 */
export function useVoiceToText({
  onTranscript,
}: UseVoiceToTextOptions): UseVoiceToTextReturn {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  onTranscriptRef.current = onTranscript;

  // Check support on mount
  useEffect(() => {
    const supported = !!(
      window.SpeechRecognition || window.webkitSpeechRecognition
    );
    setIsSupported(supported);
  }, []);

  const toggle = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsListening(false);
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      const isFinal = event.results[event.results.length - 1].isFinal;
      onTranscriptRef.current(transcript, isFinal);
    };

    recognition.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, []);

  return { isListening, isSupported, toggle };
}
