import styles from "./BoardNav.module.css";

export interface BoardNavItem {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface BoardNavProps {
  items: BoardNavItem[];
  className?: string;
}

/**
 * Secondary board sub-nav (공지사항 / FAQ / 건의함 / 후원하기), used above
 * both the Announcements list and Notice detail screens — promoted here
 * once the second screen needed it (was local markup in Announcements
 * at first). Not built on NavTab: this sub-nav has no underline on the
 * active item (color change only) and a fixed 64px gap at both
 * breakpoints, both different from NavTab/Header's own nav.
 */
export default function BoardNav({ items, className }: BoardNavProps) {
  return (
    <nav className={[styles.subNav, className].filter(Boolean).join(" ")} aria-label="게시판">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          className={styles.subNavItem}
          data-active={item.active}
          onClick={item.onClick}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
