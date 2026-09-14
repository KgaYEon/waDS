import type { ButtonHTMLAttributes } from "react";
import styles from "./BigChip.module.css";

export type BigChipVariant = "solid" | "outline";
export type BigChipSize = "L" | "M";

export interface BigChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BigChipVariant;
  size?: BigChipSize;
}

const variantClass: Record<BigChipVariant, string> = {
  solid: styles.solid,
  outline: styles.outline,
};

const sizeClass: Record<BigChipSize, string> = {
  L: styles.sizeL,
  M: styles.sizeM,
};

export default function BigChip({
  variant = "solid",
  size = "L",
  className,
  children,
  ...rest
}: BigChipProps) {
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
