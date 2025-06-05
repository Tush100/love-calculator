"use client"

import { Heart } from "lucide-react"
import { motion } from "framer-motion"

export function PulsingHeart() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
      className="inline-flex mx-2 text-pink-600 dark:text-pink-400"
    >
      <Heart className="h-8 w-8 md:h-10 md:w-10" fill="currentColor" />
    </motion.div>
  )
}
