/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { MiniPlayer } from '@/components/player/mini-player'
import '@/styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Hardtraxx - Hard Dance Music Community' },
      { name: 'description', content: 'The best place to discover, organize, and discuss hard dance music. Hardstyle, hardcore, frenchcore and more.' },
      { name: 'theme-color', content: '#0d0d0d' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <div className="min-h-screen pb-20">
        <Header />
        <Outlet />
      </div>
      <MiniPlayer />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
