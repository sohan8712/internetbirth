'use client'

import Image from 'next/image'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { useEnrichment, MediaSkeleton } from './MediaSkeleton'

interface EnrichedMovieCardProps {
  title: string
  year: number
}

export function EnrichedMovieCard({ title, year }: EnrichedMovieCardProps) {
  const { data, loading } = useEnrichment('movie', { title, year })
  const poster = data?.posterUrl
  const linkUrl = data?.tmdbUrl || `https://www.google.com/search?q=${encodeURIComponent(title + ' ' + year + ' movie')}`

  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block aspect-[2/3] pixel-border paper-texture crt-scanlines overflow-hidden group relative cursor-pointer"
    >
      {loading ? (
        <MediaSkeleton />
      ) : poster ? (
        <>
          <Image
            src={poster}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 33vw, 25vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/80 text-cream font-pixel text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            VIEW DETAILS →
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <PixelIcon name="monitor" size="xl" className="text-black/30" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/80 text-cream font-pixel text-xs">
        {poster ? 'TOP GROSSING' : 'VIEW DETAILS →'}
      </div>
    </a>
  )
}
