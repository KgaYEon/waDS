import type { ButtonHTMLAttributes } from "react";
import styles from "./FilterCap.module.css";
import { IconArrowDown as IconChevron } from "../icons";

export interface FilterCapProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  expanded?: boolean;
}

export default function FilterCap({ label, expanded = false, className, ...rest }: FilterCapProps) {
  return (
    <button
      type="button"
      data-expanded={expanded}
      aria-expanded={expanded}
      className={[styles.cap, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <span className={styles.label}>{label}</span>
      {/* Single icon rotated 180deg when expanded (instead of swapping to a
          separate up-arrow icon) so the direction change animates. */}
      <IconChevron size={24} className={styles.icon} />
    </button>
  );
}
