import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { mockChatConversations, mockSessions } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RecentMessageCard from "./recent-message-card";
import { useRouter } from "next/navigation";

export default function RecentMessageSection () {
    const router = useRouter();
  const { user } = useAuth();

  const recentMessages = mockChatConversations.slice(0, 3).map((conv) => ({
    id: conv.id,
    from: conv.participantName,
    message: conv.lastMessage,
    time: conv.lastMessageTime,
  }));

  const upcomingSessions = mockSessions.filter(
    (s) => s.status === "upcoming" && s.studentId === user?.id
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
        <CardDescription>Latest conversations with educators</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentMessages.map((msg,idx) => (
          <RecentMessageCard message={msg} key={idx} />
        ))}
        <Button className="w-full" asChild>
          <Link
            href="/student/chat"
            onClick={() => {
              router.push(`/student/chat`);
            }}
          >
            Open Chat
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
