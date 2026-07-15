'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Petal, Sparkle } from './decorations'

const slides = [
  {
    badge: 'FEATURED EVENT',
    title: 'Wholesome\nDirect 2026',
    date: 'June 6, 2026',
    desc: 'A cozy celebration of indie games worth playing.',
    image: '/games/wholesome-direct.png',
  },
  {
    badge: 'LIVE SHOWCASE',
    title: 'Indie\nWorlds Expo',
    date: 'July 20, 2026',
    desc: 'Discover hand-crafted worlds from tiny studios.',
    image: '/games/sea-of-stars.png',
  },
  {
    badge: 'COMMUNITY PICK',
    title: 'Cozy Nights\nStream',
    date: 'August 3, 2026',
    desc: 'Relaxing games to unwind with, curated by fans.',
    image: '/games/coffee-talk.png',
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const slide = slides[current]

  const go = (dir: number) => {
    setCurrent((c) => (c + dir + slides.length) % slides.length)
  }

  return (
    <section className="relative mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-10 px-4 pb-12 pt-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-10">
      {/* Left: title + copy */}
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
          CocoTiny selects independent game art assets full of emotions, creativity, and bold ideas!
        </p>
      </div>

      {/* Right: featured event carousel */}
      <div className="relative overflow-hidden rounded-md shadow-xl ring-1 ring-ink/5">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/11]">
          <Image
            src={slide.image}
            alt={slide.title.replace('\n', ' ')}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8">
            <span className="mb-3 inline-flex w-fit rounded-full bg-teal px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              {slide.badge}
            </span>
            <h2 className="whitespace-pre-line font-display text-3xl font-bold leading-tight text-white md:text-4xl">
              {slide.title}
            </h2>
            <p className="mt-2 font-display text-lg font-medium text-white/90">{slide.date}</p>
            <p className="mt-1 max-w-xs text-sm leading-relaxed text-white/80">{slide.desc}</p>

            <a
              href="#"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-sm font-bold text-ink shadow-md transition-transform hover:scale-105"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink text-white">
                <Play className="h-3 w-3 fill-current" />
              </span>
              Watch on YouTube
            </a>
          </div>

          {/* Controls */}
          <div className="absolute bottom-5 right-5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink shadow-md transition-transform hover:scale-110"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink shadow-md transition-transform hover:scale-110"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === current ? 'w-5 bg-white' : 'w-2 bg-white/50',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
