Here's a comprehensive Drizzle schema for the platform. I'll break it down into logical modules:

## Core Data Model

```typescript
// schema/users.ts
import { pgTable, uuid, varchar, text, timestamp, boolean, integer, pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['user', 'moderator', 'admin', 'verified_artist', 'verified_label', 'verified_promoter']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Auth
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  
  // Profile
  displayName: varchar('display_name', { length: 100 }),
  bio: text('bio'),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  bannerUrl: varchar('banner_url', { length: 500 }),
  location: varchar('location', { length: 100 }),
  website: varchar('website', { length: 255 }),
  
  // Social links
  soundcloudUrl: varchar('soundcloud_url', { length: 255 }),
  youtubeUrl: varchar('youtube_url', { length: 255 }),
  spotifyUrl: varchar('spotify_url', { length: 255 }),
  instagramUrl: varchar('instagram_url', { length: 255 }),
  
  // Status & role
  role: userRoleEnum('role').default('user').notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  isBanned: boolean('is_banned').default(false).notNull(),
  
  // Stats (denormalized for performance)
  reputation: integer('reputation').default(0).notNull(),
  postCount: integer('post_count').default(0).notNull(),
  trackIdsResolved: integer('track_ids_resolved').default(0).notNull(),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastActiveAt: timestamp('last_active_at'),
});

export const userPreferences = pgTable('user_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  
  // Display
  defaultView: varchar('default_view', { length: 20 }).default('compact'), // 'cards', 'compact', 'classic'
  postsPerPage: integer('posts_per_page').default(25),
  darkMode: boolean('dark_mode').default(true),
  
  // Audio player
  persistentPlayer: boolean('persistent_player').default(true),
  autoQueueNext: boolean('auto_queue_next').default(true),
  
  // Notifications
  emailNotifications: boolean('email_notifications').default(true),
  notifyOnReply: boolean('notify_on_reply').default(true),
  notifyOnMention: boolean('notify_on_mention').default(true),
  notifyOnFollow: boolean('notify_on_follow').default(true),
  
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

```typescript
// schema/topics.ts
import { pgTable, uuid, varchar, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

// Categories/Subforums - the main organizational structure
export const topics = pgTable('topics', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  iconEmoji: varchar('icon_emoji', { length: 10 }),
  color: varchar('color', { length: 7 }), // hex color
  
  // Hierarchy (for nested topics like "Hardstyle > Raw")
  parentId: uuid('parent_id').references(() => topics.id),
  sortOrder: integer('sort_order').default(0).notNull(),
  
  // Stats
  subscriberCount: integer('subscriber_count').default(0).notNull(),
  postCount: integer('post_count').default(0).notNull(),
  
  isArchived: boolean('is_archived').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User subscriptions to topics
export const topicSubscriptions = pgTable('topic_subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  topicId: uuid('topic_id').notNull().references(() => topics.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

```typescript
// schema/posts.ts
import { pgTable, uuid, varchar, text, timestamp, boolean, integer, pgEnum, jsonb } from 'drizzle-orm/pg-core';
import { users } from './users';
import { topics } from './topics';

export const postTypeEnum = pgEnum('post_type', [
  'track',       // Single track share
  'mix',         // DJ mix/set
  'discussion',  // Text discussion
  'track_id',    // Track ID request
  'event',       // Event announcement
  'marketplace', // Buy/sell listing
  'news',        // News/announcement
]);

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Author
  authorId: uuid('author_id').notNull().references(() => users.id),
  
  // Content
  type: postTypeEnum('type').notNull(),
  title: varchar('title', { length: 300 }),
  body: text('body'),
  
  // Topic/category
  topicId: uuid('topic_id').references(() => topics.id),
  
  // Status
  isPinned: boolean('is_pinned').default(false).notNull(),
  isLocked: boolean('is_locked').default(false).notNull(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  isSolved: boolean('is_solved').default(false).notNull(), // For track ID requests
  
  // Stats (denormalized)
  upvotes: integer('upvotes').default(0).notNull(),
  downvotes: integer('downvotes').default(0).notNull(),
  score: integer('score').default(0).notNull(), // upvotes - downvotes
  commentCount: integer('comment_count').default(0).notNull(),
  viewCount: integer('view_count').default(0).notNull(),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastActivityAt: timestamp('last_activity_at').defaultNow().notNull(),
});

// Tags (user-generated, like hashtags)
export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  usageCount: integer('usage_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const postTags = pgTable('post_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
});
```

```typescript
// schema/embeds.ts
import { pgTable, uuid, varchar, text, timestamp, integer, pgEnum, real } from 'drizzle-orm/pg-core';
import { posts } from './posts';

export const embedPlatformEnum = pgEnum('embed_platform', [
  'youtube',
  'soundcloud',
  'mixcloud',
  'bandcamp',
  'spotify',
  'hearthis',
  'other',
]);

// Audio/video embeds attached to posts
export const embeds = pgTable('embeds', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  
  // Source
  platform: embedPlatformEnum('platform').notNull(),
  originalUrl: varchar('original_url', { length: 500 }).notNull(),
  embedId: varchar('embed_id', { length: 255 }), // Platform-specific ID
  
  // Metadata (fetched from platform)
  title: varchar('title', { length: 300 }),
  artistName: varchar('artist_name', { length: 200 }),
  thumbnailUrl: varchar('thumbnail_url', { length: 500 }),
  duration: integer('duration'), // seconds
  
  // User-contributed metadata
  bpm: integer('bpm'),
  musicalKey: varchar('musical_key', { length: 10 }), // e.g., "Am", "F#m", "8A" (Camelot)
  genre: varchar('genre', { length: 100 }),
  subgenre: varchar('subgenre', { length: 100 }),
  releaseYear: integer('release_year'),
  label: varchar('label', { length: 200 }),
  
  // Play stats (if we want to track internally)
  playCount: integer('play_count').default(0).notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tracklists for mixes
export const tracklistEntries = pgTable('tracklist_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  embedId: uuid('embed_id').notNull().references(() => embeds.id, { onDelete: 'cascade' }),
  
  position: integer('position').notNull(), // Order in the tracklist
  timestampSeconds: integer('timestamp_seconds'), // When the track starts
  
  // Track info
  artistName: varchar('artist_name', { length: 200 }).notNull(),
  trackTitle: varchar('track_title', { length: 300 }).notNull(),
  label: varchar('label', { length: 200 }),
  
  // Optional link to the track's own embed (if someone shared it separately)
  linkedEmbedId: uuid('linked_embed_id').references(() => embeds.id),
  
  // Who added this entry
  addedById: uuid('added_by_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

```typescript
// schema/comments.ts
import { pgTable, uuid, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';
import { posts } from './posts';

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  authorId: uuid('author_id').notNull().references(() => users.id),
  
  // For nested comments (replies to comments)
  parentId: uuid('parent_id').references(() => comments.id),
  
  // Content
  body: text('body').notNull(),
  
  // Can optionally include an embed in a comment (e.g., "here's the track you're looking for")
  embedId: uuid('embed_id').references(() => embeds.id),
  
  // Status
  isDeleted: boolean('is_deleted').default(false).notNull(),
  isAcceptedAnswer: boolean('is_accepted_answer').default(false).notNull(), // For track ID solutions
  
  // Stats
  upvotes: integer('upvotes').default(0).notNull(),
  downvotes: integer('downvotes').default(0).notNull(),
  score: integer('score').default(0).notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

```typescript
// schema/engagement.ts
import { pgTable, uuid, timestamp, pgEnum, integer } from 'drizzle-orm/pg-core';
import { users } from './users';
import { posts } from './posts';
import { comments } from './comments';

export const voteTypeEnum = pgEnum('vote_type', ['up', 'down']);

// Votes on posts
export const postVotes = pgTable('post_votes', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  voteType: voteTypeEnum('vote_type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Votes on comments
export const commentVotes = pgTable('comment_votes', {
  id: uuid('id').primaryKey().defaultRandom(),
  commentId: uuid('comment_id').notNull().references(() => comments.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  voteType: voteTypeEnum('vote_type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Saved/bookmarked posts
export const savedPosts = pgTable('saved_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User follows (user -> user)
export const follows = pgTable('follows', {
  id: uuid('id').primaryKey().defaultRandom(),
  followerId: uuid('follower_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  followingId: uuid('following_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

```typescript
// schema/events.ts
import { pgTable, uuid, varchar, text, timestamp, integer, boolean, date, time, pgEnum, real } from 'drizzle-orm/pg-core';
import { users } from './users';
import { posts } from './posts';

export const eventTypeEnum = pgEnum('event_type', [
  'festival',
  'club_night',
  'concert',
  'livestream',
  'release_party',
  'other',
]);

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Link to announcement post (optional)
  postId: uuid('post_id').references(() => posts.id),
  createdById: uuid('created_by_id').notNull().references(() => users.id),
  
  // Event details
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  type: eventTypeEnum('type').notNull(),
  
  // Date/time
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  startTime: time('start_time'),
  doorsOpen: time('doors_open'),
  
  // Location
  venueName: varchar('venue_name', { length: 200 }),
  city: varchar('city', { length: 100 }),
  country: varchar('country', { length: 100 }),
  address: text('address'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  isOnline: boolean('is_online').default(false).notNull(),
  
  // Links
  ticketUrl: varchar('ticket_url', { length: 500 }),
  websiteUrl: varchar('website_url', { length: 500 }),
  livestreamUrl: varchar('livestream_url', { length: 500 }),
  
  // Media
  bannerUrl: varchar('banner_url', { length: 500 }),
  
  // Stats
  interestedCount: integer('interested_count').default(0).notNull(),
  goingCount: integer('going_count').default(0).notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const eventRsvpEnum = pgEnum('event_rsvp', ['interested', 'going']);

export const eventRsvps = pgTable('event_rsvps', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: eventRsvpEnum('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

```typescript
// schema/marketplace.ts
import { pgTable, uuid, varchar, text, timestamp, integer, boolean, pgEnum, decimal } from 'drizzle-orm/pg-core';
import { users } from './users';
import { posts } from './posts';

export const listingTypeEnum = pgEnum('listing_type', ['sell', 'buy', 'trade', 'service']);
export const listingStatusEnum = pgEnum('listing_status', ['active', 'sold', 'reserved', 'expired', 'removed']);
export const listingCategoryEnum = pgEnum('listing_category', [
  'dj_equipment',
  'controllers',
  'headphones',
  'speakers',
  'studio_gear',
  'vinyl',
  'merchandise',
  'tickets',
  'services',
  'other',
]);

export const marketplaceListings = pgTable('marketplace_listings', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Link to post
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  sellerId: uuid('seller_id').notNull().references(() => users.id),
  
  // Listing details
  type: listingTypeEnum('type').notNull(),
  category: listingCategoryEnum('category').notNull(),
  status: listingStatusEnum('status').default('active').notNull(),
  
  // Pricing
  price: decimal('price', { precision: 10, scale: 2 }),
  currency: varchar('currency', { length: 3 }).default('EUR'),
  isPriceNegotiable: boolean('is_price_negotiable').default(false),
  
  // Condition (for physical items)
  condition: varchar('condition', { length: 50 }), // 'new', 'like_new', 'good', 'fair', 'parts'
  
  // Location
  city: varchar('city', { length: 100 }),
  country: varchar('country', { length: 100 }),
  shippingAvailable: boolean('shipping_available').default(false),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at'),
});

// Images for marketplace listings
export const listingImages = pgTable('listing_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  listingId: uuid('listing_id').notNull().references(() => marketplaceListings.id, { onDelete: 'cascade' }),
  imageUrl: varchar('image_url', { length: 500 }).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

```typescript
// schema/notifications.ts
import { pgTable, uuid, varchar, text, timestamp, boolean, pgEnum, jsonb } from 'drizzle-orm/pg-core';
import { users } from './users';

export const notificationTypeEnum = pgEnum('notification_type', [
  'reply_to_post',
  'reply_to_comment',
  'mention',
  'upvote_milestone',    // "Your post reached 100 upvotes"
  'new_follower',
  'track_id_solved',
  'event_reminder',
  'post_featured',
  'system',
]);

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: notificationTypeEnum('type').notNull(),
  
  // Content
  title: varchar('title', { length: 200 }).notNull(),
  body: text('body'),
  
  // Reference to related content
  postId: uuid('post_id').references(() => posts.id, { onDelete: 'set null' }),
  commentId: uuid('comment_id').references(() => comments.id, { onDelete: 'set null' }),
  actorId: uuid('actor_id').references(() => users.id, { onDelete: 'set null' }), // Who triggered it
  
  // Additional data (flexible)
  metadata: jsonb('metadata'),
  
  // Status
  isRead: boolean('is_read').default(false).notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

```typescript
// schema/moderation.ts
import { pgTable, uuid, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';
import { posts } from './posts';
import { comments } from './comments';

export const reportReasonEnum = pgEnum('report_reason', [
  'spam',
  'harassment',
  'inappropriate',
  'copyright',
  'misinformation',
  'other',
]);

export const reportStatusEnum = pgEnum('report_status', ['pending', 'reviewed', 'resolved', 'dismissed']);

export const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  reporterId: uuid('reporter_id').notNull().references(() => users.id),
  
  // What's being reported (one of these)
  postId: uuid('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  commentId: uuid('comment_id').references(() => comments.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  
  reason: reportReasonEnum('reason').notNull(),
  description: text('description'),
  
  status: reportStatusEnum('status').default('pending').notNull(),
  
  // Moderation
  reviewedById: uuid('reviewed_by_id').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  moderatorNotes: text('moderator_notes'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const moderationActionEnum = pgEnum('moderation_action', [
  'warn',
  'delete_content',
  'temp_ban',
  'permanent_ban',
  'unban',
]);

export const moderationLogs = pgTable('moderation_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  moderatorId: uuid('moderator_id').notNull().references(() => users.id),
  targetUserId: uuid('target_user_id').references(() => users.id),
  postId: uuid('post_id').references(() => posts.id),
  commentId: uuid('comment_id').references(() => comments.id),
  
  action: moderationActionEnum('action').notNull(),
  reason: text('reason'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

---

## Index File & Relations

```typescript
// schema/index.ts
export * from './users';
export * from './topics';
export * from './posts';
export * from './embeds';
export * from './comments';
export * from './engagement';
export * from './events';
export * from './marketplace';
export * from './notifications';
export * from './moderation';
```

```typescript
// schema/relations.ts
import { relations } from 'drizzle-orm';
import { users, userPreferences } from './users';
import { topics, topicSubscriptions } from './topics';
import { posts, tags, postTags } from './posts';
import { embeds, tracklistEntries } from './embeds';
import { comments } from './comments';
import { postVotes, commentVotes, savedPosts, follows } from './engagement';
import { events, eventRsvps } from './events';
import { marketplaceListings, listingImages } from './marketplace';
import { notifications } from './notifications';

export const usersRelations = relations(users, ({ one, many }) => ({
  preferences: one(userPreferences, {
    fields: [users.id],
    references: [userPreferences.userId],
  }),
  posts: many(posts),
  comments: many(comments),
  followers: many(follows, { relationName: 'following' }),
  following: many(follows, { relationName: 'follower' }),
  savedPosts: many(savedPosts),
  notifications: many(notifications),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  topic: one(topics, {
    fields: [posts.topicId],
    references: [topics.id],
  }),
  embeds: many(embeds),
  comments: many(comments),
  votes: many(postVotes),
  tags: many(postTags),
}));

export const embedsRelations = relations(embeds, ({ one, many }) => ({
  post: one(posts, {
    fields: [embeds.postId],
    references: [posts.id],
  }),
  tracklist: many(tracklistEntries),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: 'replies',
  }),
  replies: many(comments, { relationName: 'replies' }),
  votes: many(commentVotes),
  embed: one(embeds, {
    fields: [comments.embedId],
    references: [embeds.id],
  }),
}));

// ... more relations as needed
```

---

## Key Indexes for Performance

```typescript
// schema/indexes.ts
import { index, uniqueIndex } from 'drizzle-orm/pg-core';

// Add these to the respective tables:

// posts table indexes
export const postsIndexes = {
  authorIdx: index('posts_author_idx').on(posts.authorId),
  topicIdx: index('posts_topic_idx').on(posts.topicId),
  typeIdx: index('posts_type_idx').on(posts.type),
  scoreIdx: index('posts_score_idx').on(posts.score),
  createdAtIdx: index('posts_created_at_idx').on(posts.createdAt),
  lastActivityIdx: index('posts_last_activity_idx').on(posts.lastActivityAt),
  // Composite for feed queries
  feedIdx: index('posts_feed_idx').on(posts.topicId, posts.lastActivityAt, posts.score),
};

// embeds table indexes
export const embedsIndexes = {
  postIdx: index('embeds_post_idx').on(embeds.postId),
  platformIdx: index('embeds_platform_idx').on(embeds.platform),
  bpmIdx: index('embeds_bpm_idx').on(embeds.bpm),
  genreIdx: index('embeds_genre_idx').on(embeds.genre),
  // For search
  searchIdx: index('embeds_search_idx').on(embeds.artistName, embeds.title),
};

// comments table indexes
export const commentsIndexes = {
  postIdx: index('comments_post_idx').on(comments.postId),
  authorIdx: index('comments_author_idx').on(comments.authorId),
  parentIdx: index('comments_parent_idx').on(comments.parentId),
};

// Unique constraints
export const uniqueConstraints = {
  postVoteUnique: uniqueIndex('post_votes_unique').on(postVotes.postId, postVotes.userId),
  commentVoteUnique: uniqueIndex('comment_votes_unique').on(commentVotes.commentId, commentVotes.userId),
  savedPostUnique: uniqueIndex('saved_posts_unique').on(savedPosts.postId, savedPosts.userId),
  followUnique: uniqueIndex('follows_unique').on(follows.followerId, follows.followingId),
  topicSubUnique: uniqueIndex('topic_subscriptions_unique').on(topicSubscriptions.userId, topicSubscriptions.topicId),
  eventRsvpUnique: uniqueIndex('event_rsvps_unique').on(eventRsvps.eventId, eventRsvps.userId),
};
```

---

## Entity Relationship Overview

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    DATA MODEL OVERVIEW                                          │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

                                    ┌─────────────┐
                                    │   USERS     │
                                    └──────┬──────┘
                                           │
              ┌────────────────────────────┼────────────────────────────┐
              │                            │                            │
              ▼                            ▼                            ▼
     ┌────────────────┐           ┌────────────────┐           ┌────────────────┐
     │  PREFERENCES   │           │    FOLLOWS     │           │ NOTIFICATIONS  │
     └────────────────┘           └────────────────┘           └────────────────┘
                                           
                    ┌──────────────────────┴──────────────────────┐
                    │                                             │
                    ▼                                             ▼
           ┌────────────────┐                            ┌────────────────┐
           │     POSTS      │◄───────────────────────────│    TOPICS      │
           └───────┬────────┘                            └───────┬────────┘
                   │                                             │
     ┌─────────────┼─────────────┬─────────────┐                 │
     │             │             │             │                 ▼
     ▼             ▼             ▼             ▼        ┌────────────────┐
┌─────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐   │ SUBSCRIPTIONS  │
│ EMBEDS  │  │ COMMENTS │  │  VOTES  │  │  TAGS    │   └────────────────┘
└────┬────┘  └────┬─────┘  └─────────┘  └──────────┘
     │            │
     ▼            ▼
┌──────────┐ ┌─────────┐
│TRACKLIST │ │  VOTES  │
│ ENTRIES  │ └─────────┘
└──────────┘

           ┌───────────────────────────────────────────┐
           │            SPECIALIZED MODULES            │
           └───────────────────────────────────────────┘

    ┌────────────────┐    ┌────────────────┐    ┌────────────────┐
    │     EVENTS     │    │  MARKETPLACE   │    │   MODERATION   │
    └───────┬────────┘    └───────┬────────┘    └───────┬────────┘
            │                     │                     │
            ▼                     ▼                     ▼
    ┌────────────────┐    ┌────────────────┐    ┌────────────────┐
    │     RSVPs      │    │    IMAGES      │    │    REPORTS     │
    └────────────────┘    └────────────────┘    └────────────────┘
```

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Denormalized counts** | `postCount`, `upvotes`, etc. stored directly to avoid expensive COUNT queries on feeds |
| **Soft deletes** | `isDeleted` flags instead of hard deletes for audit trail and undo |
| **UUID primary keys** | Better for distributed systems, no sequential ID enumeration |
| **Separate embeds table** | Embeds are first-class citizens, can be reused and searched independently |
| **Tracklist entries** | Normalized structure allows community editing and linking tracks |
| **Flexible notifications** | `metadata` JSONB field allows different notification types without schema changes |
| **Topic hierarchy** | `parentId` self-reference allows nested categories (Hardstyle > Raw > Xtra Raw) |

This schema should handle the scale you're looking at (2M+ posts historically) and support all the features we discussed. Want me to show some example queries for the different feed views?