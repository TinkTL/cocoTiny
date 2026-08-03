import { assetPacks } from '@/lib/asset-pack-data'
import type { LocalizedText } from '@/lib/asset-pack-data'

type FeaturedAsset = {
  slug: keyof typeof assetPacks
  badge: LocalizedText
}

type HomeBanner = {
  image: string
  href: string
  title: LocalizedText
  description: LocalizedText
}

function assetBanner(slug: keyof typeof assetPacks): HomeBanner {
  const pack = assetPacks[slug]

  return {
    image: getAssetCover(pack.slug),
    href: pack.route,
    title: pack.name,
    description: pack.hero,
  }
}

export const homeFeatured = {
  hero: [
    assetBanner('qing-luo-outpost'),
    assetBanner('gardenia-herb-society'),
    assetBanner('ying-long-night-lantern'),
  ],
  editorsPick: {
    slug: 'mint-knights',
    badge: { en: "Editor's Pick", zh: '编辑精选' },
  },
  supporting: [
    {
      slug: 'dengmiao-youchai',
      badge: { en: 'Recently Updated', zh: '最近更新' },
      badgeColor: 'bg-purple text-white',
    },
    {
      slug: 'shacha-tangguowu',
      badge: { en: 'Recently Updated', zh: '最近更新' },
      badgeColor: 'bg-pink text-white',
    },
  ],
} as const satisfies {
  hero: readonly HomeBanner[]
  editorsPick: FeaturedAsset
  supporting: readonly (FeaturedAsset & { badgeColor: string })[]
}

export const homeFeaturedCopy = {
  en: {
    assetPack: 'CocoTiny Asset Pack',
  },
  zh: {
    assetPack: 'CocoTiny 美术资产包',
  },
} as const

export function resolveFeaturedAsset(item: FeaturedAsset) {
  return assetPacks[item.slug]
}

export function getAssetCover(slug: string) {
  return `/assets/${slug}/cover-en.png`
}
