import { NextResponse } from 'next/server'
import { resendPaidDelivery } from '@/lib/payment-delivery'
import {
  getEmailRetryAfterSeconds,
  getEmailResendsRemaining,
  getPaymentOrder,
  isCocoTinyOrderNo,
} from '@/lib/payment-orders'

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
    const order = await getPaymentOrder(orderNo)
    if (!order || order.status !== 'PAID') {
      return NextResponse.json({ ok: true })
    }

    const resendsRemaining = getEmailResendsRemaining(order)
    if (resendsRemaining <= 0) {
      return NextResponse.json({
        ok: true,
        resendsRemaining: 0,
        retryAfterSeconds: 0,
        message: '已达到此订单的邮件重发上限',
      })
    }

    const retryAfterSeconds = getEmailRetryAfterSeconds(order)
    if (retryAfterSeconds > 0) {
      return NextResponse.json({
        ok: true,
        resendsRemaining,
        retryAfterSeconds,
        message: `${retryAfterSeconds} 秒后可重新发送`,
      })
    }

    const delivery = await resendPaidDelivery(orderNo)
    if (!delivery) {
      return NextResponse.json({
        ok: true,
        resendsRemaining: Math.max(0, resendsRemaining - 1),
        retryAfterSeconds: 60,
        message: '暂时无法重新发送，请稍后再试',
      })
    }

    return NextResponse.json({
      ok: true,
      emailStatus: delivery.sent ? 'SENT' : 'FAILED',
      resendsRemaining: getEmailResendsRemaining(delivery.order),
      retryAfterSeconds: 60,
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
