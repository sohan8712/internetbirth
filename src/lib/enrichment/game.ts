import { cacheGet, cacheSet, cacheKey } from './cache'
import { apiConfig } from './config'
import type { GameEnrichment } from './types'
import { safeJson } from './types'

async function searchRawg(title: string, year: number): Promise<GameEnrichment | null> {
  if (!apiConfig.rawg.hasKey) return null
  const url = `https://api.rawg.io/api/games?key=${apiConfig.rawg.key}&search=${encodeURIComponent(title)}&dates=${year}-01-01,${year}-12-31&page_size=1`
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await safeJson<any>(res)
    if (!data?.results?.length) return null
    const game = data.results[0]
    return {
      coverUrl: game.background_image || null,
      steamUrl: null,
      wikipediaUrl: null,
      description: game.description_raw || null,
      platform: game.platforms?.map((p: any) => p.platform.name).join(', ') || null,
      source: 'rawg',
    }
  } catch {
    return null
  }
}

async function searchWikipedia(title: string): Promise<GameEnrichment | null> {
  const candidates = [`${title} (video game)`, title]
  for (const candidate of candidates) {
    try {
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(candidate)}`
      const res = await fetch(url, { headers: { 'User-Agent': 'internetbirth/1.0' } })
      if (!res.ok) continue
      const data = await safeJson<{ type?: string; thumbnail?: { source: string }; content_urls?: { desktop?: { page: string } }; extract?: string }>(res)
      if (!data || data.type === 'disambiguation') continue
      return {
        coverUrl: data.thumbnail?.source || null,
        steamUrl: null,
        wikipediaUrl: data.content_urls?.desktop?.page || null,
        description: data.extract || null,
        platform: null,
        source: 'wikipedia',
      }
    } catch {
      continue
    }
  }
  return null
}

export async function enrichGame(title: string, year: number): Promise<GameEnrichment> {
  const ck = cacheKey('game', title, year)
  const cached = cacheGet<GameEnrichment>(ck)
  if (cached) return cached

  let result = await searchRawg(title, year)
  if (!result) {
    result = await searchWikipedia(title)
  }

  if (!result) {
    result = { coverUrl: null, steamUrl: null, wikipediaUrl: null, description: null, platform: null, source: null }
  }

  cacheSet(ck, result)
  return result
}
