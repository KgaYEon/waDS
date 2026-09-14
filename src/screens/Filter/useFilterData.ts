import { useMemo } from "react";
import { GAMES } from "../../data/games";
import type { GameCatalogEntry } from "../../data/games";

export type FilterKey = "types" | "sites" | "genres" | "series";

export interface FilterSelection {
  types: string[];
  sites: string[];
  genres: string[];
  series: string[];
}

export const EMPTY_SELECTION: FilterSelection = { types: [], sites: [], genres: [], series: [] };

/** "종류" options show a friendly label, but store/filter on the real
 * games.ts type value ("Game"/"Ani") under the hood. */
export const TYPE_LABEL_TO_VALUE: Record<string, string> = {
  "플래시 게임": "Game",
  "플래시 애니": "Ani",
};

// Most-common-first, not CSV order or alphabetical — a more useful
// default when a list gets truncated behind "더보기" (e.g. genre).
function byFrequency(values: string[]): string[] {
  const counts = new Map<string, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts.keys()].sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0));
}

export interface FilterOptions {
  types: string[];
  sites: string[];
  genres: string[];
  series: string[];
}

export function useFilterOptions(): FilterOptions {
  return useMemo(
    () => ({
      types: ["플래시 게임", "플래시 애니"],
      sites: byFrequency(GAMES.flatMap((g) => g.sites)),
      genres: byFrequency(GAMES.map((g) => g.genre)),
      series: byFrequency(GAMES.map((g) => g.series).filter((s): s is string => Boolean(s))),
    }),
    []
  );
}

export function useFilteredGames(selection: FilterSelection): GameCatalogEntry[] {
  return useMemo(() => {
    const types = selection.types.map((label) => TYPE_LABEL_TO_VALUE[label] ?? label);
    return GAMES.filter((game) => {
      if (types.length > 0 && !types.includes(game.type)) return false;
      if (selection.sites.length > 0 && !game.sites.some((s) => selection.sites.includes(s))) {
        return false;
      }
      if (selection.genres.length > 0 && !selection.genres.includes(game.genre)) return false;
      if (
        selection.series.length > 0 &&
        (!game.series || !selection.series.includes(game.series))
      ) {
        return false;
      }
      return true;
    });
  }, [selection]);
}
