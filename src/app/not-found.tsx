'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PixelButton } from '@/components/ui/PixelButton'
import { PixelIcon } from '@/components/ui/PixelIcon'

export default function NotFound() {
  const [line, setLine] = useState(0)
  const [showRecovery, setShowRecovery] = useState(false)
  const [recoveryLine, setRecoveryLine] = useState(0)
  const [showButtons, setShowButtons] = useState(false)

  const attemptedPath = typeof window !== 'undefined' ? window.location.pathname : '/'

  const errorLines = [
    'ERROR 404',
    '',
    `The file "${attemptedPath}"`,
    'was lost during a disk formatting incident.',
    '',
    '> Attempting recovery...',
  ]

  const recoveryLines = [
    '> Scanning disk sectors...',
    '> Sector 0x00: CORRUPTED',
    '> Sector 0x01: CORRUPTED',
    '> Sector 0x02: CORRUPTED',
    '> Sector 0x03: CORRUPTED',
    '> Recovery failed.',
    '',
    'FILE NOT FOUND',
    '',
    'Press any key to reboot...',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setLine(prev => {
        if (prev >= errorLines.length - 1) {
          setTimeout(() => setShowRecovery(true), 800)
          return prev
        }
        return prev + 1
      })
    }, 600)
    return () => clearInterval(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!showRecovery) return
    const timer = setInterval(() => {
      setRecoveryLine(prev => {
        if (prev >= recoveryLines.length - 1) {
          setShowButtons(true)
          return prev
        }
        return prev + 1
      })
    }, 400)
    return () => clearInterval(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showRecovery])

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center p-4 font-mono">
      <div className="fixed inset-0 crt-scanlines" style={{ opacity: 0.15 }} />
      
      <div className="fixed inset-0 pointer-events-none" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.05%22/%3E%3C/svg%22")',
        opacity: 0.3
      }} />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="pixel-border p-8 bg-black border-white/20" style={{ borderWidth: '4px', boxShadow: '8px 8px 0px 0px #333' }}>
          <div className="font-pixel text-white/50 text-xs mb-6 tracking-widest">
            MICROSOFT WINDOWS 98 [VERSION 4.10.1998]
            <br />
            (C)COPYRIGHT MICROSOFT CORP 1981-1999.
          </div>

          <div className="space-y-1 font-mono text-sm text-white/80 leading-relaxed">
            {errorLines.slice(0, line + 1).map((l, i) => (
              <div key={i} className={i === line ? 'animate-blink' : ''}>
                {l}
                {i === line && <span className="animate-blink">█</span>}
              </div>
            ))}
          </div>

          {showRecovery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-1"
            >
              {recoveryLines.slice(0, recoveryLine + 1).map((l, i) => (
                <div key={i} className={i === recoveryLine ? 'animate-blink text-yellow-400' : 'text-white/70'}>
                  {l}
                  {i === recoveryLine && <span className="animate-blink">█</span>}
                </div>
              ))}
            </motion.div>
          )}

          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <PixelButton variant="primary" size="lg" onClick={() => window.location.href = '/'}>
                <PixelIcon name="boot" size="sm" className="mr-2" />
                REBOOT SYSTEM
              </PixelButton>
              <PixelButton variant="secondary" size="lg" onClick={() => window.history.back()}>
                <PixelIcon name="folder" size="sm" className="mr-2" />
                GO BACK
              </PixelButton>
              <PixelButton variant="danger" size="lg" onClick={() => window.location.href = '/#about:internet'}>
                <PixelIcon name="monitor" size="sm" className="mr-2" />
                ABOUT:INTERNET
              </PixelButton>
            </motion.div>
          )}

          <div className="mt-8 pt-6 border-t-2 border-white/10">
            <div className="font-pixel text-[10px] text-white/30 uppercase tracking-wider mb-3">
              DIRECTORY OF C:\INTERNETBIRTH
            </div>
            <div className="font-mono text-xs text-white/50 space-y-1">
              <div>INDEX        HTM         1,024  01-01-1995  12:00p</div>
              <div>AUTOEXEC     BAT           512  01-01-1995  12:00p</div>
              <div>CONFIG       SYS           256  01-01-1995  12:00p</div>
              <div>INTERNET     EXE       2,048  01-01-1995  12:00p</div>
              <div>README       TXT         1,536  01-01-1995  12:00p</div>
              <div>BOOT         SYS         8,192  01-01-1995  12:00p</div>
              <div>COMMAND      COM        54,645  01-01-1995  12:00p</div>
              <div className="text-yellow-400">404          ERR           0  01-01-1995  12:00p</div>
              <div>           8 file(s)      68,167 bytes</div>
              <div>           1,048,576 bytes free</div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="font-pixel text-[10px] text-white/30">
            internetbirth v1.0.0 — FILE NOT FOUND
          </p>
        </div>
      </div>
    </div>
  )
}
