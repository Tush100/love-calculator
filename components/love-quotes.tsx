"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const loveQuotes = [
  "Love is composed of a single soul inhabiting two bodies. - Aristotle",
  "Where there is love there is life. - Mahatma Gandhi",
  "The best thing to hold onto in life is each other. - Audrey Hepburn",
  "To love and be loved is to feel the sun from both sides. - David Viscott",
  "Love is when the other person's happiness is more important than your own. - H. Jackson Brown Jr.",
  "You know you're in love when you can't fall asleep because reality is finally better than your dreams. - Dr. Seuss",
  "The greatest happiness of life is the conviction that we are loved. - Victor Hugo",
  "Love is like the wind, you can't see it but you can feel it. - Nicholas Sparks",
  "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
  "I love you not because of who you are, but because of who I am when I am with you.",
  "Love is a canvas furnished by nature and embroidered by imagination. - Voltaire",
  "The best love is the kind that awakens the soul and makes us reach for more. - Nicholas Sparks",
]

export function LoveQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextQuote = () => {
    setDirection(1)
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % loveQuotes.length)
    }, 300)
  }

  return (
    <Card
      className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 cursor-pointer overflow-hidden"
      onClick={nextQuote}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Quote className="h-4 w-4 text-pink-500" />
          <span className="text-sm font-medium text-pink-700 dark:text-pink-300">Love Quote</span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={currentQuote}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 100 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-gray-700 dark:text-gray-300 italic"
          >
            {loveQuotes[currentQuote]}
          </motion.p>
        </AnimatePresence>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">Click for more quotes</p>
      </CardContent>
    </Card>
  )
}
