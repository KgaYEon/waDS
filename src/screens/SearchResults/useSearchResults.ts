import { useMemo } from "react";
import type { Game } from "../../types/game";
import { placeholderImage } from "../../utils/placeholderImage";

// Same sample catalog as Home — no API yet (deferred, see conversation).
// This is where a real search request replaces the filter below.
const CATALOG_TITLES = [
  "감옥탈출 리마스터",
  "여우와 두루미",
  "고향만두 삼촌",
  "타향만두",
  "동전 쌓기",
  "탈출! 100층",
  "젤리 매치",
  "낚시왕",
  "핑퐁 챔피언",
  "우주 방어대",
  "퍼즐 아일랜드",
  "좀비 서바이벌",
  "타이핑 마스터",
  "미로 탈출",
  "카드 매칭",
];

function toGames(titles: string[]): Game[] {
  return titles.map((title, i) => ({
    id: `${title}-${i}`,
    title,
    category: "플래시 게임",
    imageUrl: placeholderImage(title, 281, 164),
  }));
}

const CATALOG = toGames(CATALOG_TITLES);

/**
 * Filters the sample catalog by query (case-insensitive substring match)
 * so the empty/has-results states are both reachable from a real search,
 * not just toggled by a prop. Swap this for an API call later.
 */
export function useSearchResults(query: string): Game[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return CATALOG.filter((game) => game.title.toLowerCase().includes(q));
  }, [query]);
}
