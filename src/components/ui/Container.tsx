import type { HTMLAttributes } from "react";
import styles from "./Container.module.css";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

/** Page-level horizontal margin from the layout grid (--grid-margin). */
export default function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div className={[styles.container, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
}
