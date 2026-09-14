import type { HTMLAttributes } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import NavTab from "./NavTab";
import SearchBox from "./SearchBox";
import { IconLogo, IconProfile } from "./icons";

export interface NavItem {
  label: string;
  href?: string;
  /** Extra path prefixes that also count as this tab being active, e.g.
   * "기타" covers /notices, /notice/:id and /faq, not just its own href. */
  activePrefixes?: string[];
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  navItems?: NavItem[];
  onSearch?: (term: string) => void;
  onProfileClick?: () => void;
}

const DEFAULT_NAV: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "필터 검색", href: "/filters" },
  // No screen behind this yet — clicking it is a no-op until one exists.
  { label: "이달의 신작" },
  { label: "기타", href: "/notices", activePrefixes: ["/notice", "/faq", "/suggestions"] },
];

function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (item.href === pathname) return true;
  return (item.activePrefixes ?? []).some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

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
              selected={isNavItemActive(item, location.pathname)}
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
