"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Heart, Gift, Star, Sparkles, Cake, Home, Plane } from "lucide-react"

type Event = {
  id: string
  title: string
  date: Date
  type: string
  description: string
}

const eventTypes = [
  { value: "first-date", label: "First Date", icon: Heart },
  { value: "anniversary", label: "Anniversary", icon: Cake },
  { value: "milestone", label: "Milestone", icon: Star },
  { value: "trip", label: "Trip", icon: Plane },
  { value: "gift", label: "Gift", icon: Gift },
  { value: "moving-in", label: "Moving In", icon: Home },
  { value: "other", label: "Other", icon: Sparkles },
]

export default function RelationshipTimeline() {
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    date: new Date(),
    type: "milestone",
    description: "",
  })
  const [isAdding, setIsAdding] = useState(false)

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("relationshipEvents")
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
          ...event,
          date: new Date(event.date),
        }))
        setEvents(parsedEvents)
      } catch (error) {
        console.error("Error parsing saved events:", error)
      }
    }
  }, [])

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("relationshipEvents", JSON.stringify(events))
  }, [events])

  const handleAddEvent = () => {
    if (!newEvent.title) return

    const event = {
      ...newEvent,
      id: Date.now().toString(),
      date: newEvent.date || new Date(),
    } as Event

    setEvents([...events, event])
    setNewEvent({
      title: "",
      date: new Date(),
      type: "milestone",
      description: "",
    })
    setIsAdding(false)
  }

  const getEventIcon = (type: string) => {
    const eventType = eventTypes.find((t) => t.value === type)
    const Icon = eventType?.icon || Sparkles
    return <Icon className="h-5 w-5 text-pink-500" />
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-pink-600 dark:text-pink-400">Relationship Timeline</CardTitle>
        <CardDescription className="text-center">Track your special moments and milestones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isAdding ? (
          <Button onClick={() => setIsAdding(true)} className="w-full">
            Add New Memory
          </Button>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">New Memory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Our first date"
                />
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newEvent.date ? format(newEvent.date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newEvent.date}
                      onSelect={(date) => setNewEvent({ ...newEvent, date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Event Type</Label>
                <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          <type.icon className="mr-2 h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="We went to that cute café..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>Save Memory</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {events.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No memories added yet. Add your first special moment!</p>
          </div>
        ) : (
          <div className="relative pl-8 border-l-2 border-pink-200 dark:border-pink-800 space-y-8">
            {events
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((event) => (
                <div key={event.id} className="relative">
                  <div className="absolute -left-10 p-2 bg-white dark:bg-gray-950 rounded-full border-2 border-pink-200 dark:border-pink-800">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{format(event.date, "MMMM d, yyyy")}</p>
                    <h3 className="text-lg font-semibold mt-1">{event.title}</h3>
                    {event.description && <p className="mt-2 text-gray-600 dark:text-gray-300">{event.description}</p>}
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
