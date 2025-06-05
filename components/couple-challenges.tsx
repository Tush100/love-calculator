"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shuffle, Heart, Clock, Users, Star, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Challenge {
  id: string
  title: string
  description: string
  category: "communication" | "fun" | "romantic" | "adventure" | "intimate"
  duration: string
  difficulty: "easy" | "medium" | "hard"
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "20 Questions Deep Dive",
    description: "Take turns asking each other 20 meaningful questions you've never asked before. No phones allowed!",
    category: "communication",
    duration: "30-45 minutes",
    difficulty: "easy",
  },
  {
    id: "2",
    title: "Cook Together Challenge",
    description:
      "Pick a cuisine you've never cooked before and make a meal together from scratch. No recipes allowed - just creativity!",
    category: "fun",
    duration: "2-3 hours",
    difficulty: "medium",
  },
  {
    id: "3",
    title: "Love Letter Exchange",
    description: "Write heartfelt letters to each other about your favorite memories together and read them aloud.",
    category: "romantic",
    duration: "1 hour",
    difficulty: "easy",
  },
  {
    id: "4",
    title: "Blindfolded Trust Walk",
    description:
      "Take turns being blindfolded while your partner guides you on a walk around your neighborhood or a park.",
    category: "adventure",
    duration: "45 minutes",
    difficulty: "medium",
  },
  {
    id: "5",
    title: "Dream Board Creation",
    description: "Create a vision board together of your shared dreams and goals for the future.",
    category: "communication",
    duration: "2 hours",
    difficulty: "easy",
  },
  {
    id: "6",
    title: "Sunrise or Sunset Date",
    description: "Wake up early to watch the sunrise together or plan a romantic sunset viewing with snacks.",
    category: "romantic",
    duration: "1-2 hours",
    difficulty: "easy",
  },
  {
    id: "7",
    title: "Learn Something New Together",
    description: "Pick a skill neither of you knows and spend the day learning it together (dancing, painting, etc.).",
    category: "fun",
    duration: "3-4 hours",
    difficulty: "medium",
  },
  {
    id: "8",
    title: "Memory Lane Photo Journey",
    description: "Go through old photos together and share the stories behind your favorite memories.",
    category: "intimate",
    duration: "1-2 hours",
    difficulty: "easy",
  },
  {
    id: "9",
    title: "Random Acts of Kindness Day",
    description: "Spend a day doing random acts of kindness for strangers together and see how it affects your bond.",
    category: "adventure",
    duration: "Full day",
    difficulty: "medium",
  },
  {
    id: "10",
    title: "Technology-Free Weekend",
    description: "Spend an entire weekend without phones, TV, or internet. Focus only on each other.",
    category: "intimate",
    duration: "48 hours",
    difficulty: "hard",
  },
  {
    id: "11",
    title: "Appreciation Jar",
    description: "Write 10 things you appreciate about each other on separate papers and take turns reading them.",
    category: "communication",
    duration: "30 minutes",
    difficulty: "easy",
  },
  {
    id: "12",
    title: "Adventure Scavenger Hunt",
    description: "Create a scavenger hunt for each other with clues leading to meaningful places in your relationship.",
    category: "adventure",
    duration: "2-3 hours",
    difficulty: "hard",
  },
]

const categories = {
  communication: { name: "Communication", icon: Users, color: "bg-blue-500" },
  fun: { name: "Fun & Games", icon: Star, color: "bg-yellow-500" },
  romantic: { name: "Romantic", icon: Heart, color: "bg-pink-500" },
  adventure: { name: "Adventure", icon: Shuffle, color: "bg-green-500" },
  intimate: { name: "Intimate", icon: CheckCircle, color: "bg-purple-500" },
}

const difficulties = {
  easy: { name: "Easy", color: "bg-green-100 text-green-800" },
  medium: { name: "Medium", color: "bg-yellow-100 text-yellow-800" },
  hard: { name: "Hard", color: "bg-red-100 text-red-800" },
}

export default function CoupleChallenges() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    const saved = localStorage.getItem("completedChallenges")
    if (saved) {
      setCompletedChallenges(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("completedChallenges", JSON.stringify(completedChallenges))
  }, [completedChallenges])

  const getRandomChallenge = () => {
    const availableChallenges = challenges.filter((challenge) => {
      const categoryMatch = selectedCategory === "all" || challenge.category === selectedCategory
      const notCompleted = !completedChallenges.includes(challenge.id)
      return categoryMatch && notCompleted
    })

    if (availableChallenges.length === 0) {
      // If all challenges in category are completed, show all challenges
      const allCategoryMatches = challenges.filter(
        (challenge) => selectedCategory === "all" || challenge.category === selectedCategory,
      )
      if (allCategoryMatches.length > 0) {
        const randomIndex = Math.floor(Math.random() * allCategoryMatches.length)
        setCurrentChallenge(allCategoryMatches[randomIndex])
      }
    } else {
      const randomIndex = Math.floor(Math.random() * availableChallenges.length)
      setCurrentChallenge(availableChallenges[randomIndex])
    }
  }

  const markAsCompleted = (challengeId: string) => {
    setCompletedChallenges((prev) => [...prev, challengeId])
  }

  const resetProgress = () => {
    setCompletedChallenges([])
    setCurrentChallenge(null)
  }

  const getCategoryInfo = (category: string) => {
    return categories[category as keyof typeof categories]
  }

  const getDifficultyInfo = (difficulty: string) => {
    return difficulties[difficulty as keyof typeof difficulties]
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            Couple Challenges
          </CardTitle>
          <CardDescription>Fun activities and challenges to strengthen your relationship bond</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Choose Category</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All Categories
              </Button>
              {Object.entries(categories).map(([key, category]) => {
                const Icon = category.icon
                return (
                  <Button
                    key={key}
                    variant={selectedCategory === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(key)}
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {category.name}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Completed: {completedChallenges.length} / {challenges.length} challenges
            </div>
            {completedChallenges.length > 0 && (
              <Button variant="outline" size="sm" onClick={resetProgress}>
                Reset Progress
              </Button>
            )}
          </div>

          {/* Generate Challenge Button */}
          <Button onClick={getRandomChallenge} className="w-full bg-pink-600 hover:bg-pink-700">
            <Shuffle className="h-4 w-4 mr-2" />
            Get Random Challenge
          </Button>

          {/* Current Challenge */}
          <AnimatePresence>
            {currentChallenge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{currentChallenge.title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">{currentChallenge.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge className={getCategoryInfo(currentChallenge.category).color}>
                          {getCategoryInfo(currentChallenge.category).name}
                        </Badge>
                        <Badge variant="outline" className={getDifficultyInfo(currentChallenge.difficulty).color}>
                          {getDifficultyInfo(currentChallenge.difficulty).name}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {currentChallenge.duration}
                        </Badge>
                      </div>

                      {!completedChallenges.includes(currentChallenge.id) && (
                        <Button
                          onClick={() => markAsCompleted(currentChallenge.id)}
                          className="w-full"
                          variant="outline"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Completed
                        </Button>
                      )}

                      {completedChallenges.includes(currentChallenge.id) && (
                        <div className="text-center">
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed!
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Completed Challenges Summary */}
          {completedChallenges.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(categories).map(([key, category]) => {
                    const completedInCategory = challenges.filter(
                      (c) => c.category === key && completedChallenges.includes(c.id),
                    ).length
                    const totalInCategory = challenges.filter((c) => c.category === key).length
                    const Icon = category.icon

                    return (
                      <div key={key} className="text-center">
                        <div className={`inline-flex p-2 rounded-full ${category.color} text-white mb-2`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-medium">{category.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {completedInCategory}/{totalInCategory}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
