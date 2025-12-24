"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import SignupTokenSection from "./signup-token-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/ui/page-header";
import { normalizeNumber } from "@/lib/utils";

export default function AdminSettings() {

  /*State */

  const [signupToken, setSignupToken] = useState("0");

  const [sessionSlots, setSessionSlots] = useState([
    { time: "30M", token: "30" },
    { time: "60M", token: "60" },
  ]);

  const [sessionTime, setSessionTime] = useState("30M");
  const [sessionToken, setSessionToken] = useState("30");

  const [cancellationTime, setCancellationTime] = useState({
    hour: "0",
    minute: "0",
  });

  const [reschedulingTime, setReschedulingTime] = useState({
    hour: "0",
    minute: "0",
  });

  /* ---------------- Handlers ---------------- */

  const handleSessionToken = (e: ChangeEvent<HTMLInputElement>) => {
    const value = normalizeNumber(e.target.value);
    if (value === null) return;

    setSessionToken(value);
    setSessionSlots((prev) =>
      prev.map((s) => (s.time === sessionTime ? { ...s, token: value } : s))
    );
  };

  const handleSessionTime = (value: string) => {
    setSessionTime(value);
    const slot = sessionSlots.find((s) => s.time === value);
    if (slot) setSessionToken(slot.token);
  };

  const handleCancellation = (e: ChangeEvent<HTMLInputElement>) => {
    const value = normalizeNumber(e.target.value);
    if (value === null) return;

    setCancellationTime((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleReschedule = (e: ChangeEvent<HTMLInputElement>) => {
    const value = normalizeNumber(e.target.value);
    if (value === null) return;

    setReschedulingTime((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      signupToken,
      sessionSlots,
      cancellationTime,
      reschedulingTime,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <PageHeader
            title={"Settings"}
            desc={" View and manage all settings"}
          />

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Signup Tokens */}
            <SignupTokenSection
              signupToken={signupToken}
              setSignupToken={setSignupToken}
            />
            {/* Session Duration */}
            <Card className="p-5">
              <CardHeader className="p-0 font-semibold">
                Session Duration & Tokens
              </CardHeader>
              <p className="text-sm text-muted-foreground">
                Select a session duration and set tokens for it.
              </p>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2 ">
                  <Label>Session duration</Label>
                  <Select value={sessionTime} onValueChange={handleSessionTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {sessionSlots.map((s) => (
                        <SelectItem key={s.time} value={s.time}>
                          {s.time === "30M"
                            ? `30 minutes - ${s.token} tokens`
                            : `60 minutes - ${s.token} tokens`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Set default tokens</Label>
                  <Input value={sessionToken} onChange={handleSessionToken} />
                </div>
              </div>
            </Card>

            {/* Cancellation & Rescheduling */}
            <Card className="p-5">
              <div>
                <CardHeader className="p-0 font-semibold">
                  Cancellation & Rescheduling
                </CardHeader>
                <CardDescription>
                  Configure time windows. Refunds apply if action happens before
                  the specified time.
                </CardDescription>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* Cancellation */}
                <div className="flex flex-col gap-2">
                  <div className="text-sm">
                    Cancellation window (before start)
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Hours
                      </Label>
                      <Input
                        name="hour"
                        value={cancellationTime.hour}
                        onChange={handleCancellation}
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Minutes
                      </Label>
                      <Input
                        name="minute"
                        value={cancellationTime.minute}
                        onChange={handleCancellation}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Refund applicable if session is cancelled 0 hours and 0
                    minutes before start.
                  </p>
                </div>

                {/* Rescheduling */}
                <div className="flex flex-col gap-2">
                  <div className="text-sm">
                    Rescheduling window (before start)
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Hours
                      </Label>
                      <Input
                        name="hour"
                        value={reschedulingTime.hour}
                        onChange={handleReschedule}
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Minutes
                      </Label>
                      <Input
                        name="minute"
                        value={reschedulingTime.minute}
                        onChange={handleReschedule}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Rescheduleding is applicable if session is rescheduled 0
                    hours and 0 minutes before start.
                  </p>
                </div>
              </div>

              <div className="flex justify-center mt-4 self-end">
                <Button type="submit">Save</Button>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
