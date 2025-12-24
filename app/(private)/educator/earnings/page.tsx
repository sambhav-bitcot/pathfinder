"use client";

import { EducatorNav } from "@/components/navigation/educator-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Calendar, Download } from "lucide-react";
import { mockEducatorEarnings } from "@/lib/mock-data";

export default function EducatorEarnings() {
  const totalEarnings = mockEducatorEarnings.reduce(
    (sum, e) => sum + e.amount,
    0
  );
  const paidEarnings = mockEducatorEarnings
    .filter((e) => e.status === "paid")
    .reduce((sum, e) => sum + e.amount, 0);
  const pendingEarnings = mockEducatorEarnings
    .filter((e) => e.status === "pending")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <></>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Earnings Dashboard</h1>
              <p className="text-muted-foreground">
                Track your earnings and payouts
              </p>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Earnings Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Earnings
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalEarnings}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paid Out</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${paidEarnings}</div>
                <p className="text-xs text-muted-foreground">
                  {
                    mockEducatorEarnings.filter((e) => e.status === "paid")
                      .length
                  }{" "}
                  sessions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Calendar className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${pendingEarnings}</div>
                <p className="text-xs text-muted-foreground">
                  {
                    mockEducatorEarnings.filter((e) => e.status === "pending")
                      .length
                  }{" "}
                  sessions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Earnings History */}
          <Card>
            <CardHeader>
              <CardTitle>Earnings History</CardTitle>
              <CardDescription>
                Your session earnings and payouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockEducatorEarnings.map((earning) => (
                  <div
                    key={earning.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">
                        Session with {earning.studentName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(earning.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <p className="text-lg font-semibold">
                          ${earning.amount}
                        </p>
                        <Badge
                          variant={
                            earning.status === "paid" ? "default" : "secondary"
                          }
                        >
                          {earning.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payout Information */}
          <Card>
            <CardHeader>
              <CardTitle>Payout Information</CardTitle>
              <CardDescription>How and when you get paid</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="font-medium">Next Payout</p>
                <p className="text-2xl font-bold">${pendingEarnings}</p>
                <p className="text-sm text-muted-foreground">
                  Scheduled for end of month
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <strong>Payment Method:</strong> Bank Transfer
                </p>
                <p className="text-muted-foreground">
                  <strong>Account:</strong> ****1234
                </p>
                <Button variant="outline" size="sm">
                  Update Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
