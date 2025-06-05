import LoveCalculator from "@/components/love-calculator"
import { NavBar } from "@/components/nav-bar"
import { FloatingHearts } from "@/components/floating-hearts"
import { PulsingHeart } from "@/components/pulsing-heart"
import { LoveQuotes } from "@/components/love-quotes"
import LoveHoroscope from "@/components/love-horoscope"
import RelationshipTimeline from "@/components/relationship-timeline"
import LoveLanguageQuiz from "@/components/love-language-quiz"
import CoupleChallenges from "@/components/couple-challenges"
import StructuredData from "@/components/structured-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 dark:from-pink-950 dark:to-purple-900 p-4 relative overflow-hidden">
        <FloatingHearts />
        <NavBar />
        <div className="max-w-4xl mx-auto pt-8 pb-16 relative z-10">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400 mb-4 flex items-center justify-center">
              Tush <PulsingHeart /> Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover your love compatibility with our fun and romantic calculator. Test your relationship
              compatibility, explore daily horoscopes, and strengthen your bond with couple challenges.
            </p>
          </header>

          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="horoscope">Horoscope</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="quiz">Love Quiz</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="quotes">Quotes</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="flex justify-center">
              <div className="w-full max-w-md">
                <section aria-label="Love Compatibility Calculator">
                  <LoveCalculator />
                </section>
              </div>
            </TabsContent>

            <TabsContent value="horoscope" className="flex justify-center">
              <div className="w-full max-w-md">
                <section aria-label="Daily Love Horoscope">
                  <LoveHoroscope />
                </section>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="flex justify-center">
              <div className="w-full max-w-2xl">
                <section aria-label="Relationship Timeline">
                  <RelationshipTimeline />
                </section>
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="flex justify-center">
              <div className="w-full max-w-2xl">
                <section aria-label="Love Language Quiz">
                  <LoveLanguageQuiz />
                </section>
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="flex justify-center">
              <div className="w-full max-w-2xl">
                <section aria-label="Couple Challenges">
                  <CoupleChallenges />
                </section>
              </div>
            </TabsContent>

            <TabsContent value="quotes" className="flex justify-center">
              <div className="w-full max-w-md">
                <section aria-label="Love Quotes">
                  <LoveQuotes />
                </section>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
