"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, Trash2, ArrowRight, Share2, Star, Shuffle, Lightbulb, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CalculationResult {
  id: string
  maleName: string
  femaleName: string
  percentage: number
  date: string
}

interface FavoriteCouple {
  id: string
  maleName: string
  femaleName: string
  dateAdded: string
}

const maleNames = [
  "Alexander",
  "Benjamin",
  "Christopher",
  "Daniel",
  "Ethan",
  "Felix",
  "Gabriel",
  "Henry",
  "Isaac",
  "James",
  "Kevin",
  "Liam",
  "Michael",
  "Nathan",
  "Oliver",
  "Patrick",
  "Quinn",
  "Robert",
  "Samuel",
  "Thomas",
  "Victor",
  "William",
  "Xavier",
  "Zachary",
]

const femaleNames = [
  "Amelia",
  "Bella",
  "Charlotte",
  "Diana",
  "Emma",
  "Fiona",
  "Grace",
  "Hannah",
  "Isabella",
  "Julia",
  "Katherine",
  "Luna",
  "Mia",
  "Natalie",
  "Olivia",
  "Penelope",
  "Quinn",
  "Rachel",
  "Sophia",
  "Taylor",
  "Uma",
  "Victoria",
  "Willow",
  "Zoe",
]

const loveFacts = [
  "Did you know? Couples who laugh together stay together longer!",
  "Fun fact: Your heart beats faster when you see someone you love.",
  "Love fact: Holding hands can actually reduce stress and pain.",
  "Amazing: Love is literally a drug - it releases dopamine in your brain!",
  "Sweet fact: Couples who are in love synchronize their heart rates.",
  "Love trivia: It takes only 4 minutes to decide if you like someone.",
  "Romantic fact: Love at first sight is actually scientifically possible!",
  "Did you know? Butterflies in your stomach are real - it's your nervous system!",
  "Love science: Being in love can make you feel less pain.",
  "Fun fact: Love songs make up about 40% of all popular music!",
]

export default function LoveCalculator() {
  const [maleName, setMaleName] = useState("")
  const [femaleName, setFemaleName] = useState("")
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [history, setHistory] = useState<CalculationResult[]>([])
  const [favorites, setFavorites] = useState<FavoriteCouple[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [activeTab, setActiveTab] = useState("calculator")
  const [currentFact, setCurrentFact] = useState(0)
  const [copied, setCopied] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("loveCalculatorHistory")
    const savedFavorites = localStorage.getItem("loveCalculatorFavorites")

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("loveCalculatorHistory", JSON.stringify(history))
  }, [history])

  useEffect(() => {
    localStorage.setItem("loveCalculatorFavorites", JSON.stringify(favorites))
  }, [favorites])

  // Rotate fun facts every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % loveFacts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const calculateLove = () => {
    if (!maleName.trim() || !femaleName.trim()) return

    setIsCalculating(true)

    setTimeout(() => {
      const combinedNames = `${maleName.toLowerCase()}${femaleName.toLowerCase()}`
      let hash = 0

      for (let i = 0; i < combinedNames.length; i++) {
        hash = combinedNames.charCodeAt(i) + ((hash << 5) - hash)
      }

      const percentage = Math.abs(hash % 101)

      const newResult = {
        id: Date.now().toString(),
        maleName,
        femaleName,
        percentage,
        date: new Date().toLocaleString(),
      }

      setResult(newResult)
      setHistory((prev) => [newResult, ...prev])
      setIsCalculating(false)
    }, 1500)
  }

  const generateRandomNames = () => {
    const randomMale = maleNames[Math.floor(Math.random() * maleNames.length)]
    const randomFemale = femaleNames[Math.floor(Math.random() * femaleNames.length)]
    setMaleName(randomMale)
    setFemaleName(randomFemale)
  }

  const addToFavorites = () => {
    if (!maleName.trim() || !femaleName.trim()) return

    const newFavorite = {
      id: Date.now().toString(),
      maleName,
      femaleName,
      dateAdded: new Date().toLocaleString(),
    }

    setFavorites((prev) => [newFavorite, ...prev])
  }

  const loadFavorite = (favorite: FavoriteCouple) => {
    setMaleName(favorite.maleName)
    setFemaleName(favorite.femaleName)
    setActiveTab("calculator")
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id))
  }

  const shareResult = async () => {
    if (!result) return

    const shareText = `${result.maleName} ❤️ ${result.femaleName} = ${result.percentage}% Love Match! 💕 Check your compatibility at Love Calculator!`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Love Calculator Result",
          text: shareText,
        })
      } catch (err) {
        copyToClipboard(shareText)
      }
    } else {
      copyToClipboard(shareText)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("loveCalculatorHistory")
  }

  const clearFavorites = () => {
    setFavorites([])
    localStorage.removeItem("loveCalculatorFavorites")
  }

  const isFavorite = favorites.some(
    (fav) =>
      fav.maleName.toLowerCase() === maleName.toLowerCase() &&
      fav.femaleName.toLowerCase() === femaleName.toLowerCase(),
  )

  return (
    <div className="space-y-6">
      {/* Fun Facts Section */}
      <Card className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-pink-700 dark:text-pink-300">Love Fact</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentFact}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              {loveFacts[currentFact]}
            </motion.p>
          </AnimatePresence>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Check Your Love Compatibility</CardTitle>
              <CardDescription>Enter two names to calculate your love percentage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maleName">Male Name</Label>
                <Input
                  id="maleName"
                  placeholder="Enter male name"
                  value={maleName}
                  onChange={(e) => setMaleName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="femaleName">Female Name</Label>
                <Input
                  id="femaleName"
                  placeholder="Enter female name"
                  value={femaleName}
                  onChange={(e) => setFemaleName(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={generateRandomNames} className="flex-1">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Random Names
                </Button>
                <Button
                  variant="outline"
                  onClick={addToFavorites}
                  disabled={!maleName.trim() || !femaleName.trim() || isFavorite}
                  className="flex-1"
                >
                  <Star className={`h-4 w-4 mr-2 ${isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  {isFavorite ? "Favorited" : "Add to Favorites"}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Button
                  onClick={calculateLove}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                  disabled={!maleName.trim() || !femaleName.trim() || isCalculating}
                >
                  {isCalculating ? (
                    <span className="flex items-center">
                      Calculating
                      <motion.span
                        className="ml-2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                      >
                        ❤️
                      </motion.span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Calculate Love <Heart className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                    <CardTitle className="text-center">Love Result</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-2 text-lg font-medium">
                        <span>{result.maleName}</span>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                        >
                          <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
                        </motion.div>
                        <span>{result.femaleName}</span>
                      </div>

                      <div className="relative pt-4">
                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full relative"
                            initial={{ width: "0%" }}
                            animate={{ width: `${result.percentage}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
                            />
                          </motion.div>
                        </div>

                        <div className="flex justify-center mt-4">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: 0 }}
                              animate={{
                                scale: result.percentage > (i + 1) * 20 ? 1 : 0.3,
                                rotate: result.percentage > (i + 1) * 20 ? 360 : 0,
                              }}
                              transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                            >
                              <Heart
                                className={`h-6 w-6 mx-1 ${
                                  result.percentage > (i + 1) * 20 ? "text-pink-500 fill-pink-500" : "text-gray-300"
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>

                        <motion.p
                          className="text-4xl font-bold mt-4 text-pink-600"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1.5, duration: 0.5 }}
                        >
                          {result.percentage}%
                        </motion.p>
                        <LoveMessage percentage={result.percentage} />
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                        className="pt-4"
                      >
                        <Button onClick={shareResult} variant="outline" className="w-full">
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Copied to Clipboard!
                            </>
                          ) : (
                            <>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share Result
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Favorite Couples</CardTitle>
                <CardDescription>Your saved name combinations</CardDescription>
              </div>
              {favorites.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFavorites}
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Clear All
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-muted-foreground">No favorite couples yet. Add some from the calculator!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.map((favorite) => (
                    <Card key={favorite.id} className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-2" />
                            <span className="font-medium">{favorite.maleName}</span>
                            <ArrowRight className="h-4 w-4 mx-1 text-pink-500" />
                            <span className="font-medium">{favorite.femaleName}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => loadFavorite(favorite)}>
                              Use
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFavorite(favorite.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Added: {favorite.dateAdded}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Calculation History</CardTitle>
                <CardDescription>Your previous love calculations</CardDescription>
              </div>
              {history.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearHistory}
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Clear
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-muted-foreground">No calculations yet. Try calculating some love matches!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item) => (
                    <Card key={item.id} className="bg-white/50 dark:bg-gray-800/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="font-medium">{item.maleName}</span>
                            <ArrowRight className="h-4 w-4 mx-1 text-pink-500" />
                            <span className="font-medium">{item.femaleName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getCompatibilityBadge(item.percentage)}>
                              {getCompatibilityLabel(item.percentage)}
                            </Badge>
                            <div className="flex items-center">
                              <Heart className={`h-4 w-4 mr-1 ${getHeartColor(item.percentage)}`} fill="currentColor" />
                              <span className="font-bold">{item.percentage}%</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LoveMessage({ percentage }: { percentage: number }) {
  let message = ""

  if (percentage < 20) {
    message = "Just friends... for now. 🤝"
  } else if (percentage < 40) {
    message = "There's potential. Give it time! 🌱"
  } else if (percentage < 60) {
    message = "Good compatibility. Worth exploring! 🌟"
  } else if (percentage < 80) {
    message = "Great match! You two click well together. ✨"
  } else {
    message = "Perfect match! Soulmates found! 💫"
  }

  return (
    <motion.p
      className="text-sm mt-2 text-gray-600 dark:text-gray-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      {message}
    </motion.p>
  )
}

function getHeartColor(percentage: number): string {
  if (percentage < 20) return "text-gray-400"
  if (percentage < 40) return "text-pink-300"
  if (percentage < 60) return "text-pink-400"
  if (percentage < 80) return "text-pink-500"
  return "text-pink-600"
}

function getCompatibilityLabel(percentage: number): string {
  if (percentage < 20) return "Friends"
  if (percentage < 40) return "Potential"
  if (percentage < 60) return "Good"
  if (percentage < 80) return "Great"
  return "Perfect"
}

function getCompatibilityBadge(percentage: number): "secondary" | "outline" | "default" {
  if (percentage < 40) return "secondary"
  if (percentage < 80) return "outline"
  return "default"
}
