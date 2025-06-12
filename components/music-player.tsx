"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, List, X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

interface Song {
  id: number
  title: string
  artist: string
  duration: string
  url: string
}

const romanticPlaylist: Song[] = [
  {
    id: 1,
    title: "All of Me",
    artist: "John Legend",
    duration: "4:29",
    url: "/audio/john-legend-all-of-me.mp3",
  },
  {
    id: 2,
    title: "Make You Feel My Love",
    artist: "Adele",
    duration: "3:32",
    url: "/audio/adele-make-you-feel-my-love.mp3",
  },
  {
    id: 3,
    title: "Perfect",
    artist: "Ed Sheeran",
    duration: "4:23",
    url: "/audio/john-legend-all-of-me.mp3", // Using available file as placeholder
  },
  {
    id: 4,
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    duration: "4:41",
    url: "/audio/adele-make-you-feel-my-love.mp3", // Using available file as placeholder
  },
  {
    id: 5,
    title: "A Thousand Years",
    artist: "Christina Perri",
    duration: "4:45",
    url: "/audio/john-legend-all-of-me.mp3", // Using available file as placeholder
  },
  {
    id: 6,
    title: "At Last",
    artist: "Etta James",
    duration: "3:01",
    url: "/audio/adele-make-you-feel-my-love.mp3", // Using available file as placeholder
  },
  {
    id: 7,
    title: "Can't Help Myself",
    artist: "Four Tops",
    duration: "2:57",
    url: "/audio/john-legend-all-of-me.mp3", // Using available file as placeholder
  },
  {
    id: 8,
    title: "L-O-V-E",
    artist: "Nat King Cole",
    duration: "2:30",
    url: "/audio/adele-make-you-feel-my-love.mp3", // Using available file as placeholder
  },
]

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleEnded = () => {
      setIsPlaying(false)
      nextSong()
    }
    const handleError = (e: Event) => {
      console.error("Audio error:", e)
      setIsLoading(false)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [currentSong])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = async () => {
    if (!audioRef.current || isLoading) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error("Playback error:", error)
    }
  }

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % romanticPlaylist.length)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + romanticPlaylist.length) % romanticPlaylist.length)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const selectSong = (index: number) => {
    setCurrentSong(index)
    setShowPlaylist(false)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current && !isLoading) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const currentSongData = romanticPlaylist[currentSong]

  return (
    <>
      <audio ref={audioRef} src={currentSongData.url} preload="metadata" crossOrigin="anonymous" />

      <motion.div
        className="fixed bottom-4 left-4 z-40"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-pink-200 dark:border-pink-800 shadow-xl">
          <CardContent className="p-4">
            <AnimatePresence mode="wait">
              {!isMinimized ? (
                <motion.div
                  key="expanded"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="w-80 max-w-[calc(100vw-2rem)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                        <Music className="h-6 w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm truncate">{currentSongData.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{currentSongData.artist}</p>
                        {isLoading && <p className="text-xs text-blue-500">Loading...</p>}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)} className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mb-4">
                    <Slider
                      value={[currentTime]}
                      max={duration || 100}
                      step={0.1}
                      onValueChange={handleSeek}
                      className="w-full"
                      disabled={isLoading}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Button variant="ghost" size="icon" onClick={prevSong} className="h-10 w-10">
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={togglePlay}
                      disabled={isLoading}
                      className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6 ml-1" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={nextSong} className="h-10 w-10">
                      <SkipForward className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="h-8 w-8">
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <Slider
                        value={[isMuted ? 0 : volume * 100]}
                        max={100}
                        step={1}
                        onValueChange={(value) => {
                          const newVolume = value[0] / 100
                          setVolume(newVolume)
                          setIsMuted(newVolume === 0)
                        }}
                        className="w-20"
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setShowPlaylist(true)} className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="minimized"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setIsMinimized(false)}
                >
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      togglePlay()
                    }}
                    disabled={isLoading}
                    className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{currentSongData.title}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPlaylist(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 border-b bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Romantic Playlist
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPlaylist(false)}
                        className="text-white hover:bg-white/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="h-80">
                    <div className="p-2">
                      {romanticPlaylist.map((song, index) => (
                        <motion.div
                          key={song.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => selectSong(index)}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            index === currentSong
                              ? "bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-200"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">{song.title}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{song.artist}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{song.duration}</span>
                              {index === currentSong && isPlaying && (
                                <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse" />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
