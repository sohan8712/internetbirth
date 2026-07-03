'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { PixelButton } from '@/components/ui/PixelButton'
import { PixelCard } from '@/components/ui/PixelCard'

export default function AboutInternet() {
  const [line, setLine] = useState(0)
  const [showMatrix, setShowMatrix] = useState(false)

  const lines = [
    'ABOUT:INTERNET PROTOCOL HANDLER',
    'ACCESS GRANTED: LEVEL 9 CLEARANCE',
    'LOADING REDACTED DOCUMENTS...',
    'DECRYPTING INTERNET ORIGINS...',
    'SYSTEM READY. WELCOME, ARCHIVIST.'
  ]

  useEffect(() => {
    const t = setInterval(() => setLine(prev => {
      if (prev >= lines.length - 1) { setTimeout(() => setShowMatrix(true), 1000); return prev }
      return prev + 1
    }), 800)
    return () => clearInterval(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center p-4 overflow-hidden">
      <div className="fixed inset-0 crt-scanlines opacity-[0.15]" style={{ zIndex: 10 }} />

      {showMatrix && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 0.2, y: '100%' }} transition={{ duration: 10, delay: i * 0.3, repeat: Infinity, ease: 'linear' }} className="absolute text-green-400 font-mono text-xs" style={{ left: `${5 + i * 4.5}%` }}>
              {['0','1'].sort(() => Math.random() - 0.5).join('').repeat(80)}
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-3xl text-center">
        <PixelIcon name="monitor" size="xl" className="mx-auto mb-6 text-green-400 animate-blink" />

        <div className="pixel-border mb-8 p-6 bg-black border-green-400" style={{ boxShadow: '0 0 20px #00ff0040, inset 0 0 20px #00ff0020' }}>
          <div className="font-pixel text-green-400 text-lg mb-4 tracking-widest">CLASSIFIED // EYES ONLY</div>
          <div className="space-y-3 text-left font-mono text-sm text-green-300">
            {lines.slice(0, line + 1).map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                <span className="text-green-400">&gt;</span>
                <span className={i === line ? 'animate-blink' : ''}>{l}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {showMatrix && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <PixelCard variant="paper" padding="lg" className="border-green-400 bg-black text-green-300">
              <h3 className="font-pixel text-xl text-green-400 mb-4">REDACTED TRUTHS</h3>
              <div className="space-y-4 text-left">
                <p className="font-mono text-sm leading-relaxed"><span className="text-green-400">&gt; </span>The first message sent on ARPANET was &ldquo;LO&rdquo; &mdash; the system crashed after &ldquo;LOGIN&rdquo;</p>
                <p className="font-mono text-sm leading-relaxed"><span className="text-green-400">&gt; </span>Email predates the World Wide Web by nearly 20 years</p>
                <p className="font-mono text-sm leading-relaxed"><span className="text-green-400">&gt; </span>The @ symbol was chosen for email because it meant &ldquo;at&rdquo; and wasn&rsquo;t used in names</p>
                <p className="font-mono text-sm leading-relaxed"><span className="text-green-400">&gt; </span>The first webcam watched a coffee pot at Cambridge University (1991&ndash;2001)</p>
                <p className="font-mono text-sm leading-relaxed"><span className="text-green-400">&gt; </span>The &ldquo;404&rdquo; error code comes from Room 404 at CERN where the first web server lived</p>
              </div>
            </PixelCard>

            <PixelCard variant="paper" padding="md" className="border-gold bg-black text-cream">
              <h3 className="font-pixel text-lg text-gold mb-3">DEVELOPER NOTES</h3>
              <div className="space-y-2 text-left font-mono text-xs text-cream/80">
                <p><span className="text-gold">&gt; </span>internetbirth v1.0.0 &mdash; Built with Next.js 15, React 19, Tailwind, Framer Motion</p>
                <p><span className="text-gold">&gt; </span>No analytics. No tracking. No cookies. Pure nostalgia.</p>
                <p><span className="text-gold">&gt; </span>Konami code: &uarr;&uarr;&darr;&darr;&larr;&rarr;&larr;&rarr;BA</p>
                <p><span className="text-gold">&gt; </span>Hidden floppy disks scattered throughout...</p>
              </div>
            </PixelCard>

            <PixelButton variant="danger" size="lg" onClick={() => window.location.href = '/'}>
              <PixelIcon name="boot" size="sm" className="mr-2" />
              RETURN TO SURFACE
            </PixelButton>
          </motion.div>
        )}
      </div>
    </div>
  )
}