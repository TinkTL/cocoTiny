import Link from 'next/link'
import { CircleAlert, PackageCheck } from 'lucide-react'
import { DownloadClient } from './download-client'
import {
  getDownloadOrder,
  isDownloadToken,
} from '@/lib/payment-orders'

export const dynamic = 'force-dynamic'

type DownloadPageProps = {
  params: Promise<{ token: string }>
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  const { token } = await params
  const order = isDownloadToken(token) ? await getDownloadOrder(token) : undefined
  const valid = Boolean(order)

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f9fc] px-5 py-16">
      <section className="w-full max-w-lg rounded-2xl border border-[#e3e8ee] bg-white p-8 text-center shadow-[0_20px_60px_rgba(10,37,64,0.12)]">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#f1f4f8]">
          {valid ? (
            <PackageCheck className="h-9 w-9 text-emerald-600" />
          ) : (
            <CircleAlert className="h-9 w-9 text-amber-600" />
          )}
        </div>

        <h1 className="mt-6 text-2xl font-bold text-[#0a2540]">
          {valid ? order!.title : '领取链接无效'}
        </h1>

        {valid ? (
          <>
            <p className="mt-3 text-sm leading-6 text-[#697386]">
              点击下载后将生成一个 5 分钟有效的安全地址。请勿转发本领取页面。
            </p>
            <p className="mt-2 text-xs text-[#8792a2]">
              领取链接有效至：
              {new Date(order!.downloadExpiresAt!).toLocaleString('zh-CN', {
                timeZone: 'Asia/Shanghai',
              })}
            </p>
            <DownloadClient
              token={token}
              initialRemaining={order!.downloadLimit - order!.downloadCount}
            />
          </>
        ) : (
          <p className="mt-3 text-sm leading-6 text-[#697386]">
            此链接可能已过期、领取次数已用完或已被新的领取邮件替换。
          </p>
        )}

        <Link
          href="/"
          className="mt-6 inline-flex rounded-md border border-[#d8dee8] px-5 py-3 text-sm font-bold text-[#0a2540]"
        >
          返回首页
        </Link>
      </section>
    </main>
  )
}
