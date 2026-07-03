'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PixelButton } from './ui/PixelButton'
import { PixelInput } from './ui/PixelInput'
import { PixelIcon } from './ui/PixelIcon'
import { cn } from '@/lib/utils'

export function DatePicker({ onSubmit, isLoading }: { onSubmit: (date: Date) => void; isLoading?: boolean }) {
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)
  const [calMonth, setCalMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const ref = useRef<HTMLFormElement>(null)
  const calRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && calRef.current && !calRef.current.contains(e.target as Node))
        setShowCalendar(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const daysInMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 0).getDate()
  const firstDay = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1).getDay()

  const handleDateSelect = (day: number) => {
    const d = new Date(calMonth.getFullYear(), calMonth.getMonth(), day)
    setDate(d.toISOString().split('T')[0])
    setSelectedDay(day)
    setError('')
    setShowCalendar(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) { setError('PLEASE ENTER A BIRTH DATE'); return }
    const parsed = new Date(date)
    if (isNaN(parsed.getTime())) { setError('INVALID DATE. USE YYYY-MM-DD'); return }
    if (parsed > new Date()) { setError('YOU ARE NOT BORN YET.'); return }
    onSubmit(parsed)
  }

  const prevMonth = () => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1))
  const nextMonth = () => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1))

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto" ref={ref}>
      <div className="relative">
        <PixelInput type="date" value={date} onChange={e => { setDate(e.target.value); setError('') }} onFocus={() => setShowCalendar(true)} label="BIRTH DATE" error={error} helperText="THE INTERNET YOU WERE BORN INTO" className="pr-16" />
        <button type="button" onClick={() => setShowCalendar(!showCalendar)} className="absolute right-3 md:right-4 top-[34px] md:top-[38px] p-1.5 md:p-2 bg-cream border-2 border-black hover:bg-white hover:shadow-[3px_3px_0px_0px_#1B1B1B] shadow-[2px_2px_0px_0px_#1B1B1B] transition-all duration-50 active:translate-x-[1px] active:translate-y-[1px]" aria-label="Toggle calendar">
          <PixelIcon name={showCalendar ? 'cursor' : 'calendar'} size="sm" />
        </button>
      </div>

      {showCalendar && (
        <motion.div ref={calRef} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative z-50 mt-2 pixel-border paper-texture bg-cream p-3 md:p-4" role="dialog">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <PixelButton type="button" variant="secondary" size="sm" onClick={prevMonth} className="text-[8px]">
              <PixelIcon name="cursor" size={12} className="rotate-180" />
            </PixelButton>
            <span className="font-pixel text-[10px] md:text-xs text-black">
              {calMonth.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase()}
            </span>
            <PixelButton type="button" variant="secondary" size="sm" onClick={nextMonth} className="text-[8px]">
              <PixelIcon name="cursor" size={12} />
            </PixelButton>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['SU','MO','TU','WE','TH','FR','SA'].map(d => <div key={d} className="font-pixel text-[8px] text-black/50 text-center py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(firstDay)].map((_, i) => <div key={`e-${i}`} className="p-1 md:p-2" />)}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1
              const isSel = selectedDay === day
              return (
                <button key={day} type="button" onClick={() => handleDateSelect(day)} className={cn('p-1 md:p-2 font-mono text-[10px] md:text-xs rounded-none transition-all duration-50 hover:bg-black hover:text-cream', isSel && 'bg-black text-cream shadow-[2px_2px_0px_0px_#1B1B1B]')}>
                  {day}
                </button>
              )
            })}
          </div>
        </motion.div>
      )}

      <PixelButton type="submit" size="xl" className="w-full mt-4 md:mt-6" isLoading={isLoading} disabled={isLoading}>
        BOOT SYSTEM
        <PixelIcon name="boot" size="sm" className="ml-1 md:ml-2" />
      </PixelButton>
      <p className="mt-3 md:mt-4 text-center font-pixel text-[9px] md:text-[10px] text-black/50">NO DATA COLLECTED. NO TRACKING. JUST NOSTALGIA.</p>
    </form>
  )
}