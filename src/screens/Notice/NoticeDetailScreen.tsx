import { useNavigate, useParams } from "react-router-dom";
import styles from "./NoticeDetailScreen.module.css";
import SmallChip from "../../components/ui/SmallChip";
import Button from "../../components/ui/Button";
import { IconArrowLeft } from "../../components/icons";
import { useNoticeData } from "./useNoticeData";
import type { Notice } from "../../types/notice";

/**
 * Figma frame "1920/notice-in" (node 571:3022). Renders inside Layout.
 *
 * Not one of the four "기타" board pages (공지사항/FAQ/건의함/후원하기) and
 * doesn't use BoardPageLayout — this frame has no right-side board nav
 * (unlike the other four), just a "목록으로" back link and a different
 * header shape (title + author/date), so it's laid out on its own here.
 * Positioned by the frame's own literal, symmetric ~262px margin, not
 * the 12-column Grid/Container — same reasoning as BoardPageLayout.
 */
export default function NoticeDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notice, prev, next } = useNoticeData(id);

  const goToList = () => navigate("/notices");

  if (!notice) {
    return (
      <div className={styles.screen}>
        <div className={styles.column}>
          <p className={styles.notFound}>게시글을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const adjacent: Array<{ label: string; notice: Notice }> = [
    ...(prev ? [{ label: "이전글", notice: prev }] : []),
    ...(next ? [{ label: "다음글", notice: next }] : []),
  ];

  return (
    <div className={styles.screen}>
      <div className={styles.column}>
        <button type="button" className={styles.backLink} onClick={goToList}>
          <IconArrowLeft className={styles.backIcon} />
          목록으로
        </button>

        <div className={styles.header}>
          <div className={styles.titleRow}>
            {notice.pinned && <SmallChip color="primaryBorder" label="고정" className={styles.chip} />}
            <h1 className={styles.title}>{notice.title}</h1>
          </div>
          <div className={styles.meta}>
            <span>{notice.author ?? "관리자"}</span>
            <span className={styles.metaDivider} aria-hidden="true" />
            <span>{notice.date}</span>
          </div>
        </div>

        <hr className={styles.topDivider} />

        <div className={styles.body}>
          {notice.body?.map((block, i) =>
            block.type === "list" ? (
              <ul key={i} className={styles.list}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            ) : (
              <p key={i} className={styles.text}>
                {block.text}
              </p>
            )
          )}
        </div>

        {adjacent.length > 0 && (
          <div className={styles.adjacent}>
            <hr className={styles.divider} />
            {adjacent.map(({ label, notice: adjacentNotice }, i) => (
              <div key={adjacentNotice.id}>
                <button
                  type="button"
                  className={styles.adjacentRow}
                  onClick={() => navigate(`/notice/${adjacentNotice.id}`)}
                >
                  <span className={styles.adjacentLeft}>
                    <span className={styles.adjacentLabel}>{label}</span>
                    <span>{adjacentNotice.title}</span>
                  </span>
                  <span className={styles.adjacentDate}>{adjacentNotice.date}</span>
                </button>
                {i < adjacent.length - 1 && <hr className={styles.divider} />}
              </div>
            ))}
            <hr className={styles.divider} />
          </div>
        )}

        <div className={styles.backButtonRow}>
          <Button color="border" size="M" className={styles.backButton} onClick={goToList}>
            목록으로
          </Button>
        </div>
      </div>
    </div>
  );
}
