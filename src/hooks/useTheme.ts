import { useCallback, useSyncExternalStore } from "react";

/**
 * Light/dark theme toggle — same useSyncExternalStore + localStorage
 * pattern as useAuth.ts. "dark" is the default and there is no
 * prefers-color-scheme handling anywhere: the theme only ever changes
 * when toggleTheme() is called (from the header's toggle button), never
 * from the OS/browser setting.
 *
 * The actual light/dark swap is just tokens.css's [data-theme="light"]
 * block reversing the neutral color scale — this hook's only job is to
 * keep that attribute on <html> in sync with localStorage and re-render
 * whichever components read it.
 */
const THEME_KEY = "waflash:theme";

export type Theme = "dark" | "light";

type Listener = () => void;
const listeners = new Set<Listener>();

function readTheme(): Theme {
  try {
    return window.localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function setThemeAttribute(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

// Runs once at module load (import time), so the correct theme is
// already on <html> before the first React render — not just after a
// toggle. No transition here — only a user-triggered toggle (below)
// should animate.
setThemeAttribute(readTheme());

// A plain CSS `transition` on every element's color/background (tried
// first) looked chaotic: any component with its own more-specific
// transition (Button's 0.15s hover, etc.) keeps that instead, so
// different elements faded at different speeds/times ("다 제각각
// 순서로 바뀌"). The View Transition API instead crossfades the whole
// page as one atomic before/after snapshot, so everything changes in
// perfect sync regardless of any element's own transition rules.
// Falls back to an instant swap on browsers without support (Safari/
// Firefox as of writing).
function applyTheme(theme: Theme) {
  if (document.startViewTransition) {
    document.startViewTransition(() => setThemeAttribute(theme));
  } else {
    setThemeAttribute(theme);
  }
}

function writeTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore write failures (privacy mode, storage quota, etc.) — the
    // attribute still updates and listeners still fire, so the current
    // tab stays consistent even if the choice won't persist.
  }
  applyTheme(theme);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export interface UseTheme {
  theme: Theme;
  toggleTheme: () => void;
}

export function useTheme(): UseTheme {
  const theme = useSyncExternalStore(subscribe, readTheme, (): Theme => "dark");
  const toggleTheme = useCallback(() => {
    writeTheme(readTheme() === "light" ? "dark" : "light");
  }, []);
  return { theme, toggleTheme };
}
