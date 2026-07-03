'use client'

import Image from 'next/image'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { Tag } from '@/components/results/SectionComponents'

export function EnrichedWebsiteCard({ name, category, year, domain }: {
  name: string
  category?: string
  year?: number
  domain?: string
}) {
  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null
  const href = domain ? `https://${domain}` : `https://www.google.com/search?q=${encodeURIComponent(name)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <div className="p-4 pixel-border-sm paper-texture crt-scanlines bg-cream group hover:shadow-[6px_6px_0px_0px_#1B1B1B] transition-shadow cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 pixel-border paper-texture crt-scanlines flex items-center justify-center flex-shrink-0 group-hover:rotate-3 transition-transform bg-white overflow-hidden">
            {faviconUrl ? (
              <Image
                src={faviconUrl}
                alt={name}
                width={32}
                height={32}
                className="object-contain"
                unoptimized
              />
            ) : (
              <PixelIcon name="monitor" size="md" className="text-black" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-pixel text-sm text-black mb-1 group-hover:text-primary-red transition-colors">{name}</p>
            <p className="font-mono text-xs text-black/60 mb-2 line-clamp-2">
              {name}{year ? ` (${year})` : ''}
            </p>
            <div className="flex items-center gap-2">
              {category && <Tag variant="default" size="sm">{category}</Tag>}
              {year && <Tag variant="gold" size="sm">{year}</Tag>}
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}
