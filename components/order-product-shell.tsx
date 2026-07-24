import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Check, X } from 'lucide-react'
import type { ReactNode } from 'react'
import type { OrderProductPresentation } from '@/lib/order-product-presentation'

export function OrderProductShell({
  product,
  children,
}: {
  product: OrderProductPresentation
  children: ReactNode
}) {
  const included = [
    `${product.stats.images} 张 RGBA 图片`,
    `${product.stats.logicalAssets} 个整理资产`,
    `${product.stats.scenes} 张完整场景`,
    `${product.stats.characters} 位动画角色`,
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#10283b] px-3 py-6 sm:px-6 sm:py-10">
      <div className="absolute inset-[-28px]">
        <Image src={product.cover} alt="" fill priority sizes="100vw" className="scale-110 object-cover blur-xl" />
        <div className="absolute inset-0 bg-[#071b2d]/75" />
      </div>

      <div className="relative mx-auto grid min-h-[620px] w-full max-w-[960px] overflow-hidden rounded-lg bg-white shadow-[0_30px_100px_rgba(0,0,0,0.4)] lg:grid-cols-2">
        <Link href={product.route} aria-label="关闭" className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full text-[#697386] transition hover:bg-[#f1f4f8] hover:text-[#0a2540]">
          <X className="h-5 w-5" />
        </Link>

        <section className="flex flex-col bg-[#f6f9fc] px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
          <Link href={product.route} className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#697386] transition hover:text-[#0a2540]">
            <ArrowLeft className="h-4 w-4" />
            返回 CocoTiny
          </Link>
          <div className="mt-10 text-sm font-semibold text-[#697386]">支付给 CocoTiny</div>
          <div className="mt-2 flex items-baseline text-[#0a2540]">
            <span className="mr-1 text-2xl font-semibold">¥</span>
            <span className="text-5xl font-bold tracking-tight">0.10</span>
          </div>
          <div className="mt-8 flex gap-4 rounded-lg border border-[#e3e8ee] bg-white p-4 shadow-[0_2px_5px_rgba(50,50,93,0.08)]">
            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-[#0a2540]">
              <Image src={product.cover} alt={`${product.title} cover`} fill sizes="112px" className="object-cover" />
            </div>
            <div className="min-w-0 py-1">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8792a2]">完整版资产包</div>
              <h1 className="mt-1 font-display text-xl font-bold text-[#0a2540]">{product.name}</h1>
              <div className="mt-1 truncate text-xs font-semibold text-[#8792a2]">{product.title}</div>
            </div>
          </div>
          <div className="mt-8 text-xs font-bold uppercase tracking-[0.12em] text-[#697386]">本次购买包含</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[#425466]">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e7e5ff] text-[#635bff]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-auto pt-10 text-xs font-semibold text-[#a3acb9]">由 CocoTiny 提供</div>
        </section>

        <section className="flex min-h-[620px] flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:pt-20">
          {children}
        </section>
      </div>
    </main>
  )
}
