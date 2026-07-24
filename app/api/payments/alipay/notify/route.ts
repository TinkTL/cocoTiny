import { getAlipaySdk } from '@/lib/alipay'
import { confirmPaidOrderAndDeliver } from '@/lib/payment-delivery'
import { getPaymentOrder, isCocoTinyOrderNo } from '@/lib/payment-orders'

export const runtime = 'nodejs'

function textResponse(body: 'success' | 'failure') {
  return new Response(body, {
    status: 200,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const payload = Object.fromEntries(
    Array.from(formData.entries(), ([key, value]) => [key, String(value)]),
  )

  try {
    if (!getAlipaySdk().checkNotifySignV2(payload)) return textResponse('failure')

    const orderNo = payload.out_trade_no
    if (!isCocoTinyOrderNo(orderNo)) return textResponse('failure')

    const order = await getPaymentOrder(orderNo)
    if (!order) return textResponse('failure')

    const validApp = payload.app_id === process.env.ALIPAY_APP_ID
    const validSeller =
      !process.env.ALIPAY_SELLER_ID || payload.seller_id === process.env.ALIPAY_SELLER_ID
    const validAmount = payload.total_amount === order.amount
    const paid = payload.trade_status === 'TRADE_SUCCESS' || payload.trade_status === 'TRADE_FINISHED'

    if (!validApp || !validSeller || !validAmount || !paid || !payload.trade_no) {
      return textResponse('failure')
    }

    const paidOrder = await confirmPaidOrderAndDeliver(orderNo, payload.trade_no)
    if (!paidOrder || paidOrder.status !== 'PAID') return textResponse('failure')

    console.info('Alipay payment confirmed', {
      orderNo,
      tradeNo: payload.trade_no,
      tradeStatus: payload.trade_status,
      amount: payload.total_amount,
    })
    return textResponse('success')
  } catch (error) {
    console.error('Alipay notify error', error)
    return textResponse('failure')
  }
}
