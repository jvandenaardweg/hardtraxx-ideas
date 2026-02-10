import { createFileRoute } from '@tanstack/react-router'
import { FeedHeader } from '@/components/feed/feed-header'
import { PostFeed } from '@/components/feed/post-feed'
import { Sidebar } from '@/components/layout/sidebar'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex gap-8">
        {/* Main Feed */}
        <div className="flex-1 min-w-0">
          <FeedHeader />
          <PostFeed />
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </main>
  )
}
