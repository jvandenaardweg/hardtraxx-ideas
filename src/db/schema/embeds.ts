import { pgTable, uuid, varchar, text, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core'
import { posts } from './posts'
import { users } from './users'

export const embedPlatformEnum = pgEnum('embed_platform', [
  'youtube',
  'soundcloud',
  'mixcloud',
  'bandcamp',
  'spotify',
  'hearthis',
  'other',
])

export const embeds = pgTable('embeds', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),

  // Source
  platform: embedPlatformEnum('platform').notNull(),
  originalUrl: varchar('original_url', { length: 500 }).notNull(),
  embedId: varchar('embed_id', { length: 255 }),

  // Metadata (fetched from platform)
  title: varchar('title', { length: 300 }),
  artistName: varchar('artist_name', { length: 200 }),
  thumbnailUrl: varchar('thumbnail_url', { length: 500 }),
  duration: integer('duration'),

  // User-contributed metadata
  bpm: integer('bpm'),
  musicalKey: varchar('musical_key', { length: 10 }),
  genre: varchar('genre', { length: 100 }),
  subgenre: varchar('subgenre', { length: 100 }),
  releaseYear: integer('release_year'),
  label: varchar('label', { length: 200 }),

  // Play stats
  playCount: integer('play_count').default(0).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const tracklistEntries = pgTable('tracklist_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  embedId: uuid('embed_id')
    .notNull()
    .references(() => embeds.id, { onDelete: 'cascade' }),

  position: integer('position').notNull(),
  timestampSeconds: integer('timestamp_seconds'),

  artistName: varchar('artist_name', { length: 200 }).notNull(),
  trackTitle: varchar('track_title', { length: 300 }).notNull(),
  label: varchar('label', { length: 200 }),

  linkedEmbedId: uuid('linked_embed_id').references(() => embeds.id),

  addedById: uuid('added_by_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
