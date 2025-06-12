"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Stars, RefreshCw, Heart, Sparkles, Calendar, Share } from "lucide-react"
import { motion } from "framer-motion"

const zodiacSigns = [
  {
    name: "Aries",
    dates: "Mar 21 - Apr 19",
    emoji: "♈",
    element: "Fire",
    color: "from-red-500 to-red-600",
    traits: ["Passionate", "Bold", "Adventurous"],
  },
  {
    name: "Taurus",
    dates: "Apr 20 - May 20",
    emoji: "♉",
    element: "Earth",
    color: "from-green-500 to-green-600",
    traits: ["Loyal", "Stable", "Romantic"],
  },
  {
    name: "Gemini",
    dates: "May 21 - Jun 20",
    emoji: "♊",
    element: "Air",
    color: "from-yellow-500 to-yellow-600",
    traits: ["Charming", "Witty", "Adaptable"],
  },
  {
    name: "Cancer",
    dates: "Jun 21 - Jul 22",
    emoji: "♋",
    element: "Water",
    color: "from-blue-500 to-blue-600",
    traits: ["Nurturing", "Intuitive", "Emotional"],
  },
  {
    name: "Leo",
    dates: "Jul 23 - Aug 22",
    emoji: "♌",
    element: "Fire",
    color: "from-orange-500 to-orange-600",
    traits: ["Confident", "Generous", "Dramatic"],
  },
  {
    name: "Virgo",
    dates: "Aug 23 - Sep 22",
    emoji: "♍",
    element: "Earth",
    color: "from-green-600 to-green-700",
    traits: ["Caring", "Practical", "Thoughtful"],
  },
  {
    name: "Libra",
    dates: "Sep 23 - Oct 22",
    emoji: "♎",
    element: "Air",
    color: "from-pink-500 to-pink-600",
    traits: ["Harmonious", "Diplomatic", "Romantic"],
  },
  {
    name: "Scorpio",
    dates: "Oct 23 - Nov 21",
    emoji: "♏",
    element: "Water",
    color: "from-purple-500 to-purple-600",
    traits: ["Intense", "Passionate", "Mysterious"],
  },
  {
    name: "Sagittarius",
    dates: "Nov 22 - Dec 21",
    emoji: "♐",
    element: "Fire",
    color: "from-indigo-500 to-indigo-600",
    traits: ["Optimistic", "Adventurous", "Free-spirited"],
  },
  {
    name: "Capricorn",
    dates: "Dec 22 - Jan 19",
    emoji: "♑",
    element: "Earth",
    color: "from-gray-600 to-gray-700",
    traits: ["Reliable", "Ambitious", "Committed"],
  },
  {
    name: "Aquarius",
    dates: "Jan 20 - Feb 18",
    emoji: "♒",
    element: "Air",
    color: "from-cyan-500 to-cyan-600",
    traits: ["Independent", "Unique", "Friendly"],
  },
  {
    name: "Pisces",
    dates: "Feb 19 - Mar 20",
    emoji: "♓",
    element: "Water",
    color: "from-teal-500 to-teal-600",
    traits: ["Dreamy", "Compassionate", "Intuitive"],
  },
]

const horoscopes = {
  Aries: [
    "Your passionate nature will attract someone special today. Be bold in love and don't hesitate to make the first move! 🔥",
    "A surprise romantic gesture from your partner will brighten your day. Your energy is magnetic right now! ✨",
    "Single? Your confidence will be irresistible to potential partners. Trust your instincts in matters of the heart! 💕",
    "Communication is key in your relationship today. Express your feelings openly and watch your bond strengthen! 💬",
  ],
  Taurus: [
    "Stability in love brings you comfort today. Enjoy quiet, intimate moments with your partner. 🌹",
    "Your loyalty will be deeply appreciated by your loved one. Small gestures will have big impact! 💝",
    "A romantic dinner or cozy evening will strengthen your bond. Focus on sensual pleasures together! 🍷",
    "Trust your instincts when it comes to matters of the heart. Your intuition is especially strong today! 🌙",
  ],
  Gemini: [
    "Your charm and wit will captivate someone new today. Conversations lead to deeper connections! 💫",
    "Variety in your romantic life brings excitement and joy. Try something new with your partner! 🎭",
    "A meaningful conversation will deepen your connection. Share your thoughts and dreams openly! 💭",
    "Your adaptability helps you navigate relationship challenges smoothly. Stay flexible in love! 🌊",
  ],
  Cancer: [
    "Your nurturing nature creates a safe space for love to flourish. Emotional intimacy is highlighted! 🏠",
    "Family and relationship harmony are highlighted today. Create beautiful memories together! 👨‍👩‍👧‍👦",
    "Emotional intimacy reaches new depths with your partner. Open your heart completely! 💖",
    "Your intuition guides you toward the right romantic decisions. Trust your feelings! 🔮",
  ],
  Leo: [
    "Your radiant energy attracts admiration and romantic attention. Shine bright in love! ☀️",
    "Grand romantic gestures will be well-received today. Don't hold back your generous heart! 🎪",
    "Your generous heart wins over someone special. Love is your stage today! 🎭",
    "Confidence in love leads to beautiful new beginnings. Take center stage in romance! 👑",
  ],
  Virgo: [
    "Attention to detail in your relationship shows how much you care. Small acts matter most! 🔍",
    "Practical acts of love speak louder than words today. Show your care through actions! 🛠️",
    "Your partner appreciates your thoughtful and caring nature. Your efforts are noticed! 🌸",
    "Small gestures create big romantic moments. Focus on the little things that matter! ✨",
  ],
  Libra: [
    "Balance and harmony in your relationship bring peace and joy. Seek equilibrium in love! ⚖️",
    "Your diplomatic nature helps resolve any romantic tensions. Be the peacemaker! 🕊️",
    "Beauty and romance surround you in unexpected ways. Appreciate the aesthetics of love! 🎨",
    "Partnership energy is strong - make important decisions together. Unity is your strength! 🤝",
  ],
  Scorpio: [
    "Intense emotions lead to passionate romantic connections. Embrace the depth of feeling! 🌊",
    "Your mysterious allure draws someone closer to you. Let them discover your depths! 🔮",
    "Deep conversations reveal hidden aspects of your relationship. Explore the mysteries together! 🗝️",
    "Transformation in love brings positive changes. Embrace the evolution of your heart! 🦋",
  ],
  Sagittarius: [
    "Adventure and spontaneity add excitement to your love life. Plan something unexpected! 🏹",
    "Your optimistic outlook brightens your partner's day. Share your enthusiasm for life! 🌟",
    "Travel or new experiences with your loved one create lasting memories. Explore together! 🗺️",
    "Freedom within commitment brings relationship satisfaction. Find the perfect balance! 🦅",
  ],
  Capricorn: [
    "Your commitment and reliability strengthen your romantic bond. Consistency pays off! 🏔️",
    "Long-term relationship goals come into focus today. Plan your future together! 📋",
    "Your practical approach to love yields lasting results. Build something beautiful! 🏗️",
    "Patience in matters of the heart will be rewarded. Good things take time! ⏰",
  ],
  Aquarius: [
    "Your unique perspective on love attracts like-minded souls. Be authentically you! 🌈",
    "Friendship forms the foundation of your romantic connections. Build on solid ground! 👫",
    "Unconventional expressions of love surprise and delight. Think outside the box! 💡",
    "Your independence within relationships creates healthy balance. Maintain your individuality! 🦋",
  ],
  Pisces: [
    "Your romantic and dreamy nature creates magical moments. Let your imagination soar! 🌙",
    "Intuitive understanding with your partner reaches new levels. Feel the connection! 🐠",
    "Creative expressions of love touch hearts deeply. Art and romance intertwine! 🎨",
    "Compassion and empathy strengthen your emotional bonds. Lead with your heart! 💙",
  ],
}

const compatibilityMatrix = {
  Fire: { Fire: 85, Earth: 60, Air: 90, Water: 45 },
  Earth: { Fire: 60, Earth: 80, Air: 55, Water: 85 },
  Air: { Fire: 90, Earth: 55, Air: 75, Water: 70 },
  Water: { Fire: 45, Earth: 85, Air: 70, Water: 90 },
}

export default function LoveHoroscope() {
  const [selectedSign, setSelectedSign] = useState<string>("")
  const [partnerSign, setPartnerSign] = useState<string>("")
  const [currentHoroscope, setCurrentHoroscope] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [showCompatibility, setShowCompatibility] = useState(false)

  const generateHoroscope = () => {
    if (!selectedSign) return

    setIsLoading(true)
    setTimeout(() => {
      const signHoroscopes = horoscopes[selectedSign as keyof typeof horoscopes]
      const randomHoroscope = signHoroscopes[Math.floor(Math.random() * signHoroscopes.length)]
      setCurrentHoroscope(randomHoroscope)
      setIsLoading(false)
    }, 1500)
  }

  const calculateCompatibility = () => {
    if (!selectedSign || !partnerSign) return

    const userZodiac = zodiacSigns.find((sign) => sign.name === selectedSign)
    const partnerZodiac = zodiacSigns.find((sign) => sign.name === partnerSign)

    if (!userZodiac || !partnerZodiac) return

    const compatibility =
      compatibilityMatrix[userZodiac.element as keyof typeof compatibilityMatrix][
        partnerZodiac.element as keyof (typeof compatibilityMatrix)[keyof typeof compatibilityMatrix]
      ]
    setShowCompatibility(true)

    return {
      percentage: compatibility,
      userZodiac,
      partnerZodiac,
      description: getCompatibilityDescription(compatibility),
    }
  }

  const getCompatibilityDescription = (percentage: number) => {
    if (percentage >= 85) return "Absolutely magical! You two are a perfect cosmic match! ✨"
    if (percentage >= 70) return "Great compatibility! Your energies complement each other beautifully! 💕"
    if (percentage >= 55) return "Good potential! With understanding, you can create something beautiful! 🌟"
    return "Challenging but rewarding! Opposites can attract with effort and patience! 💪"
  }

  const selectedZodiac = zodiacSigns.find((sign) => sign.name === selectedSign)
  const compatibilityResult = showCompatibility ? calculateCompatibility() : null

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Stars className="h-6 w-6" />
            Daily Love Horoscope
          </CardTitle>
          <CardDescription className="text-white/90">
            Discover what the stars have in store for your love life today
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Your Zodiac Sign
              </label>
              <Select value={selectedSign} onValueChange={setSelectedSign}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose your zodiac sign" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign.name} value={sign.name}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{sign.emoji}</span>
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

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Partner's Sign (Optional)
              </label>
              <Select value={partnerSign} onValueChange={setPartnerSign}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose partner's sign" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign.name} value={sign.name}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{sign.emoji}</span>
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
          </div>

          {selectedZodiac && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl bg-gradient-to-r ${selectedZodiac.color} text-white`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{selectedZodiac.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold">{selectedZodiac.name}</h3>
                  <p className="text-white/90">
                    {selectedZodiac.dates} • {selectedZodiac.element} Sign
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedZodiac.traits.map((trait, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white">
                    {trait}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={generateHoroscope}
              disabled={!selectedSign || isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12"
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

            <Button
              onClick={calculateCompatibility}
              disabled={!selectedSign || !partnerSign}
              variant="outline"
              className="h-12 border-pink-200 hover:bg-pink-50 dark:border-pink-800 dark:hover:bg-pink-900/20"
            >
              <Heart className="h-4 w-4 mr-2" />
              Check Compatibility
            </Button>
          </div>

          {currentHoroscope && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{selectedZodiac?.emoji}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Today's Love Forecast for {selectedSign}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{currentHoroscope}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        <Share className="h-4 w-4 mr-2" />
                        Share Your Horoscope
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {compatibilityResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Compatibility Analysis
                  </h4>

                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-3xl mb-1">{compatibilityResult.userZodiac.emoji}</div>
                      <div className="text-sm font-medium">{compatibilityResult.userZodiac.name}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                        {compatibilityResult.percentage}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Match</div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl mb-1">{compatibilityResult.partnerZodiac.emoji}</div>
                      <div className="text-sm font-medium">{compatibilityResult.partnerZodiac.name}</div>
                    </div>
                  </div>

                  <p className="text-center text-gray-700 dark:text-gray-300 mb-4">{compatibilityResult.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-gray-600 dark:text-gray-400">Your Element</div>
                      <div className="text-lg">{compatibilityResult.userZodiac.element}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-600 dark:text-gray-400">Partner's Element</div>
                      <div className="text-lg">{compatibilityResult.partnerZodiac.element}</div>
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
