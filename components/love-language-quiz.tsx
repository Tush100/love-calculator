"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, MessageCircle, Gift, Clock, HandHeart, Star, Trophy, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const loveLanguages = {
  "words-of-affirmation": {
    name: "Words of Affirmation",
    icon: MessageCircle,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    description:
      "You feel most loved when your partner expresses their feelings through words, compliments, and verbal appreciation.",
    tips: [
      "Leave sweet notes for your partner",
      "Give genuine compliments daily",
      "Express gratitude verbally",
      "Send loving text messages",
      "Say 'I love you' often and mean it",
    ],
    emoji: "💬",
  },
  "quality-time": {
    name: "Quality Time",
    icon: Clock,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    description:
      "You feel most loved when your partner gives you their undivided attention and spends meaningful time together.",
    tips: [
      "Plan regular date nights",
      "Put away devices during conversations",
      "Take walks together",
      "Share activities you both enjoy",
      "Create daily connection rituals",
    ],
    emoji: "⏰",
  },
  "physical-touch": {
    name: "Physical Touch",
    icon: HandHeart,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    description: "You feel most loved through physical affection like hugs, kisses, holding hands, and cuddling.",
    tips: [
      "Hold hands while walking",
      "Give spontaneous hugs",
      "Cuddle while watching movies",
      "Offer back rubs or massages",
      "Sit close to each other",
    ],
    emoji: "🤗",
  },
  "acts-of-service": {
    name: "Acts of Service",
    icon: Heart,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    description: "You feel most loved when your partner does thoughtful things to help and support you.",
    tips: [
      "Help with household chores",
      "Bring coffee in the morning",
      "Run errands for your partner",
      "Cook their favorite meal",
      "Take care of tasks they dislike",
    ],
    emoji: "🛠️",
  },
  "receiving-gifts": {
    name: "Receiving Gifts",
    icon: Gift,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    description:
      "You feel most loved when your partner gives you thoughtful gifts that show they were thinking of you.",
    tips: [
      "Give small, meaningful gifts",
      "Remember special occasions",
      "Bring home their favorite treat",
      "Create handmade gifts",
      "The thought matters more than price",
    ],
    emoji: "🎁",
  },
}

const questions = [
  {
    question: "What makes you feel most appreciated in a relationship?",
    options: [
      { text: "Hearing 'I love you' and other affirming words", language: "words-of-affirmation", emoji: "💬" },
      { text: "Spending uninterrupted time together", language: "quality-time", emoji: "⏰" },
      { text: "Receiving hugs, kisses, and physical affection", language: "physical-touch", emoji: "🤗" },
      { text: "Having your partner help with tasks", language: "acts-of-service", emoji: "🛠️" },
      { text: "Receiving thoughtful gifts or surprises", language: "receiving-gifts", emoji: "🎁" },
    ],
  },
  {
    question: "When you're feeling down, what would comfort you most?",
    options: [
      { text: "Encouraging words and verbal support", language: "words-of-affirmation", emoji: "💬" },
      { text: "Having someone sit with you and listen", language: "quality-time", emoji: "⏰" },
      { text: "A warm hug or comforting touch", language: "physical-touch", emoji: "🤗" },
      { text: "Someone taking care of your responsibilities", language: "acts-of-service", emoji: "🛠️" },
      { text: "A small gift to cheer you up", language: "receiving-gifts", emoji: "🎁" },
    ],
  },
  {
    question: "What would be the perfect way to celebrate an anniversary?",
    options: [
      { text: "Writing heartfelt letters to each other", language: "words-of-affirmation", emoji: "💬" },
      { text: "Spending the whole day together doing favorite activities", language: "quality-time", emoji: "⏰" },
      { text: "A romantic evening with lots of cuddling", language: "physical-touch", emoji: "🤗" },
      { text: "Having your partner plan everything for you", language: "acts-of-service", emoji: "🛠️" },
      { text: "Exchanging meaningful gifts", language: "receiving-gifts", emoji: "🎁" },
    ],
  },
  {
    question: "What bothers you most in a relationship?",
    options: [
      { text: "Lack of verbal appreciation or criticism", language: "words-of-affirmation", emoji: "💬" },
      { text: "Not spending enough quality time together", language: "quality-time", emoji: "⏰" },
      { text: "Lack of physical affection", language: "physical-touch", emoji: "🤗" },
      { text: "Partner not helping when you need support", language: "acts-of-service", emoji: "🛠️" },
      { text: "Forgetting special occasions or never giving gifts", language: "receiving-gifts", emoji: "🎁" },
    ],
  },
  {
    question: "How do you prefer to show love to others?",
    options: [
      { text: "Telling them how much they mean to you", language: "words-of-affirmation", emoji: "💬" },
      { text: "Spending quality time and giving full attention", language: "quality-time", emoji: "⏰" },
      { text: "Through hugs, kisses, and physical closeness", language: "physical-touch", emoji: "🤗" },
      { text: "By doing things to help and support them", language: "acts-of-service", emoji: "🛠️" },
      { text: "By giving thoughtful gifts and surprises", language: "receiving-gifts", emoji: "🎁" },
    ],
  },
]

export default function LoveLanguageQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleAnswer = (language: string) => {
    setSelectedOption(language)

    setTimeout(() => {
      const newAnswers = [...answers, language]
      setAnswers(newAnswers)
      setSelectedOption(null)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Calculate result
        const counts = newAnswers.reduce(
          (acc, lang) => {
            acc[lang] = (acc[lang] || 0) + 1
            return acc
          },
          {} as Record<string, number>,
        )

        const topLanguage = Object.entries(counts).reduce((a, b) => (counts[a[0]] > counts[b[0]] ? a : b))[0]

        setResult(topLanguage)
        setIsComplete(true)
      }
    }, 500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
    setIsComplete(false)
    setSelectedOption(null)
  }

  const progress = ((currentQuestion + (isComplete ? 1 : 0)) / questions.length) * 100

  if (isComplete && result) {
    const resultLanguage = loveLanguages[result as keyof typeof loveLanguages]
    const Icon = resultLanguage.icon

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <Card className="overflow-hidden">
          <CardHeader className={`bg-gradient-to-r ${resultLanguage.color} text-white text-center`}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
              <Trophy className="h-12 w-12 mx-auto mb-2" />
            </motion.div>
            <CardTitle className="text-2xl">Your Love Language Result!</CardTitle>
            <CardDescription className="text-white/90">Discover how you give and receive love best</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-xl ${resultLanguage.bgColor} border-2 border-dashed border-current`}
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{resultLanguage.emoji}</div>
                <div
                  className={`inline-flex p-3 rounded-full bg-gradient-to-r ${resultLanguage.color} text-white mb-3`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{resultLanguage.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{resultLanguage.description}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-pink-500" />
                    Ways to strengthen your relationships:
                  </h4>
                  <div className="grid gap-2">
                    {resultLanguage.tips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="text-center space-y-3">
              <Button onClick={resetQuiz} variant="outline" className="w-full" size="lg">
                Take Quiz Again
              </Button>
              <p className="text-xs text-gray-500">
                Share your result with your partner to better understand each other! 💕
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-6 w-6" />
            Love Language Quiz
          </CardTitle>
          <CardDescription className="text-white/90">Discover how you prefer to give and receive love</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{questions[currentQuestion].question}</h3>
                <p className="text-gray-600 dark:text-gray-400">Choose the option that resonates most with you</p>
              </div>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className={`w-full text-left justify-start h-auto p-4 whitespace-normal transition-all hover:scale-[1.02] ${
                        selectedOption === option.language
                          ? "bg-gradient-to-r from-pink-100 to-purple-100 border-pink-300 dark:from-pink-900/20 dark:to-purple-900/20"
                          : ""
                      }`}
                      onClick={() => handleAnswer(option.language)}
                      disabled={selectedOption !== null}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="flex-1">{option.text}</span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
