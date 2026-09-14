import { useNavigate } from "react-router-dom";
import styles from "./DonationScreen.module.css";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import GridColumn from "../../components/ui/GridColumn";
import BoardNav from "../../components/ui/BoardNav";
import PageGlow from "../../components/ui/PageGlow";
import Button from "../../components/ui/Button";
import { IconLogo } from "../../components/ui/icons";
import { IconArrowLeft, IconArrowRight } from "../../components/icons";

// Fixed mock value — no real donation/progress data source yet, see chat notes.
const DONATION_PERCENT = 44;

/**
 * Figma frames "1920/donation" (node 332:2469) and "1440/donation" (node
 * 432:3544). The frames' own Header/Footer are intentionally NOT
 * reproduced — this screen renders inside Layout, same as every other
 * screen.
 *
 * Two additions with no Figma source, both per explicit request:
 * - The "44%" label above the progress bar — the frame only draws the
 *   bar itself, no percent text anywhere near it.
 * - The comment board below the bar is left as an empty styled box
 *   (background/border only) — no comment input/display logic.
 *
 * The month-nav arrows and the "후원 해주시는 분들께" link have no real
 * destination/behavior yet (no month-switching or supporter-list logic
 * was requested), so they're rendered as inert, non-interactive elements
 * rather than fake buttons/links that do nothing.
 */
export default function DonationScreen() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      <PageGlow />
      <Container>
        <Grid>
          <GridColumn span={12} className={styles.column}>
            <BoardNav
              className={styles.subNav}
              items={[
                { label: "공지사항", onClick: () => navigate("/notices") },
                { label: "FAQ", onClick: () => navigate("/faq") },
                { label: "건의함", onClick: () => navigate("/suggestions") },
                { label: "후원하기", active: true },
              ]}
            />

            <div className={styles.hero}>
              <IconLogo className={styles.logo} />
              <div className={styles.heroBody}>
                <h1 className={styles.title}>와플래시를 응원해주세요</h1>
                <p className={styles.description}>
                  요즘 정말 많은 분들이 와플래시를 찾아주고 계십니다. 감사한 마음만큼이나 운영
                  비용도 조금씩 늘고 있습니다. 커피 한 잔 정도의 후원이 모이면 추억을 오래오래
                  지켜나가는 데 큰 힘이 됩니다!
                </p>
                <div className={styles.ctaGroup}>
                  <Button color="white" size="M" className={styles.donateButton}>
                    와플래시 후원하기
                  </Button>
                  <span className={styles.supporterLink}>후원 해주시는 분들께</span>
                </div>
              </div>
            </div>

            <div className={styles.monthNav}>
              <IconArrowLeft size={32} className={styles.monthArrow} aria-hidden="true" />
              <span className={styles.monthLabel}>10월의 후원 현황</span>
              <IconArrowRight size={32} className={styles.monthArrow} aria-hidden="true" />
            </div>

            <div className={styles.progressSection}>
              <div className={styles.progressLabelRow}>
                <span className={styles.progressLabel}>후원 목표까지</span>
                <span className={styles.progressPercent}>{DONATION_PERCENT}%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${DONATION_PERCENT}%` }} />
              </div>
            </div>

            <div className={styles.board} aria-hidden="true" />
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
}
