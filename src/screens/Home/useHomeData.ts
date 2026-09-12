import type { HeroSlide } from "./sections/HeroBannerSection";
import type { Game } from "./types";

/**
 * Placeholder thumbnail generator. Home has no API yet (see conversation —
 * that's deferred), so sample data needs *some* image; this stands in for
 * a real game screenshot/box-art URL until the API is wired up.
 */
function placeholderImage(label: string, width: number, height: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#161618"/><rect x="0" y="${height - 40}" width="${width}" height="40" fill="#2a2a2e"/><text x="24" y="${height - 14}" font-family="sans-serif" font-size="16" font-weight="700" fill="#dd3c54">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const RECENTLY_PLAYED_TITLES = [
  "감옥탈출 리마스터",
  "여우와 두루미",
  "고향만두 삼촌",
  "타향만두",
  "동전 쌓기",
  "탈출! 100층",
  "젤리 매치",
];

const RECOMMENDED_TITLES = [
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

export interface HomeData {
  heroSlides: HeroSlide[];
  recentlyPlayed: Game[];
  recommended: Game[];
}

/**
 * Home screen's sample data. No API yet — this is where a real fetch
 * (or a React Router loader) will replace the hardcoded arrays below.
 */
export function useHomeData(): HomeData {
  return {
    heroSlides: [
      {
        id: "hero-1",
        imageUrl: placeholderImage("고향만두", 1920, 510),
        tagline: "추억의 고향만두, 지금 바로 빚으러 GO",
        ctaLabel: "게임 하러 가기",
      },
      {
        id: "hero-2",
        imageUrl: placeholderImage("타향만두", 1920, 510),
        tagline: "타향만두, 이번엔 도시에서 만두를!",
        ctaLabel: "게임 하러 가기",
      },
      {
        id: "hero-3",
        imageUrl: placeholderImage("동전 쌓기", 1920, 510),
        tagline: "동전을 쌓아 최고 기록에 도전하세요",
        ctaLabel: "게임 하러 가기",
      },
      {
        id: "hero-4",
        imageUrl: placeholderImage("젤리 매치", 1920, 510),
        tagline: "달콤한 젤리를 맞춰 콤보를 터뜨리세요",
        ctaLabel: "게임 하러 가기",
      },
    ],
    recentlyPlayed: toGames(RECENTLY_PLAYED_TITLES),
    recommended: toGames(RECOMMENDED_TITLES),
  };
}
