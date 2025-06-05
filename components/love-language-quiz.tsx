"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, MessageCircle, Gift, Clock, HandHeart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const loveLanguages = {
  "words-of-affirmation": {
    name: "Words of Affirmation",
    icon: MessageCircle,
    color: "bg-blue-500",
    description:
      "You feel most loved when your partner expresses their feelings through words, compliments, and verbal appreciation.",
    tips: [
      "Leave sweet notes for your partner",
      "Give genuine compliments daily",
      "Express gratitude verbally",
      "Send loving text messages",
    ],
  },
  "quality-time": {
    name: "Quality Time",
    icon: Clock,
    color: "bg-green-500",
    description:
      "You feel most loved when your partner gives you their undivided attention and spends meaningful time together.",
    tips: [
      "Plan regular date nights",
      "Put away devices during conversations",
      "Take walks together",
      "Share activities you both enjoy",
    ],
  },
  "physical-touch": {
    name: "Physical Touch",
    icon: HandHeart,
    color: "bg-pink-500",
    description: "You feel most loved through physical affection like hugs, kisses, holding hands, and cuddling.",
    tips: [
      "Hold hands while walking",
      "Give spontaneous hugs",
      "Cuddle while watching movies",
      "Offer back rubs or massages",
    ],
  },
  "acts-of-service": {
    name: "Acts of Service",
    icon: Heart,
    color: "bg-purple-500",
    description: "You feel most loved when your partner does thoughtful things to help and support you.",
    tips: [
      "Help with household chores",
      "Bring coffee in the morning",
      "Run errands for your partner",
      "Cook their favorite meal",
    ],
  },
  "receiving-gifts": {
    name: "Receiving Gifts",
    icon: Gift,
    color: "bg-orange-500",
    description:
      "You feel most loved when your partner gives you thoughtful gifts that show they were thinking of you.",
    tips: [
      "Give small, meaningful gifts",
      "Remember special occasions",
      "Bring home their favorite treat",
      "Create handmade gifts",
    ],
  },
}

const questions = [
  {
    question: "What makes you feel most appreciated in a relationship?",
    options: [
      { text: "Hearing 'I love you' and other affirming words", language: "words-of-affirmation" },
      { text: "Spending uninterrupted time together", language: "quality-time" },
      { text: "Receiving hugs, kisses, and physical affection", language: "physical-touch" },
      { text: "Having your partner help with tasks", language: "acts-of-service" },
      { text: "Receiving thoughtful gifts or surprises", language: "receiving-gifts" },
    ],
  },
  {
    question: "When you're feeling down, what would comfort you most?",
    options: [
      { text: "Encouraging words and verbal support", language: "words-of-affirmation" },
      { text: "Having someone sit with you and listen", language: "quality-time" },
      { text: "A warm hug or comforting touch", language: "physical-touch" },
      { text: "Someone taking care of your responsibilities", language: "acts-of-service" },
      { text: "A small gift to cheer you up", language: "receiving-gifts" },
    ],
  },
  {
    question: "What would be the perfect way to celebrate an anniversary?",
    options: [
      { text: "Writing heartfelt letters to each other", language: "words-of-affirmation" },
      { text: "Spending the whole day together doing favorite activities", language: "quality-time" },
      { text: "A romantic evening with lots of cuddling", language: "physical-touch" },
      { text: "Having your partner plan everything for you", language: "acts-of-service" },
      { text: "Exchanging meaningful gifts", language: "receiving-gifts" },
    ],
  },
  {
    question: "What bothers you most in a relationship?",
    options: [
      { text: "Lack of verbal appreciation or criticism", language: "words-of-affirmation" },
      { text: "Not spending enough quality time together", language: "quality-time" },
      { text: "Lack of physical affection", language: "physical-touch" },
      { text: "Partner not helping when you need support", language: "acts-of-service" },
      { text: "Forgetting special occasions or never giving gifts", language: "receiving-gifts" },
    ],
  },
  {
    question: "How do you prefer to show love to others?",
    options: [
      { text: "Telling them how much they mean to you", language: "words-of-affirmation" },
      { text: "Spending quality time and giving full attention", language: "quality-time" },
      { text: "Through hugs, kisses, and physical closeness", language: "physical-touch" },
      { text: "By doing things to help and support them", language: "acts-of-service" },
      { text: "By giving thoughtful gifts and surprises", language: "receiving-gifts" },
    ],
  },
]

export default function LoveLanguageQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const handleAnswer = (language: string) => {
    const newAnswers = [...answers, language]
    setAnswers(newAnswers)

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
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
    setIsComplete(false)
  }

  const progress = ((currentQuestion + (isComplete ? 1 : 0)) / questions.length) * 100

  if (isComplete && result) {
    const resultLanguage = loveLanguages[result as keyof typeof loveLanguages]
    const Icon = resultLanguage.icon

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Your Love Language Result</CardTitle>
            <CardDescription className="text-center">
              Based on your answers, here's your primary love language
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`inline-flex p-4 rounded-full ${resultLanguage.color} text-white mb-4`}>
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{resultLanguage.name}</h3>
              <p className="text-muted-foreground">{resultLanguage.description}</p>
            </div>

            <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Ways to strengthen your relationship:</h4>
                <ul className="space-y-2">
                  {resultLanguage.tips.map((tip, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-pink-500 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button onClick={resetQuiz} variant="outline">
                Take Quiz Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            Love Language Quiz
          </CardTitle>
          <CardDescription>Discover how you prefer to give and receive love</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold">{questions[currentQuestion].question}</h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-4 whitespace-normal"
                    onClick={() => handleAnswer(option.language)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
