import { create } from 'zustand'

export interface Track {
  id: string
  title: string
  artistName: string
  platform: 'youtube' | 'soundcloud' | 'mixcloud' | 'bandcamp' | 'spotify' | 'hearthis' | 'other'
  embedUrl: string
  originalUrl: string
  thumbnailUrl?: string
  duration?: number
  bpm?: number
  genre?: string
}

interface PlayerState {
  // Current track
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number

  // Queue
  queue: Track[]

  // UI State
  isExpanded: boolean
  isVisible: boolean

  // Actions
  playTrack: (track: Track) => void
  pauseTrack: () => void
  resumeTrack: () => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setVolume: (volume: number) => void
  addToQueue: (track: Track) => void
  removeFromQueue: (trackId: string) => void
  clearQueue: () => void
  playNext: () => void
  playPrevious: () => void
  toggleExpanded: () => void
  showPlayer: () => void
  hidePlayer: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  queue: [],
  isExpanded: false,
  isVisible: false,

  playTrack: (track) => {
    const { queue, currentTrack } = get()
    // If there's a current track, add it to the start of the queue
    const newQueue = currentTrack ? [currentTrack, ...queue] : queue
    set({
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
      isVisible: true,
      queue: newQueue.filter((t) => t.id !== track.id),
    })
  },

  pauseTrack: () => set({ isPlaying: false }),

  resumeTrack: () => set({ isPlaying: true }),

  setCurrentTime: (time) => set({ currentTime: time }),

  setDuration: (duration) => set({ duration }),

  setVolume: (volume) => set({ volume }),

  addToQueue: (track) => {
    const { queue } = get()
    if (!queue.find((t) => t.id === track.id)) {
      set({ queue: [...queue, track], isVisible: true })
    }
  },

  removeFromQueue: (trackId) => {
    const { queue } = get()
    set({ queue: queue.filter((t) => t.id !== trackId) })
  },

  clearQueue: () => set({ queue: [] }),

  playNext: () => {
    const { queue } = get()
    if (queue.length > 0) {
      const [nextTrack, ...rest] = queue
      set({
        currentTrack: nextTrack,
        queue: rest,
        isPlaying: true,
        currentTime: 0,
      })
    } else {
      set({ isPlaying: false })
    }
  },

  playPrevious: () => {
    // For now, just restart the current track
    set({ currentTime: 0 })
  },

  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),

  showPlayer: () => set({ isVisible: true }),

  hidePlayer: () => set({ isVisible: false, isPlaying: false, currentTrack: null }),
}))
