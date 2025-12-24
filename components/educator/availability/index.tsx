"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { weekDayData } from "@/lib/utils";
import { Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { TimeInput } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import PageHeader from "@/components/ui/page-header";
export default function EducatorAvailability() {
  const [weekDays, setWeekDays] = useState(weekDayData);

  //chackbox handler
  const handleDayCheckbox = (dayValue: string, checked: boolean) => {
    setWeekDays((prev) =>
      prev.map((d) => (d.day === dayValue ? { ...d, checked } : d))
    );
  };
  const [blockSwitch, setBlockSwitch] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <></>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <PageHeader
            title={"Availability Management"}
            desc={" Manage your educator availability and schedule"}
          />
          <div className="grid lg:grid-cols-[1fr_1fr] gap-6 h-[600px] grid-cols-1">
            <Card className="p-6">
              <CardHeader className="p-0">
                <CardTitle>Set Your Availability</CardTitle>
                <CardDescription>
                  Define your working hours for each day
                </CardDescription>
              </CardHeader>

              <div className="flex gap-2 items-center">
                <Clock className="size-4" />
                Session Duration
              </div>

              <div className="flex flex-col gap-9">
                {weekDays.map((day) => (
                  <div
                    key={day.day}
                    className="flex flex-col gap-6 items-start sm:items-center justify-between sm:flex-row"
                  >
                    <div className="flex gap-3 items-center">
                      <Checkbox
                        checked={day.checked}
                        onCheckedChange={(checked) =>
                          handleDayCheckbox(day.day, Boolean(checked))
                        }
                      />
                      <p className="text-sm">{day.day}</p>
                    </div>

                    <div className="flex flex-1 items-center gap-5 sm:max-w-[75%] w-full">
                      {day.checked ? (
                        <>
                          <TimeInput />
                          <div className="text-sm text-muted-foreground">
                            To
                          </div>
                          <TimeInput />
                        </>
                      ) : (
                        <Card className="w-full text-muted-foreground bg-input/30 items-center p-1.25">
                          Unavailable
                        </Card>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-fit self-end">Save & Update</Button>
            </Card>

            {/* Right Panel  */}
            <Card className="flex flex-col p-6">
              <CardHeader className="p-0">
                <CardTitle>Mark Your Unavailability</CardTitle>
                <CardDescription>Block dates and add breaks</CardDescription>
              </CardHeader>

              <div className="flex gap-8 justify-between flex-col md:flex-row">
                <div className="min-w-[250px] flex flex-col gap-5">
                  <div>Set your unavailability</div>
                  <Card className="p-0">
                    <Calendar className="bg-transparent w-full" />
                  </Card>
                </div>

                <div className="flex flex-col flex-1 gap-5 max-w-[350px] ">
                  <div>Set your unavailability</div>
                  <Card className="p-3 flex flex-row justify-between">
                    <div>Blocks selected dates entirely</div>
                    <Switch
                      checked={blockSwitch}
                      onCheckedChange={() => {
                        setBlockSwitch((pre) => !pre);
                      }}
                    ></Switch>
                  </Card>
                  {!blockSwitch && (
                    <div className="flex gap-5">
                      <div className="w-full">
                        <p>Start Time</p>
                        <TimeInput />
                      </div>
                      <p className="self-end">-</p>
                      <div className="w-full">
                        <p>End Time</p>
                        <TimeInput />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4 self-end items-end flex-1">
                <Button variant={"outline"}>cancel</Button>
                <Button>Apply</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
