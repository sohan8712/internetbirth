export const apiConfig = {
  tmdb: {
    key: process.env.NEXT_PUBLIC_TMDB_API_KEY || '',
    get hasKey() { return this.key.length > 0 },
  },
  rawg: {
    key: process.env.NEXT_PUBLIC_RAWG_API_KEY || '',
    get hasKey() { return this.key.length > 0 },
  },
  youtube: {
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '',
    get hasKey() { return this.key.length > 0 },
  },
  lastfm: {
    key: process.env.NEXT_PUBLIC_LASTFM_API_KEY || '',
    get hasKey() { return this.key.length > 0 },
  },
}
