# HARDTRAXX - Product Overview

The modern successor to the Hardtraxx forum — a community-driven platform for the hard dance scene (hardstyle, hardcore, frenchcore, uptempo, and beyond). Built to preserve nearly 2 million legacy posts while introducing feed-based discovery, embedded audio playback, artist profiles, live event experiences, and gamification that rewards quality contributions.

The platform is **community-driven at its core**: users contribute metadata, identify unknown tracks, curate tracklists, and keep content up-to-date. Artists can claim profiles and engage directly with fans. Event organizers can promote parties and provide live experiences during festivals. All while maintaining a migration path from the legacy forum.

---

## The Problem

The existing Hardtraxx forum has served the hard dance community for years, but traditional forum software is showing its age:

| Forum Limitations | What Users Expect Today |
|-------------------|------------------------|
| Thread-based navigation | Personalized feeds and discovery |
| No inline audio playback | Seamless embedded players |
| Static event listings | Live event sections with real-time chat |
| Basic user profiles | Artist pages, verification, analytics |
| Post count as status | Reputation based on quality contributions |
| No mobile experience | Mobile-first, PWA |

The hard dance scene also lacks a **dedicated modern platform**. Current alternatives fall short:

- **Reddit** (r/hardstyle, r/hardcore) — no inline audio, not music-focused
- **Discord** — fragmented across servers, content disappears, no discovery
- **Facebook groups** — younger users leaving, poor audio support
- **SoundCloud** — music hosting, not a community platform
- **Partyflock** — events only, no music sharing or discussion

HARDTRAXX fills this gap: a purpose-built platform for hard dance that combines community discussion, music discovery, artist profiles, event coverage, and a marketplace — with the existing community as its foundation.

---

## Core Concept

A **vertical community platform** that combines:

| Old Forum Model | Modern Approach |
|-----------------|-----------------|
| Categories & subforums | Topic tags + algorithmic feeds |
| Threads with pagination | Infinite scroll + threaded comments |
| Sticky posts | Pinned content + featured sections |
| User signatures | Rich profiles with music portfolios |

---

## 1. Legacy Migration

Migrate the existing forum to the new platform while preserving history.

### Forum Data Migration
- Map legacy forum categories → new topics
- Map forum threads → posts
- Map thread replies → comments structure
- Convert BBCode → Markdown (research Reddit's approach)

### Legacy Preservation
- Keep legacy forum read-only at `legacy.hardtraxx.com`
- Map legacy users to new accounts with special "Legacy Member" status
- Allow users to show/hide legacy status badge in settings

### User Migration
- One-time migration script for existing accounts
- Email verification for account claiming
- Preserve post history and reputation

---

## 2. Access & Authentication

### Anonymous Access
- Read-only access for logged-out users
- Post details freely visible
- Homepage feeds (trending, etc.) have limited pagination
- After a few visits, show sign-in prompt modal

### Onboarding Flow
When a user signs up:
- Guided setup wizard
- Follow suggested topics based on interests
- Follow popular artists
- Subscribe to upcoming events
- Import preferences from legacy account (if applicable)

---

## 3. User Roles & Permissions

### Role Hierarchy

| Role | Capabilities |
|------|--------------|
| **USER** | Create posts, comments. Edit own content. Vote, follow, save. |
| **MODERATOR** | All USER permissions + edit others' posts, lock posts, delete posts, handle reports |
| **ADMIN** | All MODERATOR permissions + manage users, roles, site settings, view analytics |

### Verified Profiles
- Verified Artist
- Verified Label
- Verified Event Promoter

Verification unlocks:
- Badge display
- Artist alias for posts/comments
- Access to analytics
- Ability to claim artist profile

---

## 4. Artists & Labels

### Artist Profiles
- Database populated from external sources (hardstyle.com)
- Correct images via mapping service
- Discography, social links, upcoming events

### Artist Claiming
- Real artists can claim their profile
- Verification process (social proof)
- Once claimed, artist can:
  - Post/comment as their artist alias
  - Hide specific posts from their profile
  - Access detailed profile analytics

### Connecting Content to Artists
- Link posts to artist profiles
- Show linked posts on artist profile page
- Artists can manually hide posts they don't want shown

### Record Labels
- Labels as entities (collection of tracks)
- Link tracks to their release label
- Label pages showing all releases

---

## 5. Community-Driven Content

The platform relies on community contributions for metadata and content quality.

### Editable Metadata
- Community can edit post metadata (title, artist, track info)
- Useful for unknown tracks that get identified later
- Update video thumbnails when better versions surface
- Edit history/audit trail for accountability

### Track & Mix Data
- Incentivize complete metadata (BPM, key, genre, release year)
- Tracklists for mixes (crowdsourced)
- Mark tracks as "unreleased" with expected release date

### Quality Incentives
- Reward users for contributing complete data
- Recognition for identifying unknown tracks
- Gamification (see Ranks & Leaderboards section)

---

## 6. Ranks & Leaderboards

Incentivize being a good community member through visible rewards.

### Rank System
- Users climb ranks based on positive contributions
- Factors that increase rank:
  - Upvotes received
  - Helpful answers (track IDs solved)
  - Quality metadata contributions
  - Consistent activity
- Factors that decrease rank:
  - Reports against user
  - Downvotes received
  - Content removals

### Leaderboards
- Per-section leaderboards (tracks, events, track IDs, etc.)
- Time periods: daily, weekly, monthly, yearly, all-time
- Reaching #1 earns a collectible badge

### Badges
- Display next to username everywhere (comments, posts, profiles)
- Badge collection on profile
- Categories: contribution badges, milestone badges, event badges, legacy badges

---

## 7. Events

### Event Data
- Scrape Partyflock for event listings
- Community submissions
- Event details: date, venue, lineup, tickets

### Live Event Experience
When a big event is happening:
- Prominent "LIVE" section on homepage
- Live chat for the event
- Real-time discussion threads
- Embedded livestream(s) if available
- Live timetable with timezone support (user's local time)

### Post-Event
- Review system for events
- Discussion threads for post-event reactions
- Photo/video sharing

---

## 8. Discovery

### Main Discovery Page
- Personalized recommendations based on followed artists/topics
- Trending content across the platform
- Filter by: genre, BPM, date, type

### Deep Discovery Pages
Each section has its own dedicated page with advanced filtering:

| Route | Purpose |
|-------|---------|
| `/discover/tracks` | All tracks, filterable |
| `/discover/mixes` | DJ mixes and sets |
| `/discover/unreleased` | Upcoming tracks with release dates |
| `/discover/artists` | Artist directory |
| `/discover/events` | Event calendar |
| `/discover/labels` | Record labels |

### Unreleased Tracks
- Track upcoming releases with release dates
- Filter discovery by "unreleased only"
- Notifications when followed artists have releases

---

## 9. Monetization

### Promoted Content
Event organizers and labels can pay to promote:
- Events → appear at top of homepage/event feeds
- Posts → boosted visibility
- Topics → featured placement

Promoted content is clearly labeled as "Promoted".

### Post Boosting
- Any user can boost their post
- One-time payment
- Boosted posts:
  - Appear higher in feeds
  - Labeled as "Boosted"
  - Owner sees detailed visitor stats

### Analytics (Premium)
Detailed stats for entities:
- Artists: pageviews, visitor countries, engagement
- Events: interest tracking, RSVP stats
- Posts: view counts, engagement metrics

Potentially monetizable for verified artists/promoters.

---

## 10. Embedded Audio

Audio playback relies on **YouTube, SoundCloud, Mixcloud** embeds — not native hosting.

### What Works
- Inline embedded players in feed
- Persistent mini-player while browsing
- Queue system for sequential playback
- User-contributed metadata (BPM, key, genre)
- Community-curated tracklists for mixes

### Limitations
- No waveform visualization
- Playback control depends on platform APIs
- Some platforms may not support continuous playback

---

## 11. External Data Sources

### Integrations

| Source | Data |
|--------|------|
| **Partyflock** | Event listings, scraped and kept up-to-date |
| **Hardstyle.com** | Artist data, album art, track metadata |
| **YouTube/SoundCloud** | Embed metadata, thumbnails |

### Image Hosting
- Cloudflare Images or S3-compatible storage
- CDN for fast delivery
- Used for: avatars, event banners, marketplace listings

---

## 12. Analytics & Stats

Track stats for every entity in the platform:

### User Stats
- Posts created, comments, upvotes received
- Track IDs solved
- Reputation score
- Rank position

### Artist Stats
- Profile pageviews
- Visitor geography
- Engagement on linked posts
- Follower growth

### Post Stats
- Views, unique visitors
- Engagement (votes, comments, shares)
- Referral sources

### Event Stats
- Interest/RSVP counts
- Discussion engagement
- Pre/post event activity

---

## Data Model Overview

```
USERS ─────────────────────────────────────────────────────────────
├── Profile (username, bio, avatar, social links)
├── Role (user, moderator, admin)
├── Verified status (artist, label, promoter)
├── Legacy status (migrated from old forum)
├── Rank & reputation
└── Badges collection

ARTISTS ───────────────────────────────────────────────────────────
├── Profile (name, bio, images, social links)
├── Claimed by user (optional)
├── Linked posts
├── Discography
└── Stats (pageviews, followers)

LABELS ────────────────────────────────────────────────────────────
├── Profile (name, logo)
└── Released tracks

POSTS ─────────────────────────────────────────────────────────────
├── Types: track, mix, discussion, track_id, event, marketplace
├── Content (title, body, tags)
├── Linked artist(s), label
├── Embedded media
├── Stats (views, votes, comments)
├── Boost status
└── Edit history

EMBEDS ────────────────────────────────────────────────────────────
├── Platform (YouTube, SoundCloud, Mixcloud)
├── External URL + embed ID
├── Cached metadata
├── Community metadata (BPM, key, genre)
├── Release status (released/unreleased + date)
└── Tracklist entries (for mixes)

EVENTS ────────────────────────────────────────────────────────────
├── Details (name, date, venue, lineup)
├── Source (Partyflock, manual)
├── Live status (upcoming, live, past)
├── Livestream URLs
├── RSVPs & reviews
└── Promoted status

TOPICS ────────────────────────────────────────────────────────────
├── Mapped from legacy forum categories
├── Hierarchy (parent/child)
└── Subscriptions
```

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (PWA)                                │
│              React + TailwindCSS + Embed APIs                   │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                     API Layer                                    │
│          REST/GraphQL + WebSockets (real-time)                  │
└─────────────────────────────────────────────────────────────────┘
                              │
┌──────────────┬──────────────┬──────────────┬────────────────────┐
│   Content    │    Search    │    Images    │    Scrapers        │
│  (Postgres)  │ (Meilisearch)│ (Cloudflare) │ (Partyflock, etc.) │
└──────────────┴──────────────┴──────────────┴────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │  External Embeds  │
                    │  YouTube, Sound-  │
                    │  Cloud, Mixcloud  │
                    └───────────────────┘
```

---


## Design Theme

Dark mode default (nightlife community):
- Background: `#0D0D0D`
- Cards: `#1A1A1A`
- Accent: `#FF4444` (red brand color)
- Genre colors: Hardstyle (red), Raw (orange), Hardcore (purple), Frenchcore (blue)

---

## What NOT to Build

- **No media hosting** — rely on external embeds
- **No payment processing** — use Stripe/similar for boosts and promotions
- Don't over-moderate early — let community culture develop
- Don't build native apps until web is stable
