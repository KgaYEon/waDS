import type { HTMLAttributes, KeyboardEvent } from "react";
import styles from "./ChipLabelToggle.module.css";
import SmallChip from "./SmallChip";
import Checkbox from "./Checkbox";

export type ChipLabelToggleSize = "M" | "L";

export interface ChipLabelToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  size?: ChipLabelToggleSize;
  label?: string;
  showChip?: boolean;
  chipLabel?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const sizeClass: Record<ChipLabelToggleSize, string> = {
  M: styles.sizeM,
  L: styles.sizeL,
};

export default function ChipLabelToggle({
  size = "M",
  label = "Label",
  showChip = true,
  chipLabel = "Chip",
  checked = false,
  onChange,
  className,
  onKeyDown,
  ...rest
}: ChipLabelToggleProps) {
  const toggle = () => onChange?.(!checked);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={checked}
      className={[styles.row, sizeClass[size], className].filter(Boolean).join(" ")}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {showChip && <SmallChip color="whiteBorder" label={chipLabel} />}
      <Checkbox checked={checked} onChange={onChange} />
      <span>{label}</span>
    </div>
  );
}
