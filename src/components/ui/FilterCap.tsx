import type { ButtonHTMLAttributes } from "react";
import styles from "./FilterCap.module.css";
import { IconArrowDown as IconChevronDown, IconArrowUp as IconChevronUp } from "../icons";

export interface FilterCapProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  expanded?: boolean;
}

export default function FilterCap({ label, expanded = false, className, ...rest }: FilterCapProps) {
  const Icon = expanded ? IconChevronUp : IconChevronDown;
  return (
    <button
      type="button"
      data-expanded={expanded}
      aria-expanded={expanded}
      className={[styles.cap, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <span>{label}</span>
      <Icon size={24} className={styles.icon} />
    </button>
  );
}
