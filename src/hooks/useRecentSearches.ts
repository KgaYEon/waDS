import { useCallback, useEffect, useState } from "react";

const DEFAULT_KEY = "waflash:recent-searches";
const DEFAULT_MAX = 6;

function readStorage(key: string): string[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    // localStorage can throw (privacy mode, disabled storage, bad JSON) —
    // degrade to "no recent searches" rather than crash the search box.
    return [];
  }
}

function writeStorage(key: string, items: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Ignore write failures (e.g. storage quota, privacy mode) — the UI
    // still works for the current session, it just won't persist.
  }
}

function readEnabled(key: string): boolean {
  try {
    const raw = window.localStorage.getItem(key);
    // Absent = never toggled off yet, so default to on.
    return raw === null ? true : raw === "true";
  } catch {
    return true;
  }
}

function writeEnabled(key: string, value: boolean) {
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    // Ignore — see writeStorage above.
  }
}

export interface UseRecentSearchesOptions {
  /** localStorage key. Override if a screen needs its own separate history. */
  key?: string;
  /** How many terms to keep, most-recent-first. */
  max?: number;
}

export interface UseRecentSearches {
  items: string[];
  /** Whether new searches get saved. Persisted, like `items`. */
  enabled: boolean;
  /** Adds a term to the front of the list, de-duplicating and trimming to
   *  `max`. No-ops while `enabled` is false. */
  add: (term: string) => void;
  remove: (term: string) => void;
  clear: () => void;
  setEnabled: (enabled: boolean) => void;
}

/**
 * Recent-search history backed by localStorage. This is the one place
 * that knows *where* the history (and the on/off preference) is stored —
 * swap the read/write calls here for an API call later and every
 * consumer (SearchBox, etc.) keeps working unchanged.
 */
export function useRecentSearches(options: UseRecentSearchesOptions = {}): UseRecentSearches {
  const { key = DEFAULT_KEY, max = DEFAULT_MAX } = options;
  const enabledKey = `${key}:enabled`;
  const [items, setItems] = useState<string[]>(() => readStorage(key));
  const [enabled, setEnabledState] = useState<boolean>(() => readEnabled(enabledKey));

  useEffect(() => {
    setItems(readStorage(key));
    setEnabledState(readEnabled(enabledKey));
  }, [key, enabledKey]);

  const add = useCallback(
    (term: string) => {
      if (!enabled) return;
      const trimmed = term.trim();
      if (!trimmed) return;
      setItems((prev) => {
        const next = [trimmed, ...prev.filter((t) => t !== trimmed)].slice(0, max);
        writeStorage(key, next);
        return next;
      });
    },
    [key, max, enabled],
  );

  const remove = useCallback(
    (term: string) => {
      setItems((prev) => {
        const next = prev.filter((t) => t !== term);
        writeStorage(key, next);
        return next;
      });
    },
    [key],
  );

  const clear = useCallback(() => {
    writeStorage(key, []);
    setItems([]);
  }, [key]);

  const setEnabled = useCallback(
    (value: boolean) => {
      writeEnabled(enabledKey, value);
      setEnabledState(value);
    },
    [enabledKey],
  );

  return { items, enabled, add, remove, clear, setEnabled };
}
