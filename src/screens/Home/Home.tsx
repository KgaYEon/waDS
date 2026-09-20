import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import GridColumn from "../../components/ui/GridColumn";
import HeroBannerSection from "./sections/HeroBannerSection";
import SeriesBandSection from "./sections/SeriesBandSection";
import WeeklyPickSection from "./sections/WeeklyPickSection";
import RecommendedGamesSection from "./sections/RecommendedGamesSection";
import { useHomeData } from "./useHomeData";

// Figma's "gameCards" rows show a fixed 5-across grid, not a paged
// carousel — each row's data is capped here rather than in
// RecommendedGamesSection itself, which stays a plain "show what you're
// given" grid.
const ROW_SIZE = 5;
const WEEKLY_PICK_COUNT = 4;

export default function Home() {
  const navigate = useNavigate();
  const { heroSlides, recentlyPlayed, recommended, popular, trendingSearches } =
    useHomeData(navigate);

  return (
    <div className={styles.page}>
      <HeroBannerSection slides={heroSlides} />
      <div className={styles.body}>
        {/* Header/HeroBannerSection/Footer stay full 12-column-wide (Header
            and Footer are rendered outside Home entirely, by Layout.tsx;
            HeroBannerSection's own image is full-bleed). Every other body
            section is inset to 10 of the 12 columns, starting at column 2
            (1 empty column on each side), on request. */}
        <Container>
          <Grid>
            <GridColumn span={10} start={2} className={styles.sections}>
              <SeriesBandSection />
              <WeeklyPickSection
                picks={recommended.slice(0, WEEKLY_PICK_COUNT)}
                trending={trendingSearches}
              />
              <RecommendedGamesSection
                title="최근 플레이한 게임"
                games={recentlyPlayed.slice(0, ROW_SIZE)}
              />
              <RecommendedGamesSection title="추천 플래시" games={recommended.slice(0, ROW_SIZE)} />
              <RecommendedGamesSection title="부동의 인기작" games={popular.slice(0, ROW_SIZE)} />
            </GridColumn>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
