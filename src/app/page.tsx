'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { DatePicker } from '@/components/DatePicker'
import { BootSequence } from '@/components/BootSequence'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { PixelCard } from '@/components/ui/PixelCard'

export default function LandingPage() {
  const router = useRouter()
  const [isBooting, setIsBooting] = useState(false)
  const [bootDate, setBootDate] = useState<Date | null>(null)
  const [showHint, setShowHint] = useState(true)

  const handleBoot = (date: Date) => {
    setBootDate(date)
    setIsBooting(true)
  }

  useEffect(() => {
    if (isBooting && bootDate) {
      const t = setTimeout(() => router.push(`/result/${bootDate.toISOString().split('T')[0]}`), 3000)
      return () => clearTimeout(t)
    }
  }, [isBooting, bootDate, router])

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 8000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-red via-primary-red to-dark-red" />
        <div className="absolute inset-0 crt-scanlines opacity-[0.03]" />
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center gap-3 md:gap-4 mb-4 md:mb-8">
            <PixelIcon name="monitor" size="xl" className="text-black" />
            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="font-pixel text-3xl md:text-5xl lg:text-7xl uppercase tracking-wider text-black leading-tight">
              internetbirth
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-mono text-base md:text-lg lg:text-xl text-black/70 max-w-xl mx-auto leading-relaxed">
            Born into a different internet.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-4 md:mt-6 text-black/50">
            <PixelIcon name="floppy" size="sm" />
            <span className="font-pixel text-[9px] md:text-xs uppercase">Your first day online.</span>
            <PixelIcon name="cd" size="sm" />
            <span className="font-pixel text-[9px] md:text-xs uppercase">Before feeds.</span>
            <PixelIcon name="hourglass" size="sm" />
            <span className="font-pixel text-[9px] md:text-xs uppercase">Before algorithms.</span>
            <PixelIcon name="globe" size="sm" />
            <span className="font-pixel text-[9px] md:text-xs uppercase">Before infinite scrolling.</span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full max-w-md mx-auto mt-8 md:mt-16">
          <PixelCard variant="paper" padding="lg" className="relative overflow-hidden">
            <div className="absolute top-3 right-3 opacity-20"><PixelIcon name="folder" size="lg" /></div>
            <DatePicker onSubmit={handleBoot} isLoading={isBooting} />
          </PixelCard>
          {showHint && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 md:mt-6 text-center font-pixel text-[9px] md:text-[10px] text-black/40 animate-blink">PRESS BOOT SYSTEM TO BEGIN</motion.p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8 md:mt-16 flex items-center justify-center gap-3 md:gap-8 opacity-60">
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <PixelIcon name="monitor" size="md" className="text-black" />
            <span className="font-pixel text-[8px] md:text-[10px] text-black/50">CRT DISPLAY</span>
          </div>
          <div className="w-px h-6 md:h-8 bg-black/30" />
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <PixelIcon name="floppy" size="md" className="text-black" />
            <span className="font-pixel text-[8px] md:text-[10px] text-black/50">1.44MB</span>
          </div>
          <div className="w-px h-6 md:h-8 bg-black/30" />
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <PixelIcon name="cd" size="md" className="text-black" />
            <span className="font-pixel text-[8px] md:text-[10px] text-black/50">650MB</span>
          </div>
          <div className="w-px h-6 md:h-8 bg-black/30" />
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <PixelIcon name="hourglass" size="md" className="text-black" />
            <span className="font-pixel text-[8px] md:text-[10px] text-black/50">WAITING...</span>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 py-6 md:py-8 px-4 border-t-4 border-black/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-pixel text-[9px] md:text-[10px] text-black/40 uppercase tracking-wider mb-1 md:mb-2">internetbirth v1.0.0 — DIGITAL ARTIFACT RESTORATION PROJECT</p>
          <p className="font-mono text-[10px] md:text-xs text-black/30 mb-2 md:mb-4">NO TELEMETRY. NO COOKIES. NO ACCOUNTS. PURE NOSTALGIA.</p>
          <div className="flex items-center justify-center gap-2 md:gap-4 text-black/30">
            <PixelIcon name="mouse" size="sm" />
            <span className="font-mono text-[10px] md:text-xs">DESIGNED FOR MOUSE & KEYBOARD</span>
            <PixelIcon name="keyboard" size="sm" />
            <span className="font-mono text-[10px] md:text-xs hidden md:inline">BEST VIEWED ON DESKTOP</span>
            <PixelIcon name="monitor" size="sm" />
          </div>
        </div>
      </footer>

      {isBooting && bootDate && <BootSequence onComplete={() => {}} duration={2800} />}
    </div>
  )
}