export interface MusicEnrichment {
  albumArtUrl: string | null
  youtubeUrl: string | null
  musicBrainzUrl: string | null
  source: string | null
}

export interface MovieEnrichment {
  posterUrl: string | null
  tmdbUrl: string | null
  imdbUrl: string | null
  description: string | null
  director: string | null
  source: string | null
}

export interface GameEnrichment {
  coverUrl: string | null
  steamUrl: string | null
  wikipediaUrl: string | null
  description: string | null
  platform: string | null
  source: string | null
}

export interface WebsiteEnrichment {
  faviconUrl: string | null
  domain: string | null
}

export interface MediaEnrichment {
  imageUrl: string | null
  wikipediaUrl: string | null
  description: string | null
  source: string | null
}

export interface EnrichmentCacheEntry<T> {
  data: T
  timestamp: number
}

export async function safeJson<T>(res: Response): Promise<T | null> {
  try {
    const text = await res.text()
    if (!text) return null
    return JSON.parse(text) as T
  } catch {
    return null
  }
}
