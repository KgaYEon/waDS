import type { HTMLAttributes } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import NavTab from "./NavTab";
import SearchBox from "./SearchBox";
import { IconLogo, IconProfile } from "./icons";

export interface NavItem {
  label: string;
  href?: string;
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  navItems?: NavItem[];
  onSearch?: (term: string) => void;
  onProfileClick?: () => void;
}

const DEFAULT_NAV: NavItem[] = [
  { label: "홈", href: "/" },
  // No screen behind these yet — clicking them is a no-op until one exists.
  { label: "필터 검색" },
  { label: "이달의 신작" },
  { label: "기타" },
];

// See the comment on .header in Header.module.css — this component
// intentionally does NOT use Container/Grid/GridColumn like the rest of
// the page chrome (Footer, screen content). It keeps its own measured
// --space-48 side padding instead of the shared --grid-margin.
export default function Header({
  navItems = DEFAULT_NAV,
  onSearch,
  onProfileClick,
  className,
  ...rest
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={[styles.header, className].filter(Boolean).join(" ")} {...rest}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <IconLogo className={styles.logoMark} />
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavTab
              key={item.label}
              selected={item.href !== undefined && item.href === location.pathname}
              onClick={() => item.href && navigate(item.href)}
            >
              {item.label}
            </NavTab>
          ))}
        </nav>
      </div>
      <div className={styles.right}>
        <SearchBox onSearch={onSearch} />
        <button
          type="button"
          className={styles.profile}
          onClick={onProfileClick}
          aria-label="내 계정"
        >
          <IconProfile className={styles.profileIcon} />
        </button>
      </div>
    </header>
  );
}
