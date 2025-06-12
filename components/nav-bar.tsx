"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Mail, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function NavBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Calculator", icon: Heart },
    { href: "/contact", label: "Contact Me", icon: Mail },
  ]

  return (
    <nav className="w-full px-4 pt-4">
      <div className="max-w-4xl mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex gap-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-pink-500 text-white"
                    : "bg-white/80 hover:bg-pink-100 text-pink-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-pink-400",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="bg-white/80 dark:bg-gray-800">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        pathname === href
                          ? "bg-pink-500 text-white"
                          : "hover:bg-pink-100 text-pink-600 dark:hover:bg-gray-700 dark:text-pink-400",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
