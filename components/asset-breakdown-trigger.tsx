'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from './language-provider'

export type BreakdownSheet = {
  title: string
  image: string
  width: number
  height: number
}

export function AssetBreakdownTrigger({
  assetTitle,
  sheets,
  unlockMessage,
}: {
  assetTitle: string
  sheets: BreakdownSheet[]
  unlockMessage?: string
}) {
  const { locale, copy } = useLanguage()
  const [open, setOpen] = useState(false)
  const breakdown = copy.windmill.breakdown
  const viewAria =
    locale === 'zh'
      ? `查看${assetTitle}拆解图`
      : `View ${assetTitle} breakdown sheets`
  const dialogAria =
    locale === 'zh' ? `${assetTitle}拆解图` : `${assetTitle} breakdown sheets`

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
        aria-label={viewAria}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="group/breakdown absolute inset-0 z-20 cursor-zoom-in rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2b84b]"
      >
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] overflow-y-auto bg-[#1b100c]/90 p-3 backdrop-blur-md sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={dialogAria}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false)
            }}
          >
            <div className="mx-auto my-3 max-w-6xl overflow-hidden rounded border border-[#efce83]/25 bg-[#f8efd4] shadow-2xl sm:my-8">
              <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#c9984b]/25 bg-[#fff8e6]/95 px-5 py-4 backdrop-blur-md sm:px-7">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#ad6d2c]">
                    {breakdown.heading}
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#4d2d1b] sm:text-3xl">
                    {assetTitle}
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label={breakdown.close}
                  onClick={() => setOpen(false)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#4b2c1b] text-white transition hover:rotate-6 hover:bg-[#774322] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b87931]"
                >
                  <X className="h-5 w-5" />
                </button>
              </header>

              <div className="grid gap-5 p-4 sm:p-7">
                {sheets.map((sheet) => (
                  <figure
                    key={sheet.title}
                    className="overflow-hidden rounded border border-[#bd8740]/25 bg-[#e6c47d] shadow-[0_12px_35px_rgba(79,47,20,0.12)]"
                  >
                    <Image
                      src={sheet.image}
                      alt={`${assetTitle} ${sheet.title}`}
                      width={sheet.width}
                      height={sheet.height}
                      sizes="(min-width: 1200px) 1100px, 95vw"
                      className="h-auto w-full"
                    />
                    <figcaption className="border-t border-[#bd8740]/25 bg-[#fff9e9] px-5 py-3 font-display text-sm font-bold text-[#654029]">
                      {sheet.title}
                    </figcaption>
                  </figure>
                ))}
                {unlockMessage && (
                  <p className="border-t border-[#bd8740]/25 px-3 py-4 text-center font-display text-base font-bold text-[#7a4b28] sm:text-lg">
                    {unlockMessage}
                  </p>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
