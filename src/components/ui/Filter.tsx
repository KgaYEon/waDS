import { useState } from "react";
import type { HTMLAttributes } from "react";
import styles from "./Filter.module.css";
import FilterCap from "./FilterCap";
import Checkbox from "./Checkbox";

export interface FilterProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  label: string;
  options: string[];
  defaultOpen?: boolean;
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
}

export default function Filter({
  label,
  options,
  defaultOpen = false,
  defaultSelected = [],
  onChange,
  className,
  ...rest
}: FilterProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  const toggleOption = (option: string) => {
    const next = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    setSelected(next);
    onChange?.(next);
  };

  return (
    <div className={[styles.filter, className].filter(Boolean).join(" ")} {...rest}>
      <FilterCap label={label} expanded={open} onClick={() => setOpen((v) => !v)} />
      {open && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option}
              role="button"
              tabIndex={0}
              className={styles.option}
              onClick={() => toggleOption(option)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleOption(option);
                }
              }}
            >
              <Checkbox
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
              />
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
