import { getAssetPack } from '@/lib/asset-pack-data'
import { ASSET_PACK_PRICE } from '@/lib/pricing'

export type PaymentProduct = {
  slug: string
  route: string
  title: string
  price: string
  objectKey: string
}

export function getPaymentProduct(slug: string): PaymentProduct | undefined {
  const normalizedSlug = slug.trim().toLowerCase()

  if (normalizedSlug === 'windmillbakery') {
    return {
      slug: normalizedSlug,
      route: '/WINDMILLBAKERY',
      title: 'WINDMILLBAKERY',
      price: ASSET_PACK_PRICE,
      objectKey: 'windmillbakery.zip',
    }
  }

  const pack = getAssetPack(normalizedSlug)
  if (!pack) return undefined

  return {
    slug: pack.slug,
    route: pack.route,
    title: pack.title,
    price: ASSET_PACK_PRICE,
    objectKey: `${pack.slug}.zip`,
  }
}
