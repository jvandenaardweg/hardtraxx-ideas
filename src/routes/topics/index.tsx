import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Search,
  TrendingUp,
  Users,
  MessageSquare,
  Hash,
  Flame,
  Star,
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn, formatNumber } from '@/lib/utils'

export const Route = createFileRoute('/topics/')({
  component: TopicsPage,
})

interface Topic {
  tag: string
  displayName: string
  description: string
  postCount: number
  followers: number
  weeklyChange: string
  category: 'genre' | 'event' | 'production' | 'community' | 'artist'
  isHot?: boolean
}

// All topics data
const allTopics: Topic[] = [
  // Genres
  {
    tag: 'hardstyle',
    displayName: 'Hardstyle',
    description: 'The main hardstyle discussion hub. All things 150 BPM.',
    postCount: 12456,
    followers: 45000,
    weeklyChange: '+15%',
    category: 'genre',
    isHot: true,
  },
  {
    tag: 'rawstyle',
    displayName: 'Raw Hardstyle',
    description: 'Heavy kicks, dark atmospheres, and intense energy.',
    postCount: 5623,
    followers: 15420,
    weeklyChange: '+18%',
    category: 'genre',
    isHot: true,
  },
  {
    tag: 'euphoric',
    displayName: 'Euphoric Hardstyle',
    description: 'Melodic hardstyle with uplifting vibes.',
    postCount: 4521,
    followers: 12300,
    weeklyChange: '+8%',
    category: 'genre',
  },
  {
    tag: 'hardcore',
    displayName: 'Hardcore',
    description: 'The harder styles - 160+ BPM and beyond.',
    postCount: 8934,
    followers: 28000,
    weeklyChange: '+12%',
    category: 'genre',
  },
  {
    tag: 'frenchcore',
    displayName: 'Frenchcore',
    description: 'French-style hardcore with distinctive kicks.',
    postCount: 3421,
    followers: 9800,
    weeklyChange: '+22%',
    category: 'genre',
    isHot: true,
  },
  {
    tag: 'uptempo',
    displayName: 'Uptempo',
    description: 'High-speed hardcore at 180+ BPM.',
    postCount: 2341,
    followers: 6789,
    weeklyChange: '+12%',
    category: 'genre',
  },
  {
    tag: 'industrial',
    displayName: 'Industrial Hardcore',
    description: 'Dark, mechanical, and relentless.',
    postCount: 1876,
    followers: 5430,
    weeklyChange: '+5%',
    category: 'genre',
  },
  {
    tag: 'gabber',
    displayName: 'Gabber',
    description: 'Classic Rotterdam sound from the 90s.',
    postCount: 2134,
    followers: 7650,
    weeklyChange: '+3%',
    category: 'genre',
  },
  // Events
  {
    tag: 'defqon2026',
    displayName: 'Defqon.1 2026',
    description: 'All discussions about Defqon.1 2026.',
    postCount: 1247,
    followers: 8934,
    weeklyChange: '+23%',
    category: 'event',
    isHot: true,
  },
  {
    tag: 'qlimax',
    displayName: 'Qlimax',
    description: 'The temple of hardstyle at GelreDome.',
    postCount: 2345,
    followers: 11200,
    weeklyChange: '+10%',
    category: 'event',
  },
  {
    tag: 'thunderdome',
    displayName: 'Thunderdome',
    description: 'The legendary gabber event.',
    postCount: 987,
    followers: 7650,
    weeklyChange: '+5%',
    category: 'event',
  },
  {
    tag: 'mastersofhardcore',
    displayName: 'Masters of Hardcore',
    description: 'The most brutal gathering of hardcore warriors.',
    postCount: 1567,
    followers: 8900,
    weeklyChange: '+7%',
    category: 'event',
  },
  {
    tag: 'supremacy',
    displayName: 'Supremacy',
    description: 'Art of Dance presents the ultimate raw experience.',
    postCount: 876,
    followers: 5430,
    weeklyChange: '+4%',
    category: 'event',
  },
  {
    tag: 'reverze',
    displayName: 'Reverze',
    description: "Belgium's biggest hardstyle event.",
    postCount: 1234,
    followers: 6780,
    weeklyChange: '+6%',
    category: 'event',
  },
  // Production
  {
    tag: 'producertips',
    displayName: 'Producer Tips',
    description: 'Production tutorials, tips, and feedback.',
    postCount: 3456,
    followers: 12300,
    weeklyChange: '+8%',
    category: 'production',
  },
  {
    tag: 'kicks',
    displayName: 'Kick Design',
    description: 'All about creating the perfect kick.',
    postCount: 2134,
    followers: 8760,
    weeklyChange: '+11%',
    category: 'production',
  },
  {
    tag: 'mixing',
    displayName: 'Mixing & Mastering',
    description: 'Get your tracks sounding professional.',
    postCount: 1876,
    followers: 7650,
    weeklyChange: '+6%',
    category: 'production',
  },
  {
    tag: 'fl-studio',
    displayName: 'FL Studio',
    description: 'Tips and tricks for FL Studio users.',
    postCount: 2567,
    followers: 9870,
    weeklyChange: '+9%',
    category: 'production',
  },
  {
    tag: 'feedback',
    displayName: 'Track Feedback',
    description: 'Share your tracks and get constructive feedback.',
    postCount: 4321,
    followers: 11200,
    weeklyChange: '+14%',
    category: 'production',
  },
  // Community
  {
    tag: 'trackid',
    displayName: 'Track ID',
    description: 'Help identify unknown tracks.',
    postCount: 5678,
    followers: 15400,
    weeklyChange: '+16%',
    category: 'community',
    isHot: true,
  },
  {
    tag: 'newreleases',
    displayName: 'New Releases',
    description: 'Fresh tracks and announcements.',
    postCount: 8765,
    followers: 23400,
    weeklyChange: '+19%',
    category: 'community',
  },
  {
    tag: 'livesets',
    displayName: 'Live Sets',
    description: 'Recorded sets from events and festivals.',
    postCount: 3456,
    followers: 12300,
    weeklyChange: '+13%',
    category: 'community',
  },
  {
    tag: 'memes',
    displayName: 'Memes',
    description: 'Hardstyle and hardcore memes.',
    postCount: 2134,
    followers: 8900,
    weeklyChange: '+7%',
    category: 'community',
  },
  // Artists
  {
    tag: 'headhunterz',
    displayName: 'Headhunterz',
    description: 'Discussions about Headhunterz.',
    postCount: 1876,
    followers: 12300,
    weeklyChange: '+5%',
    category: 'artist',
  },
  {
    tag: 'd-sturb',
    displayName: 'D-Sturb',
    description: 'All things D-Sturb.',
    postCount: 1234,
    followers: 8760,
    weeklyChange: '+12%',
    category: 'artist',
  },
  {
    tag: 'angerfist',
    displayName: 'Angerfist',
    description: 'The face of hardcore.',
    postCount: 1567,
    followers: 9870,
    weeklyChange: '+4%',
    category: 'artist',
  },
  {
    tag: 'warface',
    displayName: 'Warface',
    description: 'Raw hardstyle powerhouse.',
    postCount: 987,
    followers: 6540,
    weeklyChange: '+8%',
    category: 'artist',
  },
]

const categories = [
  { id: 'all', label: 'All Topics', icon: Hash },
  { id: 'genre', label: 'Genres', icon: Hash },
  { id: 'event', label: 'Events', icon: Star },
  { id: 'production', label: 'Production', icon: Hash },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'artist', label: 'Artists', icon: Hash },
]

function TopicsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'trending' | 'popular' | 'newest'>('trending')

  const filteredTopics = allTopics
    .filter(topic => {
      if (searchQuery && !topic.displayName.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !topic.tag.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      if (selectedCategory !== 'all' && topic.category !== selectedCategory) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'trending') {
        return parseFloat(b.weeklyChange) - parseFloat(a.weeklyChange)
      }
      if (sortBy === 'popular') {
        return b.followers - a.followers
      }
      return b.postCount - a.postCount
    })

  const trendingTopics = allTopics
    .filter(t => t.isHot)
    .sort((a, b) => parseFloat(b.weeklyChange) - parseFloat(a.weeklyChange))
    .slice(0, 5)

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Topics</h1>
        <p className="text-muted-foreground mb-4">Browse and follow topics to customize your feed</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics..."
              className="h-10 w-full rounded-lg border border-input bg-secondary pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-10 rounded-lg border border-input bg-secondary px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="trending">Trending</option>
            <option value="popular">Most Followers</option>
            <option value="newest">Most Posts</option>
          </select>
        </div>
      </div>

      {/* Trending Now */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-semibold">Trending Now</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {trendingTopics.map(topic => (
            <TrendingTopicCard key={topic.tag} topic={topic} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            {categories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id} className="gap-1">
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">{filteredTopics.length} topics</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTopics.map(topic => (
              <TopicCard key={topic.tag} topic={topic} />
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <div className="text-center py-12">
              <Hash className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No topics found</h3>
              <p className="text-muted-foreground">Try a different search term or category</p>
            </div>
          )}
        </Tabs>
      </section>
    </main>
  )
}

function TrendingTopicCard({ topic }: { topic: Topic }) {
  return (
    <Link to="/topics/$tag" params={{ tag: topic.tag }}>
      <div className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-secondary/50">
        <div className="flex items-start justify-between mb-2">
          <span className="text-lg font-bold text-primary">#{topic.tag}</span>
          <span className="flex items-center gap-1 text-xs text-green-500">
            <TrendingUp className="h-3 w-3" />
            {topic.weeklyChange}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{topic.description}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatNumber(topic.postCount)} posts</span>
        </div>
      </div>
    </Link>
  )
}

function TopicCard({ topic }: { topic: Topic }) {
  const categoryColors: Record<string, string> = {
    genre: 'bg-blue-500/20 text-blue-400',
    event: 'bg-purple-500/20 text-purple-400',
    production: 'bg-green-500/20 text-green-400',
    community: 'bg-orange-500/20 text-orange-400',
    artist: 'bg-pink-500/20 text-pink-400',
  }

  return (
    <Link to="/topics/$tag" params={{ tag: topic.tag }}>
      <div className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">#{topic.tag}</span>
            {topic.isHot && (
              <span className="flex items-center gap-0.5 rounded bg-orange-500/20 px-1.5 py-0.5 text-xs text-orange-400">
                <Flame className="h-3 w-3" /> Hot
              </span>
            )}
          </div>
          <span className={cn('rounded px-2 py-0.5 text-xs capitalize', categoryColors[topic.category])}>
            {topic.category}
          </span>
        </div>
        <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
          {topic.displayName}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{topic.description}</p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {formatNumber(topic.postCount)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {formatNumber(topic.followers)}
            </span>
          </div>
          {topic.weeklyChange.startsWith('+') && (
            <span className="flex items-center gap-1 text-green-500 text-xs">
              <TrendingUp className="h-3 w-3" />
              {topic.weeklyChange}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
