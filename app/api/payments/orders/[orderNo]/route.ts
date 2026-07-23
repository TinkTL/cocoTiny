import { NextResponse } from 'next/server'
import { getPaymentOrder } from '@/lib/payment-orders'

type RouteContext = {
  params: Promise<{ orderNo: string }>
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { orderNo } = await params
  const order = getPaymentOrder(orderNo)

  if (!order) {
    return NextResponse.json({ error: '订单不存在' }, { status: 404 })
  }

  return NextResponse.json({
    orderNo: order.orderNo,
    status: order.status,
    amount: order.amount,
    assetSlug: order.assetSlug,
    expiresAt: order.expiresAt,
    paidAt: order.paidAt,
  })
}
