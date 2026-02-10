import { LayoutGrid, List, TableProperties } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useViewStore, type ViewMode, type FeedTab } from '@/stores/view-store'

export function FeedHeader() {
  const { viewMode, feedTab, setViewMode, setFeedTab } = useViewStore()

  return (
    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Feed Tabs */}
      <Tabs value={feedTab} onValueChange={(v) => setFeedTab(v as FeedTab)}>
        <TabsList className="bg-secondary">
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">View:</span>
        <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as ViewMode)} size="sm">
          <ToggleGroupItem value="cards" aria-label="Cards view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="compact" aria-label="Compact view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="classic" aria-label="Classic view">
            <TableProperties className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
