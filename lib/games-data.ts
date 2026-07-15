export type Game = {
  title: string
  image: string
  tags: string[]
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
    title: 'DREDGE',
    image: '/games/dredge.png',
    tags: ['Adventure', 'Fishing', 'Mystery'],
  },
  {
    title: 'TUNIC',
    image: '/games/tunic.png',
    tags: ['Action', 'Adventure', 'Puzzle'],
  },
  {
    title: 'CELESTE',
    image: '/games/celeste.png',
    tags: ['Platformer', 'Precision', 'Story Rich'],
  },
  {
    title: 'SEA OF STARS',
    image: '/games/sea-of-stars.png',
    tags: ['RPG', 'Adventure', 'Pixel Art'],
  },
  {
    title: 'INSCRYPTION',
    image: '/games/inscryption.png',
    tags: ['Card Game', 'Roguelike', 'Horror'],
  },
  {
    title: 'RAIN\nWORLD 2',
    image: '/games/rain-world.png',
    tags: ['Action', 'Roguelike', 'Co-op'],
  },
  {
    title: 'CARRION',
    image: '/games/carrion.png',
    tags: ['Horror', 'Action', 'Metroidvania'],
  },
  {
    title: 'CULT\nOF THE\nLAMB',
    image: '/games/cult-of-the-lamb.png',
    tags: ['Action', 'Roguelike', 'Management'],
  },
]
