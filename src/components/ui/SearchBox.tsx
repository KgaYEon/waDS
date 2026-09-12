import { useState } from "react";
import type { KeyboardEvent } from "react";
import styles from "./SearchBox.module.css";
import { IconSearch } from "../icons";

export interface SearchBoxProps {
  placeholder?: string;
  defaultExpanded?: boolean;
  onSearch?: (value: string) => void;
  className?: string;
}

export default function SearchBox({
  placeholder = "검색어를 입력해주세요",
  defaultExpanded = false,
  onSearch,
  className,
}: SearchBoxProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [value, setValue] = useState("");

  const submit = () => {
    onSearch?.(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
  };

  if (!expanded) {
    return (
      <button
        type="button"
        className={[styles.trigger, className].filter(Boolean).join(" ")}
        aria-label="검색창 열기"
        onClick={() => setExpanded(true)}
      >
        <IconSearch size={32} className={styles.icon} />
      </button>
    );
  }

  return (
    <div className={[styles.box, className].filter(Boolean).join(" ")}>
      <div className={styles.expanded}>
        <div className={styles.inputRow}>
          <input
            autoFocus
            className={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className={styles.searchButton}
            aria-label="검색"
            onClick={submit}
          >
            <IconSearch size={32} className={styles.icon} />
          </button>
        </div>
        <hr className={styles.divider} />
      </div>
    </div>
  );
}
