import { NextResponse } from 'next/server'
import { resendPaidDelivery } from '@/lib/payment-delivery'
import { isCocoTinyOrderNo } from '@/lib/payment-orders'

export const runtime = 'nodejs'

type RouteContext = {
  params: Promise<{ orderNo: string }>
}

export async function POST(_request: Request, { params }: RouteContext) {
  const { orderNo } = await params
  if (!isCocoTinyOrderNo(orderNo)) {
    return NextResponse.json({ ok: true })
  }

  try {
    const delivery = await resendPaidDelivery(orderNo)
    if (!delivery) {
      return NextResponse.json({
        ok: true,
        message: '暂时无法重新发送，请稍后再试',
      })
    }

    return NextResponse.json({
      ok: true,
      emailStatus: delivery.sent ? 'SENT' : 'FAILED',
      message: delivery.sent
        ? '领取邮件已重新发送到订单原邮箱'
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
