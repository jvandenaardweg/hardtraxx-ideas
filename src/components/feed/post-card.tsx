import { Link } from '@tanstack/react-router'
import { ChevronUp, MessageSquare, Share2, ListPlus, Play, Check, Music, MessageCircle, HelpCircle, ShoppingBag, Newspaper } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatRelativeTime, formatDuration, formatNumber } from '@/lib/utils'
import { usePlayerStore, type Track } from '@/stores/player-store'
import { cn } from '@/lib/utils'

export interface PostData {
  id: string
  type: 'track' | 'mix' | 'discussion' | 'track_id' | 'event' | 'marketplace' | 'news'
  title: string
  body?: string
  author: {
    id: string
    username: string
    displayName?: string
    avatarUrl?: string
    isVerified?: boolean
  }
  createdAt: Date
  upvotes: number
  commentCount: number
  isSolved?: boolean
  tags?: string[]
  embed?: {
    id: string
    platform: 'youtube' | 'soundcloud' | 'mixcloud' | 'bandcamp' | 'spotify' | 'hearthis' | 'other'
    title: string
    artistName: string
    originalUrl: string
    thumbnailUrl?: string
    duration?: number
    bpm?: number
    genre?: string
  }
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

interface PostCardProps {
  post: PostData
  variant: 'cards' | 'compact' | 'classic'
}

export function PostCard({ post, variant }: PostCardProps) {
  const { playTrack, addToQueue } = usePlayerStore()

  const handlePlay = () => {
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
      playTrack(track)
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

  if (variant === 'cards') {
    return <CardView post={post} onPlay={handlePlay} onQueue={handleAddToQueue} />
  }

  if (variant === 'compact') {
    return <CompactView post={post} onPlay={handlePlay} onQueue={handleAddToQueue} />
  }

  return <ClassicView post={post} onPlay={handlePlay} onQueue={handleAddToQueue} />
}

function CardView({
  post,
  onPlay,
  onQueue,
}: {
  post: PostData
  onPlay: () => void
  onQueue: () => void
}) {
  const TypeIcon = postTypeConfig[post.type].icon

  return (
    <article className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-muted-foreground/50">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatarUrl} />
            <AvatarFallback>{post.author.displayName?.[0] || post.author.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{post.author.displayName || post.author.username}</span>
              {post.author.isVerified && <span className="text-xs text-primary">✓</span>}
            </div>
            <span className="text-xs text-muted-foreground">{formatRelativeTime(post.createdAt)}</span>
          </div>
        </div>
        <span className={cn('text-xs', postTypeConfig[post.type].color)}>
          <TypeIcon className="mr-1 inline h-3 w-3" />
          {postTypeConfig[post.type].label}
        </span>
      </div>

      {/* Title */}
      <Link to="/post/$postId" params={{ postId: post.id }}>
        <h3 className="mb-2 font-medium hover:text-primary transition-colors cursor-pointer">
          {post.title}
          {post.isSolved && (
            <span className="ml-2 inline-flex items-center rounded bg-green-500/20 px-1.5 py-0.5 text-xs text-green-400">
              <Check className="mr-0.5 h-3 w-3" /> Solved
            </span>
          )}
        </h3>
      </Link>

      {/* Body preview */}
      {post.body && <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{post.body}</p>}

      {/* Embed Player */}
      {post.embed && (
        <div className="mb-3 rounded-md bg-secondary p-3">
          <div className="flex items-center gap-3">
            {post.embed.thumbnailUrl && (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                <img src={post.embed.thumbnailUrl} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={onPlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100"
                >
                  <Play className="h-8 w-8 text-white" fill="white" />
                </button>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium">{post.embed.title}</p>
              <Link 
                to="/artists/$artistId" 
                params={{ artistId: post.embed.artistName.toLowerCase().replace(/\s+/g, '-') }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {post.embed.artistName}
              </Link>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{platformIcons[post.embed.platform]}</span>
                {post.embed.duration && <span>{formatDuration(post.embed.duration)}</span>}
                {post.embed.bpm && <span>• {post.embed.bpm} BPM</span>}
                {post.embed.genre && <span>• {post.embed.genre}</span>}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onPlay}>
              <Play className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <Link 
              key={tag} 
              to="/topics/$tag" 
              params={{ tag }}
              className="text-xs text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <button type="button" className="flex items-center gap-1 hover:text-foreground transition-colors">
          <ChevronUp className="h-4 w-4" />
          {formatNumber(post.upvotes)}
        </button>
        <button type="button" className="flex items-center gap-1 hover:text-foreground transition-colors">
          <MessageSquare className="h-4 w-4" />
          {post.commentCount}
        </button>
        <button type="button" className="flex items-center gap-1 hover:text-foreground transition-colors">
          <Share2 className="h-4 w-4" />
          Share
        </button>
        {post.embed && (
          <button type="button" onClick={onQueue} className="flex items-center gap-1 hover:text-foreground transition-colors">
            <ListPlus className="h-4 w-4" />
            Queue
          </button>
        )}
      </div>
    </article>
  )
}

function CompactView({
  post,
  onPlay,
  onQueue: _onQueue,
}: {
  post: PostData
  onPlay: () => void
  onQueue: () => void
}) {
  const TypeIcon = postTypeConfig[post.type].icon

  return (
    <article className="flex items-center gap-3 border-b border-border py-2 hover:bg-card/50 transition-colors px-2 -mx-2 rounded">
      {/* Votes */}
      <div className="flex w-12 shrink-0 flex-col items-center text-sm">
        <ChevronUp className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
        <span className="font-medium">{formatNumber(post.upvotes)}</span>
      </div>

      {/* Type Icon */}
      <span className={cn('shrink-0', postTypeConfig[post.type].color)}>
        <TypeIcon className="h-4 w-4" />
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link to="/post/$postId" params={{ postId: post.id }} className="truncate">
            <h3 className="truncate font-medium hover:text-primary cursor-pointer">
              {post.title}
            </h3>
          </Link>
          {post.isSolved && <Check className="h-4 w-4 shrink-0 text-green-400" />}
        </div>
        {post.embed && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{platformIcons[post.embed.platform]}</span>
            {post.embed.duration && <span>{formatDuration(post.embed.duration)}</span>}
            {post.embed.bpm && <span>• {post.embed.bpm} BPM</span>}
            {post.embed.genre && <span>• {post.embed.genre}</span>}
          </div>
        )}
      </div>

      {/* Comments */}
      <Link to="/post/$postId" params={{ postId: post.id }} className="flex items-center gap-1 text-sm text-muted-foreground shrink-0 hover:text-foreground transition-colors">
        <MessageSquare className="h-4 w-4" />
        {post.commentCount}
      </Link>

      {/* Author & Time */}
      <div className="hidden sm:block text-xs text-muted-foreground shrink-0 w-24 text-right">
        <span className="hover:text-foreground cursor-pointer">@{post.author.username}</span>
        <span className="block">{formatRelativeTime(post.createdAt)}</span>
      </div>

      {/* Play button */}
      {post.embed && (
        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onClick={onPlay}>
          <Play className="h-4 w-4" />
        </Button>
      )}
    </article>
  )
}

function ClassicView({
  post,
  onPlay,
  onQueue: _onQueue,
}: {
  post: PostData
  onPlay: () => void
  onQueue: () => void
}) {
  const TypeIcon = postTypeConfig[post.type].icon

  return (
    <article className="grid grid-cols-[60px_1fr_80px_80px_100px] items-center gap-2 border-b border-border py-2 text-sm hover:bg-card/50 transition-colors">
      {/* Votes */}
      <div className="flex items-center justify-center gap-1">
        <ChevronUp className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
        <span className="font-medium">{formatNumber(post.upvotes)}</span>
      </div>

      {/* Title & Meta */}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn('shrink-0', postTypeConfig[post.type].color)}>
            <TypeIcon className="h-4 w-4" />
          </span>
          <Link to="/post/$postId" params={{ postId: post.id }} className="truncate flex-1">
            <h3 className="truncate font-medium hover:text-primary cursor-pointer">{post.title}</h3>
          </Link>
          {post.isSolved && <Check className="h-4 w-4 shrink-0 text-green-400" />}
          {post.embed && (
            <Button variant="ghost" size="icon" className="shrink-0 h-6 w-6 ml-auto" onClick={onPlay}>
              <Play className="h-3 w-3" />
            </Button>
          )}
        </div>
        {post.embed && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
            <span>{platformIcons[post.embed.platform]}</span>
            {post.embed.duration && <span>{formatDuration(post.embed.duration)}</span>}
            {post.embed.bpm && <span>• {post.embed.bpm} BPM</span>}
          </div>
        )}
      </div>

      {/* Author */}
      <div className="text-muted-foreground truncate">@{post.author.username}</div>

      {/* Comments */}
      <Link to="/post/$postId" params={{ postId: post.id }} className="text-center hover:text-foreground transition-colors">
        {post.commentCount}
      </Link>

      {/* Time */}
      <div className="text-muted-foreground text-right">{formatRelativeTime(post.createdAt)}</div>
    </article>
  )
}
