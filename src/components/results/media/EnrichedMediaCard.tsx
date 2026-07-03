'use client'

import Image from 'next/image'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { Tag } from '@/components/results/SectionComponents'
import { useEnrichment } from './MediaSkeleton'

export function EnrichedMediaCard({ name, description, category, wiki, icon }: {
  name: string
  description?: string
  category?: string
  wiki?: string
  icon: string
}) {
  const { data, loading } = useEnrichment('media', { name, wiki: wiki || '' })
  const image = data?.imageUrl
  const link = data?.wikipediaUrl || `https://www.google.com/search?q=${encodeURIComponent(name)}`

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <div className="p-4 pixel-border-sm paper-texture crt-scanlines bg-cream group cursor-pointer hover:shadow-[6px_6px_0px_0px_#1B1B1B] transition-shadow h-full">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 pixel-border-sm paper-texture crt-scanlines flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
            {loading ? (
              <div className="w-full h-full bg-black/10 animate-pulse" />
            ) : image ? (
              <Image
                src={image}
                alt={name}
                width={56}
                height={56}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-200"
                unoptimized
              />
            ) : (
              <PixelIcon name={icon as any} size="md" className="text-black" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-pixel text-xs text-black mb-1 group-hover:text-primary-red transition-colors">{name}</p>
            <p className="font-mono text-xs text-black/60 line-clamp-2">{description}</p>
            {category && <Tag variant="default" size="sm" className="mt-1">{category}</Tag>}
          </div>
        </div>
      </div>
    </a>
  )
}

export function EnrichedTechCard(props: { name: string; description?: string; category?: string; wiki?: string }) {
  return <EnrichedMediaCard {...props} icon="keyboard" />
}

export function EnrichedCultureCard(props: { name: string; description?: string; category?: string; wiki?: string }) {
  return <EnrichedMediaCard {...props} icon="floppy" />
}
