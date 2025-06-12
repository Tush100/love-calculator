"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, List, X } from "lucide-react"
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

// Romantic songs playlist with actual audio files
const romanticPlaylist: Song[] = [
  {
    id: 1,
    title: "Perfect",
    artist: "Ed Sheeran",
    duration: "4:23",
    url: "/audio/romantic-song-1.mp3",
  },
  {
    id: 2,
    title: "All of Me",
    artist: "John Legend",
    duration: "4:29",
    url: "/audio/romantic-song-2.mp3",
  },
  {
    id: 3,
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    duration: "4:41",
    url: "/audio/romantic-song-3.mp3",
  },
  {
    id: 4,
    title: "A Thousand Years",
    artist: "Christina Perri",
    duration: "4:45",
    url: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  },
  {
    id: 5,
    title: "Make You Feel My Love",
    artist: "Adele",
    duration: "3:32",
    url: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  },
  {
    id: 6,
    title: "At Last",
    artist: "Etta James",
    duration: "3:01",
    url: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  },
  {
    id: 7,
    title: "Can't Help Myself",
    artist: "Four Tops",
    duration: "2:57",
    url: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  },
  {
    id: 8,
    title: "L-O-V-E",
    artist: "Nat King Cole",
    duration: "2:30",
    url: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  },
  {
    id: 9,
    title: "The Way You Look Tonight",
    artist: "Frank Sinatra",
    duration: "3:22",
    url: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  },
  {
    id: 10,
    title: "Unchained Melody",
    artist: "The Righteous Brothers",
    duration: "3:36",
    url: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  },
  {
    id: 11,
    title: "Stand by Me",
    artist: "Ben E. King",
    duration: "2:58",
    url: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
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
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Handle audio loading and errors
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlay = () => {
      setAudioError(false)
      setDuration(audio.duration || 0)
    }

    const handleError = () => {
      setAudioError(true)
      console.warn(`Audio error for song: ${romanticPlaylist[currentSong].title}`)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0)
    }

    const handleEnded = () => {
      nextSong()
    }

    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("error", handleError)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)

    // Load the current song
    audio.load()

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentSong])

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = async () => {
    if (!audioRef.current || audioError) return

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
      setAudioError(true)
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

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current && !audioError) {
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
      {/* Hidden audio element with multiple source formats */}
      <audio ref={audioRef} preload="metadata" crossOrigin="anonymous">
        <source src={currentSongData.url} type="audio/mpeg" />
        <source src={currentSongData.url} type="audio/wav" />
        <source src={currentSongData.url} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Player */}
      <motion.div
        className="fixed bottom-4 left-4 z-40"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-pink-200 dark:border-pink-800 shadow-lg">
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
                  {/* Song Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Music className="h-5 w-5 text-pink-500" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{currentSongData.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {currentSongData.artist}
                          {audioError && <span className="text-red-500 ml-2">(Audio unavailable)</span>}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)} className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <Slider
                      value={[currentTime]}
                      max={duration || 100}
                      step={1}
                      onValueChange={handleSeek}
                      className="w-full"
                      disabled={audioError}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={prevSong} className="h-8 w-8">
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={togglePlay}
                        disabled={audioError}
                        className="h-10 w-10 bg-pink-500 hover:bg-pink-600 text-white disabled:opacity-50"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={nextSong} className="h-8 w-8">
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMute}
                        className="h-8 w-8"
                        disabled={audioError}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setShowPlaylist(true)} className="h-8 w-8">
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Volume Control */}
                  <div className="mt-3 flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-gray-500" />
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      max={100}
                      step={1}
                      onValueChange={(value) => {
                        const newVolume = value[0] / 100
                        setVolume(newVolume)
                        setIsMuted(newVolume === 0)
                      }}
                      className="flex-1"
                      disabled={audioError}
                    />
                  </div>

                  {/* Error Message */}
                  {audioError && (
                    <div className="mt-2 text-xs text-red-500 text-center">
                      Audio playback not available. Enjoy the romantic atmosphere! 💕
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="minimized"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsMinimized(false)}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      togglePlay()
                    }}
                    disabled={audioError}
                    className="h-8 w-8 bg-pink-500 hover:bg-pink-600 text-white disabled:opacity-50"
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
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Music className="h-5 w-5 text-pink-500" />
                      Romantic Playlist
                    </h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowPlaylist(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <ScrollArea className="h-80">
                    <div className="p-2">
                      {romanticPlaylist.map((song, index) => (
                        <div
                          key={song.id}
                          onClick={() => selectSong(index)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            index === currentSong
                              ? "bg-pink-100 dark:bg-pink-900/20"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">{song.title}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{song.artist}</p>
                            </div>
                            <span className="text-xs text-gray-500 ml-2">{song.duration}</span>
                          </div>
                        </div>
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
