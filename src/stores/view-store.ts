import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ViewMode = 'cards' | 'compact' | 'classic'
export type FeedTab = 'for-you' | 'following' | 'latest' | 'trending'

interface ViewState {
  viewMode: ViewMode
  feedTab: FeedTab
  setViewMode: (mode: ViewMode) => void
  setFeedTab: (tab: FeedTab) => void
}

export const useViewStore = create<ViewState>()(
  persist(
    (set) => ({
      viewMode: 'compact',
      feedTab: 'for-you',
      setViewMode: (mode) => set({ viewMode: mode }),
      setFeedTab: (tab) => set({ feedTab: tab }),
    }),
    {
      name: 'hardtraxx-view-preferences',
    }
  )
)
