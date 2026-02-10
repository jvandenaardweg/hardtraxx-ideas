import { PostCard, type PostData } from './post-card'
import { useViewStore } from '@/stores/view-store'

// "For You" posts - mixed algorithmic feed
const forYouPosts: PostData[] = [
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
]

// "Following" posts - from artists/users the user follows
const followingPosts: PostData[] = [
  {
    id: 'f1',
    type: 'track',
    title: 'D-Sturb - Open Your Eyes (Official Audio)',
    body: 'New single out now! This one is special to me. Hope you enjoy it as much as I enjoyed making it. 🔥',
    author: {
      id: 'a-dsturb',
      username: 'dsturbofficial',
      displayName: 'D-Sturb',
      isVerified: true,
      avatarUrl: 'https://picsum.photos/seed/dsturb/100/100',
    },
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    upvotes: 1234,
    commentCount: 156,
    tags: ['dsturb', 'newrelease', 'rawstyle'],
    embed: {
      id: 'ef1',
      platform: 'youtube',
      title: 'Open Your Eyes',
      artistName: 'D-Sturb',
      originalUrl: 'https://youtube.com/watch?v=dsturb-oye',
      thumbnailUrl: 'https://picsum.photos/seed/dsturb-new/200/200',
      duration: 285,
      bpm: 150,
      genre: 'Raw Hardstyle',
    },
  },
  {
    id: 'f2',
    type: 'discussion',
    title: 'Studio update: Working on something massive with Rebelion 👀',
    body: "Can't say too much yet, but this collab is going to be insane. Stay tuned for more updates soon!",
    author: {
      id: 'a-warface',
      username: 'warfacemusic',
      displayName: 'Warface',
      isVerified: true,
      avatarUrl: 'https://picsum.photos/seed/warface/100/100',
    },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    upvotes: 892,
    commentCount: 234,
    tags: ['warface', 'rebelion', 'collab', 'teaser'],
  },
  {
    id: 'f3',
    type: 'mix',
    title: 'My full set from Qlimax 2025 is now online!',
    body: 'One of my favorite sets ever. Thank you to everyone who was there! The energy was unreal.',
    author: {
      id: 'a-headhunterz',
      username: 'headhunterz',
      displayName: 'Headhunterz',
      isVerified: true,
      avatarUrl: 'https://picsum.photos/seed/headhunterz/100/100',
    },
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    upvotes: 2341,
    commentCount: 312,
    tags: ['headhunterz', 'qlimax', 'liveset'],
    embed: {
      id: 'ef3',
      platform: 'youtube',
      title: 'Headhunterz - Qlimax 2025 Full Set',
      artistName: 'Headhunterz',
      originalUrl: 'https://youtube.com/watch?v=hhz-qlimax',
      thumbnailUrl: 'https://picsum.photos/seed/hhz-qlimax/200/200',
      duration: 3600,
      bpm: 150,
      genre: 'Hardstyle',
    },
  },
  {
    id: 'f4',
    type: 'track',
    title: 'Angerfist & Miss K8 - Bloodbath (OUT NOW)',
    author: {
      id: 'a-angerfist',
      username: 'angerfist',
      displayName: 'Angerfist',
      isVerified: true,
      avatarUrl: 'https://picsum.photos/seed/angerfist/100/100',
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    upvotes: 1567,
    commentCount: 189,
    tags: ['angerfist', 'missk8', 'hardcore', 'newrelease'],
    embed: {
      id: 'ef4',
      platform: 'soundcloud',
      title: 'Bloodbath',
      artistName: 'Angerfist & Miss K8',
      originalUrl: 'https://soundcloud.com/angerfist/bloodbath',
      thumbnailUrl: 'https://picsum.photos/seed/bloodbath/200/200',
      duration: 312,
      bpm: 180,
      genre: 'Hardcore',
    },
  },
  {
    id: 'f5',
    type: 'news',
    title: 'Announcing our Defqon.1 2026 concept album! Pre-order now available.',
    author: {
      id: 'a-rebelion',
      username: 'rebelionhq',
      displayName: 'Rebelion',
      isVerified: true,
      avatarUrl: 'https://picsum.photos/seed/rebelion/100/100',
    },
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    upvotes: 987,
    commentCount: 145,
    tags: ['rebelion', 'defqon', 'album', 'announcement'],
  },
  {
    id: 'f6',
    type: 'track',
    title: 'Dr. Peacock & Sefa - Trip to Mexico (Official Video)',
    author: {
      id: 'a-drpeacock',
      username: 'drpeacock',
      displayName: 'Dr. Peacock',
      isVerified: true,
      avatarUrl: 'https://picsum.photos/seed/drpeacock/100/100',
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    upvotes: 1123,
    commentCount: 167,
    tags: ['drpeacock', 'sefa', 'frenchcore', 'videoclip'],
    embed: {
      id: 'ef6',
      platform: 'youtube',
      title: 'Trip to Mexico',
      artistName: 'Dr. Peacock & Sefa',
      originalUrl: 'https://youtube.com/watch?v=trip-mexico',
      thumbnailUrl: 'https://picsum.photos/seed/trip-mexico/200/200',
      duration: 245,
      bpm: 200,
      genre: 'Frenchcore',
    },
  },
]

// "Latest" posts - newest posts first
const latestPosts: PostData[] = [
  {
    id: 'l1',
    type: 'track_id',
    title: 'Track ID: Dark melody with "destroyer" vocal sample',
    body: 'Heard this at a local rave last night. Dark kick, female vocal saying "destroyer" or something similar. Around 150bpm hardstyle. Anyone know it?',
    author: {
      id: 'u-new1',
      username: 'RaveHunter',
    },
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    upvotes: 3,
    commentCount: 2,
    tags: ['trackid', 'hardstyle'],
  },
  {
    id: 'l2',
    type: 'discussion',
    title: 'First time going to Defqon - what should I bring?',
    body: "Super excited for my first Defqon! Going with the weekend camping package. What are the essentials I should pack? Any tips for first-timers?",
    author: {
      id: 'u-new2',
      username: 'FirstTimer2026',
    },
    createdAt: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    upvotes: 8,
    commentCount: 15,
    tags: ['defqon2026', 'camping', 'tips', 'newbie'],
  },
  {
    id: 'l3',
    type: 'track',
    title: 'Just uploaded my first hardstyle track! Feedback appreciated',
    body: "Been producing for 6 months now. Finally finished something I'm proud of. Would love some honest feedback from the community!",
    author: {
      id: 'u-new3',
      username: 'NewbieProducer',
    },
    createdAt: new Date(Date.now() - 23 * 60 * 1000), // 23 minutes ago
    upvotes: 12,
    commentCount: 8,
    tags: ['feedback', 'newproducer', 'hardstyle'],
    embed: {
      id: 'el3',
      platform: 'soundcloud',
      title: 'Eternal Rise (Original Mix)',
      artistName: 'NewbieProducer',
      originalUrl: 'https://soundcloud.com/newbie/eternal-rise',
      thumbnailUrl: 'https://picsum.photos/seed/newbie-track/200/200',
      duration: 285,
      bpm: 150,
      genre: 'Hardstyle',
    },
  },
  {
    id: 'l4',
    type: 'discussion',
    title: 'Supremacy 2026 lineup predictions?',
    body: 'With the event only a few months away, what artists do you think will be on the lineup? My guess: D-Sturb closing, Warface, Rebelion, and maybe a Radical Redemption return?',
    author: {
      id: 'u-new4',
      username: 'SupremacyFan',
    },
    createdAt: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
    upvotes: 24,
    commentCount: 31,
    tags: ['supremacy', 'lineup', 'predictions', 'rawstyle'],
  },
  {
    id: 'l5',
    type: 'marketplace',
    title: '[WTB] Qlimax 2025 limited edition hoodie - Size L',
    body: "Missed out on the merch stand. Looking for the black hoodie with the temple design. Will pay above retail!",
    author: {
      id: 'u-new5',
      username: 'MerchCollector',
    },
    createdAt: new Date(Date.now() - 48 * 60 * 1000), // 48 minutes ago
    upvotes: 5,
    commentCount: 3,
    tags: ['marketplace', 'qlimax', 'merch', 'wtb'],
  },
  {
    id: 'l6',
    type: 'track',
    title: 'Ncrypta - Dominator (Preview)',
    body: 'Just dropped this preview on my socials. Full release next week! 🔥',
    author: {
      id: 'a-ncrypta',
      username: 'ncryptamusic',
      displayName: 'Ncrypta',
      isVerified: true,
    },
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    upvotes: 156,
    commentCount: 42,
    tags: ['ncrypta', 'preview', 'rawstyle'],
    embed: {
      id: 'el6',
      platform: 'youtube',
      title: 'Dominator (Preview)',
      artistName: 'Ncrypta',
      originalUrl: 'https://youtube.com/watch?v=ncrypta-dom',
      thumbnailUrl: 'https://picsum.photos/seed/ncrypta-dom/200/200',
      duration: 60,
      bpm: 150,
      genre: 'Raw Hardstyle',
    },
  },
  {
    id: 'l7',
    type: 'discussion',
    title: 'FL Studio 25 - Worth the upgrade?',
    body: 'Anyone tried the new FL Studio yet? The new mixer features look interesting but wondering if its worth upgrading from 21.',
    author: {
      id: 'u-new7',
      username: 'StudioNerd',
    },
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
    upvotes: 34,
    commentCount: 28,
    tags: ['fl-studio', 'production', 'daw', 'upgrade'],
  },
  {
    id: 'l8',
    type: 'news',
    title: 'Q-dance announces new festival in Australia!',
    body: 'Just announced on their socials. Q-dance is bringing a new hardstyle festival to Sydney in December 2026!',
    author: {
      id: 'u-new8',
      username: 'HSNewsBot',
      displayName: 'HS News',
      isVerified: true,
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    upvotes: 567,
    commentCount: 134,
    tags: ['qdance', 'australia', 'festival', 'news'],
  },
]

// "Trending" posts - highest engagement
const trendingPosts: PostData[] = [
  {
    id: 't1',
    type: 'news',
    title: '🚨 BREAKING: Headhunterz announces retirement from touring',
    body: 'In an emotional Instagram post, Headhunterz has announced he will be stepping back from touring after 2026 to focus on family and studio work. "This isnt goodbye, just a new chapter."',
    author: {
      id: 'u-news',
      username: 'HardstyleNews',
      displayName: 'Hardstyle News',
      isVerified: true,
    },
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    upvotes: 4521,
    commentCount: 892,
    tags: ['headhunterz', 'breaking', 'news', 'retirement'],
  },
  {
    id: 't2',
    type: 'discussion',
    title: 'The state of raw hardstyle in 2026 - are we losing the underground spirit?',
    body: "Been in the scene for 10+ years. Raw used to be about the underground, the dark vibes, the rebellion. Now it feels like its becoming too commercial. Same kick patterns, same drops, same everything. Am I the only one who misses the old days?",
    author: {
      id: 'u-oldschool',
      username: 'OGRawHead',
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    upvotes: 1876,
    commentCount: 567,
    tags: ['discussion', 'rawstyle', 'unpopularopinion', 'scene'],
  },
  {
    id: 't3',
    type: 'mix',
    title: 'D-Sturb closing set @ Defqon.1 2025 - THE ENDSHOW',
    body: 'This is it. The moment everyone waited for. D-Sturb closing The Gathering with the full endshow. Absolute scenes.',
    author: {
      id: 'u-events',
      username: 'DefqonArchive',
      displayName: 'Defqon Archive',
      isVerified: true,
    },
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    upvotes: 3245,
    commentCount: 445,
    tags: ['dsturb', 'defqon', 'endshow', 'legendary'],
    embed: {
      id: 'et3',
      platform: 'youtube',
      title: 'D-Sturb - Defqon.1 2025 Endshow',
      artistName: 'D-Sturb',
      originalUrl: 'https://youtube.com/watch?v=dsturb-endshow',
      thumbnailUrl: 'https://picsum.photos/seed/dsturb-endshow/200/200',
      duration: 5400,
      bpm: 150,
      genre: 'Raw Hardstyle',
    },
  },
  {
    id: 't4',
    type: 'track',
    title: 'Sub Zero Project - The GOAT (Official Defqon.1 2026 Anthem)',
    body: 'THE ANTHEM IS HERE! Sub Zero Project delivers once again. This might be their best work yet.',
    author: {
      id: 'a-qdance',
      username: 'qdance',
      displayName: 'Q-dance',
      isVerified: true,
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    upvotes: 5678,
    commentCount: 734,
    tags: ['subzeroproject', 'defqon', 'anthem', 'official'],
    embed: {
      id: 'et4',
      platform: 'youtube',
      title: 'The GOAT (Official Defqon.1 2026 Anthem)',
      artistName: 'Sub Zero Project',
      originalUrl: 'https://youtube.com/watch?v=szp-goat',
      thumbnailUrl: 'https://picsum.photos/seed/szp-goat/200/200',
      duration: 312,
      bpm: 150,
      genre: 'Hardstyle',
    },
  },
  {
    id: 't5',
    type: 'discussion',
    title: 'Unpopular opinion: Qlimax > Defqon',
    body: "Fight me. The production value, the indoor setting, the single stage focus - Qlimax just hits different. Defqon is amazing but Qlimax is the true temple of hardstyle.",
    author: {
      id: 'u-debate',
      username: 'QlimaxLover',
    },
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
    upvotes: 2134,
    commentCount: 678,
    tags: ['qlimax', 'defqon', 'unpopularopinion', 'debate'],
  },
  {
    id: 't6',
    type: 'news',
    title: 'Radical Redemption returns to hardstyle after 2-year hiatus!',
    body: 'Joey just announced his comeback with a massive tour and new album. The king of kicks is back!',
    author: {
      id: 'u-news2',
      username: 'RawstyleDaily',
      displayName: 'Rawstyle Daily',
      isVerified: true,
    },
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    upvotes: 3456,
    commentCount: 512,
    tags: ['radicalredemption', 'comeback', 'rawstyle', 'news'],
  },
  {
    id: 't7',
    type: 'track',
    title: 'Warface & Rebelion - Gods of War (Album Track)',
    body: 'The long-awaited collab is finally here. This is what happens when two of the best come together.',
    author: {
      id: 'a-warface',
      username: 'warfacemusic',
      displayName: 'Warface',
      isVerified: true,
    },
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
    upvotes: 2890,
    commentCount: 345,
    tags: ['warface', 'rebelion', 'collab', 'rawstyle'],
    embed: {
      id: 'et7',
      platform: 'spotify',
      title: 'Gods of War',
      artistName: 'Warface & Rebelion',
      originalUrl: 'https://open.spotify.com/track/godsofwar',
      thumbnailUrl: 'https://picsum.photos/seed/gods-war/200/200',
      duration: 298,
      bpm: 155,
      genre: 'Raw Hardstyle',
    },
  },
]

export function PostFeed() {
  const { viewMode, feedTab } = useViewStore()

  // Select posts based on active tab
  const posts = {
    'for-you': forYouPosts,
    'following': followingPosts,
    'latest': latestPosts,
    'trending': trendingPosts,
  }[feedTab]

  // Empty state messages
  const emptyMessages = {
    'for-you': 'No posts yet. Check back later!',
    'following': "Follow some artists and users to see their posts here.",
    'latest': 'No new posts yet. Be the first to post!',
    'trending': 'No trending posts right now.',
  }

  return (
    <div className={viewMode === 'cards' ? 'space-y-4' : 'space-y-0'}>
      {/* Compact view header */}
      {viewMode === 'compact' && (
        <div className="grid grid-cols-[50px_24px_1fr_60px_100px_40px] items-center gap-3 border-b border-border py-2 px-2 -mx-2 text-xs font-medium text-muted-foreground">
          <div className="text-center">VOTES</div>
          <div className="text-center">TYPE</div>
          <div>TITLE</div>
          <div className="text-center">REPLIES</div>
          <div className="hidden sm:block text-right">AUTHOR</div>
          <div className="text-center">PLAY</div>
        </div>
      )}

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

      {posts.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          <p>{emptyMessages[feedTab]}</p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} variant={viewMode} />
        ))
      )}

      {/* Load more */}
      {posts.length > 0 && (
        <div className="py-8 text-center">
          <button type="button" className="text-sm text-primary hover:underline">Load more posts...</button>
        </div>
      )}
    </div>
  )
}
