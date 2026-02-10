import { pgTable, uuid, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core'
import { users } from './users'
import { posts } from './posts'
import { embeds } from './embeds'

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),

  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  authorId: uuid('author_id')
    .notNull()
    .references(() => users.id),

  parentId: uuid('parent_id'),

  body: text('body').notNull(),

  embedId: uuid('embed_id').references(() => embeds.id),

  isDeleted: boolean('is_deleted').default(false).notNull(),
  isAcceptedAnswer: boolean('is_accepted_answer').default(false).notNull(),

  upvotes: integer('upvotes').default(0).notNull(),
  downvotes: integer('downvotes').default(0).notNull(),
  score: integer('score').default(0).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
