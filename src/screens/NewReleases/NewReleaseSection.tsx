import { useState } from "react";
import styles from "./NewReleaseSection.module.css";
import GameCard from "../../components/ui/GameCard";
import { IconArrowLeft, IconArrowRight } from "../../components/icons";
import type { Game } from "../../types/game";

const PAGE_SIZE = 5;

export interface NewReleaseSectionProps {
  title: string;
  countLabel: string;
  games: Game[];
}

/**
 * Shared by all three "이달의 신작" sections (신작 게임 / 신작 애니 / 보존
 * 예정) — kept local to this screen, not promoted to ui/, since nothing
 * else needs this exact heading + arrow-bled-carousel layout yet.
 *
 * Pagination *behavior* (page state, PAGE_SIZE=5, wraparound, arrows
 * only when there's more than one page) mirrors Home's
 * RecentlyPlayedSection, reused as a pattern — the *visual* controls
 * differ on purpose: this frame's own Figma uses bare arrow icons
 * beside the card row with no dots, not SquareNavButton/CarouselDots,
 * so that's what's implemented here instead of reusing those components
 * outright.
 */
export default function NewReleaseSection({ title, countLabel, games }: NewReleaseSectionProps) {
  const pageCount = Math.max(1, Math.ceil(games.length / PAGE_SIZE));
  const [page, setPage] = useState(0);
  const showArrows = pageCount > 1;

  const goTo = (next: number) => setPage((next + pageCount) % pageCount);

  const visible = games.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className={styles.section}>
      <div className={styles.head}>
        <span className={styles.heading}>{title}</span>
        <span className={styles.count}>{countLabel}</span>
      </div>
      <div className={styles.row} data-bleed={showArrows}>
        {showArrows && (
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(page - 1)}
            aria-label="이전 페이지"
          >
            <IconArrowLeft size={32} className={styles.arrowIcon} />
          </button>
        )}
        <div className={styles.cards}>
          {visible.map((game) => (
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
        {showArrows && (
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(page + 1)}
            aria-label="다음 페이지"
          >
            <IconArrowRight size={32} className={styles.arrowIcon} />
          </button>
        )}
      </div>
    </div>
  );
}
