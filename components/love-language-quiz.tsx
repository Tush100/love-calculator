"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Heart, Gift, Clock, HandHeart, MessageSquareText } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "What makes you feel most loved in a relationship?",
    options: [
      { id: "a", text: "When my partner tells me they love me and appreciate me", type: "words" },
      { id: "b", text: "When my partner gives me their undivided attention", type: "time" },
      { id: "c", text: "When my partner gives me thoughtful gifts", type: "gifts" },
      { id: "d", text: "When my partner helps me with tasks or chores", type: "service" },
      { id: "e", text: "When my partner holds my hand or hugs me", type: "touch" },
    ],
  },
  {
    id: 2,
    question: "How do you typically express affection to others?",
    options: [
      { id: "a", text: "I tell them how much they mean to me", type: "words" },
      { id: "b", text: "I spend quality time with them", type: "time" },
      { id: "c", text: "I give them meaningful gifts", type: "gifts" },
      { id: "d", text: "I do helpful things for them", type: "service" },
      { id: "e", text: "I give hugs or physical affection", type: "touch" },
    ],
  },
  {
    id: 3,
    question: "What hurts your feelings the most in a relationship?",
    options: [
      { id: "a", text: "When my partner rarely compliments me or says 'I love you'", type: "words" },
      { id: "b", text: "When my partner is always busy or distracted", type: "time" },
      { id: "c", text: "When my partner forgets special occasions", type: "gifts" },
      { id: "d", text: "When my partner doesn't help me when I need it", type: "service" },
      { id: "e", text: "When my partner rarely initiates physical contact", type: "touch" },
    ],
  },
  {
    id: 4,
    question: "What do you appreciate most from your partner?",
    options: [
      { id: "a", text: "Hearing words of encouragement and affirmation", type: "words" },
      { id: "b", text: "Having their full attention during conversations", type: "time" },
      { id: "c", text: "Receiving thoughtful, unexpected gifts", type: "gifts" },
      { id: "d", text: "When they take care of something without being asked", type: "service" },
      { id: "e", text: "Physical closeness and affection", type: "touch" },
    ],
  },
  {
    id: 5,
    question: "What would make a perfect day for you?",
    options: [
      { id: "a", text: "Hearing how special you are and receiving compliments", type: "words" },
      { id: "b", text: "Spending uninterrupted time together doing activities", type: "time" },
      { id: "c", text: "Exchanging meaningful gifts with each other", type: "gifts" },
      { id: "d", text: "Having someone take care of your responsibilities for the day", type: "service" },
      { id: "e", text: "Lots of physical affection and closeness", type: "touch" },
    ],
  },
]

const loveLanguages = {
  words: {
    title: "Words of Affirmation",
    description:
      "You value verbal expressions of love. Compliments, words of appreciation, and hearing 'I love you' are important to you.",
    icon: MessageSquareText,
    tips: [
      "Leave notes for your partner expressing your feelings",
      "Verbally acknowledge the things you appreciate about them",
      "Remember to say 'I love you' regularly",
    ],
  },
  time: {
    title: "Quality Time",
    description:
      "You value undivided attention and spending meaningful time together. Being fully present with each other matters most to you.",
    icon: Clock,
    tips: [
      "Schedule regular date nights without distractions",
      "Create rituals of connection like morning coffee together",
      "Plan activities that allow for good conversation",
    ],
  },
  gifts: {
    title: "Receiving Gifts",
    description:
      "You value thoughtful gifts as symbols of love. It's not about materialism but the thought behind the gift that matters to you.",
    icon: Gift,
    tips: [
      "Keep a list of things your partner mentions wanting",
      "Give small, thoughtful gifts regularly, not just on special occasions",
      "The thought and effort matter more than the price",
    ],
  },
  service: {
    title: "Acts of Service",
    description:
      "You value when your partner does helpful things for you. Actions speak louder than words in your love language.",
    icon: HandHeart,
    tips: [
      "Look for ways to make your partner's life easier",
      "Complete tasks they dislike doing",
      "Ask specifically what would be most helpful to them",
    ],
  },
  touch: {
    title: "Physical Touch",
    description:
      "You value physical closeness and touch. Hugs, holding hands, and physical affection make you feel most connected.",
    icon: Heart,
    tips: [
      "Hold hands when walking together",
      "Offer hugs and kisses throughout the day",
      "Sit close to each other when watching TV or talking",
    ],
  },
}

export default function LoveLanguageQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [results, setResults] = useState<Record<string, number> | null>(null)
  const [primaryLanguage, setPrimaryLanguage] = useState<string | null>(null)

  const handleAnswer = (questionId: number, answerType: string) => {
    setAnswers({ ...answers, [questionId]: answerType })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = () => {
    const counts: Record<string, number> = {
      words: 0,
      time: 0,
      gifts: 0,
      service: 0,
      touch: 0,
    }

    Object.values(answers).forEach((type) => {
      if (type in counts) {
        counts[type]++
      }
    })

    setResults(counts)

    // Find primary love language
    let maxCount = 0
    let primary = ""
    Object.entries(counts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count
        primary = type
      }
    })

    setPrimaryLanguage(primary)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setResults(null)
    setPrimaryLanguage(null)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (results && primaryLanguage) {
    const language = loveLanguages[primaryLanguage as keyof typeof loveLanguages]
    const Icon = language.icon

    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-pink-600 dark:text-pink-400">Your Love Language Results</CardTitle>
          <CardDescription>Based on your answers, we've identified your primary love language</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center p-6 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
            <div className="h-16 w-16 rounded-full bg-pink-100 dark:bg-pink-800 flex items-center justify-center mb-4">
              <Icon className="h-8 w-8 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-center">{language.title}</h3>
            <p className="text-center mt-2 text-gray-600 dark:text-gray-300">{language.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {Object.entries(results).map(([type, count]) => {
              const percent = (count / questions.length) * 100
              return (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{loveLanguages[type as keyof typeof loveLanguages].title}</span>
                    <span>{percent.toFixed(0)}%</span>
                  </div>
                  <Progress value={percent} className="h-2" />
                </div>
              )
            })}
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Tips for Your Love Language:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {language.tips.map((tip, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={restartQuiz} className="w-full">
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-pink-600 dark:text-pink-400">Love Language Quiz</CardTitle>
        <CardDescription className="text-center">
          Discover how you prefer to give and receive love in relationships
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>
          <RadioGroup
            value={answers[questions[currentQuestion].id]}
            onValueChange={(value) => handleAnswer(questions[currentQuestion].id, value)}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.type} id={`q${questions[currentQuestion].id}-${option.id}`} />
                <Label htmlFor={`q${questions[currentQuestion].id}-${option.id}`} className="flex-1">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!answers[questions[currentQuestion].id]}>
          {currentQuestion < questions.length - 1 ? "Next" : "See Results"}
        </Button>
      </CardFooter>
    </Card>
  )
}
