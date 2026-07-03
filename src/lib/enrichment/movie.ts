import { cacheGet, cacheSet, cacheKey } from './cache'
import { apiConfig } from './config'
import type { MovieEnrichment } from './types'
import { safeJson } from './types'

async function searchTmdb(title: string, year: number): Promise<MovieEnrichment | null> {
  if (!apiConfig.tmdb.hasKey) return null
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiConfig.tmdb.key}&query=${encodeURIComponent(title)}&year=${year}&language=en-US&page=1`
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await safeJson<any>(res)
    if (!data?.results?.length) return null
    const movie = data.results[0]
    return {
      posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      tmdbUrl: `https://www.themoviedb.org/movie/${movie.id}`,
      imdbUrl: movie.id ? `https://www.themoviedb.org/movie/${movie.id}` : null,
      description: movie.overview || null,
      director: null,
      source: 'tmdb',
    }
  } catch {
    return null
  }
}

async function searchWikipedia(title: string): Promise<MovieEnrichment | null> {
  const candidates = [`${title} (film)`, title]
  for (const candidate of candidates) {
    try {
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(candidate)}`
      const res = await fetch(url, { headers: { 'User-Agent': 'internetbirth/1.0' } })
      if (!res.ok) continue
      const data = await safeJson<{ thumbnail?: { source: string }; extract?: string }>(res)
      if (!data) continue
      return {
        posterUrl: data.thumbnail?.source || null,
        tmdbUrl: null,
        imdbUrl: null,
        description: data.extract || null,
        director: null,
        source: 'wikipedia',
      }
    } catch {
      continue
    }
  }
  return null
}

export async function enrichMovie(title: string, year: number): Promise<MovieEnrichment> {
  const ck = cacheKey('movie', title, year)
  const cached = cacheGet<MovieEnrichment>(ck)
  if (cached) return cached

  let result = await searchTmdb(title, year)
  if (!result) {
    result = await searchWikipedia(title)
  }

  if (!result) {
    result = { posterUrl: null, tmdbUrl: null, imdbUrl: null, description: null, director: null, source: null }
  }

  cacheSet(ck, result)
  return result
}
