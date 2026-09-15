import { useCallback, useSyncExternalStore } from "react";

/**
 * Mock auth only — no real backend. Login state is just a boolean in
 * localStorage, set to true by any of the Login screen's SSO buttons and
 * cleared by logging out. Persists across reloads by design (that's the
 * whole point of storing it), not across "sessions" in any secure sense.
 *
 * Uses useSyncExternalStore (not a Context/Provider) so every component
 * that calls useAuth() — Header, LoginScreen, anything else later —
 * reads/writes the same boolean and re-renders in sync, without adding a
 * new provider to the component tree. The `storage` event also picks up
 * changes made in other tabs.
 */
const AUTH_KEY = "waflash:auth";

type Listener = () => void;
const listeners = new Set<Listener>();

function readIsLoggedIn(): boolean {
  try {
    return window.localStorage.getItem(AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

function writeIsLoggedIn(value: boolean) {
  try {
    window.localStorage.setItem(AUTH_KEY, String(value));
  } catch {
    // Ignore write failures (privacy mode, storage quota, etc.) — the
    // in-memory listeners still fire so the UI stays consistent for the
    // current session even if it won't persist.
  }
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

export interface UseAuth {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export function useAuth(): UseAuth {
  const isLoggedIn = useSyncExternalStore(subscribe, readIsLoggedIn, () => false);
  const login = useCallback(() => writeIsLoggedIn(true), []);
  const logout = useCallback(() => writeIsLoggedIn(false), []);
  return { isLoggedIn, login, logout };
}
