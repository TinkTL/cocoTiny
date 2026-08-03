'use client'

import Image from 'next/image'
import { ArrowRight, Check, LockKeyhole, PackageOpen, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '@/components/language-provider'
import { PaymentReturnPanel } from '@/components/payment-return-panel'
import { ASSET_PACK_PRICE } from '@/lib/pricing'

type UnlockAssetPackButtonProps = {
  assetSlug: string
  packTitle: string
  packName: { en: string; zh: string }
  cover: string
  stats: {
    images: number
    logicalAssets: number
    scenes: number
    characters: number
  }
  className: string
  icon?: 'arrow' | 'package'
  autoHandlePaymentReturn?: boolean
}

const price = ASSET_PACK_PRICE

const paymentCopy = {
  en: {
    trigger: 'Unlock the full asset pack!',
    back: 'Back to CocoTiny',
    payFor: 'Pay CocoTiny',
    completePack: 'Complete asset pack',
    includes: 'Included with your purchase',
    content: (stats: UnlockAssetPackButtonProps['stats']) => [
      `${stats.images} RGBA images`,
      `${stats.logicalAssets} organized assets`,
      `${stats.scenes} complete scenes`,
      `${stats.characters} animated characters`,
    ],
    paymentMethod: 'Payment method',
    alipay: 'Alipay',
    redirect: 'Pay securely with Alipay',
    emailLabel: 'Delivery email',
    emailPlaceholder: 'you@example.com',
    emailHint: 'Your secure download link will be sent to this address after payment.',
    emailError: 'Enter a valid email address for delivery.',
    total: 'Total due',
    pay: `Pay ¥${price}`,
    terms: 'By confirming, you agree to the purchase terms for this digital asset pack.',
    powered: 'Powered by CocoTiny',
    secure: 'Secure checkout',
    close: 'Close checkout',
    creating: 'Opening Alipay…',
    paymentError: 'Unable to open Alipay. Please try again.',
  },
  zh: {
    trigger: '解锁完整版资产包！',
    back: '返回 CocoTiny',
    payFor: '支付给 CocoTiny',
    completePack: '完整版资产包',
    includes: '本次购买包含',
    content: (stats: UnlockAssetPackButtonProps['stats']) => [
      `${stats.images} 张 RGBA 图片`,
      `${stats.logicalAssets} 个整理资产`,
      `${stats.scenes} 张完整场景`,
      `${stats.characters} 位动画角色`,
    ],
    paymentMethod: '支付方式',
    alipay: '支付宝',
    redirect: '通过支付宝安全支付',
    emailLabel: '接收资产包的邮箱',
    emailPlaceholder: 'you@example.com',
    emailHint: '付款成功后，安全领取链接将发送到这个邮箱。',
    emailError: '请输入有效的接收邮箱。',
    total: '应付总额',
    pay: `支付 ¥${price}`,
    terms: '确认支付即表示你同意此数字资产包的购买条款。',
    powered: '由 CocoTiny 提供',
    secure: '安全支付',
    close: '关闭支付窗口',
    creating: '正在打开支付宝…',
    paymentError: '暂时无法打开支付宝，请重试。',
  },
}

export function UnlockAssetPackButton({
  assetSlug,
  packTitle,
  packName,
  cover,
  stats,
  className,
  icon = 'arrow',
  autoHandlePaymentReturn = false,
}: UnlockAssetPackButtonProps) {
  const { locale } = useLanguage()
  const text = paymentCopy[locale]
  const [open, setOpen] = useState(false)
  const [creatingPayment, setCreatingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [email, setEmail] = useState('')
  const [returnOrderNo, setReturnOrderNo] = useState('')
  const headingId = useId()
  const TriggerIcon = icon === 'package' ? PackageOpen : ArrowRight
  const displayName = locale === 'zh' ? packName.zh : packName.en

  async function startPayment() {
    if (creatingPayment) return

    if (!email.trim() || !email.includes('@')) {
      setPaymentError(text.emailError)
      return
    }

    setCreatingPayment(true)
    setPaymentError('')

    try {
      const response = await fetch('/api/payments/alipay/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ assetSlug, email }),
      })
      const result = (await response.json()) as { payUrl?: string; error?: string }

      if (!response.ok || !result.payUrl) {
        throw new Error(result.error || text.paymentError)
      }

      sessionStorage.setItem(
        'cocotiny-payment-return',
        JSON.stringify({
          pathname: window.location.pathname,
          scrollY: window.scrollY,
          savedAt: Date.now(),
        }),
      )
      window.location.assign(result.payUrl)
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : text.paymentError)
      setCreatingPayment(false)
    }
  }

  useEffect(() => {
    if (!autoHandlePaymentReturn) return

    const params = new URLSearchParams(window.location.search)
    const orderNo = params.get('orderNo')
    if (params.get('payment') !== 'return' || !orderNo) return

    const cleanUrl = new URL(window.location.href)
    cleanUrl.searchParams.delete('payment')
    cleanUrl.searchParams.delete('orderNo')
    window.history.replaceState(
      window.history.state,
      '',
      `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`,
    )

    try {
      const saved = JSON.parse(
        sessionStorage.getItem('cocotiny-payment-return') || 'null',
      ) as { pathname?: string; scrollY?: number; savedAt?: number } | null

      if (
        saved?.pathname === window.location.pathname &&
        typeof saved.scrollY === 'number' &&
        typeof saved.savedAt === 'number' &&
        Date.now() - saved.savedAt < 30 * 60 * 1000
      ) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: saved.scrollY, behavior: 'auto' })
        })
      }
    } catch {
      // Invalid temporary browser state is safe to ignore.
    } finally {
      sessionStorage.removeItem('cocotiny-payment-return')
    }

    const openFrame = requestAnimationFrame(() => {
      setReturnOrderNo(orderNo)
      setOpen(true)
    })

    return () => cancelAnimationFrame(openFrame)
  }, [autoHandlePaymentReturn])

  useEffect(() => {
    if (!open) return

    const originalOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={className}
      >
        {icon === 'package' && <TriggerIcon className="h-4 w-4" />}
        {text.trigger}
        {icon === 'arrow' && <TriggerIcon className="h-4 w-4" />}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[110] overflow-y-auto bg-[#0a2540]/55 p-3 backdrop-blur-sm sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false)
            }}
          >
            <div className="relative mx-auto my-3 grid min-h-[620px] w-full max-w-[960px] overflow-hidden rounded-lg bg-white shadow-[0_30px_100px_rgba(10,37,64,0.35)] lg:grid-cols-2 sm:my-8">
              <button
                type="button"
                aria-label={text.close}
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full text-[#697386] transition hover:bg-[#f1f4f8] hover:text-[#0a2540] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#635bff]"
              >
                <X className="h-5 w-5" />
              </button>

              <section className="flex flex-col bg-[#f6f9fc] px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#697386] transition hover:text-[#0a2540]"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  {text.back}
                </button>

                <div className="mt-10 text-sm font-semibold text-[#697386]">{text.payFor}</div>
                <div className="mt-2 flex items-baseline text-[#0a2540]">
                  <span className="mr-1 text-2xl font-semibold">¥</span>
                  <span className="text-5xl font-bold tracking-tight">{price}</span>
                </div>

                <div className="mt-8 flex gap-4 rounded-lg border border-[#e3e8ee] bg-white p-4 shadow-[0_2px_5px_rgba(50,50,93,0.08)]">
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-[#0a2540]">
                    <Image
                      src={cover}
                      alt={`${packTitle} cover`}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 py-1">
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8792a2]">
                      {text.completePack}
                    </div>
                    <h2 id={headingId} className="mt-1 font-display text-xl font-bold text-[#0a2540]">
                      {displayName}
                    </h2>
                    <div className="mt-1 truncate text-xs font-semibold text-[#8792a2]">
                      {packTitle}
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-xs font-bold uppercase tracking-[0.12em] text-[#697386]">
                  {text.includes}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {text.content(stats).map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[#425466]">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e7e5ff] text-[#635bff]">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-10 text-xs font-semibold text-[#a3acb9]">
                  {text.powered}
                </div>
              </section>

              <section className="flex min-h-[620px] flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:pt-20">
                {returnOrderNo ? (
                  <PaymentReturnPanel
                    orderNo={returnOrderNo}
                    productTitle={packTitle}
                  />
                ) : (
                  <>
                <h3 className="font-display text-xl font-bold text-[#0a2540]">{text.paymentMethod}</h3>

                <div
                  className="mt-5 flex items-center justify-between gap-4 rounded-lg border-2 border-[#635bff] bg-white p-4 shadow-[0_2px_5px_rgba(50,50,93,0.08)]"
                  role="radio"
                  aria-checked="true"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-md bg-[#1677ff] text-lg font-black text-white">
                      支
                    </div>
                    <div>
                      <div className="font-bold text-[#0a2540]">{text.alipay}</div>
                      <div className="mt-0.5 text-xs font-semibold text-[#8792a2]">{text.redirect}</div>
                    </div>
                  </div>
                  <span className="h-4 w-4 shrink-0 rounded-full border-[5px] border-[#635bff]" />
                </div>

                <div className="mt-8 border-t border-[#e6ebf1] pt-6">
                  <div className="flex items-center justify-between text-sm font-semibold text-[#697386]">
                    <span>{text.total}</span>
                    <span className="text-lg font-bold text-[#0a2540]">¥{price}</span>
                  </div>
                </div>

                <label className="mt-6 block text-left text-sm font-bold text-[#0a2540]">
                  {text.emailLabel}
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={text.emailPlaceholder}
                    autoComplete="email"
                    maxLength={254}
                    required
                    className="mt-2 w-full rounded-md border border-[#cbd5e1] px-4 py-3 font-medium outline-none transition focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20"
                  />
                </label>
                <p className="mt-2 text-left text-xs font-medium leading-5 text-[#8792a2]">
                  {text.emailHint}
                </p>

                <button
                  type="button"
                  onClick={startPayment}
                  disabled={creatingPayment || !email.trim()}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#635bff] px-5 py-4 text-sm font-bold text-white shadow-[0_4px_8px_rgba(99,91,255,0.28)] transition hover:bg-[#554ccf] active:translate-y-px"
                >
                  <LockKeyhole className="h-4 w-4" />
                  {creatingPayment ? text.creating : text.pay}
                </button>

                {paymentError && (
                  <p role="alert" className="mt-3 text-center text-sm font-semibold text-red-600">
                    {paymentError}
                  </p>
                )}

                <p className="mt-4 text-center text-xs font-medium leading-5 text-[#8792a2]">
                  {text.terms}
                </p>

                <div className="mt-auto flex items-center justify-center gap-2 pt-10 text-xs font-semibold text-[#a3acb9]">
                  <LockKeyhole className="h-3.5 w-3.5" />
                  {text.secure}
                </div>
                  </>
                )}
              </section>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
