import { getAssetPack } from '@/lib/asset-pack-data'

export type OrderProductPresentation = {
  route: string
  title: string
  name: string
  cover: string
  stats: {
    images: number
    logicalAssets: number
    scenes: number
    characters: number
  }
}

export function getOrderProductPresentation(
  assetSlug: string,
  fallbackTitle?: string,
): OrderProductPresentation {
  const normalizedSlug = assetSlug.trim().toLowerCase()

  if (normalizedSlug === 'windmillbakery') {
    return {
      route: '/WINDMILLBAKERY',
      title: 'WINDMILLBAKERY',
      name: '风车面包坊',
      cover: '/assets/windmillbakery/cover-en.png',
      stats: { images: 130, logicalAssets: 41, scenes: 15, characters: 5 },
    }
  }

  const pack = getAssetPack(normalizedSlug)
  if (pack) {
    return {
      route: pack.route,
      title: pack.title,
      name: pack.name.zh,
      cover: `/assets/${pack.slug}/cover-en.png`,
      stats: {
        images: pack.stats.images,
        logicalAssets: pack.stats.logicalAssets,
        scenes: pack.stats.scenes,
        characters: pack.stats.characters,
      },
    }
  }

  return {
    route: '/',
    title: fallbackTitle || 'COCOTINY ASSET PACK',
    name: fallbackTitle || 'CocoTiny 完整版资产包',
    cover: '/assets/gardenia-herb-society/cover-en.png',
    stats: { images: 116, logicalAssets: 34, scenes: 15, characters: 5 },
  }
}
