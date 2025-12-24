"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockColleges } from "@/lib/mock-data"
import { Search, MapPin, Heart, ExternalLink, Filter, Star, GraduationCap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CollegesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [sizeFilter, setSizeFilter] = useState<string>("all")
  const [savedColleges, setSavedColleges] = useState<string[]>(["col-1", "col-2"])

  const filteredColleges = mockColleges.filter((college) => {
    const matchesSearch =
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.majors.some((major) => major.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = typeFilter === "all" || college.type === typeFilter
    const matchesSize = sizeFilter === "all" || college.size === sizeFilter

    return matchesSearch && matchesType && matchesSize
  })

  const toggleSave = (collegeId: string) => {
    setSavedColleges((prev) =>
      prev.includes(collegeId) ? prev.filter((id) => id !== collegeId) : [...prev, collegeId],
    )
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">College Search</h1>
          <p className="text-muted-foreground">Discover and compare colleges that match your profile and goals</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by college name, location, or major..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Public">Public</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sizeFilter} onValueChange={setSizeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                </SelectContent>
              </Select>

              {(searchQuery || typeFilter !== "all" || sizeFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setTypeFilter("all")
                    setSizeFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Saved Colleges */}
        {savedColleges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary fill-primary" />
              My Saved Colleges ({savedColleges.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {mockColleges
                .filter((college) => savedColleges.includes(college.id))
                .map((college) => (
                  <CollegeCard key={college.id} college={college} isSaved={true} onToggleSave={toggleSave} />
                ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {searchQuery ? `Search Results (${filteredColleges.length})` : "Recommended Colleges"}
          </h2>
          <div className="text-sm text-muted-foreground">{filteredColleges.length} colleges found</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredColleges.map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
              isSaved={savedColleges.includes(college.id)}
              onToggleSave={toggleSave}
            />
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <Card className="p-12 text-center">
            <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </Card>
        )}
      </div>
    </div>
  )
}

function CollegeCard({
  college,
  isSaved,
  onToggleSave,
}: {
  college: (typeof mockColleges)[0]
  isSaved: boolean
  onToggleSave: (id: string) => void
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative">
        <div className="absolute top-4 right-4 flex gap-2">
          {college.matchScore && (
            <Badge className="bg-primary text-primary-foreground">
              <Star className="w-3 h-3 mr-1" />
              {college.matchScore}% Match
            </Badge>
          )}
          <Button
            size="icon"
            variant={isSaved ? "default" : "secondary"}
            onClick={() => onToggleSave(college.id)}
            className="rounded-full"
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary">{college.type}</Badge>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-1">{college.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {college.location}
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{college.description}</p>

        <div className="grid grid-cols-2 gap-4 py-4 border-y">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Acceptance Rate</div>
            <div className="font-semibold">{college.acceptanceRate}%</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Avg GPA</div>
            <div className="font-semibold">{college.avgGPA}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Avg SAT</div>
            <div className="font-semibold">{college.avgSAT}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Tuition</div>
            <div className="font-semibold">${(college.tuition / 1000).toFixed(0)}k</div>
          </div>
        </div>

        <div>
          <div className="text-xs text-muted-foreground mb-2">Popular Majors</div>
          <div className="flex flex-wrap gap-2">
            {college.majors.slice(0, 3).map((major) => (
              <Badge key={major} variant="outline" className="text-xs">
                {major}
              </Badge>
            ))}
            {college.majors.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{college.majors.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-transparent" variant="outline" asChild>
            <a href={college.website} target="_blank" rel="noopener noreferrer">
              Visit Website
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button className="flex-1">View Details</Button>
        </div>
      </div>
    </Card>
  )
}
