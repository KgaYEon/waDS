import { useCallback, useSyncExternalStore } from "react";

/**
 * Donation screen's comment-wall data — mock only, no backend. Same
 * useSyncExternalStore + localStorage pattern as useAuth.ts (see that
 * file for why: multiple components, here DonationScreen and
 * DonationCommentModal, need to read/write the same array in sync).
 *
 * Positions are stored as percentages (0-100) of the wall box's own
 * width/height, not pixels, so placement still makes sense if the box's
 * rendered size ever changes (different viewport, breakpoint, etc.).
 */
const WALL_KEY = "waflash:donation-wall";

export interface WallComment {
  id: string;
  type: "text" | "drawing";
  /** type: "text" only. */
  text?: string;
  /** type: "drawing" only — one SVG path "d" string per stroke. */
  paths?: string[];
  /** Percentage (0-100) of the wall box, top-left anchored. */
  x: number;
  y: number;
  /** Small per-item tilt for a "pinned to a corkboard" feel — cosmetic only. */
  rotate: number;
}

type Listener = () => void;
const listeners = new Set<Listener>();

// useSyncExternalStore compares snapshots with Object.is — JSON.parse
// returns a brand-new array every call, so without this cache the
// "snapshot" would look different on every single read (even when
// localStorage hasn't changed), and React would re-render in an
// infinite loop the moment this hook mounts. Only re-parse (and hand
// out a new array reference) when the raw string actually changed.
let cachedRaw: string | null = null;
let cachedWall: WallComment[] = [];

function readWall(): WallComment[] {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(WALL_KEY);
  } catch {
    raw = null;
  }
  if (raw === cachedRaw) return cachedWall;
  cachedRaw = raw;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    cachedWall = Array.isArray(parsed) ? parsed : [];
  } catch {
    cachedWall = [];
  }
  return cachedWall;
}

function writeWall(comments: WallComment[]) {
  const raw = JSON.stringify(comments);
  try {
    window.localStorage.setItem(WALL_KEY, raw);
  } catch {
    // Ignore write failures (privacy mode, quota, ...) — listeners still
    // fire so the current session stays consistent even if it won't persist.
  }
  cachedRaw = raw;
  cachedWall = comments;
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

/** Approximate footprint (as a % of the wall box) used only to keep new
 * placements from landing squarely on top of existing ones — not an
 * exact hit-test against each comment's real rendered size. */
// Kept roughly in sync with .wallItem/.wallText/.wallDrawing's actual
// rendered size in DonationScreen.module.css — sized up along with them.
const FOOTPRINT: Record<WallComment["type"], { w: number; h: number }> = {
  text: { w: 22, h: 12 },
  drawing: { w: 18, h: 18 },
};

function rectsOverlap(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number }
) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

/** Exported so DonationScreen can place its non-persisted archived-month
 * mock comments with the same overlap-avoidance behavior. */
export function pickPosition(existing: WallComment[], type: WallComment["type"]) {
  const { w, h } = FOOTPRINT[type];
  const maxX = Math.max(0, 100 - w);
  const maxY = Math.max(0, 100 - h);
  const existingRects = existing.map((c) => ({ x: c.x, y: c.y, ...FOOTPRINT[c.type] }));

  for (let attempt = 0; attempt < 20; attempt++) {
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    const candidate = { x, y, w, h };
    if (!existingRects.some((rect) => rectsOverlap(candidate, rect))) {
      return { x, y };
    }
  }
  // Gave up avoiding overlap after enough retries — just place it
  // somewhere valid rather than failing to add the comment at all.
  return { x: Math.random() * maxX, y: Math.random() * maxY };
}

export interface UseDonationWall {
  comments: WallComment[];
  addComment: (comment: Pick<WallComment, "type" | "text" | "paths">) => void;
  clear: () => void;
}

export function useDonationWall(): UseDonationWall {
  const comments = useSyncExternalStore(subscribe, readWall, () => []);

  const addComment = useCallback((comment: Pick<WallComment, "type" | "text" | "paths">) => {
    const current = readWall();
    const { x, y } = pickPosition(current, comment.type);
    const next: WallComment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      x,
      y,
      rotate: Math.random() * 10 - 5,
      ...comment,
    };
    writeWall([...current, next]);
  }, []);

  const clear = useCallback(() => writeWall([]), []);

  return { comments, addComment, clear };
}

/** Standalone clear, for callers (Header's logout) that need the side
 * effect but aren't otherwise reading the wall's contents. */
export function clearDonationWall() {
  writeWall([]);
}
