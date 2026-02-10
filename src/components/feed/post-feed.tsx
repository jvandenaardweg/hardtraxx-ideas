import { PostCard, type PostData } from './post-card'
import { useViewStore } from '@/stores/view-store'

// Sample data for demonstration
const samplePosts: PostData[] = [
  {
    id: '1',
    type: 'mix',
    title: 'Warface - Defqon.1 2025 Liveset',
    author: {
      id: '1',
      username: 'EventsTeam',
      displayName: 'Events Team',
      isVerified: true,
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    upvotes: 847,
    commentCount: 124,
    tags: ['defqon', 'warface', 'liveset'],
    embed: {
      id: 'e1',
      platform: 'youtube',
      title: 'Warface - Defqon.1 2025 Liveset',
      artistName: 'Warface',
      originalUrl: 'https://youtube.com/watch?v=example1',
      thumbnailUrl: 'https://picsum.photos/seed/warface/200/200',
      duration: 3501,
      bpm: 155,
      genre: 'Raw Hardstyle',
    },
  },
  {
    id: '2',
    type: 'track',
    title: 'Phantom - Untitled WIP [Feedback wanted]',
    body: "Just finished my new track! Been working on this for weeks. Looking for feedback on the kick and the mid-intro melody. Is it too repetitive?",
    author: {
      id: '2',
      username: 'DJ_Phantom',
      displayName: 'DJ Phantom',
    },
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    upvotes: 234,
    commentCount: 56,
    tags: ['rawstyle', 'workinprogress', 'feedback'],
    embed: {
      id: 'e2',
      platform: 'soundcloud',
      title: 'Phantom - Untitled WIP',
      artistName: 'DJ Phantom',
      originalUrl: 'https://soundcloud.com/example',
      thumbnailUrl: 'https://picsum.photos/seed/phantom/200/200',
      duration: 263,
      bpm: 150,
      genre: 'Raw Hardstyle',
    },
  },
  {
    id: '3',
    type: 'discussion',
    title: 'Hot take: Raw hardstyle peaked in 2019-2020. Change my mind.',
    body: "Don't get me wrong, there's still great music coming out, but the innovation and energy from that era was unmatched. Warface, Radical Redemption, D-Sturb - they were all pushing boundaries.",
    author: {
      id: '3',
      username: 'TechnoViking',
    },
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    upvotes: 156,
    commentCount: 287,
    tags: ['discussion', 'rawstyle', 'unpopularopinion'],
  },
  {
    id: '4',
    type: 'mix',
    title: 'Angerfist - Masters of Hardcore 2025 Set',
    author: {
      id: '4',
      username: 'HardcoreNL',
      displayName: 'Hardcore NL',
    },
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    upvotes: 1247,
    commentCount: 89,
    tags: ['angerfist', 'moh', 'hardcore'],
    embed: {
      id: 'e4',
      platform: 'mixcloud',
      title: 'Angerfist - Masters of Hardcore 2025 Set',
      artistName: 'Angerfist',
      originalUrl: 'https://mixcloud.com/example',
      thumbnailUrl: 'https://picsum.photos/seed/angerfist/200/200',
      duration: 5520,
      bpm: 190,
      genre: 'Hardcore',
    },
  },
  {
    id: '5',
    type: 'track_id',
    title: 'Track ID: "we are the resistance" ~155bpm',
    body: "Been stuck in my head for weeks but can't find it anywhere. It goes something like 'we are the resistance' and has this crazy kick around 155bpm. Heard it at Defqon last year.",
    author: {
      id: '5',
      username: 'HardcoreNL',
    },
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    upvotes: 45,
    commentCount: 23,
    isSolved: true,
    tags: ['trackid', 'hardstyle'],
  },
  {
    id: '6',
    type: 'track',
    title: 'D-Sturb - High Power (Official Video)',
    author: {
      id: '6',
      username: 'OfficialHT',
      displayName: 'Official Hardtraxx',
      isVerified: true,
    },
    createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000),
    upvotes: 89,
    commentCount: 34,
    tags: ['dsturb', 'official'],
    embed: {
      id: 'e6',
      platform: 'youtube',
      title: 'D-Sturb - High Power (Official Video)',
      artistName: 'D-Sturb',
      originalUrl: 'https://youtube.com/watch?v=example6',
      thumbnailUrl: 'https://picsum.photos/seed/dsturb/200/200',
      duration: 252,
      bpm: 150,
      genre: 'Raw Hardstyle',
    },
  },
  {
    id: '7',
    type: 'discussion',
    title: 'Best budget studio monitors for hardstyle production?',
    body: "Looking to upgrade from my headphones. Budget is around €300-400. Been looking at KRK Rokit 5 and Yamaha HS5. Any recommendations from fellow producers?",
    author: {
      id: '7',
      username: 'NewProducer',
    },
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    upvotes: 67,
    commentCount: 45,
    tags: ['gear', 'production', 'monitors'],
  },
  {
    id: '8',
    type: 'track',
    title: 'Rebelion - Overdose (Warface Remix)',
    author: {
      id: '8',
      username: 'RebelionHQ',
      displayName: 'Rebelion',
      isVerified: true,
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    upvotes: 312,
    commentCount: 78,
    tags: ['rebelion', 'warface', 'remix'],
    embed: {
      id: 'e8',
      platform: 'soundcloud',
      title: 'Rebelion - Overdose (Warface Remix)',
      artistName: 'Rebelion',
      originalUrl: 'https://soundcloud.com/example8',
      thumbnailUrl: 'https://picsum.photos/seed/rebelion/200/200',
      duration: 334,
      bpm: 155,
      genre: 'Raw Hardstyle',
    },
  },
  {
    id: '9',
    type: 'marketplace',
    title: 'Selling: Pioneer DDJ-1000 - €650 [Amsterdam]',
    body: "Excellent condition, barely used. Comes with original box and decksaver. Can do local pickup in Amsterdam or ship within NL.",
    author: {
      id: '9',
      username: 'DJGearNL',
    },
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
    upvotes: 23,
    commentCount: 8,
    tags: ['marketplace', 'pioneer', 'controller'],
  },
  {
    id: '10',
    type: 'discussion',
    title: 'Unpopular opinion: Frenchcore > Uptempo',
    body: "The melodies and atmosphere in frenchcore are just unmatched. Uptempo is cool for energy but gets repetitive fast. Fight me.",
    author: {
      id: '10',
      username: 'FrenchyBoy',
    },
    createdAt: new Date(Date.now() - 15 * 60 * 60 * 1000),
    upvotes: 445,
    commentCount: 203,
    tags: ['discussion', 'frenchcore', 'uptempo'],
  },
]

export function PostFeed() {
  const { viewMode } = useViewStore()

  return (
    <div className={viewMode === 'cards' ? 'space-y-4' : 'space-y-0'}>
      {/* Classic view header */}
      {viewMode === 'classic' && (
        <div className="grid grid-cols-[60px_1fr_80px_80px_100px] gap-2 border-b border-border py-2 text-xs font-medium text-muted-foreground">
          <div className="text-center">VOTES</div>
          <div>TOPIC</div>
          <div>AUTHOR</div>
          <div className="text-center">REPLIES</div>
          <div className="text-right">LATEST</div>
        </div>
      )}

      {samplePosts.map((post) => (
        <PostCard key={post.id} post={post} variant={viewMode} />
      ))}

      {/* Load more */}
      <div className="py-8 text-center">
        <button className="text-sm text-primary hover:underline">Load more posts...</button>
      </div>
    </div>
  )
}
