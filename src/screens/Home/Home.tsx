import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import GridColumn from "../../components/ui/GridColumn";
import HeroBannerSection from "./sections/HeroBannerSection";
import RecentlyPlayedSection from "./sections/RecentlyPlayedSection";
import RecommendedGamesSection from "./sections/RecommendedGamesSection";
import { useHomeData } from "./useHomeData";

export default function Home() {
  const navigate = useNavigate();
  const { heroSlides, recentlyPlayed, recommended } = useHomeData(navigate);

  return (
    <div className={styles.page}>
      <HeroBannerSection slides={heroSlides} />
      <div className={styles.body}>
        <Container>
          <Grid>
            <GridColumn span={12} className={styles.sections}>
              <RecentlyPlayedSection games={recentlyPlayed} />
              <RecommendedGamesSection games={recommended} />
            </GridColumn>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
