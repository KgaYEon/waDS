import type { CSSProperties, HTMLAttributes } from "react";
import styles from "./GridColumn.module.css";

export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridColumnProps extends HTMLAttributes<HTMLDivElement> {
  /** How many of the grid's 12 columns this element occupies. */
  span: ColumnSpan;
  /** 1-indexed column line to start at (defaults to auto-placement). */
  start?: ColumnSpan;
}

export default function GridColumn({
  span,
  start,
  className,
  style,
  children,
  ...rest
}: GridColumnProps) {
  const gridColumn: CSSProperties = {
    gridColumn: start ? `${start} / span ${span}` : `span ${span}`,
  };
  return (
    <div
      className={[styles.column, className].filter(Boolean).join(" ")}
      style={{ ...gridColumn, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
