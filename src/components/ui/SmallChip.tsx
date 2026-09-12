import type { HTMLAttributes } from "react";
import styles from "./SmallChip.module.css";

export type SmallChipColor = "primary" | "whiteBorder" | "primaryBorder";

export interface SmallChipProps extends HTMLAttributes<HTMLSpanElement> {
  color?: SmallChipColor;
  label?: string;
}

const colorClass: Record<SmallChipColor, string> = {
  primary: styles.colorPrimary,
  whiteBorder: styles.colorWhiteBorder,
  primaryBorder: styles.colorPrimaryBorder,
};

export default function SmallChip({
  color = "primary",
  label = "Chip",
  className,
  ...rest
}: SmallChipProps) {
  return (
    <span
      data-slot="chip"
      className={[styles.chip, colorClass[color], className].filter(Boolean).join(" ")}
      {...rest}
    >
      {label}
    </span>
  );
}
