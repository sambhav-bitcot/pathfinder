"use client";

import { useState } from "react";

import { mockChatConversations, mockMessages } from "@/lib/mock-data";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/ui/page-header";
import ConversationSection from "./Conversation-section";
import ChatWindowSection from "./chat-window-section";
export default function StudentChat() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  const [selectedConversation, setSelectedConversation] = useState(
    chatId || mockChatConversations[0].id
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <PageHeader title="Messages" desc="Chat with your educators" />

          <div className="grid md:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <ConversationSection
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
            />

            {/* Chat Window */}
            <ChatWindowSection selectedConversation={selectedConversation} />
          </div>
        </div>
      </div>
    </div>
  );
}
