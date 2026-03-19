import { NextResponse } from 'next/server'
import { docsSearchEntries } from '@/content/docs/search'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(docsSearchEntries)
}
