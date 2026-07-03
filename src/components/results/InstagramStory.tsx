'use client'

import { useState, useEffect } from 'react'

const S = {
  cardW: 770,
  cardH: 84,
  sectionGap: 44,
  rowGap: 14,
  rowH: 92,
  thumbSize: 60,
  iconSize: 52,
  badgeW: 320,
  progressW: 0.75,
  btnW: 280,
}

function getGenerationLabel(era: string): string {
  const labels: Record<string, string> = {
    'PRE-WEB': 'BBS NATIVE',
    'DAWN': 'WEB PIONEER',
    'DIALUP': 'DIAL-UP SURVIVOR',
    'DIAL-UP ERA': 'DIAL-UP SURVIVOR',
    'DOTCOM': 'DOT-COM DREAMER',
    'BROADBAND': 'BROADBAND PIONEER',
    'WEB2': 'WEB 2.0 CREATOR',
    'WEB 2.0 REVOLUTION': 'WEB 2.0 CREATOR',
    'MOBILE': 'MOBILE NATIVE',
    'MOBILE AWAKENING': 'MOBILE NATIVE',
    'SOCIAL': 'SOCIAL GRAPH NATIVE',
    'SOCIAL GRAPH': 'SOCIAL GRAPH NATIVE',
    'STREAMING': 'STREAM CHILD',
    'STREAM ERA': 'STREAM CHILD',
    'ALGORITHMIC': 'ALGORITHMIC NATIVE',
    'ALGORITHMIC FEED': 'ALGORITHMIC NATIVE',
    'PANDEMIC': 'PANDEMIC DIGITAL',
    'DIGITAL EXODUS': 'PANDEMIC DIGITAL',
    'AI': 'AI NATIVE',
    'SYNTHETIC WEB': 'AI NATIVE',
  }
  return labels[era] || era
}

function Pixelsvg({ type }: { type: string }) {
  const size = 24
  const paths: Record<string, string> = {
    music: 'M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z',
    movie: 'M2 2h20v14H2V2zm1 1h18v12H3V3zm9 14h4l1 2H7l1-2h4zm-2 2h6l2 3H5l2-3z',
    phone: 'M4 2h12l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm0 4v14h14V6.828L13.172 2H6zm2 1h8v5H8V7zm0 8h8v5H8v-5zm-1-7h1v3H7V8zm9 0h1v3h-1V8z',
    monitor: 'M2 5h20v14H2V5zm2 2v10h16V7H4zm2 2h2v2H6V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zM6 13h12v2H6v-2z',
    globe: 'M12 1a11 11 0 1011 11A11 11 0 0012 1zm0 4a7 7 0 11-7 7 7 7 0 017-7zm0 3a4 4 0 104 4 4 4 0 00-4-4zm0 2a2 2 0 11-2 2 2 2 0 012-2z',
    controller: 'M12 1a11 11 0 1011 11A11 11 0 0012 1zm0 4a7 7 0 11-7 7 7 7 0 017-7zm-5 5h3v3H7v-3zm7 0h3v3h-3v-3zm-7 5h10v2H7v-2z',
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1B1B1B" strokeWidth="1.5">
      <path d={paths[type] || paths.music} />
    </svg>
  )
}

function fetchEnrichment(type: string, params: Record<string, string | number>): Promise<any> {
  const sp = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => sp.set(k, String(v)))
  return fetch(`/api/enrich/${type}?${sp.toString()}`)
    .then(async r => {
      if (!r.ok) return null
      const text = await r.text()
      if (!text) return null
      try { return JSON.parse(text) } catch { return null }
    })
    .catch(() => null)
}

export default function InstagramStory({
  birthYear,
  eraLabel,
  songTitle,
  songArtist,
  movieTitle,
  movieYear,
  gameTitle,
  phoneEra,
  os,
  internetSpeed,
  nostalgiaScore,
  siteUrl,
  onReady,
}: {
  birthYear: number
  eraLabel: string
  songTitle: string
  songArtist?: string
  movieTitle: string
  movieYear?: number
  gameTitle: string
  phoneEra: string
  os: string
  internetSpeed: string
  nostalgiaScore: number
  siteUrl: string
  onReady?: () => void
}) {
  const generation = getGenerationLabel(eraLabel)
  const [albumArt, setAlbumArt] = useState<string | null>(null)
  const [poster, setPoster] = useState<string | null>(null)
  const [mediaLoaded, setMediaLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    let loaded = 0
    const total = (songArtist ? 1 : 0) + (movieYear ? 1 : 0)

    const check = () => {
      loaded++
      if (!cancelled && loaded >= total) {
        setMediaLoaded(true)
        onReady?.()
      }
    }

    if (songArtist) {
      fetchEnrichment('music', { title: songTitle, artist: songArtist }).then(d => {
        if (cancelled) return
        if (d?.albumArtUrl) {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => { if (!cancelled) { setAlbumArt(d.albumArtUrl); check() } }
          img.onerror = () => check()
          img.src = d.albumArtUrl
        } else {
          check()
        }
      })
    }

    if (movieYear) {
      fetchEnrichment('movie', { title: movieTitle, year: movieYear }).then(d => {
        if (cancelled) return
        if (d?.posterUrl) {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => { if (!cancelled) { setPoster(d.posterUrl); check() } }
          img.onerror = () => check()
          img.src = d.posterUrl
        } else {
          check()
        }
      })
    }

    if (total === 0) { setMediaLoaded(true); onReady?.() }

    return () => { cancelled = true }
  }, [songTitle, songArtist, movieTitle, movieYear, onReady])

  const rows: { icon: string; label: string; value: string; thumb?: string | null }[] = [
    { icon: 'music', label: 'TOP SONG', value: songTitle, thumb: albumArt },
    { icon: 'movie', label: 'BIGGEST MOVIE', value: movieTitle, thumb: poster },
    { icon: 'phone', label: 'ICONIC PHONE', value: phoneEra },
    { icon: 'monitor', label: 'OPERATING SYSTEM', value: os },
    { icon: 'globe', label: 'INTERNET SPEED', value: internetSpeed },
    { icon: 'controller', label: 'POPULAR GAME', value: gameTitle },
  ]

  return (
    <div
      id="instagram-story"
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: '#C62828',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"JetBrains Mono", monospace',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Paper texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
        opacity: 0.6, pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Gradient vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.2) 100%)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Main poster card */}
      <div style={{
        width: S.cardW,
        backgroundColor: '#F7F0E2',
        border: '6px solid #1B1B1B',
        boxShadow: '16px 16px 0px 0px #1B1B1B',
        zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* ===== HEADER ===== */}
        <div style={{ width: '100%', padding: '44px 52px 0', textAlign: 'center' }}>
          <div style={{
            fontFamily: '"Press Start 2P", cursive', fontSize: 40,
            color: '#1B1B1B', letterSpacing: '0.04em', lineHeight: 1.3,
          }}>
            internetbirth
          </div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 18,
            fontStyle: 'italic', color: '#C62828', marginTop: 8,
          }}>
            Born into a different internet.
          </div>

          {/* Gold divider */}
          <div style={{
            width: '100%', height: 4, backgroundColor: '#D4A017',
            marginTop: 24, marginBottom: 0,
          }} />
        </div>

        {/* Spacer after header */}
        <div style={{ height: S.sectionGap }} />

        {/* ===== BIRTH YEAR ===== */}
        <div style={{ textAlign: 'center' }}>
          <span style={{
            fontFamily: '"Press Start 2P", cursive', fontSize: 126,
            color: '#C62828', letterSpacing: '0.06em', lineHeight: 1,
            textShadow: '6px 6px 0px rgba(0,0,0,0.1)',
          }}>
            {birthYear}
          </span>
        </div>

        {/* Generation badge — immediately below year */}
        <div style={{
          display: 'inline-block',
          backgroundColor: '#D4A017',
          border: '3px solid #1B1B1B',
          padding: '7px 28px',
          marginTop: 16,
          width: S.badgeW,
          textAlign: 'center',
        }}>
          <span style={{
            fontFamily: '"Press Start 2P", cursive', fontSize: 15,
            color: '#1B1B1B', letterSpacing: '0.08em',
          }}>
            {generation}
          </span>
        </div>

        {/* Spacer before data rows */}
        <div style={{ height: S.sectionGap }} />

        {/* ===== DATA ROWS ===== */}
        <div style={{
          width: '100%',
          padding: '0 48px',
          display: 'flex', flexDirection: 'column', gap: S.rowGap,
        }}>
          {rows.map((r, i) => {
            const isLoaded = r.thumb && mediaLoaded
            return (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  border: '2px solid #1B1B1B',
                  height: S.rowH,
                  padding: '0 16px',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.015'/%3E%3C/svg%3E")`,
                  boxShadow: '4px 4px 0px 0px #1B1B1B',
                }}
              >
                {/* Icon badge */}
                <div style={{
                  width: S.iconSize, height: S.iconSize,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #1B1B1B', backgroundColor: '#F7F0E2',
                  flexShrink: 0,
                }}>
                  <Pixelsvg type={r.icon} />
                </div>

                {/* Label */}
                <span style={{
                  fontFamily: '"Press Start 2P", cursive', fontSize: 11,
                  color: '#1B1B1B', opacity: 0.5,
                  width: 80, flexShrink: 0, letterSpacing: '0.03em',
                }}>
                  {r.label}
                </span>

                {/* Value */}
                <span style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 17,
                  color: '#1B1B1B', fontWeight: 600,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  flex: 1,
                }}>
                  {r.value}
                </span>

                {/* Thumbnail */}
                {isLoaded && (
                  <img
                    src={r.thumb!}
                    alt=""
                    crossOrigin="anonymous"
                    style={{
                      width: S.thumbSize, height: S.thumbSize,
                      objectFit: 'cover', flexShrink: 0,
                      border: '1px solid #1B1B1B',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Spacer before nostalgia section */}
        <div style={{ height: S.sectionGap }} />

        {/* ===== NOSTALGIA SCORE ===== */}
        <div style={{ textAlign: 'center', padding: '0 48px', width: '100%' }}>
          {/* Thin section divider */}
          <div style={{
            width: '100%', height: 1, backgroundColor: '#1B1B1B',
            opacity: 0.12, marginBottom: 28,
          }} />

          <div style={{
            fontFamily: '"Press Start 2P", cursive', fontSize: 16,
            color: '#1B1B1B', letterSpacing: '0.04em',
          }}>
            Internet Nostalgia Score
          </div>

          <div style={{ marginTop: 10 }}>
            <span style={{
              fontFamily: '"Press Start 2P", cursive', fontSize: 90,
              color: '#C62828', letterSpacing: '0.04em', lineHeight: 1,
              textShadow: '4px 4px 0px rgba(0,0,0,0.08)',
            }}>
              {nostalgiaScore}%
            </span>
          </div>

          {/* Progress bar */}
          <div style={{
            width: `${S.progressW * 100}%`,
            margin: '18px auto 0',
            height: 12,
            backgroundColor: '#1B1B1B',
            border: '2px solid #1B1B1B',
          }}>
            <div style={{
              width: `${nostalgiaScore}%`, height: '100%',
              backgroundColor: '#C62828',
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>

        {/* Spacer before CTA */}
        <div style={{ height: S.sectionGap }} />

        {/* ===== CTA ===== */}
        <div style={{ padding: '0 48px', width: '100%' }}>
          {/* Gold divider */}
          <div style={{
            width: '100%', height: 4, backgroundColor: '#D4A017',
            marginBottom: 28,
          }} />

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: '"Press Start 2P", cursive', fontSize: 14,
              color: '#1B1B1B', letterSpacing: '0.02em', lineHeight: 1.9,
            }}>
              Think you were born into a
              <br />
              different internet?
            </div>

            <div style={{
              display: 'inline-block',
              border: '4px solid #1B1B1B',
              backgroundColor: '#C62828',
              padding: '12px 0',
              marginTop: 16,
              width: S.btnW,
              textAlign: 'center',
              boxShadow: '6px 6px 0px 0px #1B1B1B',
            }}>
              <span style={{
                fontFamily: '"Press Start 2P", cursive', fontSize: 14,
                color: '#F7F0E2', letterSpacing: '0.06em',
              }}>
                TRY YOURS →
              </span>
            </div>

            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
              color: '#1B1B1B', opacity: 0.45,
              marginTop: 14, wordBreak: 'break-all',
            }}>
              {siteUrl}
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div style={{
          width: '100%', textAlign: 'center',
          padding: '18px 48px 40px',
          marginTop: 16,
        }}>
          <div style={{
            width: '100%', height: 1, backgroundColor: '#1B1B1B',
            opacity: 0.1, marginBottom: 16,
          }} />
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            color: '#1B1B1B', opacity: 0.35, fontStyle: 'italic',
          }}>
            Everyone was born into a different internet.
          </div>
          <div style={{
            fontFamily: '"Press Start 2P", cursive', fontSize: 8,
            color: '#1B1B1B', opacity: 0.2, marginTop: 6,
            letterSpacing: '0.03em',
          }}>
            GENERATED BY INTERNETBIRTH
          </div>
        </div>
      </div>
    </div>
  )
}
