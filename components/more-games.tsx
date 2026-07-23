'use client'

import Image from 'next/image'
import Link from 'next/link'
import { moreGames } from '@/lib/games-data'
import { Petal } from './decorations'
import { useLanguage } from './language-provider'

export function MoreGames() {
  const { copy } = useLanguage()
  const moreCopy = copy.home.more

  return (
    <section className="mx-auto max-w-[1480px] px-4 pb-16 sm:px-6 lg:px-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="relative">
          <Petal className="absolute -left-7 top-1 h-5 w-4" color="var(--pink)" rotate={30} />
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
            {moreCopy.heading}
          </h2>
          <span className="mt-1 block h-1 w-40 rounded-full bg-purple/70" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {moreGames.map((game, index) => {
          const localizedGame = moreCopy.cards[index]
          const card = (
            <article className="group relative flex aspect-video flex-col justify-end overflow-hidden rounded shadow-md">
              <Image
                src={game.image}
                alt={localizedGame.title.replace(/\n/g, ' ')}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="relative p-4">
                <h3 className="whitespace-pre-line font-display text-xl font-bold leading-none tracking-wide text-white">
                  {localizedGame.title}
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {localizedGame.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold text-white ring-1 ring-white/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          )

          return game.href ? (
            <Link
              key={game.title}
              href={game.href}
              aria-label={`${moreCopy.explore} ${localizedGame.title}`}
              className="block rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
            >
              {card}
            </Link>
          ) : (
            <div key={game.title}>{card}</div>
          )
        })}
      </div>
    </section>
  )
}
