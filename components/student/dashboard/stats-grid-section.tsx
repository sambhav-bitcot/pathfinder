import StatsCard from "@/components/ui/stats-card";
import { useAuth } from "@/contexts/auth-context";
import { mockChatConversations, mockSessions } from "@/lib/mock-data";
import { useAppSelector } from "@/store/hooks";
import { Calendar, MessageSquare, Wallet } from "lucide-react";
export default function StatsGridSection() {
  const { user: userOld } = useAuth();
  const { token } = useAppSelector((state) => state.auth);

  const upcomingSessions = mockSessions.filter(
    (s) => s.status === "upcoming" && s.studentId === userOld?.id
  );
  console.log(upcomingSessions);

  const completedSessionsCount = mockSessions.filter(
    (s) => s.status === "completed" && s.studentId === userOld?.id
  ).length;

  const unreadMessages = mockChatConversations.reduce(
    (sum, conv) => sum + conv.unread,
    0
  );
  const statsItems = [
    {
      title: "Token Balance",
      Icon: Wallet,
      data: token,
    },
    {
      title: "Upcoming Sessions",
      Icon: Calendar,
      data: upcomingSessions.length,
    },
    {
      title: "Completed Sessions",
      Icon: MessageSquare,
      data: completedSessionsCount,
    },
    {
      title: "Unread Messages",
      Icon: MessageSquare,
      data: unreadMessages,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {statsItems.map((items, idx) => (
        <StatsCard
          key={idx + 1}
          title={items.title}
          Icon={items.Icon}
          data={items.data}
        />
      ))}
    </div>
  );
}
