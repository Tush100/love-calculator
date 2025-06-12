"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, Search, Sparkles, Users, Zap } from "lucide-react"
import { getNameMeaning, calculateNameCompatibility } from "@/lib/name-meanings"
import { getNameInfo } from "@/lib/name-api"

export default function NameMeaningComponent() {
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [meaning1, setMeaning1] = useState(null)
  const [meaning2, setMeaning2] = useState(null)
  const [apiInfo1, setApiInfo1] = useState(null)
  const [apiInfo2, setApiInfo2] = useState(null)
  const [compatibility, setCompatibility] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const analyzeName = async (name, setMeaning, setApiInfo) => {
    if (!name.trim()) return

    try {
      // Get local meaning first
      const localMeaning = getNameMeaning(name)
      setMeaning(localMeaning)

      // Get API info if not in local database
      if (!localMeaning) {
        const apiInfo = await getNameInfo(name)
        setApiInfo(apiInfo)
      } else {
        setApiInfo(null)
      }
    } catch (error) {
      console.error("Error analyzing name:", error)
      // Set fallback data
      setApiInfo({
        name: name,
        gender: "unknown",
        origin: "Unknown",
        meaning: "Unable to retrieve meaning",
        popularity: 50,
      })
    }
  }

  const analyzeCompatibility = () => {
    if (!name1.trim() || !name2.trim()) return

    try {
      const result = calculateNameCompatibility(name1, name2)
      setCompatibility(result)
    } catch (error) {
      console.error("Error calculating compatibility:", error)
      setCompatibility({
        score: 50,
        analysis: "Unable to calculate compatibility at this time.",
        sharedTraits: [],
        complementaryTraits: [],
      })
    }
  }

  const handleAnalyze = async () => {
    if (!name1.trim() || !name2.trim()) return

    setIsLoading(true)
    setCompatibility(null)

    try {
      await Promise.all([analyzeName(name1, setMeaning1, setApiInfo1), analyzeName(name2, setMeaning2, setApiInfo2)])
      analyzeCompatibility()
    } catch (error) {
      console.error("Error in analysis:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Name Meanings & Compatibility
          </CardTitle>
          <CardDescription>
            Discover the hidden meanings behind names and how they influence compatibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name1">First Name</Label>
              <Input
                id="name1"
                placeholder="Enter first name"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name2">Second Name</Label>
              <Input
                id="name2"
                placeholder="Enter second name"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={!name1.trim() || !name2.trim() || isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? (
              <span className="flex items-center">
                Analyzing...
                <div className="ml-2 animate-spin">
                  <Search className="h-4 w-4" />
                </div>
              </span>
            ) : (
              <span className="flex items-center">
                Analyze Names <Sparkles className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Name 1 Analysis */}
      {(meaning1 || apiInfo1) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{name1}</CardTitle>
              <CardDescription>{meaning1?.origin || apiInfo1?.origin || "Unknown"} Origin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Meaning</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {meaning1?.meaning || apiInfo1?.meaning || "Meaning not available"}
                </p>
              </div>

              {meaning1 && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2">Personality Traits</h4>
                    <div className="flex flex-wrap gap-1">
                      {meaning1.personality.map((trait, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Element & Color</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{meaning1.element}</Badge>
                      <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: meaning1.color }} />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Lucky Numbers</h4>
                    <div className="flex gap-1">
                      {meaning1.luckyNumbers.map((num, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {num}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {apiInfo1 && !meaning1 && (
                <div>
                  <h4 className="font-semibold mb-2">Additional Info</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Gender:</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {apiInfo1.gender}
                      </Badge>
                    </div>
                    {apiInfo1.popularity && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Popularity:</span>
                        <Badge variant="outline" className="text-xs">
                          {apiInfo1.popularity}%
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Name 2 Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{name2}</CardTitle>
              <CardDescription>{meaning2?.origin || apiInfo2?.origin || "Unknown"} Origin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Meaning</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {meaning2?.meaning || apiInfo2?.meaning || "Meaning not available"}
                </p>
              </div>

              {meaning2 && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2">Personality Traits</h4>
                    <div className="flex flex-wrap gap-1">
                      {meaning2.personality.map((trait, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Element & Color</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{meaning2.element}</Badge>
                      <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: meaning2.color }} />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Lucky Numbers</h4>
                    <div className="flex gap-1">
                      {meaning2.luckyNumbers.map((num, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {num}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {apiInfo2 && !meaning2 && (
                <div>
                  <h4 className="font-semibold mb-2">Additional Info</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Gender:</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {apiInfo2.gender}
                      </Badge>
                    </div>
                    {apiInfo2.popularity && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Popularity:</span>
                        <Badge variant="outline" className="text-xs">
                          {apiInfo2.popularity}%
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Compatibility Analysis */}
      {compatibility && (
        <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              Name Compatibility Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">{compatibility.score}%</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{compatibility.analysis}</p>
            </div>

            <Separator />

            {compatibility.sharedTraits.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-500" />
                  Shared Traits
                </h4>
                <div className="flex flex-wrap gap-1">
                  {compatibility.sharedTraits.map((trait, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {compatibility.complementaryTraits.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  Complementary Traits
                </h4>
                <div className="flex flex-wrap gap-1">
                  {compatibility.complementaryTraits.map((trait, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
