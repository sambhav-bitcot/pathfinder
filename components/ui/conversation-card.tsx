import { mockChatConversations } from "@/lib/mock-data";
import { Badge } from "./badge";

type Conversation = (typeof mockChatConversations)[number];
interface ConversationCardProps {
  conversation: Conversation;
  selectedConversation: string | null;
  setSelectedConversation: (id: string) => void;
}

export default function ConversationCard({
  conversation,
  selectedConversation,
  setSelectedConversation,
}: ConversationCardProps) {
  return (
    <button
      key={conversation.id}
      onClick={() => setSelectedConversation(conversation.id)}
      className={`w-full p-4 text-left hover:bg-muted transition-colors ${
        selectedConversation === conversation.id ? "bg-muted" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <img
          src={conversation.avatar || "/placeholder.svg"}
          alt={conversation.participantName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium truncate">
              {conversation.participantName}
            </p>
            {conversation.unread > 0 && (
              <Badge variant="default" className="ml-2">
                {conversation.unread}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {conversation.lastMessage}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {conversation.lastMessageTime}
          </p>
        </div>
      </div>
    </button>
  );
}
