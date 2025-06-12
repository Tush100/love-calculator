"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const zodiacSigns = [
  { name: "Aries", dates: "Mar 21 - Apr 19", emoji: "♈", element: "Fire" },
  { name: "Taurus", dates: "Apr 20 - May 20", emoji: "♉", element: "Earth" },
  { name: "Gemini", dates: "May 21 - Jun 20", emoji: "♊", element: "Air" },
  { name: "Cancer", dates: "Jun 21 - Jul 22", emoji: "♋", element: "Water" },
  { name: "Leo", dates: "Jul 23 - Aug 22", emoji: "♌", element: "Fire" },
  { name: "Virgo", dates: "Aug 23 - Sep 22", emoji: "♍", element: "Earth" },
  { name: "Libra", dates: "Sep 23 - Oct 22", emoji: "♎", element: "Air" },
  { name: "Scorpio", dates: "Oct 23 - Nov 21", emoji: "♏", element: "Water" },
  { name: "Sagittarius", dates: "Nov 22 - Dec 21", emoji: "♐", element: "Fire" },
  { name: "Capricorn", dates: "Dec 22 - Jan 19", emoji: "♑", element: "Earth" },
  { name: "Aquarius", dates: "Jan 20 - Feb 18", emoji: "♒", element: "Air" },
  { name: "Pisces", dates: "Feb 19 - Mar 20", emoji: "♓", element: "Water" },
]

const horoscopes = {
  Aries:
    "Today is perfect for new romantic beginnings. Your confidence is magnetic, drawing others to you. If you're in a relationship, plan something spontaneous to reignite the spark.",
  Taurus:
    "Stability in love is highlighted today. Show your partner how much you value them through small, thoughtful gestures. Single? Someone reliable may catch your eye.",
  Gemini:
    "Communication is your love language today. Express your feelings openly and listen attentively to your partner. Singles might find connection through intellectual conversations.",
  Cancer:
    "Your emotional intuition is heightened today. Trust your feelings about a relationship matter. Creating a cozy, intimate atmosphere will strengthen bonds with your loved one.",
  Leo: "Romance is in the spotlight! Your generous heart and warm personality shine bright today. Plan a grand gesture for your partner or confidently approach someone who's caught your interest.",
  Virgo:
    "Details matter in love today. Notice the little things your partner does and express appreciation. Single Virgos might find love through practical, everyday interactions.",
  Libra:
    "Harmony in relationships is your focus. Find balance between giving and receiving in love. Your charm is especially potent today—use it wisely!",
  Scorpio:
    "Passion runs deep today. Intense emotional connections are favored. Trust issues may surface, but addressing them honestly will strengthen your relationship.",
  Sagittarius:
    "Adventure in love awaits! Break routine with your partner or be open to meeting someone who expands your horizons. Freedom and connection can coexist beautifully today.",
  Capricorn:
    "Long-term love prospects look promising. Invest time in building a solid foundation with your partner. Single? Someone with ambition and integrity may enter your life.",
  Aquarius:
    "Unexpected romantic developments bring excitement today. Embrace unconventional approaches to love. Your uniqueness is especially attractive now.",
  Pisces:
    "Dreamy romance fills your day. Your compassion and empathy create deep connections. Trust your intuition about a relationship matter—it's guiding you correctly.",
}

export default function LoveHoroscope() {
  const [selectedSign, setSelectedSign] = useState("Aries")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl text-pink-600 dark:text-pink-400">Daily Love Horoscope</CardTitle>
        <CardDescription className="text-center">Select your zodiac sign to see today's love forecast</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Aries" onValueChange={setSelectedSign} className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-6 mb-4">
            {zodiacSigns.map((sign) => (
              <TabsTrigger key={sign.name} value={sign.name} className="text-center">
                <span className="hidden md:inline">{sign.name}</span>
                <span className="md:hidden">{sign.emoji}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {zodiacSigns.map((sign) => (
            <TabsContent key={sign.name} value={sign.name} className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{sign.emoji}</div>
                <h3 className="text-xl font-bold">{sign.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{sign.dates}</p>
                <div className="mt-1">
                  <span className="inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                    {sign.element} Sign
                  </span>
                </div>
              </div>

              <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
                <p className="italic text-gray-700 dark:text-gray-300">{horoscopes[sign.name]}</p>
              </div>

              <div className="flex justify-center mt-4">
                <Button variant="outline" className="mr-2">
                  Share Horoscope
                </Button>
                <Button>Get Compatibility</Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
