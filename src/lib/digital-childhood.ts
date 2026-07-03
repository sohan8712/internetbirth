export interface DigitalChildhoodProfile {
  birthYear: number
  era: string
  eraLabel: string
  nostalgiaScore: number
  factors: {
    internetMaturity: number
    dialupEra: number
    preSocialMedia: number
    flashGameEra: number
    forumEra: number
    smartphoneExposure: number
    aiExposure: number
    streamingExposure: number
    broadbandAdoption: number
    digitalNostalgia: number
  }
  badges: {
    dialupSurvivor: boolean
    forumNative: boolean
    algorithmFreeChildhood: boolean
    flashGameVeteran: boolean
    youtubeNative: boolean
    aiNative: boolean
  }
  digitalChaosIndex: number
  personality: {
    id: string
    name: string
    description: string
    traits: string[]
    rarity: string
  }
  percentile: number
}

import personalitiesData from '@/data/personalities.json'

const ERA_ORDER = ['pre-web','dawn','dialup','dotcom','broadband','web2','mobile','social','streaming','algorithmic','pandemic','ai']

export function calculateDigitalChildhoodProfile(birthDate: Date): DigitalChildhoodProfile {
  const birthYear = birthDate.getFullYear()
  const era = getEraForYear(birthYear)
  const eraLabel = era.toUpperCase()
  const eraIdx = ERA_ORDER.indexOf(era)
  const totalEras = ERA_ORDER.length
  const reverseProgress = 1 - (eraIdx / (totalEras - 1))

  const internetMaturity = clamp(reverseProgress * 90 + 10, 0, 100)
  const dialupEra = clamp(era === 'dialup' ? 100 : ['dawn','dotcom'].includes(era) ? 50 : ['broadband','web2'].includes(era) ? 15 : 0, 0, 100)
  const preSocialMedia = clamp(eraIdx <= 4 ? 95 : eraIdx === 5 ? 70 : eraIdx === 6 ? 30 : 10, 0, 100)
  const flashGameEra = clamp(['dialup','dotcom'].includes(era) ? 100 : era === 'broadband' ? 95 : era === 'web2' ? 70 : 15, 0, 100)
  const forumEra = clamp(['pre-web','dawn','dialup','dotcom'].includes(era) ? 95 : era === 'broadband' ? 70 : era === 'web2' ? 40 : 5, 0, 100)
  const smartphoneExposure = clamp(eraIdx >= 6 ? (eraIdx - 5) * 15 + 10 : 0, 0, 100)
  const aiExposure = clamp(eraIdx >= 11 ? (eraIdx - 10) * 25 : 0, 0, 100)
  const streamingExposure = clamp(eraIdx >= 8 ? (eraIdx - 7) * 20 + 10 : eraIdx === 7 ? 30 : 0, 0, 100)
  const broadbandAdoption = clamp(['broadband','web2','mobile','social','streaming','algorithmic'].includes(era) ? eraIdx >= 8 ? 100 : 80 : era === 'dotcom' ? 30 : 10, 0, 100)
  const digitalNostalgia = clamp(reverseProgress * 85 + 15, 0, 100)

  let nostalgiaScore = Math.round(
    internetMaturity * 0.12 + dialupEra * 0.10 + preSocialMedia * 0.15 +
    flashGameEra * 0.10 + forumEra * 0.10 - smartphoneExposure * 0.10 -
    aiExposure * 0.15 - streamingExposure * 0.05 + broadbandAdoption * 0.03 +
    digitalNostalgia * 0.10
  )
  nostalgiaScore = clamp(nostalgiaScore, 0, 100)

  const badges = {
    dialupSurvivor: ['dawn','dialup','dotcom'].includes(era),
    forumNative: forumEra >= 70,
    algorithmFreeChildhood: preSocialMedia >= 70,
    flashGameVeteran: flashGameEra >= 70,
    youtubeNative: eraIdx >= 6,
    aiNative: eraIdx >= 11
  }

  let digitalChaosIndex = Math.round(
    dialupEra * 0.2 + forumEra * 0.15 + flashGameEra * 0.15 +
    (100 - smartphoneExposure) * 0.1 + (100 - aiExposure) * 0.15 +
    preSocialMedia * 0.15 + digitalNostalgia * 0.1
  )
  digitalChaosIndex = clamp(digitalChaosIndex, 0, 100)

  const matchedPersonality = personalitiesData.personalities.find(p => p.era === era) ||
    personalitiesData.personalities[personalitiesData.personalities.length - 1]

  return {
    birthYear, era, eraLabel, nostalgiaScore,
    factors: { internetMaturity, dialupEra, preSocialMedia, flashGameEra, forumEra, smartphoneExposure, aiExposure, streamingExposure, broadbandAdoption, digitalNostalgia },
    badges, digitalChaosIndex,
    personality: { id: matchedPersonality.id, name: matchedPersonality.name, description: matchedPersonality.description, traits: matchedPersonality.traits, rarity: matchedPersonality.rarity },
    percentile: Math.round(reverseProgress * 100)
  }
}

function getEraForYear(year: number): string {
  const map: Record<number, string> = {
    1990:'pre-web',1991:'pre-web',1992:'pre-web',1993:'dawn',1994:'dawn',
    1995:'dialup',1996:'dialup',1997:'dialup',1998:'dotcom',1999:'dotcom',
    2000:'dotcom',2001:'dotcom',2002:'broadband',2003:'broadband',2004:'web2',
    2005:'web2',2006:'web2',2007:'mobile',2008:'mobile',2009:'mobile',
    2010:'social',2011:'social',2012:'social',2013:'streaming',2014:'streaming',
    2015:'streaming',2016:'algorithmic',2017:'algorithmic',2018:'algorithmic',
    2019:'algorithmic',2020:'pandemic',2021:'pandemic',2022:'ai',2023:'ai',2024:'ai',2025:'ai'
  }
  if (year < 1990) return 'pre-web'
  return map[year] || 'ai'
}

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)) }

export function formatNumber(num: number): string {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}
