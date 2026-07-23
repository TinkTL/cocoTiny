export type LocalizedText = {
  en: string
  zh: string
}

export type PreviewSheet = {
  title: LocalizedText
  image: string
}

export type PreviewCharacter = {
  name: LocalizedText
  role: LocalizedText
  image: string
  expression: string
  animated: boolean
}

export type PreviewBuilding = {
  name: LocalizedText
  image: string
  breakdown: string
}

export type AssetPack = {
  slug: string
  route: string
  title: string
  name: LocalizedText
  hero: LocalizedText
  introTitle: LocalizedText
  tags: {
    en: string[]
    zh: string[]
  }
  stats: {
    images: number
    logicalAssets: number
    scenes: number
    characters: number
    buildings: number
    animations: number
  }
  theme: {
    deep: string
    mid: string
    accent: string
    paper: string
    ink: string
    muted: string
  }
  characters: PreviewCharacter[]
  scene: {
    name: LocalizedText
    note: LocalizedText
    image: string
    sheets: PreviewSheet[]
  }
  buildings: PreviewBuilding[]
  ui: {
    name: LocalizedText
    image: string
  }
}

const sheetTitles = {
  buildings: { en: 'Buildings layer', zh: '建筑层' },
  ground: { en: 'Ground layer', zh: '地面层' },
  objects: { en: 'Objects layer', zh: '物件层' },
}

export const assetPacks: Record<string, AssetPack> = {
  'dengmiao-youchai': {
    slug: 'dengmiao-youchai',
    route: '/DENGMIAO-YOUCHAI',
    title: 'DENGMIAO YOUCHAI',
    name: { en: 'Dengmiao Youchai', zh: '灯苗邮差' },
    hero: {
      en: 'A glowing forest postal adventure where tiny plant spirits carry parcels, relight forgotten roads, and connect every hidden village.',
      zh: '在巨型蘑菇与萤光苔藓覆盖的古老森林里，头顶发光苞片的灯苗们送信、维护路灯，也把心意送进每一家。',
    },
    introTitle: {
      en: 'Every little light carries a message.',
      zh: '每一盏小灯，都替一份心意照亮归途。',
    },
    tags: {
      en: ['Forest', 'Glowing', 'Storybook', 'Postal adventure'],
      zh: ['森林', '萤光', '童话', '邮递冒险'],
    },
    stats: {
      images: 115,
      logicalAssets: 34,
      scenes: 15,
      characters: 5,
      buildings: 12,
      animations: 75,
    },
    theme: {
      deep: '#1f352e',
      mid: '#527158',
      accent: '#e6c65d',
      paper: '#f7efd4',
      ink: '#382a22',
      muted: '#846f59',
    },
    characters: [
      {
        name: { en: 'Lighthouse Keeper', zh: '灯塔守护人' },
        role: { en: 'Keeps the oldest forest beacon awake', zh: '守护森林最古老的灯塔' },
        image:
          '/assets/dengmiao-youchai/detail/units/dengmiao-lighthouse-keeper/preview.gif',
        expression:
          '/assets/dengmiao-youchai/detail/units/dengmiao-lighthouse-keeper/expressions.png',
        animated: true,
      },
      {
        name: { en: 'Mushroom Elder', zh: '蘑菇村长' },
        role: { en: 'Remembers every path beneath the canopy', zh: '记得树冠下的每一条旧路' },
        image:
          '/assets/dengmiao-youchai/detail/units/dengmiao-mushroom-elder/preview.gif',
        expression:
          '/assets/dengmiao-youchai/detail/units/dengmiao-mushroom-elder/expressions.png',
        animated: true,
      },
      {
        name: { en: 'Meimei the Postie', zh: '灯苗莓莓' },
        role: { en: 'Carries bright wishes between distant homes', zh: '把发光的心愿送往远方' },
        image: '/assets/dengmiao-youchai/detail/units/dengmiao-postman/preview.gif',
        expression:
          '/assets/dengmiao-youchai/detail/units/dengmiao-postman/expressions.png',
        animated: true,
      },
    ],
    scene: {
      name: { en: 'Ancient Tree Library', zh: '古树图书馆' },
      note: {
        en: 'A quiet archive glowing beneath roots and mushrooms',
        zh: '藏在树根与蘑菇微光中的安静书库',
      },
      image: '/assets/dengmiao-youchai/detail/scene/preview.png',
      sheets: [
        {
          title: sheetTitles.buildings,
          image: '/assets/dengmiao-youchai/detail/scene/buildings-sheet.png',
        },
        {
          title: sheetTitles.ground,
          image: '/assets/dengmiao-youchai/detail/scene/ground-sheet.png',
        },
        {
          title: sheetTitles.objects,
          image: '/assets/dengmiao-youchai/detail/scene/objects-sheet.png',
        },
      ],
    },
    buildings: [
      ['dengmiao-brew-house', 'Letter Brew House', '酿信屋'],
      ['dengmiao-canopy-bridge', 'Canopy Bridge', '树冠吊桥'],
      ['dengmiao-canteen', 'Postie Canteen', '邮差食堂'],
      ['dengmiao-crystal-cave', 'Crystal Nest', '水晶巢'],
    ].map(([slug, en, zh]) => ({
      name: { en, zh },
      image: `/assets/dengmiao-youchai/detail/buildings/${slug}/preview.png`,
      breakdown: `/assets/dengmiao-youchai/detail/buildings/${slug}/parts-sheet.png`,
    })),
    ui: {
      name: { en: 'Dengmiao UI Kit', zh: '灯苗邮差 UI 套件' },
      image: '/assets/dengmiao-youchai/detail/ui/ui-kit.png',
    },
  },
  'gardenia-herb-society': {
    slug: 'gardenia-herb-society',
    route: '/GARDENIA-HERB-SOCIETY',
    title: 'GARDENIA HERB SOCIETY',
    name: { en: 'Gardenia Herb Society', zh: '栀子药田社' },
    hero: {
      en: 'A gentle herbalist life of seasonal fields, woodland gathering, potion making, and rebuilding a forgotten village society.',
      zh: '在栀子山下成为草药师学徒，打理四季药田、沿林间小路采药，并让荒废的药田社重新热闹起来。',
    },
    introTitle: {
      en: 'Grow a kinder world, one remedy at a time.',
      zh: '从一株新芽开始，慢慢治愈整个村庄。',
    },
    tags: {
      en: ['Healing', 'Herbal', 'Seasonal', 'Hand-painted'],
      zh: ['治愈', '草药', '四季', '手绘'],
    },
    stats: {
      images: 116,
      logicalAssets: 34,
      scenes: 15,
      characters: 5,
      buildings: 12,
      animations: 75,
    },
    theme: {
      deep: '#263a2d',
      mid: '#70845a',
      accent: '#eacb68',
      paper: '#faf2d8',
      ink: '#3d3024',
      muted: '#806f55',
    },
    characters: [
      {
        name: { en: 'Zhizhi the Apprentice', zh: '栀栀' },
        role: { en: 'A new herbalist with an eager notebook', zh: '抱着笔记本入学的草药学徒' },
        image:
          '/assets/gardenia-herb-society/detail/units/gardenia-apprentice/preview.gif',
        expression:
          '/assets/gardenia-herb-society/detail/units/gardenia-apprentice/expressions.png',
        animated: true,
      },
      {
        name: { en: 'Mushroom Granny', zh: '菌婆婆' },
        role: { en: 'Knows which forest paths bloom after rain', zh: '熟悉雨后每一条采菌小路' },
        image: '/assets/gardenia-herb-society/detail/units/gardenia-child/preview.gif',
        expression:
          '/assets/gardenia-herb-society/detail/units/gardenia-child/expressions.png',
        animated: true,
      },
      {
        name: { en: 'Auntie Mo', zh: '磨婶' },
        role: { en: 'Turns every harvest into useful medicine', zh: '把每次收成都磨成温柔药方' },
        image: '/assets/gardenia-herb-society/detail/units/gardenia-elder/preview.gif',
        expression:
          '/assets/gardenia-herb-society/detail/units/gardenia-elder/expressions.png',
        animated: true,
      },
    ],
    scene: {
      name: { en: 'Ancient Tree Roots', zh: '古树根系' },
      note: {
        en: 'A living crossroads where roots shelter herbs and stories',
        zh: '树根庇护着药草，也收藏着村庄的旧故事',
      },
      image: '/assets/gardenia-herb-society/detail/scene/preview.png',
      sheets: [
        {
          title: sheetTitles.buildings,
          image: '/assets/gardenia-herb-society/detail/scene/buildings-sheet.png',
        },
        {
          title: sheetTitles.ground,
          image: '/assets/gardenia-herb-society/detail/scene/ground-sheet.png',
        },
        {
          title: sheetTitles.objects,
          image: '/assets/gardenia-herb-society/detail/scene/objects-sheet.png',
        },
      ],
    },
    buildings: [
      ['gardenia-bench', 'Herb Garden Bench', '凉凳'],
      ['gardenia-bridge', 'Wooden Bridge', '木桥头'],
      ['gardenia-dry-house', 'Herb Drying Shed', '晒药棚'],
      ['gardenia-lamp', 'Herbal Lamp', '药灯柱'],
    ].map(([slug, en, zh]) => ({
      name: { en, zh },
      image: `/assets/gardenia-herb-society/detail/buildings/${slug}/preview.png`,
      breakdown: `/assets/gardenia-herb-society/detail/buildings/${slug}/parts-sheet.png`,
    })),
    ui: {
      name: { en: 'Gardenia UI Kit', zh: '栀子药田社 UI 套件' },
      image: '/assets/gardenia-herb-society/detail/ui/ui-kit.png',
    },
  },
  lindenteahouse: {
    slug: 'lindenteahouse',
    route: '/LINDENTEAHOUSE',
    title: 'LINDENTEAHOUSE',
    name: { en: 'Linden Teahouse', zh: '铃兰茶屋' },
    hero: {
      en: 'A warm, mysterious teahouse world made for slow exploration, quiet management, and stories that bloom between bamboo shadows.',
      zh: '一个适合慢节奏经营与箱庭探索的温暖茶屋世界，在竹影、铃兰与茶香之间藏着不惊悚的神秘故事。',
    },
    introTitle: {
      en: 'Let every cup open a hidden path.',
      zh: '让每一盏茶，都通往一条隐秘小径。',
    },
    tags: {
      en: ['Healing', 'Fairytale', 'Warm', 'Mysterious'],
      zh: ['治愈', '童话', '温暖', '神秘但不恐怖'],
    },
    stats: {
      images: 130,
      logicalAssets: 41,
      scenes: 15,
      characters: 5,
      buildings: 19,
      animations: 75,
    },
    theme: {
      deep: '#28372f',
      mid: '#607460',
      accent: '#e3c990',
      paper: '#f5efdd',
      ink: '#3a3028',
      muted: '#7f705f',
    },
    characters: [
      {
        name: { en: 'Flora Fox', zh: '花妖狐' },
        role: { en: 'Brings wild blossoms to the tea table', zh: '把山野花香带到茶桌边' },
        image: '/assets/lindenteahouse/detail/units/linden-flora-fox/preview.gif',
        expression:
          '/assets/lindenteahouse/detail/units/linden-flora-fox/expressions.png',
        animated: true,
      },
      {
        name: { en: 'Fox Grandmother', zh: '狐婆婆' },
        role: { en: 'Keeper of recipes and moonlit memories', zh: '守着旧茶方与月夜记忆' },
        image: '/assets/lindenteahouse/detail/units/linden-fox-mother/preview.gif',
        expression:
          '/assets/lindenteahouse/detail/units/linden-fox-mother/expressions.png',
        animated: true,
      },
      {
        name: { en: 'Linden Tea Keeper', zh: '铃兰茶守' },
        role: { en: 'Welcomes every traveler with the right brew', zh: '总能为旅人沏出刚好的茶' },
        image: '/assets/lindenteahouse/detail/units/linden-tea-keeper/preview.gif',
        expression:
          '/assets/lindenteahouse/detail/units/linden-tea-keeper/expressions.png',
        animated: true,
      },
    ],
    scene: {
      name: { en: 'Bamboo Sea Stone Steps', zh: '竹海石阶' },
      note: {
        en: 'A mist-soft trail leading deeper into the tea mountain',
        zh: '一条被薄雾包裹、通往茶山深处的石阶',
      },
      image: '/assets/lindenteahouse/detail/scene/preview.png',
      sheets: [
        {
          title: sheetTitles.buildings,
          image: '/assets/lindenteahouse/detail/scene/buildings-sheet.png',
        },
        {
          title: sheetTitles.ground,
          image: '/assets/lindenteahouse/detail/scene/ground-sheet.png',
        },
        {
          title: sheetTitles.objects,
          image: '/assets/lindenteahouse/detail/scene/objects-sheet.png',
        },
      ],
    },
    buildings: [
      ['linden-arc-bridge', 'Stone Arch Bridge', '石拱桥'],
      ['linden-banner', 'Tea Banner', '茶旗'],
      ['linden-board', 'Village Notice Board', '告示板'],
      ['linden-book-house', 'Book House', '图书屋'],
    ].map(([slug, en, zh]) => ({
      name: { en, zh },
      image: `/assets/lindenteahouse/detail/buildings/${slug}/preview.png`,
      breakdown: `/assets/lindenteahouse/detail/buildings/${slug}/parts-sheet.png`,
    })),
    ui: {
      name: { en: 'Linden Teahouse UI Kit', zh: '铃兰茶屋 UI 套件' },
      image: '/assets/lindenteahouse/detail/ui/ui-kit.png',
    },
  },
  'mint-knights': {
    slug: 'mint-knights',
    route: '/MINT-KNIGHTS',
    title: 'MINT KNIGHTS',
    name: { en: 'Mint Knights', zh: '薄荷骑士团' },
    hero: {
      en: 'A warm forest patrol adventure where apprentice knights protect glowing mint spirits and push back the shadows with gentle courage.',
      zh: '见习骑士们从森林总部出发，保护发光的薄荷精灵，以轻盈的战斗驱散侵蚀林地的夜色。',
    },
    introTitle: {
      en: 'Small shields. Bright hearts. A forest worth defending.',
      zh: '小小盾牌，也能守住整片发光森林。',
    },
    tags: {
      en: ['Forest', 'Chivalry', 'Adventure', 'Warm'],
      zh: ['森林', '骑士', '冒险', '温暖'],
    },
    stats: {
      images: 118,
      logicalAssets: 37,
      scenes: 15,
      characters: 5,
      buildings: 15,
      animations: 75,
    },
    theme: {
      deep: '#173b34',
      mid: '#427964',
      accent: '#a6dfb9',
      paper: '#f3f0d8',
      ink: '#26392f',
      muted: '#697a66',
    },
    characters: [
      {
        name: { en: 'Mint Knight', zh: '薄荷骑士' },
        role: { en: 'A new guardian ready for the first patrol', zh: '准备第一次巡逻的新晋守卫' },
        image: '/assets/mint-knights/detail/units/bohe-knight/preview.png',
        expression: '/assets/mint-knights/detail/units/bohe-knight/expressions.png',
        animated: false,
      },
      {
        name: { en: 'Knight Commander', zh: '骑士团长' },
        role: { en: 'Keeps the woodland patrol steady and brave', zh: '让林间巡逻始终沉着勇敢' },
        image: '/assets/mint-knights/detail/units/bohe-knight-leader/preview.png',
        expression:
          '/assets/mint-knights/detail/units/bohe-knight-leader/expressions.png',
        animated: false,
      },
      {
        name: { en: 'Herbal Sage', zh: '草药长老' },
        role: { en: 'Turns mint leaves into field-ready remedies', zh: '把薄荷叶制成巡逻途中的药剂' },
        image: '/assets/mint-knights/detail/units/bohe-sage/preview.png',
        expression: '/assets/mint-knights/detail/units/bohe-sage/expressions.png',
        animated: false,
      },
    ],
    scene: {
      name: { en: 'Ancient Tree Shrine', zh: '古树神殿' },
      note: {
        en: 'The last bright landmark before the deepest night',
        zh: '进入深夜森林前最后一处明亮地标',
      },
      image: '/assets/mint-knights/detail/scene/preview.png',
      sheets: [
        {
          title: sheetTitles.buildings,
          image: '/assets/mint-knights/detail/scene/buildings-sheet.png',
        },
        {
          title: sheetTitles.ground,
          image: '/assets/mint-knights/detail/scene/ground-sheet.png',
        },
        {
          title: sheetTitles.objects,
          image: '/assets/mint-knights/detail/scene/objects-sheet.png',
        },
      ],
    },
    buildings: [
      ['bohe-armory', 'Mint Armory', '薄荷武器店'],
      ['bohe-brew-house', 'Mint Brew House', '薄荷酒屋'],
      ['bohe-cherry-arena', 'Cherry Training Yard', '樱花演武场'],
      ['bohe-fence', 'Woodland Fence', '木栏'],
    ].map(([slug, en, zh]) => ({
      name: { en, zh },
      image: `/assets/mint-knights/detail/buildings/${slug}/preview.png`,
      breakdown: `/assets/mint-knights/detail/buildings/${slug}/parts-sheet.png`,
    })),
    ui: {
      name: { en: 'Mint Knights UI Kit', zh: '薄荷骑士团 UI 套件' },
      image: '/assets/mint-knights/detail/ui/ui-kit.png',
    },
  },
  'qing-luo-outpost': {
    slug: 'qing-luo-outpost',
    route: '/QING-LUO-OUTPOST',
    title: 'QING LUO OUTPOST',
    name: { en: 'Qing Luo Outpost', zh: '青萝岗哨' },
    hero: {
      en: 'A network of living vine outposts, tiny watchkeepers, glowing seedlings, and gentle patrols through a mist-soft forest frontier.',
      zh: '千年藤萝织成岗哨网络，小守望者们沿藤萝航路巡逻、护送萤光种苗，并用轻战斗化解雾林危机。',
    },
    introTitle: {
      en: 'Keep the pathways bright and the seedlings moving.',
      zh: '守住航路，也守住每一颗微亮的新芽。',
    },
    tags: {
      en: ['Isometric', 'Forest', 'Glowing', 'Gentle combat'],
      zh: ['等距视角', '森林', '萤光', '轻战斗'],
    },
    stats: {
      images: 116,
      logicalAssets: 36,
      scenes: 15,
      characters: 5,
      buildings: 14,
      animations: 75,
    },
    theme: {
      deep: '#21382f',
      mid: '#55765a',
      accent: '#d9ca6e',
      paper: '#f4efd4',
      ink: '#333026',
      muted: '#77705a',
    },
    characters: [
      {
        name: { en: 'Qingluo Elder', zh: '青萝长者' },
        role: { en: 'Reads the old routes woven into every vine', zh: '读得懂藤萝里编织的古老航路' },
        image: '/assets/qing-luo-outpost/detail/units/qingluo-elder/preview.gif',
        expression:
          '/assets/qing-luo-outpost/detail/units/qingluo-elder/expressions.png',
        animated: true,
      },
      {
        name: { en: 'Qingluo Keeper', zh: '青萝守' },
        role: { en: 'Protects the seedlings at the forest edge', zh: '守护雾林边缘的萤光种苗' },
        image: '/assets/qing-luo-outpost/detail/units/qingluo-keeper/preview.gif',
        expression:
          '/assets/qing-luo-outpost/detail/units/qingluo-keeper/expressions.png',
        animated: true,
      },
      {
        name: { en: 'Scroll Runner', zh: '卷轴邮差' },
        role: { en: 'Carries route maps between distant outposts', zh: '在远方岗哨之间传递航路卷轴' },
        image: '/assets/qing-luo-outpost/detail/units/qingluo-runner/preview.gif',
        expression:
          '/assets/qing-luo-outpost/detail/units/qingluo-runner/expressions.png',
        animated: true,
      },
    ],
    scene: {
      name: { en: 'Creek Stone Camp', zh: '溪石营' },
      note: {
        en: 'A mossy patrol stop where water, vines, and lanterns meet',
        zh: '溪水、藤萝与灯火交汇的苔石营地',
      },
      image: '/assets/qing-luo-outpost/detail/scene/preview.png',
      sheets: [
        {
          title: sheetTitles.buildings,
          image: '/assets/qing-luo-outpost/detail/scene/buildings-sheet.png',
        },
        {
          title: sheetTitles.ground,
          image: '/assets/qing-luo-outpost/detail/scene/ground-sheet.png',
        },
        {
          title: sheetTitles.objects,
          image: '/assets/qing-luo-outpost/detail/scene/objects-sheet.png',
        },
      ],
    },
    buildings: [
      ['qingluo-firefly-pavilion', 'Firefly Pond Pavilion', '萤火池亭'],
      ['qingluo-fortress', 'Qingmist Fortress', '青雾堡'],
      ['qingluo-mailbox', 'Scroll Mailbox', '卷轴邮筒'],
      ['qingluo-north-gate', 'North Vine Outpost', '北藤萝哨'],
    ].map(([slug, en, zh]) => ({
      name: { en, zh },
      image: `/assets/qing-luo-outpost/detail/buildings/${slug}/preview.png`,
      breakdown: `/assets/qing-luo-outpost/detail/buildings/${slug}/parts-sheet.png`,
    })),
    ui: {
      name: { en: 'Qing Luo UI Kit', zh: '青萝岗哨 UI 套件' },
      image: '/assets/qing-luo-outpost/detail/ui/ui-kit.png',
    },
  },
  'shacha-tangguowu': {
    slug: 'shacha-tangguowu',
    route: '/SHACHA-TANGGUOWU',
    title: 'SHACHA TANGGUOWU',
    name: { en: 'Shacha Candy House', zh: '山茶糖果屋' },
    hero: {
      en: 'A camellia-pink candy village of flower gathering, sugar-crystal mining, copper-pot crafting, evening stalls, and neighbors with favorite sweets.',
      zh: '在山茶花村采花、取糖泉水、挖糖晶，再回到工坊熬糖、拉糖、印花，为每位邻居做一颗刚好的糖。',
    },
    introTitle: {
      en: 'Make the whole village sweeter by hand.',
      zh: '亲手把整个村庄，慢慢熬成甜甜的颜色。',
    },
    tags: {
      en: ['Cozy', 'Candy', 'Camellia', 'Warm'],
      zh: ['治愈', '糖果', '山茶花', '温暖'],
    },
    stats: {
      images: 111,
      logicalAssets: 34,
      scenes: 15,
      characters: 5,
      buildings: 12,
      animations: 75,
    },
    theme: {
      deep: '#4a2b32',
      mid: '#9a5a62',
      accent: '#efbd7c',
      paper: '#fff0e4',
      ink: '#4a2b28',
      muted: '#8b665e',
    },
    characters: [
      {
        name: { en: 'Camellia Florist', zh: '花匠' },
        role: { en: 'Finds the perfect bloom for every new flavor', zh: '为每种新口味挑选最合适的花' },
        image: '/assets/shacha-tangguowu/detail/units/shacha-florist/preview.gif',
        expression:
          '/assets/shacha-tangguowu/detail/units/shacha-florist/expressions.png',
        animated: true,
      },
      {
        name: { en: 'Village Miller', zh: '磨坊主' },
        role: { en: 'Turns crystals and grains into candy foundations', zh: '把糖晶与谷物磨成糖果的底味' },
        image: '/assets/shacha-tangguowu/detail/units/shacha-miller/preview.gif',
        expression:
          '/assets/shacha-tangguowu/detail/units/shacha-miller/expressions.png',
        animated: true,
      },
      {
        name: { en: 'Spring Granny', zh: '守泉婆婆' },
        role: { en: 'Guards the clearest water in the sugar springs', zh: '守护糖泉里最清甜的一汪水' },
        image:
          '/assets/shacha-tangguowu/detail/units/shacha-onsen-grandma/preview.gif',
        expression:
          '/assets/shacha-tangguowu/detail/units/shacha-onsen-grandma/expressions.png',
        animated: true,
      },
    ],
    scene: {
      name: { en: 'Bee Flower Garden', zh: '蜜蜂花圃' },
      note: {
        en: 'A fragrant gathering ground buzzing with color',
        zh: '花香、蜂鸣与糖果色交织的采集花圃',
      },
      image: '/assets/shacha-tangguowu/detail/scene/preview.png',
      sheets: [
        {
          title: sheetTitles.ground,
          image: '/assets/shacha-tangguowu/detail/scene/ground-sheet.png',
        },
        {
          title: sheetTitles.objects,
          image: '/assets/shacha-tangguowu/detail/scene/objects-sheet.png',
        },
      ],
    },
    buildings: [
      ['shacha-candy-house', 'Camellia Candy House', '山茶糖果屋'],
      ['shacha-crystal-cave', 'Sugar Crystal Cave', '糖晶矿洞口'],
      ['shacha-flower-trellis', 'Camellia Trellis', '山茶花架'],
      ['shacha-post-station', 'Candy Post Stop', '邮筒小驿'],
    ].map(([slug, en, zh]) => ({
      name: { en, zh },
      image: `/assets/shacha-tangguowu/detail/buildings/${slug}/preview.png`,
      breakdown: `/assets/shacha-tangguowu/detail/buildings/${slug}/parts-sheet.png`,
    })),
    ui: {
      name: { en: 'Shacha Candy UI Kit', zh: '山茶糖果屋 UI 套件' },
      image: '/assets/shacha-tangguowu/detail/ui/ui-kit.png',
    },
  },
  'ying-long-night-lantern': {
    slug: 'ying-long-night-lantern',
    route: '/YING-LONG-NIGHT-LANTERN',
    title: 'YING LONG NIGHT LANTERN',
    name: { en: 'Ying Long Night Lantern', zh: '萤笼夜灯' },
    hero: {
      en: 'A lantern-crafting valley where every evening becomes a ritual of gathering fireflies, hanging lights, and turning the village into a fallen sea of stars.',
      zh: '在完全依赖灯笼与萤火虫的山谷里，白天收集材料、制作夜灯，黄昏挨家挂灯，让整个村庄亮成落入人间的星海。',
    },
    introTitle: {
      en: 'Build the night, one lantern at a time.',
      zh: '一盏一盏，把整个夜晚亲手点亮。',
    },
    tags: {
      en: ['Night', 'Lanterns', 'Fireflies', 'Cozy'],
      zh: ['夜色', '灯笼', '萤火虫', '治愈'],
    },
    stats: {
      images: 109,
      logicalAssets: 34,
      scenes: 15,
      characters: 5,
      buildings: 12,
      animations: 75,
    },
    theme: {
      deep: '#171c31',
      mid: '#3d486b',
      accent: '#f0bc55',
      paper: '#f7efd8',
      ink: '#322b31',
      muted: '#756b72',
    },
    characters: [
      {
        name: { en: 'Night-Lamp Apprentice', zh: '夜灯学徒' },
        role: { en: 'Learns to weave warm light into every lantern', zh: '学习把暖光编进每一只灯笼' },
        image:
          '/assets/ying-long-night-lantern/detail/units/yinglong-apprentice/preview.png',
        expression:
          '/assets/ying-long-night-lantern/detail/units/yinglong-apprentice/expressions.png',
        animated: false,
      },
      {
        name: { en: 'Lantern Child', zh: '灯童' },
        role: { en: 'Runs ahead to light the smallest doorways', zh: '总抢先为最小的门廊点灯' },
        image:
          '/assets/ying-long-night-lantern/detail/units/yinglong-child/preview.png',
        expression:
          '/assets/ying-long-night-lantern/detail/units/yinglong-child/expressions.png',
        animated: false,
      },
      {
        name: { en: 'Firefly Keeper', zh: '萤火守护' },
        role: { en: 'Protects the valley’s gentlest living lights', zh: '守护山谷里最温柔的活光' },
        image:
          '/assets/ying-long-night-lantern/detail/units/yinglong-firefly-keeper/preview.png',
        expression:
          '/assets/ying-long-night-lantern/detail/units/yinglong-firefly-keeper/expressions.png',
        animated: false,
      },
    ],
    scene: {
      name: { en: 'Beacon Hilltop', zh: '灯塔山顶' },
      note: {
        en: 'A high overlook where the valley becomes a field of stars',
        zh: '从高处俯瞰整座星海山谷的灯塔山顶',
      },
      image: '/assets/ying-long-night-lantern/detail/scene/preview.png',
      sheets: [
        {
          title: sheetTitles.buildings,
          image: '/assets/ying-long-night-lantern/detail/scene/buildings-sheet.png',
        },
        {
          title: sheetTitles.ground,
          image: '/assets/ying-long-night-lantern/detail/scene/ground-sheet.png',
        },
        {
          title: sheetTitles.objects,
          image: '/assets/ying-long-night-lantern/detail/scene/objects-sheet.png',
        },
      ],
    },
    buildings: [
      ['yinglong-board', 'Lantern Notice Board', '告示板'],
      ['yinglong-bridge', 'Rope Bridge', '绳桥'],
      ['yinglong-crystal-cave', 'Crystal Mine', '水晶矿洞'],
      ['yinglong-lamp', 'Hanging Lamp Post', '挂灯柱'],
    ].map(([slug, en, zh]) => ({
      name: { en, zh },
      image: `/assets/ying-long-night-lantern/detail/buildings/${slug}/preview.png`,
      breakdown: `/assets/ying-long-night-lantern/detail/buildings/${slug}/parts-sheet.png`,
    })),
    ui: {
      name: { en: 'Night Lantern UI Kit', zh: '萤笼夜灯 UI 套件' },
      image: '/assets/ying-long-night-lantern/detail/ui/ui-kit.png',
    },
  },
}

export const assetPackSlugs = Object.keys(assetPacks)

export function getAssetPack(slug: string) {
  return assetPacks[slug.toLowerCase()]
}
