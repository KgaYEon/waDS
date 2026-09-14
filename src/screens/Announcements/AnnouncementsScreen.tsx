import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AnnouncementsScreen.module.css";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import GridColumn from "../../components/ui/GridColumn";
import QuestionHead from "../../components/ui/QuestionHead";
import Pagination from "../../components/ui/Pagination";
import BoardNav from "../../components/ui/BoardNav";
import PageGlow from "../../components/ui/PageGlow";
import { useAnnouncementsData, PAGE_SIZE } from "./useAnnouncementsData";

/**
 * Figma frames "1920/q&a" (node 26:993) and "1440/q&a" (node 241:3598).
 * The frames' own Header/Footer are intentionally NOT reproduced — this
 * screen renders inside Layout (src/layouts/Layout.tsx), same as Home
 * and SearchResultsScreen.
 *
 * List rows reuse QuestionHead as-is (pinned + compact variants) rather
 * than a new "post" component — see QuestionHead.module.css for the
 * typography correction and 1440 media queries this frame required.
 */
export default function AnnouncementsScreen() {
  const [page, setPage] = useState(1);
  const { pinned, notices, pageCount, total } = useAnnouncementsData(page);
  const navigate = useNavigate();

  const goToNotice = (id: string) => navigate(`/notice/${id}`);

  return (
    <div className={styles.screen}>
      <PageGlow />
      <Container>
        <Grid>
          <GridColumn span={12} className={styles.column}>
            <BoardNav
              className={styles.subNav}
              items={[
                { label: "공지사항", active: true },
                { label: "FAQ", onClick: () => navigate("/faq") },
                { label: "건의함", onClick: () => navigate("/suggestions") },
                { label: "후원하기", onClick: () => navigate("/donation") },
              ]}
            />

            <h1 className={styles.title}>공지사항</h1>

            <div className={styles.listWrap}>
              <hr className={styles.topDivider} />
              <div className={styles.listBody}>
                <div className={styles.rows}>
                  {pinned.map((notice) => (
                    <QuestionHead
                      key={notice.id}
                      pinned
                      question={notice.title}
                      date={notice.date}
                      className={styles.row}
                      onClick={() => goToNotice(notice.id)}
                    />
                  ))}
                  {notices.map((notice, i) => (
                    <QuestionHead
                      key={notice.id}
                      compact
                      index={total - ((page - 1) * PAGE_SIZE + i)}
                      question={notice.title}
                      date={notice.date}
                      className={styles.row}
                      onClick={() => goToNotice(notice.id)}
                    />
                  ))}
                </div>
                <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
              </div>
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
}
