'use client'

import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export function DownloadClient({
  token,
  initialRemaining,
}: {
  token: string
  initialRemaining: number
}) {
  const [remaining, setRemaining] = useState(initialRemaining)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function download() {
    if (loading || remaining <= 0) return
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `/api/downloads/${encodeURIComponent(token)}/claim`,
        { method: 'POST' },
      )
      const result = (await response.json()) as {
        url?: string
        remaining?: number
        error?: string
      }

      if (!response.ok || !result.url) {
        throw new Error(result.error || '暂时无法生成下载地址')
      }

      setRemaining(result.remaining ?? Math.max(0, remaining - 1))
      window.location.assign(result.url)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : '暂时无法下载，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-bold text-[#0a2540]">完整版资产包</span>
        <span className="rounded-md bg-[#eeeaff] px-2.5 py-1.5 text-xs font-bold text-[#6255d2]">
          剩余 {remaining} / 3 次
        </span>
      </div>
      <button
        type="button"
        onClick={download}
        disabled={loading || remaining <= 0}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#635bff] px-5 py-4 text-sm font-bold text-white shadow-[0_5px_12px_rgba(99,91,255,0.25)] disabled:cursor-not-allowed disabled:opacity-55"
      >
        {loading && <LoaderCircle className="h-5 w-5 animate-spin" />}
        {loading ? '正在生成安全下载地址' : '下载完整资产包'}
      </button>
      <p className="mt-3 text-center text-xs font-medium text-[#98a3af]">
        安全地址仅本次有效 5 分钟 · 请勿转发领取页
      </p>
      {error && (
        <p role="alert" className="mt-3 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}
    </>
  )
}
