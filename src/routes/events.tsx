import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  ChevronRight,
  ChevronLeft,
  Filter,
  List,
  Grid3X3,
  Star,
  Heart,
  Share2,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatNumber } from '@/lib/utils'

export const Route = createFileRoute('/events')({
  component: EventsPage,
})

interface Event {
  id: string
  name: string
  description: string
  date: string
  endDate?: string
  time: string
  venue: string
  city: string
  country: string
  imageUrl: string
  genres: string[]
  lineup: string[]
  ticketUrl?: string
  ticketPrice?: string
  isSoldOut?: boolean
  isFeatured?: boolean
  attendees: number
  interested: number
}

// Sample featured events
const featuredEvents: Event[] = [
  {
    id: 'e1',
    name: 'Defqon.1 2026',
    description: 'The biggest hardstyle festival in the world returns to Biddinghuizen. Three days of pure energy with the biggest names in hard dance.',
    date: '2026-06-26',
    endDate: '2026-06-28',
    time: '12:00',
    venue: 'Evenemententerrein Biddinghuizen',
    city: 'Biddinghuizen',
    country: 'Netherlands',
    imageUrl: 'https://picsum.photos/seed/defqon26/800/400',
    genres: ['Hardstyle', 'Raw', 'Hardcore', 'Frenchcore'],
    lineup: ['Headhunterz', 'D-Sturb', 'Warface', 'Angerfist', 'Sub Zero Project', 'Rebelion', 'Sefa'],
    ticketUrl: 'https://defqon1.nl',
    ticketPrice: '€249',
    isFeatured: true,
    attendees: 45000,
    interested: 125000,
  },
  {
    id: 'e2',
    name: 'Qlimax 2026',
    description: 'The temple of hardstyle opens its doors once again. Experience the legendary indoor festival at GelreDome.',
    date: '2026-11-21',
    time: '21:00',
    venue: 'GelreDome',
    city: 'Arnhem',
    country: 'Netherlands',
    imageUrl: 'https://picsum.photos/seed/qlimax26/800/400',
    genres: ['Hardstyle', 'Raw'],
    lineup: ['Headhunterz', 'D-Block & S-te-Fan', 'Ran-D', 'Sub Zero Project'],
    ticketUrl: 'https://qlimax.com',
    ticketPrice: '€99',
    isFeatured: true,
    attendees: 30000,
    interested: 85000,
  },
  {
    id: 'e3',
    name: 'Masters of Hardcore 2026',
    description: 'The most brutal gathering of hardcore warriors. Join us in the Brabanthallen for an unforgettable night.',
    date: '2026-03-28',
    time: '21:00',
    venue: 'Brabanthallen',
    city: 's-Hertogenbosch',
    country: 'Netherlands',
    imageUrl: 'https://picsum.photos/seed/moh26/800/400',
    genres: ['Hardcore', 'Uptempo', 'Industrial'],
    lineup: ['Angerfist', 'Miss K8', 'Partyraiser', 'Dr. Peacock', 'Sefa'],
    ticketUrl: 'https://mastersofhardcore.com',
    ticketPrice: '€79',
    isFeatured: true,
    attendees: 25000,
    interested: 62000,
  },
]

// Sample upcoming events
const upcomingEvents: Event[] = [
  {
    id: 'e4',
    name: 'Supremacy 2026',
    description: 'Art of Dance presents Supremacy - the ultimate raw hardstyle experience.',
    date: '2026-09-26',
    time: '21:00',
    venue: 'Brabanthallen',
    city: 's-Hertogenbosch',
    country: 'Netherlands',
    imageUrl: 'https://picsum.photos/seed/supremacy/400/300',
    genres: ['Raw Hardstyle'],
    lineup: ['Warface', 'D-Sturb', 'Rebelion', 'Radical Redemption'],
    ticketPrice: '€69',
    attendees: 18000,
    interested: 42000,
  },
  {
    id: 'e5',
    name: 'Thunderdome 2026',
    description: 'The legendary gabber event returns with a massive lineup.',
    date: '2026-10-17',
    time: '21:00',
    venue: 'Jaarbeurs',
    city: 'Utrecht',
    country: 'Netherlands',
    imageUrl: 'https://picsum.photos/seed/thunderdome/400/300',
    genres: ['Hardcore', 'Gabber'],
    lineup: ['The Viper', 'Partyraiser', 'Angerfist'],
    ticketPrice: '€65',
    attendees: 20000,
    interested: 55000,
  },
  {
    id: 'e6',
    name: 'Reverze 2026',
    description: 'Belgium\'s biggest hardstyle event at the Sportpaleis.',
    date: '2026-03-07',
    time: '20:00',
    venue: 'Sportpaleis',
    city: 'Antwerp',
    country: 'Belgium',
    imageUrl: 'https://picsum.photos/seed/reverze/400/300',
    genres: ['Hardstyle', 'Raw'],
    lineup: ['Headhunterz', 'Wildstylez', 'Sub Zero Project'],
    ticketPrice: '€75',
    attendees: 30000,
    interested: 78000,
  },
  {
    id: 'e7',
    name: 'Harmony of Hardcore',
    description: 'The biggest outdoor hardcore festival in the world.',
    date: '2026-06-13',
    time: '12:00',
    venue: 'Festivalterrein De Roost',
    city: 'Erp',
    country: 'Netherlands',
    imageUrl: 'https://picsum.photos/seed/hoh/400/300',
    genres: ['Hardcore', 'Frenchcore'],
    lineup: ['Angerfist', 'Dr. Peacock', 'N-Vitral'],
    ticketPrice: '€55',
    attendees: 15000,
    interested: 38000,
  },
  {
    id: 'e8',
    name: 'Hard Bass 2026',
    description: 'Team Red vs Team Blue - the ultimate hardstyle battle.',
    date: '2026-02-14',
    time: '21:00',
    venue: 'GelreDome',
    city: 'Arnhem',
    country: 'Netherlands',
    imageUrl: 'https://picsum.photos/seed/hardbass/400/300',
    genres: ['Hardstyle'],
    lineup: ['Headhunterz', 'Wildstylez', 'D-Block & S-te-Fan'],
    ticketPrice: '€79',
    isSoldOut: true,
    attendees: 35000,
    interested: 92000,
  },
  {
    id: 'e9',
    name: 'Rawstyle Night',
    description: 'Weekly raw hardstyle club night at Club Rodenburg.',
    date: '2026-02-20',
    time: '23:00',
    venue: 'Club Rodenburg',
    city: 'Beesd',
    country: 'Netherlands',
    imageUrl: 'https://picsum.photos/seed/rawnight/400/300',
    genres: ['Raw Hardstyle'],
    lineup: ['D-Sturb', 'Ncrypta'],
    ticketPrice: '€25',
    attendees: 800,
    interested: 2500,
  },
]

// Calendar helpers
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function formatEventDate(dateStr: string, endDateStr?: string) {
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  
  if (endDateStr) {
    const endDate = new Date(endDateStr)
    const endDay = endDate.getDate()
    if (date.getMonth() === endDate.getMonth()) {
      return `${month} ${day}-${endDay}, ${year}`
    }
    return `${month} ${day} - ${months[endDate.getMonth()]} ${endDay}, ${year}`
  }
  
  return `${month} ${day}, ${year}`
}

function getDaysUntil(dateStr: string) {
  const today = new Date()
  const eventDate = new Date(dateStr)
  const diff = eventDate.getTime() - today.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return days
}

function EventsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const allEvents = [...featuredEvents, ...upcomingEvents]
  const filteredEvents = allEvents.filter(event => {
    if (selectedGenre && !event.genres.includes(selectedGenre)) return false
    if (selectedCountry && event.country !== selectedCountry) return false
    if (searchQuery && !event.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const genres = [...new Set(allEvents.flatMap(e => e.genres))]
  const countries = [...new Set(allEvents.map(e => e.country))]

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Events</h1>
        <p className="text-muted-foreground mb-4">Discover festivals, club nights, and events near you</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
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

      {/* Featured Events */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-yellow-400" />
          <h2 className="text-xl font-semibold">Featured Events</h2>
        </div>
        <div className="grid gap-6">
          {featuredEvents.map(event => (
            <FeaturedEventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
          </div>
          <span className="text-sm text-muted-foreground">{filteredEvents.length} events</span>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <EventListItem key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Calendar Preview */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-green-400" />
          <h2 className="text-xl font-semibold">Event Calendar</h2>
        </div>
        <MiniCalendar events={allEvents} />
      </section>
    </main>
  )
}

function FeaturedEventCard({ event }: { event: Event }) {
  const daysUntil = getDaysUntil(event.date)
  
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-2/5">
          <img 
            src={event.imageUrl} 
            alt={event.name}
            className="h-64 md:h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 hidden md:block" />
          <div className="absolute top-3 left-3">
            <span className="rounded bg-yellow-500 px-2 py-0.5 text-xs font-bold text-black">
              FEATURED
            </span>
          </div>
          {daysUntil > 0 && daysUntil <= 30 && (
            <div className="absolute top-3 right-3">
              <span className="rounded bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                {daysUntil} days left
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {event.genres.map(genre => (
              <span key={genre} className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                {genre}
              </span>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
            {event.name}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="grid gap-2 text-sm mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatEventDate(event.date, event.endDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.venue}, {event.city}, {event.country}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{formatNumber(event.attendees)} going · {formatNumber(event.interested)} interested</span>
            </div>
          </div>

          {/* Lineup Preview */}
          <div className="mb-4">
            <span className="text-xs text-muted-foreground">Lineup: </span>
            <span className="text-sm">{event.lineup.slice(0, 5).join(' · ')}</span>
            {event.lineup.length > 5 && (
              <span className="text-xs text-muted-foreground"> +{event.lineup.length - 5} more</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {event.ticketUrl && (
              <Button asChild>
                <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                  <Ticket className="mr-2 h-4 w-4" />
                  Tickets {event.ticketPrice && `from ${event.ticketPrice}`}
                </a>
              </Button>
            )}
            <Button variant="outline">
              <Heart className="mr-2 h-4 w-4" />
              Interested
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function EventCard({ event }: { event: Event }) {
  const daysUntil = getDaysUntil(event.date)

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card transition-transform hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.name}
          className="h-40 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {event.isSoldOut && (
          <div className="absolute top-2 right-2">
            <span className="rounded bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
              SOLD OUT
            </span>
          </div>
        )}
        
        {daysUntil > 0 && daysUntil <= 14 && !event.isSoldOut && (
          <div className="absolute top-2 right-2">
            <span className="rounded bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {daysUntil}d left
            </span>
          </div>
        )}

        {/* Date Badge */}
        <div className="absolute bottom-2 left-2 rounded bg-background/90 px-2 py-1 text-center">
          <div className="text-xs text-muted-foreground uppercase">
            {months[new Date(event.date).getMonth()].slice(0, 3)}
          </div>
          <div className="text-lg font-bold leading-none">
            {new Date(event.date).getDate()}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {event.genres.slice(0, 2).map(genre => (
            <span key={genre} className="rounded-full bg-secondary px-2 py-0.5 text-xs">
              {genre}
            </span>
          ))}
        </div>

        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {event.name}
        </h3>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{event.city}, {event.country}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>{formatNumber(event.interested)} interested</span>
          {event.ticketPrice && !event.isSoldOut && (
            <span className="font-medium text-foreground">{event.ticketPrice}</span>
          )}
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1" disabled={event.isSoldOut}>
            <Ticket className="mr-1 h-3 w-3" />
            {event.isSoldOut ? 'Sold Out' : 'Tickets'}
          </Button>
          <Button size="sm" variant="outline">
            <Heart className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function EventListItem({ event }: { event: Event }) {
  const daysUntil = getDaysUntil(event.date)
  const eventDate = new Date(event.date)

  return (
    <div className="group flex gap-4 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-secondary/50">
      {/* Date Column */}
      <div className="flex flex-col items-center justify-center w-14 shrink-0 text-center">
        <span className="text-xs text-muted-foreground uppercase">
          {months[eventDate.getMonth()].slice(0, 3)}
        </span>
        <span className="text-2xl font-bold">{eventDate.getDate()}</span>
        <span className="text-xs text-muted-foreground">{eventDate.getFullYear()}</span>
      </div>

      {/* Thumbnail */}
      <div className="relative h-20 w-28 rounded overflow-hidden shrink-0">
        <img src={event.imageUrl} alt="" className="w-full h-full object-cover" />
        {event.isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-xs font-bold text-red-400">SOLD OUT</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
              {event.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{event.venue}, {event.city}</span>
            </div>
          </div>
          {daysUntil > 0 && daysUntil <= 30 && !event.isSoldOut && (
            <span className="shrink-0 rounded bg-primary/20 px-2 py-0.5 text-xs text-primary">
              {daysUntil}d
            </span>
          )}
        </div>
        
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {event.time}
          </span>
          <span>{event.genres.join(' · ')}</span>
          <span>{formatNumber(event.interested)} interested</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {event.ticketPrice && !event.isSoldOut && (
          <span className="text-sm font-medium">{event.ticketPrice}</span>
        )}
        <Button size="sm" disabled={event.isSoldOut}>
          <Ticket className="mr-1 h-3 w-3" />
          {event.isSoldOut ? 'Sold Out' : 'Tickets'}
        </Button>
      </div>
    </div>
  )
}

function MiniCalendar({ events }: { events: Event[] }) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return { month: now.getMonth(), year: now.getFullYear() }
  })

  const daysInMonth = new Date(currentMonth.year, currentMonth.month + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.year, currentMonth.month, 1).getDay()
  
  // Adjust for Monday start (0 = Monday, 6 = Sunday)
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  const eventsInMonth = events.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.getMonth() === currentMonth.month && eventDate.getFullYear() === currentMonth.year
  })

  const getEventsForDay = (day: number) => {
    return eventsInMonth.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getDate() === day
    })
  }

  const goToPrevMonth = () => {
    setCurrentMonth(prev => {
      if (prev.month === 0) {
        return { month: 11, year: prev.year - 1 }
      }
      return { month: prev.month - 1, year: prev.year }
    })
  }

  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      if (prev.month === 11) {
        return { month: 0, year: prev.year + 1 }
      }
      return { month: prev.month + 1, year: prev.year }
    })
  }

  const days = []
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10" />)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDay(day)
    const isToday = new Date().getDate() === day && 
                    new Date().getMonth() === currentMonth.month && 
                    new Date().getFullYear() === currentMonth.year

    days.push(
      <div
        key={day}
        className={cn(
          'relative h-10 flex flex-col items-center justify-center rounded-lg transition-colors',
          dayEvents.length > 0 && 'bg-primary/20 cursor-pointer hover:bg-primary/30',
          isToday && 'ring-2 ring-primary'
        )}
      >
        <span className={cn('text-sm', isToday && 'font-bold')}>{day}</span>
        {dayEvents.length > 0 && (
          <div className="absolute bottom-1 flex gap-0.5">
            {dayEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="h-1 w-1 rounded-full bg-primary" />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">
          {months[currentMonth.month]} {currentMonth.year}
        </h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
          <div key={d} className="text-center text-xs text-muted-foreground font-medium">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>

      {/* Events in Month */}
      {eventsInMonth.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium mb-2">Events this month</h4>
          <div className="space-y-2">
            {eventsInMonth.slice(0, 3).map(event => (
              <div key={event.id} className="flex items-center gap-2 text-sm">
                <span className="w-6 text-center font-medium">
                  {new Date(event.date).getDate()}
                </span>
                <span className="truncate flex-1">{event.name}</span>
                <span className="text-xs text-muted-foreground shrink-0">{event.city}</span>
              </div>
            ))}
            {eventsInMonth.length > 3 && (
              <button type="button" className="text-xs text-primary hover:underline">
                +{eventsInMonth.length - 3} more events
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
