"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Quote, RefreshCw, Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

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
  {
    text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
    author: "Lao Tzu",
  },
  {
    text: "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.",
    author: "Maya Angelou",
  },
  {
    text: "The real lover is the man who can thrill you by kissing your forehead or smiling into your eyes or just staring into space.",
    author: "Marilyn Monroe",
  },
]

export function LoveQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [copied, setCopied] = useState(false)
  const [autoChange, setAutoChange] = useState(true)

  // Auto-change quotes every 4 seconds
  useEffect(() => {
    if (!autoChange) return

    const interval = setInterval(() => {
      getRandomQuote()
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [currentQuote, autoChange])

  const getRandomQuote = () => {
    setIsFlipped(true)
    setTimeout(() => {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * quotes.length)
      } while (newIndex === currentQuote && quotes.length > 1)
      setCurrentQuote(newIndex)
      setIsFlipped(false)
    }, 300)
  }

  const copyQuote = async () => {
    const quote = `"${quotes[currentQuote].text}" - ${quotes[currentQuote].author}`

    try {
      await navigator.clipboard.writeText(quote)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = quote
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
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
      copyQuote()
    }
  }

  const toggleAutoChange = () => {
    setAutoChange(!autoChange)
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isFlipped ? 0 : 1, y: isFlipped ? -20 : 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className={`relative overflow-hidden transition-all duration-300 transform cursor-pointer hover:shadow-lg ${
              isFlipped ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
            onClick={() => {
              setAutoChange(false)
              getRandomQuote()
            }}
          >
            <CardContent className="p-6 text-center space-y-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10">
              <Quote className="h-8 w-8 text-pink-400 mx-auto opacity-50" />
              <motion.p
                className="text-lg font-medium text-gray-700 dark:text-gray-200 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                "{quotes[currentQuote].text}"
              </motion.p>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Heart className="h-4 w-4 text-pink-500 mr-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{quotes[currentQuote].author}</p>
              </motion.div>

              {/* Auto-change indicator */}
              {autoChange && (
                <div className="absolute top-2 right-2">
                  <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse" />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center items-center space-x-2 flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setAutoChange(false)
            getRandomQuote()
          }}
          className="hover:bg-pink-50 hover:border-pink-200"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          New Quote
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={copyQuote}
          className={`hover:bg-pink-50 hover:border-pink-200 transition-all ${
            copied ? "bg-green-50 border-green-200 text-green-700" : ""
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </>
          )}
        </Button>

        <Button variant="outline" size="sm" onClick={shareQuote} className="hover:bg-pink-50 hover:border-pink-200">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>

        <Button
          variant={autoChange ? "default" : "outline"}
          size="sm"
          onClick={toggleAutoChange}
          className={autoChange ? "bg-pink-500 hover:bg-pink-600" : "hover:bg-pink-50 hover:border-pink-200"}
        >
          {autoChange ? "Auto On" : "Auto Off"}
        </Button>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {autoChange ? "Quotes change automatically every 4 seconds" : "Click quote or 'New Quote' to change"}
        </p>
      </div>
    </div>
  )
}
