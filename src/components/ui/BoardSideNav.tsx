import { useNavigate } from "react-router-dom";
import styles from "./BoardSideNav.module.css";

export type BoardNavKey = "notice" | "faq" | "suggestion" | "donation";

const ITEMS: Array<{ key: BoardNavKey; label: string; to: string }> = [
  { key: "notice", label: "공지사항", to: "/notices" },
  { key: "faq", label: "FAQ", to: "/faq" },
  { key: "suggestion", label: "건의함", to: "/suggestions" },
  { key: "donation", label: "후원하기", to: "/donation" },
];

export interface BoardSideNavProps {
  active: BoardNavKey;
  className?: string;
}

/**
 * Right-side board sub-nav ("listBox" in Figma, node 627:5405) — shared
 * by every board page (Announcements/FAQ/Suggestions/Donation). Unlike
 * the old BoardNav (removed), the 4 items and their destinations are
 * fixed here rather than passed in by each screen, since they're
 * identical on every page; screens only pick which one is active.
 */
export default function BoardSideNav({ active, className }: BoardSideNavProps) {
  const navigate = useNavigate();

  return (
    <nav className={[styles.box, className].filter(Boolean).join(" ")} aria-label="게시판 메뉴">
      {ITEMS.map((item) => (
        <button
          key={item.key}
          type="button"
          className={styles.item}
          data-active={item.key === active}
          onClick={() => navigate(item.to)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
