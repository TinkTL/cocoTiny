'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from './language-provider'

const featuredCardVisuals = [
  {
    image: '/games/pepper-grinder.png',
    badgeColor: 'bg-purple text-white',
  },
  {
    image: '/games/cocoon.png',
    badgeColor: 'bg-pink text-white',
  },
] as const

function Tag({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        'rounded-md px-2 py-1 text-[11px] font-semibold',
        dark ? 'bg-white/15 text-white ring-1 ring-white/20' : 'bg-ink/5 text-ink/70',
      )}
    >
      {children}
    </span>
  )
}

export function FeaturedGrid() {
  const { copy } = useLanguage()
  const featured = copy.home.featured

  return (
    <section className="mx-auto max-w-[1480px] px-4 pb-16 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[7fr_3fr]">
        {/* Large hero card — Silksong */}
        <article className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-md shadow-lg lg:min-h-[520px]">
          <Image
            src="/games/silksong.png"
            alt={`${featured.franchise}: ${featured.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <span className="absolute left-5 top-5 rounded-full bg-sunny px-3 py-1 text-xs font-bold text-ink">
            {featured.editorsPick}
          </span>

          <div className="relative p-6 md:p-8">
            <p className="font-display text-sm font-medium uppercase tracking-widest text-white/70">
              {featured.franchise}
            </p>
            <h3 className="font-display text-4xl font-bold tracking-wide text-white md:text-5xl">
              {featured.title}
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
              {featured.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <Tag key={tag} dark>
                  {tag}
                </Tag>
              ))}
            </div>
            <a
              href="#"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-sm font-bold text-ink shadow-md transition-transform hover:scale-105"
            >
              {featured.viewGame}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-cream">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </article>

        {/* Right column: two stacked landscape cards */}
        <div className="grid grid-rows-2 gap-5">
          {featured.cards.map((game, index) => (
            <article
              key={game.title}
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-md shadow-lg lg:min-h-0"
            >
              <Image
                src={featuredCardVisuals[index].image}
                alt={game.title.replace(/\n/g, ' ')}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {game.badge && (
                <span
                  className={cn(
                    'absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold',
                    featuredCardVisuals[index].badgeColor,
                  )}
                >
                  {game.badge}
                </span>
              )}

              <div className="relative p-5">
                <h3 className="whitespace-pre-line font-display text-2xl font-bold leading-none tracking-wide text-white">
                  {game.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {game.tags.map((t) => (
                    <Tag key={t} dark>
                      {t}
                    </Tag>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
