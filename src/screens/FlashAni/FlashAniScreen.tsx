import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import GameGroupScreen from "../GameGroup/GameGroupScreen";
import { GAMES, groupGamesByField, toGame } from "../../data/games";

const ANI_ENTRIES = GAMES.filter((entry) => entry.type === "Ani");

/**
 * Figma node 543:2206 ("1920/game filter") via the shared
 * GameGroupScreen — this screen only supplies the data: catalog entries
 * with type "Ani", grouped by `genre` (Ani entries have no `series`
 * field at all, so genre is the only grouping dimension available for
 * them — series/genre grouping was requested for the other two screens
 * explicitly; this one was inferred from what the data actually has).
 */
export default function FlashAniScreen() {
  const navigate = useNavigate();

  const groups = useMemo(
    () =>
      groupGamesByField(ANI_ENTRIES, "genre").map((group) => ({
        id: group.label,
        label: group.label,
        games: group.entries.map((entry) => toGame(entry, navigate)),
      })),
    [navigate]
  );

  return <GameGroupScreen title="플래시애니 보기" groups={groups} viewAllLabel="플래시애니 전체 보기" />;
}
