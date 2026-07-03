'use client'
import { cn } from '@/lib/utils'

interface PixelIconProps {
  name: 'monitor' | 'hourglass' | 'floppy' | 'cd' | 'folder' | 'mouse' | 'keyboard' | 'phone' | 'controller' | 'satellite' | 'globe' | 'cursor' | 'boot' | 'certificate' | 'download' | 'share' | 'calendar'
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  className?: string
}

const paths: Record<string, string> = {
  monitor: 'M2 2h20v14H2V2zm1 1h18v12H3V3zm9 14h4l1 2H7l1-2h4zm-2 2h6l2 3H5l2-3z',
  hourglass: 'M6 2h12v4l-4 4 4 4v4H6v-4l4-4-4-4V2zm2 2v2.5l4 4 4-4V4H8zm0 12v2h8v-2l-4-4-4 4z',
  floppy: 'M4 2h12l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm0 4v14h14V6.828L13.172 2H6zm2 1h8v5H8V7zm0 8h8v5H8v-5zm-1-7h1v3H7V8zm9 0h1v3h-1V8z',
  cd: 'M12 1a11 11 0 1011 11A11 11 0 0012 1zm0 4a7 7 0 11-7 7 7 7 0 017-7zm0 3a4 4 0 104 4 4 4 0 00-4-4zm0 2a2 2 0 11-2 2 2 2 0 012-2z',
  folder: 'M2 6h8l2-2h10v14H2V6zm2 2v10h16V8H14l-2 2H4z',
  mouse: 'M6 2h12v14a4 4 0 01-4 4h-4a4 4 0 01-4-4V2zm2 2v10a2 2 0 002 2h4a2 2 0 002-2V4H8zm3 2h2v4h-2V6z',
  keyboard: 'M2 5h20v14H2V5zm2 2v10h16V7H4zm2 2h2v2H6V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zM6 13h12v2H6v-2z',
  phone: 'M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v14h8V4H8zm4 11a1 1 0 110 2 1 1 0 010-2z',
  controller: 'M12 2C6 2 2 6 2 12s4 10 10 10 10-4 10-10S18 2 12 2zm-2 6a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H6a1 1 0 110-2h1V9a1 1 0 112 0v1h1zm8 0a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1V9a1 1 0 112 0v1h1zm-2 8a3 3 0 100-6 3 3 0 000 6zm0-2a1 1 0 110-2 1 1 0 010 2zM8 14a2 2 0 100 4 2 2 0 000-4z',
  satellite: 'M7 2h10v2H7V2zm4 4h2v4h-2V6zm-6 2h4v8H5V8zm2 2v4h2v-4H7zm6-2h4v8h-4V8zm2 2v4h2v-4h-2zM4 18h16v2H4v-2z',
  globe: 'M12 1a11 11 0 1011 11A11 11 0 0012 1zm0 2a9 9 0 019 9h-4a5 5 0 00-5-5v-4zm0 0v4a5 5 0 00-5 5H3a9 9 0 019-9zM3 12h4a5 5 0 005 5v4a9 9 0 01-9-9zm10 9v-4a5 5 0 005-5h4a9 9 0 01-9 9z',
  cursor: 'M8 3l12 9-5.5.5L17 17l-2 1.5-2.5-4.5L8 19V3z',
  boot: 'M12 2l10 18H2L12 2zm0 4l-5 10h10L12 6zm-1 12h2v2h-2v-2z',
  certificate: 'M4 2h16v20H4V2zm2 2v16h12V4H6zm2 2h8v4H8V6zm0 6h8v2H8v-2zm0 4h5v2H8v-2z',
  download: 'M12 2l-4 4h3v6h2V6h3l-4-4zm-5 12h10v2H7v-2zm0 4h10v2H7v-2z',
  share: 'M12 2l-4 4h3v5h2V6h3l-4-4zM6 12h2v3h8v-3h2v5H6v-5zm0 6h12v2H6v-2z',
  calendar: 'M4 6h16v16H4V6zm2 2v12h12V8H6zm2 2h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM8 14h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM7 2h2v4H7V2zm8 0h2v4h-2V2z'
}

export function PixelIcon({ name, size = 'md', className }: PixelIconProps) {
  const sz = typeof size === 'number' ? size : { sm: 20, md: 24, lg: 32, xl: 48 }[size]
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cn('flex-shrink-0', className)}>
      <path d={paths[name]} />
    </svg>
  )
}