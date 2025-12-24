"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockApplications } from "@/lib/mock-data"
import { CheckCircle, Circle, Clock, AlertCircle, Plus, Calendar, FileText, ChevronDown, ChevronUp } from "lucide-react"

export default function ApplicationsPage() {
  const [expandedApp, setExpandedApp] = useState<string | null>("app-1")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-500"
      case "In Progress":
        return "bg-yellow-500"
      case "Accepted":
        return "bg-green-500"
      case "Rejected":
        return "bg-red-500"
      case "Waitlisted":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Submitted":
        return <CheckCircle className="w-4 h-4" />
      case "In Progress":
        return <Clock className="w-4 h-4" />
      case "Accepted":
        return <CheckCircle className="w-4 h-4" />
      case "Rejected":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Circle className="w-4 h-4" />
    }
  }

  const calculateProgress = (requirements: any[]) => {
    const completed = requirements.filter((req) => req.completed).length
    return (completed / requirements.length) * 100
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Application Tracker</h1>
            <p className="text-muted-foreground">Track deadlines, requirements, and application status</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Applications</div>
            <div className="text-3xl font-bold">{mockApplications.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">In Progress</div>
            <div className="text-3xl font-bold text-yellow-500">
              {mockApplications.filter((app) => app.status === "In Progress").length}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Submitted</div>
            <div className="text-3xl font-bold text-blue-500">
              {mockApplications.filter((app) => app.status === "Submitted").length}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Accepted</div>
            <div className="text-3xl font-bold text-green-500">
              {mockApplications.filter((app) => app.status === "Accepted").length}
            </div>
          </Card>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {mockApplications.map((application) => {
            const progress = calculateProgress(application.requirements)
            const daysUntil = getDaysUntilDeadline(application.deadline)
            const isExpanded = expandedApp === application.id

            return (
              <Card key={application.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{application.collegeName}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Deadline: {new Date(application.deadline).toLocaleDateString()}
                            </div>
                            <Badge variant="outline" className={daysUntil < 30 ? "border-red-500 text-red-500" : ""}>
                              {daysUntil} days left
                            </Badge>
                          </div>
                        </div>

                        <Badge className={getStatusColor(application.status)}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1">{application.status}</span>
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{Math.round(progress)}% Complete</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedApp(isExpanded ? null : application.id)}
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1" />
                              View Details
                            </>
                          )}
                        </Button>
                        <Button size="sm">Continue Application</Button>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t space-y-6">
                      {/* Requirements Checklist */}
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Requirements Checklist
                        </h4>
                        <div className="space-y-3">
                          {application.requirements.map((req) => (
                            <div
                              key={req.id}
                              className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                            >
                              <div className="mt-0.5">
                                {req.completed ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Circle className="w-5 h-5 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{req.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  <Badge variant="outline" className="mr-2">
                                    {req.type}
                                  </Badge>
                                  {req.dueDate && `Due: ${new Date(req.dueDate).toLocaleDateString()}`}
                                </div>
                              </div>
                              {!req.completed && (
                                <Button size="sm" variant="outline">
                                  Complete
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Notes */}
                      {application.notes && (
                        <div>
                          <h4 className="font-semibold mb-2">Notes</h4>
                          <Card className="p-4 bg-muted/50">
                            <p className="text-sm">{application.notes}</p>
                          </Card>
                        </div>
                      )}

                      {/* Application Details */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Application Fee</div>
                          <div className="font-semibold">${application.applicationFee}</div>
                        </div>
                        {application.submittedDate && (
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Submitted Date</div>
                            <div className="font-semibold">
                              {new Date(application.submittedDate).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
