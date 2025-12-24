"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockEducators } from "@/lib/mock-data";
import { SearchInput } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/page-header";

const timeSlot = [
  { token: 60, time: "30" },
  { token: 100, time: "60" },
];
export default function EducatorList() {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [filterData, setFilterData] = useState(mockEducators);

  useEffect(() => {
    handleFilter(filter);
  }, [filter]);

  const handleFilter = (search: string) => {
    if (!search) {
      setFilterData(mockEducators);
      return;
    }

    const filtered = mockEducators.filter((edu: any) => {
      const fullName = `${edu.firstName} ${edu.lastName}`.toLowerCase();

      return (
        fullName.includes(search) ||
        edu.topic.toLowerCase().includes(search) ||
        edu.specialization.toLowerCase().includes(search)
      );
    });

    setFilterData(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <PageHeader
            title="Book New Session"
            desc="View and manage your counseling sessions"
          />
          <Card>
            <div className="px-9 py-10">
              <SearchInput
                placeholder="Search by educator, topic, specialization"
                onChange={(e) => setFilter(e.target.value.toLowerCase())}
              />
            </div>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            {filterData.map((educator: any) => (
              <Card key={educator.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <img
                      src={educator.avatar || "/placeholder.svg"}
                      alt={`${educator.firstName} ${educator.lastName}`}
                      className="w-16 h-16 rounded-full"
                    />

                    <div className="flex-1">
                      <CardTitle>
                        {educator.firstName} {educator.lastName}
                      </CardTitle>

                      <CardDescription>{educator.title}</CardDescription>

                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">
                          {educator.specialization}
                        </Badge>

                        {/* <span className="text-sm text-muted-foreground">
                          ⭐ {educator.rating} ({educator.reviews} reviews)
                        </span> */}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 flex flex-col flex-1">
                  <p className="text-sm text-muted-foreground flex-1">
                    {educator.bio}
                  </p>

                  <div className="flex  justify-between">
                    <div>
                      {timeSlot.map((slot, idx) => (
                        <div
                          key={idx}
                        >{`${slot.token} tokens / ${slot.time} min`}</div>
                      ))}
                    </div>
                    <Button
                      className="w-fit"
                      onClick={() =>
                        router.push(
                          `/student/sessions/book-session/${educator.id}`
                        )
                      }
                    >
                      Book Session
                    </Button>
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      ${educator.hourlyRate}/hour
                    </span>
                    <Button>Book Session</Button>
                  </div> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
