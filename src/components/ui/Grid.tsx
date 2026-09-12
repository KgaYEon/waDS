import type { HTMLAttributes } from "react";
import styles from "./Grid.module.css";

export type GridProps = HTMLAttributes<HTMLDivElement>;

/** 12-column layout grid (--grid-columns / --grid-gutter). Place
 * <GridColumn> children inside to position content by column span. */
export default function Grid({ className, children, ...rest }: GridProps) {
  return (
    <div className={[styles.grid, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
}
