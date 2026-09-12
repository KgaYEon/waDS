import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export type ButtonColor = "primary" | "white" | "border";
export type ButtonSize = "S" | "M" | "L";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  size?: ButtonSize;
}

const sizeClass: Record<ButtonSize, string> = {
  S: styles.sizeS,
  M: styles.sizeM,
  L: styles.sizeL,
};

const colorClass: Record<ButtonColor, string> = {
  primary: styles.colorPrimary,
  white: styles.colorWhite,
  border: styles.colorBorder,
};

export default function Button({
  color = "primary",
  size = "L",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[styles.button, sizeClass[size], colorClass[color], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
