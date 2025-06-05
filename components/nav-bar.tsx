"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Mail, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

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
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                Features <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/#horoscope" className="w-full">
                  Love Horoscope
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/#timeline" className="w-full">
                  Relationship Timeline
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/#quiz" className="w-full">
                  Love Language Quiz
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/#challenges" className="w-full">
                  Couple Challenges
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
