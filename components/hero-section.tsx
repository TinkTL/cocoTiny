'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { homeFeatured } from '@/lib/home-featured'
import { cn } from '@/lib/utils'
import { Petal, Sparkle } from './decorations'
import { useLanguage } from './language-provider'

export function HeroSection() {
  const { copy, locale } = useLanguage()
  const [current, setCurrent] = useState(0)
  const banner = homeFeatured.hero[current]

  const go = (dir: number) => {
    setCurrent((index) => (index + dir + homeFeatured.hero.length) % homeFeatured.hero.length)
  }

  return (
    <section className="relative mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-10 px-4 pb-12 pt-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-10">
      <div className="relative">
        <Sparkle className="absolute -left-2 -top-8 h-6 w-6 md:h-8 md:w-8" color="var(--sunny)" />
        <Sparkle className="absolute left-24 -top-12 h-4 w-4" color="var(--teal)" />
        <Sparkle className="absolute left-40 -top-4 h-3 w-3" color="var(--sky)" />
        <Petal className="absolute -left-6 top-24 h-6 w-5" color="var(--purple)" rotate={40} />
        <Petal className="absolute -left-8 top-36 h-5 w-4" color="var(--pink)" rotate={-20} />

        <Image
          src="/hero-title.png"
          alt="Game Assets — The Best Game Assets"
          width={1200}
          height={860}
          priority
          className="w-full max-w-xl drop-shadow-sm"
        />

        <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-ink/70">
          {copy.home.hero.description}
        </p>
      </div>

      <div className="relative overflow-hidden rounded-md shadow-xl ring-1 ring-ink/5">
        <div className="relative aspect-video w-full">
          <Image
            src={banner.image}
            alt={banner.title[locale]}
            fill
            priority
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />

          <Link
            href={banner.href}
            aria-label={banner.title[locale]}
            className="absolute inset-0 z-[1] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          />

          <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-center p-6 md:p-8">
            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
              {banner.title[locale]}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
              {banner.description[locale]}
            </p>
          </div>

          <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={copy.home.hero.previous}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink shadow-md transition-transform hover:scale-110"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={copy.home.hero.next}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink shadow-md transition-transform hover:scale-110"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {homeFeatured.hero.map((item, index) => (
              <button
                key={item.href}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`${copy.home.hero.goToSlide} ${index + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all',
                  index === current ? 'w-5 bg-white' : 'w-2 bg-white/50',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
