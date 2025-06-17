"use client"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  List,
  X,
  Heart,
  Upload,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

interface Song {
  id: number
  title: string
  artist: string
  duration: string
  url: string
  fallbackUrl?: string
}

// Updated playlist with deployment-friendly URLs
const romanticPlaylist: Song[] = [
  {
    id: 1,
    title: "Perfect",
    artist: "Ed Sheeran",
    duration: "4:23",
    url: "https://bk4wj7006yllpfhv.public.blob.vercel-storage.com/public/audio/perfect-ed-sheeran.mp3", // Direct blob URL
    fallbackUrl: "/audio/perfect-ed-sheeran.mp3",
  },
  {
    id: 2,
    title: "All of Me",
    artist: "John Legend",
    duration: "4:29",
    url: "https://bk4wj7006yllpfhv.public.blob.vercel-storage.com/public/audio/john-legend-all-of-me.mp3", // Direct blob URL
    fallbackUrl: "/audio/john-legend-all-of-me.mp3",
  },
  {
    id: 3,
    title: "Make You Feel My Love",
    artist: "Adele",
    duration: "3:32",
    url: "https://bk4wj7006yllpfhv.public.blob.vercel-storage.com/public/audio/adele-make-you-feel-my-love.mp3", // Direct blob URL
    fallbackUrl: "/audio/adele-make-you-feel-my-love.mp3",
  },
  {
    id: 4,
    title: "Unity",
    artist: "Sapphire",
    duration: "3:45",
    url: "https://bk4wj7006yllpfhv.public.blob.vercel-storage.com/public/audio/sapphire-unity-acoustic.mp3", // Direct blob URL
    fallbackUrl: "/audio/sapphire-unity-acoustic.mp3",
  },
  {
    id: 5,
    title: "Leave The Door Open",
    artist: "Bruno Mars",
    duration: "4:02",
    url: "https://bk4wj7006yllpfhv.public.blob.vercel-storage.com/public/audio/leave-the-door-open-bruno-mars.mp3", // Direct blob URL
    fallbackUrl: "/audio/leave-the-door-open-bruno-mars.mp3",
  },
  {
    id: 6,
    title: "We Found Love",
    artist: "Rihanna ft. Calvin Harris",
    duration: "3:35",
    url: "https://bk4wj7006yllpfhv.public.blob.vercel-storage.com/public/audio/we-found-love-rihanna.mp3", // Direct blob URL
    fallbackUrl: "/audio/we-found-love-rihanna.mp3",
  },
]

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(romanticPlaylist[0].url)
  const [showUploadHelp, setShowUploadHelp] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Try to auto-play Perfect by Ed Sheeran when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current && !isPlaying && !audioError) {
        togglePlay()
      }
    }, 3000) // Start playing after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const currentSongData = romanticPlaylist[currentSong]
    setCurrentUrl(currentSongData.url)

    const handleTimeUpdate = () => {
      if (audio.currentTime) {
        setCurrentTime(audio.currentTime)
      }
    }

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
      }
      setIsLoading(false)
      setAudioError(false)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
      setAudioError(false)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
      setAudioError(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      nextSong()
    }

    const handleError = async (e: Event) => {
      console.error("Audio error for song:", currentSongData.title, e)

      // Try fallback URL if available
      if (currentSongData.fallbackUrl && currentUrl === currentSongData.url) {
        console.log("Trying fallback URL for:", currentSongData.title)
        setCurrentUrl(currentSongData.fallbackUrl)
        audio.src = currentSongData.fallbackUrl
        audio.load()
        return
      }

      setIsLoading(false)
      setAudioError(true)
    }

    const handleLoadedData = () => {
      setIsLoading(false)
      setAudioError(false)
    }

    const handleWaiting = () => {
      setIsLoading(true)
    }

    const handlePlaying = () => {
      setIsLoading(false)
      setAudioError(false)
    }

    // Add all event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("loadeddata", handleLoadedData)
    audio.addEventListener("waiting", handleWaiting)
    audio.addEventListener("playing", handlePlaying)

    // Set the audio source and load
    audio.src = currentUrl
    audio.load()

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("loadeddata", handleLoadedData)
      audio.removeEventListener("waiting", handleWaiting)
      audio.removeEventListener("playing", handlePlaying)
    }
  }, [currentSong, currentUrl])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        setIsLoading(true)

        // Ensure audio is ready
        if (audio.readyState < 2) {
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error("Audio loading timeout"))
            }, 15000) // 15 second timeout

            const handleCanPlay = () => {
              clearTimeout(timeout)
              audio.removeEventListener("canplay", handleCanPlay)
              audio.removeEventListener("error", handleError)
              resolve(void 0)
            }

            const handleError = () => {
              clearTimeout(timeout)
              audio.removeEventListener("canplay", handleCanPlay)
              audio.removeEventListener("error", handleError)
              reject(new Error("Audio loading error"))
            }

            audio.addEventListener("canplay", handleCanPlay)
            audio.addEventListener("error", handleError)
          })
        }

        const playPromise = audio.play()
        if (playPromise !== undefined) {
          await playPromise
          setIsPlaying(true)
          setAudioError(false)
        }
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Playback error for song:", romanticPlaylist[currentSong].title, error)
      setAudioError(true)
      setIsLoading(false)
      setIsPlaying(false)
    }
  }

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % romanticPlaylist.length)
    setIsPlaying(false)
    setCurrentTime(0)
    setAudioError(false)
  }

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + romanticPlaylist.length) % romanticPlaylist.length)
    setIsPlaying(false)
    setCurrentTime(0)
    setAudioError(false)
  }

  const selectSong = (index: number) => {
    setCurrentSong(index)
    setShowPlaylist(false)
    setIsPlaying(false)
    setCurrentTime(0)
    setAudioError(false)
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (audio && !isLoading && !audioError && duration > 0) {
      audio.currentTime = value[0]
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
      <audio ref={audioRef} preload="auto" crossOrigin="anonymous" playsInline controls={false} />

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
                        {audioError && <p className="text-xs text-red-500">Audio unavailable</p>}
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
                      disabled={isLoading || audioError}
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
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setShowPlaylist(true)} className="h-8 w-8">
                        <List className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowUploadHelp(true)}
                        className="h-8 w-8"
                        title="Upload Music Help"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {audioError && (
                    <Alert className="mt-3">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        <div className="space-y-2">
                          <p>Music files need to be uploaded to your Vercel deployment.</p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setAudioError(false)
                                nextSong()
                              }}
                              className="text-xs"
                            >
                              Try Next Song
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowUploadHelp(true)}
                              className="text-xs"
                            >
                              Upload Help
                            </Button>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
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

      {/* Playlist Modal */}
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
                        Romantic Playlist ({romanticPlaylist.length} songs)
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

      {/* Upload Help Modal */}
      <AnimatePresence>
        {showUploadHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Upload className="h-5 w-5 text-pink-500" />
                      How to Add Music to Your Website
                    </h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowUploadHelp(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">📁 Step 1: Create Audio Folder</h4>
                      <p className="text-gray-600">
                        Create a folder called <code className="bg-gray-100 px-1 rounded">public/audio</code> in your
                        project root.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">🎵 Step 2: Add Your Music Files</h4>
                      <p className="text-gray-600">Upload your MP3 files with these exact names:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                        <li>
                          <code>perfect-ed-sheeran.mp3</code>
                        </li>
                        <li>
                          <code>john-legend-all-of-me.mp3</code>
                        </li>
                        <li>
                          <code>adele-make-you-feel-my-love.mp3</code>
                        </li>
                        <li>
                          <code>sapphire-unity-acoustic.mp3</code>
                        </li>
                        <li>
                          <code>leave-the-door-open-bruno-mars.mp3</code>
                        </li>
                        <li>
                          <code>we-found-love-rihanna.mp3</code>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">🚀 Step 3: Deploy</h4>
                      <p className="text-gray-600">
                        Push your changes to GitHub and Vercel will automatically redeploy with the music files.
                      </p>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        The music player will automatically detect and play your uploaded files once they're deployed.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
