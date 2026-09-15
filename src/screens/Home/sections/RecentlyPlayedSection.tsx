import { useState } from "react";
import styles from "./RecentlyPlayedSection.module.css";
import SquareNavButton from "../../../components/ui/SquareNavButton";
import CarouselDots from "../../../components/ui/CarouselDots";
import GameCard from "../../../components/ui/GameCard";
import type { Game } from "../../../types/game";

// 5-up at every breakpoint — the 1440 redesign shrinks the GameCard
// itself instead of dropping a column (an earlier 4-up attempt here was
// reverted).
const PAGE_SIZE = 5;

export interface RecentlyPlayedSectionProps {
  title?: string;
  games: Game[];
}

export default function RecentlyPlayedSection({
  title = "최근 플레이한 게임",
  games,
}: RecentlyPlayedSectionProps) {
  const pageCount = Math.max(1, Math.ceil(games.length / PAGE_SIZE));
  const [page, setPage] = useState(0);

  const goTo = (next: number) => setPage((next + pageCount) % pageCount);

  const visible = games.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className={styles.section}>
      <div className={styles.head}>
        <span className={styles.heading}>{title}</span>
        {pageCount > 1 && (
          <div className={styles.controls}>
            <SquareNavButton direction="left" onClick={() => goTo(page - 1)} />
            <CarouselDots
              count={pageCount}
              activeIndex={page}
              onDotClick={goTo}
              tone="muted"
              // Lowered from 10 on request — bigger than the hero
              // banner's own dots (13/1.5 ≈ 8.67) but smaller than before.
              size={9}
              gap={24}
            />
            <SquareNavButton direction="right" onClick={() => goTo(page + 1)} />
          </div>
        )}
      </div>
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
    </div>
  );
}
