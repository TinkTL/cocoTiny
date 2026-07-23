import { NextResponse } from 'next/server'
import { getAlipayConfigurationError, getAlipaySdk } from '@/lib/alipay'
import { isCocoTinyOrderNo } from '@/lib/payment-orders'
import { ASSET_PACK_PRICE } from '@/lib/payment-products'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const orderNo = new URL(request.url).searchParams.get('orderNo')
  if (!isCocoTinyOrderNo(orderNo)) {
    return NextResponse.json({ error: '订单号不正确' }, { status: 400 })
  }

  const configurationError = getAlipayConfigurationError()
  if (configurationError) {
    return NextResponse.json({ error: configurationError }, { status: 503 })
  }

  try {
    const result = await getAlipaySdk().exec(
      'alipay.trade.query',
      { bizContent: { out_trade_no: orderNo } },
      { validateSign: true },
    )

    const responseOrderNo = result.outTradeNo || result.out_trade_no
    const totalAmount = result.totalAmount || result.total_amount
    const tradeStatus = result.tradeStatus || result.trade_status
    const tradeNo = result.tradeNo || result.trade_no

    if (result.code === '40004' && result.subCode === 'ACQ.TRADE_NOT_EXIST') {
      return NextResponse.json({ orderNo, status: 'PENDING' })
    }

    if (result.code !== '10000') {
      console.error('Alipay query failed', {
        orderNo,
        code: result.code,
        subCode: result.subCode,
        message: result.subMsg || result.msg,
      })
      return NextResponse.json({ error: '暂时无法查询支付宝订单' }, { status: 502 })
    }

    if (responseOrderNo !== orderNo || totalAmount !== ASSET_PACK_PRICE) {
      console.error('Alipay query identity mismatch', { orderNo, responseOrderNo, totalAmount })
      return NextResponse.json({ error: '支付宝订单校验失败' }, { status: 502 })
    }

    const paid = tradeStatus === 'TRADE_SUCCESS' || tradeStatus === 'TRADE_FINISHED'
    return NextResponse.json({
      orderNo,
      status: paid ? 'PAID' : tradeStatus === 'TRADE_CLOSED' ? 'CLOSED' : 'PENDING',
      amount: totalAmount,
      tradeNo: paid ? tradeNo : undefined,
    })
  } catch (error) {
    console.error('Alipay query order error', { orderNo, error })
    return NextResponse.json({ error: '暂时无法连接支付宝' }, { status: 502 })
  }
}
