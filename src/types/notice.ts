/**
 * Shared across screens (Announcements list, Notice detail) — unlike
 * Game (SearchResults duplicates its own sample titles since ids never
 * need to line up 1:1), the list and detail screens must resolve the
 * exact same id, so the mock data itself lives in one place (see
 * src/data/notices.ts), not just this type.
 */
export type NoticeBodyBlock = { type: "text"; text: string } | { type: "list"; items: string[] };

export interface Notice {
  id: string;
  title: string;
  date: string;
  pinned?: boolean;
  author?: string;
  body?: NoticeBodyBlock[];
}
