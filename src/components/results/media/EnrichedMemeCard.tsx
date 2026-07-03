'use client'

import Image from 'next/image'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { Tag } from '@/components/results/SectionComponents'
import { useEnrichment } from './MediaSkeleton'

export function EnrichedMemeCard({ name, description, wiki }: {
  name: string
  description?: string
  wiki?: string
}) {
  const { data, loading } = useEnrichment('media', { name, wiki: wiki || '' })
  const image = data?.imageUrl
  const link = data?.wikipediaUrl || `https://www.google.com/search?q=${encodeURIComponent(name + ' meme')}`

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="p-4 pixel-border-sm paper-texture crt-scanlines bg-cream flex items-center gap-4 group cursor-pointer hover:shadow-[6px_6px_0px_0px_#1B1B1B] transition-shadow">
        <div className="w-16 h-16 pixel-border paper-texture crt-scanlines flex items-center justify-center flex-shrink-0 bg-gold/20 overflow-hidden">
          {loading ? (
            <div className="w-full h-full bg-black/10 animate-pulse" />
          ) : image ? (
            <Image
              src={image}
              alt={name}
              width={64}
              height={64}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-200"
              unoptimized
            />
          ) : (
            <PixelIcon name="cursor" size="md" className="text-black" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-pixel text-base text-black group-hover:text-primary-red transition-colors">{name}</p>
          <p className="font-mono text-sm text-black/60 line-clamp-2">{description}</p>
        </div>
        <Tag variant="red" size="sm" className="ml-auto flex-shrink-0">VIRAL</Tag>
      </div>
    </a>
  )
}
