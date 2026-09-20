import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import GameGroupScreen from "../GameGroup/GameGroupScreen";
import { GAMES, groupGamesByField, toGame } from "../../data/games";

/**
 * Figma node 543:2206 ("1920/game filter") via the shared
 * GameGroupScreen — this screen only supplies the data: the whole
 * catalog (Game + Ani) grouped by its `genre` field.
 */
export default function GenreScreen() {
  const navigate = useNavigate();

  const groups = useMemo(
    () =>
      groupGamesByField(GAMES, "genre").map((group) => ({
        id: group.label,
        label: group.label,
        games: group.entries.map((entry) => toGame(entry, navigate)),
      })),
    [navigate]
  );

  return <GameGroupScreen title="장르별 보기" groups={groups} viewAllLabel="장르 전체 보기" />;
}
