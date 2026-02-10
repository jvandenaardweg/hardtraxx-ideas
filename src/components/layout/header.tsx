import { Link } from '@tanstack/react-router'
import { Search, Bell, Plus, ChevronDown, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              H
            </div>
            <span className="hidden font-bold text-lg sm:inline-block">HARDTRAXX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link to="/">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>
            <Link to="/discover">
              <Button variant="ghost" size="sm">
                Discover
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="ghost" size="sm">
                Events
              </Button>
            </Link>
            <Link to="/artists">
              <Button variant="ghost" size="sm">
                Artists
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              Marketplace
            </Button>
            <Link to="/topics">
              <Button variant="ghost" size="sm">
                Topics
              </Button>
            </Link>
          </nav>
        </div>

        {/* Search */}
        <div className="hidden flex-1 max-w-md mx-4 lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tracks, artists, mixes..."
              className="h-9 w-full rounded-md border border-input bg-secondary pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Mobile search */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
          </Button>

          {/* New Post */}
          <Button size="sm" className="hidden gap-1 sm:flex">
            <Plus className="h-4 w-4" />
            New Post
          </Button>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <ChevronDown className="hidden h-3 w-3 text-muted-foreground sm:block" />
          </div>

          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
