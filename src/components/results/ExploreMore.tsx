'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { SectionCard } from '@/components/results/SectionComponents'

interface RabbitHole {
  id: string
  title: string
  description: string
  icon: string
  query: string
  href: string
}

const RABBIT_HOLES: RabbitHole[] = [
  {
    id: 'google',
    title: 'What Google Looked Like',
    description: 'See the Google homepage from the year you were born — before the doodles, before AI, when it was just a logo and a box.',
    icon: 'globe',
    query: 'Google homepage history',
    href: 'https://web.archive.org/web/19980000000000*/google.com',
  },
  {
    id: 'youtube',
    title: 'First YouTube Homepage',
    description: 'YouTube launched in 2005. The first video "Me at the zoo" started it all. Find out what was trending your year.',
    icon: 'monitor',
    query: 'YouTube history',
    href: 'https://en.wikipedia.org/wiki/History_of_YouTube',
  },
  {
    id: 'reddit',
    title: 'First Reddit Homepage',
    description: 'Reddit launched in 2005. Before memes, before AMAs, it was just links and comments. What was on the front page?',
    icon: 'folder',
    query: 'Reddit history',
    href: 'https://en.wikipedia.org/wiki/History_of_Reddit',
  },
  {
    id: 'popular-video',
    title: 'Most Watched YouTube Video',
    description: 'The #1 most-watched YouTube video changes every year. From "Charlie Bit My Finger" to "Baby Shark" to your birth year.',
    icon: 'floppy',
    query: 'List of most-viewed YouTube videos',
    href: 'https://en.wikipedia.org/wiki/List_of_most-viewed_YouTube_videos',
  },
  {
    id: 'most-visited',
    title: 'Most Visited Websites',
    description: 'The top websites of the year. From AOL to Google to TikTok — the internet throne changes fast.',
    icon: 'globe',
    query: 'List of most visited websites',
    href: 'https://en.wikipedia.org/wiki/List_of_most-visited_websites',
  },
  {
    id: 'windows-wallpaper',
    title: 'Windows Wallpaper of the Year',
    description: 'Every Windows version had that one wallpaper everyone saw: Bliss (XP), the Windows 95 flag, the Windows 98 clouds.',
    icon: 'monitor',
    query: 'List of Microsoft Windows versions',
    href: 'https://en.wikipedia.org/wiki/Microsoft_Windows_version_history',
  },
  {
    id: 'browser-wars',
    title: 'Browser Market Share',
    description: 'Netscape vs IE. Firefox vs Chrome. The browser wars shaped how we experience the web. Who won your year?',
    icon: 'mouse',
    query: 'Browser wars',
    href: 'https://en.wikipedia.org/wiki/Browser_wars',
  },
  {
    id: 'mobile-phones',
    title: 'Mobile Phone of the Year',
    description: 'From the Nokia 3310 to the iPhone to foldables — the phone in your pocket defined your internet experience.',
    icon: 'satellite',
    query: 'History of mobile phones',
    href: 'https://en.wikipedia.org/wiki/History_of_mobile_phones',
  },
  {
    id: 'internet-slang',
    title: 'Internet Slang of the Year',
    description: 'LOL, ROFL, pwned, yeet, sus, rizz. Every generation had its own language. What did people say the year you were born?',
    icon: 'cursor',
    query: 'Internet slang',
    href: 'https://en.wikipedia.org/wiki/Internet_slang',
  },
  {
    id: 'flash-games',
    title: 'Flash Games Everyone Played',
    description: 'Before Steam, before mobile games, there was Flash. Stick figures, upgraded penguins, and hours of browser-based fun.',
    icon: 'controller',
    query: 'Flash games',
    href: 'https://en.wikipedia.org/wiki/Browser_game',
  },
  {
    id: 'search-trends',
    title: 'Top Search Trends',
    description: 'What the world was searching for. News, celebrities, disasters, discoveries — Google Trends captured the collective curiosity.',
    icon: 'hourglass',
    query: 'Google Trends',
    href: 'https://trends.google.com/trends/',
  },
  {
    id: 'online-communities',
    title: 'Where Everyone Hung Out Online',
    description: 'AOL chat rooms, GeoCities neighborhoods, MySpace Top 8, Facebook groups, Discord servers. The hangout spots changed every era.',
    icon: 'share',
    query: 'History of online communities',
    href: 'https://en.wikipedia.org/wiki/History_of_social_network_services',
  },
  {
    id: 'viral-moments',
    title: 'Viral Internet Moments',
    description: 'The dancing baby, Numa Numa, Chocolate Rain, Gangnam Style, Ice Bucket Challenge. The internet came together for these.',
    icon: 'cursor',
    query: 'List of Internet phenomena',
    href: 'https://en.wikipedia.org/wiki/List_of_Internet_phenomena',
  },
  {
    id: 'most-downloaded',
    title: 'Most Downloaded Song',
    description: 'Napster, LimeWire, iTunes, Spotify. The most-downloaded song of your birth year was the soundtrack of the internet.',
    icon: 'cd',
    query: 'List of best-selling singles',
    href: 'https://en.wikipedia.org/wiki/List_of_best-selling_singles',
  },
  {
    id: 'popular-game',
    title: 'The Game Everyone Was Playing',
    description: 'Myst, Doom, The Sims, World of Warcraft, Minecraft, Fortnite. Every era had that one game everyone talked about.',
    icon: 'controller',
    query: 'List of best-selling video games',
    href: 'https://en.wikipedia.org/wiki/List_of_best-selling_video_games',
  },
]

function RabbitHoleCard({ hole, index }: { hole: RabbitHole; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const [info, setInfo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    if (!expanded && !info) {
      setLoading(true)
      try {
        const encoded = encodeURIComponent(hole.query)
        const res = await fetch(`/api/enrich/media?name=${encoded}`)
        const data = await res.json()
        setInfo(data?.description || null)
      } catch {
        setInfo(null)
      }
      setLoading(false)
    }
    setExpanded(!expanded)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.03 }}
    >
      <div
        onClick={handleToggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleToggle() }}}
        tabIndex={0}
        role="button"
        aria-expanded={expanded}
        className="p-4 pixel-border-sm paper-texture crt-scanlines bg-cream cursor-pointer hover:shadow-[6px_6px_0px_0px_#1B1B1B] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 pixel-border-sm paper-texture crt-scanlines flex items-center justify-center flex-shrink-0">
            <PixelIcon name={hole.icon as any} size="md" className="text-black" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-pixel text-sm text-black">{hole.title}</p>
            <p className="font-mono text-xs text-black/60 mt-1 line-clamp-2">{hole.description}</p>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <PixelIcon name="calendar" size="sm" className="text-black/40" />
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t-2 border-black/10">
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-3 bg-black/10 animate-pulse rounded w-full" />
                    <div className="h-3 bg-black/10 animate-pulse rounded w-3/4" />
                    <div className="h-3 bg-black/10 animate-pulse rounded w-1/2" />
                  </div>
                ) : info ? (
                  <p className="font-mono text-xs text-black/70 leading-relaxed mb-3">{info.slice(0, 300)}...</p>
                ) : (
                  <p className="font-mono text-xs text-black/50 italic mb-3">Dive into the history of this internet artifact.</p>
                )}
                <a
                  href={hole.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-pixel text-[10px] text-primary-red hover:text-black transition-colors uppercase tracking-wider"
                  onClick={(e) => e.stopPropagation()}
                >
                  EXPLORE FURTHER →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function ExploreMore({ year }: { year: number }) {
  return (
    <SectionCard title="Explore More" icon="cursor" index={11}>
      <div className="p-4 mb-6 pixel-border-sm paper-texture crt-scanlines bg-gold/10 border-gold">
        <p className="font-pixel text-sm text-black text-center">
          YOUR INTERNET TIME CAPSULE. KEEP EXPLORING → BIRTH YEAR: {year}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {RABBIT_HOLES.map((hole, i) => (
          <RabbitHoleCard key={hole.id} hole={hole} index={i} />
        ))}
      </div>
    </SectionCard>
  )
}
