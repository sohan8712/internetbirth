import { cacheGet, cacheSet, cacheKey } from './cache'
import type { MediaEnrichment } from './types'
import { safeJson } from './types'

async function searchWikipediaPage(query: string): Promise<MediaEnrichment | null> {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'internetbirth/1.0' } })
    if (!res.ok) return null
    const data = await safeJson<{ type?: string; thumbnail?: { source: string }; content_urls?: { desktop?: { page: string } }; extract?: string }>(res)
    if (!data || data.type === 'disambiguation') return null
    return {
      imageUrl: data.thumbnail?.source || null,
      wikipediaUrl: data.content_urls?.desktop?.page || null,
      description: data.extract || null,
      source: 'wikipedia',
    }
  } catch {
    return null
  }
}

async function searchWikipedia(query: string): Promise<MediaEnrichment | null> {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=1`
  try {
    const res = await fetch(searchUrl, { headers: { 'User-Agent': 'internetbirth/1.0' } })
    if (!res.ok) return null
    const data = await safeJson<{ query?: { search?: { title: string }[] } }>(res)
    if (!data?.query?.search?.length) return null
    const title = data.query.search[0].title
    return searchWikipediaPage(title)
  } catch {
    return null
  }
}

export async function enrichMedia(name: string, wiki?: string): Promise<MediaEnrichment> {
  const ck = cacheKey('media', wiki || name)
  const cached = cacheGet<MediaEnrichment>(ck)
  if (cached) return cached

  let result: MediaEnrichment | null = null

  if (wiki) {
    result = await searchWikipediaPage(wiki)
  }
  if (!result) {
    result = await searchWikipedia(name)
  }

  if (!result) {
    result = { imageUrl: null, wikipediaUrl: null, description: null, source: null }
  }

  cacheSet(ck, result)
  return result
}
