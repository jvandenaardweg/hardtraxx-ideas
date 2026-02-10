import { Link } from '@tanstack/react-router'
import { Calendar, TrendingUp, Users, Star } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface Event {
  id: string
  name: string
  date: string
  location: string
  interestedCount: number
}

interface TrendingTopic {
  tag: string
  slug: string
  change: string
}

const upcomingEvents: Event[] = [
  { id: '1', name: 'Defqon.1 2026', date: 'Jun 26-28', location: 'NL', interestedCount: 234 },
  { id: '2', name: 'Thunderdome 2026', date: 'Oct 17', location: 'NL', interestedCount: 189 },
  { id: '3', name: 'Qlimax 2026', date: 'Nov 21', location: 'NL', interestedCount: 156 },
]

const trendingTopics: TrendingTopic[] = [
  { tag: '#defqon2026', slug: 'defqon2026', change: '+23%' },
  { tag: '#rawstyle', slug: 'rawstyle', change: '+18%' },
  { tag: '#uptempo', slug: 'uptempo', change: '+12%' },
  { tag: '#producertips', slug: 'producertips', change: '+8%' },
  { tag: '#thunderdome', slug: 'thunderdome', change: '+5%' },
]

const suggestedUsers = [
  { id: '1', name: 'Warface', slug: 'warface', type: 'Verified Artist', isArtist: true },
  { id: '2', name: 'D-Sturb', slug: 'd-sturb', type: 'Verified Artist', isArtist: true },
  { id: '3', name: 'EventsNL', slug: 'eventsnl', type: 'Event Promoter', isArtist: false },
]

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 lg:block">
      <div className="sticky top-[72px]">
        <ScrollArea className="h-[calc(100vh-72px-80px)]">
          <div className="space-y-6 pr-4">
            {/* Upcoming Events */}
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Calendar className="h-4 w-4" />
                UPCOMING EVENTS
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="group cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">
                          {event.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {event.date} • {event.location}
                        </p>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      <Star className="mr-1 inline h-3 w-3" />
                      {event.interestedCount} interested
                    </p>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-3 text-xs text-primary hover:underline">View all events →</button>
            </section>

            <Separator />

            {/* Trending Topics */}
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                TRENDING TOPICS
              </h3>
              <div className="space-y-2">
                {trendingTopics.map((topic) => (
                  <Link 
                    key={topic.tag} 
                    to="/topics/$tag" 
                    params={{ tag: topic.slug }}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-sm group-hover:text-primary transition-colors">{topic.tag}</span>
                    <span className="text-xs text-green-500">{topic.change}</span>
                  </Link>
                ))}
              </div>
              <Link to="/topics" className="mt-3 text-xs text-primary hover:underline block">View all →</Link>
            </section>

            <Separator />

            {/* Suggested to Follow */}
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Users className="h-4 w-4" />
                SUGGESTED TO FOLLOW
              </h3>
              <div className="space-y-3">
                {suggestedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    {user.isArtist ? (
                      <Link to="/artists/$artistId" params={{ artistId: user.slug }} className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.type}</p>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.type}</p>
                        </div>
                      </div>
                    )}
                    <button type="button" className="text-xs text-primary hover:underline">+Follow</button>
                  </div>
                ))}
              </div>
              <Link to="/artists" className="mt-3 text-xs text-primary hover:underline block">See more →</Link>
            </section>

            <Separator />

            {/* User Stats */}
            <section>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">YOUR STATS</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posts:</span>
                  <span>142</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reputation:</span>
                  <span>2,847 ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Track IDs solved:</span>
                  <span>23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Helpful votes:</span>
                  <span>456</span>
                </div>
              </div>
              <button type="button" className="mt-3 text-xs text-primary hover:underline">View profile →</button>
            </section>
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}
