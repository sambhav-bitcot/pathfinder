"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sessionRules } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useParams, useRouter } from "next/navigation";
import { mockEducators, mockAvailability } from "@/lib/mock-data";
import { dayMap, formatDateFullDay } from "@/lib/utils";
import PageHeader from "@/components/ui/page-header";

type Educator = (typeof mockEducators)[number];

export default function BookSession() {
  const router = useRouter();
  const { eduID } = useParams();

  const [mounted, setMounted] = useState(false);
  const [educator, setEducator] = useState<Educator | null>(null);
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<any[]>([]);

  const enabledDays =
    educator?.availability.map((day: string) => dayMap[day]) || [];

  function availableSlotFinder(selectedDate: Date) {
    const dayString = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const availSlot = mockAvailability.find((slot) => slot.day === dayString);

    setTimeSlot(availSlot ? availSlot.slots : []);
  }

  function searchEducator(id: string) {
    const educatorData = mockEducators.find((edu: any) => edu.id === id);

    if (educatorData) {
      setEducator(educatorData);
    }
  }

  useEffect(() => {
    if (date) {
      availableSlotFinder(date);
    }
  }, [date]);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (eduID) {
      searchEducator(eduID as string);
    }
  }, [eduID]);

  return (
    <div className="min-h-screen bg-background h-screen">
      <div className="container mx-auto px-4 py-8 h-full">
        <div className="space-y-6 flex flex-col h-full">
          <div className="flex items-center justify-between">
            <PageHeader
              title="Book New Session"
              desc="Book a session with an educator"
            />

            <Button className="gap-3" onClick={() => router.back()}>
              <ArrowLeft /> Back
            </Button>
          </div>

          <div className="flex-1 h-full grid lg:grid-cols-[400px_1fr] gap-6 grid-cols-1">
            {/* side panel */}
            <Card className="px-7">
              <div className="flex flex-col gap-6">
                <div className="flex gap-3 items-center">
                  <Avatar className="size-16">
                    <AvatarImage src={educator?.avatar || ""} alt="Profile" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="font-medium text-md">
                      {educator
                        ? `${educator.firstName} ${educator.lastName}`
                        : ""}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Language
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold">Book a Session</h3>
                  <Badge variant="destructive">Languages</Badge>
                </div>

                <div className="flex gap-3 items-center">
                  <Clock className="size-4" /> Session Duration
                </div>

                <div className="flex gap-3 items-center">
                  <MapPin className="size-4" /> Video Call
                </div>

                <div className="pt-4 border-t space-y-2">
                  <h3 className="font-semibold text-sm">Availability</h3>
                  <p className="text-sm text-muted-foreground flex gap-2">
                    {educator &&
                      educator.availability.map((day: string, idx: number) => (
                        <li className="list-none" key={idx}>
                          {day},
                        </li>
                      ))}
                  </p>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <h3 className="font-semibold text-sm">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      {mounted && (
                        <span className="font-medium">
                          {date ? formatDateFullDay(date) : "Not Selected"}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">Not selected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">30 minutes</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Total
                      </span>
                      <span className="text-xl font-bold text-primary">
                        tokens
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-xs">
                    Terms &amp; Conditions :
                  </h4>
                  <ul className="text-xs text-muted-foreground list-disc pl-5">
                    {sessionRules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* time details */}
            <Card className="px-7 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold">Select a time to book</h1>
                  <p className="text-muted-foreground">
                    Choose a date and time for your session
                  </p>
                </div>
                <Button>Confirm Booking</Button>
              </div>

              <div className="flex flex-col gap-4 xl:flex-row justify-center">
                {/* calendar */}
                <div className="flex flex-col gap-2">
                  <Card className="bg-accent-foreground w-[400px]">
               {   mounted &&  <Calendar
                      className="w-full"
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        return !enabledDays.includes(d.getDay()) || d < today;
                      }}
                    />}
                  </Card>
                </div>

                {/* time slot */}
                <div className="space-y-3 flex-1">
                  <h3 className="font-semibold">
                 {   (date ? formatDateFullDay(date) : "Not Selected")}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 max-h-[420px] overflow-y-auto pr-2">
                    {timeSlot.length > 0 ? (
                      timeSlot.map(
                        (slot: any, idx: number) =>
                          slot.available && (
                            <button
                              key={idx}
                              className="px-4 py-3 rounded-lg border-2 transition-all text-center font-medium border-border hover:border-primary/50 hover:bg-muted/50"
                            >
                              {slot.time}
                            </button>
                          )
                      )
                    ) : (
                      <div className="col-span-2 text-muted-foreground">
                        No slots available for this date
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
