import type { ButtonHTMLAttributes } from "react";
import styles from "./BigChip.module.css";

export type BigChipVariant = "solid" | "outline";

export interface BigChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BigChipVariant;
}

const variantClass: Record<BigChipVariant, string> = {
  solid: styles.solid,
  outline: styles.outline,
};

export default function BigChip({
  variant = "solid",
  className,
  children,
  ...rest
}: BigChipProps) {
  return (
    <button
      className={[styles.chip, variantClass[variant], className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
