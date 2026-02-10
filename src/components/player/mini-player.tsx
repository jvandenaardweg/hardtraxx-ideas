import { Play, Pause, SkipBack, SkipForward, Volume2, List, X, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { usePlayerStore } from '@/stores/player-store'
import { formatDuration } from '@/lib/utils'
import { cn } from '@/lib/utils'

const platformIcons: Record<string, string> = {
  youtube: '📺',
  soundcloud: '🔊',
  mixcloud: '🎧',
  bandcamp: '🔗',
  spotify: '🎵',
  hearthis: '🎵',
  other: '🔗',
}

export function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    queue,
    isExpanded,
    isVisible,
    pauseTrack,
    resumeTrack,
    setCurrentTime,
    setVolume,
    playNext,
    playPrevious,
    removeFromQueue,
    toggleExpanded,
    hidePlayer,
  } = usePlayerStore()

  if (!isVisible) return null

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card transition-all duration-300',
        isExpanded ? 'h-80' : 'h-16'
      )}
    >
      {/* Expanded View */}
      {isExpanded && (
        <div className="absolute inset-x-0 top-0 bottom-16 overflow-hidden">
          <div className="mx-auto max-w-3xl px-4 py-4 h-full flex flex-col">
            {/* Collapse button */}
            <button
              onClick={toggleExpanded}
              className="absolute top-2 right-4 text-muted-foreground hover:text-foreground"
            >
              Minimize
            </button>

            {/* Current track details */}
            {currentTrack && (
              <div className="flex items-center gap-4 mb-4">
                {currentTrack.thumbnailUrl && (
                  <img
                    src={currentTrack.thumbnailUrl}
                    alt=""
                    className="h-20 w-20 rounded object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{currentTrack.title}</h3>
                  <p className="text-sm text-muted-foreground">{currentTrack.artistName}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{platformIcons[currentTrack.platform]}</span>
                    {currentTrack.bpm && <span>{currentTrack.bpm} BPM</span>}
                    {currentTrack.genre && <span>• {currentTrack.genre}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="mb-4">
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                onValueChange={([val]) => setCurrentTime((val / 100) * duration)}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{formatDuration(Math.floor(currentTime))}</span>
                <span>{formatDuration(Math.floor(duration))}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button variant="ghost" size="icon" onClick={playPrevious}>
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="h-12 w-12"
                onClick={isPlaying ? pauseTrack : resumeTrack}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={playNext}>
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            {/* Queue */}
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Queue ({queue.length})</h4>
                {queue.length > 0 && (
                  <button className="text-xs text-primary hover:underline">Clear</button>
                )}
              </div>
              <div className="space-y-1 overflow-y-auto max-h-24">
                {queue.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No tracks in queue</p>
                ) : (
                  queue.map((track, index) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between py-1 text-sm"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-muted-foreground">{index + 1}.</span>
                        <span className="truncate">{track.title}</span>
                        <span className="text-muted-foreground shrink-0">
                          {track.duration && formatDuration(track.duration)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromQueue(track.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mini bar (always visible at bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center px-4 gap-4">
        {/* Progress bar (mini) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-secondary">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>

        {/* Play/Pause */}
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={isPlaying ? pauseTrack : resumeTrack}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>

        {/* Track info */}
        {currentTrack ? (
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">
              {currentTrack.title} - {currentTrack.artistName}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                {formatDuration(Math.floor(currentTime))} / {formatDuration(Math.floor(duration))}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex-1 text-sm text-muted-foreground">No track playing</div>
        )}

        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2 w-32">
          <Volume2 className="h-4 w-4 text-muted-foreground shrink-0" />
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={([val]) => setVolume(val / 100)}
            className="cursor-pointer"
          />
        </div>

        {/* Queue */}
        <Button
          variant="ghost"
          size="sm"
          className="shrink-0 gap-1"
          onClick={toggleExpanded}
        >
          <List className="h-4 w-4" />
          <span className="hidden sm:inline">Queue</span>
          {queue.length > 0 && (
            <span className="ml-1 rounded bg-primary px-1.5 text-xs text-primary-foreground">
              {queue.length}
            </span>
          )}
          <ChevronUp className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')} />
        </Button>

        {/* Close */}
        <Button variant="ghost" size="icon" className="shrink-0" onClick={hidePlayer}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
