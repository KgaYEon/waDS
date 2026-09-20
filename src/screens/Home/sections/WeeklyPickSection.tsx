import styles from "./WeeklyPickSection.module.css";
import GameCard from "../../../components/ui/GameCard";
import Chip from "../../../components/ui/Chip";
import type { Game } from "../../../types/game";

export interface WeeklyPickSectionProps {
  title?: string;
  picks: Game[];
  trendingTitle?: string;
  trendingSubtitle?: string;
  trending: string[];
}

/**
 * New section, Figma node 562:2367 ("금주의 추천게임") — a two-panel row:
 * a set of poster-variant GameCards, and a "많이 검색된 게임" chip list.
 * Neither data source is real (no ranking/search-trend logic exists in
 * the catalog yet) — both are arbitrary slices/labels from useHomeData,
 * same "no personalization yet" caveat as recommended/recentlyPlayed.
 */
export default function WeeklyPickSection({
  title = "금주의 추천게임",
  picks,
  trendingTitle = "많이 검색된 게임",
  trendingSubtitle = "이번 주 기준",
  trending,
}: WeeklyPickSectionProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.row}>
        <div className={styles.picksPanel}>
          {picks.map((game) => (
            <GameCard
              key={game.id}
              variant="poster"
              className={styles.pickCard}
              imageUrl={game.imageUrl}
              imageAlt={game.imageAlt}
              title={game.title}
              category={game.category}
              onClick={game.onClick}
            />
          ))}
        </div>
        <div className={styles.trendingPanel}>
          <div className={styles.trendingHead}>
            <span className={styles.trendingTitle}>{trendingTitle}</span>
            <span className={styles.trendingSubtitle}>{trendingSubtitle}</span>
          </div>
          <div className={styles.trendingList}>
            {trending.map((label) => (
              <Chip key={label} variant="neutral-muted" size="M" className={styles.trendingChip}>
                {label}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
