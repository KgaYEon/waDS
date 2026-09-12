import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./RoundButton.module.css";
import { IconQuestion } from "../icons";

export type RoundButtonVariant = "light" | "dark";

export interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: RoundButtonVariant;
  /** Force the "engaged" primary look even without hovering (e.g. a help panel that's open). */
  active?: boolean;
}

const variantClass: Record<RoundButtonVariant, string> = {
  light: styles.light,
  dark: styles.dark,
};

export default function RoundButton({
  icon,
  variant = "light",
  active = false,
  className,
  ...rest
}: RoundButtonProps) {
  return (
    <button
      className={[styles.button, variantClass[variant], active && styles.active, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {icon ?? <IconQuestion size={24} className={styles.icon} />}
    </button>
  );
}
