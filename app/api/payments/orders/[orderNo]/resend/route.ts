import { NextResponse } from 'next/server'
import { resendPaidDelivery } from '@/lib/payment-delivery'
import {
  isCocoTinyOrderNo,
  isValidBuyerEmail,
  normalizeEmail,
} from '@/lib/payment-orders'

export const runtime = 'nodejs'

type RouteContext = {
  params: Promise<{ orderNo: string }>
}

export async function POST(request: Request, { params }: RouteContext) {
  const { orderNo } = await params
  if (!isCocoTinyOrderNo(orderNo)) {
    return NextResponse.json({ ok: true })
  }

  let body: { email?: unknown }
  try {
    body = (await request.json()) as { email?: unknown }
  } catch {
    return NextResponse.json({ error: '请求格式不正确' }, { status: 400 })
  }

  if (!isValidBuyerEmail(body.email)) {
    return NextResponse.json({ error: '请输入有效邮箱' }, { status: 400 })
  }

  try {
    const delivery = await resendPaidDelivery(orderNo, normalizeEmail(body.email))
    if (!delivery) {
      return NextResponse.json({
        ok: true,
        message: '如订单信息匹配，领取邮件将发送到原邮箱',
      })
    }

    return NextResponse.json({
      ok: true,
      message:
        delivery.sent
          ? '领取邮件已重新发送'
          : '邮件暂时发送失败，请稍后重试',
    })
  } catch (error) {
    console.error('Resend paid delivery error', { orderNo, error })
    return NextResponse.json(
      { error: '暂时无法重新发送，请稍后重试' },
      { status: 502 },
    )
  }
}
