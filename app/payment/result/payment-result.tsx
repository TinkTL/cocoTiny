'use client'

import Link from 'next/link'
import { CheckCircle2, CircleAlert, LoaderCircle } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

type PaymentStatus = 'CHECKING' | 'PAID' | 'PENDING' | 'CLOSED' | 'ERROR'

export function PaymentResult({ orderNo }: { orderNo?: string }) {
  const [status, setStatus] = useState<PaymentStatus>(orderNo ? 'CHECKING' : 'ERROR')
  const [message, setMessage] = useState(orderNo ? '' : '缺少商户订单号')

  const fetchPaymentStatus = useCallback(async () => {
    if (!orderNo) throw new Error('缺少商户订单号')
    const response = await fetch(
      `/api/payments/alipay/query?orderNo=${encodeURIComponent(orderNo)}`,
      { cache: 'no-store' },
    )
    const result = (await response.json()) as { status?: PaymentStatus; error?: string }
    if (!response.ok || !result.status) throw new Error(result.error || '订单查询失败')
    return result.status
  }, [orderNo])

  useEffect(() => {
    if (!orderNo) return
    let cancelled = false

    void fetchPaymentStatus()
      .then((nextStatus) => {
        if (!cancelled) setStatus(nextStatus)
      })
      .catch((error: unknown) => {
        if (cancelled) return
        setStatus('ERROR')
        setMessage(error instanceof Error ? error.message : '订单查询失败')
      })

    return () => {
      cancelled = true
    }
  }, [fetchPaymentStatus, orderNo])

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
              ? '支付宝已经确认这笔 ¥0.10 测试交易。'
              : '如果你已经付款，可以稍等片刻后重新查询。')}
        </p>

        {orderNo && (
          <p className="mt-4 break-all text-xs text-[#8792a2]">订单号：{orderNo}</p>
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
