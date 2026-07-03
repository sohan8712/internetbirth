'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { cn } from '@/lib/utils'

interface HiddenFloppyProps {
  id: string
  note: string
  className?: string
}

export function HiddenFloppy({ id, note, className }: HiddenFloppyProps) {
  const [isFound, setIsFound] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const found = JSON.parse(sessionStorage.getItem('internetbirth_found_floppies') || '[]')
    if (found.includes(id)) setIsFound(true)
  }, [id])

  const handleClick = () => {
    if (!isFound) {
      const found = JSON.parse(sessionStorage.getItem('internetbirth_found_floppies') || '[]')
      found.push(id)
      sessionStorage.setItem('internetbirth_found_floppies', JSON.stringify(found))
      setIsFound(true)
    }
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  return (
    <>
      <div
        className={cn(
          'cursor-pointer transition-all duration-200',
          'w-6 h-6 md:w-8 md:h-8',
          hovered && 'scale-125 animate-blink',
          isFound && 'opacity-30',
          className
        )}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
        aria-label={isFound ? `Floppy disk found: ${note}` : 'Hidden floppy disk'}
        title={isFound ? note : undefined}
      >
        <PixelIcon 
          name="floppy" 
          size={hovered ? 'lg' : 'md'} 
          className={cn(
            'text-black/10 transition-all duration-200',
            hovered && 'text-gold/80 drop-shadow-[0_0_4px_#D4A017]',
            isFound && 'text-black/5'
          )}
        />
      </div>

      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="fixed bottom-8 right-8 z-[100] max-w-xs"
        >
          <div className="bg-black border-4 border-gold pixel-border paper-texture p-4 flex items-start gap-3">
            <PixelIcon name="floppy" size="md" className="text-gold flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-pixel text-[10px] text-gold mb-1">FLOPPY DISK DISCOVERED</div>
              <div className="font-mono text-sm text-cream">{note}</div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
