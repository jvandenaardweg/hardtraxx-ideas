import 'dotenv/config'
import { db } from './index'
import { users, topics, posts, embeds, tags, postTags, comments } from './schema'

async function seed() {
  console.log('🌱 Seeding database...')

  // Create users
  const [eventsTeam, djPhantom, technoViking, hardcoreNL, officialHT, rebelionHQ] = await db
    .insert(users)
    .values([
      {
        email: 'events@hardtraxx.com',
        username: 'EventsTeam',
        displayName: 'Events Team',
        role: 'admin',
        isVerified: true,
        reputation: 15000,
        postCount: 523,
      },
      {
        email: 'phantom@example.com',
        username: 'DJ_Phantom',
        displayName: 'DJ Phantom',
        bio: 'Producer from NL. Raw hardstyle enthusiast.',
        reputation: 2847,
        postCount: 142,
      },
      {
        email: 'viking@example.com',
        username: 'TechnoViking',
        bio: 'Old school hardstyle lover since 2005',
        reputation: 5621,
        postCount: 892,
      },
      {
        email: 'hardcore@example.com',
        username: 'HardcoreNL',
        displayName: 'Hardcore NL',
        reputation: 1234,
        postCount: 67,
      },
      {
        email: 'official@hardtraxx.com',
        username: 'OfficialHT',
        displayName: 'Official Hardtraxx',
        role: 'admin',
        isVerified: true,
        reputation: 25000,
        postCount: 1200,
      },
      {
        email: 'rebelion@example.com',
        username: 'RebelionHQ',
        displayName: 'Rebelion',
        role: 'verified_artist',
        isVerified: true,
        reputation: 50000,
        postCount: 89,
      },
    ])
    .returning()

  console.log('✅ Created users')

  // Create topics
  const [hardstyle, rawHardstyle, hardcore, frenchcore, production, general] = await db
    .insert(topics)
    .values([
      {
        slug: 'hardstyle',
        name: 'Hardstyle',
        description: 'All things hardstyle',
        iconEmoji: '🎵',
        color: '#ff4444',
        subscriberCount: 15000,
        postCount: 45000,
      },
      {
        slug: 'raw-hardstyle',
        name: 'Raw Hardstyle',
        description: 'Raw, dark and distorted',
        iconEmoji: '🔥',
        color: '#ff6b00',
        subscriberCount: 8500,
        postCount: 23000,
      },
      {
        slug: 'hardcore',
        name: 'Hardcore',
        description: 'Faster, harder, louder',
        iconEmoji: '💀',
        color: '#8b00ff',
        subscriberCount: 12000,
        postCount: 38000,
      },
      {
        slug: 'frenchcore',
        name: 'Frenchcore',
        description: 'French hardcore and terror',
        iconEmoji: '🇫🇷',
        color: '#0088ff',
        subscriberCount: 6000,
        postCount: 15000,
      },
      {
        slug: 'production',
        name: 'DJ / Production',
        description: 'Production tips, gear, and tutorials',
        iconEmoji: '🎧',
        color: '#44ff88',
        subscriberCount: 4500,
        postCount: 8900,
      },
      {
        slug: 'general',
        name: 'General Discussion',
        description: 'Off-topic and community chat',
        iconEmoji: '💬',
        color: '#888888',
        subscriberCount: 20000,
        postCount: 120000,
      },
    ])
    .returning()

  console.log('✅ Created topics')

  // Create tags
  const createdTags = await db
    .insert(tags)
    .values([
      { name: 'defqon', usageCount: 5234 },
      { name: 'warface', usageCount: 2341 },
      { name: 'liveset', usageCount: 8923 },
      { name: 'rawstyle', usageCount: 12456 },
      { name: 'feedback', usageCount: 3421 },
      { name: 'discussion', usageCount: 45234 },
      { name: 'trackid', usageCount: 8921 },
      { name: 'hardcore', usageCount: 15234 },
      { name: 'angerfist', usageCount: 4521 },
      { name: 'production', usageCount: 6234 },
      { name: 'gear', usageCount: 2341 },
      { name: 'marketplace', usageCount: 1234 },
    ])
    .returning()

  console.log('✅ Created tags')

  // Create posts
  const post1 = await db
    .insert(posts)
    .values({
      authorId: eventsTeam.id,
      type: 'mix',
      title: 'Warface - Defqon.1 2025 Liveset',
      topicId: rawHardstyle.id,
      upvotes: 847,
      score: 847,
      commentCount: 124,
      viewCount: 12500,
    })
    .returning()

  await db.insert(embeds).values({
    postId: post1[0].id,
    platform: 'youtube',
    originalUrl: 'https://youtube.com/watch?v=example1',
    embedId: 'example1',
    title: 'Warface - Defqon.1 2025 Liveset',
    artistName: 'Warface',
    thumbnailUrl: 'https://picsum.photos/seed/warface/400/400',
    duration: 3501,
    bpm: 155,
    genre: 'Raw Hardstyle',
  })

  const post2 = await db
    .insert(posts)
    .values({
      authorId: djPhantom.id,
      type: 'track',
      title: 'Phantom - Untitled WIP [Feedback wanted]',
      body: "Just finished my new track! Been working on this for weeks. Looking for feedback on the kick and the mid-intro melody. Is it too repetitive?",
      topicId: rawHardstyle.id,
      upvotes: 234,
      score: 234,
      commentCount: 56,
      viewCount: 3400,
    })
    .returning()

  await db.insert(embeds).values({
    postId: post2[0].id,
    platform: 'soundcloud',
    originalUrl: 'https://soundcloud.com/djphantom/untitled-wip',
    title: 'Phantom - Untitled WIP',
    artistName: 'DJ Phantom',
    thumbnailUrl: 'https://picsum.photos/seed/phantom/400/400',
    duration: 263,
    bpm: 150,
    genre: 'Raw Hardstyle',
  })

  const post3 = await db
    .insert(posts)
    .values({
      authorId: technoViking.id,
      type: 'discussion',
      title: 'Hot take: Raw hardstyle peaked in 2019-2020. Change my mind.',
      body: "Don't get me wrong, there's still great music coming out, but the innovation and energy from that era was unmatched.",
      topicId: rawHardstyle.id,
      upvotes: 156,
      downvotes: 45,
      score: 111,
      commentCount: 287,
      viewCount: 8900,
    })
    .returning()

  const post4 = await db
    .insert(posts)
    .values({
      authorId: hardcoreNL.id,
      type: 'track_id',
      title: 'Track ID: "we are the resistance" ~155bpm',
      body: "Been stuck in my head for weeks but can't find it anywhere. It goes something like 'we are the resistance'",
      topicId: hardstyle.id,
      upvotes: 45,
      score: 45,
      commentCount: 23,
      viewCount: 1200,
      isSolved: true,
    })
    .returning()

  console.log('✅ Created posts with embeds')

  // Create some comments
  await db.insert(comments).values([
    {
      postId: post2[0].id,
      authorId: technoViking.id,
      body: 'Kick sounds solid but maybe layer it with a bit more punch in the low end. Mid-intro is fire though!',
      upvotes: 45,
      score: 45,
    },
    {
      postId: post3[0].id,
      authorId: hardcoreNL.id,
      body: "Disagree! 2023-2024 has been incredible. D-Sturb and Warface are still pushing boundaries.",
      upvotes: 32,
      downvotes: 5,
      score: 27,
    },
    {
      postId: post4[0].id,
      authorId: djPhantom.id,
      body: "That's \"Resistance\" by Sub Zero Project! Here you go.",
      upvotes: 67,
      score: 67,
      isAcceptedAnswer: true,
    },
  ])

  console.log('✅ Created comments')

  console.log('🎉 Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
