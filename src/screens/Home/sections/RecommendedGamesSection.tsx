import styles from "./RecommendedGamesSection.module.css";
import GameCard from "../../../components/ui/GameCard";
import type { Game } from "../../../types/game";

export interface RecommendedGamesSectionProps {
  title?: string;
  games: Game[];
}

export default function RecommendedGamesSection({
  title = "추천 게임",
  games,
}: RecommendedGamesSectionProps) {
  return (
    <div className={styles.section}>
      <span className={styles.heading}>{title}</span>
      <div className={styles.cards}>
        {games.map((game) => (
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
