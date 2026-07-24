import { randomBytes } from 'node:crypto'
import { Resend } from 'resend'
import {
  hashDownloadToken,
  markEmailFailed,
  markEmailSent,
  markPaymentOrderPaid,
  PaymentOrder,
  prepareEmailRetry,
} from '@/lib/payment-orders'

function createDownloadToken() {
  return randomBytes(32).toString('base64url')
}

function getSiteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '')
  if (process.env.ALIPAY_RETURN_URL) {
    return new URL(process.env.ALIPAY_RETURN_URL).origin
  }
  throw new Error('SITE_URL is not configured')
}

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

async function sendDeliveryAttempt(order: PaymentOrder, rawToken: string) {
  const from = process.env.EMAIL_FROM
  if (!from) throw new Error('EMAIL_FROM is not configured')

  const downloadUrl = `${getSiteUrl()}/download/${encodeURIComponent(rawToken)}`
  const safeTitle = escapeHtml(order.title)
  const safeOrderNo = escapeHtml(order.orderNo)
  const { data, error } = await getResend().emails.send(
    {
      from,
      to: [order.email],
      subject: `你的 ${order.title} 完整版资产包`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#0a2540;line-height:1.7">
          <h1 style="font-size:24px">付款成功，资产包已准备好</h1>
          <p>你购买的 <strong>${safeTitle}</strong> 完整版资产包已经可以领取。</p>
          <p style="margin:28px 0">
            <a href="${downloadUrl}" style="display:inline-block;padding:13px 22px;border-radius:8px;background:#635bff;color:#fff;text-decoration:none;font-weight:700">
              领取资产包
            </a>
          </p>
          <p>领取链接自付款起 7 天内有效，最多可成功领取 3 次。每次点击下载时会生成一个短期有效的安全下载地址。</p>
          <p style="font-size:13px;color:#697386">订单号：${safeOrderNo}</p>
          <p style="font-size:13px;color:#8792a2">此邮件无需回复。如未发起本次购买，请忽略本邮件。</p>
        </div>
      `,
    },
    {
      idempotencyKey: `paid-delivery/${order.orderNo}/${order.emailAttempt}`,
    },
  )

  if (error || !data?.id) {
    throw new Error(error?.message || 'Resend did not return an email id')
  }

  await markEmailSent(order.orderNo, order.emailAttempt, data.id)
}

async function deliverPreparedOrder(order: PaymentOrder, rawToken: string) {
  try {
    await sendDeliveryAttempt(order, rawToken)
    return true
  } catch (error) {
    await markEmailFailed(order.orderNo, order.emailAttempt)
    console.error('Paid delivery email failed', {
      orderNo: order.orderNo,
      emailAttempt: order.emailAttempt,
      error,
    })
    return false
  }
}

export async function confirmPaidOrderAndDeliver(
  orderNo: string,
  alipayTradeNo: string,
) {
  const rawToken = createDownloadToken()
  const result = await markPaymentOrderPaid({
    orderNo,
    alipayTradeNo,
    tokenHash: hashDownloadToken(rawToken),
  })

  if (result.order && result.shouldSend) {
    await deliverPreparedOrder(result.order, rawToken)
  }

  return result.order
}

export async function resendPaidDelivery(orderNo: string, email: string) {
  const rawToken = createDownloadToken()
  const order = await prepareEmailRetry({
    orderNo,
    email,
    tokenHash: hashDownloadToken(rawToken),
  })

  if (!order) return undefined
  const sent = await deliverPreparedOrder(order, rawToken)
  return { order, sent }
}
