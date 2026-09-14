import { NOTICES } from "../../data/notices";
import type { Notice } from "../../types/notice";

const PAGE_SIZE = 4;

export interface AnnouncementsData {
  /** Always the full pinned list, regardless of page. */
  pinned: Notice[];
  /** Just this page's slice of the non-pinned notices. */
  notices: Notice[];
  pageCount: number;
  /** Total non-pinned notice count, for board-style descending numbering. */
  total: number;
}

/**
 * Reads from the shared NOTICES mock (src/data/notices.ts) rather than
 * its own array, since the Notice detail screen must resolve the exact
 * same ids — see the comment on the Notice type for why this differs
 * from Home/SearchResults' independent sample catalogs.
 *
 * Pinned notices are excluded from pagination entirely (same content on
 * every page); only the regular notices are paged, matching a real
 * paginated API's shape (page in, page + pageCount out).
 */
export function useAnnouncementsData(page: number): AnnouncementsData {
  const pinned = NOTICES.filter((n) => n.pinned);
  const regular = NOTICES.filter((n) => !n.pinned);
  const pageCount = Math.max(1, Math.ceil(regular.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;

  return {
    pinned,
    notices: regular.slice(start, start + PAGE_SIZE),
    pageCount,
    total: regular.length,
  };
}

export { PAGE_SIZE };
