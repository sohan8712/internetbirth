import type { Metadata, Viewport } from 'next'
import './globals.css'
import { EasterEggProvider } from '@/components/EasterEggProvider'

export const metadata: Metadata = {
  title: 'internetbirth — Born into a different internet',
  description: 'Discover the internet you were born into. A digital artifact from the early web.',
  keywords: ['internet history', 'nostalgia', 'digital archive', 'retro web', 'internet birthday'],
  authors: [{ name: 'internetbirth' }],
  openGraph: { title: 'internetbirth — Born into a different internet', description: 'Discover the internet you were born into.', type: 'website' },
}

export const viewport: Viewport = { themeColor: '#C62828', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-primary-red font-mono antialiased">
        <div className="relative min-h-screen">
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 crt-scanlines opacity-[0.02]" />
          </div>
          <EasterEggProvider>{children}</EasterEggProvider>
        </div>
      </body>
    </html>
  )
}