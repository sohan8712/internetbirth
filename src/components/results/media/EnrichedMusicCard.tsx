'use client'

import Image from 'next/image'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { useEnrichment, MediaSkeleton } from './MediaSkeleton'

interface EnrichedMusicCardProps {
  title: string
  artist: string
  genre?: string
}

export function EnrichedMusicCard({ title, artist }: EnrichedMusicCardProps) {
  const { data, loading } = useEnrichment('music', { title, artist })
  const albumArt = data?.albumArtUrl

  return (
    <a
      href={data?.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(artist + ' ' + title)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 pixel-border paper-texture crt-scanlines overflow-hidden cursor-pointer">
        {loading ? (
          <MediaSkeleton />
        ) : albumArt ? (
          <>
            <Image
              src={albumArt}
              alt={`${title} by ${artist}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 192px, 256px"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-cream font-pixel text-xs px-4 py-2 pixel-border-sm">
                ▶ CLICK TO PLAY
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold/30 to-primary-red/30 flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22none%22 stroke=%22%231B1B1B%22 strokeWidth=%222%22 strokeDasharray=%2210 5%22/%3E%3C/svg%22')] opacity-20 animate-spin" />
            <PixelIcon name="cd" size="xl" className="relative z-10 text-black/40" />
          </div>
        )}
      </div>
    </a>
  )
}
