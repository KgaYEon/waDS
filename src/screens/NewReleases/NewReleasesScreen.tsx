import { useNavigate } from "react-router-dom";
import styles from "./NewReleasesScreen.module.css";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import GridColumn from "../../components/ui/GridColumn";
import NewReleaseSection from "./NewReleaseSection";
import { useNewReleasesData } from "./useNewReleasesData";

/**
 * Figma frames "1920/newGame" (node 349:2600) and "1440/newGame" (node
 * 363:3074). The frames' own Header/Footer are intentionally NOT
 * reproduced — this screen renders inside Layout, same as every other
 * screen.
 *
 * Unlike the Filter screen, this one IS a plain single-column layout
 * (page header, then 3 stacked sections) that maps cleanly onto
 * Container + Grid + GridColumn, so it uses them — the raw left margin
 * measured here (~209px) is just this project's usual ~210px "real"
 * measurement that CLAUDE.md already treats as informational, not the
 * canonical --grid-margin (120px/170px), which is what Container uses.
 */
export default function NewReleasesScreen() {
  const navigate = useNavigate();
  const { month, newGames, newAni, comingSoon, comingSoonGameCount, comingSoonAniCount } =
    useNewReleasesData(navigate);

  return (
    <Container>
      <Grid>
        <GridColumn span={12} className={styles.header}>
          <h1 className={styles.title}>이달의 신작 - {month}</h1>
          <p className={styles.subtitle}>이번 달에 새롭게 보존된 게임 목록입니다</p>
        </GridColumn>

        <GridColumn span={12} className={styles.sections}>
          <NewReleaseSection
            title="플래시 게임 신작"
            countLabel={`게임 ${newGames.length} 건`}
            games={newGames}
          />
          <NewReleaseSection
            title={`플래시 애니 신작 ${newAni.length}건`}
            countLabel={`애니 ${newAni.length} 건`}
            games={newAni}
          />
          <NewReleaseSection
            title="보존 예정 목록"
            countLabel={`게임 ${comingSoonGameCount} 건 / 애니 ${comingSoonAniCount} 건`}
            games={comingSoon}
          />
        </GridColumn>
      </Grid>
    </Container>
  );
}
