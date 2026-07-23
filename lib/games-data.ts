export type Game = {
  title: string
  image: string
  tags: string[]
  href?: string
}

// Smaller games in the top-right cluster of the featured section
export const featuredSmall: (Game & { badge?: string; badgeColor?: string; subtitle?: string })[] = [
  {
    title: 'PEPPER\nGRINDER',
    image: '/games/pepper-grinder.png',
    tags: ['Action', 'Adventure', 'Pixel Art'],
    badge: 'New Release',
    badgeColor: 'bg-purple text-white',
  },
  {
    title: 'COCOON',
    image: '/games/cocoon.png',
    tags: ['Puzzle', 'Sci-Fi', 'Exploration'],
    badge: 'Story Rich',
    badgeColor: 'bg-pink text-white',
  },
]

export const moreGames: Game[] = [
  {
    title: 'DENGMIAO YOUCHAI',
    image: '/assets/dengmiao-youchai/cover-en.png',
    tags: [],
    href: '/DENGMIAO-YOUCHAI',
  },
  {
    title: 'GARDENIA HERB SOCIETY',
    image: '/assets/gardenia-herb-society/cover-en.png',
    tags: [],
    href: '/GARDENIA-HERB-SOCIETY',
  },
  {
    title: 'LINDENTEAHOUSE',
    image: '/assets/lindenteahouse/cover-en.png',
    tags: ['治愈', '童话', '温暖', '神秘但不恐怖'],
    href: '/LINDENTEAHOUSE',
  },
  {
    title: 'MINT KNIGHTS',
    image: '/assets/mint-knights/cover-en.png',
    tags: [],
    href: '/MINT-KNIGHTS',
  },
  {
    title: 'QING LUO OUTPOST',
    image: '/assets/qing-luo-outpost/cover-en.png',
    tags: [],
    href: '/QING-LUO-OUTPOST',
  },
  {
    title: 'SHACHA TANGGUOWU',
    image: '/assets/shacha-tangguowu/cover-en.png',
    tags: [],
    href: '/SHACHA-TANGGUOWU',
  },
  {
    title: 'WINDMILLBAKERY',
    image: '/assets/windmillbakery/cover-en.png',
    tags: ['治愈', '童话', '温暖', '童趣但不幼稚'],
    href: '/WINDMILLBAKERY',
  },
  {
    title: 'YING LONG NIGHT LANTERN',
    image: '/assets/ying-long-night-lantern/cover-en.png',
    tags: [],
    href: '/YING-LONG-NIGHT-LANTERN',
  },
]
