import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Windmill Bakery — Cozy Game Art Asset Pack',
  description:
    'A warm, storybook-ready game art collection for cozy exploration and slow-paced bakery management games.',
  openGraph: {
    title: 'Windmill Bakery — Cozy Game Art Asset Pack',
    description:
      'Build a complete warm-hearted world with scenes, characters, buildings, animations, and UI.',
    images: ['/assets/windmillbakery/cover-en.png'],
  },
}

export default function WindmillBakeryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
