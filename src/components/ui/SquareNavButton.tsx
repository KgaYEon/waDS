import type { ButtonHTMLAttributes } from "react";
import styles from "./SquareNavButton.module.css";
import { IconArrowLeft, IconArrowRight } from "../icons";

export type SquareNavDirection = "left" | "right";

export interface SquareNavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: SquareNavDirection;
}

export default function SquareNavButton({
  direction = "left",
  className,
  ...rest
}: SquareNavButtonProps) {
  const Icon = direction === "left" ? IconArrowLeft : IconArrowRight;
  return (
    <button
      aria-label={direction === "left" ? "Previous" : "Next"}
      className={[styles.button, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <Icon size={24} className={styles.icon} />
    </button>
  );
}
