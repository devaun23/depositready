"use client";

import { ChatProvider } from "@/components/chat/ChatContext";
import { ChatShell } from "@/components/chat/ChatShell";

export default function ChatPage() {
  return (
    <ChatProvider>
      <ChatShell />
    </ChatProvider>
  );
}
