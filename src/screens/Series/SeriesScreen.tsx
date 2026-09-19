import styles from "./SeriesScreen.module.css";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import GridColumn from "../../components/ui/GridColumn";

/**
 * Placeholder route for Header/new's "시리즈별" nav tab (Figma node
 * 617:3509) — the nav item exists ahead of its screen; real content
 * lands in a later pass.
 */
export default function SeriesScreen() {
  return (
    <div className={styles.screen}>
      <Container>
        <Grid>
          <GridColumn span={12} className={styles.placeholder}>
            시리즈별 페이지 준비 중입니다
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
}
