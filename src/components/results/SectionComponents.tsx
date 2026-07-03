'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PixelCard } from '@/components/ui/PixelCard'
import { PixelIcon } from '@/components/ui/PixelIcon'

import { cn } from '@/lib/utils'

interface SectionCardProps {
  title: string
  icon?: string
  children: React.ReactNode
  className?: string
  index: number
  variant?: 'paper' | 'border' | 'flat'
}

export function SectionCard({ title, icon, children, className, index, variant = 'paper' }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className={cn('w-full', className)}
    >
      <PixelCard variant={variant} padding="lg" className="relative overflow-hidden">
        {icon && (
          <div className="absolute top-4 right-4 opacity-15">
            <PixelIcon name={icon as any} size="xl" />
          </div>
        )}
        <div className="relative z-10">
          <h2 className="font-pixel text-lg md:text-xl uppercase tracking-wider text-black mb-6 flex items-center gap-3">
            {icon && <PixelIcon name={icon as any} size="md" />}
            {title}
          </h2>
          {children}
        </div>
      </PixelCard>
    </motion.div>
  )
}

interface DataCardProps {
  label: string
  value: string | number
  icon?: string
  highlight?: boolean
}

export function DataCard({ label, value, icon, highlight }: DataCardProps) {
  return (
    <div className={cn(
      'p-4 pixel-border-sm paper-texture crt-scanlines',
      highlight && 'bg-gold/20 border-gold shadow-[4px_4px_0px_0px_#D4A017]'
    )}>
      <div className="flex items-start gap-3">
        {icon && <PixelIcon name={icon as any} size="md" className="mt-1 text-black/60" />}
        <div className="flex-1 min-w-0">
          <p className="font-pixel text-[10px] uppercase tracking-wider text-black/50">{label}</p>
          <p className={cn('font-mono text-lg md:text-xl font-medium text-black', highlight && 'text-primary-red')}>
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

interface StatCounterProps {
  label: string
  value: number
  suffix?: string
  prefix?: string
  icon?: string
  index: number
}

export function StatCounter({ label, value, suffix = '', prefix = '', icon, index }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const animateCount = () => {
      const duration = 1500
      const start = performance.now()
      const target = value
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(target * eased))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount()
          setHasAnimated(true)
        }
      },
      { threshold: 0.3 }
    )

    const el = document.getElementById(`stat-${index}`)
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [hasAnimated, index, value])

  return (
    <div id={`stat-${index}`} className="text-center p-4">
      {icon && <PixelIcon name={icon as any} size="lg" className="mx-auto mb-2 text-black/60" />}
      <div className="font-pixel text-3xl md:text-4xl lg:text-5xl text-black mb-1" style={{ fontFamily: '"Press Start 2P", cursive' }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="font-pixel text-[10px] uppercase tracking-wider text-black/50">{label}</div>
    </div>
  )
}

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'gold' | 'red' | 'green'
  size?: 'sm' | 'md'
  className?: string
}

export function Tag({ children, variant = 'default', size = 'sm', className }: TagProps) {
  const variants = {
    default: 'bg-black text-cream',
    gold: 'bg-gold text-black',
    red: 'bg-primary-red text-cream',
    green: 'bg-green-700 text-cream'
  }
  const sizes = {
    sm: 'px-2 py-1 text-[9px]',
    md: 'px-3 py-1.5 text-[11px]'
  }

  return (
    <span className={cn(
      'font-pixel uppercase tracking-wider pixel-border-sm inline-block',
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  )
}

interface FlipCardProps {
  children: React.ReactNode
  front?: React.ReactNode
  back?: React.ReactNode
  className?: string
}

export function FlipCard({ front, back, children, className }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={cn('perspective-1000 cursor-pointer', className)}
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(!flipped) }}}
      tabIndex={0}
      role="button"
      aria-label="Flip card"
      aria-pressed={flipped}
    >
      <div className={cn(
        'relative w-full h-48 md:h-56 transition-transform duration-500 transform-style-3d',
        flipped && 'rotate-y-180'
      )}>
        <div className="absolute w-full h-full backface-hidden pixel-border paper-texture crt-scanlines bg-cream p-6 flex flex-col justify-center items-center text-center">
          {front || children}
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180 pixel-border paper-texture crt-scanlines bg-cream p-6 flex flex-col justify-center items-center text-center">
          {back || children}
        </div>
      </div>
      <div className="mt-2 font-pixel text-[9px] text-black/40 text-center">CLICK TO FLIP</div>
    </div>
  )
}