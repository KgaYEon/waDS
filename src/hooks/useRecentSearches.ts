import { useCallback, useEffect, useState } from "react";

const DEFAULT_KEY = "waflash:recent-searches";
const DEFAULT_MAX = 8;

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

export interface UseRecentSearchesOptions {
  /** localStorage key. Override if a screen needs its own separate history. */
  key?: string;
  /** How many terms to keep, most-recent-first. */
  max?: number;
}

export interface UseRecentSearches {
  items: string[];
  /** Adds a term to the front of the list, de-duplicating and trimming to `max`. */
  add: (term: string) => void;
  remove: (term: string) => void;
  clear: () => void;
}

/**
 * Recent-search history backed by localStorage. This is the one place
 * that knows *where* the history is stored — swap the read/write calls
 * here for an API call later and every consumer (SearchBox, etc.) keeps
 * working unchanged.
 */
export function useRecentSearches(options: UseRecentSearchesOptions = {}): UseRecentSearches {
  const { key = DEFAULT_KEY, max = DEFAULT_MAX } = options;
  const [items, setItems] = useState<string[]>(() => readStorage(key));

  useEffect(() => {
    setItems(readStorage(key));
  }, [key]);

  const add = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      if (!trimmed) return;
      setItems((prev) => {
        const next = [trimmed, ...prev.filter((t) => t !== trimmed)].slice(0, max);
        writeStorage(key, next);
        return next;
      });
    },
    [key, max],
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

  return { items, add, remove, clear };
}
