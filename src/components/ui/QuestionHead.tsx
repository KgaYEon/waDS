import { useState, type KeyboardEvent } from "react";
import styles from "./QuestionHead.module.css";
import SmallChip from "./SmallChip";
import { IconArrowDown as IconChevron } from "../icons";

export interface QuestionHeadProps {
  question: string;
  answer?: string;
  /** Pinned FAQ row: shows an "알림" tag and a date, not expandable. */
  pinned?: boolean;
  date?: string;
  /** Compact numbered row used in a shorter FAQ list. */
  compact?: boolean;
  index?: number;
  defaultOpen?: boolean;
  className?: string;
  /** Pinned/compact rows only — makes the row a clickable link (e.g. to
   * a notice's detail page) instead of the plain expandable Q&A row. */
  onClick?: () => void;
}

export default function QuestionHead({
  question,
  answer,
  pinned = false,
  date,
  compact = false,
  index,
  defaultOpen = false,
  className,
  onClick,
}: QuestionHeadProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleRowKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  if (compact) {
    return (
      <div className={[styles.item, className].filter(Boolean).join(" ")}>
        <div
          className={styles.compactRow}
          role={onClick ? "button" : undefined}
          tabIndex={onClick ? 0 : undefined}
          onClick={onClick}
          onKeyDown={handleRowKeyDown}
          data-clickable={Boolean(onClick)}
        >
          <span className={styles.compactIndex}>{index}</span>
          <div className={styles.compactBody}>
            <span className={styles.compactQuestion}>{question}</span>
            {date && <span className={styles.compactDate}>{date}</span>}
          </div>
        </div>
        <hr className={styles.divider} />
      </div>
    );
  }

  if (pinned) {
    return (
      <div className={[styles.item, className].filter(Boolean).join(" ")}>
        <div
          className={styles.pinnedRow}
          role={onClick ? "button" : undefined}
          tabIndex={onClick ? 0 : undefined}
          onClick={onClick}
          onKeyDown={handleRowKeyDown}
          data-clickable={Boolean(onClick)}
        >
          <SmallChip color="whiteBorder" label="알림" className={styles.pinnedChip} />
          <span className={styles.pinnedQuestion}>{question}</span>
          {date && <span className={styles.pinnedDate}>{date}</span>}
        </div>
        <hr className={styles.divider} />
      </div>
    );
  }

  return (
    <div
      className={[styles.item, className].filter(Boolean).join(" ")}
      data-expanded={open}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.qa}>
          <span className={styles.qMark}>Q.</span>
          <span className={styles.question}>{question}</span>
        </span>
        <IconChevron size={24} className={styles.chevron} />
      </button>
      {answer && (
        <div className={styles.answerWrap} aria-hidden={!open}>
          <div className={styles.answerInner}>
            <p className={styles.answer}>{answer}</p>
          </div>
        </div>
      )}
      <hr className={styles.divider} />
    </div>
  );
}
