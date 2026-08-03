'use client'

import type { CSSProperties } from 'react'
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
} from 'lucide-react'
import { AssetBreakdownTrigger } from '@/components/asset-breakdown-trigger'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLanguage } from '@/components/language-provider'
import { UnlockAssetPackButton } from '@/components/unlock-asset-pack-button'
import type { AssetPack, LocalizedText } from '@/lib/asset-pack-data'

const copy = {
  en: {
    back: 'All asset packs',
    unlock: 'Unlock the full asset pack!',
    explore: 'Explore the pack',
    stats: ['RGBA images', 'logical assets', 'complete scenes', 'characters'],
    introEyebrow: 'A complete visual world',
    introFeatures: [
      ['One cohesive direction', 'Characters, scenes, buildings, and UI share one visual language.'],
      ['Ready for storytelling', 'A recognizable cast and world give your game a strong first impression.'],
      ['Built for production', 'Organized transparent assets and breakdown sheets make iteration practical.'],
      ['Room to grow', 'Start with a polished core and unlock the broader world when you need it.'],
    ],
    charactersEyebrow: 'Meet the cast',
    charactersTitle: 'Characters with a life beyond the frame',
    charactersDescription:
      'Three selected characters introduce the personality of the pack. Open a card to inspect its expression sheet.',
    characterNote: 'Each character includes 15 source animation sequences across five action groups.',
    characterUnlock: (characters: number, animations: number) =>
      `${characters} more characters await in the full pack, with ${animations} animation sequences across the complete cast ready to unlock!`,
    characterModalUnlock: '12 more character animation sequences are waiting to be unlocked!',
    sceneEyebrow: 'A glimpse of the world',
    sceneTitle: 'Begin with one place worth remembering',
    sceneDescription:
      'This selected scene shows how the pack handles atmosphere, readable layout, and environmental storytelling.',
    sceneUnlock: (scenes: number) =>
      `${scenes} more complete scenes are waiting to be unlocked, carrying this world into new routes, seasons, and stories!`,
    buildingsEyebrow: 'Modular landmarks',
    buildingsTitle: 'Give every corner a clear identity',
    buildingsDescription: (buildings: number) =>
      `Preview four practical landmarks from a complete set of ${buildings} buildings, each prepared with a matching parts sheet.`,
    buildingsUnlock: (buildings: number) =>
      `${buildings} more buildings are waiting to be unlocked for richer villages, routes, and landmarks!`,
    uiEyebrow: 'A matching interface',
    uiTitle: 'Carry the art direction into every menu',
    uiDescription:
      'The included interface kit keeps panels, buttons, meters, inventory, and navigation inside the same visual world.',
    breakdown: {
      expressions: 'Expressions sheet',
      building: 'Building parts sheet',
    },
    closingTitle: 'Your next world already has a visual heartbeat.',
    closingDescription:
      'Begin with a coherent asset direction, then spend your time on the systems, stories, and moments players will remember.',
    closingFeatures: ['Organized assets', 'Production-ready previews', 'One cohesive style'],
    home: 'Back to all CocoTiny assets',
  },
  zh: {
    back: '全部资产包',
    unlock: '解锁完整版资产包！',
    explore: '开始探索资产包',
    stats: ['RGBA 图片', '逻辑资产', '完整场景', '角色'],
    introEyebrow: '一套完整的视觉世界',
    introFeatures: [
      ['统一美术方向', '角色、场景、建筑与 UI 使用同一套视觉语言。'],
      ['为叙事而准备', '有辨识度的角色与世界，能更快建立游戏的第一印象。'],
      ['适合实际制作', '透明资产与拆解板经过整理，方便原型与后续迭代。'],
      ['为扩展留足空间', '先从精致核心开始，需要时再解锁更广阔的完整世界。'],
    ],
    charactersEyebrow: '认识这里的居民',
    charactersTitle: '让画面之外也有生活的角色',
    charactersDescription: '先展示三位代表角色。点击卡片，可以查看对应的表情序列拆解。',
    characterNote: '每个角色包含五组动作、共 15 份源动画序列。',
    characterUnlock: (characters: number, animations: number) =>
      `完整包另有 ${characters} 位角色，五位角色共 ${animations} 组序列帧动画等待解锁！`,
    characterModalUnlock: '还有剩下的 12 个角色序列帧等待解锁！',
    sceneEyebrow: '一景窥见一世界',
    sceneTitle: '从一个值得记住的地方开始',
    sceneDescription: '这张精选场景展现了资产包的氛围、可读布局与环境叙事方式。',
    sceneUnlock: (scenes: number) =>
      `还有 ${scenes} 个完整场景等待解锁，把这个世界延伸到更多路线、季节与故事！`,
    buildingsEyebrow: '模块化地标',
    buildingsTitle: '让每个角落都有清楚的身份',
    buildingsDescription: (buildings: number) =>
      `先展示完整 ${buildings} 座建筑中的四座代表地标，每座都准备了对应的部件拆解板。`,
    buildingsUnlock: (buildings: number) =>
      `还有 ${buildings} 座建筑等待解锁，让村庄、路线与地标组合更加丰富！`,
    uiEyebrow: '风格一致的界面',
    uiTitle: '让美术方向延伸到每一个菜单',
    uiDescription: '随包附带的界面套件，让面板、按钮、数值条、背包与导航都留在同一个世界中。',
    breakdown: {
      expressions: '表情序列',
      building: '建筑部件拆解板',
    },
    closingTitle: '你的下一个世界，已经有了视觉心跳。',
    closingDescription: '从统一完整的资产方向开始，把时间留给玩家真正会记住的系统、故事与瞬间。',
    closingFeatures: ['资产整理清晰', '预览可直接落地', '一套统一风格'],
    home: '返回全部 CocoTiny 资产',
  },
}

function localized(value: LocalizedText, locale: 'en' | 'zh') {
  return value[locale]
}

function SectionTitle({
  eyebrow,
  title,
  description,
  inverted = false,
}: {
  eyebrow: string
  title: string
  description: string
  inverted?: boolean
}) {
  return (
    <div className="mx-auto mb-11 max-w-3xl text-center md:mb-14">
      <div
        className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] ${
          inverted
            ? 'border-white/20 bg-white/8 text-[var(--pack-accent)]'
            : 'border-black/10 bg-white/40 text-[var(--pack-mid)]'
        }`}
      >
        <Sparkles className="h-4 w-4" />
        {eyebrow}
      </div>
      <h2
        className={`font-display text-4xl font-bold tracking-tight md:text-6xl ${
          inverted ? 'text-white' : 'text-[var(--pack-ink)]'
        }`}
      >
        {title}
      </h2>
      <p
        className={`mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 md:text-lg ${
          inverted ? 'text-white/70' : 'text-[var(--pack-muted)]'
        }`}
      >
        {description}
      </p>
    </div>
  )
}

export function AssetPackDetail({ pack }: { pack: AssetPack }) {
  const { locale } = useLanguage()
  const text = copy[locale]
  const visibleCharacterCount = pack.characters.length
  const visibleBuildingCount = pack.buildings.length
  const themeStyle = {
    '--pack-deep': pack.theme.deep,
    '--pack-mid': pack.theme.mid,
    '--pack-accent': pack.theme.accent,
    '--pack-paper': pack.theme.paper,
    '--pack-ink': pack.theme.ink,
    '--pack-muted': pack.theme.muted,
  } as CSSProperties

  return (
    <main
      style={themeStyle}
      className="min-h-screen overflow-hidden bg-[var(--pack-paper)] text-[var(--pack-ink)]"
    >
      <section className="relative min-h-[650px] overflow-hidden bg-[var(--pack-deep)] md:min-h-[760px]">
        <Image
          src={`/assets/${pack.slug}/cover-en.png`}
          alt={`${pack.title} cover art`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/10 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,transparent_0,transparent_24%,rgba(0,0,0,0.42)_78%)]" />

        <nav className="relative z-10 mx-auto flex max-w-[1480px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-black/45"
          >
            <ArrowLeft className="h-4 w-4" />
            {text.back}
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
                {pack.tags[locale].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="max-w-xl text-lg font-semibold leading-8 text-white drop-shadow md:text-xl">
                {localized(pack.hero, locale)}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                <UnlockAssetPackButton
                  assetSlug={pack.slug}
                  autoHandlePaymentReturn
                  packTitle={pack.title}
                  packName={pack.name}
                  cover={`/assets/${pack.slug}/cover-en.png`}
                  stats={pack.stats}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--pack-accent)] px-6 py-3.5 text-sm font-extrabold text-[var(--pack-ink)] shadow-xl transition hover:-translate-y-0.5"
                />
                <a
                  href="#characters"
                  className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-extrabold text-white underline decoration-transparent decoration-2 underline-offset-8 transition hover:decoration-white"
                >
                  {text.explore}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-7 max-w-6xl px-5 sm:px-8">
        <div className="grid overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_24px_80px_rgba(30,25,20,0.18)] sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Images, pack.stats.images],
            [PackageOpen, pack.stats.logicalAssets],
            [Map, pack.stats.scenes],
            [UsersRound, pack.stats.characters],
          ].map(([Icon, value], index) => {
            const StatIcon = Icon as typeof Images
            return (
              <div
                key={text.stats[index]}
                className="flex items-center gap-4 border-b border-black/10 p-6 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded bg-[color-mix(in_srgb,var(--pack-accent)_28%,transparent)] text-[var(--pack-mid)]">
                  <StatIcon className="h-6 w-6" />
                </span>
                <div>
                  <div className="font-display text-3xl font-bold leading-none">{value as number}</div>
                  <div className="mt-1 text-xs font-extrabold uppercase tracking-[0.13em] text-[var(--pack-muted)]">
                    {text.stats[index]}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 md:py-32">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[var(--pack-accent)]/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-[var(--pack-mid)]">
              {text.introEyebrow}
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl">
              {localized(pack.introTitle, locale)}
            </h1>
          </div>
          <div className="rounded border border-black/10 bg-white/65 p-7 shadow-[0_18px_60px_rgba(30,25,20,0.1)] backdrop-blur sm:p-10">
            <p className="text-xl font-bold leading-8">{localized(pack.hero, locale)}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {text.introFeatures.map(([title, description]) => (
                <div key={title} className="rounded bg-black/5 p-4">
                  <div className="font-display text-base font-bold">{title}</div>
                  <div className="mt-1 text-sm font-semibold leading-6 text-[var(--pack-muted)]">
                    {description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="characters"
        className="relative overflow-hidden bg-[var(--pack-mid)] px-5 py-24 sm:px-8 md:py-32"
      >
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[var(--pack-accent)]/20 blur-3xl" />
        <div className="relative mx-auto max-w-[1380px]">
          <SectionTitle
            eyebrow={text.charactersEyebrow}
            title={text.charactersTitle}
            description={text.charactersDescription}
            inverted
          />
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
            {pack.characters.map((character) => {
              const name = localized(character.name, locale)
              return (
                <article
                  key={character.image}
                  className="relative flex min-h-[340px] flex-col overflow-hidden rounded border border-white/20 bg-[var(--pack-paper)] shadow-[0_20px_45px_rgba(15,20,15,0.22)]"
                >
                  <div className="relative flex flex-1 items-end justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_70%,var(--pack-accent)_0,color-mix(in_srgb,var(--pack-accent)_65%,var(--pack-mid))_35%,var(--pack-mid)_100%)] px-3 pt-7">
                    <Image
                      src={character.image}
                      alt={name}
                      fill
                      unoptimized={character.animated}
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-contain object-bottom p-5"
                    />
                  </div>
                  <div className="min-h-24 p-4">
                    <h3 className="font-display text-lg font-bold">{name}</h3>
                    <p className="mt-1 text-xs font-bold leading-5 text-[var(--pack-muted)]">
                      {localized(character.role, locale)}
                    </p>
                  </div>
                  <AssetBreakdownTrigger
                    assetTitle={name}
                    sheets={[
                      {
                        title: text.breakdown.expressions,
                        image: character.expression,
                        width: 1672,
                        height: 941,
                      },
                    ]}
                    unlockMessage={text.characterModalUnlock}
                  />
                </article>
              )
            })}
          </div>
          <div className="mx-auto mt-8 max-w-4xl rounded border border-white/20 bg-black/15 px-6 py-5 text-center shadow-xl">
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-white/80">
              <Sparkles className="h-4 w-4 shrink-0 text-[var(--pack-accent)]" />
              <span>{text.characterNote}</span>
            </div>
            <p className="mt-2 font-display text-xl font-bold leading-7 text-[var(--pack-accent)] sm:text-2xl">
              {text.characterUnlock(
                pack.stats.characters - visibleCharacterCount,
                pack.stats.animations,
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--pack-deep)] px-5 py-24 text-white sm:px-8 md:py-32">
        <div className="mx-auto max-w-[1380px]">
          <SectionTitle
            eyebrow={text.sceneEyebrow}
            title={text.sceneTitle}
            description={text.sceneDescription}
            inverted
          />
          <article className="group relative aspect-video overflow-hidden rounded border border-white/15 bg-black/20 shadow-2xl">
            <Image
              src={pack.scene.image}
              alt={localized(pack.scene.name, locale)}
              fill
              sizes="100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <div className="font-display text-2xl font-bold sm:text-3xl">
                {localized(pack.scene.name, locale)}
              </div>
              <div className="mt-1 text-sm font-semibold text-white/75">
                {localized(pack.scene.note, locale)}
              </div>
            </div>
            <AssetBreakdownTrigger
              assetTitle={localized(pack.scene.name, locale)}
              sheets={pack.scene.sheets.map((sheet) => ({
                title: localized(sheet.title, locale),
                image: sheet.image,
                width: 1672,
                height: 941,
              }))}
            />
          </article>
          <div className="mx-auto mt-8 max-w-4xl rounded border border-white/15 bg-white/5 px-6 py-5 text-center shadow-xl">
            <p className="font-display text-lg font-bold leading-7 text-[var(--pack-accent)] sm:text-xl">
              {text.sceneUnlock(pack.stats.scenes - 1)}
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--pack-paper)] px-5 py-24 sm:px-8 md:py-32">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(var(--pack-mid)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative mx-auto max-w-[1380px]">
          <SectionTitle
            eyebrow={text.buildingsEyebrow}
            title={text.buildingsTitle}
            description={text.buildingsDescription(pack.stats.buildings)}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pack.buildings.map((building) => {
              const name = localized(building.name, locale)
              return (
                <article
                  key={building.image}
                  className="group relative overflow-hidden rounded border border-black/10 bg-white/70 shadow-[0_16px_45px_rgba(30,25,20,0.12)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_center,var(--pack-paper)_0,var(--pack-accent)_58%,var(--pack-mid)_130%)]">
                    <Image
                      src={building.image}
                      alt={name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-2 transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold">{name}</h3>
                  </div>
                  <AssetBreakdownTrigger
                    assetTitle={name}
                    sheets={[
                      {
                        title: text.breakdown.building,
                        image: building.breakdown,
                        width: 1915,
                        height: 821,
                      },
                    ]}
                  />
                </article>
              )
            })}
          </div>
          <div className="mx-auto mt-8 max-w-4xl rounded border border-black/10 bg-white/65 px-6 py-5 text-center shadow-xl">
            <p className="font-display text-lg font-bold leading-7 text-[var(--pack-mid)] sm:text-xl">
              {text.buildingsUnlock(pack.stats.buildings - visibleBuildingCount)}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white/55 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--pack-mid)]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--pack-mid)]">
              <Layers3 className="h-4 w-4" />
              {text.uiEyebrow}
            </div>
            <h2 className="font-display text-5xl font-bold leading-none md:text-6xl">
              {text.uiTitle}
            </h2>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-[var(--pack-muted)]">
              {text.uiDescription}
            </p>
          </div>
          <div className="overflow-hidden rounded border border-black/10 bg-[var(--pack-accent)] p-2 shadow-[0_25px_70px_rgba(30,25,20,0.22)] sm:p-4">
            <Image
              src={pack.ui.image}
              alt={localized(pack.ui.name, locale)}
              width={1448}
              height={1086}
              className="h-auto w-full rounded"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--pack-deep)] px-5 py-24 text-center text-white sm:px-8 md:py-32">
        <div className="absolute left-1/2 top-0 h-80 w-[700px] -translate-x-1/2 rounded-full bg-[var(--pack-accent)]/15 blur-[100px]" />
        <div className="relative mx-auto max-w-4xl">
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-none">
            {text.closingTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/70">
            {text.closingDescription}
          </p>
          <div className="mx-auto mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
            {text.closingFeatures.map((feature) => (
              <div key={feature} className="rounded border border-white/10 bg-white/5 p-5">
                <div className="font-display text-lg font-bold text-[var(--pack-accent)]">
                  {feature}
                </div>
              </div>
            ))}
          </div>
          <UnlockAssetPackButton
            assetSlug={pack.slug}
            packTitle={pack.title}
            packName={pack.name}
            cover={`/assets/${pack.slug}/cover-en.png`}
            stats={pack.stats}
            icon="package"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--pack-accent)] px-7 py-4 text-sm font-extrabold text-[var(--pack-ink)] shadow-xl transition hover:-translate-y-0.5"
          />
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-white/65 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {text.home}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
