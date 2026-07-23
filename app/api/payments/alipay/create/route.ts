import { NextResponse } from 'next/server'
import { getAlipayConfigurationError, getAlipaySdk } from '@/lib/alipay'
import { createPaymentOrder } from '@/lib/payment-orders'
import { getPaymentProduct } from '@/lib/payment-products'

export const runtime = 'nodejs'

type CreatePaymentBody = {
  assetSlug?: unknown
}

export async function POST(request: Request) {
  let body: CreatePaymentBody

  try {
    body = (await request.json()) as CreatePaymentBody
  } catch {
    return NextResponse.json({ error: '请求格式不正确' }, { status: 400 })
  }

  if (typeof body.assetSlug !== 'string') {
    return NextResponse.json({ error: '缺少资产包标识' }, { status: 400 })
  }

  const product = getPaymentProduct(body.assetSlug)
  if (!product) {
    return NextResponse.json({ error: '资产包不存在或暂未上架' }, { status: 404 })
  }

  const configurationError = getAlipayConfigurationError()
  if (configurationError) {
    return NextResponse.json(
      { error: configurationError, code: 'ALIPAY_NOT_CONFIGURED' },
      { status: 503 },
    )
  }

  const order = createPaymentOrder({
    assetSlug: product.slug,
    title: product.title,
    amount: product.price,
  })

  try {
    const returnUrl = new URL(process.env.ALIPAY_RETURN_URL!)
    returnUrl.searchParams.set('orderNo', order.orderNo)

    const payUrl = getAlipaySdk().pageExecute(
      'alipay.trade.page.pay',
      'GET',
      {
        notifyUrl: process.env.ALIPAY_NOTIFY_URL,
        returnUrl: returnUrl.toString(),
        bizContent: {
          out_trade_no: order.orderNo,
          product_code: 'FAST_INSTANT_TRADE_PAY',
          total_amount: order.amount,
          subject: `${order.title} 完整版资产包`,
          body: 'CocoTiny 数字游戏美术资产包',
          timeout_express: '10m',
        },
      },
    )

    return NextResponse.json({
      orderNo: order.orderNo,
      amount: order.amount,
      expiresAt: order.expiresAt,
      payUrl,
    })
  } catch (error) {
    console.error('Alipay create order error', error)
    return NextResponse.json({ error: '暂时无法连接支付宝，请稍后重试' }, { status: 502 })
  }
}
