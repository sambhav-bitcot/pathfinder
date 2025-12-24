import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAdminUsers } from "@/lib/mock-data";
import { useMemo } from "react";

import UserCard from "./user-card";

interface UserSectionProps {
  tab: string;
  search: string;
  setTab: (tab: string) => void;
}
const tabArray = [
  { value: "all" },
  { value: "students" },
  { value: "educators" },
];

export default function UserSection({ setTab, search, tab }: UserSectionProps) {
  const students = mockAdminUsers.filter((u) => u.role === "student");
  const educators = mockAdminUsers.filter((u) => u.role === "educator");
  const filterData = useMemo(() => {
    return mockAdminUsers.filter((user) => {
      let name = user.firstName + " " + user.lastName;

      if (tab === "all") {
        if (search == "") return user;
        if (name.toLowerCase().includes(search.toLowerCase())) return user;
      }
      if (tab === "educators" && user.role === "educator") {
        if (search == "") return user;

        if (name.toLowerCase().includes(search.toLowerCase())) return user;
      }
      if (tab === "students" && user.role === "student") {
        if (search == "") return user;

        if (name.toLowerCase().includes(search.toLowerCase())) return user;
      }
    });
  }, [search, tab]);
  return (
    <Tabs defaultValue="all" className="space-y-6">
      <TabsList>
        <TabsTrigger value="all" onClick={() => setTab("all")}>
          All Users ({mockAdminUsers.length})
        </TabsTrigger>
        <TabsTrigger
          value="students"
          onClick={() => {
            setTab("students");
          }}
        >
          Students ({students.length})
        </TabsTrigger>
        <TabsTrigger
          value="educators"
          onClick={() => {
            setTab("educators");
          }}
        >
          Educators ({educators.length})
        </TabsTrigger>
      </TabsList>

      {tabArray.map((tab,idx) => (
        <TabsContent value={tab.value} className="space-y-4" key={idx}>
          <Card className="bg-transparent border-0 p-0">
            <CardContent className="p-0">
              <div className="space-y-3">
                {filterData.map((user,idx) => (
                  <UserCard user={user} key={idx} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
