"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shuffle, Heart, Clock, Star, CheckCircle, Trophy, Sparkles, Target, Coffee, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Challenge {
  id: string
  title: string
  description: string
  category: "communication" | "fun" | "romantic" | "adventure" | "intimate"
  duration: string
  difficulty: "easy" | "medium" | "hard"
  points: number
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "20 Questions Deep Dive",
    description: "Take turns asking each other 20 meaningful questions you've never asked before. No phones allowed!",
    category: "communication",
    duration: "30-45 minutes",
    difficulty: "easy",
    points: 10,
  },
  {
    id: "2",
    title: "Cook Together Challenge",
    description:
      "Pick a cuisine you've never cooked before and make a meal together from scratch. No recipes allowed - just creativity!",
    category: "fun",
    duration: "2-3 hours",
    difficulty: "medium",
    points: 20,
  },
  {
    id: "3",
    title: "Love Letter Exchange",
    description: "Write heartfelt letters to each other about your favorite memories together and read them aloud.",
    category: "romantic",
    duration: "1 hour",
    difficulty: "easy",
    points: 15,
  },
  {
    id: "4",
    title: "Blindfolded Trust Walk",
    description:
      "Take turns being blindfolded while your partner guides you on a walk around your neighborhood or a park.",
    category: "adventure",
    duration: "45 minutes",
    difficulty: "medium",
    points: 25,
  },
  {
    id: "5",
    title: "Dream Board Creation",
    description: "Create a vision board together of your shared dreams and goals for the future.",
    category: "communication",
    duration: "2 hours",
    difficulty: "easy",
    points: 15,
  },
  {
    id: "6",
    title: "Sunrise or Sunset Date",
    description: "Wake up early to watch the sunrise together or plan a romantic sunset viewing with snacks.",
    category: "romantic",
    duration: "1-2 hours",
    difficulty: "easy",
    points: 20,
  },
  {
    id: "7",
    title: "Learn Something New Together",
    description: "Pick a skill neither of you knows and spend the day learning it together (dancing, painting, etc.).",
    category: "fun",
    duration: "3-4 hours",
    difficulty: "medium",
    points: 30,
  },
  {
    id: "8",
    title: "Memory Lane Photo Journey",
    description: "Go through old photos together and share the stories behind your favorite memories.",
    category: "intimate",
    duration: "1-2 hours",
    difficulty: "easy",
    points: 10,
  },
  {
    id: "9",
    title: "Random Acts of Kindness Day",
    description: "Spend a day doing random acts of kindness for strangers together and see how it affects your bond.",
    category: "adventure",
    duration: "Full day",
    difficulty: "medium",
    points: 35,
  },
  {
    id: "10",
    title: "Technology-Free Weekend",
    description: "Spend an entire weekend without phones, TV, or internet. Focus only on each other.",
    category: "intimate",
    duration: "48 hours",
    difficulty: "hard",
    points: 50,
  },
  {
    id: "11",
    title: "Appreciation Jar",
    description: "Write 10 things you appreciate about each other on separate papers and take turns reading them.",
    category: "communication",
    duration: "30 minutes",
    difficulty: "easy",
    points: 10,
  },
  {
    id: "12",
    title: "Adventure Scavenger Hunt",
    description: "Create a scavenger hunt for each other with clues leading to meaningful places in your relationship.",
    category: "adventure",
    duration: "2-3 hours",
    difficulty: "hard",
    points: 40,
  },
]

const categories = {
  communication: {
    name: "Communication",
    icon: MessageSquare,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  fun: {
    name: "Fun & Games",
    icon: Star,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  romantic: {
    name: "Romantic",
    icon: Heart,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
  },
  adventure: {
    name: "Adventure",
    icon: Target,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  intimate: {
    name: "Intimate",
    icon: Coffee,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
}

const difficulties = {
  easy: { name: "Easy", color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300", emoji: "😊" },
  medium: {
    name: "Medium",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    emoji: "🤔",
  },
  hard: { name: "Hard", color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300", emoji: "💪" },
}

export default function CoupleChallenges() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem("completedChallenges")
    if (saved) {
      const completed = JSON.parse(saved)
      setCompletedChallenges(completed)

      // Calculate total points
      const points = completed.reduce((total: number, challengeId: string) => {
        const challenge = challenges.find((c) => c.id === challengeId)
        return total + (challenge?.points || 0)
      }, 0)
      setTotalPoints(points)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("completedChallenges", JSON.stringify(completedChallenges))

    // Recalculate points
    const points = completedChallenges.reduce((total, challengeId) => {
      const challenge = challenges.find((c) => c.id === challengeId)
      return total + (challenge?.points || 0)
    }, 0)
    setTotalPoints(points)
  }, [completedChallenges])

  const getRandomChallenge = () => {
    const availableChallenges = challenges.filter((challenge) => {
      const categoryMatch = selectedCategory === "all" || challenge.category === selectedCategory
      const notCompleted = !completedChallenges.includes(challenge.id)
      return categoryMatch && notCompleted
    })

    if (availableChallenges.length === 0) {
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
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges((prev) => [...prev, challengeId])
    }
  }

  const resetProgress = () => {
    setCompletedChallenges([])
    setCurrentChallenge(null)
    setTotalPoints(0)
  }

  const getCategoryInfo = (category: string) => {
    return categories[category as keyof typeof categories]
  }

  const getDifficultyInfo = (difficulty: string) => {
    return difficulties[difficulty as keyof typeof difficulties]
  }

  const getLevel = (points: number) => {
    if (points >= 200) return { level: "Relationship Master", emoji: "👑", color: "from-yellow-500 to-yellow-600" }
    if (points >= 150) return { level: "Love Expert", emoji: "🏆", color: "from-purple-500 to-purple-600" }
    if (points >= 100) return { level: "Romance Pro", emoji: "💎", color: "from-blue-500 to-blue-600" }
    if (points >= 50) return { level: "Heart Warrior", emoji: "❤️", color: "from-red-500 to-red-600" }
    if (points >= 25) return { level: "Love Explorer", emoji: "🌟", color: "from-green-500 to-green-600" }
    return { level: "New Couple", emoji: "💕", color: "from-pink-500 to-pink-600" }
  }

  const currentLevel = getLevel(totalPoints)

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-6 w-6" />
            Couple Challenges
          </CardTitle>
          <CardDescription className="text-white/90">
            Fun activities and challenges to strengthen your relationship bond
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={`bg-gradient-to-r ${currentLevel.color} text-white`}>
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-1">{currentLevel.emoji}</div>
                <div className="font-semibold">{currentLevel.level}</div>
                <div className="text-sm opacity-90">{totalPoints} points</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-1">✅</div>
                <div className="font-semibold">Completed</div>
                <div className="text-sm opacity-90">
                  {completedChallenges.length} / {challenges.length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-1">🎯</div>
                <div className="font-semibold">Next Level</div>
                <div className="text-sm opacity-90">
                  {Math.max(0, [25, 50, 100, 150, 200].find((level) => level > totalPoints) || 200 - totalPoints)}{" "}
                  points
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Choose Category</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="h-auto py-2"
              >
                <Sparkles className="h-4 w-4 mr-1" />
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
                    className="h-auto py-2"
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {category.name}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Generate Challenge Button */}
          <Button
            onClick={getRandomChallenge}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 h-12 text-lg"
          >
            <Shuffle className="h-5 w-5 mr-2" />
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
                <Card className="border-2 border-pink-200 dark:border-pink-800 overflow-hidden">
                  <CardHeader
                    className={`bg-gradient-to-r ${getCategoryInfo(currentChallenge.category).color} text-white`}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {React.createElement(getCategoryInfo(currentChallenge.category).icon, { className: "h-5 w-5" })}
                        {currentChallenge.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-white/20 text-white">+{currentChallenge.points} pts</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{currentChallenge.description}</p>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className={getCategoryInfo(currentChallenge.category).bgColor}>
                          {getCategoryInfo(currentChallenge.category).name}
                        </Badge>
                        <Badge className={getDifficultyInfo(currentChallenge.difficulty).color}>
                          {getDifficultyInfo(currentChallenge.difficulty).emoji}{" "}
                          {getDifficultyInfo(currentChallenge.difficulty).name}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {currentChallenge.duration}
                        </Badge>
                      </div>

                      {!completedChallenges.includes(currentChallenge.id) ? (
                        <Button
                          onClick={() => markAsCompleted(currentChallenge.id)}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          size="lg"
                        >
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Mark as Completed (+{currentChallenge.points} points)
                        </Button>
                      ) : (
                        <div className="text-center">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 px-4 py-2">
                            <Trophy className="h-4 w-4 mr-1" />
                            Completed! +{currentChallenge.points} points earned
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset Button */}
          {completedChallenges.length > 0 && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={resetProgress}
                className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Reset All Progress
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
