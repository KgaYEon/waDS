import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./SearchResultsScreen.module.css";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import GridColumn from "../../components/ui/GridColumn";
import GameCard from "../../components/ui/GameCard";
import { useSearchResults, useSearchSuggestion } from "./useSearchResults";

/**
 * Figma frame "searchResult" (node 239:3471) has two states — with and
 * without results — drawn as two separate frames. Both are handled here
 * as one component, branching on `games.length`, instead of two screens.
 *
 * The frame's own Header/Footer are intentionally NOT reproduced — this
 * screen renders inside Layout (src/layouts/Layout.tsx), which already
 * supplies the shared Header/Footer for every screen. The search query
 * comes from the URL (?q=...), matching how Home.tsx owns its own data
 * fetching rather than receiving it from the router.
 */
export default function SearchResultsScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const games = useSearchResults(query, navigate);
  const hasResults = games.length > 0;
  const suggestion = useSearchSuggestion(query, navigate);

  return (
    <Container>
      <Grid>
        <GridColumn span={12} className={styles.head}>
          <h1 className={styles.title}>{`'${query}' 검색 결과`}</h1>
          <p className={styles.count}>결과 {games.length} 건</p>
        </GridColumn>

        <GridColumn span={12} className={styles.body}>
          {hasResults ? (
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
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>검색 결과가 없습니다, 다시 검색해주세요.</p>
              {suggestion && (
                <p className={styles.suggestion}>
                  혹시{" "}
                  <button
                    type="button"
                    className={styles.suggestionLink}
                    onClick={suggestion.onClick}
                  >
                    '{suggestion.title}'
                  </button>
                  을 찾으셨나요?
                </p>
              )}
            </div>
          )}
        </GridColumn>
      </Grid>
    </Container>
  );
}
