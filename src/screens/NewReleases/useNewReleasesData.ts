import type { NavigateFunction } from "react-router-dom";
import { GAMES } from "../../data/games";
import type { GameCatalogEntry } from "../../data/games";
import type { Game } from "../../types/game";
import { placeholderImage } from "../../utils/placeholderImage";

function toGame(entry: GameCatalogEntry, navigate: NavigateFunction): Game {
  return {
    id: entry.id,
    title: entry.title,
    category: entry.genre,
    imageUrl: entry.imageFile,
    imageAlt: entry.title,
    onClick: () => navigate(`/game/${entry.id}`),
  };
}

// games.ts has no "release date" field — there's no real signal for
// "new this month" yet. This is a hand-picked mock slice of the real
// catalog (first N of each type), same convention as Home's
// recentlyPlayed/recommended, not a real "what's new" query.
const NEW_GAME_COUNT = 8;
const NEW_ANI_COUNT = 2;

// "보존 예정" (not yet preserved) titles can't come from games.ts at all —
// by definition they're not in the archive yet, so there's no real id/
// image for them. These 5 are invented mock titles (sequels/remasters
// thematically consistent with the real catalog), shown with a plain
// "Coming Soon" placeholder image (existing placeholderImage util,
// reused as-is) instead of a real screenshot.
const COMING_SOON_MOCK: Array<{ title: string; category: string }> = [
  { title: "미로 탈출 2", category: "플래시 게임" },
  { title: "좀비 서바이벌 리마스터", category: "플래시 게임" },
  { title: "타이핑 마스터 프로", category: "플래시 게임" },
  { title: "졸라맨 3부 1화", category: "플래시 애니" },
  { title: "뿌까 스페셜", category: "플래시 애니" },
];

export interface NewReleasesData {
  month: string;
  newGames: Game[];
  newAni: Game[];
  comingSoon: Game[];
  comingSoonGameCount: number;
  comingSoonAniCount: number;
}

export function useNewReleasesData(navigate: NavigateFunction): NewReleasesData {
  const newGames = GAMES.filter((g) => g.type === "Game")
    .slice(0, NEW_GAME_COUNT)
    .map((g) => toGame(g, navigate));
  const newAni = GAMES.filter((g) => g.type === "Ani")
    .slice(0, NEW_ANI_COUNT)
    .map((g) => toGame(g, navigate));

  const comingSoon = COMING_SOON_MOCK.map((entry, i) => ({
    id: `coming-soon-${i}`,
    title: entry.title,
    category: entry.category,
    imageUrl: placeholderImage("Coming Soon", 281, 164),
  }));

  return {
    month: "9월",
    newGames,
    newAni,
    comingSoon,
    comingSoonGameCount: COMING_SOON_MOCK.filter((e) => e.category === "플래시 게임").length,
    comingSoonAniCount: COMING_SOON_MOCK.filter((e) => e.category === "플래시 애니").length,
  };
}
