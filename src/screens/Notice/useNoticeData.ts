import { NOTICES } from "../../data/notices";
import type { Notice } from "../../types/notice";

export interface NoticeData {
  notice: Notice | undefined;
  prev: Notice | undefined;
  next: Notice | undefined;
}

/**
 * Looks up one notice by id from the shared NOTICES mock (src/data/notices.ts),
 * same source the Announcements list reads from. prev/next are simply the
 * neighboring entries in that shared array's display order.
 */
export function useNoticeData(id: string | undefined): NoticeData {
  const index = NOTICES.findIndex((n) => n.id === id);
  return {
    notice: index >= 0 ? NOTICES[index] : undefined,
    prev: index > 0 ? NOTICES[index - 1] : undefined,
    next: index >= 0 && index < NOTICES.length - 1 ? NOTICES[index + 1] : undefined,
  };
}
