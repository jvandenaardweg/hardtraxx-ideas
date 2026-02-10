import { pgTable, uuid, varchar, text, timestamp, boolean, integer, pgEnum } from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('user_role', [
  'user',
  'moderator',
  'admin',
  'verified_artist',
  'verified_label',
  'verified_promoter',
])

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
})

export const userPreferences = pgTable('user_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),

  // Display
  defaultView: varchar('default_view', { length: 20 }).default('compact'),
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
})
