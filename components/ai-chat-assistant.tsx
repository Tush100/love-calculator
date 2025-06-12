"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, X, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your love and relationship advisor! 💕 I'm here to help with relationship advice, love questions, and dating tips. What would you like to talk about?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Simple AI responses for love and relationship advice
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Love advice responses
    if (message.includes("love") || message.includes("relationship")) {
      const loveAdvice = [
        "Love is about understanding, patience, and growing together. What specific aspect of your relationship would you like to explore? 💕",
        "Every relationship has its ups and downs. Communication and trust are the foundations of lasting love. Tell me more about your situation! 💖",
        "Love isn't just about finding the right person, but being the right person too. What qualities do you value most in a partner? ✨",
        "Remember, healthy relationships require effort from both partners. What challenges are you facing in your love life? 💝",
      ]
      return loveAdvice[Math.floor(Math.random() * loveAdvice.length)]
    }

    // Dating advice
    if (message.includes("dating") || message.includes("date")) {
      const datingAdvice = [
        "Dating should be fun and authentic! Be yourself and look for someone who appreciates the real you. What kind of dating advice do you need? 🌹",
        "Great dates are about connection, not perfection. Focus on getting to know each other. What's your ideal date like? 💕",
        "The best relationships often start as friendships. Take your time and enjoy the process of getting to know someone! 🥰",
      ]
      return datingAdvice[Math.floor(Math.random() * datingAdvice.length)]
    }

    // Compatibility questions
    if (message.includes("compatible") || message.includes("match")) {
      return "Compatibility isn't just about similarities - it's about how well you complement each other! Shared values, good communication, and mutual respect matter most. What compatibility concerns do you have? 💫"
    }

    // Breakup/heartbreak support
    if (message.includes("breakup") || message.includes("heartbreak") || message.includes("sad")) {
      return "I'm sorry you're going through a tough time. Heartbreak is painful, but it's also a chance to grow and learn about yourself. Take time to heal, and remember that you deserve love and happiness. 💙"
    }

    // Marriage/commitment
    if (message.includes("marriage") || message.includes("commit")) {
      return "Marriage and commitment are beautiful when both partners are ready and willing to grow together. It's about choosing each other every day. What are your thoughts on commitment? 💍"
    }

    // General relationship problems
    if (message.includes("fight") || message.includes("argue") || message.includes("problem")) {
      return "Conflicts are normal in relationships - it's how you handle them that matters. Try to listen actively, express your feelings calmly, and work together toward solutions. What's the main issue you're facing? 🤝"
    }

    // Default responses
    const defaultResponses = [
      "That's interesting! Tell me more about how you're feeling about this situation. I'm here to help! 💕",
      "I'd love to help you with that! Can you share more details about what's on your mind? 🌟",
      "Every love story is unique! What specific advice or guidance are you looking for? 💖",
      "I'm here to support you through your relationship journey. What would you like to explore together? ✨",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getAIResponse(inputValue),
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    ) // Random delay between 1-3 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] md:w-96"
          >
            <Card className="shadow-2xl border-pink-200 dark:border-pink-800">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Heart className="h-5 w-5" />
                    Love Advisor AI
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.isUser
                              ? "bg-pink-500 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-1">
                            <Sparkles className="h-4 w-4 animate-pulse text-pink-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Thinking...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about love and relationships..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="icon"
                      className="bg-pink-500 hover:bg-pink-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
