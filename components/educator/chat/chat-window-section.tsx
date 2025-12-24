import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MessageCard from "@/components/ui/message-card";
import {
  mockEducatorChatConversations,
  mockEducatorMessages,
} from "@/lib/mock-data";
import { MessageCircle, Send } from "lucide-react";
import ChooseChat from "@/components/ui/choose-chat";
import { useState } from "react";
interface ChatWindowProps {
  selectedConversation: string | null;
}

export default function ChatWindowSection({
  selectedConversation,
}: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState("");

  const currentMessages = mockEducatorMessages.filter(
    (m) => m.conversationId === selectedConversation
  );

  const currentConversation = mockEducatorChatConversations.find(
    (c) => c.id === selectedConversation
  );

  return (
    <Card className="md:col-span-2 flex flex-col">
      {selectedConversation ? (
        <>
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <img
                src={currentConversation?.avatar || "/placeholder.svg"}
                alt={currentConversation?.participantName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <CardTitle>{currentConversation?.participantName}</CardTitle>
                <p className="text-sm text-muted-foreground capitalize">
                  {currentConversation?.participantRole}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((message,idx) => (
              // message card
              <MessageCard message={message} key={idx} />
            ))}
          </CardContent>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setMessageInput("");
                  }
                }}
              />
              <Button size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <ChooseChat />
      )}
    </Card>
  );
}
