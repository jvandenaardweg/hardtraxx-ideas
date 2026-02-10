import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ChevronUp,
  ChevronDown,
  MessageSquare,
  Share2,
  ListPlus,
  Play,
  Pause,
  Check,
  ArrowLeft,
  Bookmark,
  Flag,
  MoreHorizontal,
  Clock,
  Eye,
  Music,
  MessageCircle,
  HelpCircle,
  ShoppingBag,
  Newspaper,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { formatRelativeTime, formatDuration, formatNumber, cn } from '@/lib/utils'
import { usePlayerStore, type Track } from '@/stores/player-store'
import type { PostData } from '@/components/feed/post-card'

export const Route = createFileRoute('/post/$postId')({
  component: PostDetailPage,
})

// Sample post data - in real app this would come from the database
const samplePosts: Record<string, PostData & { comments: Comment[] }> = {
  '1': {
    id: '1',
    type: 'mix',
    title: 'Warface - Defqon.1 2025 Liveset',
    body: `What an incredible set from Warface at Defqon.1 2025! This was recorded at the RED stage on Saturday night.

The energy was absolutely insane. Warface delivered one of the best raw hardstyle sets of the weekend, featuring a lot of unreleased material and some classic bangers.

Highlights:
- The new collab with D-Sturb around the 15 minute mark
- That insane kick switch at 32:00
- The closing track (still unidentified - anyone know what it is?)

Let me know your favorite moments in the comments!`,
    author: {
      id: '1',
      username: 'EventsTeam',
      displayName: 'Events Team',
      avatarUrl: 'https://picsum.photos/seed/events/100/100',
      isVerified: true,
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    upvotes: 847,
    commentCount: 124,
    viewCount: 12500,
    tags: ['defqon', 'warface', 'liveset', 'raw'],
    embed: {
      id: 'e1',
      platform: 'youtube',
      title: 'Warface - Defqon.1 2025 Liveset',
      artistName: 'Warface',
      originalUrl: 'https://youtube.com/watch?v=example1',
      thumbnailUrl: 'https://picsum.photos/seed/warface/800/450',
      duration: 3501,
      bpm: 155,
      genre: 'Raw Hardstyle',
    },
    comments: [
      {
        id: 'c1',
        authorId: '2',
        authorUsername: 'RawFanatic',
        authorDisplayName: 'Raw Fanatic',
        authorAvatarUrl: 'https://picsum.photos/seed/raw/100/100',
        body: 'That kick switch at 32:00 was absolutely mental! Best moment of the whole weekend for me.',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        upvotes: 45,
        replies: [
          {
            id: 'c1r1',
            authorId: '3',
            authorUsername: 'KickMaster',
            body: "Agreed! I think it's a new technique he's been working on. The layering is insane.",
            createdAt: new Date(Date.now() - 45 * 60 * 1000),
            upvotes: 12,
            replies: [],
          },
        ],
      },
      {
        id: 'c2',
        authorId: '4',
        authorUsername: 'DefqonVeteran',
        authorDisplayName: 'Defqon Veteran',
        body: "The closing track is an unreleased collab with Rebelion. Heard it confirmed from someone at the artist area. Should be out before summer!",
        createdAt: new Date(Date.now() - 50 * 60 * 1000),
        upvotes: 89,
        replies: [],
      },
      {
        id: 'c3',
        authorId: '5',
        authorUsername: 'HardstyleNL',
        body: 'Was there in person. The bass was so heavy you could feel it in your chest from 100 meters away. Absolutely unreal production quality from Q-Dance as always.',
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        upvotes: 34,
        replies: [],
      },
    ],
  },
  '2': {
    id: '2',
    type: 'track',
    title: 'Phantom - Untitled WIP [Feedback wanted]',
    body: `Just finished my new track! Been working on this for weeks.

Looking for feedback on:
- The kick - is it punchy enough?
- The mid-intro melody - too repetitive?
- The overall mix - any frequencies clashing?

This is my first serious attempt at raw hardstyle production. I've been producing euphoric for about 2 years and decided to try something darker.

Used:
- FL Studio 21
- Serum for the leads
- Custom kick sample (layered 3 different kicks)

Any constructive criticism is welcome! 🙏`,
    author: {
      id: '2',
      username: 'DJ_Phantom',
      displayName: 'DJ Phantom',
      avatarUrl: 'https://picsum.photos/seed/phantom/100/100',
    },
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    upvotes: 234,
    commentCount: 56,
    viewCount: 3400,
    tags: ['rawstyle', 'workinprogress', 'feedback', 'production'],
    embed: {
      id: 'e2',
      platform: 'soundcloud',
      title: 'Phantom - Untitled WIP',
      artistName: 'DJ Phantom',
      originalUrl: 'https://soundcloud.com/djphantom/untitled-wip',
      thumbnailUrl: 'https://picsum.photos/seed/phantom/800/450',
      duration: 263,
      bpm: 150,
      genre: 'Raw Hardstyle',
    },
    comments: [
      {
        id: 'c4',
        authorId: '6',
        authorUsername: 'ProducerX',
        authorDisplayName: 'Producer X',
        authorAvatarUrl: 'https://picsum.photos/seed/producerx/100/100',
        isVerified: true,
        body: `Great first attempt at raw! Here's my feedback:

**Kick:** Sounds good but could use more punch in the 100-200Hz range. Try boosting slightly with a bell curve.

**Mid-intro:** The melody is nice but I'd suggest adding some variation every 8 bars. Even small changes keep it interesting.

**Mix:** Overall pretty clean! I noticed some muddiness around 300Hz - try cutting there slightly on your kick.

Keep it up! 🔥`,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        upvotes: 67,
        replies: [
          {
            id: 'c4r1',
            authorId: '2',
            authorUsername: 'DJ_Phantom',
            authorDisplayName: 'DJ Phantom',
            body: "Thank you so much for the detailed feedback! I'll try those adjustments tonight and post an updated version.",
            createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
            upvotes: 8,
            replies: [],
          },
        ],
      },
    ],
  },
  '3': {
    id: '3',
    type: 'discussion',
    title: 'Hot take: Raw hardstyle peaked in 2019-2020. Change my mind.',
    body: `Don't get me wrong, there's still great music coming out, but the innovation and energy from that era was unmatched.

Think about what we got in those years:
- Warface was absolutely on fire
- D-Sturb dropped banger after banger  
- Radical Redemption's album was incredible
- The Qapital and Defqon lineups were stacked

Now it feels like everyone is chasing the same sound. The kicks all sound similar, the melodies are predictable, and the "raw" scene has become almost as formulaic as euphoric was accused of being.

Am I just being nostalgic or does anyone else feel this way?

(Not trying to hate on current artists - just want to have a genuine discussion about the evolution of the genre)`,
    author: {
      id: '3',
      username: 'TechnoViking',
      avatarUrl: 'https://picsum.photos/seed/viking/100/100',
    },
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    upvotes: 156,
    commentCount: 287,
    viewCount: 8900,
    tags: ['discussion', 'rawstyle', 'unpopularopinion'],
    comments: [
      {
        id: 'c5',
        authorId: '7',
        authorUsername: 'CounterPoint',
        body: `Hard disagree. 2023-2024 has been incredible:

- Vertex is pushing boundaries with his sound design
- The new wave of French raw producers is insane
- Sub Zero Project keeps evolving
- The production quality has never been higher

I think you're just experiencing nostalgia bias. The "golden era" always seems better in hindsight.`,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        upvotes: 134,
        replies: [],
      },
      {
        id: 'c6',
        authorId: '8',
        authorUsername: 'OldSchoolFan',
        body: 'As someone who\'s been in the scene since 2008... every generation says this about the previous era. I remember people saying hardstyle peaked in 2012. Then 2016. Now 2019. The scene evolves, and that\'s okay.',
        createdAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
        upvotes: 89,
        replies: [],
      },
    ],
  },
  '5': {
    id: '5',
    type: 'track_id',
    title: 'Track ID: "we are the resistance" ~155bpm',
    body: `Been stuck in my head for weeks but can't find it anywhere!

It goes something like "we are the resistance" and has this crazy kick around 155bpm. Heard it at Defqon last year at the RED stage.

The melody had this dark, almost cinematic vibe. Pretty sure it was during a raw set but I can't remember which artist.

Any help would be appreciated! 🙏`,
    author: {
      id: '5',
      username: 'HardcoreNL',
      avatarUrl: 'https://picsum.photos/seed/hardcorenl/100/100',
    },
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    upvotes: 45,
    commentCount: 23,
    viewCount: 1200,
    isSolved: true,
    tags: ['trackid', 'hardstyle'],
    comments: [
      {
        id: 'c7',
        authorId: '9',
        authorUsername: 'TrackIDKing',
        authorDisplayName: 'Track ID King',
        body: `That's "Resistance" by Sub Zero Project! 

Here's the link: https://youtube.com/watch?v=example

Classic track from their 2023 album. The vocal sample you're thinking of comes in around the 2 minute mark.`,
        createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
        upvotes: 67,
        isAcceptedAnswer: true,
        replies: [
          {
            id: 'c7r1',
            authorId: '5',
            authorUsername: 'HardcoreNL',
            body: "YES! That's it! Thank you so much! Been looking for this for weeks 🙏",
            createdAt: new Date(Date.now() - 6.5 * 60 * 60 * 1000),
            upvotes: 12,
            replies: [],
          },
        ],
      },
    ],
  },
}

interface Comment {
  id: string
  authorId: string
  authorUsername: string
  authorDisplayName?: string
  authorAvatarUrl?: string
  isVerified?: boolean
  body: string
  createdAt: Date
  upvotes: number
  isAcceptedAnswer?: boolean
  replies: Comment[]
}

const postTypeConfig = {
  track: { icon: Music, label: 'Track', color: 'text-blue-400' },
  mix: { icon: Music, label: 'Mix', color: 'text-purple-400' },
  discussion: { icon: MessageCircle, label: 'Discussion', color: 'text-muted-foreground' },
  track_id: { icon: HelpCircle, label: 'Track ID', color: 'text-yellow-400' },
  event: { icon: () => <span>📅</span>, label: 'Event', color: 'text-purple-400' },
  marketplace: { icon: ShoppingBag, label: 'Marketplace', color: 'text-green-400' },
  news: { icon: Newspaper, label: 'News', color: 'text-primary' },
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

function PostDetailPage() {
  const { postId } = Route.useParams()
  const post = samplePosts[postId]
  const { playTrack, addToQueue, currentTrack, isPlaying, pauseTrack, resumeTrack } = usePlayerStore()

  if (!post) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Post not found</h1>
          <p className="text-muted-foreground mb-4">The post you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const TypeIcon = postTypeConfig[post.type].icon
  const isCurrentTrack = currentTrack?.id === post.embed?.id

  const handlePlay = () => {
    if (post.embed) {
      if (isCurrentTrack) {
        isPlaying ? pauseTrack() : resumeTrack()
      } else {
        const track: Track = {
          id: post.embed.id,
          title: post.embed.title,
          artistName: post.embed.artistName,
          platform: post.embed.platform,
          embedUrl: post.embed.originalUrl,
          originalUrl: post.embed.originalUrl,
          thumbnailUrl: post.embed.thumbnailUrl,
          duration: post.embed.duration,
          bpm: post.embed.bpm,
          genre: post.embed.genre,
        }
        playTrack(track)
      }
    }
  }

  const handleAddToQueue = () => {
    if (post.embed) {
      const track: Track = {
        id: post.embed.id,
        title: post.embed.title,
        artistName: post.embed.artistName,
        platform: post.embed.platform,
        embedUrl: post.embed.originalUrl,
        originalUrl: post.embed.originalUrl,
        thumbnailUrl: post.embed.thumbnailUrl,
        duration: post.embed.duration,
        bpm: post.embed.bpm,
        genre: post.embed.genre,
      }
      addToQueue(track)
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" />
        Back to Feed
      </Link>

      <article className="rounded-lg border border-border bg-card">
        {/* Post Header */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Vote buttons */}
            <div className="flex flex-col items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronUp className="h-5 w-5" />
              </Button>
              <span className="font-semibold text-lg">{formatNumber(post.upvotes)}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 min-w-0">
              {/* Type badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className={cn('flex items-center gap-1 text-xs', postTypeConfig[post.type].color)}>
                  <TypeIcon className="h-3 w-3" />
                  {postTypeConfig[post.type].label}
                </span>
                {post.isSolved && (
                  <span className="inline-flex items-center rounded bg-green-500/20 px-1.5 py-0.5 text-xs text-green-400">
                    <Check className="mr-0.5 h-3 w-3" /> Solved
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold mb-3">{post.title}</h1>

              {/* Author info */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatarUrl} />
                  <AvatarFallback>{post.author.displayName?.[0] || post.author.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{post.author.displayName || post.author.username}</span>
                    {post.author.isVerified && <span className="text-xs text-primary">✓</span>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatRelativeTime(post.createdAt)}
                    </span>
                    {post.viewCount && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {formatNumber(post.viewCount)} views
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Embed */}
              {post.embed && (
                <div className="mb-4 rounded-lg bg-secondary overflow-hidden">
                  {/* Thumbnail with play overlay */}
                  <div className="relative aspect-video bg-black">
                    {post.embed.thumbnailUrl && (
                      <img
                        src={post.embed.thumbnailUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      onClick={handlePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors"
                    >
                      <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                        {isCurrentTrack && isPlaying ? (
                          <Pause className="h-8 w-8 text-primary-foreground" fill="currentColor" />
                        ) : (
                          <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Embed info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{post.embed.title}</h3>
                        <p className="text-sm text-muted-foreground">{post.embed.artistName}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleAddToQueue}>
                        <ListPlus className="mr-1 h-4 w-4" />
                        Add to Queue
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{platformIcons[post.embed.platform]} {post.embed.platform}</span>
                      {post.embed.duration && <span>{formatDuration(post.embed.duration)}</span>}
                      {post.embed.bpm && <span>{post.embed.bpm} BPM</span>}
                      {post.embed.genre && <span>{post.embed.genre}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* Body */}
              {post.body && (
                <div className="prose prose-invert prose-sm max-w-none mb-4">
                  {post.body.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-2 last:mb-0 text-foreground/90 whitespace-pre-wrap">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-primary hover:bg-secondary/80 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  {post.commentCount} Comments
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <Bookmark className="mr-1 h-4 w-4" />
                  Save
                </Button>
                <Button variant="ghost" size="sm">
                  <Flag className="mr-1 h-4 w-4" />
                  Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Comments Section */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">{post.commentCount} Comments</h2>

          {/* Comment input */}
          <div className="flex gap-3 mb-6">
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                placeholder="Add a comment..."
                className="w-full rounded-md border border-input bg-secondary p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                rows={3}
              />
              <div className="mt-2 flex justify-end">
                <Button size="sm">Post Comment</Button>
              </div>
            </div>
          </div>

          {/* Comments list */}
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} postType={post.type} />
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}

function CommentItem({ comment, postType, depth = 0 }: { comment: Comment; postType: string; depth?: number }) {
  return (
    <div className={cn('flex gap-3', depth > 0 && 'ml-8 mt-3')}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={comment.authorAvatarUrl} />
        <AvatarFallback>{comment.authorDisplayName?.[0] || comment.authorUsername[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">
            {comment.authorDisplayName || comment.authorUsername}
          </span>
          {comment.isVerified && <span className="text-xs text-primary">✓</span>}
          {comment.isAcceptedAnswer && postType === 'track_id' && (
            <span className="inline-flex items-center rounded bg-green-500/20 px-1.5 py-0.5 text-xs text-green-400">
              <Check className="mr-0.5 h-3 w-3" /> Accepted Answer
            </span>
          )}
          <span className="text-xs text-muted-foreground">{formatRelativeTime(comment.createdAt)}</span>
        </div>

        <div className="text-sm text-foreground/90 mb-2 whitespace-pre-wrap">{comment.body}</div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
            <ChevronUp className="h-4 w-4" />
            {comment.upvotes}
          </button>
          <button className="hover:text-foreground transition-colors">Reply</button>
          <button className="hover:text-foreground transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} postType={postType} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
