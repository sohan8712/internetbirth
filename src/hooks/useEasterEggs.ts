'use client'
import { useEffect } from 'react'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA']

export function useKonamiCode(onActivate: () => void) {
  useEffect(() => {
    let seq: string[] = []
    const handler = (e: KeyboardEvent) => {
      seq.push(e.code)
      if (seq.length > KONAMI.length) seq.shift()
      if (seq.join(',') === KONAMI.join(',')) { onActivate(); seq = [] }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onActivate])
}

export function useAboutInternet() {
  useEffect(() => {
    if (window.location.hash === '#about:internet') {
      window.location.href = '/about-internet'
    }
  }, [])
}