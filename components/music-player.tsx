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

// Create simple audio data URLs for romantic background music
const createAudioDataUrl = (frequency: number, duration = 2) => {
  const sampleRate = 44100
  const samples = sampleRate * duration
  const buffer = new ArrayBuffer(44 + samples * 2)
  const view = new DataView(buffer)

  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  writeString(0, "RIFF")
  view.setUint32(4, 36 + samples * 2, true)
  writeString(8, "WAVE")
  writeString(12, "fmt ")
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(36, "data")
  view.setUint32(40, samples * 2, true)

  // Generate simple sine wave
  for (let i = 0; i < samples; i++) {
    const sample = Math.sin((2 * Math.PI * frequency * i) / sampleRate) * 0.3
    view.setInt16(44 + i * 2, sample * 32767, true)
  }

  const blob = new Blob([buffer], { type: "audio/wav" })
  return URL.createObjectURL(blob)
}

const romanticPlaylist: Song[] = [
  {
    id: 1,
    title: "Perfect",
    artist: "Ed Sheeran",
    duration: "4:23",
    url: createAudioDataUrl(440, 30), // A note for 30 seconds
  },
  {
    id: 2,
    title: "All of Me",
    artist: "John Legend",
    duration: "4:29",
    url: createAudioDataUrl(523, 30), // C note
  },
  {
    id: 3,
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    duration: "4:41",
    url: createAudioDataUrl(659, 30), // E note
  },
  {
    id: 4,
    title: "A Thousand Years",
    artist: "Christina Perri",
    duration: "4:45",
    url: createAudioDataUrl(392, 30), // G note
  },
  {
    id: 5,
    title: "Make You Feel My Love",
    artist: "Adele",
    duration: "3:32",
    url: createAudioDataUrl(494, 30), // B note
  },
  {
    id: 6,
    title: "At Last",
    artist: "Etta James",
    duration: "3:01",
    url: createAudioDataUrl(349, 30), // F note
  },
  {
    id: 7,
    title: "Can't Help Myself",
    artist: "Four Tops",
    duration: "2:57",
    url: createAudioDataUrl(587, 30), // D note
  },
  {
    id: 8,
    title: "L-O-V-E",
    artist: "Nat King Cole",
    duration: "2:30",
    url: createAudioDataUrl(330, 30), // E note (lower)
  },
  {
    id: 9,
    title: "The Way You Look Tonight",
    artist: "Frank Sinatra",
    duration: "3:22",
    url: createAudioDataUrl(440, 30), // A note
  },
  {
    id: 10,
    title: "Unchained Melody",
    artist: "The Righteous Brothers",
    duration: "3:36",
    url: createAudioDataUrl(523, 30), // C note
  },
  {
    id: 11,
    title: "Stand by Me",
    artist: "Ben E. King",
    duration: "2:58",
    url: createAudioDataUrl(659, 30), // E note
  },
]

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(30) // Default 30 seconds
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      nextSong()
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentSong])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = async () => {
    if (!audioRef.current) return

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
  }

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + romanticPlaylist.length) % romanticPlaylist.length)
    setIsPlaying(false)
  }

  const selectSong = (index: number) => {
    setCurrentSong(index)
    setShowPlaylist(false)
    setIsPlaying(false)
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const currentSongData = romanticPlaylist[currentSong]

  return (
    <>
      <audio ref={audioRef} src={currentSongData.url} preload="metadata" />

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
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)} className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mb-4">
                    <Slider
                      value={[currentTime]}
                      max={duration}
                      step={0.1}
                      onValueChange={handleSeek}
                      className="w-full"
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
                      className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
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
                    className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
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
