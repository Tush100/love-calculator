"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, Star, Sparkles, Heart, Dumbbell, Coffee, MessageSquare } from "lucide-react"

type Challenge = {
  id: string
  title: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  timeRequired: "5min" | "15min" | "30min" | "1hr" | "1day"
  completed: boolean
}

const challenges: Challenge[] = [
  {
    id: "c1",
    title: "Compliment Day",
    description: "Give each other at least 3 genuine compliments throughout the day.",
    category: "connection",
    difficulty: "easy",
    timeRequired: "5min",
    completed: false,
  },
  {
    id: "c2",
    title: "Memory Lane",
    description: "Look through old photos together and reminisce about your favorite memories.",
    category: "connection",
    difficulty: "easy",
    timeRequired: "30min",
    completed: false,
  },
  {
    id: "c3",
    title: "Appreciation List",
    description: "Write down 10 things you appreciate about each other and share them.",
    category: "connection",
    difficulty: "medium",
    timeRequired: "15min",
    completed: false,
  },
  {
    id: "c4",
    title: "Device-Free Evening",
    description: "Spend an entire evening without phones, TV, or other electronic devices.",
    category: "connection",
    difficulty: "hard",
    timeRequired: "1hr",
    completed: false,
  },
  {
    id: "c5",
    title: "Morning Coffee Date",
    description: "Wake up early and enjoy coffee or tea together before starting your day.",
    category: "dates",
    difficulty: "easy",
    timeRequired: "15min",
    completed: false,
  },
  {
    id: "c6",
    title: "Surprise Date Night",
    description: "One person plans a surprise date for the other without revealing any details.",
    category: "dates",
    difficulty: "medium",
    timeRequired: "1hr",
    completed: false,
  },
  {
    id: "c7",
    title: "Recreate First Date",
    description: "Recreate your first date as closely as possible.",
    category: "dates",
    difficulty: "medium",
    timeRequired: "1hr",
    completed: false,
  },
  {
    id: "c8",
    title: "New Restaurant Adventure",
    description: "Try a restaurant neither of you has been to before.",
    category: "dates",
    difficulty: "easy",
    timeRequired: "1hr",
    completed: false,
  },
  {
    id: "c9",
    title: "Learn Together",
    description: "Take an online class or tutorial together to learn something new.",
    category: "growth",
    difficulty: "medium",
    timeRequired: "1hr",
    completed: false,
  },
  {
    id: "c10",
    title: "Goal Setting Session",
    description: "Discuss and write down individual and couple goals for the next year.",
    category: "growth",
    difficulty: "medium",
    timeRequired: "30min",
    completed: false,
  },
  {
    id: "c11",
    title: "Book Club for Two",
    description: "Read the same book and discuss it together when you're both finished.",
    category: "growth",
    difficulty: "hard",
    timeRequired: "1day",
    completed: false,
  },
  {
    id: "c12",
    title: "Couple's Workout",
    description: "Complete a workout or physical activity together.",
    category: "fun",
    difficulty: "medium",
    timeRequired: "30min",
    completed: false,
  },
  {
    id: "c13",
    title: "Photo Challenge",
    description: "Take 10 fun, creative photos together throughout the day.",
    category: "fun",
    difficulty: "easy",
    timeRequired: "15min",
    completed: false,
  },
  {
    id: "c14",
    title: "Game Night",
    description: "Play board games or card games together for an evening.",
    category: "fun",
    difficulty: "easy",
    timeRequired: "1hr",
    completed: false,
  },
  {
    id: "c15",
    title: "Deep Questions",
    description: "Take turns asking and answering 5 deep, meaningful questions.",
    category: "intimacy",
    difficulty: "medium",
    timeRequired: "30min",
    completed: false,
  },
  {
    id: "c16",
    title: "Massage Exchange",
    description: "Give each other a 15-minute massage.",
    category: "intimacy",
    difficulty: "easy",
    timeRequired: "30min",
    completed: false,
  },
]

const categoryIcons: Record<string, any> = {
  connection: Heart,
  dates: Coffee,
  growth: Dumbbell,
  fun: Sparkles,
  intimacy: MessageSquare,
}

export default function CoupleChallenges() {
  const [challengeList, setChallengeList] = useState<Challenge[]>(challenges)
  const [activeCategory, setActiveCategory] = useState("all")

  // Load completed challenges from localStorage on component mount
  useEffect(() => {
    const savedChallenges = localStorage.getItem("coupleChallenges")
    if (savedChallenges) {
      try {
        const parsedChallenges = JSON.parse(savedChallenges)
        setChallengeList(
          challenges.map((challenge) => {
            const savedChallenge = parsedChallenges.find((c: Challenge) => c.id === challenge.id)
            return savedChallenge ? { ...challenge, completed: savedChallenge.completed } : challenge
          }),
        )
      } catch (error) {
        console.error("Error parsing saved challenges:", error)
      }
    }
  }, [])

  // Save challenges to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("coupleChallenges", JSON.stringify(challengeList))
  }, [challengeList])

  const toggleComplete = (id: string) => {
    setChallengeList(
      challengeList.map((challenge) =>
        challenge.id === id ? { ...challenge, completed: !challenge.completed } : challenge,
      ),
    )
  }

  const filteredChallenges =
    activeCategory === "all"
      ? challengeList
      : challengeList.filter((challenge) => challenge.category === activeCategory)

  const completedCount = challengeList.filter((c) => c.completed).length
  const totalCount = challengeList.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getTimeColor = (time: string) => {
    switch (time) {
      case "5min":
      case "15min":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "30min":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "1hr":
      case "1day":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-pink-600 dark:text-pink-400">Couple Challenges</CardTitle>
        <CardDescription className="text-center">
          Fun activities to strengthen your bond and create memories
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <span>
              {completedCount} of {totalCount} completed ({completionPercentage}%)
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChallengeList(challenges.map((c) => ({ ...c, completed: false })))}
          >
            Reset All
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="connection">Connection</TabsTrigger>
            <TabsTrigger value="dates">Dates</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="fun">Fun</TabsTrigger>
            <TabsTrigger value="intimacy">Intimacy</TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="space-y-4">
            {filteredChallenges.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No challenges in this category.</p>
              </div>
            ) : (
              filteredChallenges.map((challenge) => {
                const CategoryIcon = categoryIcons[challenge.category] || Heart
                return (
                  <Card
                    key={challenge.id}
                    className={`overflow-hidden transition-all ${
                      challenge.completed ? "border-green-200 bg-green-50 dark:bg-green-900/10" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="mt-1">
                            <CategoryIcon className="h-5 w-5 text-pink-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">{challenge.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{challenge.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="secondary" className="capitalize">
                                {challenge.category}
                              </Badge>
                              <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                              <Badge className={getTimeColor(challenge.timeRequired)}>
                                <Clock className="h-3 w-3 mr-1" />
                                {challenge.timeRequired}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant={challenge.completed ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleComplete(challenge.id)}
                          className={challenge.completed ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {challenge.completed ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Completed
                            </>
                          ) : (
                            "Mark Complete"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        {completedCount > 0 && (
          <div className="text-center">
            <h4 className="font-semibold flex items-center justify-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              Achievements
            </h4>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {completedCount >= 1 && (
                <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">First Step</Badge>
              )}
              {completedCount >= 5 && (
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Getting Closer
                </Badge>
              )}
              {completedCount >= 10 && (
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Relationship Pro
                </Badge>
              )}
              {completedCount === totalCount && (
                <Badge className="bg-gold-100 text-gold-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Relationship Master
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
