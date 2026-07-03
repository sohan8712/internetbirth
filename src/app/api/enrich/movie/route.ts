import { NextRequest, NextResponse } from 'next/server'
import { enrichMovie } from '@/lib/enrichment/movie'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')
  const year = searchParams.get('year')

  if (!title || !year) {
    return NextResponse.json({ error: 'Missing title or year' }, { status: 400 })
  }

  const result = await enrichMovie(title, parseInt(year))
  return NextResponse.json(result)
}
