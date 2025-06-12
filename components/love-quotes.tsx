"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Quote, RefreshCw, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const quotes = [
  {
    text: "Love is composed of a single soul inhabiting two bodies.",
    author: "Aristotle",
  },
  {
    text: "The best thing to hold onto in life is each other.",
    author: "Audrey Hepburn",
  },
  {
    text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    author: "Dr. Seuss",
  },
  {
    text: "To love and be loved is to feel the sun from both sides.",
    author: "David Viscott",
  },
  {
    text: "Love doesn't make the world go 'round. Love is what makes the ride worthwhile.",
    author: "Franklin P. Jones",
  },
  {
    text: "The greatest happiness of life is the conviction that we are loved; loved for ourselves, or rather, loved in spite of ourselves.",
    author: "Victor Hugo",
  },
  {
    text: "Love is when the other person's happiness is more important than your own.",
    author: "H. Jackson Brown Jr.",
  },
  {
    text: "The best and most beautiful things in this world cannot be seen or even heard, but must be felt with the heart.",
    author: "Helen Keller",
  },
  {
    text: "Love is like the wind, you can't see it but you can feel it.",
    author: "Nicholas Sparks",
  },
  {
    text: "I love you not because of who you are, but because of who I am when I am with you.",
    author: "Roy Croft",
  },
  {
    text: "If I know what love is, it is because of you.",
    author: "Hermann Hesse",
  },
  {
    text: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
    author: "Anonymous",
  },
]

export function LoveQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const getRandomQuote = () => {
    setIsFlipped(true)
    setTimeout(() => {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * quotes.length)
      } while (newIndex === currentQuote)
      setCurrentQuote(newIndex)
      setIsFlipped(false)
    }, 300)
  }

  const shareQuote = () => {
    const quote = `"${quotes[currentQuote].text}" - ${quotes[currentQuote].author}`
    if (navigator.share) {
      navigator
        .share({
          title: "Love Quote",
          text: quote,
        })
        .catch(console.error)
    } else {
      navigator.clipboard
        .writeText(quote)
        .then(() => {
          alert("Quote copied to clipboard!")
        })
        .catch(console.error)
    }
  }

  return (
    <div className="space-y-4">
      <Card
        className={`relative overflow-hidden transition-all duration-300 transform cursor-pointer ${
          isFlipped ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        onClick={getRandomQuote}
      >
        <CardContent className="p-6 text-center space-y-4">
          <Quote className="h-8 w-8 text-pink-400 mx-auto opacity-50" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">"{quotes[currentQuote].text}"</p>
          <div className="flex items-center justify-center">
            <Heart className="h-4 w-4 text-pink-500 mr-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">{quotes[currentQuote].author}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-2">
        <Button variant="outline" size="sm" onClick={getRandomQuote}>
          <RefreshCw className="h-4 w-4 mr-2" /> New Quote
        </Button>
        <Button variant="outline" size="sm" onClick={shareQuote}>
          <Share2 className="h-4 w-4 mr-2" /> Share
        </Button>
      </div>
    </div>
  )
}
