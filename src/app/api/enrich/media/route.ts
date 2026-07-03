import { NextRequest, NextResponse } from 'next/server'
import { enrichMedia } from '@/lib/enrichment/media'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const wiki = searchParams.get('wiki')

  if (!name) {
    return NextResponse.json({ error: 'Missing name' }, { status: 400 })
  }

  const result = await enrichMedia(name, wiki || undefined)
  return NextResponse.json(result)
}
