// Каталог магазина для всех трёх макетов. Цены и названия — черновые, для макета.

window.SHOP = {
  promo: { code: 'ЛЕГИОН', bonus: 10 },
  schedule: 'Ср, Пт, Вск',

  crystals: [
    { id: 'c1', name: 'Горсть кристаллов',  amount: 80,   bonus: 0,    price: 99,   pile: 1 },
    { id: 'c2', name: 'Мешочек кристаллов', amount: 250,  bonus: 25,   price: 299,  pile: 3 },
    { id: 'c3', name: 'Кошель кристаллов',  amount: 550,  bonus: 80,   price: 599,  pile: 5, tag: 'hit' },
    { id: 'c4', name: 'Ларец кристаллов',   amount: 1200, bonus: 250,  price: 1290, pile: 8 },
    { id: 'c5', name: 'Сундук кристаллов',  amount: 2600, bonus: 700,  price: 2690, img: 'chest_epic' },
    { id: 'c6', name: 'Сокровищница',       amount: 6000, bonus: 2000, price: 5990, img: 'chest_legendary', tag: 'best' },
  ],

  skins: [
    { id: 's1',  unit: 'Овца',           name: 'Адская овца',       rarity: 'legendary', price: 449, crystals: 1200, img: 'skin_sheep',        base: 'unit_sheep',     tag: 'imba', power: '9999+99999' },
    { id: 's2',  unit: 'Крыса-алхимик',  name: 'Чумной доктор',     rarity: 'epic',      price: 349, crystals: 900,  img: 'skin_robo_rat',     tag: 'new' },
    { id: 's3',  unit: 'Железный голем', name: 'Сердце магмы',      rarity: 'legendary', price: 449, crystals: 1200, img: 'skin_iron_golem' },
    { id: 's4',  unit: 'Вурдалак',       name: 'Кровавый жнец',     rarity: 'epic',      price: 349, crystals: 900,  img: 'skin_ghoul',        base: 'unit_ghoul',     old: 449 },
    { id: 's5',  unit: 'Лучница',        name: 'Ночная тень',       rarity: 'epic',      price: 349, crystals: 900,  img: 'skin_archer',       base: 'unit_archer' },
    { id: 's6',  unit: 'Осадная телега', name: 'Золотой таран',     rarity: 'legendary', price: 449, crystals: 1200, img: 'skin_siege_cart' },
    { id: 's7',  unit: 'Чародейка',      name: 'Сумеречная аркана', rarity: 'rare',      price: 199, crystals: 500,  img: 'skin_arcane_riser' },
    { id: 's8',  unit: 'Король-краб',    name: 'Ядовитый панцирь',  rarity: 'rare',      price: 199, crystals: 500,  img: 'skin_king_crab',    base: 'unit_crab' },
    { id: 's9',  unit: 'Орёл',           name: 'Звёздный ворон',    rarity: 'rare',      price: 199, crystals: 500,  img: 'skin_eagle',        base: 'unit_hawk' },
    { id: 's10', unit: 'Дирижабль',      name: 'Лоскутный',         rarity: 'rare',      price: 199, crystals: 500,  img: 'skin_dirigible',    base: 'unit_dirigible', old: 249 },
  ],

  bundles: [
    { id: 'b1', name: 'Набор Легиона', price: 1490, old: 2490, exclusive: true,
      items: ['skin_sheep', 'skin_iron_golem', 'skin_siege_cart'],
      lines: ['3 легендарных скина', '2000 кристаллов', 'Рамка аватара — только в наборе'] },
    { id: 'b2', name: 'Набор новичка', price: 299, old: 549, once: true,
      items: ['skin_archer'],
      lines: ['Скин «Ночная тень»', '500 кристаллов'] },
  ],

  rarity: {
    rare:      { label: 'Редкий',      color: '#3d8bff' },
    epic:      { label: 'Эпический',   color: '#b45cff' },
    legendary: { label: 'Легендарный', color: '#ff9a1f' },
  },

  payMethods: ['СБП', 'Банковская карта', 'ЮMoney'],
};
