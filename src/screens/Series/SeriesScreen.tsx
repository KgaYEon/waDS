import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import GameGroupScreen from "../GameGroup/GameGroupScreen";
import { GAMES, groupGamesByField, toGame } from "../../data/games";

/**
 * Figma node 543:2206 ("1920/game filter") via the shared
 * GameGroupScreen — this screen only supplies the data: catalog entries
 * grouped by their `series` field (games with no series are skipped).
 */
export default function SeriesScreen() {
  const navigate = useNavigate();

  const groups = useMemo(
    () =>
      groupGamesByField(GAMES, "series").map((group) => ({
        id: group.label,
        label: group.label,
        games: group.entries.map((entry) => toGame(entry, navigate)),
      })),
    [navigate]
  );

  return <GameGroupScreen title="시리즈별 보기" groups={groups} viewAllLabel="시리즈 전체 보기" />;
}
