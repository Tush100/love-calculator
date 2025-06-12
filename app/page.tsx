import LoveCalculator from "@/components/love-calculator"
import { NavBar } from "@/components/nav-bar"
import { FloatingHearts } from "@/components/floating-hearts"
import { PulsingHeart } from "@/components/pulsing-heart"
import { LoveQuotes } from "@/components/love-quotes"
import LoveHoroscope from "@/components/love-horoscope"
import RelationshipTimeline from "@/components/relationship-timeline"
import LoveLanguageQuiz from "@/components/love-language-quiz"
import CoupleChallenges from "@/components/couple-challenges"
import NameMeaningComponent from "@/components/name-meaning"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 dark:from-pink-950 dark:to-purple-900 p-4 relative overflow-hidden">
      <FloatingHearts />
      <NavBar />
      <div className="max-w-4xl mx-auto pt-8 pb-16 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6 flex items-center justify-center">
          Tush <PulsingHeart /> Calculator
        </h1>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-6">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="names">Names</TabsTrigger>
            <TabsTrigger value="horoscope">Horoscope</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="quiz">Love Quiz</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="flex justify-center">
            <div className="w-full max-w-md">
              <LoveCalculator />
            </div>
          </TabsContent>

          <TabsContent value="names" className="flex justify-center">
            <div className="w-full">
              <NameMeaningComponent />
            </div>
          </TabsContent>

          <TabsContent value="horoscope" className="flex justify-center">
            <div className="w-full">
              <LoveHoroscope />
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="flex justify-center">
            <div className="w-full">
              <RelationshipTimeline />
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="flex justify-center">
            <div className="w-full">
              <LoveLanguageQuiz />
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="flex justify-center">
            <div className="w-full">
              <CoupleChallenges />
            </div>
          </TabsContent>

          <TabsContent value="quotes" className="flex justify-center">
            <div className="w-full max-w-md">
              <LoveQuotes />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
