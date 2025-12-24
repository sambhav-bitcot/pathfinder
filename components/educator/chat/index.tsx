"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/page-header";

import ConversationSection from "./Conversation-section";
import ChatWindowSection from "./chat-window-section";

export default function EducatorChat() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <PageHeader title={"Messages"} desc={" Chat with your students"} />

          <div className="grid md:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <ConversationSection
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
            />

            {/* Chat Window */}
            <ChatWindowSection
              selectedConversation={selectedConversation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
