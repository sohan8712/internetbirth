import { NextRequest, NextResponse } from 'next/server'
import { enrichMusic } from '@/lib/enrichment/music'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')
  const artist = searchParams.get('artist')

  if (!title || !artist) {
    return NextResponse.json({ error: 'Missing title or artist' }, { status: 400 })
  }

  const result = await enrichMusic(title, artist)
  return NextResponse.json(result)
}
