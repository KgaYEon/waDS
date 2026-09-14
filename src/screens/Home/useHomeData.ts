import { useMemo } from "react";
import type { NavigateFunction } from "react-router-dom";
import type { HeroSlide } from "./sections/HeroBannerSection";
import type { Game } from "../../types/game";
import { placeholderImage } from "../../utils/placeholderImage";
import { GAMES, type GameCatalogEntry } from "../../data/games";

// Fisher-Yates — doesn't mutate the input array.
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Real Flash catalog (src/data/games.ts) has no "recently played" or
// "recommended" signal (no user history/curation yet) — these are just
// deterministic slices of the real "Game"-type entries (excludes "Ani"),
// not a real personalization/ranking.
const PLAYABLE_GAMES = GAMES.filter((entry) => entry.type === "Game");

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

export interface HomeData {
  heroSlides: HeroSlide[];
  recentlyPlayed: Game[];
  recommended: Game[];
}

/**
 * Home screen's data. Hero banner slides stay mock (placeholderImage) —
 * the catalog has no tagline/promo-image fields to source them from.
 * recentlyPlayed/recommended now come from the real catalog.
 */
export function useHomeData(navigate: NavigateFunction): HomeData {
  // Memoized so the order doesn't reshuffle on every re-render — only
  // once per Home mount.
  const recommended = useMemo(() => shuffle(GAMES).map((g) => toGame(g, navigate)), [navigate]);

  return {
    recommended,
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
    recentlyPlayed: PLAYABLE_GAMES.slice(0, 7).map((g) => toGame(g, navigate)),
  };
}
