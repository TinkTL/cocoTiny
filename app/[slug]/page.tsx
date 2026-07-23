import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AssetPackDetail } from '@/components/asset-pack-detail'
import { assetPackSlugs, getAssetPack } from '@/lib/asset-pack-data'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return assetPackSlugs.map((slug) => ({ slug: slug.toUpperCase() }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pack = getAssetPack(slug)

  if (!pack) return {}

  return {
    title: `${pack.title} — Game Art Asset Pack`,
    description: pack.hero.en,
    openGraph: {
      title: `${pack.title} — Game Art Asset Pack`,
      description: pack.hero.en,
      images: [`/assets/${pack.slug}/cover-en.png`],
    },
  }
}

export default async function AssetPackPage({ params }: PageProps) {
  const { slug } = await params
  const pack = getAssetPack(slug)

  if (!pack) notFound()

  return <AssetPackDetail pack={pack} />
}
