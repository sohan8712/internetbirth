'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { PixelButton } from '@/components/ui/PixelButton'

import { 
  SectionCard, 
  DataCard, 
  StatCounter, 
  Tag 
} from '@/components/results/SectionComponents'
import { EnrichedMusicCard } from '@/components/results/media/EnrichedMusicCard'
import { EnrichedMovieCard } from '@/components/results/media/EnrichedMovieCard'
import { EnrichedGameCard } from '@/components/results/media/EnrichedGameCard'
import { EnrichedWebsiteCard } from '@/components/results/media/EnrichedWebsiteCard'
import { EnrichedTechCard, EnrichedCultureCard } from '@/components/results/media/EnrichedMediaCard'
import { EnrichedMemeCard } from '@/components/results/media/EnrichedMemeCard'
import InstagramStory from '@/components/results/InstagramStory'
import ExploreMore from '@/components/results/ExploreMore'
import { 
  calculateDigitalChildhoodProfile, 
  formatNumber 
} from '@/lib/digital-childhood'
import _snapshotsData from '@/data/snapshots.json'
import _statsData from '@/data/stats.json'
import _newsData from '@/data/news.json'
import _songsData from '@/data/songs.json'
import _moviesData from '@/data/movies.json'
import _gamesData from '@/data/games.json'
import _techData from '@/data/tech.json'
import _websitesData from '@/data/websites.json'
import _cultureData from '@/data/culture.json'
import html2canvas from 'html2canvas'

const snapshotsData = _snapshotsData as Record<string, any>
const statsData = _statsData as Record<string, any>
const newsData = _newsData as Record<string, any>
const songsData = _songsData as Record<string, any>
const moviesData = _moviesData as Record<string, any>
const gamesData = _gamesData as Record<string, any>
const techData = _techData as Record<string, any>
const websitesData = _websitesData as Record<string, any>
const cultureData = _cultureData as Record<string, any>

let storyReady = false

function findClosestYear(year: number, available: Record<string, any>): string {
  const keys = Object.keys(available).map(Number).sort((a, b) => a - b)
  if (keys.length === 0) return '2025'
  let closest = keys[0]
  for (const k of keys) {
    if (k <= year) closest = k
    else break
  }
  return closest.toString()
}

interface ResultsPageProps {
  params: Promise<{ date: string }>
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [profile, setProfile] = useState<ReturnType<typeof calculateDigitalChildhoodProfile> | null>(null)
  const [snapshot, setSnapshot] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    params.then(({ date }) => {
      const parsed = new Date(date)
      if (!isNaN(parsed.getTime())) {
        setBirthDate(parsed)
        const p = calculateDigitalChildhoodProfile(parsed)
        setProfile(p)
        setSnapshot(snapshotsData[p.era] || snapshotsData.ai)
        setStats(statsData[findClosestYear(parsed.getFullYear(), statsData)])
        setIsLoading(false)
      } else {
        notFound()
      }
    })
  }, [params])

  if (isLoading || !birthDate || !profile || !snapshot || !stats) {
    return (
      <div className="min-h-screen bg-primary-red flex items-center justify-center">
        <div className="text-center p-8">
          <PixelIcon name="hourglass" size="xl" className="mx-auto mb-4 text-black animate-blink" />
          <p className="font-pixel text-lg text-black">LOADING ARCHIVE...</p>
          <p className="font-mono text-sm text-black/50 mt-2">RESTORING YOUR INTERNET SNAPSHOT</p>
        </div>
      </div>
    )
  }

  const formattedDate = birthDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).toUpperCase()

  const year = birthDate.getFullYear()
  const song = songsData[findClosestYear(year, songsData)] || { title: 'Unknown', artist: 'Unknown', genre: 'Unknown' }
  const movie = moviesData[findClosestYear(year, moviesData)] || { title: 'Unknown', director: 'Unknown', gross: 'Unknown' }
  const games = gamesData[findClosestYear(year, gamesData)] || []
  const tech = techData[findClosestYear(year, techData)] || []
  const sites = websitesData[findClosestYear(year, websitesData)] || []
  const culture = cultureData[findClosestYear(year, cultureData)] || []
  const yearNews = newsData[findClosestYear(year, newsData)] || []
  const memeTypes = ['Meme', 'Viral Video', 'Trend', 'Challenge', 'Short Video', 'TikTok Dance', 'TikTok Trend', 'AI Video', 'AI Persona']

  const eraSnapshot = snapshot

  return (
    <div className="relative min-h-screen bg-primary-red">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.02%22/%3E%3C/svg%22')] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-red via-primary-red to-dark-red" />
        <div className="absolute inset-0 crt-scanlines" style={{ opacity: 0.03 }} />
      </div>

      <nav className="relative z-10 pixel-border-b border-black/20 bg-cream/95 backdrop-blur sticky top-0" style={{ borderBottomWidth: '2px' }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <PixelIcon name="monitor" size="md" className="text-black" />
            <span className="font-pixel text-xs uppercase tracking-wider text-black">internetbirth</span>
            <div className="w-px h-6 bg-black/30" />
            <span className="font-pixel text-[10px] text-black/50">{profile.eraLabel.toUpperCase()}</span>
            <Tag variant="gold" size="sm">{year}</Tag>
          </div>
          <div className="flex items-center gap-2">
            <PixelIcon name="calendar" size="sm" className="text-black/50" />
            <span className="font-mono text-xs text-black/60">{formattedDate}</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-16">
        {/* HERO — Internet Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 md:mb-16"
        >
          <div className="text-center mb-8">
            <PixelIcon name="folder" size="xl" className="mx-auto mb-4 text-black" />
            <h1 className="font-pixel text-3xl md:text-5xl lg:text-6xl uppercase tracking-wider text-black leading-tight mb-4">
              INTERNET SNAPSHOT
            </h1>
            <p className="font-mono text-lg md:text-xl text-black/70 max-w-2xl mx-auto leading-relaxed">
              {eraSnapshot.vibe}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DataCard label="Internet Users" value={eraSnapshot.users} icon="globe" highlight />
            <DataCard label="Websites" value={eraSnapshot.websites} icon="monitor" />
            <DataCard label="Avg Speed" value={eraSnapshot.avgSpeed} icon="hourglass" />
            <DataCard label="Top Browser" value={eraSnapshot.topBrowser} icon="mouse" />
          </div>
        </motion.div>

        {/* SECTION 1 — Biggest News */}
        <SectionCard title="Biggest News" icon="floppy" index={0}>
          <div className="space-y-3">
            {yearNews.length === 0 ? (
              <div className="p-4 pixel-border-sm paper-texture crt-scanlines bg-cream text-center">
                <p className="font-mono text-sm text-black/50 italic">No major news records for this year.</p>
              </div>
            ) : (
              yearNews.slice(0, 4).map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="p-4 pixel-border-sm paper-texture crt-scanlines bg-cream flex items-start gap-4 hover:shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow"
                >
                  <div className="w-10 h-10 pixel-border-sm paper-texture crt-scanlines flex items-center justify-center flex-shrink-0 bg-white overflow-hidden">
                    <PixelIcon name="folder" size="md" className="text-black" />
                  </div>
                  <div>
                    <p className="font-mono text-base font-medium text-black">{item.title}</p>
                    <Tag variant="default" size="sm" className="mt-1">{item.category}</Tag>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </SectionCard>

        {/* SECTION 2 — Popular Song */}
        <SectionCard title="Popular Song" icon="cd" index={1}>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="text-center">
              <EnrichedMusicCard title={song.title} artist={song.artist} genre={song.genre} />
              <Tag variant="gold" size="md" className="mb-3 inline-block">NOW PLAYING</Tag>
            </div>
            <div>
              <p className="font-pixel text-2xl md:text-3xl text-black mb-2 leading-tight">{song.title}</p>
              <p className="font-mono text-lg text-black/60 mb-4">by {song.artist}</p>
              <Tag variant="default" size="md">{song.genre}</Tag>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 3 — Movie */}
        <SectionCard title="Movie" icon="monitor" index={2}>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-1">
              <EnrichedMovieCard title={movie.title} year={year} />
            </div>
            <div className="md:col-span-2">
              <p className="font-pixel text-2xl md:text-3xl text-black mb-2 leading-tight">{movie.title}</p>
              <p className="font-mono text-lg text-black/60 mb-4">Directed by {movie.director}</p>
              <div className="flex flex-wrap gap-3 mb-4">
                <DataCard label="Box Office" value={movie.gross} icon="gold" highlight />
              </div>
              <Tag variant="default" size="md">THEATER RELEASE</Tag>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 4 — Games */}
        <SectionCard title="Games" icon="controller" index={3}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.length === 0 ? (
              <div className="col-span-full p-4 pixel-border-sm paper-texture crt-scanlines bg-cream text-center">
                <p className="font-mono text-sm text-black/50 italic">No game records for this year.</p>
              </div>
            ) : (
              games.slice(0, 5).map((game: any, i: number) => (
                <div key={i} className="h-56">
                  <EnrichedGameCard title={game.title} year={year} platform={game.platform} genre={game.genre} />
                </div>
              ))
            )}
          </div>
        </SectionCard>

        {/* SECTION 5 — Technology */}
        <SectionCard title="Technology" icon="keyboard" index={4}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tech.length === 0 ? (
              <div className="col-span-full p-4 pixel-border-sm paper-texture crt-scanlines bg-cream text-center">
                <p className="font-mono text-sm text-black/50 italic">No technology records for this era.</p>
              </div>
            ) : (
              tech.slice(0, 6).map((item: any, i: number) => (
                <EnrichedTechCard
                  key={i}
                  name={item.name}
                  description={item.description}
                  category={item.category}
                  wiki={item.wiki}
                />
              ))
            )}
          </div>
        </SectionCard>

        {/* SECTION 6 — Popular Websites */}
        <SectionCard title="Popular Websites" icon="globe" index={5}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sites.length === 0 ? (
              <div className="col-span-full p-4 pixel-border-sm paper-texture crt-scanlines bg-cream text-center">
                <p className="font-mono text-sm text-black/50 italic">No website records for this era.</p>
              </div>
            ) : (
              sites.slice(0, 8).map((site: any, i: number) => (
                <EnrichedWebsiteCard
                  key={i}
                  name={site.name}
                  category={site.category}
                  year={site.year}
                  domain={site.domain}
                />
              ))
            )}
          </div>
        </SectionCard>

        {/* SECTION 7 — Internet Culture */}
        <SectionCard title="Internet Culture" icon="cursor" index={6}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {culture.length === 0 ? (
              <div className="col-span-full p-4 pixel-border-sm paper-texture crt-scanlines bg-cream text-center">
                <p className="font-mono text-sm text-black/50 italic">No culture records for this era.</p>
              </div>
            ) : (
              culture.slice(0, 9).map((item: any, i: number) => (
                <EnrichedCultureCard
                  key={i}
                  name={item.name}
                  description={item.description}
                  category={item.type}
                  wiki={item.wiki}
                />
              ))
            )}
          </div>
        </SectionCard>

        {/* SECTION 8 — Memes */}
        <SectionCard title="Memes" icon="cursor" index={7}>
          <div className="space-y-3">
            {culture.filter((c: any) => memeTypes.includes(c.type)).length === 0 ? (
              <div className="p-4 pixel-border-sm paper-texture crt-scanlines bg-cream text-center">
                <p className="font-mono text-sm text-black/50 italic">No meme records for this year.</p>
              </div>
            ) : (
              culture.filter((c: any) => memeTypes.includes(c.type)).slice(0, 5).map((item: any, i: number) => (
                <EnrichedMemeCard
                  key={i}
                  name={item.name}
                  description={item.description}
                  wiki={item.wiki}
                />
              ))
            )}
          </div>
        </SectionCard>

        {/* SECTION 9 — Statistics */}
        <SectionCard title="Statistics" icon="floppy" index={8}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCounter label="Users" value={stats.users} suffix="+" icon="globe" index={0} />
            <StatCounter label="Websites" value={stats.websites} suffix="+" icon="monitor" index={1} />
            <StatCounter label="Emails/Day" value={Math.floor(stats.emailsPerDay / 1000000)} suffix="M" icon="folder" index={2} prefix="" />
            <StatCounter label="Searches/Day" value={Math.floor(stats.searchQueriesPerDay / 1000000)} suffix="M" icon="satellite" index={3} />
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <DataCard label="Bandwidth/User" value={stats.bandwidthPerUser} icon="hourglass" />
            <DataCard label="Mobile Users" value={formatNumber(stats.mobileUsers)} icon="phone" />
            <DataCard label="Social Users" value={formatNumber(stats.socialMediaUsers)} icon="share" />
            <DataCard label="Your Year" value={year} icon="calendar" highlight />
          </div>
        </SectionCard>

        {/* SECTION 10 — Internet Personality */}
        <SectionCard title="Internet Personality" icon="certificate" index={9}>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="text-center p-6 pixel-border paper-texture crt-scanlines bg-cream">
              <div className="text-6xl mb-4">{(() => {
                const icons: Record<string, string> = {
                  'bbs-native': '📟',
                  'web-pioneer': '🌐',
                  'dialup-survivor': '📞',
                  'dotcom-dreamer': '💫',
                  'broadband-pioneer': '⚡',
                  'web2-creator': '✨',
                  'mobile-native': '📱',
                  'social-graph': '👥',
                  'stream-child': '📺',
                  'algorithmic-native': '🤖',
                  'pandemic-digital': '🏠',
                  'ai-native': '🧠'
                }
                return icons[profile.personality.id] || '🎮'
              })()}</div>
              <h3 className="font-pixel text-2xl text-black mb-2">{profile.personality.name}</h3>
              <Tag variant="gold" size="md" className="mb-4 inline-block">{profile.personality.rarity}</Tag>
              <p className="font-mono text-sm text-black/70 leading-relaxed">{profile.personality.description}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {profile.personality.traits.map((trait: string) => (
                  <Tag key={trait} variant="default" size="sm">{trait}</Tag>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 pixel-border-sm paper-texture crt-scanlines bg-cream">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-pixel text-sm text-black">NOSTALGIA SCORE</span>
                  <span className="font-pixel text-xl text-primary-red">{profile.nostalgiaScore}%</span>
                </div>
                <div className="h-3 bg-black/10 pixel-border-sm overflow-hidden">
                  <div 
                    className="h-full bg-primary-red transition-all duration-1000 ease-out"
                    style={{ width: `${profile.nostalgiaScore}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <DataCard label="Dial-up Survivor" value={profile.badges.dialupSurvivor ? 'YES' : 'NO'} icon="hourglass" highlight={profile.badges.dialupSurvivor} />
                <DataCard label="Forum Native" value={`${profile.factors.forumEra}%`} icon="folder" highlight={profile.badges.forumNative} />
                <DataCard label="Algorithm-Free" value={`${profile.factors.preSocialMedia}%`} icon="globe" highlight={profile.badges.algorithmFreeChildhood} />
                <DataCard label="Flash Veteran" value={profile.badges.flashGameVeteran ? 'YES' : 'NO'} icon="controller" highlight={profile.badges.flashGameVeteran} />
                <DataCard label="YouTube Native" value={profile.badges.youtubeNative ? 'YES' : 'NO'} icon="monitor" />
                <DataCard label="AI Native" value={profile.badges.aiNative ? 'YES' : 'NO'} icon="satellite" />
                <DataCard label="Digital Chaos" value={`${profile.digitalChaosIndex}%`} icon="floppy" highlight />
                <DataCard label="Percentile" value={`${profile.percentile}%`} icon="certificate" highlight />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 11 — Birth Certificate */}
        <BirthCertificate 
          birthDate={birthDate} 
          profile={profile} 
          snapshot={snapshot}
          song={song}
          movie={movie}
          index={10}
        />

        {/* SECTION 12 — Explore More */}
        <ExploreMore year={year} />
      </main>

      <footer className="relative z-10 py-8 px-4 border-t-4 border-black border-t-[8px] border-t-black/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-pixel text-[10px] text-black/40 uppercase tracking-wider mb-2">
            internetbirth v1.0.0 — YOUR DIGITAL ARTIFACT
          </p>
          <p className="font-mono text-xs text-black/30">
            SHARE YOUR RESULTS. COMPARE WITH FRIENDS. REMEMBER THE INTERNET BEFORE IT REMEMBERED YOU.
          </p>
        </div>
      </footer>
    </div>
  )
}

function BirthCertificate({ 
  birthDate, 
  profile, 
  snapshot, 
  song,
  movie,
  index 
}: { 
  birthDate: Date
  profile: ReturnType<typeof calculateDigitalChildhoodProfile>
  snapshot: any
  song: any
  movie: any
  index: number
}) {
  const handleDownload = async () => {
    const element = document.getElementById('birth-certificate')
    if (element) {
      const canvasEl = await html2canvas(element, { 
        backgroundColor: '#F7F0E2',
        scale: 2,
        useCORS: true
      })
      const link = document.createElement('a')
      link.download = `internet-birth-certificate-${birthDate.getFullYear()}.png`
      link.href = canvasEl.toDataURL('image/png')
      link.click()
    }
  }

  const handleGenerateStory = async () => {
    const el = document.getElementById('instagram-story')
    if (!el) return

    let waited = 0
    while (!storyReady && waited < 10000) {
      await new Promise(r => setTimeout(r, 200))
      waited += 200
    }

    try {
      const canvas = await html2canvas(el, {
        width: 1080,
        height: 1920,
        scale: 3,
        backgroundColor: '#C62828',
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `internetbirth-story-${birthDate.getFullYear()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      // silently fail
    }
  }

  return (
    <>
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      id="birth-certificate"
      className="relative"
    >
      <SectionCard title="Internet Birth Certificate" icon="certificate" index={index} variant="flat" className="bg-cream">
        <div className="pixel-border paper-texture crt-scanlines bg-cream p-8 md:p-12 max-w-3xl mx-auto relative" style={{ borderWidth: '6px', boxShadow: '12px 12px 0px 0px #1B1B1B' }}>
          <div className="text-center mb-8 relative z-10">
            <div className="font-pixel text-[10px] text-black/50 uppercase tracking-widest mb-2">CERTIFICATE OF DIGITAL BIRTH</div>
            <div className="font-pixel text-3xl md:text-4xl text-black mb-1">INTERNET BIRTH CERTIFICATE</div>
            <div className="font-mono text-lg text-black/60">ISSUED BY THE INTERNET ARCHIVE AUTHORITY</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 relative z-10">
            <div className="p-4 pixel-border-sm paper-texture crt-scanlines">
              <div className="font-pixel text-[10px] text-black/50 uppercase tracking-wider mb-1">BIRTH DATE</div>
              <div className="font-pixel text-xl text-black">{birthDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}</div>
            </div>
            <div className="p-4 pixel-border-sm paper-texture crt-scanlines">
              <div className="font-pixel text-[10px] text-black/50 uppercase tracking-wider mb-1">INTERNET GENERATION</div>
              <div className="font-pixel text-lg text-black">{profile.eraLabel.toUpperCase()}</div>
            </div>
            <div className="p-4 pixel-border-sm paper-texture crt-scanlines">
              <div className="font-pixel text-[10px] text-black/50 uppercase tracking-wider mb-1">POPULAR SONG</div>
              <div className="font-mono text-sm text-black truncate">{song.title || 'UNKNOWN'}</div>
            </div>
            <div className="p-4 pixel-border-sm paper-texture crt-scanlines">
              <div className="font-pixel text-[10px] text-black/50 uppercase tracking-wider mb-1">MOVIE</div>
              <div className="font-mono text-sm text-black truncate">{movie.title || 'UNKNOWN'}</div>
            </div>
            <div className="p-4 pixel-border-sm paper-texture crt-scanlines">
              <div className="font-pixel text-[10px] text-black/50 uppercase tracking-wider mb-1">PHONE ERA</div>
              <div className="font-pixel text-lg text-black">{profile.badges.dialupSurvivor ? 'LANDLINE / DIAL-UP' : profile.badges.youtubeNative ? 'SMARTPHONE' : 'FEATURE PHONE'}</div>
            </div>
            <div className="p-4 pixel-border-sm paper-texture crt-scanlines">
              <div className="font-pixel text-[10px] text-black/50 uppercase tracking-wider mb-1">OPERATING SYSTEM</div>
              <div className="font-mono text-sm text-black">{snapshot.topBrowser}</div>
            </div>
            <div className="p-4 pixel-border-sm paper-texture crt-scanlines">
              <div className="font-pixel text-[10px] text-black/50 uppercase tracking-wider mb-1">INTERNET SPEED</div>
              <div className="font-pixel text-lg text-black">{snapshot.avgSpeed}</div>
            </div>
            <div className="p-4 pixel-border-sm paper-texture crt-scanlines">
              <div className="font-pixel text-[10px] text-black/50 uppercase tracking-wider mb-1">DIGITAL CHILDHOOD SCORE</div>
              <div className="font-pixel text-xl text-primary-red">{profile.nostalgiaScore}%</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <PixelButton variant="primary" size="lg" onClick={handleDownload}>
              <PixelIcon name="download" size="sm" className="mr-2" />
              DOWNLOAD CERTIFICATE
            </PixelButton>
            <PixelButton variant="secondary" size="lg" onClick={handleGenerateStory}>
              <PixelIcon name="download" size="sm" className="mr-2" />
              GENERATE STORY
            </PixelButton>
            <PixelButton variant="danger" size="lg" onClick={() => window.location.href = '/'}>
              <PixelIcon name="boot" size="sm" className="mr-2" />
              REBOOT SYSTEM
            </PixelButton>
          </div>

          <div className="mt-6 text-center">
            <p className="font-pixel text-[9px] text-black/30 uppercase tracking-wider">
              THIS CERTIFICATE IS A DIGITAL ARTIFACT. NO PERSONAL DATA STORED. FOR NOSTALGIA PURPOSES ONLY.
            </p>
            <p className="font-mono text-xs text-black/20 mt-2">
              internetbirth v1.0.0 • {new Date().getFullYear()} • GENERATED ON DEMAND
            </p>
          </div>
        </div>
      </SectionCard>
    </motion.section>

      <div style={{ position: 'fixed', left: 0, top: 0, width: 1080, height: 1920, opacity: 0, pointerEvents: 'none', zIndex: -9999, overflow: 'hidden' }}>
        <InstagramStory
          birthYear={birthDate.getFullYear()}
          eraLabel={profile.eraLabel.toUpperCase()}
          songTitle={song.title || 'UNKNOWN'}
          songArtist={song.artist || ''}
          movieTitle={movie.title || 'UNKNOWN'}
          movieYear={birthDate.getFullYear()}
          gameTitle={(() => { const g = gamesData[findClosestYear(birthDate.getFullYear(), gamesData)]; return g?.[0]?.title || 'UNKNOWN' })()}
          phoneEra={profile.badges.dialupSurvivor ? 'LANDLINE / DIAL-UP' : profile.badges.youtubeNative ? 'SMARTPHONE' : 'FEATURE PHONE'}
          os={snapshot.topBrowser}
          internetSpeed={snapshot.avgSpeed}
          nostalgiaScore={profile.nostalgiaScore}
          siteUrl={typeof window !== 'undefined' ? window.location.origin : ''}
          onReady={() => { storyReady = true }}
        />
      </div>
    </>
  )
}
