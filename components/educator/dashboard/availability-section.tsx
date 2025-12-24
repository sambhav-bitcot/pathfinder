import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AvailabilityCard from "./availability-card";

import Link from "next/link";
export default function AvailabilitySection() {

const availability = [
  { day: "Monday - Friday", time: "9:00 AM - 5:00 PM" },
  { day: "Saturday", time: "  10:00 AM - 2:00 PM" },
];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Availability</CardTitle>
        <CardDescription>Manage your schedule and time slots</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {availability.map((slot,idx) => (
            <AvailabilityCard availability={slot} key={idx} />
          ))}
        </div>
        <Button className="w-full" asChild>
          <Link href="/educator/availability">Manage Availability</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
