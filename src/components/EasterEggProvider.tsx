'use client'

import { useState } from 'react'
import { useKonamiCode } from '@/hooks/useEasterEggs'

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [konami, setKonami] = useState(false)

  useKonamiCode(() => {
    setKonami(true)
    setTimeout(() => setKonami(false), 3000)
  })

  return (
    <>
      {children}
      {konami && (
        <div className="fixed top-4 right-4 z-[100]">
          <div className="bg-black border-4 border-gold pixel-border-sm p-3 md:p-4 flex items-center gap-3 animate-slide-down">
            <span className="font-pixel text-gold text-[10px] md:text-sm">DEV MODE UNLOCKED</span>
            <span className="font-mono text-[9px] md:text-xs text-cream/70">Konami code detected</span>
          </div>
        </div>
      )}
    </>
  )
}