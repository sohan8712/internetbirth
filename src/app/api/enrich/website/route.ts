import { NextRequest, NextResponse } from 'next/server'
import { enrichWebsite } from '@/lib/enrichment/website'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const domain = searchParams.get('domain')

  if (!name) {
    return NextResponse.json({ error: 'Missing name' }, { status: 400 })
  }

  const result = enrichWebsite(name, domain || undefined)
  return NextResponse.json(result)
}
