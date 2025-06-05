"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="max-w-md mx-auto pt-4">
      <div className="flex items-center justify-between">
        <div className="flex justify-center gap-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-pink-500 text-white"
                : "bg-white/80 hover:bg-pink-100 text-pink-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-pink-400",
            )}
          >
            <Heart className="h-4 w-4" />
            Calculator
          </Link>
          <Link
            href="/contact"
            className={cn(
              "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors",
              pathname === "/contact"
                ? "bg-pink-500 text-white"
                : "bg-white/80 hover:bg-pink-100 text-pink-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-pink-400",
            )}
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}
