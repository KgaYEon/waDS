import type { ButtonHTMLAttributes } from "react";
import styles from "./Chip.module.css";

export type ChipVariant = "primary" | "neutral-muted" | "primary-stroke" | "neutral-stroke" | "ghost";
export type ChipSize = "L" | "M" | "S";

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
  size?: ChipSize;
}

const variantClass: Record<ChipVariant, string> = {
  primary: styles.primary,
  "neutral-muted": styles.neutralMuted,
  "primary-stroke": styles.primaryStroke,
  "neutral-stroke": styles.neutralStroke,
  ghost: styles.ghost,
};

const sizeClass: Record<ChipSize, string> = {
  L: styles.sizeL,
  M: styles.sizeM,
  S: styles.sizeS,
};

export default function Chip({
  variant = "primary",
  size = "L",
  className,
  children,
  ...rest
}: ChipProps) {
  return (
    <button
      type="button"
      className={[styles.chip, variantClass[variant], sizeClass[size], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
