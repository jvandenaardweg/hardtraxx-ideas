import { pgTable, uuid, varchar, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core'
import { users } from './users'

export const topics = pgTable('topics', {
  id: uuid('id').primaryKey().defaultRandom(),

  slug: varchar('slug', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  iconEmoji: varchar('icon_emoji', { length: 10 }),
  color: varchar('color', { length: 7 }),

  // Hierarchy
  parentId: uuid('parent_id'),
  sortOrder: integer('sort_order').default(0).notNull(),

  // Stats
  subscriberCount: integer('subscriber_count').default(0).notNull(),
  postCount: integer('post_count').default(0).notNull(),

  isArchived: boolean('is_archived').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const topicSubscriptions = pgTable('topic_subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  topicId: uuid('topic_id')
    .notNull()
    .references(() => topics.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
