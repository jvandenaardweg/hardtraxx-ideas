import { pgTable, uuid, varchar, text, timestamp, integer, boolean, date, time, pgEnum, real } from 'drizzle-orm/pg-core'
import { users } from './users'
import { posts } from './posts'

export const eventTypeEnum = pgEnum('event_type', [
  'festival',
  'club_night',
  'concert',
  'livestream',
  'release_party',
  'other',
])

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),

  postId: uuid('post_id').references(() => posts.id),
  createdById: uuid('created_by_id')
    .notNull()
    .references(() => users.id),

  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  type: eventTypeEnum('type').notNull(),

  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  startTime: time('start_time'),
  doorsOpen: time('doors_open'),

  venueName: varchar('venue_name', { length: 200 }),
  city: varchar('city', { length: 100 }),
  country: varchar('country', { length: 100 }),
  address: text('address'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  isOnline: boolean('is_online').default(false).notNull(),

  ticketUrl: varchar('ticket_url', { length: 500 }),
  websiteUrl: varchar('website_url', { length: 500 }),
  livestreamUrl: varchar('livestream_url', { length: 500 }),

  bannerUrl: varchar('banner_url', { length: 500 }),

  interestedCount: integer('interested_count').default(0).notNull(),
  goingCount: integer('going_count').default(0).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const eventRsvpEnum = pgEnum('event_rsvp', ['interested', 'going'])

export const eventRsvps = pgTable('event_rsvps', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  status: eventRsvpEnum('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
