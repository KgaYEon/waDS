import { useNavigate } from "react-router-dom";
import styles from "./FaqScreen.module.css";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import GridColumn from "../../components/ui/GridColumn";
import QuestionHead from "../../components/ui/QuestionHead";
import Button from "../../components/ui/Button";
import BoardNav from "../../components/ui/BoardNav";
import PageGlow from "../../components/ui/PageGlow";
import { useFaqData } from "./useFaqData";

/**
 * Figma frames "1920/FAQ" (node 26:924) and "1440/FAQ" (node 241:3577).
 * The frames' own Header/Footer are intentionally NOT reproduced — this
 * screen renders inside Layout, same as every other screen.
 *
 * Accordion rows reuse QuestionHead's plain (non-pinned/non-compact)
 * variant as-is — it already manages its own open/closed state and
 * chevron direction, this is just its first real consumer. All items
 * start closed (`defaultOpen` left unset); the frame's own first item
 * is drawn open purely to show that state, not as a default.
 */
export default function FaqScreen() {
  const faqs = useFaqData();
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
                { label: "FAQ", active: true },
                { label: "건의함", onClick: () => navigate("/suggestions") },
                { label: "후원하기" },
              ]}
            />

            <div className={styles.heading}>
              <h1 className={styles.title}>FAQ</h1>
              <p className={styles.subtitle}>자주 묻는 질문을 확인해보세요</p>
            </div>

            <div className={styles.content}>
              <hr className={styles.topDivider} />
              <div className={styles.rows}>
                {faqs.map((item) => (
                  <QuestionHead
                    key={item.id}
                    question={item.question}
                    answer={item.answer}
                    className={styles.row}
                  />
                ))}
              </div>

              <div className={styles.cta}>
                <p className={styles.ctaText}>찾는 질문이 없다면?</p>
                <Button
                  color="white"
                  size="M"
                  className={styles.ctaButton}
                  onClick={() => navigate("/suggestions?type=" + encodeURIComponent("질문"))}
                >
                  1대1 질문하기
                </Button>
              </div>
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
}
