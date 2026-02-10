import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Users,
  Music,
  Calendar,
  Play,
  ListPlus,
  Share2,
  ExternalLink,
  MapPin,
  ChevronLeft,
  Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { formatNumber, formatDuration } from '@/lib/utils'
import { usePlayerStore, type Track } from '@/stores/player-store'

export const Route = createFileRoute('/artists/$artistId')({
  component: ArtistDetailPage,
})

interface ArtistTrack {
  id: string
  title: string
  thumbnailUrl: string
  platform: 'youtube' | 'soundcloud' | 'mixcloud' | 'bandcamp' | 'spotify' | 'hearthis' | 'other'
  embedUrl: string
  duration: number
  bpm?: number
  genre: string
  plays: number
  releaseDate: string
}

interface ArtistEvent {
  id: string
  name: string
  date: string
  venue: string
  city: string
  country: string
}

interface Artist {
  id: string
  name: string
  slug: string
  avatarUrl: string
  bannerUrl: string
  genres: string[]
  country: string
  isVerified: boolean
  followers: number
  following: number
  trackCount: number
  monthlyListeners: number
  bio: string
  socials: {
    instagram?: string
    twitter?: string
    facebook?: string
    soundcloud?: string
    spotify?: string
    youtube?: string
  }
  tracks: ArtistTrack[]
  upcomingEvents: ArtistEvent[]
}

// Sample artist data (would come from API in real app)
const artistsData: Record<string, Artist> = {
  'headhunterz': {
    id: 'a1',
    name: 'Headhunterz',
    slug: 'headhunterz',
    avatarUrl: 'https://picsum.photos/seed/headhunterz/400/400',
    bannerUrl: 'https://picsum.photos/seed/headhunterz-banner/1200/400',
    genres: ['Hardstyle', 'Euphoric'],
    country: 'Netherlands',
    isVerified: true,
    followers: 1250000,
    following: 156,
    trackCount: 156,
    monthlyListeners: 890000,
    bio: `Willem Rebergen, better known by his stage name Headhunterz, is a Dutch DJ and record producer. He's considered one of the most influential artists in the hardstyle genre.

Starting his career in 2005, Headhunterz quickly rose to prominence with his melodic approach to hardstyle. His tracks combine euphoric melodies with powerful kicks, creating an emotional experience for listeners worldwide.

He has headlined major festivals including Defqon.1, Tomorrowland, and EDC Las Vegas, and continues to push the boundaries of hard dance music.`,
    socials: {
      instagram: 'headhunterz',
      twitter: 'headhunterz',
      facebook: 'djheadhunterz',
      soundcloud: 'headhunterz',
      spotify: 'headhunterz',
      youtube: 'HeadhunterzOfficial',
    },
    tracks: [
      {
        id: 't1',
        title: 'Path of the Hunter',
        thumbnailUrl: 'https://picsum.photos/seed/track1/100/100',
        platform: 'spotify',
        embedUrl: 'https://open.spotify.com/track/example1',
        duration: 285,
        bpm: 150,
        genre: 'Hardstyle',
        plays: 2500000,
        releaseDate: '2026-01-15',
      },
      {
        id: 't2',
        title: 'Dragonborn III',
        thumbnailUrl: 'https://picsum.photos/seed/track2/100/100',
        platform: 'youtube',
        embedUrl: 'https://youtube.com/watch?v=example2',
        duration: 312,
        bpm: 150,
        genre: 'Hardstyle',
        plays: 8900000,
        releaseDate: '2025-06-20',
      },
      {
        id: 't3',
        title: 'The Return of Headhunterz',
        thumbnailUrl: 'https://picsum.photos/seed/track3/100/100',
        platform: 'soundcloud',
        embedUrl: 'https://soundcloud.com/headhunterz/example3',
        duration: 298,
        bpm: 150,
        genre: 'Hardstyle',
        plays: 5600000,
        releaseDate: '2024-11-10',
      },
      {
        id: 't4',
        title: 'Destiny (feat. Malukah)',
        thumbnailUrl: 'https://picsum.photos/seed/track4/100/100',
        platform: 'spotify',
        embedUrl: 'https://open.spotify.com/track/example4',
        duration: 275,
        bpm: 150,
        genre: 'Euphoric Hardstyle',
        plays: 12000000,
        releaseDate: '2023-08-05',
      },
      {
        id: 't5',
        title: 'Orange Heart',
        thumbnailUrl: 'https://picsum.photos/seed/track5/100/100',
        platform: 'youtube',
        embedUrl: 'https://youtube.com/watch?v=example5',
        duration: 305,
        bpm: 150,
        genre: 'Hardstyle',
        plays: 3200000,
        releaseDate: '2022-04-18',
      },
    ],
    upcomingEvents: [
      {
        id: 'e1',
        name: 'Defqon.1 2026',
        date: '2026-06-26',
        venue: 'Evenemententerrein',
        city: 'Biddinghuizen',
        country: 'Netherlands',
      },
      {
        id: 'e2',
        name: 'Qlimax 2026',
        date: '2026-11-21',
        venue: 'GelreDome',
        city: 'Arnhem',
        country: 'Netherlands',
      },
    ],
  },
  'd-sturb': {
    id: 'a2',
    name: 'D-Sturb',
    slug: 'd-sturb',
    avatarUrl: 'https://picsum.photos/seed/dsturb/400/400',
    bannerUrl: 'https://picsum.photos/seed/dsturb-banner/1200/400',
    genres: ['Raw Hardstyle'],
    country: 'Netherlands',
    isVerified: true,
    followers: 425000,
    following: 89,
    trackCount: 89,
    monthlyListeners: 320000,
    bio: `Jordy Huisman, known professionally as D-Sturb, is a Dutch raw hardstyle producer and DJ who has taken the scene by storm with his powerful, melodic raw sound.

Known for his signature kicks and emotionally charged melodies, D-Sturb has become one of the most requested artists at major hardstyle events. His unique blend of raw energy and musical depth sets him apart in the genre.`,
    socials: {
      instagram: 'dsturbofficial',
      facebook: 'dsturbofficial',
      soundcloud: 'd-sturb',
    },
    tracks: [
      {
        id: 't1',
        title: 'Open Your Eyes',
        thumbnailUrl: 'https://picsum.photos/seed/dsturb-track1/100/100',
        platform: 'youtube',
        embedUrl: 'https://youtube.com/watch?v=dsturb1',
        duration: 295,
        bpm: 150,
        genre: 'Raw Hardstyle',
        plays: 1800000,
        releaseDate: '2026-01-20',
      },
      {
        id: 't2',
        title: 'High Power',
        thumbnailUrl: 'https://picsum.photos/seed/dsturb-track2/100/100',
        platform: 'soundcloud',
        embedUrl: 'https://soundcloud.com/dsturb/highpower',
        duration: 278,
        bpm: 150,
        genre: 'Raw Hardstyle',
        plays: 2400000,
        releaseDate: '2025-09-15',
      },
    ],
    upcomingEvents: [
      {
        id: 'e1',
        name: 'Supremacy 2026',
        date: '2026-09-26',
        venue: 'Brabanthallen',
        city: 's-Hertogenbosch',
        country: 'Netherlands',
      },
    ],
  },
  'warface': {
    id: 'a4',
    name: 'Warface',
    slug: 'warface',
    avatarUrl: 'https://picsum.photos/seed/warface/400/400',
    bannerUrl: 'https://picsum.photos/seed/warface-banner/1200/400',
    genres: ['Raw Hardstyle'],
    country: 'Netherlands',
    isVerified: true,
    followers: 380000,
    following: 112,
    trackCount: 112,
    monthlyListeners: 280000,
    bio: `Youri Claessens, better known as Warface, is a Dutch raw hardstyle DJ and producer. Known for his intense sets and powerful productions, Warface has become a staple name in the raw hardstyle scene.

His music is characterized by dark atmospheres, heavy kicks, and intense buildups that have made him a favorite at events worldwide.`,
    socials: {
      instagram: 'warfacemusic',
      soundcloud: 'warfaceofficial',
    },
    tracks: [
      {
        id: 't1',
        title: 'FTP',
        thumbnailUrl: 'https://picsum.photos/seed/warface-track1/100/100',
        platform: 'youtube',
        embedUrl: 'https://youtube.com/watch?v=warface1',
        duration: 265,
        bpm: 150,
        genre: 'Raw Hardstyle',
        plays: 3200000,
        releaseDate: '2025-12-10',
      },
    ],
    upcomingEvents: [],
  },
  'angerfist': {
    id: 'a3',
    name: 'Angerfist',
    slug: 'angerfist',
    avatarUrl: 'https://picsum.photos/seed/angerfist/400/400',
    bannerUrl: 'https://picsum.photos/seed/angerfist-banner/1200/400',
    genres: ['Hardcore', 'Industrial'],
    country: 'Netherlands',
    isVerified: true,
    followers: 890000,
    following: 45,
    trackCount: 234,
    monthlyListeners: 560000,
    bio: `Danny Masseling, known by his stage name Angerfist, is a Dutch hardcore DJ and producer. He is one of the most recognizable figures in hardcore music, known for his iconic mask and aggressive sound.

As the face of Masters of Hardcore, Angerfist has been instrumental in bringing hardcore music to mainstream audiences while maintaining the genre's raw intensity.`,
    socials: {
      instagram: 'angerfist',
      facebook: 'angerfist',
      youtube: 'AngerfistOfficial',
    },
    tracks: [
      {
        id: 't1',
        title: 'Criminally Insane',
        thumbnailUrl: 'https://picsum.photos/seed/angerfist-track1/100/100',
        platform: 'youtube',
        embedUrl: 'https://youtube.com/watch?v=angerfist1',
        duration: 285,
        bpm: 180,
        genre: 'Hardcore',
        plays: 5600000,
        releaseDate: '2025-10-31',
      },
    ],
    upcomingEvents: [
      {
        id: 'e1',
        name: 'Masters of Hardcore 2026',
        date: '2026-03-28',
        venue: 'Brabanthallen',
        city: 's-Hertogenbosch',
        country: 'Netherlands',
      },
    ],
  },
}

// Default artist for unknown slugs
const defaultArtist: Artist = {
  id: 'unknown',
  name: 'Artist',
  slug: 'unknown',
  avatarUrl: 'https://picsum.photos/seed/unknown/400/400',
  bannerUrl: 'https://picsum.photos/seed/unknown-banner/1200/400',
  genres: ['Hard Dance'],
  country: 'Unknown',
  isVerified: false,
  followers: 0,
  following: 0,
  trackCount: 0,
  monthlyListeners: 0,
  bio: 'Artist information not available.',
  socials: {},
  tracks: [],
  upcomingEvents: [],
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

function ArtistDetailPage() {
  const { artistId } = Route.useParams()
  const artist = artistsData[artistId] || { ...defaultArtist, name: artistId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }
  const { playTrack, addToQueue } = usePlayerStore()

  const handlePlayTrack = (track: ArtistTrack) => {
    const playerTrack: Track = {
      id: track.id,
      title: track.title,
      artistName: artist.name,
      platform: track.platform,
      embedUrl: track.embedUrl,
      originalUrl: track.embedUrl,
      thumbnailUrl: track.thumbnailUrl,
      duration: track.duration,
      bpm: track.bpm,
      genre: track.genre,
    }
    playTrack(playerTrack)
  }

  const handleAddToQueue = (track: ArtistTrack) => {
    const playerTrack: Track = {
      id: track.id,
      title: track.title,
      artistName: artist.name,
      platform: track.platform,
      embedUrl: track.embedUrl,
      originalUrl: track.embedUrl,
      thumbnailUrl: track.thumbnailUrl,
      duration: track.duration,
      bpm: track.bpm,
      genre: track.genre,
    }
    addToQueue(playerTrack)
  }

  const handlePlayAll = () => {
    if (artist.tracks.length > 0) {
      handlePlayTrack(artist.tracks[0])
      artist.tracks.slice(1).forEach(track => handleAddToQueue(track))
    }
  }

  return (
    <main className="pb-24">
      {/* Banner */}
      <div className="relative h-64 md:h-80">
        <img 
          src={artist.bannerUrl} 
          alt="" 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Back Button */}
        <Link to="/artists" className="absolute top-4 left-4">
          <Button variant="secondary" size="sm">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Artists
          </Button>
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        {/* Artist Header */}
        <div className="relative -mt-20 flex flex-col md:flex-row md:items-end gap-6 mb-8">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img 
              src={artist.avatarUrl} 
              alt={artist.name}
              className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-background object-cover shadow-xl"
            />
            {artist.isVerified && (
              <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground shadow">
                ✓
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {artist.genres.map(genre => (
                <span key={genre} className="rounded-full bg-secondary px-3 py-1 text-xs">
                  {genre}
                </span>
              ))}
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {artist.country}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{artist.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {formatNumber(artist.followers)} followers
              </span>
              <span className="flex items-center gap-1">
                <Music className="h-4 w-4" />
                {artist.trackCount} tracks
              </span>
              {artist.monthlyListeners > 0 && (
                <span>{formatNumber(artist.monthlyListeners)} monthly listeners</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            <Button onClick={handlePlayAll} disabled={artist.tracks.length === 0}>
              <Play className="mr-2 h-4 w-4" fill="currentColor" />
              Play All
            </Button>
            <Button variant="outline">
              <Heart className="mr-2 h-4 w-4" />
              Follow
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="tracks" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="tracks">
              <Music className="mr-2 h-4 w-4" />
              Tracks
            </TabsTrigger>
            <TabsTrigger value="about">
              About
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </TabsTrigger>
          </TabsList>

          {/* Tracks Tab */}
          <TabsContent value="tracks">
            {artist.tracks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Music className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No tracks available yet</p>
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card">
                {artist.tracks.map((track, index) => (
                  <TrackRow 
                    key={track.id} 
                    track={track} 
                    index={index}
                    onPlay={() => handlePlayTrack(track)}
                    onQueue={() => handleAddToQueue(track)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Biography</h2>
                <div className="prose prose-invert max-w-none">
                  {artist.bio.split('\n\n').map((paragraph) => (
                    <p key={paragraph.slice(0, 50)} className="text-muted-foreground mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Connect</h2>
                <div className="space-y-3">
                  {artist.socials.instagram && (
                    <a 
                      href={`https://instagram.com/${artist.socials.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-lg">📸</span>
                      <span>@{artist.socials.instagram}</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  )}
                  {artist.socials.twitter && (
                    <a 
                      href={`https://twitter.com/${artist.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-lg">🐦</span>
                      <span>@{artist.socials.twitter}</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  )}
                  {artist.socials.facebook && (
                    <a 
                      href={`https://facebook.com/${artist.socials.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-lg">📘</span>
                      <span>{artist.socials.facebook}</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  )}
                  {artist.socials.soundcloud && (
                    <a 
                      href={`https://soundcloud.com/${artist.socials.soundcloud}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-lg">🔊</span>
                      <span>{artist.socials.soundcloud}</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  )}
                  {artist.socials.spotify && (
                    <a 
                      href={`https://open.spotify.com/artist/${artist.socials.spotify}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-lg">🎵</span>
                      <span>Spotify</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  )}
                  {artist.socials.youtube && (
                    <a 
                      href={`https://youtube.com/${artist.socials.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-lg">📺</span>
                      <span>YouTube</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            {artist.upcomingEvents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No upcoming events scheduled</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
                {artist.upcomingEvents.map(event => (
                  <Link to="/events" key={event.id}>
                    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-secondary/50">
                      <div className="text-center shrink-0 w-16">
                        <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                        <div className="text-xs text-muted-foreground uppercase">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.venue} · {event.city}, {event.country}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Event
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function TrackRow({ 
  track, 
  index,
  onPlay,
  onQueue,
}: { 
  track: ArtistTrack
  index: number
  onPlay: () => void
  onQueue: () => void
}) {
  return (
    <div className="group flex items-center gap-4 border-b border-border p-4 last:border-0 transition-colors hover:bg-secondary/50">
      <span className="w-8 text-center text-sm text-muted-foreground group-hover:hidden">
        {index + 1}
      </span>
      <button 
        type="button"
        onClick={onPlay}
        className="hidden w-8 items-center justify-center group-hover:flex"
      >
        <Play className="h-4 w-4" fill="currentColor" />
      </button>
      
      <img 
        src={track.thumbnailUrl} 
        alt="" 
        className="h-12 w-12 rounded object-cover shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{track.title}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{platformIcons[track.platform]}</span>
          <span>{formatDuration(track.duration)}</span>
          {track.bpm && <span>· {track.bpm} BPM</span>}
          <span>· {track.genre}</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground shrink-0 hidden sm:block">
        {formatNumber(track.plays)} plays
      </div>

      <div className="text-sm text-muted-foreground shrink-0 hidden md:block w-24 text-right">
        {new Date(track.releaseDate).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        })}
      </div>

      <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onClick={onQueue}>
        <ListPlus className="h-4 w-4" />
      </Button>
    </div>
  )
}
