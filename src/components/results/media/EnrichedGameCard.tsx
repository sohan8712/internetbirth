'use client'

import Image from 'next/image'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { Tag } from '@/components/results/SectionComponents'
import { useEnrichment, MediaSkeleton } from './MediaSkeleton'

interface EnrichedGameCardProps {
  title: string
  year: number
  platform?: string
  genre?: string
}

export function EnrichedGameCard({ title, year, platform, genre }: EnrichedGameCardProps) {
  const { data, loading } = useEnrichment('game', { title, year })
  const cover = data?.coverUrl
  const linkUrl = data?.wikipediaUrl || data?.steamUrl || `https://www.google.com/search?q=${encodeURIComponent(title + ' game')}`

  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-full"
    >
      <div className="w-full h-48 md:h-56 pixel-border paper-texture crt-scanlines overflow-hidden relative group cursor-pointer">
        {loading ? (
          <MediaSkeleton />
        ) : cover ? (
          <>
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <p className="font-pixel text-xs text-cream">{title}</p>
              {platform && <Tag variant="default" size="sm" className="mt-1">{platform}</Tag>}
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-cream flex flex-col items-center justify-center p-4 text-center">
            <PixelIcon name="controller" size="xl" className="mb-3 text-black/40" />
            <p className="font-pixel text-sm text-black mb-1">{title}</p>
            {platform && <Tag variant="default" size="sm">{platform}</Tag>}
            {genre && <Tag variant="gold" size="sm" className="mt-1">{genre}</Tag>}
          </div>
        )}
      </div>
    </a>
  )
}
