import type { ButtonHTMLAttributes } from "react";
import styles from "./IconChip.module.css";
import { IconClose } from "../icons";

export interface IconChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export default function IconChip({ label = "chip", className, ...rest }: IconChipProps) {
  return (
    <button className={[styles.chip, className].filter(Boolean).join(" ")} {...rest}>
      <span className={styles.label}>{label}</span>
      <IconClose size={24} className={styles.icon} />
    </button>
  );
}
