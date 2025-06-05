"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, Trash2, Plus, Gift, MapPin, Camera } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface TimelineEvent {
  id: string
  title: string
  date: string
  description: string
  type: "anniversary" | "first-date" | "milestone" | "special" | "other"
  createdAt: string
}

const eventTypes = [
  { value: "first-date", label: "First Date", icon: Heart, color: "bg-pink-500" },
  { value: "anniversary", label: "Anniversary", icon: Gift, color: "bg-red-500" },
  { value: "milestone", label: "Milestone", icon: Calendar, color: "bg-blue-500" },
  { value: "special", label: "Special Moment", icon: Camera, color: "bg-purple-500" },
  { value: "other", label: "Other", icon: MapPin, color: "bg-green-500" },
]

export default function RelationshipTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    type: "special" as TimelineEvent["type"],
  })
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const savedEvents = localStorage.getItem("relationshipTimeline")
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("relationshipTimeline", JSON.stringify(events))
  }, [events])

  const addEvent = () => {
    if (!newEvent.title.trim() || !newEvent.date) return

    const event: TimelineEvent = {
      id: Date.now().toString(),
      ...newEvent,
      createdAt: new Date().toISOString(),
    }

    setEvents((prev) => [...prev, event].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    setNewEvent({ title: "", date: "", description: "", type: "special" })
    setIsAdding(false)
  }

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  const getEventTypeInfo = (type: string) => {
    return eventTypes.find((t) => t.value === type) || eventTypes[3]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDaysAgo = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = today.getTime() - eventDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 0) return `In ${Math.abs(diffDays)} days`
    return `${diffDays} days ago`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Relationship Timeline
          </CardTitle>
          <CardDescription>Track and celebrate your special moments together</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isAdding ? (
            <Button onClick={() => setIsAdding(true)} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add New Memory
            </Button>
          ) : (
            <Card className="border-2 border-dashed border-pink-200">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="eventTitle">Event Title</Label>
                  <Input
                    id="eventTitle"
                    placeholder="e.g., Our First Kiss, Anniversary Dinner"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventDate">Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {eventTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <Button
                          key={type.value}
                          variant={newEvent.type === type.value ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            setNewEvent((prev) => ({ ...prev, type: type.value as TimelineEvent["type"] }))
                          }
                          className="justify-start"
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {type.label}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventDescription">Description (Optional)</Label>
                  <Input
                    id="eventDescription"
                    placeholder="Add some details about this special moment..."
                    value={newEvent.description}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={addEvent} disabled={!newEvent.title.trim() || !newEvent.date}>
                    Add Memory
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {events.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-muted-foreground">No memories added yet. Start building your timeline!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Your Love Story ({events.length} memories)</h3>
              <AnimatePresence>
                {events.map((event, index) => {
                  const typeInfo = getEventTypeInfo(event.type)
                  const Icon = typeInfo.icon

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="relative">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full ${typeInfo.color} text-white flex-shrink-0`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h4 className="font-semibold text-lg">{event.title}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline">{typeInfo.label}</Badge>
                                    <span className="text-sm text-muted-foreground">{formatDate(event.date)}</span>
                                    <span className="text-xs text-muted-foreground">({getDaysAgo(event.date)})</span>
                                  </div>
                                  {event.description && (
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{event.description}</p>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeEvent(event.id)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
