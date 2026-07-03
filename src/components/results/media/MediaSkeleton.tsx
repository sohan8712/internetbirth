'use client'

import { useState, useEffect } from 'react'

export function MediaSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-black/10 pixel-border-sm" style={{ width: '100%', paddingBottom: '100%' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/10" />
      </div>
    </div>
  )
}

export function MediaFallback({ label }: { label: string }) {
  return (
    <div className="w-full h-full pixel-border-sm paper-texture crt-scanlines bg-cream flex items-center justify-center p-4 text-center">
      <div>
        <p className="font-pixel text-[10px] text-black/40 mb-1 uppercase tracking-wider">NO MEDIA FOUND</p>
        <p className="font-mono text-xs text-black/50">{label}</p>
      </div>
    </div>
  )
}

export function useEnrichment(type: string, params: Record<string, string | number>) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const paramsKey = JSON.stringify(params)

  useEffect(() => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => searchParams.set(k, String(v)))
    let cancelled = false

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    setLoading(true)
    fetch(`/api/enrich/${type}?${searchParams.toString()}`, { signal: controller.signal })
      .then(async r => {
        if (!r.ok) return null
        const text = await r.text()
        if (!text) return null
        try { return JSON.parse(text) } catch { return null }
      })
      .then(d => { if (!cancelled) { setData(d); setLoading(false) } })
      .catch(() => { if (!cancelled) { setData(null); setLoading(false) } })

    return () => { cancelled = true; controller.abort(); clearTimeout(timeoutId) }
  }, [type, paramsKey])

  return { data, loading }
}
