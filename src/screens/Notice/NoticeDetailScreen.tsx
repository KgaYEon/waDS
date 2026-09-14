import { useNavigate, useParams } from "react-router-dom";
import styles from "./NoticeDetailScreen.module.css";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import GridColumn from "../../components/ui/GridColumn";
import BoardNav from "../../components/ui/BoardNav";
import PageGlow from "../../components/ui/PageGlow";
import SmallChip from "../../components/ui/SmallChip";
import Button from "../../components/ui/Button";
import { IconArrowLeft } from "../../components/icons";
import { useNoticeData } from "./useNoticeData";
import type { Notice } from "../../types/notice";

/**
 * Figma frames "1920/notice" (node 26:1011) and "1440/notice" (node
 * 241:3630). The frames' own Header/Footer are intentionally NOT
 * reproduced — this screen renders inside Layout, same as every other
 * screen. Header/Footer/BoardNav/PageGlow are all shared pieces; the
 * only new component here is none — everything reuses an existing atom
 * (see chat notes for the "고정" chip and "목록으로" button reuse).
 */
export default function NoticeDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notice, prev, next } = useNoticeData(id);

  const goToList = () => navigate("/notices");

  if (!notice) {
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
                  { label: "후원하기" },
                ]}
              />
              <p className={styles.notFound}>게시글을 찾을 수 없습니다.</p>
            </GridColumn>
          </Grid>
        </Container>
      </div>
    );
  }

  const adjacent: Array<{ label: string; notice: Notice }> = [
    ...(prev ? [{ label: "이전글", notice: prev }] : []),
    ...(next ? [{ label: "다음글", notice: next }] : []),
  ];

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
                { label: "후원하기" },
              ]}
            />

            <div className={styles.content}>
              <button type="button" className={styles.backLink} onClick={goToList}>
                <IconArrowLeft size={24} className={styles.backIcon} />
                목록으로
              </button>

              <div className={styles.header}>
                <div className={styles.titleRow}>
                  {notice.pinned && (
                    <SmallChip color="primaryBorder" label="고정" className={styles.chip} />
                  )}
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
                <Button color="border" size="L" className={styles.backButton} onClick={goToList}>
                  목록으로
                </Button>
              </div>
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
}
