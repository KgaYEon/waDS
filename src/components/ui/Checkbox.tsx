import type { ButtonHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";
import { IconCheckFill, IconCheckEmpty, IconCheckEgnore } from "../icons";

export interface CheckboxProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  className,
  ...rest
}: CheckboxProps) {
  const Icon = indeterminate ? IconCheckEgnore : checked ? IconCheckFill : IconCheckEmpty;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      data-slot="checkbox"
      data-checked={checked}
      data-indeterminate={indeterminate}
      className={[styles.checkbox, className].filter(Boolean).join(" ")}
      onClick={(event) => {
        event.stopPropagation();
        onChange?.(!checked);
      }}
      {...rest}
    >
      <Icon size={24} className={styles.icon} />
    </button>
  );
}
