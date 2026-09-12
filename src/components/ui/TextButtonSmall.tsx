import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import styles from "./TextButtonSmall.module.css";

export type TextButtonSmallProps =
  | ({ as?: "button" } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: "span" } & HTMLAttributes<HTMLSpanElement>);

export default function TextButtonSmall({ as = "button", className, children, ...rest }: TextButtonSmallProps) {
  const cls = [styles.button, className].filter(Boolean).join(" ");
  if (as === "span") {
    return (
      <span className={cls} {...(rest as HTMLAttributes<HTMLSpanElement>)}>
        {children}
      </span>
    );
  }
  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
