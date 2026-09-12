import type { ButtonHTMLAttributes } from "react";
import styles from "./NavTab.module.css";

export interface NavTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export default function NavTab({
  selected = false,
  className,
  children,
  ...rest
}: NavTabProps) {
  return (
    <button
      data-selected={selected}
      aria-current={selected ? "page" : undefined}
      className={[styles.tab, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
      {selected && <span className={styles.underline} />}
    </button>
  );
}
