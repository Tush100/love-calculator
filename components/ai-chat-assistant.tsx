"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, X, Sparkles, Bot, Plus, History, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  lastUpdated: Date
}

// Simple markdown-like formatting function
const formatAIResponse = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic text
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>') // Inline code
    .replace(/\n\n/g, '</p><p class="mb-2">') // Paragraphs
    .replace(/\n/g, "<br>") // Line breaks
    .replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>') // Bullet points
}

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 💕 I'm your personal love and relationship advisor powered by AI. I'm here to help with dating advice, relationship guidance, love compatibility insights, and emotional support. What's on your heart today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Load chat sessions from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem("lovecalculator-chat-sessions")
    if (savedSessions) {
      const sessions = JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        lastUpdated: new Date(session.lastUpdated),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }))
      setChatSessions(sessions)
    }
  }, [])

  // Save chat sessions to localStorage
  const saveSessions = (sessions: ChatSession[]) => {
    localStorage.setItem("lovecalculator-chat-sessions", JSON.stringify(sessions))
    setChatSessions(sessions)
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [
        {
          id: "1",
          text: "Hi there! 💕 I'm your personal love and relationship advisor. I'm here to help with dating advice, relationship guidance, love compatibility insights, and emotional support. What's on your heart today?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      lastUpdated: new Date(),
    }

    const updatedSessions = [newSession, ...chatSessions]
    saveSessions(updatedSessions)
    setCurrentSessionId(newSession.id)
    setMessages(newSession.messages)
    setShowHistory(false)
  }

  const loadChatSession = (sessionId: string) => {
    const session = chatSessions.find((s) => s.id === sessionId)
    if (session) {
      setCurrentSessionId(sessionId)
      setMessages(session.messages)
      setShowHistory(false)
    }
  }

  const deleteChatSession = (sessionId: string) => {
    const updatedSessions = chatSessions.filter((s) => s.id !== sessionId)
    saveSessions(updatedSessions)

    if (currentSessionId === sessionId) {
      if (updatedSessions.length > 0) {
        loadChatSession(updatedSessions[0].id)
      } else {
        createNewChat()
      }
    }
  }

  const updateCurrentSession = (newMessages: Message[]) => {
    if (!currentSessionId) return

    const updatedSessions = chatSessions.map((session) => {
      if (session.id === currentSessionId) {
        // Generate title from first user message
        const firstUserMessage = newMessages.find((m) => m.isUser)
        const title = firstUserMessage
          ? firstUserMessage.text.slice(0, 30) + (firstUserMessage.text.length > 30 ? "..." : "")
          : "New Chat"

        return {
          ...session,
          title,
          messages: newMessages,
          lastUpdated: new Date(),
        }
      }
      return session
    })

    saveSessions(updatedSessions)
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputValue("")
    setIsTyping(true)

    // Create new session if none exists
    if (!currentSessionId) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: inputValue.slice(0, 30) + (inputValue.length > 30 ? "..." : ""),
        messages: newMessages,
        createdAt: new Date(),
        lastUpdated: new Date(),
      }
      const updatedSessions = [newSession, ...chatSessions]
      saveSessions(updatedSessions)
      setCurrentSessionId(newSession.id)
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        isUser: false,
        timestamp: new Date(),
      }

      const finalMessages = [...newMessages, aiMessage]
      setMessages(finalMessages)
      updateCurrentSession(finalMessages)
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now, but I'm here for you! 💕 Please try asking your relationship question again in a moment.",
        isUser: false,
        timestamp: new Date(),
      }
      const finalMessages = [...newMessages, errorMessage]
      setMessages(finalMessages)
      updateCurrentSession(finalMessages)
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-xl border-4 border-white dark:border-gray-800"
          size="icon"
        >
          <div className="relative">
            <MessageCircle className="h-7 w-7" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse" />
          </div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] md:w-96"
          >
            <Card className="shadow-2xl border-pink-200 dark:border-pink-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="relative">
                      <Bot className="h-6 w-6" />
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full" />
                    </div>
                    Love Advisor AI
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowHistory(!showHistory)}
                      className="text-white hover:bg-white/20 h-8 w-8"
                    >
                      <History className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={createNewChat}
                      className="text-white hover:bg-white/20 h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <AnimatePresence mode="wait">
                  {showHistory ? (
                    <motion.div
                      key="history"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="h-96"
                    >
                      <div className="p-4 border-b">
                        <h3 className="font-semibold text-sm">Chat History</h3>
                      </div>
                      <ScrollArea className="h-80">
                        <div className="p-2">
                          {chatSessions.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                              <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">No chat history yet</p>
                            </div>
                          ) : (
                            chatSessions.map((session) => (
                              <div
                                key={session.id}
                                className={`p-3 rounded-lg cursor-pointer transition-all mb-2 ${
                                  currentSessionId === session.id
                                    ? "bg-pink-100 dark:bg-pink-900/20 border border-pink-200"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="min-w-0 flex-1" onClick={() => loadChatSession(session.id)}>
                                    <p className="font-medium text-sm truncate">{session.title}</p>
                                    <p className="text-xs text-gray-500">{session.lastUpdated.toLocaleDateString()}</p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteChatSession(session.id)
                                    }}
                                    className="h-6 w-6 text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </ScrollArea>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="chat"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[85%] p-3 rounded-2xl ${
                                  message.isUser
                                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                                }`}
                              >
                                {message.isUser ? (
                                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                                ) : (
                                  <div
                                    className="text-sm leading-relaxed prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{
                                      __html: `<p class="mb-2">${formatAIResponse(message.text)}</p>`,
                                    }}
                                  />
                                )}
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </motion.div>
                          ))}

                          {isTyping && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex justify-start"
                            >
                              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                  <Sparkles className="h-4 w-4 animate-pulse text-pink-500" />
                                  <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" />
                                    <div
                                      className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                                      style={{ animationDelay: "0.1s" }}
                                    />
                                    <div
                                      className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                                      style={{ animationDelay: "0.2s" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </ScrollArea>

                      <Separator />

                      <div className="p-4 bg-gray-50 dark:bg-gray-900">
                        <div className="flex gap-2">
                          <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me about love, relationships, dating..."
                            className="flex-1 border-pink-200 focus:border-pink-400"
                            disabled={isTyping}
                          />
                          <Button
                            onClick={sendMessage}
                            disabled={!inputValue.trim() || isTyping}
                            size="icon"
                            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          💕 Your conversations are private and secure
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
