"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; delay: number; duration: number }[]>([])

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random horizontal position (0-100%)
      size: Math.random() * 16 + 8, // Random size between 8-24px
      delay: Math.random() * 10, // Random delay for animation start
      duration: Math.random() * 10 + 15, // Random duration between 15-25s
    }))

    setHearts(initialHearts)

    // Periodically add new hearts
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 16 + 8,
          delay: 0,
          duration: Math.random() * 10 + 15,
        },
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0"
          style={{ left: `${heart.x}%` }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-100vh",
            opacity: [0, 1, 1, 0],
            x: [0, Math.random() * 100 - 50, Math.random() * -100 + 50, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
            times: [0, 0.1, 0.9, 1],
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 5,
          }}
        >
          <Heart
            className="text-pink-400 dark:text-pink-600 opacity-40"
            fill="currentColor"
            style={{ width: heart.size, height: heart.size }}
          />
        </motion.div>
      ))}
    </div>
  )
}
