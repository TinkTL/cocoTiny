'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Images,
  Layers3,
  Map,
  PackageOpen,
  Sparkles,
  UsersRound,
  Wheat,
} from 'lucide-react'
import { AssetBreakdownTrigger } from '@/components/asset-breakdown-trigger'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLanguage } from '@/components/language-provider'
import { UnlockAssetPackButton } from '@/components/unlock-asset-pack-button'
import { formatTranslation } from '@/lib/translations'

const previewCounts = {
  characters: 3,
  scenes: 1,
  buildings: 4,
} as const

const fullPackCounts = {
  characters: 5,
  animations: 75,
  scenes: 15,
  buildings: 19,
} as const

const sceneBreakdowns = (slug: string) => [
  {
    title: 'Buildings layer',
    image: `/assets/windmillbakery/detail/scenes/${slug}/buildings-sheet.png`,
    width: 1672,
    height: 941,
  },
  {
    title: 'Ground layer',
    image: `/assets/windmillbakery/detail/scenes/${slug}/ground-sheet.png`,
    width: 1672,
    height: 941,
  },
  {
    title: 'Objects layer',
    image: `/assets/windmillbakery/detail/scenes/${slug}/objects-sheet.png`,
    width: 1672,
    height: 941,
  },
]

const unitExpressionBreakdown = (slug: string) => [
  {
    title: 'Expressions sheet',
    image: `/assets/windmillbakery/detail/units/${slug}/expressions.png`,
    width: 1672,
    height: 941,
  },
]

const scenes = [
  {
    title: 'The Bakery Courtyard',
    note: 'Your warm, working heart of the village',
    image: '/assets/windmillbakery/detail/scenes/courtyard.png',
    breakdowns: sceneBreakdowns('courtyard'),
  },
]

const buildings = [
  {
    title: 'Windmill Bakery',
    image: '/assets/windmillbakery/detail/buildings/bakery.png',
    breakdowns: [
      {
        title: 'Building parts sheet',
        image: '/assets/windmillbakery/detail/buildings/bakery/parts-sheet.png',
        width: 1915,
        height: 821,
      },
    ],
  },
  {
    title: 'Stone Oven',
    image: '/assets/windmillbakery/detail/buildings/oven.png',
    breakdowns: [
      {
        title: 'Building parts sheet',
        image: '/assets/windmillbakery/detail/buildings/oven/parts-sheet.png',
        width: 1915,
        height: 821,
      },
    ],
  },
  {
    title: 'Wheatfield Station',
    image: '/assets/windmillbakery/detail/buildings/station.png',
    breakdowns: [
      {
        title: 'Building parts sheet',
        image: '/assets/windmillbakery/detail/buildings/station/parts-sheet.png',
        width: 1915,
        height: 821,
      },
    ],
  },
  {
    title: 'Treehouse Bakery',
    image: '/assets/windmillbakery/detail/buildings/treehouse.png',
    breakdowns: [
      {
        title: 'Building parts sheet',
        image: '/assets/windmillbakery/detail/buildings/treehouse/parts-sheet.png',
        width: 1915,
        height: 821,
      },
    ],
  },
]

const characters = [
  {
    title: 'Maimai Baker',
    role: 'The heart of the bakery',
    image: '/assets/windmillbakery/detail/units/baker-idle.gif',
    width: 181,
    height: 243,
    breakdowns: unitExpressionBreakdown('baker'),
    animationCount: 15,
  },
  {
    title: 'Wheat Farmer',
    role: 'Keeper of the golden fields',
    image: '/assets/windmillbakery/detail/units/farmer-idle.gif',
    width: 165,
    height: 241,
    breakdowns: unitExpressionBreakdown('farmer'),
    animationCount: 15,
  },
  {
    title: 'Master Baker',
    role: 'Guardian of old recipes',
    image: '/assets/windmillbakery/detail/units/master-idle.gif',
    width: 159,
    height: 212,
    breakdowns: unitExpressionBreakdown('master'),
    animationCount: 15,
  },
]

function SectionTitle({
  eyebrow,
  title,
  copy,
  inverted = false,
}: {
  eyebrow: string
  title: string
  copy: string
  inverted?: boolean
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <div
        className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] ${
          inverted
            ? 'border-[#f1ca6b]/30 bg-[#fff8df]/10 text-[#f4ce75]'
            : 'border-[#d7a33a]/35 bg-[#fff8df] text-[#9b5d20]'
        }`}
      >
        <Wheat className="h-4 w-4" />
        {eyebrow}
      </div>
      <h2
        className={`font-display text-4xl font-bold tracking-tight md:text-6xl ${
          inverted ? 'text-[#fff4d6]' : 'text-[#4a2a19]'
        }`}
      >
        {title}
      </h2>
      <p
        className={`mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 md:text-lg ${
          inverted ? 'text-[#dbc9ac]' : 'text-[#76533c]'
        }`}
      >
        {copy}
      </p>
    </div>
  )
}

export default function WindmillBakeryPage() {
  const { copy } = useLanguage()
  const windmill = copy.windmill
  const characterUnlock = formatTranslation(windmill.characters.unlock, {
    characters: fullPackCounts.characters - previewCounts.characters,
    animations: fullPackCounts.animations,
  })
  const sceneUnlock = formatTranslation(windmill.scenes.unlock, {
    scenes: fullPackCounts.scenes - previewCounts.scenes,
  })
  const buildingUnlock = formatTranslation(windmill.buildings.unlock, {
    buildings: fullPackCounts.buildings - previewCounts.buildings,
  })

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8efcf] text-[#4a2a19]">
      <section className="relative min-h-[640px] overflow-hidden bg-[#241b20] md:min-h-[760px]">
        <Image
          src="/assets/windmillbakery/cover-en.png"
          alt="Windmill Bakery cover art"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d1018]/70 via-transparent to-[#1f130d]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_28%,transparent_0,transparent_24%,rgba(29,16,24,0.35)_72%)]" />

        <nav className="relative z-10 mx-auto flex max-w-[1480px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#2a1816]/45 px-4 py-2.5 text-sm font-bold text-white shadow-lg backdrop-blur-md transition hover:bg-[#2a1816]/70"
          >
            <ArrowLeft className="h-4 w-4" />
            {windmill.back}
          </Link>
          <div className="flex items-center gap-3">
            <Image
              src="/cocotiny-logo.png"
              alt="CocoTiny"
              width={180}
              height={60}
              className="hidden h-10 w-auto brightness-0 invert sm:block sm:h-12"
            />
            <LanguageSwitcher inverted />
          </div>
        </nav>

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto max-w-[1480px] px-5 pb-14 sm:px-8 md:pb-20 lg:px-12">
            <div className="max-w-2xl">
              <div className="mb-4 flex flex-wrap gap-2">
                {windmill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#f8d881]/45 bg-[#3b2617]/60 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#ffe8a8] backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="max-w-xl text-lg font-semibold leading-8 text-[#fff5d8] drop-shadow md:text-xl">
                {windmill.hero}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                <UnlockAssetPackButton
                  assetSlug="windmillbakery"
                  packTitle="WINDMILLBAKERY"
                  packName={{ en: 'Windmill Bakery', zh: '风车面包坊' }}
                  cover="/assets/windmillbakery/cover-en.png"
                  stats={{ images: 130, logicalAssets: 41, scenes: 15, characters: 5 }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f3b93f] px-6 py-3.5 text-sm font-extrabold text-[#3d2417] shadow-[0_10px_35px_rgba(235,164,41,0.3)] transition hover:-translate-y-0.5 hover:bg-[#ffd261]"
                />
                <a
                  href="#characters"
                  className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-extrabold text-white underline decoration-transparent decoration-2 underline-offset-8 transition hover:decoration-white"
                >
                  {windmill.explore}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-7 max-w-6xl px-5 sm:px-8">
        <div className="grid overflow-hidden rounded border border-[#d8b56b]/45 bg-[#fff9e8] shadow-[0_24px_80px_rgba(93,58,23,0.18)] sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Images },
            { icon: PackageOpen },
            { icon: Map },
            { icon: UsersRound },
          ].map(({ icon: Icon }, index) => (
            <div
              key={windmill.stats[index]}
              className="flex items-center gap-4 border-b border-[#d8b56b]/30 p-6 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded bg-[#f2c45f]/25 text-[#aa6721]">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-3xl font-bold leading-none text-[#4a2a19]">
                  {windmill.statValues[index]}
                </div>
                <div className="mt-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#9a7252]">
                  {windmill.stats[index]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 md:py-32">
        <Wheat className="absolute -left-12 top-16 h-56 w-56 -rotate-12 text-[#e5bd57]/25" />
        <Wheat className="absolute -right-10 bottom-5 h-48 w-48 rotate-[120deg] text-[#df9e42]/20" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <span className="font-display text-sm font-bold uppercase tracking-[0.24em] text-[#b66b27]">
              {windmill.intro.eyebrow}
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[0.98] tracking-tight text-[#4a2a19] md:text-7xl">
              {windmill.intro.title}
            </h1>
          </div>
          <div className="rounded border border-[#c99543]/35 bg-[#fff9e8]/85 p-7 shadow-[0_18px_60px_rgba(116,75,30,0.1)] backdrop-blur sm:p-10">
            <p className="text-xl font-bold leading-8 text-[#62412b]">
              {windmill.intro.description}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {windmill.intro.features.map(([title, description]) => (
                <div key={title} className="rounded bg-[#f4e4b8]/55 p-4">
                  <div className="font-display text-base font-bold text-[#60391f]">{title}</div>
                  <div className="mt-1 text-sm font-semibold leading-6 text-[#84634c]">
                    {description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col">
      <section id="inside" className="order-2 bg-[#4e3825] px-5 py-24 text-[#fff3cc] sm:px-8 md:py-32">
        <div className="mx-auto max-w-[1380px]">
          <SectionTitle
            eyebrow={windmill.scenes.eyebrow}
            title={windmill.scenes.title}
            copy={windmill.scenes.description}
            inverted
          />
          <div className="grid gap-5 md:grid-cols-2">
            {scenes.slice(0, previewCounts.scenes).map((scene, index) => {
              const [title, note] = windmill.scenes.items[index]
              const sheets = scene.breakdowns.map((sheet, sheetIndex) => ({
                ...sheet,
                title: windmill.breakdown.sceneSheets[sheetIndex],
              }))

              return (
                <article
                  key={scene.title}
                  className={`group relative aspect-video overflow-hidden rounded border border-[#f4d98a]/20 bg-[#251b14] shadow-2xl ${
                    index === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <Image
                    src={scene.image}
                    alt={title}
                    fill
                    sizes={index === 0 ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21140d]/90 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                      {title}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[#f5db9d]">{note}</div>
                  </div>
                  <AssetBreakdownTrigger assetTitle={title} sheets={sheets} />
                </article>
              )
            })}
          </div>
          <div className="mx-auto mt-8 max-w-4xl rounded border border-[#f4d98a]/25 bg-[#2f2117]/55 px-6 py-5 text-center shadow-[0_16px_40px_rgba(30,20,12,0.16)]">
            <div className="flex items-center justify-center gap-2 font-display text-lg font-bold leading-7 text-[#ffe29a] sm:text-xl">
              <Sparkles className="h-5 w-5 shrink-0 text-[#f5ca59]" />
              <span>{sceneUnlock}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="buildings" className="relative order-3 bg-[#f5e9c6] px-5 py-24 sm:px-8 md:py-32">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(#b47a35_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative mx-auto max-w-[1380px]">
          <SectionTitle
            eyebrow={windmill.buildings.eyebrow}
            title={windmill.buildings.title}
            copy={windmill.buildings.description}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {buildings.slice(0, previewCounts.buildings).map((building, index) => {
              const title = windmill.buildings.items[index]
              const sheets = building.breakdowns.map((sheet) => ({
                ...sheet,
                title: windmill.breakdown.buildingSheet,
              }))

              return (
                <article
                  key={building.title}
                  className="group relative overflow-hidden rounded border border-[#c7984f]/35 bg-[#fff9e8] shadow-[0_16px_45px_rgba(95,61,24,0.12)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_center,#f8e4aa_0,#e8c777_48%,#bd843d_100%)]">
                    <Image
                      src={building.image}
                      alt={title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-2 transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-[#53301d]">{title}</h3>
                  </div>
                  <AssetBreakdownTrigger assetTitle={title} sheets={sheets} />
                </article>
              )
            })}
          </div>
          <div className="mx-auto mt-8 max-w-4xl rounded border border-[#c7984f]/40 bg-[#fff9e8]/85 px-6 py-5 text-center shadow-[0_16px_40px_rgba(95,61,24,0.1)]">
            <div className="flex items-center justify-center gap-2 font-display text-lg font-bold leading-7 text-[#7d4a24] sm:text-xl">
              <Sparkles className="h-5 w-5 shrink-0 text-[#c98228]" />
              <span>{buildingUnlock}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="characters" className="relative order-1 overflow-hidden bg-[#5b7b4a] px-5 py-24 sm:px-8 md:py-32">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#efc95e]/20 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-[#d56d37]/20 blur-3xl" />
        <div className="relative mx-auto max-w-[1380px]">
          <SectionTitle
            eyebrow={windmill.characters.eyebrow}
            title={windmill.characters.title}
            copy={windmill.characters.description}
            inverted
          />
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
            {characters.slice(0, previewCounts.characters).map((character, index) => {
              const [title, role] = windmill.characters.items[index]
              const sheets = [
                {
                  ...character.breakdowns[0],
                  title: windmill.breakdown.unitSheets[0],
                },
              ]
              const unlockMessage = windmill.breakdown.lockedAnimations.replace(
                '{count}',
                String(character.animationCount - 3),
              )

              return (
                <article
                  key={character.title}
                  className="relative flex min-h-[340px] flex-col overflow-hidden rounded border border-white/20 bg-[#fff8de] shadow-[0_20px_45px_rgba(27,49,20,0.22)]"
                >
                  <div className="relative flex flex-1 items-end justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_70%,#f7d87c_0,#e3ad4f_28%,#7f9d5f_68%,#577144_100%)] px-3 pt-7">
                    <div className="absolute bottom-4 h-8 w-32 rounded-[50%] bg-[#25391d]/20 blur-sm" />
                    <Image
                      src={character.image}
                      alt={title}
                      width={character.width}
                      height={character.height}
                      unoptimized
                      className="relative z-10 max-h-[230px] w-auto object-contain [image-rendering:auto]"
                    />
                  </div>
                  <div className="min-h-24 p-4">
                    <h3 className="font-display text-lg font-bold text-[#50301d]">{title}</h3>
                    <p className="mt-1 text-xs font-bold leading-5 text-[#8b684e]">{role}</p>
                  </div>
                  <AssetBreakdownTrigger
                    assetTitle={title}
                    sheets={sheets}
                    unlockMessage={unlockMessage}
                  />
                </article>
              )
            })}
          </div>
          <div className="mx-auto mt-8 max-w-4xl rounded border border-[#f5ca59]/35 bg-[#314828]/45 px-6 py-5 text-center shadow-[0_16px_40px_rgba(27,49,20,0.18)]">
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#f8efc9]">
              <Sparkles className="h-4 w-4 shrink-0 text-[#f5ca59]" />
              <span>{windmill.characters.note}</span>
            </div>
            <p className="mt-2 font-display text-xl font-bold leading-7 text-[#ffe590] sm:text-2xl">
              {characterUnlock}
            </p>
          </div>
        </div>
      </section>

      <section id="interface" className="order-4 bg-[#fbf3dc] px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#d75e36]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#a5482b]">
              <Layers3 className="h-4 w-4" />
              {windmill.interface.eyebrow}
            </div>
            <h2 className="font-display text-5xl font-bold leading-none text-[#4a2a19] md:text-6xl">
              {windmill.interface.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-[#78553e]">
              {windmill.interface.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {windmill.interface.tags.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#c69453]/40 bg-white px-4 py-2 text-xs font-extrabold text-[#755035]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded border border-[#c8954d]/40 bg-[#d7a256] p-2 shadow-[0_25px_70px_rgba(92,54,21,0.22)] sm:p-4">
            <Image
              src="/assets/windmillbakery/detail/ui/ui-kit.png"
              alt={windmill.interface.title}
              width={1448}
              height={1086}
              className="h-auto w-full rounded"
            />
          </div>
        </div>
      </section>
      </div>

      <section className="relative overflow-hidden bg-[#281914] px-5 py-24 text-center text-[#fff4d6] sm:px-8 md:py-32">
        <div className="absolute left-1/2 top-0 h-80 w-[700px] -translate-x-1/2 rounded-full bg-[#d89535]/20 blur-[100px]" />
        <Wheat className="absolute -bottom-16 -left-8 h-72 w-72 -rotate-12 text-[#dfa747]/15" />
        <Wheat className="absolute -bottom-20 -right-8 h-72 w-72 rotate-[105deg] text-[#dfa747]/15" />
        <div className="relative mx-auto max-w-4xl">
          <h2 className="whitespace-nowrap font-display text-[clamp(1.5rem,5vw,4.5rem)] font-bold leading-none">
            {windmill.closing.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 text-[#dbc9b5]">
            {windmill.closing.description}
          </p>
          <div className="mx-auto mt-9 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
            {windmill.closing.features.map(([title, description]) => (
              <div key={title} className="rounded border border-white/10 bg-white/5 p-5">
                <div className="font-display text-lg font-bold text-[#ffe19a]">{title}</div>
                <div className="mt-1 text-sm font-semibold text-[#bda99a]">{description}</div>
              </div>
            ))}
          </div>
          <UnlockAssetPackButton
            assetSlug="windmillbakery"
            packTitle="WINDMILLBAKERY"
            packName={{ en: 'Windmill Bakery', zh: '风车面包坊' }}
            cover="/assets/windmillbakery/cover-en.png"
            stats={{ images: 130, logicalAssets: 41, scenes: 15, characters: 5 }}
            icon="package"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#f2b83e] px-7 py-4 text-sm font-extrabold text-[#3e2416] shadow-[0_15px_45px_rgba(232,159,41,0.25)] transition hover:-translate-y-0.5 hover:bg-[#ffd66c]"
          />
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#c8b8aa] transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {windmill.closing.back}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
