import { useState } from "react";
import styles from "./GameGroupScreen.module.css";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import GridColumn from "../../components/ui/GridColumn";
import Chip from "../../components/ui/Chip";
import GameCard from "../../components/ui/GameCard";
import type { Game } from "../../types/game";

export interface GameGroupEntry {
  id: string;
  label: string;
  games: Game[];
}

export interface GameGroupScreenProps {
  title: string;
  groups: GameGroupEntry[];
  /** Decorative only, per request — no destination exists for it yet. */
  viewAllLabel?: string;
}

/**
 * Shared by SeriesScreen/GenreScreen/FlashAniScreen (Figma node 543:2206,
 * "1920/game filter") — each screen just groups the catalog by its own
 * field (series/genre) and passes the resulting groups in. Layout: page
 * title, a hero banner for the selected group, a chip strip to switch
 * groups, and that group's game grid.
 */
export default function GameGroupScreen({ title, groups, viewAllLabel = "전체 보기" }: GameGroupScreenProps) {
  const [selected, setSelected] = useState(0);
  const activeGroup = groups[selected];
  const bannerImage = activeGroup?.games[0]?.imageUrl;

  return (
    <div className={styles.screen}>
      <Container>
        <Grid>
          <GridColumn span={10} start={2} className={styles.column}>
            <h1 className={styles.title}>{title}</h1>

            {activeGroup && bannerImage && (
              <div className={styles.banner}>
                <img className={styles.bannerImage} src={bannerImage} alt="" />
                <div className={styles.bannerCaption}>
                  <span className={styles.bannerTitle}>{activeGroup.label}</span>
                </div>
              </div>
            )}

            <div className={styles.controls}>
              <div className={styles.chipTray} role="tablist">
                {groups.map((group, i) => (
                  <Chip
                    key={group.id}
                    variant={i === selected ? "primary" : "ghost"}
                    size="M"
                    role="tab"
                    aria-selected={i === selected}
                    onClick={() => setSelected(i)}
                  >
                    {group.label}
                  </Chip>
                ))}
              </div>
              <span className={styles.viewAllLink}>{viewAllLabel}</span>
            </div>

            <div className={styles.cards}>
              {activeGroup?.games.map((game) => (
                <GameCard
                  key={game.id}
                  imageUrl={game.imageUrl}
                  imageAlt={game.imageAlt}
                  title={game.title}
                  category={game.category}
                  onClick={game.onClick}
                />
              ))}
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
}
