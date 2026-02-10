import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Search,
  Play,
  ListPlus,
  TrendingUp,
  Clock,
  Flame,
  Music,
  Filter,
  ChevronRight,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { formatDuration, formatNumber, cn } from '@/lib/utils'
import { usePlayerStore, type Track } from '@/stores/player-store'

export const Route = createFileRoute('/discover')({
  component: DiscoverPage,
})

// Genre data
const genres = [
  { id: 'hardstyle', name: 'Hardstyle', color: '#ff4444', trackCount: 45000, icon: '🎵' },
  { id: 'raw', name: 'Raw Hardstyle', color: '#ff6b00', trackCount: 23000, icon: '🔥' },
  { id: 'hardcore', name: 'Hardcore', color: '#8b00ff', trackCount: 38000, icon: '💀' },
  { id: 'frenchcore', name: 'Frenchcore', color: '#0088ff', trackCount: 15000, icon: '🇫🇷' },
  { id: 'uptempo', name: 'Uptempo', color: '#ff00aa', trackCount: 12000, icon: '⚡' },
  { id: 'industrial', name: 'Industrial', color: '#666666', trackCount: 8000, icon: '🏭' },
  { id: 'euphoric', name: 'Euphoric', color: '#ffaa00', trackCount: 35000, icon: '✨' },
  { id: 'classic', name: 'Classic', color: '#00aa88', trackCount: 20000, icon: '🕰️' },
]

// Sample featured tracks
const featuredTracks: TrackItem[] = [
  {
    id: 'f1',
    title: 'High Power',
    artistName: 'D-Sturb',
    platform: 'youtube',
    thumbnailUrl: 'https://picsum.photos/seed/dsturb/300/300',
    duration: 252,
    bpm: 150,
    genre: 'Raw Hardstyle',
    plays: 125000,
    isFeatured: true,
  },
  {
    id: 'f2',
    title: 'Resistance',
    artistName: 'Sub Zero Project',
    platform: 'youtube',
    thumbnailUrl: 'https://picsum.photos/seed/szp/300/300',
    duration: 285,
    bpm: 150,
    genre: 'Hardstyle',
    plays: 890000,
    isFeatured: true,
  },
  {
    id: 'f3',
    title: 'Masters of Hardcore 2025 Anthem',
    artistName: 'Angerfist',
    platform: 'soundcloud',
    thumbnailUrl: 'https://picsum.photos/seed/angerfist2/300/300',
    duration: 312,
    bpm: 190,
    genre: 'Hardcore',
    plays: 450000,
    isFeatured: true,
  },
]

// Sample new releases
const newReleases: TrackItem[] = [
  {
    id: 'n1',
    title: 'Unleashed',
    artistName: 'Warface & D-Sturb',
    platform: 'youtube',
    thumbnailUrl: 'https://picsum.photos/seed/unleashed/300/300',
    duration: 268,
    bpm: 155,
    genre: 'Raw Hardstyle',
    plays: 45000,
    releaseDate: '2 days ago',
  },
  {
    id: 'n2',
    title: 'Trip to France',
    artistName: 'Dr. Peacock',
    platform: 'bandcamp',
    thumbnailUrl: 'https://picsum.photos/seed/peacock/300/300',
    duration: 295,
    bpm: 200,
    genre: 'Frenchcore',
    plays: 23000,
    releaseDate: '3 days ago',
  },
  {
    id: 'n3',
    title: 'Dominator',
    artistName: 'Rebelion',
    platform: 'soundcloud',
    thumbnailUrl: 'https://picsum.photos/seed/rebelion2/300/300',
    duration: 278,
    bpm: 155,
    genre: 'Raw Hardstyle',
    plays: 67000,
    releaseDate: '5 days ago',
  },
  {
    id: 'n4',
    title: 'Into The Night',
    artistName: 'Headhunterz',
    platform: 'youtube',
    thumbnailUrl: 'https://picsum.photos/seed/hhz/300/300',
    duration: 245,
    bpm: 150,
    genre: 'Hardstyle',
    plays: 156000,
    releaseDate: '1 week ago',
  },
]

// Sample top tracks
const topTracks: TrackItem[] = [
  {
    id: 't1',
    title: 'The Resistance',
    artistName: 'Sub Zero Project',
    platform: 'youtube',
    thumbnailUrl: 'https://picsum.photos/seed/szp2/300/300',
    duration: 285,
    bpm: 150,
    genre: 'Hardstyle',
    plays: 2500000,
    rank: 1,
  },
  {
    id: 't2',
    title: 'FTP',
    artistName: 'Warface',
    platform: 'youtube',
    thumbnailUrl: 'https://picsum.photos/seed/warface2/300/300',
    duration: 298,
    bpm: 155,
    genre: 'Raw Hardstyle',
    plays: 1800000,
    rank: 2,
  },
  {
    id: 't3',
    title: 'Raise Your Fist',
    artistName: 'Angerfist',
    platform: 'youtube',
    thumbnailUrl: 'https://picsum.photos/seed/anger2/300/300',
    duration: 312,
    bpm: 185,
    genre: 'Hardcore',
    plays: 1650000,
    rank: 3,
  },
  {
    id: 't4',
    title: 'Headhunterz - Dragonborn',
    artistName: 'Headhunterz',
    platform: 'youtube',
    thumbnailUrl: 'https://picsum.photos/seed/hhz2/300/300',
    duration: 267,
    bpm: 150,
    genre: 'Hardstyle',
    plays: 1400000,
    rank: 4,
  },
  {
    id: 't5',
    title: 'Overdose',
    artistName: 'Rebelion',
    platform: 'soundcloud',
    thumbnailUrl: 'https://picsum.photos/seed/reb2/300/300',
    duration: 289,
    bpm: 155,
    genre: 'Raw Hardstyle',
    plays: 1200000,
    rank: 5,
  },
]

// Sample mixes
const topMixes: TrackItem[] = [
  {
    id: 'm1',
    title: 'Defqon.1 2025 Liveset',
    artistName: 'Warface',
    platform: 'youtube',
    thumbnailUrl: 'https://picsum.photos/seed/defqon25/300/300',
    duration: 3501,
    bpm: 155,
    genre: 'Raw Hardstyle',
    plays: 450000,
    rank: 1,
  },
  {
    id: 'm2',
    title: 'Qlimax 2025 Full Set',
    artistName: 'D-Sturb',
    platform: 'youtube',
    thumbnailUrl: 'https://picsum.photos/seed/qlimax25/300/300',
    duration: 3780,
    bpm: 150,
    genre: 'Raw Hardstyle',
    plays: 380000,
    rank: 2,
  },
  {
    id: 'm3',
    title: 'Masters of Hardcore 2025',
    artistName: 'Angerfist',
    platform: 'mixcloud',
    thumbnailUrl: 'https://picsum.photos/seed/moh25/300/300',
    duration: 5520,
    bpm: 190,
    genre: 'Hardcore',
    plays: 290000,
    rank: 3,
  },
  {
    id: 'm4',
    title: 'Defqon.1 2025 - RED Stage',
    artistName: 'Various Artists',
    platform: 'youtube',
    thumbnailUrl: 'https://picsum.photos/seed/defqonred/300/300',
    duration: 7200,
    bpm: 150,
    genre: 'Hardstyle',
    plays: 520000,
    rank: 4,
  },
  {
    id: 'm5',
    title: 'Sefa Live at Dominator',
    artistName: 'Sefa',
    platform: 'youtube',
    thumbnailUrl: 'https://picsum.photos/seed/sefa/300/300',
    duration: 4200,
    bpm: 200,
    genre: 'Frenchcore',
    plays: 210000,
    rank: 5,
  },
]

interface TrackItem {
  id: string
  title: string
  artistName: string
  platform: 'youtube' | 'soundcloud' | 'mixcloud' | 'bandcamp' | 'spotify' | 'hearthis' | 'other'
  thumbnailUrl: string
  duration: number
  bpm: number
  genre: string
  plays: number
  isFeatured?: boolean
  releaseDate?: string
  rank?: number
}

const platformIcons: Record<string, string> = {
  youtube: '📺',
  soundcloud: '🔊',
  mixcloud: '🎧',
  bandcamp: '🔗',
  spotify: '🎵',
  hearthis: '🎵',
  other: '🔗',
}

function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [bpmRange, setBpmRange] = useState<[number, number]>([140, 200])
  const [showFilters, setShowFilters] = useState(false)

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Discover</h1>
        <p className="text-muted-foreground mb-4">Find new tracks, mixes, and artists</p>

        <div className="flex gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tracks, artists, mixes..."
              className="h-12 w-full rounded-lg border border-input bg-secondary pl-11 pr-4 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button
            variant={showFilters ? 'default' : 'outline'}
            size="lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 rounded-lg border border-border bg-card p-4">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Genre Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Genre</label>
                <div className="flex flex-wrap gap-2">
                  {genres.slice(0, 6).map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => setSelectedGenre(selectedGenre === genre.id ? null : genre.id)}
                      className={cn(
                        'rounded-full px-3 py-1 text-xs transition-colors',
                        selectedGenre === genre.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-secondary/80'
                      )}
                    >
                      {genre.icon} {genre.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* BPM Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  BPM Range: {bpmRange[0]} - {bpmRange[1]}
                </label>
                <Slider
                  value={bpmRange}
                  min={100}
                  max={250}
                  step={5}
                  onValueChange={(value) => setBpmRange(value as [number, number])}
                  className="mt-4"
                />
              </div>

              {/* Platform Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Platform</label>
                <div className="flex flex-wrap gap-2">
                  {['youtube', 'soundcloud', 'mixcloud', 'bandcamp'].map((platform) => (
                    <button
                      key={platform}
                      className="rounded-full bg-secondary px-3 py-1 text-xs hover:bg-secondary/80 transition-colors"
                    >
                      {platformIcons[platform]} {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => {
                setSelectedGenre(null)
                setBpmRange([140, 200])
              }}>
                Clear All
              </Button>
              <Button size="sm">Apply Filters</Button>
            </div>
          </div>
        )}
      </div>

      {/* Genre Cards */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Browse by Genre</h2>
          <button className="text-sm text-primary hover:underline flex items-center">
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-yellow-400" />
          <h2 className="text-xl font-semibold">Featured This Week</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTracks.map((track) => (
            <FeaturedTrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-blue-400" />
          <h2 className="text-xl font-semibold">New Releases</h2>
          <button className="ml-auto text-sm text-primary hover:underline flex items-center">
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {newReleases.map((track) => (
            <TrackCard key={track.id} track={track} showReleaseDate />
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-green-400" />
          <h2 className="text-xl font-semibold">Charts</h2>
        </div>

        <Tabs defaultValue="tracks" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="tracks">
              <Music className="mr-1 h-4 w-4" />
              Top Tracks
            </TabsTrigger>
            <TabsTrigger value="mixes">
              <Flame className="mr-1 h-4 w-4" />
              Top Mixes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracks">
            <div className="rounded-lg border border-border bg-card">
              {topTracks.map((track, index) => (
                <ChartRow key={track.id} track={track} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mixes">
            <div className="rounded-lg border border-border bg-card">
              {topMixes.map((track, index) => (
                <ChartRow key={track.id} track={track} index={index} isMix />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}

function GenreCard({ genre }: { genre: typeof genres[0] }) {
  return (
    <button
      className="group relative overflow-hidden rounded-lg p-4 transition-transform hover:scale-105"
      style={{ backgroundColor: `${genre.color}20` }}
    >
      <div
        className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30"
        style={{ backgroundColor: genre.color }}
      />
      <div className="relative">
        <span className="text-3xl mb-2 block">{genre.icon}</span>
        <h3 className="font-semibold" style={{ color: genre.color }}>
          {genre.name}
        </h3>
        <p className="text-xs text-muted-foreground">{formatNumber(genre.trackCount)} tracks</p>
      </div>
    </button>
  )
}

function FeaturedTrackCard({ track }: { track: TrackItem }) {
  const { playTrack, addToQueue } = usePlayerStore()

  const handlePlay = () => {
    const t: Track = {
      id: track.id,
      title: track.title,
      artistName: track.artistName,
      platform: track.platform,
      embedUrl: '',
      originalUrl: '',
      thumbnailUrl: track.thumbnailUrl,
      duration: track.duration,
      bpm: track.bpm,
      genre: track.genre,
    }
    playTrack(t)
  }

  const handleQueue = () => {
    const t: Track = {
      id: track.id,
      title: track.title,
      artistName: track.artistName,
      platform: track.platform,
      embedUrl: '',
      originalUrl: '',
      thumbnailUrl: track.thumbnailUrl,
      duration: track.duration,
      bpm: track.bpm,
      genre: track.genre,
    }
    addToQueue(t)
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative aspect-video">
        <img src={track.thumbnailUrl} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <Play className="h-6 w-6 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </button>
        <div className="absolute top-2 left-2">
          <span className="rounded bg-yellow-500 px-2 py-0.5 text-xs font-medium text-black">
            FEATURED
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-semibold text-white truncate">{track.title}</h3>
          <p className="text-sm text-white/80">{track.artistName}</p>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>{platformIcons[track.platform]}</span>
            <span>{formatDuration(track.duration)}</span>
            <span>{track.bpm} BPM</span>
          </div>
          <div className="flex items-center gap-1">
            <Play className="h-3 w-3" />
            {formatNumber(track.plays)}
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <Button size="sm" className="flex-1" onClick={handlePlay}>
            <Play className="mr-1 h-3 w-3" />
            Play
          </Button>
          <Button size="sm" variant="outline" onClick={handleQueue}>
            <ListPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function TrackCard({ track, showReleaseDate }: { track: TrackItem; showReleaseDate?: boolean }) {
  const { playTrack, addToQueue } = usePlayerStore()

  const handlePlay = () => {
    const t: Track = {
      id: track.id,
      title: track.title,
      artistName: track.artistName,
      platform: track.platform,
      embedUrl: '',
      originalUrl: '',
      thumbnailUrl: track.thumbnailUrl,
      duration: track.duration,
      bpm: track.bpm,
      genre: track.genre,
    }
    playTrack(t)
  }

  return (
    <div className="group">
      <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
        <img src={track.thumbnailUrl} alt="" className="w-full h-full object-cover" />
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <Play className="h-5 w-5 text-primary-foreground ml-0.5" fill="currentColor" />
          </div>
        </button>
      </div>
      <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors cursor-pointer">
        {track.title}
      </h3>
      <p className="text-xs text-muted-foreground truncate">{track.artistName}</p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
        {showReleaseDate && track.releaseDate ? (
          <span>{track.releaseDate}</span>
        ) : (
          <>
            <span>{track.bpm} BPM</span>
            <span>•</span>
            <span>{formatNumber(track.plays)} plays</span>
          </>
        )}
      </div>
    </div>
  )
}

function ChartRow({ track, index, isMix }: { track: TrackItem; index: number; isMix?: boolean }) {
  const { playTrack, addToQueue } = usePlayerStore()

  const handlePlay = () => {
    const t: Track = {
      id: track.id,
      title: track.title,
      artistName: track.artistName,
      platform: track.platform,
      embedUrl: '',
      originalUrl: '',
      thumbnailUrl: track.thumbnailUrl,
      duration: track.duration,
      bpm: track.bpm,
      genre: track.genre,
    }
    playTrack(t)
  }

  const handleQueue = () => {
    const t: Track = {
      id: track.id,
      title: track.title,
      artistName: track.artistName,
      platform: track.platform,
      embedUrl: '',
      originalUrl: '',
      thumbnailUrl: track.thumbnailUrl,
      duration: track.duration,
      bpm: track.bpm,
      genre: track.genre,
    }
    addToQueue(t)
  }

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'text-yellow-400 font-bold'
    if (rank === 2) return 'text-gray-300 font-bold'
    if (rank === 3) return 'text-amber-600 font-bold'
    return 'text-muted-foreground'
  }

  return (
    <div
      className={cn(
        'flex items-center gap-4 p-3 hover:bg-secondary/50 transition-colors group',
        index !== 0 && 'border-t border-border'
      )}
    >
      {/* Rank */}
      <div className={cn('w-8 text-center text-lg', getRankStyle(track.rank || index + 1))}>
        {track.rank || index + 1}
      </div>

      {/* Thumbnail */}
      <div className="relative h-12 w-12 rounded overflow-hidden shrink-0">
        <img src={track.thumbnailUrl} alt="" className="w-full h-full object-cover" />
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Play className="h-5 w-5 text-white" fill="white" />
        </button>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors cursor-pointer">
          {track.title}
        </h3>
        <p className="text-xs text-muted-foreground truncate">{track.artistName}</p>
      </div>

      {/* Meta */}
      <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
        <span className="w-16">{track.genre}</span>
        <span className="w-12">{track.bpm} BPM</span>
        <span className="w-14">{formatDuration(track.duration)}</span>
        <span className="w-16 text-right">{formatNumber(track.plays)} plays</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePlay}>
          <Play className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleQueue}>
          <ListPlus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
