import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  from: string;
  message: string;
  time: string;
};
export default function RecentMessageCard({
  message,
}: {
  message: Message;
}) {
  const router = useRouter();
  return (
    <div
      key={message.id}
      className="flex items-start justify-between p-4 border rounded-lg"
    >
      <div className="space-y-1">
        <p className="font-medium">{message.from}</p>
        <p className="text-sm text-muted-foreground">{message.message}</p>
        <p className="text-xs text-muted-foreground">{message.time}</p>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          router.push(`/student/chat/?chatId=${message.id}`);
        }}
      >
        Reply
      </Button>
    </div>
  );
}
