'use client'

import Image from 'next/image'
import { LoaderCircle } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

type PaymentStatus = 'CHECKING' | 'PAID' | 'PENDING' | 'CLOSED' | 'ERROR'
type EmailStatus = 'NOT_READY' | 'PENDING' | 'SENT' | 'FAILED'

type PaymentQueryResult = {
  status: PaymentStatus
  email?: string
  assetTitle?: string
  paidAt?: string
  emailStatus?: EmailStatus
}

const emailStatusCopy: Record<EmailStatus, string> = {
  NOT_READY: '待发送',
  PENDING: '正在发送',
  SENT: '已发送',
  FAILED: '发送失败',
}

export function PaymentReturnPanel({
  orderNo,
  productTitle,
}: {
  orderNo: string
  productTitle: string
}) {
  const [result, setResult] = useState<PaymentQueryResult>({ status: 'CHECKING' })
  const [message, setMessage] = useState('')
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  const fetchPaymentStatus = useCallback(async () => {
    const response = await fetch(
      `/api/payments/alipay/query?orderNo=${encodeURIComponent(orderNo)}`,
      { cache: 'no-store' },
    )
    const nextResult = (await response.json()) as PaymentQueryResult & { error?: string }
    if (!response.ok || !nextResult.status) {
      throw new Error(nextResult.error || '订单查询失败')
    }
    return nextResult
  }, [orderNo])

  useEffect(() => {
    let cancelled = false
    void fetchPaymentStatus()
      .then((nextResult) => {
        if (!cancelled) setResult(nextResult)
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setResult({ status: 'ERROR' })
          setMessage(error instanceof Error ? error.message : '订单查询失败')
        }
      })
    return () => {
      cancelled = true
    }
  }, [fetchPaymentStatus])

  async function checkPayment() {
    setResult({ status: 'CHECKING' })
    setMessage('')
    try {
      setResult(await fetchPaymentStatus())
    } catch (error) {
      setResult({ status: 'ERROR' })
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
      })
      const resendResult = (await response.json()) as {
        emailStatus?: EmailStatus
        message?: string
        error?: string
      }
      if (!response.ok) throw new Error(resendResult.error || '暂时无法重新发送')
      if (resendResult.emailStatus) {
        setResult((current) => ({
          ...current,
          emailStatus: resendResult.emailStatus,
        }))
      }
      setResendMessage(resendResult.message || '领取邮件已重新发送到订单原邮箱')
    } catch (error) {
      setResendMessage(error instanceof Error ? error.message : '暂时无法重新发送')
    } finally {
      setResending(false)
    }
  }

  const paid = result.status === 'PAID'
  const checking = result.status === 'CHECKING'
  const title = checking
    ? '正在确认支付结果'
    : paid
      ? '查收您的礼物'
      : result.status === 'PENDING'
        ? '等待付款确认'
        : result.status === 'CLOSED'
          ? '订单已关闭'
          : '暂时无法确认支付结果'

  const paidTime = result.paidAt
    ? new Date(result.paidAt).toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '确认中'

  return (
    <div className="flex h-full flex-col">
      <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8792a2]">
        订单状态
      </div>
      <h3 className="mt-3 font-display text-2xl font-bold text-[#0a2540]">{title}</h3>

      {paid ? (
        <>
          <div className="mt-7 divide-y divide-[#e6ebf1] border-y border-[#e6ebf1]">
            <OrderRow label="邮箱地址" value={result.email || '已脱敏'} />
            <OrderRow label="订单编号" value={orderNo} truncate />
            <OrderRow label="资产包" value={result.assetTitle || productTitle} />
            <OrderRow label="付款时间" value={paidTime} />
            <OrderRow
              label="发送状态"
              value={result.emailStatus ? emailStatusCopy[result.emailStatus] : '确认中'}
            />
          </div>

          <button
            type="button"
            onClick={resendDelivery}
            disabled={resending}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#635bff] px-4 py-3 text-sm font-bold text-[#635bff] transition hover:bg-[#f7f6ff] disabled:opacity-55"
          >
            {resending && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {resending ? '正在重新发送…' : '重新发送领取邮件'}
          </button>
          {resendMessage && (
            <p className="mt-3 text-center text-xs font-semibold text-[#697386]">
              {resendMessage}
            </p>
          )}
        </>
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

      <Image
        src="/cocotiny-logo.png"
        alt="CocoTiny"
        width={1179}
        height={405}
        className="mx-auto mt-10 h-auto w-[250px] max-w-[78%]"
      />
      <p className="mt-auto pt-5 text-center text-xs leading-5 text-[#8792a2]">
        遇到错误？联系{' '}
        <a className="font-semibold text-[#635bff]" href="mailto:w211299486@gmail.com">
          w211299486@gmail.com
        </a>
        {' / '}
        <a className="font-semibold text-[#635bff]" href="mailto:211299486@qq.com">
          211299486@qq.com
        </a>
      </p>
    </div>
  )
}

function OrderRow({
  label,
  value,
  truncate = false,
}: {
  label: string
  value: string
  truncate?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-3.5 text-sm">
      <span className="shrink-0 font-semibold text-[#697386]">{label}</span>
      <strong
        className={`text-right text-[#0a2540] ${truncate ? 'max-w-[250px] truncate' : ''}`}
        title={truncate ? value : undefined}
      >
        {value}
      </strong>
    </div>
  )
}
