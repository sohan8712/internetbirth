import { cacheGet, cacheSet, cacheKey } from './cache'
import { apiConfig } from './config'
import type { MusicEnrichment } from './types'
import { safeJson } from './types'

async function searchMusicBrainz(title: string, artist: string): Promise<{ releaseMbid: string } | null> {
  const url = `https://musicbrainz.org/ws/2/recording/?query=artist:${encodeURIComponent(artist)}+AND+recording:${encodeURIComponent(title)}&fmt=json&limit=3`
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'internetbirth/1.0 ( nostalgia@internetbirth.app )' } })
    if (!res.ok) return null
    const data = await safeJson<any>(res)
    if (!data?.recordings?.length) return null
    const recording = data.recordings[0]
    if (recording.releases?.length) {
      return { releaseMbid: recording.releases[0].id }
    }
    return null
  } catch {
    return null
  }
}

async function getCoverArt(releaseMbid: string): Promise<string | null> {
  const url = `https://coverartarchive.org/release/${releaseMbid}/front-250`
  try {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) return null
    return res.url
  } catch {
    return null
  }
}

async function searchYouTube(title: string, artist: string): Promise<string | null> {
  if (!apiConfig.youtube.hasKey) return null
  const query = `${artist} - ${title} official video`
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${apiConfig.youtube.key}`
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await safeJson<any>(res)
    if (!data?.items?.length) return null
    return `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`
  } catch {
    return null
  }
}

export async function enrichMusic(title: string, artist: string): Promise<MusicEnrichment> {
  const ck = cacheKey('music', title, artist)
  const cached = cacheGet<MusicEnrichment>(ck)
  if (cached) return cached

  let albumArtUrl: string | null = null
  let youtubeUrl: string | null = null
  let musicBrainzUrl: string | null = null
  let source: string | null = null

  const mb = await searchMusicBrainz(title, artist)
  if (mb) {
    musicBrainzUrl = `https://musicbrainz.org/recording/${mb.releaseMbid}`
    albumArtUrl = await getCoverArt(mb.releaseMbid)
    if (albumArtUrl) source = 'coverartarchive'
  }

  youtubeUrl = await searchYouTube(title, artist)
  if (youtubeUrl && !source) source = 'youtube'

  const result: MusicEnrichment = { albumArtUrl, youtubeUrl, musicBrainzUrl, source }
  cacheSet(ck, result)
  return result
}
