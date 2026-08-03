'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  getAssetCover,
  homeFeatured,
  homeFeaturedCopy,
  resolveFeaturedAsset,
} from '@/lib/home-featured'
import { cn } from '@/lib/utils'
import { useLanguage } from './language-provider'

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-white/15 px-2 py-1 text-[11px] font-semibold text-white ring-1 ring-white/20">
      {children}
    </span>
  )
}

export function FeaturedGrid() {
  const { locale } = useLanguage()
  const featuredCopy = homeFeaturedCopy[locale]
  const editorConfig = homeFeatured.editorsPick
  const editorPack = resolveFeaturedAsset(editorConfig)

  return (
    <section className="mx-auto max-w-[1480px] px-4 pb-16 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[7fr_3fr]">
        <Link
          href={editorPack.route}
          className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-md shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple lg:min-h-[520px]"
        >
          <Image
            src={getAssetCover(editorPack.slug)}
            alt={editorPack.name[locale]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <span className="absolute left-5 top-5 rounded-full bg-sunny px-3 py-1 text-xs font-bold text-ink">
            {editorConfig.badge[locale]}
          </span>

          <div className="relative p-6 md:p-8">
            <p className="font-display text-sm font-medium uppercase tracking-widest text-white/70">
              {featuredCopy.assetPack}
            </p>
            <h3 className="font-display text-4xl font-bold tracking-wide text-white md:text-5xl">
              {editorPack.name[locale]}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
              {editorPack.hero[locale]}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {editorPack.tags[locale].map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </Link>

        <div className="grid grid-rows-2 gap-5">
          {homeFeatured.supporting.map((item) => {
            const pack = resolveFeaturedAsset(item)

            return (
              <Link
                key={item.slug}
                href={pack.route}
                className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-md shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple lg:min-h-0"
              >
                <Image
                  src={getAssetCover(pack.slug)}
                  alt={pack.name[locale]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <span
                  className={cn(
                    'absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold',
                    item.badgeColor,
                  )}
                >
                  {item.badge[locale]}
                </span>

                <div className="relative p-5">
                  <h3 className="font-display text-2xl font-bold leading-none tracking-wide text-white">
                    {pack.name[locale]}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pack.tags[locale].map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
