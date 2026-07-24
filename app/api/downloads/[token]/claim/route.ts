import { NextResponse } from 'next/server'
import { createSignedDownloadUrl } from '@/lib/cos'
import {
  claimDownload,
  getDownloadOrder,
  isDownloadToken,
} from '@/lib/payment-orders'

export const runtime = 'nodejs'

type RouteContext = {
  params: Promise<{ token: string }>
}

export async function POST(_request: Request, { params }: RouteContext) {
  const { token } = await params
  if (!isDownloadToken(token)) {
    return NextResponse.json({ error: '领取链接无效或已过期' }, { status: 404 })
  }

  try {
    const candidate = await getDownloadOrder(token)
    if (
      !candidate ||
      !candidate.downloadExpiresAt ||
      Date.parse(candidate.downloadExpiresAt) <= Date.now() ||
      candidate.downloadCount >= candidate.downloadLimit
    ) {
      return NextResponse.json({ error: '领取链接无效或次数已用完' }, { status: 410 })
    }

    // Signing is local. Generate first so configuration errors never consume
    // one of the buyer's three successful authorizations.
    const url = await createSignedDownloadUrl(candidate.objectKey)
    const claimed = await claimDownload(token)
    if (!claimed) {
      return NextResponse.json({ error: '领取链接无效或次数已用完' }, { status: 410 })
    }

    return NextResponse.json(
      { url, remaining: claimed.downloadLimit - claimed.downloadCount },
      { headers: { 'cache-control': 'no-store' } },
    )
  } catch (error) {
    console.error('COS download authorization failed', { error })
    return NextResponse.json(
      { error: '暂时无法生成下载地址，请稍后重试' },
      { status: 502 },
    )
  }
}
