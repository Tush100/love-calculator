"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Stars, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

const zodiacSigns = [
  { name: "Aries", dates: "Mar 21 - Apr 19", emoji: "♈" },
  { name: "Taurus", dates: "Apr 20 - May 20", emoji: "♉" },
  { name: "Gemini", dates: "May 21 - Jun 20", emoji: "♊" },
  { name: "Cancer", dates: "Jun 21 - Jul 22", emoji: "♋" },
  { name: "Leo", dates: "Jul 23 - Aug 22", emoji: "♌" },
  { name: "Virgo", dates: "Aug 23 - Sep 22", emoji: "♍" },
  { name: "Libra", dates: "Sep 23 - Oct 22", emoji: "♎" },
  { name: "Scorpio", dates: "Oct 23 - Nov 21", emoji: "♏" },
  { name: "Sagittarius", dates: "Nov 22 - Dec 21", emoji: "♐" },
  { name: "Capricorn", dates: "Dec 22 - Jan 19", emoji: "♑" },
  { name: "Aquarius", dates: "Jan 20 - Feb 18", emoji: "♒" },
  { name: "Pisces", dates: "Feb 19 - Mar 20", emoji: "♓" },
]

const horoscopes = {
  Aries: [
    "Your passionate nature will attract someone special today. Be bold in love!",
    "A surprise romantic gesture from your partner will brighten your day.",
    "Single? Your confidence will be magnetic to potential partners.",
    "Communication is key in your relationship today. Express your feelings openly.",
  ],
  Taurus: [
    "Stability in love brings you comfort today. Enjoy quiet moments together.",
    "Your loyalty will be deeply appreciated by your loved one.",
    "A romantic dinner or cozy evening will strengthen your bond.",
    "Trust your instincts when it comes to matters of the heart.",
  ],
  Gemini: [
    "Your charm and wit will captivate someone new today.",
    "Variety in your romantic life brings excitement and joy.",
    "A meaningful conversation will deepen your connection.",
    "Your adaptability helps you navigate relationship challenges smoothly.",
  ],
  Cancer: [
    "Your nurturing nature creates a safe space for love to flourish.",
    "Family and relationship harmony are highlighted today.",
    "Emotional intimacy reaches new depths with your partner.",
    "Your intuition guides you toward the right romantic decisions.",
  ],
  Leo: [
    "Your radiant energy attracts admiration and romantic attention.",
    "Grand romantic gestures will be well-received today.",
    "Your generous heart wins over someone special.",
    "Confidence in love leads to beautiful new beginnings.",
  ],
  Virgo: [
    "Attention to detail in your relationship shows how much you care.",
    "Practical acts of love speak louder than words today.",
    "Your partner appreciates your thoughtful and caring nature.",
    "Small gestures create big romantic moments.",
  ],
  Libra: [
    "Balance and harmony in your relationship bring peace and joy.",
    "Your diplomatic nature helps resolve any romantic tensions.",
    "Beauty and romance surround you in unexpected ways.",
    "Partnership energy is strong - make important decisions together.",
  ],
  Scorpio: [
    "Intense emotions lead to passionate romantic connections.",
    "Your mysterious allure draws someone closer to you.",
    "Deep conversations reveal hidden aspects of your relationship.",
    "Transformation in love brings positive changes.",
  ],
  Sagittarius: [
    "Adventure and spontaneity add excitement to your love life.",
    "Your optimistic outlook brightens your partner's day.",
    "Travel or new experiences with your loved one create lasting memories.",
    "Freedom within commitment brings relationship satisfaction.",
  ],
  Capricorn: [
    "Your commitment and reliability strengthen your romantic bond.",
    "Long-term relationship goals come into focus today.",
    "Your practical approach to love yields lasting results.",
    "Patience in matters of the heart will be rewarded.",
  ],
  Aquarius: [
    "Your unique perspective on love attracts like-minded souls.",
    "Friendship forms the foundation of your romantic connections.",
    "Unconventional expressions of love surprise and delight.",
    "Your independence within relationships creates healthy balance.",
  ],
  Pisces: [
    "Your romantic and dreamy nature creates magical moments.",
    "Intuitive understanding with your partner reaches new levels.",
    "Creative expressions of love touch hearts deeply.",
    "Compassion and empathy strengthen your emotional bonds.",
  ],
}

export default function LoveHoroscope() {
  const [selectedSign, setSelectedSign] = useState<string>("")
  const [currentHoroscope, setCurrentHoroscope] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const generateHoroscope = () => {
    if (!selectedSign) return

    setIsLoading(true)
    setTimeout(() => {
      const signHoroscopes = horoscopes[selectedSign as keyof typeof horoscopes]
      const randomHoroscope = signHoroscopes[Math.floor(Math.random() * signHoroscopes.length)]
      setCurrentHoroscope(randomHoroscope)
      setIsLoading(false)
    }, 1000)
  }

  const selectedZodiac = zodiacSigns.find((sign) => sign.name === selectedSign)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stars className="h-5 w-5 text-purple-500" />
            Daily Love Horoscope
          </CardTitle>
          <CardDescription>Discover what the stars have in store for your love life today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Your Zodiac Sign</label>
            <Select value={selectedSign} onValueChange={setSelectedSign}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your zodiac sign" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign.name} value={sign.name}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{sign.emoji}</span>
                      <div>
                        <div className="font-medium">{sign.name}</div>
                        <div className="text-xs text-muted-foreground">{sign.dates}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedZodiac && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <Badge variant="outline" className="text-lg px-3 py-1">
                {selectedZodiac.emoji} {selectedZodiac.name}
              </Badge>
              <span className="text-sm text-muted-foreground">{selectedZodiac.dates}</span>
            </motion.div>
          )}

          <Button
            onClick={generateHoroscope}
            disabled={!selectedSign || isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Reading the Stars...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Stars className="h-4 w-4" />
                Get My Love Horoscope
              </span>
            )}
          </Button>

          {currentHoroscope && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{selectedZodiac?.emoji}</div>
                    <div>
                      <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                        Today's Love Forecast for {selectedSign}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">{currentHoroscope}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
