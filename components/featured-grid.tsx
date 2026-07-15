import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { featuredSmall } from '@/lib/games-data'

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
  return (
    <section className="mx-auto max-w-[1480px] px-4 pb-16 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[7fr_3fr]">
        {/* Large hero card — Silksong */}
        <article className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-md shadow-lg lg:min-h-[520px]">
          <Image
            src="/games/silksong.png"
            alt="Hollow Knight: Silksong"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <span className="absolute left-5 top-5 rounded-full bg-sunny px-3 py-1 text-xs font-bold text-ink">
            Editor&apos;s Pick
          </span>

          <div className="relative p-6 md:p-8">
            <p className="font-display text-sm font-medium uppercase tracking-widest text-white/70">
              Hollow Knight
            </p>
            <h3 className="font-display text-4xl font-bold tracking-wide text-white md:text-5xl">
              SILKSONG
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
              Venture through a haunting, handcrafted world in this eagerly awaited sequel.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag dark>Action</Tag>
              <Tag dark>Adventure</Tag>
              <Tag dark>Metroidvania</Tag>
            </div>
            <a
              href="#"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-sm font-bold text-ink shadow-md transition-transform hover:scale-105"
            >
              View Game
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-cream">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </article>

        {/* Right column: two stacked landscape cards */}
        <div className="grid grid-rows-2 gap-5">
          {featuredSmall.slice(0, 2).map((game) => (
            <article
              key={game.title}
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-md shadow-lg lg:min-h-0"
            >
              <Image
                src={game.image}
                alt={game.title.replace(/\n/g, ' ')}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {game.badge && (
                <span
                  className={cn(
                    'absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold',
                    game.badgeColor,
                  )}
                >
                  {game.badge}
                </span>
              )}

              <div className="relative p-5">
                <h3 className="whitespace-pre-line font-display text-2xl font-bold leading-none tracking-wide text-white">
                  {game.title}
                </h3>
                {game.subtitle && (
                  <p className="mt-1 font-display text-sm font-semibold uppercase tracking-widest text-white/80">
                    {game.subtitle}
                  </p>
                )}
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
