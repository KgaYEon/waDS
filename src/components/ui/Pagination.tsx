import styles from "./Pagination.module.css";
import { IconChevronLeftThin } from "../icons";

export interface PaginationProps {
  /** 1-indexed current page. */
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export default function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className={[styles.pagination, className].filter(Boolean).join(" ")}>
      <button
        type="button"
        className={styles.arrowButton}
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
        aria-label="이전 페이지"
      >
        <IconChevronLeftThin size={24} className={styles.arrowIcon} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={styles.pageButton}
          data-active={p === page}
          aria-current={p === page ? "page" : undefined}
          onClick={() => onPageChange?.(p)}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className={styles.arrowButton}
        disabled={page >= pageCount}
        onClick={() => onPageChange?.(page + 1)}
        aria-label="다음 페이지"
      >
        <IconChevronLeftThin size={24} className={[styles.arrowIcon, styles.arrowIconNext].join(" ")} />
      </button>
    </div>
  );
}
