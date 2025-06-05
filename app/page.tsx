import LoveCalculator from "@/components/love-calculator"
import { NavBar } from "@/components/nav-bar"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 dark:from-pink-950 dark:to-purple-900 p-4">
      <NavBar />
      <div className="max-w-md mx-auto pt-8 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6">
          Tush Love Calculator
        </h1>
        <LoveCalculator />
      </div>
    </main>
  )
}
