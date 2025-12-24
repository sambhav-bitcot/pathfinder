import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ConversationCard from "@/components/ui/conversation-card";
import { mockEducatorChatConversations } from "@/lib/mock-data";
import { useState } from "react";
interface ConversationSectionProps {
  selectedConversation: string | null;
  setSelectedConversation: (id: string) => void;
}

export default function ConversationSection({
  selectedConversation,
  setSelectedConversation,
}: ConversationSectionProps) {
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Conversations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-0">
        {mockEducatorChatConversations.map((conv,idx) => (
          //    user coversation card
          <ConversationCard
            conversation={conv}
            setSelectedConversation={setSelectedConversation}
            selectedConversation={selectedConversation}
            key={idx}
          />
        ))}
      </CardContent>
    </Card>
  );
}
