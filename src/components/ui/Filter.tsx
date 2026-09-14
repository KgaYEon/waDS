import { useState } from "react";
import type { HTMLAttributes } from "react";
import styles from "./Filter.module.css";
import FilterCap from "./FilterCap";
import Checkbox from "./Checkbox";

export interface FilterProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  label: string;
  options: string[];
  /** Controlled — the parent owns which one filter (of the group) is open. */
  open: boolean;
  onToggleOpen: () => void;
  selected: string[];
  onChange: (selected: string[]) => void;
  /** When set and options.length exceeds it, only this many show until
   * "더보기" is clicked (e.g. genre has 11 real values). */
  maxVisible?: number;
  /** Text for the "더보기" link, e.g. "장르 더보기". Required if maxVisible is set. */
  moreLabel?: string;
}

export default function Filter({
  label,
  options,
  open,
  onToggleOpen,
  selected,
  onChange,
  maxVisible,
  moreLabel,
  className,
  ...rest
}: FilterProps) {
  const [showAll, setShowAll] = useState(false);

  const toggleOption = (option: string) => {
    const next = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    onChange(next);
  };

  const hasMore = maxVisible !== undefined && options.length > maxVisible;
  const visibleOptions = hasMore && !showAll ? options.slice(0, maxVisible) : options;

  return (
    <div
      className={[styles.filter, className].filter(Boolean).join(" ")}
      data-open={open}
      {...rest}
    >
      <FilterCap label={label} expanded={open} onClick={onToggleOpen} />
      {/* Always rendered (not conditional on `open`) so the height can
          transition instead of appearing/disappearing instantly — same
          grid-template-rows trick used for the FAQ accordion. */}
      <div className={styles.optionsWrap} aria-hidden={!open}>
        <div className={styles.options}>
          {visibleOptions.map((option) => (
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
          {hasMore && !showAll && (
            <button type="button" className={styles.more} onClick={() => setShowAll(true)}>
              {moreLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
