'use client'

import Image from 'next/image'
import { LoaderCircle } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

type PaymentStatus = 'CHECKING' | 'PAID' | 'PENDING' | 'CLOSED' | 'ERROR'

export function PaymentReturnPanel({
  orderNo,
  productTitle,
}: {
  orderNo: string
  productTitle: string
}) {
  const [status, setStatus] = useState<PaymentStatus>('CHECKING')
  const [message, setMessage] = useState('')
  const [resendEmail, setResendEmail] = useState('')
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  const fetchPaymentStatus = useCallback(async () => {
    const response = await fetch(
      `/api/payments/alipay/query?orderNo=${encodeURIComponent(orderNo)}`,
      { cache: 'no-store' },
    )
    const result = (await response.json()) as { status?: PaymentStatus; error?: string }
    if (!response.ok || !result.status) throw new Error(result.error || '订单查询失败')
    return result.status
  }, [orderNo])

  useEffect(() => {
    let cancelled = false
    void fetchPaymentStatus()
      .then((nextStatus) => {
        if (!cancelled) setStatus(nextStatus)
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setStatus('ERROR')
          setMessage(error instanceof Error ? error.message : '订单查询失败')
        }
      })
    return () => {
      cancelled = true
    }
  }, [fetchPaymentStatus])

  async function checkPayment() {
    setStatus('CHECKING')
    setMessage('')
    try {
      setStatus(await fetchPaymentStatus())
    } catch (error) {
      setStatus('ERROR')
      setMessage(error instanceof Error ? error.message : '订单查询失败')
    }
  }

  async function resendDelivery() {
    if (resending) return
    setResending(true)
    setResendMessage('')
    try {
      const response = await fetch(`/api/payments/orders/${encodeURIComponent(orderNo)}/resend`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: resendEmail }),
      })
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
  const title = checking
    ? '正在确认支付结果'
    : paid
      ? '付款成功'
      : status === 'PENDING'
        ? '等待付款确认'
        : status === 'CLOSED'
          ? '订单已关闭'
          : '暂时无法确认支付结果'

  return (
    <div className="flex h-full flex-col">
      <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8792a2]">订单状态</div>
      <h3 className="mt-3 font-display text-2xl font-bold text-[#0a2540]">{title}</h3>

      <div className="mt-7 rounded-xl border border-[#e1e7ed] bg-[#fafbfc] p-4">
        <div className="flex items-center justify-between gap-4 py-1.5 text-xs">
          <span className="font-semibold text-[#7f8c9b]">订单号</span>
          <strong className="max-w-[250px] truncate text-[#0a2540]">{orderNo}</strong>
        </div>
        <div className="flex items-center justify-between gap-4 py-1.5 text-xs">
          <span className="font-semibold text-[#7f8c9b]">资产包</span>
          <strong className="text-[#0a2540]">{productTitle}</strong>
        </div>
      </div>

      {paid ? (
        <div className="mt-5">
          <label className="block text-sm font-bold text-[#0a2540]">
            没有收到邮件？
            <input
              type="email"
              value={resendEmail}
              onChange={(event) => setResendEmail(event.target.value)}
              placeholder="输入付款时使用的邮箱"
              autoComplete="email"
              maxLength={254}
              className="mt-2 w-full rounded-md border border-[#cbd5e1] px-4 py-3 font-medium outline-none transition focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20"
            />
          </label>
          <button
            type="button"
            onClick={resendDelivery}
            disabled={resending || !resendEmail.trim()}
            className="mt-3 w-full rounded-md border border-[#635bff] px-4 py-3 text-sm font-bold text-[#635bff] transition hover:bg-[#f7f6ff] disabled:opacity-55"
          >
            {resending ? '正在重新发送…' : '重新发送领取邮件'}
          </button>
          {resendMessage && (
            <p className="mt-3 text-xs font-semibold text-[#697386]">{resendMessage}</p>
          )}
        </div>
      ) : (
        <>
          {message && <p className="mt-4 text-sm font-semibold text-red-600">{message}</p>}
          <button
            type="button"
            onClick={checkPayment}
            disabled={checking}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#635bff] px-5 py-4 text-sm font-bold text-white shadow-[0_4px_8px_rgba(99,91,255,0.28)] disabled:opacity-60"
          >
            {checking && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {checking ? '正在查询…' : '重新查询付款结果'}
          </button>
        </>
      )}

      <Image src="/cocotiny-logo.png" alt="CocoTiny" width={1179} height={405} className="mx-auto mt-10 h-auto w-[250px] max-w-[78%]" />
      <p className="mt-auto pt-5 text-center text-xs leading-5 text-[#8792a2]">
        遇到错误？联系{' '}
        <a className="font-semibold text-[#635bff]" href="mailto:w211299486@gmail.com">w211299486@gmail.com</a>
        {' / '}
        <a className="font-semibold text-[#635bff]" href="mailto:211299486@qq.com">211299486@qq.com</a>
      </p>
    </div>
  )
}
