import { mockMessages } from "@/lib/mock-data";

type Message = (typeof mockMessages)[number];

interface MessageCardProps {
  message: Message;
}

export default function MessageCard({ message }: MessageCardProps) {
  return (
    <div
      key={message.id}
      className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p
          className={`text-xs mt-1 ${
            message.isOwn
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
