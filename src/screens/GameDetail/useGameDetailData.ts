import { useMemo } from "react";
import { GAMES } from "../../data/games";
import type { GameCatalogEntry } from "../../data/games";

export function useGameDetailData(id: string | undefined): GameCatalogEntry | undefined {
  return useMemo(() => GAMES.find((game) => game.id === id), [id]);
}
