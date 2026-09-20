import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AnnouncementsScreen.module.css";
import BoardPageLayout from "../../components/ui/BoardPageLayout";
import QuestionHead from "../../components/ui/QuestionHead";
import Pagination from "../../components/ui/Pagination";
import { useAnnouncementsData, PAGE_SIZE } from "./useAnnouncementsData";

/**
 * Figma frame "1920/Notice" (node 571:2989). Renders inside Layout
 * (Header/Footer are not reproduced here). Uses the shared
 * BoardPageLayout shell (title/description header + BoardSideNav) —
 * see that component for the frame it was measured against.
 *
 * List rows reuse QuestionHead as-is (pinned + compact variants).
 */
export default function AnnouncementsScreen() {
  const [page, setPage] = useState(1);
  const { pinned, notices, pageCount, total } = useAnnouncementsData(page);
  const navigate = useNavigate();

  const goToNotice = (id: string) => navigate(`/notice/${id}`);

  return (
    <BoardPageLayout title="공지사항" description="최근 올라온 공지를 확인해보세요" active="notice" contentGap={49}>
      <hr className={styles.topDivider} />
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
      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} className={styles.pagination} />
    </BoardPageLayout>
  );
}
