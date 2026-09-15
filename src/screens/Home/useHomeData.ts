import { useMemo } from "react";
import type { NavigateFunction } from "react-router-dom";
import type { HeroSlide } from "./sections/HeroBannerSection";
import type { Game } from "../../types/game";
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
 * Home screen's data. Hero banner slides are still hand-authored here
 * (games.ts has no tagline/promo-copy fields), but now point at real
 * banner/logo assets in public/images/banners/ instead of
 * placeholderImage mocks. recentlyPlayed/recommended come from the real
 * catalog.
 */
export function useHomeData(navigate: NavigateFunction): HomeData {
  // Memoized so the order doesn't reshuffle on every re-render — only
  // once per Home mount.
  const recommended = useMemo(() => shuffle(GAMES).map((g) => toGame(g, navigate)), [navigate]);

  return {
    recommended,
    heroSlides: [
      {
        id: "hero-mandu",
        // Filename has a typo on disk (missing "n") — referenced as-is
        // rather than silently renaming the actual asset.
        imageUrl: "/images/banners/mandu_baner.jpg",
        logoUrl: "/images/banners/mandu_logo.png",
        tagline: "추억의 고향만두, 지금 바로 빚으러 GO",
        ctaLabel: "게임 하러 가기",
      },
      {
        id: "hero-jailexcape",
        imageUrl: "/images/banners/jailexcape_banner.jpg",
        logoUrl: "/images/banners/jailexcape_logo.png",
        tagline: "잊지 못할 탈옥의 맛, 감옥탈출 한 판!",
        ctaLabel: "게임 하러 가기",
        onCtaClick: () => navigate("/game/jailexcape"),
      },
      {
        id: "hero-yuhu",
        imageUrl: "/images/banners/yuhu_banner.jpg",
        logoUrl: "/images/banners/yuhu_logo.png",
        tagline: "오늘도 홈런! 유후와 함께할까요?",
        ctaLabel: "게임 하러 가기",
        onCtaClick: () => navigate("/game/yuhu_baseball"),
      },
      {
        id: "hero-bbuka",
        imageUrl: "/images/banners/pucca_banner.jpg",
        logoUrl: "/images/banners/pucca_logo.png",
        tagline: "뿌까를 기억하시나요?",
        ctaLabel: "게임 하러 가기",
        onCtaClick: () => navigate("/game/bbuka"),
      },
    ],
    recentlyPlayed: PLAYABLE_GAMES.slice(0, 7).map((g) => toGame(g, navigate)),
  };
}
