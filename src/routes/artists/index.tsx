import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Search,
  Users,
  Music,
  Play,
  Star,
  TrendingUp,
  Filter,
  Grid3X3,
  List,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatNumber } from '@/lib/utils'
import { usePlayerStore, type Track } from '@/stores/player-store'

export const Route = createFileRoute('/artists/')({
  component: ArtistsPage,
})

interface Artist {
  id: string
  name: string
  slug: string
  avatarUrl: string
  bannerUrl?: string
  genres: string[]
  country: string
  isVerified: boolean
  followers: number
  trackCount: number
  monthlyListeners?: number
  bio?: string
  latestRelease?: {
    id: string
    title: string
    thumbnailUrl: string
    platform: 'youtube' | 'soundcloud' | 'mixcloud' | 'bandcamp' | 'spotify' | 'hearthis' | 'other'
    embedUrl: string
  }
}

// Sample featured artists
const featuredArtists: Artist[] = [
  {
    id: 'a1',
    name: 'Headhunterz',
    slug: 'headhunterz',
    avatarUrl: 'https://picsum.photos/seed/headhunterz/200/200',
    bannerUrl: 'https://picsum.photos/seed/headhunterz-banner/800/300',
    genres: ['Hardstyle', 'Euphoric'],
    country: 'Netherlands',
    isVerified: true,
    followers: 1250000,
    trackCount: 156,
    monthlyListeners: 890000,
    bio: 'Pioneer of modern hardstyle, bringing euphoric melodies to the masses.',
    latestRelease: {
      id: 'lr1',
      title: 'Path of the Hunter',
      thumbnailUrl: 'https://picsum.photos/seed/headhunterz-track/100/100',
      platform: 'spotify',
      embedUrl: 'https://open.spotify.com/track/example',
    },
  },
  {
    id: 'a2',
    name: 'D-Sturb',
    slug: 'd-sturb',
    avatarUrl: 'https://picsum.photos/seed/dsturb/200/200',
    bannerUrl: 'https://picsum.photos/seed/dsturb-banner/800/300',
    genres: ['Raw Hardstyle'],
    country: 'Netherlands',
    isVerified: true,
    followers: 425000,
    trackCount: 89,
    monthlyListeners: 320000,
    bio: 'Raw hardstyle sensation known for powerful kicks and emotional melodies.',
    latestRelease: {
      id: 'lr2',
      title: 'Open Your Eyes',
      thumbnailUrl: 'https://picsum.photos/seed/dsturb-track/100/100',
      platform: 'youtube',
      embedUrl: 'https://youtube.com/watch?v=example',
    },
  },
  {
    id: 'a3',
    name: 'Angerfist',
    slug: 'angerfist',
    avatarUrl: 'https://picsum.photos/seed/angerfist/200/200',
    bannerUrl: 'https://picsum.photos/seed/angerfist-banner/800/300',
    genres: ['Hardcore', 'Industrial'],
    country: 'Netherlands',
    isVerified: true,
    followers: 890000,
    trackCount: 234,
    monthlyListeners: 560000,
    bio: 'The face of hardcore for over two decades. Masters of Hardcore legend.',
    latestRelease: {
      id: 'lr3',
      title: 'Criminally Insane',
      thumbnailUrl: 'https://picsum.photos/seed/angerfist-track/100/100',
      platform: 'soundcloud',
      embedUrl: 'https://soundcloud.com/angerfist/example',
    },
  },
]

// Sample all artists
const allArtists: Artist[] = [
  ...featuredArtists,
  {
    id: 'a4',
    name: 'Warface',
    slug: 'warface',
    avatarUrl: 'https://picsum.photos/seed/warface/200/200',
    genres: ['Raw Hardstyle'],
    country: 'Netherlands',
    isVerified: true,
    followers: 380000,
    trackCount: 112,
    monthlyListeners: 280000,
  },
  {
    id: 'a5',
    name: 'Sub Zero Project',
    slug: 'sub-zero-project',
    avatarUrl: 'https://picsum.photos/seed/szp/200/200',
    genres: ['Hardstyle', 'Raw'],
    country: 'Netherlands',
    isVerified: true,
    followers: 520000,
    trackCount: 78,
    monthlyListeners: 410000,
  },
  {
    id: 'a6',
    name: 'Rebelion',
    slug: 'rebelion',
    avatarUrl: 'https://picsum.photos/seed/rebelion/200/200',
    genres: ['Raw Hardstyle'],
    country: 'Netherlands',
    isVerified: true,
    followers: 290000,
    trackCount: 95,
    monthlyListeners: 195000,
  },
  {
    id: 'a7',
    name: 'Dr. Peacock',
    slug: 'dr-peacock',
    avatarUrl: 'https://picsum.photos/seed/drpeacock/200/200',
    genres: ['Frenchcore'],
    country: 'Netherlands',
    isVerified: true,
    followers: 340000,
    trackCount: 167,
    monthlyListeners: 230000,
  },
  {
    id: 'a8',
    name: 'Sefa',
    slug: 'sefa',
    avatarUrl: 'https://picsum.photos/seed/sefa/200/200',
    genres: ['Frenchcore', 'Hardcore'],
    country: 'Netherlands',
    isVerified: true,
    followers: 410000,
    trackCount: 89,
    monthlyListeners: 350000,
  },
  {
    id: 'a9',
    name: 'Miss K8',
    slug: 'miss-k8',
    avatarUrl: 'https://picsum.photos/seed/missk8/200/200',
    genres: ['Hardcore', 'Industrial'],
    country: 'Ukraine',
    isVerified: true,
    followers: 280000,
    trackCount: 78,
    monthlyListeners: 185000,
  },
  {
    id: 'a10',
    name: 'Wildstylez',
    slug: 'wildstylez',
    avatarUrl: 'https://picsum.photos/seed/wildstylez/200/200',
    genres: ['Hardstyle', 'Euphoric'],
    country: 'Netherlands',
    isVerified: true,
    followers: 620000,
    trackCount: 134,
    monthlyListeners: 420000,
  },
  {
    id: 'a11',
    name: 'Ran-D',
    slug: 'ran-d',
    avatarUrl: 'https://picsum.photos/seed/rand/200/200',
    genres: ['Hardstyle'],
    country: 'Netherlands',
    isVerified: true,
    followers: 390000,
    trackCount: 98,
    monthlyListeners: 290000,
  },
  {
    id: 'a12',
    name: 'N-Vitral',
    slug: 'n-vitral',
    avatarUrl: 'https://picsum.photos/seed/nvitral/200/200',
    genres: ['Hardcore', 'Industrial'],
    country: 'Netherlands',
    isVerified: true,
    followers: 180000,
    trackCount: 76,
    monthlyListeners: 120000,
  },
]

const genres = ['Hardstyle', 'Raw Hardstyle', 'Euphoric', 'Hardcore', 'Frenchcore', 'Industrial', 'Uptempo']
const countries = ['Netherlands', 'Germany', 'Belgium', 'Italy', 'Ukraine', 'Australia']

function ArtistsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'followers' | 'name' | 'tracks'>('followers')

  const filteredArtists = allArtists
    .filter(artist => {
      if (searchQuery && !artist.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
      if (selectedGenre && !artist.genres.includes(selectedGenre)) return false
      if (selectedCountry && artist.country !== selectedCountry) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'followers') return b.followers - a.followers
      if (sortBy === 'tracks') return b.trackCount - a.trackCount
      return a.name.localeCompare(b.name)
    })

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Artists</h1>
        <p className="text-muted-foreground mb-4">Discover DJs and producers in the hard dance scene</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artists..."
              className="h-10 w-full rounded-lg border border-input bg-secondary pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={showFilters ? 'default' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-10 rounded-lg border border-input bg-secondary px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="followers">Most Followers</option>
              <option value="tracks">Most Tracks</option>
              <option value="name">A-Z</option>
            </select>
            <div className="flex rounded-lg border border-border">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 rounded-lg border border-border bg-card p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="text-sm font-medium mb-2 block">Genre</span>
                <div className="flex flex-wrap gap-2">
                  {genres.map(genre => (
                    <button
                      type="button"
                      key={genre}
                      onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                      className={cn(
                        'rounded-full px-3 py-1 text-xs transition-colors',
                        selectedGenre === genre
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-secondary/80'
                      )}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium mb-2 block">Country</span>
                <div className="flex flex-wrap gap-2">
                  {countries.map(country => (
                    <button
                      type="button"
                      key={country}
                      onClick={() => setSelectedCountry(selectedCountry === country ? null : country)}
                      className={cn(
                        'rounded-full px-3 py-1 text-xs transition-colors',
                        selectedCountry === country
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-secondary/80'
                      )}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => {
                setSelectedGenre(null)
                setSelectedCountry(null)
              }}>
                Clear All
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Featured Artists */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-yellow-400" />
          <h2 className="text-xl font-semibold">Featured Artists</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredArtists.map(artist => (
            <FeaturedArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* Trending This Week */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-green-400" />
          <h2 className="text-xl font-semibold">Trending This Week</h2>
          <button type="button" className="ml-auto text-sm text-primary hover:underline flex items-center">
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="rounded-lg border border-border bg-card">
          {allArtists.slice(0, 5).map((artist, index) => (
            <TrendingArtistRow key={artist.id} artist={artist} rank={index + 1} />
          ))}
        </div>
      </section>

      {/* All Artists */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-semibold">All Artists</h2>
          </div>
          <span className="text-sm text-muted-foreground">{filteredArtists.length} artists</span>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredArtists.map(artist => (
              <ArtistListItem key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function FeaturedArtistCard({ artist }: { artist: Artist }) {
  const { playTrack } = usePlayerStore()

  const handlePlayLatest = () => {
    if (artist.latestRelease) {
      const track: Track = {
        id: artist.latestRelease.id,
        title: artist.latestRelease.title,
        artistName: artist.name,
        platform: artist.latestRelease.platform,
        embedUrl: artist.latestRelease.embedUrl,
        originalUrl: artist.latestRelease.embedUrl,
        thumbnailUrl: artist.latestRelease.thumbnailUrl,
      }
      playTrack(track)
    }
  }

  return (
    <Link to="/artists/$artistId" params={{ artistId: artist.slug }}>
      <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-transform hover:scale-[1.02]">
        {/* Banner */}
        <div className="relative h-32">
          <img 
            src={artist.bannerUrl || artist.avatarUrl} 
            alt="" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute top-2 right-2">
            <span className="rounded bg-yellow-500 px-2 py-0.5 text-xs font-bold text-black">
              FEATURED
            </span>
          </div>
        </div>

        {/* Avatar */}
        <div className="relative -mt-12 px-4">
          <div className="relative inline-block">
            <img 
              src={artist.avatarUrl} 
              alt={artist.name}
              className="h-20 w-20 rounded-full border-4 border-card object-cover"
            />
            {artist.isVerified && (
              <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                ✓
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 pt-2">
          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
            {artist.name}
          </h3>
          <div className="flex flex-wrap gap-1 mt-1 mb-2">
            {artist.genres.map(genre => (
              <span key={genre} className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                {genre}
              </span>
            ))}
          </div>
          {artist.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{artist.bio}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {formatNumber(artist.followers)}
            </span>
            <span className="flex items-center gap-1">
              <Music className="h-3 w-3" />
              {artist.trackCount} tracks
            </span>
          </div>

          {/* Latest Release */}
          {artist.latestRelease && (
            <div className="mt-3 flex items-center gap-2 rounded bg-secondary p-2">
              <img 
                src={artist.latestRelease.thumbnailUrl} 
                alt="" 
                className="h-10 w-10 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Latest Release</p>
                <p className="text-sm font-medium truncate">{artist.latestRelease.title}</p>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 shrink-0"
                onClick={(e) => {
                  e.preventDefault()
                  handlePlayLatest()
                }}
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link to="/artists/$artistId" params={{ artistId: artist.slug }}>
      <div className="group overflow-hidden rounded-lg border border-border bg-card p-4 transition-colors hover:border-muted-foreground/50">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <img 
              src={artist.avatarUrl} 
              alt={artist.name}
              className="h-24 w-24 rounded-full object-cover"
            />
            {artist.isVerified && (
              <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                ✓
              </span>
            )}
          </div>
          <h3 className="font-semibold group-hover:text-primary transition-colors">
            {artist.name}
          </h3>
          <div className="flex flex-wrap justify-center gap-1 mt-1 mb-2">
            {artist.genres.slice(0, 2).map(genre => (
              <span key={genre} className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                {genre}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formatNumber(artist.followers)} followers</span>
            <span>{artist.trackCount} tracks</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ArtistListItem({ artist }: { artist: Artist }) {
  return (
    <Link to="/artists/$artistId" params={{ artistId: artist.slug }}>
      <div className="group flex items-center gap-4 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-secondary/50">
        <div className="relative shrink-0">
          <img 
            src={artist.avatarUrl} 
            alt={artist.name}
            className="h-14 w-14 rounded-full object-cover"
          />
          {artist.isVerified && (
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              ✓
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold group-hover:text-primary transition-colors">
            {artist.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{artist.genres.join(' · ')}</span>
            <span>•</span>
            <span>{artist.country}</span>
          </div>
        </div>
        <div className="text-right text-sm text-muted-foreground shrink-0">
          <p>{formatNumber(artist.followers)} followers</p>
          <p>{artist.trackCount} tracks</p>
        </div>
        <Button variant="outline" size="sm" onClick={(e) => e.preventDefault()}>
          Follow
        </Button>
      </div>
    </Link>
  )
}

function TrendingArtistRow({ artist, rank }: { artist: Artist; rank: number }) {
  return (
    <Link to="/artists/$artistId" params={{ artistId: artist.slug }}>
      <div className="group flex items-center gap-4 border-b border-border p-4 last:border-0 transition-colors hover:bg-secondary/50">
        <span className="w-8 text-center text-lg font-bold text-muted-foreground">
          {rank}
        </span>
        <div className="relative shrink-0">
          <img 
            src={artist.avatarUrl} 
            alt={artist.name}
            className="h-12 w-12 rounded-full object-cover"
          />
          {artist.isVerified && (
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              ✓
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium group-hover:text-primary transition-colors">
            {artist.name}
          </h3>
          <p className="text-sm text-muted-foreground">{artist.genres.join(' · ')}</p>
        </div>
        <div className="flex items-center gap-1 text-green-500 text-sm">
          <TrendingUp className="h-4 w-4" />
          <span>+{Math.floor(Math.random() * 20) + 5}%</span>
        </div>
        <div className="text-right text-sm text-muted-foreground shrink-0 hidden sm:block">
          <p>{formatNumber(artist.followers)} followers</p>
        </div>
      </div>
    </Link>
  )
}
