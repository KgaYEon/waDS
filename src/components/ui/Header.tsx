import type { HTMLAttributes } from "react";
import styles from "./Header.module.css";
import Container from "./Container";
import Grid from "./Grid";
import GridColumn from "./GridColumn";
import NavTab from "./NavTab";
import { IconLogo, IconProfile } from "./icons";
import { IconSearch } from "../icons";

export interface NavItem {
  label: string;
  href?: string;
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  navItems?: NavItem[];
  activeIndex?: number;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
}

const DEFAULT_NAV: NavItem[] = [
  { label: "홈" },
  { label: "필터 검색" },
  { label: "이달의 신작" },
  { label: "기타" },
];

export default function Header({
  navItems = DEFAULT_NAV,
  activeIndex = 0,
  onSearchClick,
  onProfileClick,
  className,
  ...rest
}: HeaderProps) {
  return (
    <header className={[styles.header, className].filter(Boolean).join(" ")} {...rest}>
      <Container>
        <Grid>
          <GridColumn span={12} className={styles.row}>
            <div className={styles.left}>
              <div className={styles.logo}>
                <IconLogo className={styles.logoMark} />
              </div>
              <nav className={styles.nav}>
                {navItems.map((item, i) => (
                  <NavTab key={item.label} selected={i === activeIndex}>
                    {item.label}
                  </NavTab>
                ))}
              </nav>
            </div>
            <div className={styles.right}>
              <button
                type="button"
                className={styles.searchButton}
                onClick={onSearchClick}
                aria-label="검색"
              >
                <IconSearch size={32} className={styles.searchIcon} />
              </button>
              <button
                type="button"
                className={styles.profile}
                onClick={onProfileClick}
                aria-label="내 계정"
              >
                <IconProfile className={styles.profileIcon} />
              </button>
            </div>
          </GridColumn>
        </Grid>
      </Container>
    </header>
  );
}
