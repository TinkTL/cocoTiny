import { getAssetPack } from '@/lib/asset-pack-data'

export const ASSET_PACK_PRICE = '0.10'

export type PaymentProduct = {
  slug: string
  title: string
  price: string
  objectKey: string
}

export function getPaymentProduct(slug: string): PaymentProduct | undefined {
  const normalizedSlug = slug.trim().toLowerCase()

  if (normalizedSlug === 'windmillbakery') {
    return {
      slug: normalizedSlug,
      title: 'WINDMILLBAKERY',
      price: ASSET_PACK_PRICE,
      objectKey: 'windmillbakery.zip',
    }
  }

  const pack = getAssetPack(normalizedSlug)
  if (!pack) return undefined

  return {
    slug: pack.slug,
    title: pack.title,
    price: ASSET_PACK_PRICE,
    objectKey: `${pack.slug}.zip`,
  }
}
