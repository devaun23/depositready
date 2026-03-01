"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatProvider } from "@/components/chat/ChatContext";
import { ChatShell } from "@/components/chat/ChatShell";

function ChatPageInner() {
  const searchParams = useSearchParams();
  const initialMessage =
    searchParams.get("message") || searchParams.get("intent") || undefined;

  return (
    <ChatProvider>
      <ChatShell initialMessage={initialMessage} />
    </ChatProvider>
  );
}

export default function ChatPage() {
  return (
    <Suspense>
      <ChatPageInner />
    </Suspense>
  );
}
