import { pgTable, uuid, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { users } from './users'
import { posts } from './posts'
import { comments } from './comments'

export const voteTypeEnum = pgEnum('vote_type', ['up', 'down'])

export const postVotes = pgTable('post_votes', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  voteType: voteTypeEnum('vote_type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const commentVotes = pgTable('comment_votes', {
  id: uuid('id').primaryKey().defaultRandom(),
  commentId: uuid('comment_id')
    .notNull()
    .references(() => comments.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  voteType: voteTypeEnum('vote_type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const savedPosts = pgTable('saved_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const follows = pgTable('follows', {
  id: uuid('id').primaryKey().defaultRandom(),
  followerId: uuid('follower_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  followingId: uuid('following_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
