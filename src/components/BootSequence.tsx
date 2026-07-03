'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PixelIcon } from './ui/PixelIcon'
import { cn } from '@/lib/utils'

const defaultLines = [
  'INITIALIZING SYSTEM...',
  'LOADING ARCHIVE...',
  'SEARCHING HISTORICAL RECORDS...',
  'RESTORING INTERNET SNAPSHOT...',
  'CALIBRATING TIMELINE...',
  'BOOT COMPLETE.',
  'WELCOME BACK.',
]

export function BootSequence({ onComplete, duration = 2800, lines = defaultLines }: {
  onComplete: () => void
  duration?: number
  lines?: string[]
}) {
  const [currentLine, setCurrentLine] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const ci = setInterval(() => setShowCursor(prev => !prev), 530)
    return () => clearInterval(ci)
  }, [])

  useEffect(() => {
    if (currentLine >= lines.length) return
    const t = setTimeout(() => {
      if (currentLine < lines.length - 1) setCurrentLine(prev => prev + 1)
      else setTimeout(() => onComplete(), 600)
    }, duration / lines.length)
    return () => clearTimeout(t)
  }, [currentLine, lines.length, duration, onComplete])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black font-pixel" style={{ fontSize: 'clamp(14px, 3vw, 24px)' }} role="status">
      <div className="flex flex-col items-start gap-3 px-8 py-12 max-w-[90vw]">
        <AnimatePresence mode="wait">
          {lines.slice(0, currentLine + 1).map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="flex items-center gap-3 whitespace-nowrap">
              <span className="text-gold">&gt;</span>
              <span className={cn('text-cream', i === currentLine && 'animate-typewriter')}>
                {line}
                {i === currentLine && showCursor && <span className="ml-1 animate-blink text-gold">_</span>}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {currentLine === lines.length - 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex items-center gap-4 text-gold">
            <PixelIcon name="boot" size="lg" className="animate-blink" />
            <span className="uppercase tracking-widest">SYSTEM READY</span>
          </motion.div>
        )}
      </div>
      <div className="fixed inset-0 pointer-events-none z-10 bg-gradient-to-b from-transparent via-black/10 to-black/20" />
      <div className="fixed inset-0 pointer-events-none z-20 crt-scanlines" style={{ opacity: 0.08 }} />
    </div>
  )
}