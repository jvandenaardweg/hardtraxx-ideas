import { createFileRoute, Link } from '@tanstack/react-router'
import {
  TrendingUp,
  Users,
  MessageSquare,
  Music,
  ChevronLeft,
  Bell,
  Share2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatNumber } from '@/lib/utils'
import { PostCard, type PostData } from '@/components/feed/post-card'
import { useViewStore } from '@/stores/view-store'

export const Route = createFileRoute('/topics/$tag')({
  component: TopicPage,
})

interface TopicInfo {
  tag: string
  displayName: string
  description: string
  postCount: number
  followers: number
  weeklyChange: string
  relatedTags: string[]
}

// Sample topic data
const topicsData: Record<string, TopicInfo> = {
  'defqon2026': {
    tag: 'defqon2026',
    displayName: 'Defqon.1 2026',
    description: 'All discussions about Defqon.1 2026 - lineup announcements, ticket sales, camping tips, and meetups.',
    postCount: 1247,
    followers: 8934,
    weeklyChange: '+23%',
    relatedTags: ['defqon', 'qlimax', 'qdance', 'hardstyle', 'festival'],
  },
  'rawstyle': {
    tag: 'rawstyle',
    displayName: 'Raw Hardstyle',
    description: 'The home of raw hardstyle - heavy kicks, dark atmospheres, and intense energy. Discuss tracks, artists, and events.',
    postCount: 5623,
    followers: 15420,
    weeklyChange: '+18%',
    relatedTags: ['hardstyle', 'raw', 'd-sturb', 'warface', 'rebelion'],
  },
  'uptempo': {
    tag: 'uptempo',
    displayName: 'Uptempo',
    description: 'High-speed hardcore at 180+ BPM. Share your favorite uptempo tracks, producers, and party experiences.',
    postCount: 2341,
    followers: 6789,
    weeklyChange: '+12%',
    relatedTags: ['hardcore', 'frenchcore', 'terror', 'speedcore'],
  },
  'producertips': {
    tag: 'producertips',
    displayName: 'Producer Tips',
    description: 'Production tutorials, tips, and feedback. Share your knowledge and learn from fellow producers.',
    postCount: 3456,
    followers: 12300,
    weeklyChange: '+8%',
    relatedTags: ['production', 'fl-studio', 'kicks', 'mixing', 'mastering'],
  },
  'thunderdome': {
    tag: 'thunderdome',
    displayName: 'Thunderdome',
    description: 'The legendary gabber event. Relive classic editions and discuss upcoming shows.',
    postCount: 987,
    followers: 7650,
    weeklyChange: '+5%',
    relatedTags: ['hardcore', 'gabber', 'id&t', 'rotterdam'],
  },
  'hardstyle': {
    tag: 'hardstyle',
    displayName: 'Hardstyle',
    description: 'The main hardstyle discussion hub. All things 150 BPM - tracks, events, artists, and more.',
    postCount: 12456,
    followers: 45000,
    weeklyChange: '+15%',
    relatedTags: ['rawstyle', 'euphoric', 'defqon', 'qlimax'],
  },
}

// Sample posts for topics
const samplePostsForTopic: Record<string, PostData[]> = {
  'defqon2026': [
    {
      id: 'tp1',
      type: 'discussion',
      title: 'Defqon.1 2026 - Who else is going?',
      body: 'Just secured my weekend ticket! This will be my 5th Defqon. Looking for camping buddies from the UK area.',
      author: { id: 'u1', username: 'hardstyleuk', displayName: 'HardstyleUK' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      upvotes: 234,
      commentCount: 89,
      tags: ['defqon2026', 'defqon', 'festival'],
    },
    {
      id: 'tp2',
      type: 'news',
      title: 'First headliners announced for Defqon.1 2026!',
      body: 'Q-dance just revealed the first wave of artists. Headhunterz, D-Block & S-te-Fan, and Angerfist confirmed!',
      author: { id: 'u2', username: 'qdancenews', displayName: 'Q-dance News', isVerified: true },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      upvotes: 1567,
      commentCount: 342,
      tags: ['defqon2026', 'qdance', 'lineup'],
    },
    {
      id: 'tp3',
      type: 'discussion',
      title: 'Best camping spots at Defqon?',
      body: 'First timer here. Where should I set up camp for the best experience? Close to stages or further for better sleep?',
      author: { id: 'u3', username: 'newravers', displayName: 'NewRavers' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
      upvotes: 156,
      commentCount: 67,
      tags: ['defqon2026', 'camping', 'tips'],
    },
  ],
  'rawstyle': [
    {
      id: 'tp4',
      type: 'track',
      title: 'D-Sturb - High Power [Official Video]',
      body: 'The raw power in this track is insane. Those kicks hit different.',
      author: { id: 'u4', username: 'rawkickz', displayName: 'RawKickz' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
      upvotes: 445,
      commentCount: 78,
      tags: ['rawstyle', 'd-sturb', 'newrelease'],
      embed: {
        id: 'e1',
        platform: 'youtube',
        title: 'High Power',
        artistName: 'D-Sturb',
        originalUrl: 'https://youtube.com/watch?v=example',
        thumbnailUrl: 'https://picsum.photos/seed/highpower/200/200',
        duration: 285,
        bpm: 150,
        genre: 'Raw Hardstyle',
      },
    },
    {
      id: 'tp5',
      type: 'discussion',
      title: 'Best raw kicks of 2025?',
      body: 'What tracks had the most devastating kicks this year? My vote goes to anything from Rebelion.',
      author: { id: 'u5', username: 'kickmaster', displayName: 'KickMaster' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
      upvotes: 234,
      commentCount: 156,
      tags: ['rawstyle', 'kicks', 'discussion'],
    },
  ],
  'uptempo': [
    {
      id: 'tp6',
      type: 'mix',
      title: 'Partyraiser @ Thunderdome 2025 - Full Set',
      body: 'Absolute madness from start to finish. This is how you close a festival.',
      author: { id: 'u6', username: 'gabbernl', displayName: 'GabberNL' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
      upvotes: 567,
      commentCount: 123,
      tags: ['uptempo', 'hardcore', 'thunderdome', 'liveset'],
      embed: {
        id: 'e2',
        platform: 'soundcloud',
        title: 'Thunderdome 2025 Closing Set',
        artistName: 'Partyraiser',
        originalUrl: 'https://soundcloud.com/partyraiser/example',
        thumbnailUrl: 'https://picsum.photos/seed/partyraiser/200/200',
        duration: 3600,
        bpm: 200,
        genre: 'Uptempo',
      },
    },
  ],
  'producertips': [
    {
      id: 'tp7',
      type: 'discussion',
      title: 'How to get that raw kick punch?',
      body: 'Been producing for 2 years but my kicks still sound weak compared to pros. Any tips on layering and processing?',
      author: { id: 'u7', username: 'newproducer', displayName: 'NewProducer' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
      upvotes: 189,
      commentCount: 234,
      tags: ['producertips', 'kicks', 'tutorial'],
    },
    {
      id: 'tp8',
      type: 'discussion',
      title: 'FL Studio vs Ableton for hardstyle?',
      body: 'Thinking of switching DAWs. What do most hardstyle producers use and why?',
      author: { id: 'u8', username: 'dabbeats', displayName: 'DabBeats' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      upvotes: 345,
      commentCount: 189,
      tags: ['producertips', 'fl-studio', 'ableton', 'daw'],
    },
  ],
  'thunderdome': [
    {
      id: 'tp9',
      type: 'discussion',
      title: 'Thunderdome 2026 confirmed!',
      body: 'Mark your calendars - October 17th at Jaarbeurs Utrecht. Who\'s ready?',
      author: { id: 'u9', username: 'hardcorenl', displayName: 'HardcoreNL' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
      upvotes: 678,
      commentCount: 234,
      tags: ['thunderdome', 'hardcore', 'event'],
    },
  ],
}

// Default topic for unknown tags
function getDefaultTopic(tag: string): TopicInfo {
  return {
    tag,
    displayName: `#${tag}`,
    description: `Posts tagged with #${tag}`,
    postCount: 0,
    followers: 0,
    weeklyChange: '0%',
    relatedTags: [],
  }
}

function TopicPage() {
  const { tag } = Route.useParams()
  const { viewMode } = useViewStore()
  
  const topic = topicsData[tag] || getDefaultTopic(tag)
  const posts = samplePostsForTopic[tag] || []

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      {/* Back Link */}
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" />
        Back to Feed
      </Link>

      {/* Topic Header */}
      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-primary">#{topic.tag}</span>
              {topic.weeklyChange.startsWith('+') && (
                <span className="flex items-center gap-1 text-sm text-green-500">
                  <TrendingUp className="h-4 w-4" />
                  {topic.weeklyChange} this week
                </span>
              )}
            </div>
            <h1 className="text-xl font-semibold mb-2">{topic.displayName}</h1>
            <p className="text-muted-foreground mb-4">{topic.description}</p>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {formatNumber(topic.postCount)} posts
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {formatNumber(topic.followers)} followers
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button>
              <Bell className="mr-2 h-4 w-4" />
              Follow Topic
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Related Tags */}
        {topic.relatedTags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground mr-2">Related:</span>
            {topic.relatedTags.map(relatedTag => (
              <Link 
                key={relatedTag}
                to="/topics/$tag" 
                params={{ tag: relatedTag }}
                className="inline-block mr-2 text-sm text-primary hover:underline"
              >
                #{relatedTag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Posts */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Posts</h2>
        <span className="text-sm text-muted-foreground">{posts.length} posts</span>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <Music className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium mb-2">No posts yet</h3>
          <p className="text-muted-foreground mb-4">Be the first to post in #{tag}</p>
          <Button>Create Post</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} variant={viewMode} />
          ))}
        </div>
      )}
    </main>
  )
}
