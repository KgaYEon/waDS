import { forwardRef, useEffect, useRef, useState } from "react";
import type { HTMLAttributes, MouseEvent as ReactMouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import NavTab from "./NavTab";
import SearchBox from "./SearchBox";
import BigChip from "./BigChip";
import { IconLogo } from "./icons";
import { IconMoon, IconSun } from "../icons";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

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
}

const DEFAULT_NAV: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "필터 검색", href: "/filters" },
  { label: "이달의 신작", href: "/new-releases" },
  {
    label: "기타",
    href: "/notices",
    activePrefixes: ["/notice", "/faq", "/suggestions", "/donation"],
  },
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
//
// Forwards its ref so Layout can measure its real rendered height (see
// Layout.tsx) — some screens' own sticky title blocks need to sit
// exactly flush under it, and that height isn't safe to hand-guess.
const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { navItems = DEFAULT_NAV, onSearch, className, ...rest },
  ref
) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the logout menu on an outside click — same pattern SearchBox
  // uses for its own dropdown, just via a ref instead of onBlur (the
  // menu isn't inside a focusable input-based wrapper here).
  useEffect(() => {
    if (!menuOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  const handleLogout = () => {
    // Was also clearing the donation wall on logout — reverted on
    // request, the wall now persists regardless of login state.
    logout();
    setMenuOpen(false);
  };

  // The cursor doesn't move on click, so plain :hover would otherwise
  // stay lit right through the theme swap — briefly disabling
  // pointer-events makes the browser drop the :hover match immediately,
  // and it only comes back once the pointer actually leaves and
  // re-enters the button (not on a timer, which could re-enable it
  // while the cursor is still sitting there).
  const handleThemeToggleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    toggleTheme();
    const button = event.currentTarget;
    button.style.pointerEvents = "none";
    const reenable = () => {
      button.style.pointerEvents = "";
      button.removeEventListener("mouseleave", reenable);
    };
    button.addEventListener("mouseleave", reenable);
  };

  return (
    <header ref={ref} className={[styles.header, className].filter(Boolean).join(" ")} {...rest}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.logo}
          onClick={() => navigate("/")}
          aria-label="홈으로 이동"
        >
          <IconLogo className={styles.logoMark} />
        </button>
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
        {/* Shows the icon for the mode a click would switch TO — moon
            (switch to dark) while light, sun (switch to light) while
            dark — matching Figma's "dark/light" frame (523:4423). */}
        <button
          type="button"
          className={styles.themeToggle}
          onClick={handleThemeToggleClick}
          aria-label={theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}
        >
          {theme === "light" ? (
            <IconMoon size={32} className={styles.themeIcon} />
          ) : (
            <IconSun size={32} className={styles.themeIcon} />
          )}
        </button>
        {isLoggedIn ? (
          <div className={styles.avatarWrap} ref={menuRef}>
            <button
              type="button"
              className={styles.avatar}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="내 계정"
              aria-expanded={menuOpen}
            />
            {menuOpen && (
              <div className={styles.avatarMenu} role="menu">
                <button
                  type="button"
                  role="menuitem"
                  className={styles.avatarMenuItem}
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <BigChip
            size="L"
            className={styles.loginChip}
            onClick={() => navigate("/login", { state: { from: location.pathname } })}
          >
            로그인
          </BigChip>
        )}
      </div>
    </header>
  );
});

export default Header;
