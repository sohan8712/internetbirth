const TTL = 1000 * 60 * 60 * 24 // 24 hours

const store = new Map<string, { data: unknown; ts: number }>()

export function cacheGet<T>(key: string): T | null {
  const entry = store.get(key)
  if (!entry) return null
  if (Date.now() - entry.ts > TTL) {
    store.delete(key)
    return null
  }
  return entry.data as T
}

export function cacheSet<T>(key: string, data: T): void {
  store.set(key, { data, ts: Date.now() })
}

export function cacheKey(...parts: (string | number)[]): string {
  return parts.join(':')
}
