import { assetPacks } from '@/lib/asset-pack-data'
import type { LocalizedText } from '@/lib/asset-pack-data'

type FeaturedAsset = {
  slug: keyof typeof assetPacks
  badge: LocalizedText
}

export const homeFeatured = {
  hero: [
    {
      slug: 'qing-luo-outpost',
      badge: { en: 'World Pick', zh: '世界精选' },
    },
    {
      slug: 'gardenia-herb-society',
      badge: { en: 'Cozy Pick', zh: '治愈精选' },
    },
    {
      slug: 'ying-long-night-lantern',
      badge: { en: 'Night Pick', zh: '夜色精选' },
    },
  ],
  editorsPick: {
    slug: 'mint-knights',
    badge: { en: "Editor's Pick", zh: '编辑精选' },
  },
  supporting: [
    {
      slug: 'dengmiao-youchai',
      badge: { en: 'Storybook Pick', zh: '童话精选' },
      badgeColor: 'bg-purple text-white',
    },
    {
      slug: 'shacha-tangguowu',
      badge: { en: 'Sweet Pick', zh: '甜蜜精选' },
      badgeColor: 'bg-pink text-white',
    },
  ],
} as const satisfies {
  hero: readonly FeaturedAsset[]
  editorsPick: FeaturedAsset
  supporting: readonly (FeaturedAsset & { badgeColor: string })[]
}

export const homeFeaturedCopy = {
  en: {
    assetPack: 'CocoTiny Asset Pack',
    viewAsset: 'View asset pack',
  },
  zh: {
    assetPack: 'CocoTiny 美术资产包',
    viewAsset: '查看资产包',
  },
} as const

export function resolveFeaturedAsset(item: FeaturedAsset) {
  return assetPacks[item.slug]
}

export function getAssetCover(slug: string) {
  return `/assets/${slug}/cover-en.png`
}
