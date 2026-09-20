import type { CSSProperties, ReactNode } from "react";
import styles from "./BoardPageLayout.module.css";
import BoardSideNav, { type BoardNavKey } from "./BoardSideNav";

export interface BoardPageLayoutProps {
  title: string;
  description: string;
  active: BoardNavKey;
  children: ReactNode;
  className?: string;
  /**
   * Header-to-content gap, in px measured at 1920 — this varies per
   * frame (FAQ 48 / Notice 49 / VOC 32 / donation 62), unlike every
   * other measurement this shell shares across all four pages. Falls
   * back to a representative 48px if left unset.
   */
  contentGap?: number;
}

/**
 * Shared shell for the "기타" board pages (공지사항/FAQ/건의함/후원하기):
 * title/description header + main content + the right-side BoardSideNav.
 * Re-measured from Figma's "1920/FAQ", "1920/Notice", "1920/VOC" and
 * "1920/donation" frames — all four share this exact skeleton, only the
 * main content differs per page.
 *
 * Positioned by the frames' own literal measured margins (left ~250px,
 * right ~226px — the side nav's x is a consistent 1482px across all
 * four frames), not the 12-column Grid/Container — those didn't land on
 * the same pixels as the frames themselves, so plain literal padding is
 * used here instead, per request. Notice's detail page
 * (NoticeDetailScreen) is NOT one of these four and does not use this
 * component — its Figma frame ("1920/notice-in") has no side nav, and
 * is positioned by its own (symmetric) literal margin.
 */
export default function BoardPageLayout({
  title,
  description,
  active,
  children,
  className,
  contentGap,
}: BoardPageLayoutProps) {
  const bodyStyle = contentGap != null ? ({ "--content-gap": `${contentGap}px` } as CSSProperties) : undefined;

  return (
    <div className={styles.page}>
      <div className={[styles.column, className].filter(Boolean).join(" ")}>
        <div className={styles.heading}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.body} style={bodyStyle}>
          <div className={styles.content}>{children}</div>
          <BoardSideNav active={active} />
        </div>
      </div>
    </div>
  );
}
