'use client'

import Link from 'next/link'
import { CheckCircle2, CircleAlert, LoaderCircle, Mail } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

type PaymentStatus = 'CHECKING' | 'PAID' | 'PENDING' | 'CLOSED' | 'ERROR'
type EmailStatus = 'NOT_READY' | 'PENDING' | 'SENT' | 'FAILED'

type QueryResult = {
  status: PaymentStatus
  email?: string
  emailStatus?: EmailStatus
}

export function PaymentResult({ orderNo }: { orderNo?: string }) {
  const [status, setStatus] = useState<PaymentStatus>(orderNo ? 'CHECKING' : 'ERROR')
  const [message, setMessage] = useState(orderNo ? '' : '缺少商户订单号')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<EmailStatus>()
  const [resendEmail, setResendEmail] = useState('')
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  const fetchPaymentStatus = useCallback(async (): Promise<QueryResult> => {
    if (!orderNo) throw new Error('缺少商户订单号')
    const response = await fetch(
      `/api/payments/alipay/query?orderNo=${encodeURIComponent(orderNo)}`,
      { cache: 'no-store' },
    )
    const result = (await response.json()) as QueryResult & { error?: string }
    if (!response.ok || !result.status) throw new Error(result.error || '订单查询失败')
    return result
  }, [orderNo])

  const applyQueryResult = useCallback((result: QueryResult) => {
    setStatus(result.status)
    setMaskedEmail(result.email || '')
    setEmailStatus(result.emailStatus)
  }, [])

  useEffect(() => {
    if (!orderNo) return
    let cancelled = false

    void fetchPaymentStatus()
      .then((result) => {
        if (!cancelled) applyQueryResult(result)
      })
      .catch((error: unknown) => {
        if (cancelled) return
        setStatus('ERROR')
        setMessage(error instanceof Error ? error.message : '订单查询失败')
      })

    return () => {
      cancelled = true
    }
  }, [applyQueryResult, fetchPaymentStatus, orderNo])

  async function checkPayment() {
    setStatus('CHECKING')
    setMessage('')

    try {
      applyQueryResult(await fetchPaymentStatus())
    } catch (error) {
      setStatus('ERROR')
      setMessage(error instanceof Error ? error.message : '订单查询失败')
    }
  }

  async function resendDelivery() {
    if (!orderNo || resending) return
    setResending(true)
    setResendMessage('')

    try {
      const response = await fetch(
        `/api/payments/orders/${encodeURIComponent(orderNo)}/resend`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email: resendEmail }),
        },
      )
      const result = (await response.json()) as { message?: string; error?: string }
      if (!response.ok) throw new Error(result.error || '暂时无法重新发送')
      setResendMessage(result.message || '如订单信息匹配，邮件将发送到原邮箱')
    } catch (error) {
      setResendMessage(error instanceof Error ? error.message : '暂时无法重新发送')
    } finally {
      setResending(false)
    }
  }

  const paid = status === 'PAID'
  const checking = status === 'CHECKING'

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f9fc] px-5 py-16">
      <section className="w-full max-w-lg rounded-2xl border border-[#e3e8ee] bg-white p-8 text-center shadow-[0_20px_60px_rgba(10,37,64,0.12)]">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#f1f4f8]">
          {checking ? (
            <LoaderCircle className="h-9 w-9 animate-spin text-[#635bff]" />
          ) : paid ? (
            <CheckCircle2 className="h-9 w-9 text-emerald-600" />
          ) : (
            <CircleAlert className="h-9 w-9 text-amber-600" />
          )}
        </div>

        <h1 className="mt-6 text-2xl font-bold text-[#0a2540]">
          {checking
            ? '正在确认支付结果'
            : paid
              ? '支付成功'
              : status === 'PENDING'
                ? '支付结果处理中'
                : status === 'CLOSED'
                  ? '订单已关闭'
                  : '暂时无法确认支付结果'}
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#697386]">
          {message ||
            (paid
              ? emailStatus === 'SENT'
                ? `领取邮件已发送至 ${maskedEmail}`
                : `付款已确认，领取邮件正在发送至 ${maskedEmail}`
              : '如果你已经付款，可以稍等片刻后重新查询。')}
        </p>

        {orderNo && (
          <p className="mt-4 break-all text-xs text-[#8792a2]">订单号：{orderNo}</p>
        )}

        {paid && orderNo && (
          <div className="mt-7 rounded-xl border border-[#e3e8ee] bg-[#f8fafc] p-5 text-left">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0a2540]">
              <Mail className="h-4 w-4" />
              没有收到邮件？
            </div>
            <p className="mt-2 text-xs leading-5 text-[#697386]">
              输入付款前填写的完整邮箱。验证匹配后，旧领取链接会失效并发送新链接。
            </p>
            <input
              type="email"
              value={resendEmail}
              onChange={(event) => setResendEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              maxLength={254}
              className="mt-3 w-full rounded-md border border-[#cbd5e1] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#635bff]"
            />
            <button
              type="button"
              onClick={resendDelivery}
              disabled={resending || !resendEmail.trim()}
              className="mt-3 w-full rounded-md bg-[#635bff] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-55"
            >
              {resending ? '正在重新发送' : '重新发送领取邮件'}
            </button>
            {resendMessage && (
              <p className="mt-3 text-xs font-semibold text-[#697386]">{resendMessage}</p>
            )}
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {!paid && orderNo && (
            <button
              type="button"
              onClick={checkPayment}
              disabled={checking}
              className="rounded-md bg-[#635bff] px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
            >
              重新查询
            </button>
          )}
          <Link
            href="/"
            className="rounded-md border border-[#d8dee8] px-5 py-3 text-sm font-bold text-[#0a2540]"
          >
            返回首页
          </Link>
        </div>
      </section>
    </main>
  )
}
