import { useMemo } from "react";
import type { NavigateFunction } from "react-router-dom";
import { GAMES } from "../../data/games";
import type { GameCatalogEntry } from "../../data/games";
import type { Game } from "../../types/game";

/**
 * Was its own standalone mock catalog (placeholder titles/images) — swapped
 * for the real games.ts catalog so results are real, clickable games that
 * resolve on the game detail page (/game/:id), instead of ids that don't
 * exist anywhere.
 */

// Lowercases and strips all whitespace so "100층 탈출" / "100 층탈출" /
// "100층탈출" all match each other, not just a case-insensitive exact
// substring.
function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "");
}

export function useSearchResults(query: string, navigate: NavigateFunction): Game[] {
  return useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return GAMES.filter((game) => normalize(game.title).includes(q)).map((game) => ({
      id: game.id,
      title: game.title,
      category: game.genre,
      imageUrl: game.imageFile,
      imageAlt: game.title,
      onClick: () => navigate(`/game/${game.id}`),
    }));
  }, [query, navigate]);
}

// Classic edit-distance DP, no library — small inputs (search query length,
// ~80 titles) so this is cheap even recomputed on every keystroke.
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const prev = new Array<number>(n + 1);
  const curr = new Array<number>(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1, // deletion
        curr[j - 1] + 1, // insertion
        prev[j - 1] + cost // substitution
      );
    }
    for (let j = 0; j <= n; j++) prev[j] = curr[j];
  }
  return prev[n];
}

// 1 (identical) down to 0 (completely different), scaled by the longer
// string's length so a short query isn't unfairly penalized against a
// long title purely for length.
function similarity(a: string, b: string): number {
  const maxLength = Math.max(a.length, b.length);
  if (maxLength === 0) return 1;
  return 1 - levenshtein(a, b) / maxLength;
}

// Below this, the closest title is still too unlike the query to suggest
// in good faith (e.g. a one-letter overlap) — no Figma/spec number for
// this, chosen empirically.
const SUGGESTION_THRESHOLD = 0.25;

/**
 * Only meant to be read when useSearchResults() above came back empty —
 * "혹시 'OO'을 찾으셨나요?" fuzzy fallback, one candidate, real games.ts
 * data (so its own onClick navigates to a real /game/:id).
 */
export function useSearchSuggestion(
  query: string,
  navigate: NavigateFunction
): (GameCatalogEntry & { onClick: () => void }) | undefined {
  return useMemo(() => {
    const q = normalize(query);
    if (!q) return undefined;

    let best: GameCatalogEntry | undefined;
    let bestScore = 0;
    for (const game of GAMES) {
      const score = similarity(q, normalize(game.title));
      if (score > bestScore) {
        bestScore = score;
        best = game;
      }
    }

    if (!best || bestScore < SUGGESTION_THRESHOLD) return undefined;
    return { ...best, onClick: () => navigate(`/game/${best.id}`) };
  }, [query, navigate]);
}
