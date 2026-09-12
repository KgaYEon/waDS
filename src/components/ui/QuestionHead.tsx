import { useState } from "react";
import styles from "./QuestionHead.module.css";
import SmallChip from "./SmallChip";
import { IconArrowDown as IconChevronDown, IconArrowUp as IconChevronUp } from "../icons";

export interface QuestionHeadProps {
  question: string;
  answer?: string;
  /** Pinned FAQ row: shows a "고정" tag and a date, not expandable. */
  pinned?: boolean;
  date?: string;
  /** Compact numbered row used in a shorter FAQ list. */
  compact?: boolean;
  index?: number;
  defaultOpen?: boolean;
  className?: string;
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
}: QuestionHeadProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (compact) {
    return (
      <div className={[styles.item, className].filter(Boolean).join(" ")}>
        <div className={styles.compactRow}>
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
        <div className={styles.pinnedRow}>
          <SmallChip color="whiteBorder" label="고정" />
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
        {open ? (
          <IconChevronUp size={24} className={styles.chevron} />
        ) : (
          <IconChevronDown size={24} className={styles.chevron} />
        )}
      </button>
      {open && answer && <p className={styles.answer}>{answer}</p>}
      <hr className={styles.divider} />
    </div>
  );
}
