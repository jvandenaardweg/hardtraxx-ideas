import { pgTable, uuid, varchar, text, timestamp, boolean, integer, pgEnum } from 'drizzle-orm/pg-core'
import { users } from './users'
import { topics } from './topics'

export const postTypeEnum = pgEnum('post_type', [
  'track',
  'mix',
  'discussion',
  'track_id',
  'event',
  'marketplace',
  'news',
])

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),

  // Author
  authorId: uuid('author_id')
    .notNull()
    .references(() => users.id),

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
  isSolved: boolean('is_solved').default(false).notNull(),

  // Stats (denormalized)
  upvotes: integer('upvotes').default(0).notNull(),
  downvotes: integer('downvotes').default(0).notNull(),
  score: integer('score').default(0).notNull(),
  commentCount: integer('comment_count').default(0).notNull(),
  viewCount: integer('view_count').default(0).notNull(),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastActivityAt: timestamp('last_activity_at').defaultNow().notNull(),
})

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  usageCount: integer('usage_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const postTags = pgTable('post_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id')
    .notNull()
    .references(() => tags.id, { onDelete: 'cascade' }),
})
