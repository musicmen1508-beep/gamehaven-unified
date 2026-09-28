export type Locale = "ru" | "en" | "zh";
export type Role = "admin" | "player" | "user";
export type CategoryKey = "action" | "adventure" | "arcade" | "board" | "card" | "clicker" | "driving" | "io" | "puzzle" | "shooting" | "simulation" | "sports" | "strategy" | "trivia" | "word";
export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type PortalGame = {
  slug: string;
  titles: LocalizedText;
  category: CategoryKey;
  tags: string[];
  descriptions: LocalizedText;
  controls: LocalizedList;
  imageUrl: string;
  gameUrl: string | null;
  rating: number;
  plays: number;
  year: number;
  badge: "hit" | "new" | "top" | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type PortalView = "all" | "history" | "favorites" | "new" | "hot" | "updated" | "originals" | "multiplayer" | "leaderboards";

export function matchesPortalQuickView(game: PortalGame, view: PortalView, hotSlugs: ReadonlySet<string>, now = Date.now()): boolean {
  switch (view) {
    case "new": return game.badge === "new";
    case "hot": return hotSlugs.has(game.slug);
    case "updated": return game.createdAt instanceof Date && game.updatedAt instanceof Date && game.updatedAt.getTime() - game.createdAt.getTime() >= 60_000 && now - game.updatedAt.getTime() <= 30 * 24 * 60 * 60 * 1000;
    case "multiplayer": return game.category === "io" || game.tags.some(tag => /online|онлайн|мультиплеер|多人/i.test(tag));
    case "all":
    case "history":
    case "favorites":
    case "originals":
    case "leaderboards":
      return true;
  }
}

export const categories: CategoryKey[] = ["action", "adventure", "arcade", "board", "card", "clicker", "driving", "io", "puzzle", "shooting", "simulation", "sports", "strategy", "trivia", "word"];

const legacyCategoryMap: Record<string, CategoryKey> = {
  racing: "driving",
  shooters: "shooting",
  puzzles: "puzzle",
};

export function normalizeCategory(category: string, slug?: string): CategoryKey {
  if (category === "casual") return slug === "pixel-frontier" ? "simulation" : "arcade";
  if (category in legacyCategoryMap) return legacyCategoryMap[category];
  return categories.includes(category as CategoryKey) ? category as CategoryKey : "arcade";
}

// The original four cover artworks and names stay first. Each following game gets its own artwork.
export const defaultGames: PortalGame[] = [
  {
    slug: "neon-drift", titles: {"ru": "Neon Drift", "en": "Neon Drift", "zh": "Neon Drift"}, category: "driving", tags: ["машины", "дрифт", "3D"],
    descriptions: {"ru": "Ночные заезды по неоновому мегаполису. Дрифтуйте в миллиметрах от соперников и собирайте нитро.", "en": "Ночные заезды по неоновому мегаполису. Дрифтуйте в миллиметрах от соперников и собирайте нитро.", "zh": "Ночные заезды по неоновому мегаполису. Дрифтуйте в миллиметрах от соперников и собирайте нитро."}, controls: {"ru": ["WASD — движение", "Пробел — ручной тормоз", "Shift — нитро"], "en": ["WASD — движение", "Пробел — ручной тормоз", "Shift — нитро"], "zh": ["WASD — движение", "Пробел — ручной тормоз", "Shift — нитро"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.9, plays: 12800000, year: 2026, badge: "hit",
  },
  {
    slug: "skyline-raider", titles: {"ru": "Skyline Raider", "en": "Skyline Raider", "zh": "Skyline Raider"}, category: "adventure", tags: ["паркур", "экшен", "герой"],
    descriptions: {"ru": "Покоряйте летающий город с крюком-кошкой и пробирайтесь через головокружительные уровни.", "en": "Покоряйте летающий город с крюком-кошкой и пробирайтесь через головокружительные уровни.", "zh": "Покоряйте летающий город с крюком-кошкой и пробирайтесь через головокружительные уровни."}, controls: {"ru": ["WASD — движение", "Мышь — прицел", "E — крюк"], "en": ["WASD — движение", "Мышь — прицел", "E — крюк"], "zh": ["WASD — движение", "Мышь — прицел", "E — крюк"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.8, plays: 7600000, year: 2026, badge: "new",
  },
  {
    slug: "prism-shift", titles: {"ru": "Prism Shift", "en": "Prism Shift", "zh": "Prism Shift"}, category: "puzzle", tags: ["логика", "порталы", "блоки"],
    descriptions: {"ru": "Меняйте гравитацию, соединяйте кристаллы и открывайте порталы в футуристической лаборатории.", "en": "Меняйте гравитацию, соединяйте кристаллы и открывайте порталы в футуристической лаборатории.", "zh": "Меняйте гравитацию, соединяйте кристаллы и открывайте порталы в футуристической лаборатории."}, controls: {"ru": ["Мышь — выбор", "R — перезапуск", "Z — отмена"], "en": ["Мышь — выбор", "R — перезапуск", "Z — отмена"], "zh": ["Мышь — выбор", "R — перезапуск", "Z — отмена"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.7, plays: 4200000, year: 2026, badge: "top",
  },
  {
    slug: "hover-arena", titles: {"ru": "Hover Arena", "en": "Hover Arena", "zh": "Hover Arena"}, category: "io", tags: ["мультиплеер", "арена", "гонки"],
    descriptions: {"ru": "Соревнуйтесь на воздушных аренах, сталкивайте соперников и останьтесь последним пилотом.", "en": "Соревнуйтесь на воздушных аренах, сталкивайте соперников и останьтесь последним пилотом.", "zh": "Соревнуйтесь на воздушных аренах, сталкивайте соперников и останьтесь последним пилотом."}, controls: {"ru": ["WASD — движение", "Мышь — камера", "Пробел — ускорение"], "en": ["WASD — движение", "Мышь — камера", "Пробел — ускорение"], "zh": ["WASD — движение", "Мышь — камера", "Пробел — ускорение"]},
    imageUrl: "/manus-storage/game-io_846bbfae.jpg", gameUrl: null, rating: 4.6, plays: 9100000, year: 2026, badge: "hit",
  },
  {
    slug: "strike-point", titles: {"ru": "Strike Point", "en": "Strike Point", "zh": "Strike Point"}, category: "shooting", tags: ["FPS", "тактика", "онлайн"],
    descriptions: {"ru": "Быстрые тактические матчи на компактных аренах с точной стрельбой и мгновенным стартом.", "en": "Быстрые тактические матчи на компактных аренах с точной стрельбой и мгновенным стартом.", "zh": "Быстрые тактические матчи на компактных аренах с точной стрельбой и мгновенным стартом."}, controls: {"ru": ["WASD — движение", "Мышь — прицел", "R — перезарядка"], "en": ["WASD — движение", "Мышь — прицел", "R — перезарядка"], "zh": ["WASD — движение", "Мышь — прицел", "R — перезарядка"]},
    imageUrl: "/manus-storage/strike-point_0e5df852.jpg", gameUrl: null, rating: 4.5, plays: 6500000, year: 2026, badge: null,
  },
  {
    slug: "turbo-league", titles: {"ru": "Turbo League", "en": "Turbo League", "zh": "Turbo League"}, category: "sports", tags: ["футбол", "машины", "аркада"],
    descriptions: {"ru": "Футбол на реактивных машинах: забивайте с воздуха и защищайте ворота вместе с командой.", "en": "Футбол на реактивных машинах: забивайте с воздуха и защищайте ворота вместе с командой.", "zh": "Футбол на реактивных машинах: забивайте с воздуха и защищайте ворота вместе с командой."}, controls: {"ru": ["Стрелки — движение", "X — прыжок", "C — ускорение"], "en": ["Стрелки — движение", "X — прыжок", "C — ускорение"], "zh": ["Стрелки — движение", "X — прыжок", "C — ускорение"]},
    imageUrl: "/manus-storage/turbo-league_38b4985b.jpg", gameUrl: null, rating: 4.7, plays: 5900000, year: 2026, badge: null,
  },
  {
    slug: "block-bloom", titles: {"ru": "Block Bloom", "en": "Block Bloom", "zh": "Block Bloom"}, category: "arcade", tags: ["блоки", "релакс", "комбо"],
    descriptions: {"ru": "Собирайте сияющие фигуры в линии и создавайте длинные цепочки комбо без таймера.", "en": "Собирайте сияющие фигуры в линии и создавайте длинные цепочки комбо без таймера.", "zh": "Собирайте сияющие фигуры в линии и создавайте длинные цепочки комбо без таймера."}, controls: {"ru": ["Мышь — перемещение", "Клик — разместить", "Esc — пауза"], "en": ["Мышь — перемещение", "Клик — разместить", "Esc — пауза"], "zh": ["Мышь — перемещение", "Клик — разместить", "Esc — пауза"]},
    imageUrl: "/manus-storage/block-bloom_5b4762f2.jpg", gameUrl: null, rating: 4.4, plays: 3800000, year: 2026, badge: "new",
  },
  {
    slug: "zero-zone", titles: {"ru": "Zero Zone", "en": "Zero Zone", "zh": "Zero Zone"}, category: "action", tags: ["выживание", "арена", "волны"],
    descriptions: {"ru": "Отбивайтесь от волн дронов, комбинируйте оружие и продержитесь до эвакуации.", "en": "Отбивайтесь от волн дронов, комбинируйте оружие и продержитесь до эвакуации.", "zh": "Отбивайтесь от волн дронов, комбинируйте оружие и продержитесь до эвакуации."}, controls: {"ru": ["WASD — движение", "Мышь — атака", "1–3 — оружие"], "en": ["WASD — движение", "Мышь — атака", "1–3 — оружие"], "zh": ["WASD — движение", "Мышь — атака", "1–3 — оружие"]},
    imageUrl: "/manus-storage/zero-zone_376d2d43.jpg", gameUrl: null, rating: 4.6, plays: 8100000, year: 2026, badge: null,
  },
  {
    slug: "circuit-sprint", titles: {"ru": "Circuit Sprint", "en": "Circuit Sprint", "zh": "Circuit Sprint"}, category: "driving", tags: ["скорость", "тайм-атак", "аркада"],
    descriptions: {"ru": "Короткие техничные трассы, призрачные соперники и борьба за сотые доли секунды.", "en": "Короткие техничные трассы, призрачные соперники и борьба за сотые доли секунды.", "zh": "Короткие техничные трассы, призрачные соперники и борьба за сотые доли секунды."}, controls: {"ru": ["WASD — движение", "Shift — нитро", "R — рестарт"], "en": ["WASD — движение", "Shift — нитро", "R — рестарт"], "zh": ["WASD — движение", "Shift — нитро", "R — рестарт"]},
    imageUrl: "/manus-storage/circuit-sprint_c7aeca2c.jpg", gameUrl: null, rating: 4.3, plays: 2700000, year: 2026, badge: null,
  },
  {
    slug: "portal-paws", titles: {"ru": "Portal Paws", "en": "Portal Paws", "zh": "Portal Paws"}, category: "adventure", tags: ["платформер", "головоломка", "кот"],
    descriptions: {"ru": "Помогите космическому коту вернуться домой, прыгая между измерениями и собирая звёзды.", "en": "Помогите космическому коту вернуться домой, прыгая между измерениями и собирая звёзды.", "zh": "Помогите космическому коту вернуться домой, прыгая между измерениями и собирая звёзды."}, controls: {"ru": ["Стрелки — движение", "Пробел — прыжок", "E — портал"], "en": ["Стрелки — движение", "Пробел — прыжок", "E — портал"], "zh": ["Стрелки — движение", "Пробел — прыжок", "E — портал"]},
    imageUrl: "/manus-storage/portal-paws_66edbb6b.jpg", gameUrl: null, rating: 4.8, plays: 3400000, year: 2026, badge: "new",
  },
  {
    slug: "goal-rush", titles: {"ru": "Goal Rush", "en": "Goal Rush", "zh": "Goal Rush"}, category: "sports", tags: ["футбол", "пенальти", "быстрая"],
    descriptions: {"ru": "Серия пенальти с идеальной физикой удара. Читайте вратаря и попадайте в девятку.", "en": "Серия пенальти с идеальной физикой удара. Читайте вратаря и попадайте в девятку.", "zh": "Серия пенальти с идеальной физикой удара. Читайте вратаря и попадайте в девятку."}, controls: {"ru": ["Мышь — направление", "Удержание — сила", "Пробел — удар"], "en": ["Мышь — направление", "Удержание — сила", "Пробел — удар"], "zh": ["Мышь — направление", "Удержание — сила", "Пробел — удар"]},
    imageUrl: "/manus-storage/goal-rush_deaf24c8.jpg", gameUrl: null, rating: 4.2, plays: 2100000, year: 2026, badge: null,
  },
  {
    slug: "pixel-frontier", titles: {"ru": "Pixel Frontier", "en": "Pixel Frontier", "zh": "Pixel Frontier"}, category: "simulation", tags: ["крафт", "исследование", "пиксели"],
    descriptions: {"ru": "Исследуйте уютный бесконечный мир, собирайте ресурсы и стройте собственную базу.", "en": "Исследуйте уютный бесконечный мир, собирайте ресурсы и стройте собственную базу.", "zh": "Исследуйте уютный бесконечный мир, собирайте ресурсы и стройте собственную базу."}, controls: {"ru": ["WASD — движение", "Мышь — действие", "I — инвентарь"], "en": ["WASD — движение", "Мышь — действие", "I — инвентарь"], "zh": ["WASD — движение", "Мышь — действие", "I — инвентарь"]},
    imageUrl: "/manus-storage/pixel-frontier_df01fd37.jpg", gameUrl: null, rating: 4.5, plays: 4700000, year: 2026, badge: null,
  },
  {
    slug: "action-01", titles: {"ru": "Неоновый Прибой", "en": "Неоновый Прибой", "zh": "Неоновый Прибой"}, category: "action", tags: ["экшен"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — движение", "Мышь — действие"], "en": ["WASD — движение", "Мышь — действие"], "zh": ["WASD — движение", "Мышь — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.4, plays: 1781000, year: 2026, badge: null,
  },
  {
    slug: "action-02", titles: {"ru": "Пепельный Свод", "en": "Пепельный Свод", "zh": "Пепельный Свод"}, category: "action", tags: ["экшен"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — движение", "Мышь — действие"], "en": ["WASD — движение", "Мышь — действие"], "zh": ["WASD — движение", "Мышь — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.5, plays: 1918000, year: 2026, badge: null,
  },
  {
    slug: "action-03", titles: {"ru": "Небесный Крюк", "en": "Небесный Крюк", "zh": "Небесный Крюк"}, category: "action", tags: ["экшен"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — движение", "Мышь — действие"], "en": ["WASD — движение", "Мышь — действие"], "zh": ["WASD — движение", "Мышь — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.6, plays: 2055000, year: 2026, badge: null,
  },
  {
    slug: "action-04", titles: {"ru": "Моховой Клинок", "en": "Моховой Клинок", "zh": "Моховой Клинок"}, category: "action", tags: ["экшен"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — движение", "Мышь — действие"], "en": ["WASD — движение", "Мышь — действие"], "zh": ["WASD — движение", "Мышь — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.7, plays: 2192000, year: 2026, badge: null,
  },
  {
    slug: "action-05", titles: {"ru": "Призматическая Осада", "en": "Призматическая Осада", "zh": "Призматическая Осада"}, category: "action", tags: ["экшен"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — движение", "Мышь — действие"], "en": ["WASD — движение", "Мышь — действие"], "zh": ["WASD — движение", "Мышь — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.8, plays: 2329000, year: 2026, badge: null,
  },
  {
    slug: "action-06", titles: {"ru": "Дрейфующий Фонарь", "en": "Дрейфующий Фонарь", "zh": "Дрейфующий Фонарь"}, category: "action", tags: ["экшен"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — движение", "Мышь — действие"], "en": ["WASD — движение", "Мышь — действие"], "zh": ["WASD — движение", "Мышь — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.9, plays: 2466000, year: 2026, badge: "new",
  },
  {
    slug: "action-07", titles: {"ru": "Железный Сад", "en": "Железный Сад", "zh": "Железный Сад"}, category: "action", tags: ["экшен"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — движение", "Мышь — действие"], "en": ["WASD — движение", "Мышь — действие"], "zh": ["WASD — движение", "Мышь — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.1, plays: 2603000, year: 2026, badge: null,
  },
  {
    slug: "action-08", titles: {"ru": "Бегущий Сквозь Завесу", "en": "Бегущий Сквозь Завесу", "zh": "Бегущий Сквозь Завесу"}, category: "action", tags: ["экшен"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — движение", "Мышь — действие"], "en": ["WASD — движение", "Мышь — действие"], "zh": ["WASD — движение", "Мышь — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.2, plays: 2740000, year: 2026, badge: null,
  },
  {
    slug: "action-09", titles: {"ru": "Приливная Кузня", "en": "Приливная Кузня", "zh": "Приливная Кузня"}, category: "action", tags: ["экшен"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — движение", "Мышь — действие"], "en": ["WASD — движение", "Мышь — действие"], "zh": ["WASD — движение", "Мышь — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.3, plays: 2877000, year: 2026, badge: null,
  },
  {
    slug: "action-10", titles: {"ru": "Солнечная Спираль", "en": "Солнечная Спираль", "zh": "Солнечная Спираль"}, category: "action", tags: ["экшен"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — движение", "Мышь — действие"], "en": ["WASD — движение", "Мышь — действие"], "zh": ["WASD — движение", "Мышь — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.4, plays: 3014000, year: 2026, badge: null,
  },
  {
    slug: "action-11", titles: {"ru": "Цветочный Контур", "en": "Цветочный Контур", "zh": "Цветочный Контур"}, category: "action", tags: ["экшен"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — движение", "Мышь — действие"], "en": ["WASD — движение", "Мышь — действие"], "zh": ["WASD — движение", "Мышь — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.5, plays: 3151000, year: 2026, badge: null,
  },
  {
    slug: "adventure-01", titles: {"ru": "Картограф приливного стекла", "en": "Картограф приливного стекла", "zh": "Картограф приливного стекла"}, category: "adventure", tags: ["приключения"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение", "Пробел — действие"], "en": ["Стрелки — движение", "Пробел — действие"], "zh": ["Стрелки — движение", "Пробел — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.6, plays: 3288000, year: 2026, badge: null,
  },
  {
    slug: "adventure-02", titles: {"ru": "Сад углей", "en": "Сад углей", "zh": "Сад углей"}, category: "adventure", tags: ["приключения"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение", "Пробел — действие"], "en": ["Стрелки — движение", "Пробел — действие"], "zh": ["Стрелки — движение", "Пробел — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.7, plays: 3425000, year: 2026, badge: null,
  },
  {
    slug: "adventure-03", titles: {"ru": "Кочевник лунной магистрали", "en": "Кочевник лунной магистрали", "zh": "Кочевник лунной магистрали"}, category: "adventure", tags: ["приключения"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение", "Пробел — действие"], "en": ["Стрелки — движение", "Пробел — действие"], "zh": ["Стрелки — движение", "Пробел — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.8, plays: 3562000, year: 2026, badge: null,
  },
  {
    slug: "adventure-04", titles: {"ru": "Эхо-фонарь", "en": "Эхо-фонарь", "zh": "Эхо-фонарь"}, category: "adventure", tags: ["приключения"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение", "Пробел — действие"], "en": ["Стрелки — движение", "Пробел — действие"], "zh": ["Стрелки — движение", "Пробел — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.9, plays: 3699000, year: 2026, badge: null,
  },
  {
    slug: "adventure-05", titles: {"ru": "Воздушный змей морозного ветра", "en": "Воздушный змей морозного ветра", "zh": "Воздушный змей морозного ветра"}, category: "adventure", tags: ["приключения"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение", "Пробел — действие"], "en": ["Стрелки — движение", "Пробел — действие"], "zh": ["Стрелки — движение", "Пробел — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.1, plays: 3836000, year: 2026, badge: null,
  },
  {
    slug: "adventure-06", titles: {"ru": "Пробуждение корней", "en": "Пробуждение корней", "zh": "Пробуждение корней"}, category: "adventure", tags: ["приключения"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение", "Пробел — действие"], "en": ["Стрелки — движение", "Пробел — действие"], "zh": ["Стрелки — движение", "Пробел — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.2, plays: 3973000, year: 2026, badge: null,
  },
  {
    slug: "adventure-07", titles: {"ru": "Заводная крачка", "en": "Заводная крачка", "zh": "Заводная крачка"}, category: "adventure", tags: ["приключения"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение", "Пробел — действие"], "en": ["Стрелки — движение", "Пробел — действие"], "zh": ["Стрелки — движение", "Пробел — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.3, plays: 4110000, year: 2026, badge: null,
  },
  {
    slug: "adventure-08", titles: {"ru": "Призматическое хранилище", "en": "Призматическое хранилище", "zh": "Призматическое хранилище"}, category: "adventure", tags: ["приключения"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение", "Пробел — действие"], "en": ["Стрелки — движение", "Пробел — действие"], "zh": ["Стрелки — движение", "Пробел — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.4, plays: 4247000, year: 2026, badge: null,
  },
  {
    slug: "adventure-09", titles: {"ru": "Пыльный хор", "en": "Пыльный хор", "zh": "Пыльный хор"}, category: "adventure", tags: ["приключения"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение", "Пробел — действие"], "en": ["Стрелки — движение", "Пробел — действие"], "zh": ["Стрелки — движение", "Пробел — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.5, plays: 4384000, year: 2026, badge: null,
  },
  {
    slug: "adventure-10", titles: {"ru": "Хранители мохового света", "en": "Хранители мохового света", "zh": "Хранители мохового света"}, category: "adventure", tags: ["приключения"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение", "Пробел — действие"], "en": ["Стрелки — движение", "Пробел — действие"], "zh": ["Стрелки — движение", "Пробел — действие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.6, plays: 4521000, year: 2026, badge: null,
  },
  {
    slug: "arcade-01", titles: {"ru": "Облачный курьер", "en": "Облачный курьер", "zh": "Облачный курьер"}, category: "arcade", tags: ["аркадные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь / касание — играть"], "en": ["Мышь / касание — играть"], "zh": ["Мышь / касание — играть"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.7, plays: 4658000, year: 2026, badge: null,
  },
  {
    slug: "arcade-02", titles: {"ru": "Жемчужный захват", "en": "Жемчужный захват", "zh": "Жемчужный захват"}, category: "arcade", tags: ["аркадные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь / касание — играть"], "en": ["Мышь / касание — играть"], "zh": ["Мышь / касание — играть"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.8, plays: 4795000, year: 2026, badge: "new",
  },
  {
    slug: "arcade-03", titles: {"ru": "Ветровая спираль", "en": "Ветровая спираль", "zh": "Ветровая спираль"}, category: "arcade", tags: ["аркадные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь / касание — играть"], "en": ["Мышь / касание — играть"], "zh": ["Мышь / касание — играть"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.9, plays: 4932000, year: 2026, badge: null,
  },
  {
    slug: "arcade-04", titles: {"ru": "Искра шестерён", "en": "Искра шестерён", "zh": "Искра шестерён"}, category: "arcade", tags: ["аркадные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь / касание — играть"], "en": ["Мышь / касание — играть"], "zh": ["Мышь / касание — играть"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.1, plays: 5069000, year: 2026, badge: null,
  },
  {
    slug: "arcade-05", titles: {"ru": "Приливный прыгун", "en": "Приливный прыгун", "zh": "Приливный прыгун"}, category: "arcade", tags: ["аркадные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь / касание — играть"], "en": ["Мышь / касание — играть"], "zh": ["Мышь / касание — играть"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.2, plays: 5206000, year: 2026, badge: null,
  },
  {
    slug: "arcade-06", titles: {"ru": "Грозовой звон", "en": "Грозовой звон", "zh": "Грозовой звон"}, category: "arcade", tags: ["аркадные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь / касание — играть"], "en": ["Мышь / касание — играть"], "zh": ["Мышь / касание — играть"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.3, plays: 5343000, year: 2026, badge: null,
  },
  {
    slug: "arcade-07", titles: {"ru": "Скользящий полярный свет", "en": "Скользящий полярный свет", "zh": "Скользящий полярный свет"}, category: "arcade", tags: ["аркадные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь / касание — играть"], "en": ["Мышь / касание — играть"], "zh": ["Мышь / касание — играть"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.4, plays: 5480000, year: 2026, badge: null,
  },
  {
    slug: "arcade-08", titles: {"ru": "Солнечный перекат", "en": "Солнечный перекат", "zh": "Солнечный перекат"}, category: "arcade", tags: ["аркадные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь / касание — играть"], "en": ["Мышь / касание — играть"], "zh": ["Мышь / касание — играть"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.5, plays: 5617000, year: 2026, badge: null,
  },
  {
    slug: "arcade-09", titles: {"ru": "Ловец угольков", "en": "Ловец угольков", "zh": "Ловец угольков"}, category: "arcade", tags: ["аркадные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь / касание — играть"], "en": ["Мышь / касание — играть"], "zh": ["Мышь / касание — играть"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.6, plays: 5754000, year: 2026, badge: null,
  },
  {
    slug: "arcade-10", titles: {"ru": "Орбитальный сад", "en": "Орбитальный сад", "zh": "Орбитальный сад"}, category: "arcade", tags: ["аркадные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь / касание — играть"], "en": ["Мышь / касание — играть"], "zh": ["Мышь / касание — играть"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.7, plays: 5891000, year: 2026, badge: null,
  },
  {
    slug: "arcade-11", titles: {"ru": "Призматическое крыло", "en": "Призматическое крыло", "zh": "Призматическое крыло"}, category: "arcade", tags: ["аркадные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь / касание — играть"], "en": ["Мышь / касание — играть"], "zh": ["Мышь / касание — играть"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.8, plays: 6028000, year: 2026, badge: null,
  },
  {
    slug: "board-01", titles: {"ru": "Совет Приливного Стекла", "en": "Совет Приливного Стекла", "zh": "Совет Приливного Стекла"}, category: "board", tags: ["настольные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ход"], "en": ["Мышь — выбрать ход"], "zh": ["Мышь — выбрать ход"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.9, plays: 6165000, year: 2026, badge: null,
  },
  {
    slug: "board-02", titles: {"ru": "Фонарный Сад", "en": "Фонарный Сад", "zh": "Фонарный Сад"}, category: "board", tags: ["настольные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ход"], "en": ["Мышь — выбрать ход"], "zh": ["Мышь — выбрать ход"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.1, plays: 6302000, year: 2026, badge: null,
  },
  {
    slug: "board-03", titles: {"ru": "Железные Воздушные Змеи", "en": "Железные Воздушные Змеи", "zh": "Железные Воздушные Змеи"}, category: "board", tags: ["настольные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ход"], "en": ["Мышь — выбрать ход"], "zh": ["Мышь — выбрать ход"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.2, plays: 6439000, year: 2026, badge: null,
  },
  {
    slug: "board-04", titles: {"ru": "Моховой Монастырь", "en": "Моховой Монастырь", "zh": "Моховой Монастырь"}, category: "board", tags: ["настольные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ход"], "en": ["Мышь — выбрать ход"], "zh": ["Мышь — выбрать ход"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.3, plays: 6576000, year: 2026, badge: null,
  },
  {
    slug: "board-05", titles: {"ru": "Картографы Углей", "en": "Картографы Углей", "zh": "Картографы Углей"}, category: "board", tags: ["настольные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ход"], "en": ["Мышь — выбрать ход"], "zh": ["Мышь — выбрать ход"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.4, plays: 6713000, year: 2026, badge: null,
  },
  {
    slug: "board-06", titles: {"ru": "Маскарад Лунного Ключа", "en": "Маскарад Лунного Ключа", "zh": "Маскарад Лунного Ключа"}, category: "board", tags: ["настольные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ход"], "en": ["Мышь — выбрать ход"], "zh": ["Мышь — выбрать ход"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.5, plays: 6850000, year: 2026, badge: null,
  },
  {
    slug: "board-07", titles: {"ru": "Механический Караван", "en": "Механический Караван", "zh": "Механический Караван"}, category: "board", tags: ["настольные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ход"], "en": ["Мышь — выбрать ход"], "zh": ["Мышь — выбрать ход"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.6, plays: 6987000, year: 2026, badge: null,
  },
  {
    slug: "board-08", titles: {"ru": "Рифовые Гонщики", "en": "Рифовые Гонщики", "zh": "Рифовые Гонщики"}, category: "board", tags: ["настольные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ход"], "en": ["Мышь — выбрать ход"], "zh": ["Мышь — выбрать ход"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.7, plays: 7124000, year: 2026, badge: "new",
  },
  {
    slug: "board-09", titles: {"ru": "Шепчущие Колодцы", "en": "Шепчущие Колодцы", "zh": "Шепчущие Колодцы"}, category: "board", tags: ["настольные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ход"], "en": ["Мышь — выбрать ход"], "zh": ["Мышь — выбрать ход"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.8, plays: 7261000, year: 2026, badge: null,
  },
  {
    slug: "board-10", titles: {"ru": "Авроральная Кузница", "en": "Авроральная Кузница", "zh": "Авроральная Кузница"}, category: "board", tags: ["настольные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ход"], "en": ["Мышь — выбрать ход"], "zh": ["Мышь — выбрать ход"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.9, plays: 7398000, year: 2026, badge: null,
  },
  {
    slug: "board-11", titles: {"ru": "Сад Эха", "en": "Сад Эха", "zh": "Сад Эха"}, category: "board", tags: ["настольные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ход"], "en": ["Мышь — выбрать ход"], "zh": ["Мышь — выбрать ход"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.1, plays: 7535000, year: 2026, badge: null,
  },
  {
    slug: "board-12", titles: {"ru": "Скворцы-Стражи", "en": "Скворцы-Стражи", "zh": "Скворцы-Стражи"}, category: "board", tags: ["настольные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ход"], "en": ["Мышь — выбрать ход"], "zh": ["Мышь — выбрать ход"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.2, plays: 7672000, year: 2026, badge: null,
  },
  {
    slug: "card-01", titles: {"ru": "Атлас Разломов", "en": "Атлас Разломов", "zh": "Атлас Разломов"}, category: "card", tags: ["карточные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать карту"], "en": ["Мышь — выбрать карту"], "zh": ["Мышь — выбрать карту"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.3, plays: 7809000, year: 2026, badge: null,
  },
  {
    slug: "card-02", titles: {"ru": "Зелёный Пакт", "en": "Зелёный Пакт", "zh": "Зелёный Пакт"}, category: "card", tags: ["карточные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать карту"], "en": ["Мышь — выбрать карту"], "zh": ["Мышь — выбрать карту"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.4, plays: 7946000, year: 2026, badge: null,
  },
  {
    slug: "card-03", titles: {"ru": "Контур Кинцуги", "en": "Контур Кинцуги", "zh": "Контур Кинцуги"}, category: "card", tags: ["карточные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать карту"], "en": ["Мышь — выбрать карту"], "zh": ["Мышь — выбрать карту"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.5, plays: 8083000, year: 2026, badge: null,
  },
  {
    slug: "card-04", titles: {"ru": "Лунный Зверинец", "en": "Лунный Зверинец", "zh": "Лунный Зверинец"}, category: "card", tags: ["карточные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать карту"], "en": ["Мышь — выбрать карту"], "zh": ["Мышь — выбрать карту"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.6, plays: 8220000, year: 2026, badge: null,
  },
  {
    slug: "card-05", titles: {"ru": "Латунный Парламент", "en": "Латунный Парламент", "zh": "Латунный Парламент"}, category: "card", tags: ["карточные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать карту"], "en": ["Мышь — выбрать карту"], "zh": ["Мышь — выбрать карту"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.7, plays: 8357000, year: 2026, badge: null,
  },
  {
    slug: "card-06", titles: {"ru": "Армада Приливного Стекла", "en": "Армада Приливного Стекла", "zh": "Армада Приливного Стекла"}, category: "card", tags: ["карточные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать карту"], "en": ["Мышь — выбрать карту"], "zh": ["Мышь — выбрать карту"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.8, plays: 8494000, year: 2026, badge: null,
  },
  {
    slug: "card-07", titles: {"ru": "Алхимия Углей", "en": "Алхимия Углей", "zh": "Алхимия Углей"}, category: "card", tags: ["карточные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать карту"], "en": ["Мышь — выбрать карту"], "zh": ["Мышь — выбрать карту"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.9, plays: 8631000, year: 2026, badge: null,
  },
  {
    slug: "card-08", titles: {"ru": "Небесный Ткацкий Станок", "en": "Небесный Ткацкий Станок", "zh": "Небесный Ткацкий Станок"}, category: "card", tags: ["карточные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать карту"], "en": ["Мышь — выбрать карту"], "zh": ["Мышь — выбрать карту"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.1, plays: 8768000, year: 2026, badge: null,
  },
  {
    slug: "card-09", titles: {"ru": "Паром Фонарей", "en": "Паром Фонарей", "zh": "Паром Фонарей"}, category: "card", tags: ["карточные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать карту"], "en": ["Мышь — выбрать карту"], "zh": ["Мышь — выбрать карту"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.2, plays: 8905000, year: 2026, badge: null,
  },
  {
    slug: "card-10", titles: {"ru": "Каменоломня Гигантов", "en": "Каменоломня Гигантов", "zh": "Каменоломня Гигантов"}, category: "card", tags: ["карточные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать карту"], "en": ["Мышь — выбрать карту"], "zh": ["Мышь — выбрать карту"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.3, plays: 9042000, year: 2026, badge: null,
  },
  {
    slug: "card-11", titles: {"ru": "Хроматическая Осада", "en": "Хроматическая Осада", "zh": "Хроматическая Осада"}, category: "card", tags: ["карточные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать карту"], "en": ["Мышь — выбрать карту"], "zh": ["Мышь — выбрать карту"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.4, plays: 9179000, year: 2026, badge: null,
  },
  {
    slug: "card-12", titles: {"ru": "Курьер Авроры", "en": "Курьер Авроры", "zh": "Курьер Авроры"}, category: "card", tags: ["карточные"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать карту"], "en": ["Мышь — выбрать карту"], "zh": ["Мышь — выбрать карту"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.5, plays: 9316000, year: 2026, badge: null,
  },
  {
    slug: "clicker-01", titles: {"ru": "Туманная кузница", "en": "Туманная кузница", "zh": "Туманная кузница"}, category: "clicker", tags: ["кликеры"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клик — собирать"], "en": ["Клик — собирать"], "zh": ["Клик — собирать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.6, plays: 9453000, year: 2026, badge: "new",
  },
  {
    slug: "clicker-02", titles: {"ru": "Хранитель приливов", "en": "Хранитель приливов", "zh": "Хранитель приливов"}, category: "clicker", tags: ["кликеры"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клик — собирать"], "en": ["Клик — собирать"], "zh": ["Клик — собирать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.7, plays: 9590000, year: 2026, badge: null,
  },
  {
    slug: "clicker-03", titles: {"ru": "Моховая клятва", "en": "Моховая клятва", "zh": "Моховая клятва"}, category: "clicker", tags: ["кликеры"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клик — собирать"], "en": ["Клик — собирать"], "zh": ["Клик — собирать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.8, plays: 9727000, year: 2026, badge: null,
  },
  {
    slug: "clicker-04", titles: {"ru": "Механический сад", "en": "Механический сад", "zh": "Механический сад"}, category: "clicker", tags: ["кликеры"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клик — собирать"], "en": ["Клик — собирать"], "zh": ["Клик — собирать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.9, plays: 9864000, year: 2026, badge: null,
  },
  {
    slug: "clicker-05", titles: {"ru": "Пастух гроз", "en": "Пастух гроз", "zh": "Пастух гроз"}, category: "clicker", tags: ["кликеры"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клик — собирать"], "en": ["Клик — собирать"], "zh": ["Клик — собирать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.1, plays: 10001000, year: 2026, badge: null,
  },
  {
    slug: "clicker-06", titles: {"ru": "Реестр фонарей", "en": "Реестр фонарей", "zh": "Реестр фонарей"}, category: "clicker", tags: ["кликеры"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клик — собирать"], "en": ["Клик — собирать"], "zh": ["Клик — собирать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.2, plays: 10138000, year: 2026, badge: null,
  },
  {
    slug: "clicker-07", titles: {"ru": "Пыльцевый паломник", "en": "Пыльцевый паломник", "zh": "Пыльцевый паломник"}, category: "clicker", tags: ["кликеры"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клик — собирать"], "en": ["Клик — собирать"], "zh": ["Клик — собирать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.3, plays: 10275000, year: 2026, badge: null,
  },
  {
    slug: "clicker-08", titles: {"ru": "Ныряльщик рун", "en": "Ныряльщик рун", "zh": "Ныряльщик рун"}, category: "clicker", tags: ["кликеры"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клик — собирать"], "en": ["Клик — собирать"], "zh": ["Клик — собирать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.4, plays: 10412000, year: 2026, badge: null,
  },
  {
    slug: "clicker-09", titles: {"ru": "Искровой курьер", "en": "Искровой курьер", "zh": "Искровой курьер"}, category: "clicker", tags: ["кликеры"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клик — собирать"], "en": ["Клик — собирать"], "zh": ["Клик — собирать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.5, plays: 10549000, year: 2026, badge: null,
  },
  {
    slug: "clicker-10", titles: {"ru": "Картограф снов", "en": "Картограф снов", "zh": "Картограф снов"}, category: "clicker", tags: ["кликеры"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клик — собирать"], "en": ["Клик — собирать"], "zh": ["Клик — собирать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.6, plays: 10686000, year: 2026, badge: null,
  },
  {
    slug: "clicker-11", titles: {"ru": "Фермер лунных семян", "en": "Фермер лунных семян", "zh": "Фермер лунных семян"}, category: "clicker", tags: ["кликеры"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клик — собирать"], "en": ["Клик — собирать"], "zh": ["Клик — собирать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.7, plays: 10823000, year: 2026, badge: null,
  },
  {
    slug: "clicker-12", titles: {"ru": "Каменщик эха", "en": "Каменщик эха", "zh": "Каменщик эха"}, category: "clicker", tags: ["кликеры"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клик — собирать"], "en": ["Клик — собирать"], "zh": ["Клик — собирать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.8, plays: 10960000, year: 2026, badge: null,
  },
  {
    slug: "driving-01", titles: {"ru": "Солнечная Вуаль", "en": "Солнечная Вуаль", "zh": "Солнечная Вуаль"}, category: "driving", tags: ["гонки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — управление"], "en": ["WASD — управление"], "zh": ["WASD — управление"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.9, plays: 11097000, year: 2026, badge: null,
  },
  {
    slug: "driving-02", titles: {"ru": "Бегун Корней", "en": "Бегун Корней", "zh": "Бегун Корней"}, category: "driving", tags: ["гонки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — управление"], "en": ["WASD — управление"], "zh": ["WASD — управление"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.1, plays: 11234000, year: 2026, badge: null,
  },
  {
    slug: "driving-03", titles: {"ru": "Кольцевой Тягач", "en": "Кольцевой Тягач", "zh": "Кольцевой Тягач"}, category: "driving", tags: ["гонки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — управление"], "en": ["WASD — управление"], "zh": ["WASD — управление"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.2, plays: 11371000, year: 2026, badge: null,
  },
  {
    slug: "driving-04", titles: {"ru": "Небесный Тариф", "en": "Небесный Тариф", "zh": "Небесный Тариф"}, category: "driving", tags: ["гонки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — управление"], "en": ["WASD — управление"], "zh": ["WASD — управление"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.3, plays: 11508000, year: 2026, badge: null,
  },
  {
    slug: "driving-05", titles: {"ru": "Дюнный След", "en": "Дюнный След", "zh": "Дюнный След"}, category: "driving", tags: ["гонки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — управление"], "en": ["WASD — управление"], "zh": ["WASD — управление"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.4, plays: 11645000, year: 2026, badge: null,
  },
  {
    slug: "driving-06", titles: {"ru": "Грозовое Послание", "en": "Грозовое Послание", "zh": "Грозовое Послание"}, category: "driving", tags: ["гонки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — управление"], "en": ["WASD — управление"], "zh": ["WASD — управление"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.5, plays: 11782000, year: 2026, badge: "new",
  },
  {
    slug: "driving-07", titles: {"ru": "Приливная Погоня", "en": "Приливная Погоня", "zh": "Приливная Погоня"}, category: "driving", tags: ["гонки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — управление"], "en": ["WASD — управление"], "zh": ["WASD — управление"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.6, plays: 11919000, year: 2026, badge: null,
  },
  {
    slug: "driving-08", titles: {"ru": "Дикий Меридиан", "en": "Дикий Меридиан", "zh": "Дикий Меридиан"}, category: "driving", tags: ["гонки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — управление"], "en": ["WASD — управление"], "zh": ["WASD — управление"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.7, plays: 12056000, year: 2026, badge: null,
  },
  {
    slug: "driving-09", titles: {"ru": "Морозная Кузня", "en": "Морозная Кузня", "zh": "Морозная Кузня"}, category: "driving", tags: ["гонки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — управление"], "en": ["WASD — управление"], "zh": ["WASD — управление"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.8, plays: 12193000, year: 2026, badge: null,
  },
  {
    slug: "driving-10", titles: {"ru": "Бег Углей", "en": "Бег Углей", "zh": "Бег Углей"}, category: "driving", tags: ["гонки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD — управление"], "en": ["WASD — управление"], "zh": ["WASD — управление"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.9, plays: 12330000, year: 2026, badge: null,
  },
  {
    slug: "io-01", titles: {"ru": "Мохостражи", "en": "Мохостражи", "zh": "Мохостражи"}, category: "io", tags: [".io"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD / мышь — управление"], "en": ["WASD / мышь — управление"], "zh": ["WASD / мышь — управление"]},
    imageUrl: "/manus-storage/game-io_846bbfae.jpg", gameUrl: null, rating: 4.1, plays: 12467000, year: 2026, badge: null,
  },
  {
    slug: "io-02", titles: {"ru": "Углепарусники", "en": "Углепарусники", "zh": "Углепарусники"}, category: "io", tags: [".io"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD / мышь — управление"], "en": ["WASD / мышь — управление"], "zh": ["WASD / мышь — управление"]},
    imageUrl: "/manus-storage/game-io_846bbfae.jpg", gameUrl: null, rating: 4.2, plays: 12604000, year: 2026, badge: null,
  },
  {
    slug: "io-03", titles: {"ru": "Кузнецы облаков", "en": "Кузнецы облаков", "zh": "Кузнецы облаков"}, category: "io", tags: [".io"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD / мышь — управление"], "en": ["WASD / мышь — управление"], "zh": ["WASD / мышь — управление"]},
    imageUrl: "/manus-storage/game-io_846bbfae.jpg", gameUrl: null, rating: 4.3, plays: 12741000, year: 2026, badge: null,
  },
  {
    slug: "io-04", titles: {"ru": "Приливное стекло", "en": "Приливное стекло", "zh": "Приливное стекло"}, category: "io", tags: [".io"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD / мышь — управление"], "en": ["WASD / мышь — управление"], "zh": ["WASD / мышь — управление"]},
    imageUrl: "/manus-storage/game-io_846bbfae.jpg", gameUrl: null, rating: 4.4, plays: 12878000, year: 2026, badge: null,
  },
  {
    slug: "io-05", titles: {"ru": "Рельсовые гонщики", "en": "Рельсовые гонщики", "zh": "Рельсовые гонщики"}, category: "io", tags: [".io"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD / мышь — управление"], "en": ["WASD / мышь — управление"], "zh": ["WASD / мышь — управление"]},
    imageUrl: "/manus-storage/game-io_846bbfae.jpg", gameUrl: null, rating: 4.5, plays: 13015000, year: 2026, badge: null,
  },
  {
    slug: "io-06", titles: {"ru": "Лунные мотыльки", "en": "Лунные мотыльки", "zh": "Лунные мотыльки"}, category: "io", tags: [".io"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD / мышь — управление"], "en": ["WASD / мышь — управление"], "zh": ["WASD / мышь — управление"]},
    imageUrl: "/manus-storage/game-io_846bbfae.jpg", gameUrl: null, rating: 4.6, plays: 13152000, year: 2026, badge: null,
  },
  {
    slug: "io-07", titles: {"ru": "Призматическая нора", "en": "Призматическая нора", "zh": "Призматическая нора"}, category: "io", tags: [".io"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD / мышь — управление"], "en": ["WASD / мышь — управление"], "zh": ["WASD / мышь — управление"]},
    imageUrl: "/manus-storage/game-io_846bbfae.jpg", gameUrl: null, rating: 4.7, plays: 13289000, year: 2026, badge: null,
  },
  {
    slug: "io-08", titles: {"ru": "Ледяная кузня", "en": "Ледяная кузня", "zh": "Ледяная кузня"}, category: "io", tags: [".io"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD / мышь — управление"], "en": ["WASD / мышь — управление"], "zh": ["WASD / мышь — управление"]},
    imageUrl: "/manus-storage/game-io_846bbfae.jpg", gameUrl: null, rating: 4.8, plays: 13426000, year: 2026, badge: null,
  },
  {
    slug: "io-09", titles: {"ru": "Фонарики-огоньки", "en": "Фонарики-огоньки", "zh": "Фонарики-огоньки"}, category: "io", tags: [".io"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD / мышь — управление"], "en": ["WASD / мышь — управление"], "zh": ["WASD / мышь — управление"]},
    imageUrl: "/manus-storage/game-io_846bbfae.jpg", gameUrl: null, rating: 4.9, plays: 13563000, year: 2026, badge: null,
  },
  {
    slug: "io-10", titles: {"ru": "Чернильный риф", "en": "Чернильный риф", "zh": "Чернильный риф"}, category: "io", tags: [".io"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD / мышь — управление"], "en": ["WASD / мышь — управление"], "zh": ["WASD / мышь — управление"]},
    imageUrl: "/manus-storage/game-io_846bbfae.jpg", gameUrl: null, rating: 4.1, plays: 13700000, year: 2026, badge: null,
  },
  {
    slug: "io-11", titles: {"ru": "Рой солнечных жуков", "en": "Рой солнечных жуков", "zh": "Рой солнечных жуков"}, category: "io", tags: [".io"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD / мышь — управление"], "en": ["WASD / мышь — управление"], "zh": ["WASD / мышь — управление"]},
    imageUrl: "/manus-storage/game-io_846bbfae.jpg", gameUrl: null, rating: 4.2, plays: 13837000, year: 2026, badge: null,
  },
  {
    slug: "puzzle-01", titles: {"ru": "Настройщик прилива", "en": "Настройщик прилива", "zh": "Настройщик прилива"}, category: "puzzle", tags: ["головоломки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать"], "en": ["Мышь — выбрать"], "zh": ["Мышь — выбрать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.3, plays: 13974000, year: 2026, badge: null,
  },
  {
    slug: "puzzle-02", titles: {"ru": "Скованный мхом", "en": "Скованный мхом", "zh": "Скованный мхом"}, category: "puzzle", tags: ["головоломки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать"], "en": ["Мышь — выбрать"], "zh": ["Мышь — выбрать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.4, plays: 14111000, year: 2026, badge: "new",
  },
  {
    slug: "puzzle-03", titles: {"ru": "Заводной сад", "en": "Заводной сад", "zh": "Заводной сад"}, category: "puzzle", tags: ["головоломки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать"], "en": ["Мышь — выбрать"], "zh": ["Мышь — выбрать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.5, plays: 14248000, year: 2026, badge: null,
  },
  {
    slug: "puzzle-04", titles: {"ru": "Картограф углей", "en": "Картограф углей", "zh": "Картограф углей"}, category: "puzzle", tags: ["головоломки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать"], "en": ["Мышь — выбрать"], "zh": ["Мышь — выбрать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.6, plays: 14385000, year: 2026, badge: null,
  },
  {
    slug: "puzzle-05", titles: {"ru": "Облачные узлы", "en": "Облачные узлы", "zh": "Облачные узлы"}, category: "puzzle", tags: ["головоломки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать"], "en": ["Мышь — выбрать"], "zh": ["Мышь — выбрать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.7, plays: 14522000, year: 2026, badge: null,
  },
  {
    slug: "puzzle-06", titles: {"ru": "Хор фонарей", "en": "Хор фонарей", "zh": "Хор фонарей"}, category: "puzzle", tags: ["головоломки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать"], "en": ["Мышь — выбрать"], "zh": ["Мышь — выбрать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.8, plays: 14659000, year: 2026, badge: null,
  },
  {
    slug: "puzzle-07", titles: {"ru": "Пробуждение окаменелостей", "en": "Пробуждение окаменелостей", "zh": "Пробуждение окаменелостей"}, category: "puzzle", tags: ["головоломки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать"], "en": ["Мышь — выбрать"], "zh": ["Мышь — выбрать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.9, plays: 14796000, year: 2026, badge: null,
  },
  {
    slug: "puzzle-08", titles: {"ru": "Бархатное хранилище", "en": "Бархатное хранилище", "zh": "Бархатное хранилище"}, category: "puzzle", tags: ["головоломки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать"], "en": ["Мышь — выбрать"], "zh": ["Мышь — выбрать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.1, plays: 14933000, year: 2026, badge: null,
  },
  {
    slug: "puzzle-09", titles: {"ru": "Лунное семя", "en": "Лунное семя", "zh": "Лунное семя"}, category: "puzzle", tags: ["головоломки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать"], "en": ["Мышь — выбрать"], "zh": ["Мышь — выбрать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.2, plays: 15070000, year: 2026, badge: null,
  },
  {
    slug: "puzzle-10", titles: {"ru": "Чернильные острова", "en": "Чернильные острова", "zh": "Чернильные острова"}, category: "puzzle", tags: ["головоломки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать"], "en": ["Мышь — выбрать"], "zh": ["Мышь — выбрать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.3, plays: 15207000, year: 2026, badge: null,
  },
  {
    slug: "puzzle-11", titles: {"ru": "Ткацкий станок Авроры", "en": "Ткацкий станок Авроры", "zh": "Ткацкий станок Авроры"}, category: "puzzle", tags: ["головоломки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать"], "en": ["Мышь — выбрать"], "zh": ["Мышь — выбрать"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.4, plays: 15344000, year: 2026, badge: null,
  },
  {
    slug: "shooting-01", titles: {"ru": "Бездна: Залп", "en": "Бездна: Залп", "zh": "Бездна: Залп"}, category: "shooting", tags: ["стрелялки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD + мышь — прицел"], "en": ["WASD + мышь — прицел"], "zh": ["WASD + мышь — прицел"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.5, plays: 15481000, year: 2026, badge: null,
  },
  {
    slug: "shooting-02", titles: {"ru": "Пустынный контур", "en": "Пустынный контур", "zh": "Пустынный контур"}, category: "shooting", tags: ["стрелялки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD + мышь — прицел"], "en": ["WASD + мышь — прицел"], "zh": ["WASD + мышь — прицел"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.6, plays: 15618000, year: 2026, badge: null,
  },
  {
    slug: "shooting-03", titles: {"ru": "Лунная кузня", "en": "Лунная кузня", "zh": "Лунная кузня"}, category: "shooting", tags: ["стрелялки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD + мышь — прицел"], "en": ["WASD + мышь — прицел"], "zh": ["WASD + мышь — прицел"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.7, plays: 15755000, year: 2026, badge: null,
  },
  {
    slug: "shooting-04", titles: {"ru": "Протокол кроны", "en": "Протокол кроны", "zh": "Протокол кроны"}, category: "shooting", tags: ["стрелялки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD + мышь — прицел"], "en": ["WASD + мышь — прицел"], "zh": ["WASD + мышь — прицел"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.8, plays: 15892000, year: 2026, badge: null,
  },
  {
    slug: "shooting-05", titles: {"ru": "Полярный груз", "en": "Полярный груз", "zh": "Полярный груз"}, category: "shooting", tags: ["стрелялки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD + мышь — прицел"], "en": ["WASD + мышь — прицел"], "zh": ["WASD + мышь — прицел"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.9, plays: 16029000, year: 2026, badge: null,
  },
  {
    slug: "shooting-06", titles: {"ru": "Хор углей", "en": "Хор углей", "zh": "Хор углей"}, category: "shooting", tags: ["стрелялки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD + мышь — прицел"], "en": ["WASD + мышь — прицел"], "zh": ["WASD + мышь — прицел"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.1, plays: 16166000, year: 2026, badge: null,
  },
  {
    slug: "shooting-07", titles: {"ru": "Приливное стекло", "en": "Приливное стекло", "zh": "Приливное стекло"}, category: "shooting", tags: ["стрелялки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD + мышь — прицел"], "en": ["WASD + мышь — прицел"], "zh": ["WASD + мышь — прицел"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.2, plays: 16303000, year: 2026, badge: null,
  },
  {
    slug: "shooting-08", titles: {"ru": "Моховой свет", "en": "Моховой свет", "zh": "Моховой свет"}, category: "shooting", tags: ["стрелялки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD + мышь — прицел"], "en": ["WASD + мышь — прицел"], "zh": ["WASD + мышь — прицел"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.3, plays: 16440000, year: 2026, badge: "new",
  },
  {
    slug: "shooting-09", titles: {"ru": "Раскол облаков", "en": "Раскол облаков", "zh": "Раскол облаков"}, category: "shooting", tags: ["стрелялки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD + мышь — прицел"], "en": ["WASD + мышь — прицел"], "zh": ["WASD + мышь — прицел"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.4, plays: 16577000, year: 2026, badge: null,
  },
  {
    slug: "shooting-10", titles: {"ru": "Эхо-хранилище", "en": "Эхо-хранилище", "zh": "Эхо-хранилище"}, category: "shooting", tags: ["стрелялки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD + мышь — прицел"], "en": ["WASD + мышь — прицел"], "zh": ["WASD + мышь — прицел"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.5, plays: 16714000, year: 2026, badge: null,
  },
  {
    slug: "shooting-11", titles: {"ru": "Ледяная вспышка", "en": "Ледяная вспышка", "zh": "Ледяная вспышка"}, category: "shooting", tags: ["стрелялки"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["WASD + мышь — прицел"], "en": ["WASD + мышь — прицел"], "zh": ["WASD + мышь — прицел"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.6, plays: 16851000, year: 2026, badge: null,
  },
  {
    slug: "simulation-01", titles: {"ru": "Тайдрайт", "en": "Тайдрайт", "zh": "Тайдрайт"}, category: "simulation", tags: ["симуляторы"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — взаимодействие"], "en": ["Мышь — взаимодействие"], "zh": ["Мышь — взаимодействие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.7, plays: 16988000, year: 2026, badge: null,
  },
  {
    slug: "simulation-02", titles: {"ru": "Эмберхайв", "en": "Эмберхайв", "zh": "Эмберхайв"}, category: "simulation", tags: ["симуляторы"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — взаимодействие"], "en": ["Мышь — взаимодействие"], "zh": ["Мышь — взаимодействие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.8, plays: 17125000, year: 2026, badge: null,
  },
  {
    slug: "simulation-03", titles: {"ru": "Картограф облаков", "en": "Картограф облаков", "zh": "Картограф облаков"}, category: "simulation", tags: ["симуляторы"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — взаимодействие"], "en": ["Мышь — взаимодействие"], "zh": ["Мышь — взаимодействие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.9, plays: 17262000, year: 2026, badge: null,
  },
  {
    slug: "simulation-04", titles: {"ru": "Моссбаунд", "en": "Моссбаунд", "zh": "Моссбаунд"}, category: "simulation", tags: ["симуляторы"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — взаимодействие"], "en": ["Мышь — взаимодействие"], "zh": ["Мышь — взаимодействие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.1, plays: 17399000, year: 2026, badge: null,
  },
  {
    slug: "simulation-05", titles: {"ru": "Ночная развязка", "en": "Ночная развязка", "zh": "Ночная развязка"}, category: "simulation", tags: ["симуляторы"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — взаимодействие"], "en": ["Мышь — взаимодействие"], "zh": ["Мышь — взаимодействие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.2, plays: 17536000, year: 2026, badge: null,
  },
  {
    slug: "simulation-06", titles: {"ru": "Хор глубин", "en": "Хор глубин", "zh": "Хор глубин"}, category: "simulation", tags: ["симуляторы"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — взаимодействие"], "en": ["Мышь — взаимодействие"], "zh": ["Мышь — взаимодействие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.3, plays: 17673000, year: 2026, badge: null,
  },
  {
    slug: "simulation-07", titles: {"ru": "Небесный сад", "en": "Небесный сад", "zh": "Небесный сад"}, category: "simulation", tags: ["симуляторы"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — взаимодействие"], "en": ["Мышь — взаимодействие"], "zh": ["Мышь — взаимодействие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.4, plays: 17810000, year: 2026, badge: null,
  },
  {
    slug: "simulation-08", titles: {"ru": "Ателье сияния", "en": "Ателье сияния", "zh": "Ателье сияния"}, category: "simulation", tags: ["симуляторы"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — взаимодействие"], "en": ["Мышь — взаимодействие"], "zh": ["Мышь — взаимодействие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.5, plays: 17947000, year: 2026, badge: null,
  },
  {
    slug: "simulation-09", titles: {"ru": "Хранитель кальдеры", "en": "Хранитель кальдеры", "zh": "Хранитель кальдеры"}, category: "simulation", tags: ["симуляторы"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — взаимодействие"], "en": ["Мышь — взаимодействие"], "zh": ["Мышь — взаимодействие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.6, plays: 18084000, year: 2026, badge: null,
  },
  {
    slug: "simulation-10", titles: {"ru": "Курьеры кроны", "en": "Курьеры кроны", "zh": "Курьеры кроны"}, category: "simulation", tags: ["симуляторы"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — взаимодействие"], "en": ["Мышь — взаимодействие"], "zh": ["Мышь — взаимодействие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.7, plays: 18221000, year: 2026, badge: null,
  },
  {
    slug: "simulation-11", titles: {"ru": "Лунная усадьба", "en": "Лунная усадьба", "zh": "Лунная усадьба"}, category: "simulation", tags: ["симуляторы"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — взаимодействие"], "en": ["Мышь — взаимодействие"], "zh": ["Мышь — взаимодействие"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.8, plays: 18358000, year: 2026, badge: null,
  },
  {
    slug: "sports-01", titles: {"ru": "Неоновые кайты", "en": "Неоновые кайты", "zh": "Неоновые кайты"}, category: "sports", tags: ["спорт"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение"], "en": ["Стрелки — движение"], "zh": ["Стрелки — движение"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.9, plays: 18495000, year: 2026, badge: null,
  },
  {
    slug: "sports-02", titles: {"ru": "Ледяной свип", "en": "Ледяной свип", "zh": "Ледяной свип"}, category: "sports", tags: ["спорт"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение"], "en": ["Стрелки — движение"], "zh": ["Стрелки — движение"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.1, plays: 18632000, year: 2026, badge: null,
  },
  {
    slug: "sports-03", titles: {"ru": "Облачный прыжок", "en": "Облачный прыжок", "zh": "Облачный прыжок"}, category: "sports", tags: ["спорт"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение"], "en": ["Стрелки — движение"], "zh": ["Стрелки — движение"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.2, plays: 18769000, year: 2026, badge: "new",
  },
  {
    slug: "sports-04", titles: {"ru": "Ралли в бездне", "en": "Ралли в бездне", "zh": "Ралли в бездне"}, category: "sports", tags: ["спорт"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение"], "en": ["Стрелки — движение"], "zh": ["Стрелки — движение"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.3, plays: 18906000, year: 2026, badge: null,
  },
  {
    slug: "sports-05", titles: {"ru": "Угольная калитка", "en": "Угольная калитка", "zh": "Угольная калитка"}, category: "sports", tags: ["спорт"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение"], "en": ["Стрелки — движение"], "zh": ["Стрелки — движение"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.4, plays: 19043000, year: 2026, badge: null,
  },
  {
    slug: "sports-06", titles: {"ru": "Гравитационная подача", "en": "Гравитационная подача", "zh": "Гравитационная подача"}, category: "sports", tags: ["спорт"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение"], "en": ["Стрелки — движение"], "zh": ["Стрелки — движение"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.5, plays: 19180000, year: 2026, badge: null,
  },
  {
    slug: "sports-07", titles: {"ru": "Зелёный спуск", "en": "Зелёный спуск", "zh": "Зелёный спуск"}, category: "sports", tags: ["спорт"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение"], "en": ["Стрелки — движение"], "zh": ["Стрелки — движение"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.6, plays: 19317000, year: 2026, badge: null,
  },
  {
    slug: "sports-08", titles: {"ru": "Импульсная рапира", "en": "Импульсная рапира", "zh": "Импульсная рапира"}, category: "sports", tags: ["спорт"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение"], "en": ["Стрелки — движение"], "zh": ["Стрелки — движение"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.7, plays: 19454000, year: 2026, badge: null,
  },
  {
    slug: "sports-09", titles: {"ru": "Лунная клюшка", "en": "Лунная клюшка", "zh": "Лунная клюшка"}, category: "sports", tags: ["спорт"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение"], "en": ["Стрелки — движение"], "zh": ["Стрелки — движение"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.8, plays: 19591000, year: 2026, badge: null,
  },
  {
    slug: "sports-10", titles: {"ru": "Аврора на коньках", "en": "Аврора на коньках", "zh": "Аврора на коньках"}, category: "sports", tags: ["спорт"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Стрелки — движение"], "en": ["Стрелки — движение"], "zh": ["Стрелки — движение"]},
    imageUrl: "/manus-storage/game-racing_26c9d0e9.jpg", gameUrl: null, rating: 4.9, plays: 19728000, year: 2026, badge: null,
  },
  {
    slug: "strategy-01", titles: {"ru": "Атлас Приливов", "en": "Атлас Приливов", "zh": "Атлас Приливов"}, category: "strategy", tags: ["стратегии"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать приказ"], "en": ["Мышь — выбрать приказ"], "zh": ["Мышь — выбрать приказ"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.1, plays: 19865000, year: 2026, badge: null,
  },
  {
    slug: "strategy-02", titles: {"ru": "Споровый Караван", "en": "Споровый Караван", "zh": "Споровый Караван"}, category: "strategy", tags: ["стратегии"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать приказ"], "en": ["Мышь — выбрать приказ"], "zh": ["Мышь — выбрать приказ"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.2, plays: 20002000, year: 2026, badge: null,
  },
  {
    slug: "strategy-03", titles: {"ru": "Грозовой Змей", "en": "Грозовой Змей", "zh": "Грозовой Змей"}, category: "strategy", tags: ["стратегии"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать приказ"], "en": ["Мышь — выбрать приказ"], "zh": ["Мышь — выбрать приказ"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.3, plays: 20139000, year: 2026, badge: null,
  },
  {
    slug: "strategy-04", titles: {"ru": "Монахи Солнечного Хранилища", "en": "Монахи Солнечного Хранилища", "zh": "Монахи Солнечного Хранилища"}, category: "strategy", tags: ["стратегии"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать приказ"], "en": ["Мышь — выбрать приказ"], "zh": ["Мышь — выбрать приказ"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.4, plays: 20276000, year: 2026, badge: null,
  },
  {
    slug: "strategy-05", titles: {"ru": "Сад Авроры", "en": "Сад Авроры", "zh": "Сад Авроры"}, category: "strategy", tags: ["стратегии"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать приказ"], "en": ["Мышь — выбрать приказ"], "zh": ["Мышь — выбрать приказ"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.5, plays: 20413000, year: 2026, badge: null,
  },
  {
    slug: "strategy-06", titles: {"ru": "Союз Крыш", "en": "Союз Крыш", "zh": "Союз Крыш"}, category: "strategy", tags: ["стратегии"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать приказ"], "en": ["Мышь — выбрать приказ"], "zh": ["Мышь — выбрать приказ"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.6, plays: 20550000, year: 2026, badge: null,
  },
  {
    slug: "strategy-07", titles: {"ru": "Рубеж Солнечных Ульев", "en": "Рубеж Солнечных Ульев", "zh": "Рубеж Солнечных Ульев"}, category: "strategy", tags: ["стратегии"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать приказ"], "en": ["Мышь — выбрать приказ"], "zh": ["Мышь — выбрать приказ"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.7, plays: 20687000, year: 2026, badge: null,
  },
  {
    slug: "strategy-08", titles: {"ru": "Зеркальные Пилигримы", "en": "Зеркальные Пилигримы", "zh": "Зеркальные Пилигримы"}, category: "strategy", tags: ["стратегии"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать приказ"], "en": ["Мышь — выбрать приказ"], "zh": ["Мышь — выбрать приказ"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.8, plays: 20824000, year: 2026, badge: null,
  },
  {
    slug: "strategy-09", titles: {"ru": "Лавовый Ткацкий Станок", "en": "Лавовый Ткацкий Станок", "zh": "Лавовый Ткацкий Станок"}, category: "strategy", tags: ["стратегии"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать приказ"], "en": ["Мышь — выбрать приказ"], "zh": ["Мышь — выбрать приказ"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.9, plays: 20961000, year: 2026, badge: null,
  },
  {
    slug: "strategy-10", titles: {"ru": "Кузня Кельпа", "en": "Кузня Кельпа", "zh": "Кузня Кельпа"}, category: "strategy", tags: ["стратегии"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать приказ"], "en": ["Мышь — выбрать приказ"], "zh": ["Мышь — выбрать приказ"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.1, plays: 21098000, year: 2026, badge: "new",
  },
  {
    slug: "strategy-11", titles: {"ru": "Магнитный Пастух", "en": "Магнитный Пастух", "zh": "Магнитный Пастух"}, category: "strategy", tags: ["стратегии"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать приказ"], "en": ["Мышь — выбрать приказ"], "zh": ["Мышь — выбрать приказ"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.2, plays: 21235000, year: 2026, badge: null,
  },
  {
    slug: "strategy-12", titles: {"ru": "Каменный Сад", "en": "Каменный Сад", "zh": "Каменный Сад"}, category: "strategy", tags: ["стратегии"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать приказ"], "en": ["Мышь — выбрать приказ"], "zh": ["Мышь — выбрать приказ"]},
    imageUrl: "/manus-storage/game-action_e9a7e28f.jpg", gameUrl: null, rating: 4.3, plays: 21372000, year: 2026, badge: null,
  },
  {
    slug: "trivia-01", titles: {"ru": "Атлас фонарей", "en": "Атлас фонарей", "zh": "Атлас фонарей"}, category: "trivia", tags: ["викторины"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ответ"], "en": ["Мышь — выбрать ответ"], "zh": ["Мышь — выбрать ответ"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.4, plays: 21509000, year: 2026, badge: null,
  },
  {
    slug: "trivia-02", titles: {"ru": "Пилот пульса", "en": "Пилот пульса", "zh": "Пилот пульса"}, category: "trivia", tags: ["викторины"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ответ"], "en": ["Мышь — выбрать ответ"], "zh": ["Мышь — выбрать ответ"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.5, plays: 21646000, year: 2026, badge: null,
  },
  {
    slug: "trivia-03", titles: {"ru": "Сад шёпота", "en": "Сад шёпота", "zh": "Сад шёпота"}, category: "trivia", tags: ["викторины"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ответ"], "en": ["Мышь — выбрать ответ"], "zh": ["Мышь — выбрать ответ"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.6, plays: 21783000, year: 2026, badge: null,
  },
  {
    slug: "trivia-04", titles: {"ru": "Бездонное течение", "en": "Бездонное течение", "zh": "Бездонное течение"}, category: "trivia", tags: ["викторины"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ответ"], "en": ["Мышь — выбрать ответ"], "zh": ["Мышь — выбрать ответ"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.7, plays: 21920000, year: 2026, badge: null,
  },
  {
    slug: "trivia-05", titles: {"ru": "Механический суд", "en": "Механический суд", "zh": "Механический суд"}, category: "trivia", tags: ["викторины"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ответ"], "en": ["Мышь — выбрать ответ"], "zh": ["Мышь — выбрать ответ"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.8, plays: 22057000, year: 2026, badge: null,
  },
  {
    slug: "trivia-06", titles: {"ru": "Облачный картограф", "en": "Облачный картограф", "zh": "Облачный картограф"}, category: "trivia", tags: ["викторины"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ответ"], "en": ["Мышь — выбрать ответ"], "zh": ["Мышь — выбрать ответ"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.9, plays: 22194000, year: 2026, badge: null,
  },
  {
    slug: "trivia-07", titles: {"ru": "Пепельный архив", "en": "Пепельный архив", "zh": "Пепельный архив"}, category: "trivia", tags: ["викторины"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ответ"], "en": ["Мышь — выбрать ответ"], "zh": ["Мышь — выбрать ответ"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.1, plays: 22331000, year: 2026, badge: null,
  },
  {
    slug: "trivia-08", titles: {"ru": "Лунный базар", "en": "Лунный базар", "zh": "Лунный базар"}, category: "trivia", tags: ["викторины"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ответ"], "en": ["Мышь — выбрать ответ"], "zh": ["Мышь — выбрать ответ"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.2, plays: 22468000, year: 2026, badge: null,
  },
  {
    slug: "trivia-09", titles: {"ru": "Призматический тигель", "en": "Призматический тигель", "zh": "Призматический тигель"}, category: "trivia", tags: ["викторины"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ответ"], "en": ["Мышь — выбрать ответ"], "zh": ["Мышь — выбрать ответ"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.3, plays: 22605000, year: 2026, badge: null,
  },
  {
    slug: "trivia-10", titles: {"ru": "Каньон эха", "en": "Каньон эха", "zh": "Каньон эха"}, category: "trivia", tags: ["викторины"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ответ"], "en": ["Мышь — выбрать ответ"], "zh": ["Мышь — выбрать ответ"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.4, plays: 22742000, year: 2026, badge: null,
  },
  {
    slug: "trivia-11", titles: {"ru": "Ледяной рубеж", "en": "Ледяной рубеж", "zh": "Ледяной рубеж"}, category: "trivia", tags: ["викторины"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ответ"], "en": ["Мышь — выбрать ответ"], "zh": ["Мышь — выбрать ответ"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.5, plays: 22879000, year: 2026, badge: null,
  },
  {
    slug: "trivia-12", titles: {"ru": "Кольцо чудес", "en": "Кольцо чудес", "zh": "Кольцо чудес"}, category: "trivia", tags: ["викторины"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Мышь — выбрать ответ"], "en": ["Мышь — выбрать ответ"], "zh": ["Мышь — выбрать ответ"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.6, plays: 23016000, year: 2026, badge: null,
  },
  {
    slug: "word-01", titles: {"ru": "Глифовая роща", "en": "Глифовая роща", "zh": "Глифовая роща"}, category: "word", tags: ["слова"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клавиатура — вводить слова"], "en": ["Клавиатура — вводить слова"], "zh": ["Клавиатура — вводить слова"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.7, plays: 23153000, year: 2026, badge: null,
  },
  {
    slug: "word-02", titles: {"ru": "Неоновый кочевник", "en": "Неоновый кочевник", "zh": "Неоновый кочевник"}, category: "word", tags: ["слова"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клавиатура — вводить слова"], "en": ["Клавиатура — вводить слова"], "zh": ["Клавиатура — вводить слова"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.8, plays: 23290000, year: 2026, badge: null,
  },
  {
    slug: "word-03", titles: {"ru": "Прилив гласных", "en": "Прилив гласных", "zh": "Прилив гласных"}, category: "word", tags: ["слова"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клавиатура — вводить слова"], "en": ["Клавиатура — вводить слова"], "zh": ["Клавиатура — вводить слова"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.9, plays: 23427000, year: 2026, badge: "new",
  },
  {
    slug: "word-04", titles: {"ru": "Риф шифров", "en": "Риф шифров", "zh": "Риф шифров"}, category: "word", tags: ["слова"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клавиатура — вводить слова"], "en": ["Клавиатура — вводить слова"], "zh": ["Клавиатура — вводить слова"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.1, plays: 23564000, year: 2026, badge: null,
  },
  {
    slug: "word-05", titles: {"ru": "Ткацкий стан букв", "en": "Ткацкий стан букв", "zh": "Ткацкий стан букв"}, category: "word", tags: ["слова"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клавиатура — вводить слова"], "en": ["Клавиатура — вводить слова"], "zh": ["Клавиатура — вводить слова"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.2, plays: 23701000, year: 2026, badge: null,
  },
  {
    slug: "word-06", titles: {"ru": "Осада слогов", "en": "Осада слогов", "zh": "Осада слогов"}, category: "word", tags: ["слова"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клавиатура — вводить слова"], "en": ["Клавиатура — вводить слова"], "zh": ["Клавиатура — вводить слова"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.3, plays: 23838000, year: 2026, badge: null,
  },
  {
    slug: "word-07", titles: {"ru": "Реликвия загадок", "en": "Реликвия загадок", "zh": "Реликвия загадок"}, category: "word", tags: ["слова"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клавиатура — вводить слова"], "en": ["Клавиатура — вводить слова"], "zh": ["Клавиатура — вводить слова"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.4, plays: 23975000, year: 2026, badge: null,
  },
  {
    slug: "word-08", titles: {"ru": "Словокит", "en": "Словокит", "zh": "Словокит"}, category: "word", tags: ["слова"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клавиатура — вводить слова"], "en": ["Клавиатура — вводить слова"], "zh": ["Клавиатура — вводить слова"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.5, plays: 24112000, year: 2026, badge: null,
  },
  {
    slug: "word-09", titles: {"ru": "Чернильный алхимик", "en": "Чернильный алхимик", "zh": "Чернильный алхимик"}, category: "word", tags: ["слова"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клавиатура — вводить слова"], "en": ["Клавиатура — вводить слова"], "zh": ["Клавиатура — вводить слова"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.6, plays: 24249000, year: 2026, badge: null,
  },
  {
    slug: "word-10", titles: {"ru": "Карнавал согласных", "en": "Карнавал согласных", "zh": "Карнавал согласных"}, category: "word", tags: ["слова"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клавиатура — вводить слова"], "en": ["Клавиатура — вводить слова"], "zh": ["Клавиатура — вводить слова"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.7, plays: 24386000, year: 2026, badge: null,
  },
  {
    slug: "word-11", titles: {"ru": "Ледяной лексикон", "en": "Ледяной лексикон", "zh": "Ледяной лексикон"}, category: "word", tags: ["слова"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клавиатура — вводить слова"], "en": ["Клавиатура — вводить слова"], "zh": ["Клавиатура — вводить слова"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.8, plays: 24523000, year: 2026, badge: null,
  },
  {
    slug: "word-12", titles: {"ru": "Кузня фраз", "en": "Кузня фраз", "zh": "Кузня фраз"}, category: "word", tags: ["слова"],
    descriptions: {"ru": "Новая игра из расширенного каталога GameHaven.", "en": "Новая игра из расширенного каталога GameHaven.", "zh": "Новая игра из расширенного каталога GameHaven."}, controls: {"ru": ["Клавиатура — вводить слова"], "en": ["Клавиатура — вводить слова"], "zh": ["Клавиатура — вводить слова"]},
    imageUrl: "/manus-storage/game-puzzle_bae12f0f.jpg", gameUrl: null, rating: 4.9, plays: 24660000, year: 2026, badge: null,
  }
];

export const localeLabels: Record<Locale, string> = { ru: "Русский", en: "English", zh: "简体中文" };
