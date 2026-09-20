import { useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent } from "react";
import styles from "./SearchBox.module.css";
import SearchResultsPanel from "./SearchResultsPanel";
import { IconSearch } from "../icons";
import { useRecentSearches } from "../../hooks/useRecentSearches";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const recentSearches = useRecentSearches();

  // Submitting (Enter, the search icon, or picking a recent term) adds
  // the term and fires onSearch — it must NOT close the dropdown. The
  // panel only closes via Escape, the "닫기" button, or blurring away.
  const submit = (term: string = value) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    recentSearches.add(trimmed);
    setValue("");
    onSearch?.(trimmed);
  };

  // Autosave being off shouldn't hide/lose the history that was already
  // there when it was turned off — it should reappear as soon as it's
  // turned back on. So we only mask what's *displayed* here; the hook
  // keeps the real, persisted list untouched either way.
  const visibleRecentSearches = recentSearches.enabled ? recentSearches.items : [];

  // Clicking the search icon with nothing typed collapses the box back
  // to the trigger state instead of doing nothing (submit() already
  // no-ops on an empty/whitespace value) — a second, deliberate use for
  // the same icon.
  const handleSearchIconClick = () => {
    if (!value.trim()) {
      setExpanded(false);
      setDropdownOpen(false);
      return;
    }
    submit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    if (e.key === "Escape") setDropdownOpen(false);
  };

  // Closing on blur would also fire (and win the race) when the user is
  // clicking a button inside the dropdown, so give focus a tick to land
  // there first and only close if it didn't.
  const handleBlur = (_e: FocusEvent<HTMLDivElement>) => {
    window.setTimeout(() => {
      if (!boxRef.current?.contains(document.activeElement)) {
        setDropdownOpen(false);
      }
    }, 0);
  };

  return (
    <div
      ref={boxRef}
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      onBlur={handleBlur}
    >
      {expanded ? (
        <div className={styles.box}>
          <div className={styles.expanded}>
            <div className={styles.inputRow}>
              <input
                autoFocus
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setDropdownOpen(true)}
              />
              <button
                type="button"
                className={styles.searchButton}
                aria-label={value.trim() ? "검색" : "검색창 닫기"}
                onClick={handleSearchIconClick}
              >
                <IconSearch size={32} className={styles.icon} />
              </button>
            </div>
            <hr className={styles.divider} />
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={styles.trigger}
          aria-label="검색창 열기"
          onClick={() => setExpanded(true)}
        >
          <IconSearch size={32} className={styles.icon} />
        </button>
      )}

      {dropdownOpen && (
        <SearchResultsPanel
          className={styles.dropdown}
          recentSearches={visibleRecentSearches}
          onSelect={(label) => submit(label)}
          onRemove={(label) => recentSearches.remove(label)}
          onClearAll={() => recentSearches.clear()}
          autoSaveEnabled={recentSearches.enabled}
          onToggleAutoSave={() => recentSearches.setEnabled(!recentSearches.enabled)}
          onClose={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
}
