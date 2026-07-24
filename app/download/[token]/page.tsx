import Image from 'next/image'
import { DownloadClient } from './download-client'
import { OrderProductShell } from '@/components/order-product-shell'
import { getDownloadOrder, isDownloadToken } from '@/lib/payment-orders'
import { getOrderProductPresentation } from '@/lib/order-product-presentation'

export const dynamic = 'force-dynamic'

type DownloadPageProps = {
  params: Promise<{ token: string }>
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  const { token } = await params
  const order = isDownloadToken(token) ? await getDownloadOrder(token) : undefined
  const valid = Boolean(order)
  const product = getOrderProductPresentation(
    order?.assetSlug || 'gardenia-herb-society',
    order?.title,
  )

  return (
    <OrderProductShell product={product}>
      <div className="flex h-full flex-col">
        <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8792a2]">安全领取</div>
        <h2 className="mt-3 font-display text-2xl font-bold text-[#0a2540]">
          {valid ? '资产包已准备好' : '领取链接无效'}
        </h2>

        {valid ? (
          <>
            <div className="mt-7 rounded-xl border border-[#e1e7ed] bg-[#fafbfc] p-4">
              <div className="flex items-center justify-between gap-4 py-1.5 text-xs">
                <span className="font-semibold text-[#7f8c9b]">领取有效期</span>
                <strong className="text-[#0a2540]">
                  {new Date(order!.downloadExpiresAt!).toLocaleString('zh-CN', {
                    timeZone: 'Asia/Shanghai',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 text-xs">
                <span className="font-semibold text-[#7f8c9b]">资产包</span>
                <strong className="text-[#0a2540]">{product.title}</strong>
              </div>
            </div>
            <DownloadClient
              token={token}
              initialRemaining={order!.downloadLimit - order!.downloadCount}
            />
          </>
        ) : (
          <p className="mt-5 text-sm leading-6 text-[#697386]">
            此链接可能已经过期、领取次数已经用完，或已被新的领取邮件替换。
          </p>
        )}

        <Image src="/cocotiny-logo.png" alt="CocoTiny" width={1179} height={405} className="mx-auto mt-10 h-auto w-[250px] max-w-[78%]" />
        <p className="mt-auto pt-5 text-center text-xs leading-5 text-[#8792a2]">
          遇到错误？联系{' '}
          <a className="font-semibold text-[#635bff]" href="mailto:w211299486@gmail.com">w211299486@gmail.com</a>
          {' / '}
          <a className="font-semibold text-[#635bff]" href="mailto:211299486@qq.com">211299486@qq.com</a>
        </p>
      </div>
    </OrderProductShell>
  )
}
